import React, { useState, useEffect } from 'react'
import { isFunc } from '@ltipton/jsutils'
import { noOpObj } from 'SVUtils'


const useOverride = args => {
  const { Default, defaultProps, Override, overrideProps, noRender } = args

  const isValidEl = isValidElement(Override)
  const isOverrideFunc = isFunc(Override)
  
  const built = !Override || (!isValidEl && !isOverrideFunc)
    ? { Component: Default, props: defaultProps }
    : { Component: Override, props: { ...defaultProps, ...overrideProps } }

  const [ Component, setComponent ] = useState(built.Component)
  
  useEffect(() => {
    const updated = !Override || (!isValidEl && !isOverrideFunc)
      ? Default
      : Override
    
    updated !== Component && setComponent(updated)

  }, [ Default, Override ])

  return noRender
    ? checkCall(() => {
        Component.defaultProps = props
        return Component
      })
    : (<Component {...props} />)

}