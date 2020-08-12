import { deepMerge } from '@ltipton/jsutils'
import { app } from './app'
import { appHeader } from './appHeader'
import { containers } from './containers'
import { transition } from './transition'
import { tapColors } from './tapColors'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'

export const theme = deepMerge(
  kegComponentsTheme,
  containers,
  {
    app,
    appHeader,
    transition,
    tapColors
  },
)