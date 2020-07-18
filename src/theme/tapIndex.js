import { deepMerge } from 'jsutils'
import { app } from './app'
import { transition } from './transition'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'

export const theme = deepMerge(kegComponentsTheme, transition, app)
