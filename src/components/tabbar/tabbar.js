import React, { isValidElement, useMemo, useCallback, useState } from 'react'
import { Tab } from './tab'
import { TabView } from './tabview'
import { checkCall } from '@ltipton/jsutils'
// import { useThemePath } from 'SVHooks'
import { useTheme } from '@simpleviewinc/re-theme'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

const barStyles = {
  main: {
    flex: 1,
    flexGrow: 1,
  },
  fixed: {
    main: {
      position: 'fixed',
      right: 0,
      left: 0,
    },
    top: {
      top: 0,
    },
    bottom: {
      bottom: 0
    }
  },
  container: {
    
  },
  scroll: {
    
  },
  tabview: {
    paddingTop: 30,
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  bar: {
    minHeight: 50,
    flexDirection: 'row',
  },
  tab: {
    default: {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        
      },
      wrap: {
        
      },
      icon: {
        before: {
          
        },
        after: {
          
        },
      }
    },
    active: {
      
    },
  }
}

const _onScroll = event => {}

const Bar = ({ children, styles }) => {
  return (
    <View style={ styles } >
      { children }
    </View>
  )
}

// tab = { component, key, id, screen, title, icon }
const Tabs = ({ activeIndex, tabs, styles, onTabSelect }) => {
  return useMemo(() => {
    return tabs.map((tab, index) => {
      const { Component, component, id, key, ...tabProps } = tab
      const keyId = key || id || index
      
      return (
        <Tab
          key={ keyId }
          id={ keyId }
          { ...tabProps }
          styles={ styles }
          onTabSelect={ onTabSelect }
          active={ activeIndex === index }
        >
          { Component || component }
        </Tab>
      )
    })
  }, [ activeIndex, tabs, styles ])
}

export const Tabbar = props => {
  const {
    activeTab,
    location='bottom',
    fixed,
    onScroll,
    onTabSelect,
    scroll,
    styles,
    tabs,
    themePath,
    type='default',
  } = props
  
  const theme = useTheme()

  // const [ barStyles ] = useThemePath(themePath || `tabbar.${type}`, styles)
  
  const scrollEvent = useCallback((event) => {
    checkCall(onScroll, event)
    _onScroll(event)
  }, [ _onScroll, onScroll ])

  const [ activeIndex, setActiveIndex ] = useState(activeTab)
  const active = tabs[activeIndex]

  const tabSelectEvent = useCallback((index) => {
    if(!tabs) return

    // Call the event hook, and if it returns true, then skip the state update
    const skip = checkCall(onTabSelect, index, tabs)

    // If nothing is returned, then update the tab index
    !skip && setActiveIndex(index)

  }, [ tabs ])

  const ActiveScreen = active &&
    isValidElement(active.Screen || active.screen) && 
    (active.Screen || active.screen)

  const TabComponents = []
  const addMethod = location === 'bottom' ? 'unshift' : 'push'
  
  tabs && TabComponents.push(
    <Bar
      key={ 'tabbar' }
      styles={theme.join(
        barStyles.bar,
        fixed && { ...barStyles.fixed.main, ...barStyles.fixed[location] }
      )}
    >
    { tabs && (
      <Tabs 
        tabs={ tabs }
        activeIndex={ activeIndex }
        styles={ barStyles.tab }
        onTabSelect={ tabSelectEvent }
      />
    )}
    </Bar>
  )

  tabs && TabComponents[addMethod](
    <TabView
      key={ 'tabview' }
      scroll={ scroll }
      onScroll={ scrollEvent }
      styles={ barStyles }
    >
      { ActiveScreen && (<ActiveScreen { ...active } styles={ barStyles } />)}
    </TabView>
  )

  return (
    <View style={ barStyles.main } >
      { TabComponents }
    </View>
  )

}


