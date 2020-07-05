import React from 'react'
import { AppHeader, View } from 'SVComponents'
import { navigateBack } from 'SVActions/navigation/navigateBack'
import { isRootStack } from 'SVNavigation/isRootStack'
import { isStandalonePWA, isNative } from 'SVUtils/platform'

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
    return (
      <View style={{ height: '100vh' }} >
        <View>
          <AppHeader
            shadow
            title={title}
            leftIcon={
              !isRootStack() && (isStandalonePWA() || isNative())
                ? 'arrow-left'
                : null
            }
            onLeftClick={
              !isRootStack() && (isStandalonePWA() || isNative())
                ? () => navigateBack()
                : null
            }
          />
        </View>
        <Component {...props} />
      </View>
    )
  }

  return AppHeaderHoc
}
