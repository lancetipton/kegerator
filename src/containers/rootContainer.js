import React from 'react'
import { displayName } from 'SVConfig'
import {
  Containers,
  Images,
  H6,
  Syncs,
  ListItem,
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
      group: 'docker',
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
      group: 'containers',
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

const RenderListHeader = ({ title }) => {
  return (
    <View>
      <H6>{ title }</H6>
    </View>
  )
}

const RenderListItems = ({ items }) => {
  return Object.entries(items)
    .map(([ key, meta ]) => {
      return (
        <React.Fragment key={`${meta.group}-${key}`} >
          <RenderListHeader title={ meta.group } />
          <ListItem
            key={`${meta.group}-${key}`}
            title={ key }
            { ...meta }
          />
        </React.Fragment>
        )
    })
}

const RenderSideBar = () => {
  return (
    <Sidebar>
      { Object.entries(commands)
      .map(([ key, meta ]) => {
        return (
          <RenderListItems key={ key } items={ meta } />
          )
      }) }
    </Sidebar>
  )
} 


export const RootContainer = withAppHeader(displayName, props => {
  return (
    <>
      <RenderSideBar />
      <Tabbar tabs={ tabs } />
    </>
  )
})

