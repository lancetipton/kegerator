import React, { isValidElement } from 'react'
import { isFunc } from '@ltipton/jsutils'
import PropTypes from 'prop-types'

export const Override = (props) => {
  const { Default, defaultProps, Override, overrideProps } = props

  const isValidEl = isValidElement(Override)
  const isOverrideFunc = isFunc(Override)
  
  return !Override || (!isValidEl && !isOverrideFunc)
    ? (<Default {...defaultProps} >{props.children}</Default>)
    : isValidEl
      ? (<Override {...defaultProps} {...overrideProps}>{props.children}</Override>)
      : Override({ ...defaultProps, ...overrideProps })

}

Override.propTypes = {
  Default: PropTypes.elementType,
  defaultProps: PropTypes.object,
  override: PropTypes.func,
  overrideProps: PropTypes.object
}