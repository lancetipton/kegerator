import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme'
import { StatusBar } from 'react-native'
import {
  ReThemeProvider,
} from '@simpleviewinc/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { Router } from 'SVComponents/router'
import { SafeAreaView, WebSocket, View } from 'SVComponents'
import { checkCall, get } from '@ltipton/jsutils'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'


const checkAppInit = setInit => {
  setInit(true)
  checkCall(initAppAction)
}

const App = props => {
  const [ init, setInit ] = useState(false)

  useEffect(() => {
    !init && checkAppInit(setInit)
  })

  return (
    init && (
      <View data-class='root-main' style={ theme.app.main }>
        <StatusBar barStyle={'default'} />
        <Router history={getHistory()}>
          <SafeAreaView>
            <Provider store={getStore()}>
              <ReThemeProvider theme={ theme }>
                <WebSocket>
                  { /* setup routes from navigation config */ }
                  <ContainerRoutes navigationConfigs={keg.routes} />
                </WebSocket>
              </ReThemeProvider>
            </Provider>
          </SafeAreaView>
        </Router>
      </View>
    )
  )
}

export default App
