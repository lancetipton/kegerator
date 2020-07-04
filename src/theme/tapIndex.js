import { deepMerge } from 'jsutils'
import { app } from './app'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'

export const theme = deepMerge(kegComponentsTheme, app)
