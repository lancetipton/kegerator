const { spawnCmd, asyncCmd } = require('spawn-cmd')

/**
 * Executes an inline async call to the command line
 * @param {string} cmd - Command to be run
 * @param {Array} args - Arguments to run a command
 * @param {Array|Object*} args.options - Options to pass to the node child process
 * @param {string*} args.location - Path the child process will use as the cwd
 *
 * @returns {*} - Response from async exec cmd
 */
const executeCmd = (cmd, ...args) => {
  // Get the options and location from the args
  const [ options={}, location=process.cwd() ] = args

  // Ensure the cwd is set
  options.cwd = options.cwd || location

  return asyncCmd(cmd, options)
}


module.exports  = {
  executeCmd
}