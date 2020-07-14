import React from 'react'
import { get, isStr } from '@ltipton/jsutils'
import { Icon, View, Row, Text } from 'SVComponents'
import { isValidComponent } from 'SVUtils'

const renderCustomOrDefault = (Component, DefComponent, props) => {
  return isValidComponent(Component)
    ? (<Component { ...props } />)
    : (<DefComponent { ...props } />)
}

const RenderActions = ({ actions, ...props }) => {
  return actions && (
    <View data-class='list-item-actions' { ...props } >
      
    </View>
  )
}

const RenderAvatar = ({ avatar, ...props }) => {
  return avatar && (
    <View data-class='list-item-avatar' {...props} >
      
    </View>
  )
}

const RenderIcon = ({ icon, style, ...props }) => {
  icon = isStr(icon) ? { name: icon } : icon
  return icon && (
    <Icon
      data-class='list-item-icon'
      styles={ style }
      { ...props }
      { ...icon }
    />
  )
}

const RenderTitle = props => {
  return title && (
    <Text data-class='list-item-title' { ...props } >
      { title }
    </Text>
  )
}

export const ListItem = props => {
  const {
    actions,
    avatar,
    children,
    components,
    icon,
    onRowPress,
    styles={},
    subtitle,
    title,
  } = props

  return (
    <Row onPress={ onRowPress } style={ styles.row } >
      { children || ([
        renderCustomOrDefault(
          components.avatar,
          RenderAvatar,
          { key: 'list-item-avatar', avatar, style: styles.avatar },
        ),
        renderCustomOrDefault(
          components.icon,
          RenderIcon,
          { key: 'list-item-icon', icon, style: styles.icon }
        ),
        renderCustomOrDefault(
          components.title,
          RenderTitle,
          { key: 'list-item-title', title, style: styles.title }
        ),
        renderCustomOrDefault(
          components.actions,
          RenderActions,
          { key: 'list-item-actions', actions, style: styles.actions }
        )
      ])}
    </Row>
  )
}