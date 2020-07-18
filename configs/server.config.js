// For mac, may need to symlink docker.sock
// ln -s ~/Library/Containers/com.docker.docker/Data/docker.sock /var/run/docker.sock
const serverConfig = require('./app.config.json')
const { deepMerge, get } = require('jsutils')
let commandsType = process.env.COMMANDS || 'kegerator'
const nodeEnv = process.env.NODE_ENV || 'development'
const isServer = typeof window === 'undefined'

// Merge the settings with the default
const config = deepMerge(
  serverConfig.default,
  nodeEnv === 'development'
    ? serverConfig.development[ commandsType ]
    : serverConfig[ nodeEnv ][ commandsType ]
)

// Figure out the environment
const envSetup = isServer
  ? [ 'server', 'client' ]
  : [ 'client', 'server' ]

// Build the config for the environment
const socketConfig = { ...config.websocket, ...config.websocket[ envSetup[0] ] }

// Remove the environments, after it's been merged
delete socketConfig[ envSetup[0] ]
delete socketConfig[ envSetup[1] ]


// Export the update config
module.exports = { ...config, websocket: socketConfig }
