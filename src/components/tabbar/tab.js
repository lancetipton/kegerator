import { get, isFunc, isStr, deepMerge } from 'jsutils'
import React, { isValidElement } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Label, Icon } from 'SVComponents'
import { isValidComponent } from 'SVUtils/validate'

const TabIcon = ({ icon, location, styles }) => {
  icon = isStr(icon) ? { name: icon } : icon
  return (<Icon data-class="tabbar-tab-icon" { ...icon } style={ styles[location] } />)
}

const BuildChildren = (props) => {

  // If there are custom children, just return
  if(props.children) return props.children

  const { active, styles, icon, Title, title } = props
  const TitleComp = Title || title
  const Components = []

  // If there's a title component || title string add it to the components array
  TitleComp && Components.push(
    // Check if it's a react component
    isValidComponent(TitleComp)
      ? (<TitleComp key={ 'title' } { ...props } />)
      : (
          <Label
            data-class='tabbar-tab-title'
            key={ 'title' }
            style={ styles.title || styles.text }
          >
            { TitleComp }
          </Label>
        )
  )

  // If not icon component, just return
  if(!icon) return Components

  // Get the location of the icon
  const location = get(icon, 'location', 'before')
  // Get the array add method based on the location
  const method = location === 'before' ? 'unshift' : 'push'

  // Use the method to add the icon component to the Components array
  Components[method](
    isValidComponent(icon)
      // If icon is a component, then call it and return 
      ? (<icon key={ 'icon' } style={ styles.before } />)
      // Otherwise use the KegComponents Icon
      : (<TabIcon 
          key={ 'icon' }
          active={ active }
          icon={ icon }
          location={ location }
          styles={ styles.icon }
        />)
  )

  return Components

}

export const Tab = props => {
  const { active, id, onTabSelect, styles } = props
  const mergedStyles = active ? deepMerge(styles.default, styles.active) : styles.default

  return (
    <TouchableOpacity
      data-class="tabbar-tab"
      style={ mergedStyles.container }
      onPress={() => onTabSelect(id)}
    >
      <BuildChildren {...props} styles={ mergedStyles } />
    </TouchableOpacity>
  )
}
