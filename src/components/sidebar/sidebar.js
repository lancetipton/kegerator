import { View } from 'SVComponents'
import { useStyles } from 'SVHooks'
import { get } from 'jsutils'
import React from 'react'

const buildStyles = (theme, styles) => {
  styles.main.backgroundColor = get(theme, 'colors.palette.black03')

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