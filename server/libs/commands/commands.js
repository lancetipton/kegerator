const path = require('path')
const { spawn } = require('child_process')
const { uuid, get } = require('jsutils')
const { EventTypes } = require('KegSConst')
const rootDir = require('KegRoot')
const { commands, filters } = require('./loadCommands')
const { isKegCLICommand, kegCLIMessage } = require('./keg')

const spawnOpts = {
  gid: process.getgid(),
  uid: process.getuid(),
  env: process.env,
  cwd: rootDir,
  stdio: 'pipe',
}

const filterMessages = filters && filters.all
  ? [ ...filters.all ]
  : []

const shouldFilterMessage = (data, group, cmd) => {
  if(data === '') return true

  const toFilter = [
    ...filterMessages,
    ...get(filters, [ group ], []),
    ...get(filters, [ cmd ], []),
    ...get(commands, [ group, cmd, 'filters'], []),
  ]

  return toFilter.reduce((shouldFilter, filter) => (
    shouldFilter || new RegExp(filter, 'gi').test(data)
  ), false)

}

const getTimeStamp = () => new Date().getTime()

const stdOutEmit = (SocketManager, group, data, name) => {

  !shouldFilterMessage(data.trim(), group, name) &&
    SocketManager.emitAll(
      EventTypes.CMD_OUT,
      {
        name,
        group,
        error: false,
        message: data,
        timestamp: getTimeStamp(),
        id: uuid(),
      }
    )
}

const runChildSpawn = (SocketManager, group, cmd, params, name) => {

  const childProc = spawn(
    ...isKegCLICommand(cmd, params),
    spawnOpts
  )

  childProc.stdout && childProc.stdout.setEncoding('utf-8')
  childProc.stderr && childProc.stderr.setEncoding('utf-8')
  
  childProc.on('exit', code => {
    SocketManager.isRunning = false
    SocketManager.emitAll(EventTypes.CMD_END, {
      name,
      group,
      isRunning: SocketManager.isRunning,
      timestamp: getTimeStamp(),
      id: uuid(),
    })
  })

  childProc.stdout.on('data', data => stdOutEmit(SocketManager, group, data, name))

  childProc.stderr.on('data', data => {

    // Add filter for ZR_CLI commands sent to standard out
    data.indexOf(kegCLIMessage) === 0
      ? stdOutEmit(SocketManager, data, name)
      : !shouldFilterMessage(data.trim(), group, name)
        ? SocketManager.emitAll(EventTypes.CMD_ERR, {
            name,
            group,
            message: data,
            error: true,
            timestamp: getTimeStamp(),
            isRunning: SocketManager.isRunning,
            id: uuid(),
          })
        : null

  })
  
  childProc.on('error', err => {

    const message = err.message.indexOf('ENOENT') !== -1
      ? `[ CMD ERROR ] - Command '${cmd}' does not exist!\n\nMessage:\n${err.message}`
      : `[ CMD ERROR ] - Failed to run command!\n\nMessage:\n${err.message}`

    if(shouldFilterMessage(err.message.trim(), group, name)) return

    SocketManager.isRunning = false
    SocketManager.emitAll(EventTypes.CMD_FAIL, {
      name,
      group,
      error: true,
      timestamp: getTimeStamp(),
      message: message,
      isRunning: SocketManager.isRunning,
      id: uuid(),
    })
  })

}

const validateCmd = (SocketManager, name, cmd, id, params, group) => {

  const command = get(commands, [ group, name ])

  if(!command || command.cmd.indexOf(cmd) !== 0 || !id || id !== command.id){

    console.error('---------- Invalid command ----------')
    console.error(`name: ${name}`)
    console.error(`cmd: ${cmd}`)
    console.error(`id: ${id}`)
    console.error(`params: ${params.toString()}`)
    console.error('---------- Invalid command ----------')

    SocketManager.isRunning = false
    SocketManager.emitAll(EventTypes.CMD_FAIL, {
      name,
      error: true,
      timestamp: getTimeStamp(),
      message: 'Failed to run command!',
      isRunning: SocketManager.isRunning,
      id: uuid(),
    })
    
    return false
  }

  return true
}

const runCmd = (SocketManager, socket, message) => {

  try {

    const { cmd, group, params, name, id } = message

    if(!validateCmd(SocketManager, name, cmd, id, params, group)) return false

    SocketManager.isRunning = true
    SocketManager.emitAll(EventTypes.CMD_RUNNING, {
      name,
      cmd: message,
      group: group,
      message: 'Running command',
      isRunning: SocketManager.isRunning,
      timestamp: getTimeStamp(),
      id: uuid(),
    })

    runChildSpawn(
      SocketManager,
      group,
      cmd,
      params || [],
      name
    )

  }
  catch(e){
    
    console.error(`[ CMD ERROR ] - Error running command: ${cmd}`)
    console.error(e.stack)
    
    SocketManager.isRunning = false
    SocketManager.emitAll(
      EventTypes.CMD_RUNNING,
      { 
        name,
        error: true,
        cmd: message,
        message: 'Error running command!',
        isRunning: SocketManager.isRunning,
        id: uuid(),
      }
    )
  }
}

module.exports = (socket, SocketManager) => {
  socket.on(EventTypes.RUN_CMD, message => SocketManager.checkAuth(socket, message, runCmd))
}
