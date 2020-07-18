import React from 'react'
import { get, isStr } from 'jsutils'
import { Icon, View, Row, Text } from 'SVComponents'
import { isValidComponent } from 'SVUtils'
import { useStyles } from 'SVHooks'
import { useTheme, useThemeHover } from '@simpleviewinc/re-theme'
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native'

const noOpObj = {}

const TouchableWithFeedback =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const renderCustomOrDefault = (Component, DefComponent, props) => {
  return isValidComponent(Component)
    ? (<Component { ...props } />)
    : (<DefComponent { ...props } />)
}

const RenderActions = ({ actions, ...props }) => {
  return actions && (
    <View data-class='list-item-actions' { ...props } >
      
    </View>
  ) || null
}

const RenderAvatar = ({ avatar, ...props }) => {
  return avatar && (
    <View data-class='list-item-avatar' {...props} >
      
    </View>
  ) || null
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
  ) || null
}

const RenderTitle = ({ style, title, ...props }) => {
  return title && (
    <Text
      data-class='list-item-title'
      { ...props }
    >
      { title }
    </Text>
  ) || null
}

const buildStyles = (theme, styles) => {
  return {
    default: {
      main: {

      },
      row: {
        ...theme.flex.justify.start,
        ...theme.flex.align.center,
        backgroundColor: theme.colors.surface.primary.colors.dark,
        paddingVertical: (theme.padding.size / 3),
        paddingHorizontal: (theme.padding.size),
        borderTopWidth: 1,
        borderTopColor: theme.colors.palette.black02,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.palette.black02,
        ...get(styles, 'row.default'),
      },
      avatar: {
        
      },
      icon: {
        
      },
      title: {
        
      },
      actions: {
        
      }
    }
  }
}

export const ListItem = props => {
  const {
    actions,
    avatar,
    children,
    components=noOpObj,
    icon,
    onItemPress,
    styles=noOpObj,
    subtitle,
    title,
  } = props

  const theme = useTheme()
  const mergeStyles = useStyles(styles, props, buildStyles)
  const [ rowRef, itemStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)


  return (
      <TouchableWithFeedback
        style={[ itemStyles.main ]}
        onPress={onItemPress}
      >
      <Row style={ itemStyles.row } >
        { children || ([
          renderCustomOrDefault(
            components.avatar,
            RenderAvatar,
            { key: 'list-item-avatar', avatar, style: itemStyles.avatar },
          ),
          renderCustomOrDefault(
            components.icon,
            RenderIcon,
            { key: 'list-item-icon', icon, style: itemStyles.icon }
          ),
          renderCustomOrDefault(
            components.title,
            RenderTitle,
            { key: 'list-item-title', title, style: itemStyles.title }
          ),
          renderCustomOrDefault(
            components.actions,
            RenderActions,
            { key: 'list-item-actions', actions, style: itemStyles.actions }
          )
        ])}
      </Row>
    </TouchableWithFeedback>
  )
}