import React, { useState, useLayoutEffect, useRef } from 'react'
import { get, isFunc } from 'jsutils'
import { useTheme } from '@simpleviewinc/re-theme'
import { View } from 'SVComponents'

const getHeight = (height, toggled) => {
  return toggled
    ? height
    : height && !toggled
      ? 0
      : null
}

export const Slider = props => {
  
  const theme = useTheme()

  const slideRef = useRef(null)

  const { defHeight, Element } = props
  const [ height, setHeight ] = useState(defHeight || null)

  useLayoutEffect(() => {
    const curHeight = get(slideRef, 'current.offsetHeight')

    if(curHeight === 0) return

    height !== curHeight && setHeight(curHeight)
  }, [ height ])

  console.log(`---------- theme ----------`)
  console.log(theme)

  const sliderStyle = theme.join(
    // get(theme, 'transition.maxHeight'),
    get(theme, 'layout.full.width'),
    get(props, 'style'),
    { maxHeight: getHeight(height, props.toggled) },
  )

  return (
    <View data-class='slider' ref={ slideRef } style={ sliderStyle } >
      { isFunc(Element) && <Element setHeight={ setHeight } parentHeight={ height } /> }
      { props.children }
    </View>
  )
}
