import { isFunc, isStr, deepMerge } from '@ltipton/jsutils'
import React, { isValidElement } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Label, Icon } from 'SVComponents'

const TabIcon = ({ icon, styles, placement }) => {
  icon = isStr(icon)
    ? { name: icon, location: 'before' }
    : { location: 'before', ...icon }

  return placement === icon.location && (
    <Icon { ...icon } style={ styles[icon.location] } />
  )
}

export const Tab = ({ active, children, icon, id, onTabSelect, styles, title, Title }) => {
  const AsTitle = Title || title
  styles = active ? deepMerge(styles.default, styles.active) : styles.default

  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={() => onTabSelect(id)}
    >
      { children || (
        <View style={ styles.wrap } >
          { icon && ( <TabIcon icon={ icon } styles={ styles.icon } placement='before' /> )}
          { AsTitle && (
            <Label style={ styles.title || styles.text } >
              { AsTitle }
            </Label>
          )}
          { icon && ( <TabIcon icon={ icon } styles={ styles.icon } placement='before' /> )}
        </View>
      )}
    </TouchableOpacity>
  )
}
