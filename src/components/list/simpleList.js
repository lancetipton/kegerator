import React,  { useState } from 'react'
import { useStyles } from 'SVHooks'
import { get, checkCall } from '@ltipton/jsutils'
import { useTheme } from '@simpleviewinc/re-theme'
import {
  Grid,
  ListHeader,
  ListItem,
  Slider,
} from 'SVComponents'

const buildStyles = (theme, styles={}) => {
  return {
    main: {
      ...styles.main,
      ...theme.flex.column,
    },
    content: {
      header: {},
      slider: {},
      item: {}
    }
  }
}

// Need to add an Item Render method
// This will allow passing in the render method for each item
// That We can define the ListItem seperatly and make this component reusable
// Should do the same for ListHeader
const RenderListItems = ({ items, group, onItemPress }) => {
  return Object.entries(items)
    .map(([ key, meta ]) => {
      return (
          <ListItem
            key={`${group}-${key}`}
            title={ key }
            onItemPress={ onItemPress }
            { ...meta }
          />
        )
    })
}

const RenderList = props => {
  const { group, items, meta, onHeaderPress, onItemPress, styles, initialToggle } = props

  const [ toggled, setToggled ] = useState(initialToggle || false)

  const onTogglePress = event => {
    checkCall(onHeaderPress, event)
    setToggled(!toggled)
  }

  return (
    <>
      <ListHeader
        toggled={ toggled }
        onPress={ onTogglePress }
        title={ group }
        styles={styles.content.header }
      />
      <Slider
        dataClass='sub-items-slider'
        styles={ styles.content.slider }
        toggled={ toggled }
      >
        <RenderListItems
          items={ items }
          group={ group }
          onItemPress={ onItemPress }
          listStyles={ styles.content.item }
        />
      </Slider>
    </>
  )

}

// Need to move tasks spacific data outside of this component
// Should create a RenderTasks component, and use this inside it
// Which will make this component reuseable
export const SimpleList = (props) => {
  const { items, onHeaderPress, onItemPress, styles, toggled } = props
  
  const theme = useTheme()
  const listStyles = useStyles(styles, props, buildStyles)

  return Object.entries(items)
    .map(([ key, meta ]) => {
      return (
        <Grid
          data-class="simple-list"
          key={`${meta.group}-${key}`}
          style={ listStyles.main }
        >
          <RenderList
            { ...props }
            group={ key }
            items={ meta.tasks }
            styles={ listStyles }
            initialToggle={ toggled }
          />
        </Grid>
      )
    })
}