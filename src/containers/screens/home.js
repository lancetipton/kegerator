import React, { useState } from 'react'
import {
  Containers,
  Images,
  Syncs,
  Tabbar,
  Text,
  View
} from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import { useStyles } from 'SVHooks'

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

const buildStyles = (theme, styles) => {
  return styles
}

export const Home = props => {
  const {
    styles,
  } = props
  
  const screenStyles = useStyles(styles, props, buildStyles)

  return (
    <View data-class="home-screen" style={ screenStyles.main } >
      <Tabbar location='top' tabs={ tabs } />
    </View>
  )
}