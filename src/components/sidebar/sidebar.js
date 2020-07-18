import { View } from 'SVComponents'
import { useStyles } from 'SVHooks'
import { get } from 'jsutils'
import { useTheme } from '@simpleviewinc/re-theme'
import React from 'react'

const buildStyles = (theme, styles={}) => {

  return {
    main: {
      position: 'fixed',
      top: 0,
      left: 0,
      minWidth: '200px',
      minHeight: '100vh',
      backgroundColor: get(theme, 'colors.palette.black03'),
	    boxShadow: '0px 0px 18px -1px rgba(0,0,0,0.75)',
      zIndex: 1,
      ...styles.main
    },
  }
}

export const Sidebar = props => {
  const {
    children,
    styles
  } = props
  
  const theme = useTheme()
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