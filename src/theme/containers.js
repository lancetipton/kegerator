import { tapColors } from './tapColors'
import { get } from '@ltipton/jsutils'

export const containers = {
  containers: {
    root: {
      main: {
        height: '100%',
        minHeight: 'calc( 100vh - 70px )',
        backgroundColor: get(tapColors, 'appBackGround'),
      },
      sidebar: {
        main: {
          position: 'fixed',
          top: '70px',
          left: 0,
          zIndex: 1,
          width: '200px',
          minHeight: 'calc( 100vh - 70px )',
        },
      },
      screen: {
        main: {
          position: 'relative',
          left: '200px',
          minHeight: 'calc( 100vh - 70px )',
          maxWidth: 'calc( 100vw - 200px )',
        }
      }
    }
  }
}