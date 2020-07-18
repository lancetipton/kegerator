import React, { useState } from 'react'
import * as Screens from './'

export const ActiveScreen = ({ screen, ...props }) => {
  const Screen = Screens[screen || 'Home']
  return (<Screen {...props} />)
}