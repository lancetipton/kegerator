import { deepMerge } from 'jsutils'
import { app } from './app'
import { containers } from './containers'
import { transition } from './transition'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'

export const theme = deepMerge(kegComponentsTheme, transition, app, containers)
