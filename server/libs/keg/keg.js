const fs = require('fs')
const path = require('path')
const rootDir = require('KegRoot')
const { spawnCmd, asyncCmd } = require('spawn-cmd')
const { uuid, isArr, isStr, isObj } = require('@ltipton/jsutils')
const kegScript = path.join(rootDir, `./scripts/runKegTask.sh`)
const tasksPath = path.join(__dirname, '../../../../', 'tasks.json')

const writeFile = (filePath, data, format='utf8') => {
  return new Promise((res, rej) => fs.writeFile(filePath, data, format, (err, success) => 
    err? rej(err) : res(success || true) 
  ))
}

const addKegScript = (cmd) => {
  return `/bin/bash ${ kegScript } ${ cmd }`
}

const filterTasks = toFilter => {
  return Object.keys(toFilter).reduce((tasks, key) => {
    isObj(toFilter[key]) && (tasks[key] = toFilter[key])
    
    if(tasks[key] && tasks[key].tasks)
      tasks[key].tasks = filterTasks(tasks[key].tasks)
    
    return tasks
  }, {})
}

const loadTasks = () => {
  const allTasks = require(tasksPath)

  return filterTasks(allTasks)
}

const getKegTasks = async () => {
  try {
    return loadTasks()
  }
  catch(err){
    const { error, data } = await asyncCmd(addKegScript(`cli print tasks`))
    await writeFile(tasksPath, data)

    return loadTasks()
  }

}


module.exports = {
  getKegTasks
}