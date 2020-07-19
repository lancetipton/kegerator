import { tapColors } from './tapColors'
import { get } from '@ltipton/jsutils'

export const app = {
  main: {
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    maxWidth: '100%',
    backgroundColor: get(tapColors, 'appBackGround'),
  }
}
