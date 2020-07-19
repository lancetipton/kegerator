const { spawnCmd, asyncCmd } = require('spawn-cmd')
const path = require('path')
const { uuid, isArr } = require('@ltipton/jsutils')
const rootDir = require('KegRoot')
const kegScript = path.join(rootDir, `./scripts/runKegTask.sh`)


const KegCLI = require('keg-cli/keg-cli')
console.log(`---------- KegCLI ----------`)
console.log(KegCLI)


const addKegScript = (cmd) => {
  return `/bin/sh ${ kegScript } ${ cmd }`
}

const getKegTasks = async () => {
  
  
  // const tasks = await asyncCmd(addKegScript(`keg cli print `))
  // console.log(`---------- tasks ----------`)
  // console.log(tasks)
  
}


module.exports = {
  getKegTasks
}