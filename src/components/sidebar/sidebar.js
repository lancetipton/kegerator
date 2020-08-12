import { View } from 'SVComponents'
import { useStyles } from 'SVHooks'
import { get } from '@ltipton/jsutils'
import React from 'react'

const buildStyles = (theme, styles) => {
  styles.main = {
    backgroundColor: get(theme, 'tapColors.backGround'),
    ...styles.main,
  }

  return styles
}

export const Sidebar = props => {
  const {
    children,
    styles
  } = props

  const sidebarStyles = useStyles(styles, props, buildStyles)

  return (
    <View 
      data-class='sidebar-main'
      style={ sidebarStyles.main }
    >
      { children }
    </View>
  )
}