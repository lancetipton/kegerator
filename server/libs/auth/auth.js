const axios = require("axios")
const { get, limbo } = require("jsutils")
const config = require('KegConfigs/server.config')

const authEndpoint = get(config, 'auth.endpoint')

const makRequest = token => {
  return limbo(axios({
    url: authEndpoint,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      query: `
        query {
          auth {
            current(acct_id: "sv-all") {
              doc {
                sv
              }
            }
          }
        }
      `
    }
  }))
}

class SVAuth {

  async validate(token){
    
    if(!token) return { isValid: false, message: `An auth token is required!` }
    
    const [ err, response ] = await makRequest(token)

    err && console.log(err.stack)

    return {
      message: get(response, 'data.errors.0.message', err && err.message),
      isValid: get(response, 'data.data.auth.current.doc.sv', false)
    }

  }

}


module.exports = new SVAuth()
