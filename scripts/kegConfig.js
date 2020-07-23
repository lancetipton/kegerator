const { deepMerge } = require('@ltipton/jsutils')
const fs = require('fs')

;(() => {

  // Load the current cli config object
  const currentConfig = require(`/root/.kegConfig/cli.config.json`)
  
  // Join the current cli.config.json with a custom object
  // Update the paths in the custom config
  // to match the paths of the docker container
  const kegCore = `/keg/tap/node_modules/keg-core`
  const sVNm = `${ kegCore }/node_modules/@simpleviewinc`
  const dockerConfig = deepMerge(currentConfig, {
    cli : {
      paths: {
        kegConfig: '/root/.kegConfig',
        containers: '/keg/keg-cli/containers',
        core: kegCore,
        proxy: `/keg/keg-proxy`,
        regulator: `/keg/keg-regulator`,
        components: `${ sVNm }/keg-components`,
        resolver: `${ sVNm }/tap-resolver`,
        retheme: `${ sVNm }/re-theme`,
        keg: '/keg',
        cli: '/keg/keg-cli'
      },
    }
  })

  // Save the updated config as docker.config.json
  // This is so we don't overwrite the original, which could be a mounted volume
  const docConfigPath = `/root/.kegConfig/docker.config.json`
  fs.writeFileSync(docConfigPath, JSON.stringify(dockerConfig, null, 2))

  // Log the path to the custom docker config object
  // This is so a different script call this one can get the path
  // This works only if console.log is called once!
  console.log(docConfigPath)

})()
