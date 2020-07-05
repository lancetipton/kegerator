import React from 'react'
import { View, Text } from 'SVComponents'
import { withAppHeader, Tabbar } from 'SVComponents'
import { displayName } from 'SVConfig'

const TabScreen = props => (
  <View>
    <Text>{ props.title || "I am a vew" }</Text>
  </View>
)

const tabs = [
  {
    title: 'Containers',
    id: 'Containers',
    screen: TabScreen,
  },
  {
    title: 'Images',
    id: 'Images',
    screen: TabScreen,
  },
  {
    title: 'Syncs',
    id: 'Syncs',
    screen: TabScreen,
  },
]

export const RootContainer = withAppHeader(displayName, props => {
  return (
    <>
      <Text>Kegerator - Docker Container Management</Text>
      <Tabbar tabs={ tabs } />
    </>
  )
})

