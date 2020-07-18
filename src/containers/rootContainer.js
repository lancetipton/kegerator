import React, { useState } from 'react'
import { wordCaps } from 'jsutils'
import { displayName } from 'SVConfig'
import {
  Containers,
  Images,
  H6,
  Syncs,
  SimpleList,
  Sidebar,
  Tabbar,
  Text,
  View,
  withAppHeader,
} from 'SVComponents'

const tabs = [
  {
    title: 'Containers',
    id: 0,
    screen: Containers,
  },
  {
    title: 'Images',
    id: 1,
    screen: Images,
  },
  {
    title: 'Syncs',
    id: 2,
    screen: Syncs,
  },
]

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

const onHeaderPress = (toggled, setToggled) => {
  return event => setToggled(!toggled)
}

const onItemPress = (event) => {
  console.log(event)
}


export const RootContainer = withAppHeader(displayName, props => {
  
  const [ toggled, setToggled ] = useState(null)
  
  return (
    <>
      <Sidebar>
        <SimpleList
          items={ commands }
          onHeaderPress={ onHeaderPress(toggled, setToggled) }
          onItemPress={ onItemPress }
        />
      </Sidebar>
      <Tabbar tabs={ tabs } />
    </>
  )
})

