import React from 'react'
import { View, Text } from 'SVComponents'
import { withAppHeader, Tabbar } from 'SVComponents'
import { displayName } from 'SVConfig'

const TabScreen = props => {
  return (
    <View>
      <Text>{ props.title || "I am a vew" }</Text>
    </View>
  )
}

const tabs = [
  {
    title: 'Containers',
    id: 0,
    screen: TabScreen,
  },
  {
    title: 'Images',
    id: 1,
    screen: TabScreen,
  },
  {
    title: 'Syncs',
    id: 2,
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

