const TAG_PREFIX = 'socket'

module.exports = {
  EventTypes: Object.freeze({
    TAG_PREFIX: TAG_PREFIX,
    
    // Socket events
    SET_ID: `${TAG_PREFIX}:SET_ID`,
    AUTH_TOKEN: `${TAG_PREFIX}:AUTH_TOKEN`,
    NOT_AUTHORIZED: `${TAG_PREFIX}:NOT_AUTHORIZED`,
    ADD_PEER: `${TAG_PREFIX}:ADD_PEER`,
    PEER_DISCONNECT: `${TAG_PREFIX}:PEER_DISCONNECT`,

    // Socket command events
    RUN_CMD: `${TAG_PREFIX}:RUN_CMD`,
    CMD_RUNNING: `${TAG_PREFIX}:CMD_RUNNING`,
    CMD_END: `${TAG_PREFIX}:CMD_END`,
    CMD_OUT: `${TAG_PREFIX}:CMD_OUT`,
    CMD_ERR: `${TAG_PREFIX}:CMD_ERR`,
    CMD_FAIL: `${TAG_PREFIX}:CMD_FAIL`,
  })
}


