import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { WSService } from 'SVServices'

const isDev = process.env.NODE_ENV === 'development'

export const WebSocketComp = props => {
  const { token, websocket, connected, children } = props

  useEffect(() => {

    !WSService.socket && WSService.initSocket(websocket, token)

    return () => !isDev && WSService.disconnect()

  }, [])

  return (
    <>
      { children }
    </>
  )

}

export const WebSocket = connect(({ tap, websocket }) => {
  return {
    websocket: tap.websocket,
    token: tap.token,
    connected: websocket.connected,
  }
})(WebSocketComp)
 