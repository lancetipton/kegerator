import React from 'react'
import { get, isStr, capitalize } from '@ltipton/jsutils'
import { Icon, View, Row, Text } from 'SVComponents'
import { isValidComponent } from 'SVUtils'
import { useStyles } from 'SVHooks'
import { useTheme, useThemeHover } from '@simpleviewinc/re-theme'
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native'
import { ListItemAction } from './listItemAction'

import { ListItem as ListItemRNP } from 'react-native-elements'

const noOpObj = {}

const TouchableWithFeedback =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const renderCustomOrDefault = (Component, DefComponent, props) => {
  return isValidComponent(Component)
    ? (<Component { ...props } />)
    : (<DefComponent { ...props } />)
}

const RenderActions = ({ actions, styles, ...props }) => {
  const { actions:actionStyles } = styles

  return actions && (
    <View data-class='list-item-actions' style={ actionStyles.main } >
      { actions.map(action => action && (
        <ListItemAction
          key={ action.name }
          { ...props }
          { ...action }
          styles={ actionStyles.action }
        />
      ))}
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
      style={ style }
      { ...props }
    >
      { capitalize(title) }
    </Text>
  ) || null
}

const buildStyles = (theme, styles) => {
  return {
    default: {
      main: {
        backgroundColor: theme.tapColors.primary,
      },
      row: {
        ...theme.flex.justify.start,
        ...theme.flex.align.center,
        paddingVertical: (theme.padding.size / 3),
        paddingHorizontal: (theme.padding.size),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.palette.black02,
        ...get(styles, 'row.default'),
      },
      avatar: {
        
      },
      icon: {
        
      },
      title: {
        color: theme.tapColors.textColorAlt,
      },
      actions: {
        main: {
          
        },
        action: {
          main: {},
          content: {}
        }
      }
    }
  }
}

const ListItem = props => {
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
        data-class='list-item'
        style={[ itemStyles.main ]}
        onPress={onItemPress}
      >
      <Row style={ itemStyles.row } >
        { children || ([
          avatar && renderCustomOrDefault(
            components.avatar,
            RenderAvatar,
            { key: 'list-item-avatar', avatar, style: itemStyles.avatar },
          ),
          icon && renderCustomOrDefault(
            components.icon,
            RenderIcon,
            { key: 'list-item-icon', icon, style: itemStyles.icon }
          ),
          title && renderCustomOrDefault(
            components.title,
            RenderTitle,
            { key: 'list-item-title', title, style: itemStyles.title }
          ),
          actions && renderCustomOrDefault(
            components.actions,
            RenderActions,
            { key: 'list-item-actions', actions, styles: itemStyles.actions }
          )
        ])}
      </Row>
    </TouchableWithFeedback>
  )
}

export {
  ListItem,
  ListItemRNP
}