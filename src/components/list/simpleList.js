import React from 'react'
import { useStyles } from 'SVHooks'
import { get } from 'jsutils'
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
  }
}

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

export const SimpleList = (props) => {
  const { items, onHeaderPress, onItemPress, styles, toggled } = props
  
  const theme = useTheme()
  const listStyles = useStyles(styles, props, buildStyles)
  return Object.entries(items)
    .map(([ key, meta ]) => {
      return (
        <Grid key={`${meta.group}-${key}`} style={ listStyles.main }  >
          <ListHeader
            title={ key }
            onHeaderPress={ onHeaderPress }
            styles={listStyles.header }
          />
            <RenderListItems
              items={ meta }
              group={ key }
              onItemPress={ onItemPress }
              listStyles={ listStyles.item }
            />
        </Grid>
      )
    })
}