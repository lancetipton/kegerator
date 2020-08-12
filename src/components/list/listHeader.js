import React, { useMemo } from 'react'
import { wordCaps, isStr } from '@ltipton/jsutils'
import {
  H6,
  Icon,
  Row,
  View,
} from 'SVComponents'
import { useStyles, useToggleAnimate } from 'SVHooks'
import { useTheme, useThemeHover } from '@simpleviewinc/re-theme'
import { get } from '@ltipton/jsutils'
import {
  Animated,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native'

const TouchableWithFeedback = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : TouchableOpacity

const buildStyles = (theme, styles) => {
  return {
    default: {
      main: {
        cursor: 'pointer',
        backgroundColor: theme.tapColors.headerBackground,
      },
      content: {
        main: {
          ...theme.flex.justify.between,
          ...theme.flex.align.center,
          paddingVertical: (theme.padding.size / 3),
          paddingHorizontal: (theme.padding.size),
          ...get(styles, 'row.default'),
        },
        title: {
          color: theme.colors.palette.gray01,
          fontWeight: '700',
          ...get(styles, 'title.default'),
        },
        toggle: {
          main: {
            color: theme.colors.palette.gray01,
            ...get(styles, 'toggle.default'),
          }
        },
      }
    },
    active: {
      main: {
        opacity: 0.5,
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
        main: {
          ...get(styles, 'toggle.hover'),
        }
      }
    }
  }

}

const buildIconProps = (icon, theme) => {
  return {
    name: 'chevron-down',
    color: theme.colors.palette.gray01,
    size: 20,
    ...(icon ? isStr(icon) ? { name: icon } : icon : null)
  }
}

const noAnimate = (toggled, current, { down, up }) => (
  !toggled && current === down) || (toggled && current === up
)

const HeaderIcon = ({ icon, styles, theme, toggled }) => {

  const iconProps = useMemo(
    () => buildIconProps(icon, theme),
    [ icon, theme ]
  )

  const { animation } = useToggleAnimate({
    toggled,
    values: { from: 0, to: 1 },
    config: { duration: 400 }
  })

  return (
    <Animated.View 
      data-class='list-header-icon'
      style={[
        get(styles, 'icon.animate'),
        {
          transform: [{
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg']
            }) 
          }]
        }
      ]}
    >
      <Icon { ...iconProps } styles={ styles } />
    </Animated.View>
  )

}

export const ListHeader = props => {

  const { onPress, styles, title, icon, toggled } = props
  const theme = useTheme()
  const mergeStyles = useStyles(styles, props, buildStyles)
  const [ rowRef, listStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)

  return (
    <TouchableWithFeedback
      data-class="list-header-main"
      activeOpacity={ get(mergeStyles, 'active.main.opacity') }
      ref={ rowRef }
      style={ listStyles.main }
      onPress={ onPress }
    >
    <Row
      style={ listStyles.content.main }
      data-class="list-header-row"
    >
      <H6
        style={ listStyles.content.title }
        data-class="list-header-title"
      >
        { wordCaps(title) }
      </H6>
      <HeaderIcon
        icon={ icon }
        styles={ listStyles.toggle }
        theme={ theme }
        toggled={ toggled }
      />
    </Row>
  </TouchableWithFeedback>
  )
}