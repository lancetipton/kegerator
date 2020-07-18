import { keg } from 'SVConfig'
import { deepMerge, get } from 'jsutils'

const ENV = process.env.NODE_ENV || 'development'
const commandsType = 'kegerator'
const appConfig = keg.config

// Merge the settings with the default
const config = deepMerge(
  appConfig.default,
  appConfig[ ENV ][ commandsType ] || appConfig.development[ commandsType ]
)

// Build the config for the environment
const socketConfig = { ...config.websocket, ...config.websocket.client }

// Remove the environments, after it's been merged
delete socketConfig.client
delete socketConfig.server

// Export the update config
export const AppConfig = { ...config, websocket: socketConfig }
