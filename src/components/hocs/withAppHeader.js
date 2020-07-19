import React from 'react'
import { AppHeader, View, Text, H5 } from 'SVComponents'
import { navigateBack } from 'SVActions/navigation/navigateBack'
import { isRootStack } from 'SVNavigation/isRootStack'
import { isStandalonePWA, isNative } from 'SVUtils/platform'
import { useTheme } from '@simpleviewinc/re-theme'
import { useStyles } from 'SVHooks'
import { get } from '@ltipton/jsutils'

const buildStyles = (theme, styles) => {
  return {
    container: {
      marginBottom: '5px',
      ...get(styles, 'container'),
    },
    side: {},
    center: {},
    left: {
      main: {
        padding: '15px',
        ...get(styles, 'left.main'),
      },
      content: {
        title: {
          color: '#ffffff',
          fontWeight: 'bold',
          ...get(styles, 'left.content.main'),
        }
      }
    },
  }
}

/**
 * Wraps the component with AppHeader
 *
 * @param {Object} title - title on the app header
 * @param {Object} Component - React component to be wrapped
 *
 * @returns {function} - wrapped functional component
 */
export const withAppHeader = (title, Component) => {
  const AppHeaderHoc = props => {
    const theme = useTheme()
    const styles = useStyles(props.styles, props, buildStyles)
    return (
      <>
        <View>
          <AppHeader
            LeftComponent={(
              <View
                data-class='header-left-component'
                style={ styles.left.main }
              >
                <H5
                  data-class='header-left-title'
                  style={ styles.left.content.title }
                >
                  { title }
                </H5>
              </View>
            )}
          />
        </View>
        <Component {...props} />
      </>
    )
  }

  return AppHeaderHoc
}
