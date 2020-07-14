import React from 'react'
import { get } from 'jsutils'
import { Icon, View, Row, Text } from 'SVComponents'

const RenderContent = props => {
  
}

export const ListItem = props => {
  const {
    avatar,
    children,
    icon,
    styles={},
    subtitle,
    title,
  } = props

  return (
    <Row>
      { icon &&  (<Icon style={ styles.icon } name={ icon } />)}
      { title && (<Text style={ styles.title } >{ title }</Text>) }
    </Row>
  )
}