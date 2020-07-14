import React, { useState, useLayoutEffect } from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { isFunc } from '@ltipton/jsutils'

export const useStyles = (styles, props, buildStyles) => {
  const theme = useTheme()
  const [ builtStyles, setBuiltStyles  ] = useState(null)
  
  useLayoutEffect(() => {

    isFunc(buildStyles) && setBuiltStyles(buildStyles(theme, styles, props))

  }, [ theme, styles, buildStyles ])

  return builtStyles || buildStyles(theme, styles)

}