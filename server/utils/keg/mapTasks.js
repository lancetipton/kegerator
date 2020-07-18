const { isStr, isObj } = require('jsutils')
const testTasks = require('./tasks_dev.json')

const convertTask = (task, parent) => {
  converted = {}
  parent && (converted.group = parent)
  
  isObj(task.tasks) && (converted.subTasks = loopTasks(task.tasks, task.name, converted))

  return converted
}

const loopTasks = (tasks, parent, mapped) => {
  return Object.entries(tasks)
    .reduce((joined, [ name, task ]) => {
      !isStr(task) && (joined[name] = convertTask(task, parent))

      return joined
    }, mapped)
}

const mapTasks = tasks => {
  const mapped = {}
  return loopTasks(tasks || testTasks, mapped)
}

module.exports = {
  mapTasks
}