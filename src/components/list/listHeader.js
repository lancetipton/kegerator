import React, { useRef } from 'react'
import { wordCaps, isStr } from '@ltipton/jsutils'
import {
  H6,
  Icon,
  Row,
  View,
} from 'SVComponents'
import { useStyles } from 'SVHooks'
import { useTheme, useThemeHover } from '@simpleviewinc/re-theme'
import { get } from '@ltipton/jsutils'
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native'

const TouchableWithFeedback =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const buildStyles = (theme, styles) => {
  return {
    default: {
      main: {
        // opacity: 0.75,
        cursor: 'pointer',
      },
      row: {
        ...theme.flex.justify.between,
        ...theme.flex.align.center,
        paddingVertical: (theme.padding.size / 3),
        paddingHorizontal: (theme.padding.size),
        backgroundColor: theme.tapColors.primary,
        ...get(styles, 'row.default'),
      },
      title: {
        color: theme.colors.palette.gray01,
        fontWeight: '700',
        ...get(styles, 'title.default'),
      },
      toggle: {
        color: theme.colors.palette.gray01,
        ...get(styles, 'toggle.default'),
      }
    },
    hover: {
      main: {
        opacity: 1,
      },
      row: {
        ...get(styles, 'row.hover'),
      },
      title: {
        ...get(styles, 'title.hover'),
      },
      toggle: {
        ...get(styles, 'toggle.hover'),
      }
    }
  }

}

export const ListHeader = props => {

  const { onHeaderPress, styles, title, icon } = props
  const theme = useTheme()
  const mergeStyles = useStyles(styles, props, buildStyles)
  const [ rowRef, listStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)

  const iconProps = {
    name: 'chevron-down',
    color: theme.colors.palette.gray01,
    size: 20,
    ...(icon ? isStr(icon) ? { name: icon } : icon : null)
  }

  return (
    <TouchableWithFeedback
      data-class="list-header-main"
      ref={ rowRef }
      style={ listStyles.main }
      onPress={ onHeaderPress }
    >
    <Row
      style={ listStyles.row }
      data-class="list-header-row"
    >
      <H6
        style={ listStyles.title }
        data-class="list-header-title"
      >
        { wordCaps(title) }
      </H6>
      <Icon { ...iconProps } />
    </Row>
  </TouchableWithFeedback>
  )
}