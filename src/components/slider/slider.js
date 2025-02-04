import React, { useState, useLayoutEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { get } from '@ltipton/jsutils'
import { View } from 'SVComponents'
import { isValidComponent } from 'SVUtils'

/**
 * Checks if the animation should NOT run
 * @param {boolean} toggled - Current state of the Slider toggled open
 * @param {number} current - Current height of the Slider / animated.value
 * @param {number} heights - Ref that holds the initial and max heights of the slider
 *
 * @returns {boolean} - If the animation should NOT run
 */
const noAnimate = (toggled, current, { initial, max }) => (
  !toggled && current === initial) || (toggled && current === max
)

/**
 * Default styles for slider to ensure consistency
 * @object
 */
const defStyles = StyleSheet.create({ main: { overflow: 'hidden', width: "100%" }})

/**
 * Default keg cli task
 * @param {Object} props - props passed from parent component
 * @param {number} props.initial - Initial height of the slider
 * @param {Function|Component} props.Element - Child Element that goes inside the Slider
 * @param {string} props.dataClass - Custom class to add to the slider
 * @param {Object} props.styles - Custom styles to add to the slider
 * @param {boolean} props.toggled - Is the slider toggled open
 *
 * @returns {Component} - Slider Component
 */
export const Slider = props => {
  const { initial, Element, dataClass, styles, toggled, ...childProps } = props

  // Define the default heights as a ref
  const heights = useRef({ initial: initial || 0, max: 0 })
  // Define the animated value as a ref
  const [ animation ] = useState(new Animated.Value(initial))

  // Define a helper to update the total max height of the slider
  // Gets called from the onLayout callback of the View wrapper
  const setMaxHeight = event => (heights.current.max = event.nativeEvent.layout.height)

  // Use useLayoutEffect to check if the slider should be animated
  // Within the hook, toggled flag defines how to update the animated value
  // To Open: toggled === true === should animate open
  // To Close: toggled === false === should animate close
  useLayoutEffect(() => {

    // Check if we should animate the slider
    // If the values have not changed, no need to animate
    if(noAnimate(toggled, animation._value, heights.current)) return

    const { initial, max } = heights.current

    // Define the from and to values for the animation based on toggled flag
    const heightChanges = toggled
      ? { from: initial, to: max }
      : { from: max, to: initial }

    // Update the animation value to animate from
    animation.setValue(heightChanges.from)
    // Start the animation, from value ==> to value
    Animated.spring(animation, { toValue: heightChanges.to }).start()

  // Add toggled as a dep, so anytime it changes, we run the hook code
  }, [ toggled ])

  return (
    <Animated.View 
      data-class={`slider ${ dataClass || '' }`.trim()}
      style={[ defStyles.main, get(styles, 'main'), { height: animation } ]}
    >
      <View
        data-class='slider-content-wrapper'
        onLayout={ setMaxHeight }
        style={ get(styles, 'content') }
      >
        {
          isValidComponent(Element)
            ? (<Element { ...childProps } styles={ styles } />)
            : props.children 
        }
      </View>
    </Animated.View>
  )
}
