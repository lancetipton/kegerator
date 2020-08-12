import React, { useState } from 'react'
import { wordCaps } from '@ltipton/jsutils'
import { displayName } from 'SVConfig'
import {
  SimpleList,
  Sidebar,
  withAppHeader,
  View,
} from 'SVComponents'
import { ActiveScreen } from './screens/activeScreen'
import { useTheme } from '@simpleviewinc/re-theme'
import { useSelector, shallowEqual } from 'react-redux'

const commands = {
  docker: {
    list: {
      description: 'List docker items',
      command: 'keg docker {{ type }} ls',
      options: {
        type: {
          description: 'Type of docker item to list',
          type: 'array',
          options: [
            'containers',
            'images',
            'syncs',
            'volumes',
          ]
        },
      }
    },
    core: {
      description: 'Run an action on the keg-core repo',
      command: 'keg core {{ action }}',
      options: {
        action: {
          description: 'Type of docker item to list',
          type: 'array',
          options: [
            'build',
            'kill',
            'log',
            'start',
            'restart',
          ]
        },
      }
    },
  }
}

const onHeaderPress = event => {}
const onItemPress = (event) => {}

export const RootContainer = withAppHeader(displayName, props => {
  const theme = useTheme()
  const containerStyles =  theme.containers.root

  const tasks = useSelector(({ items }) => (items.tasks || {}), shallowEqual)

  return (
    <View style={ containerStyles.main } >
      <Sidebar styles={ containerStyles.sidebar } >
        <SimpleList
          items={ tasks }
          onHeaderPress={ onHeaderPress }
          onItemPress={ onItemPress }
        />
      </Sidebar>
      <ActiveScreen { ...props } styles={ containerStyles.screen }  />
    </View>
  )
})

