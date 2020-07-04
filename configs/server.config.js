// For mac, may need to symlink docker.sock
// ln -s ~/Library/Containers/com.docker.docker/Data/docker.sock /var/run/docker.sock

module.exports = {
  app: {
    port: 8080,
    path: '/*'
  },
  api: {
    port: 3000,
    path: '/api'
  },
  websocket: {
    port: 6060,
    endpoint: "http://localhost",
    path: "/socket",
  },
  docker: {
    socketPath: '/var/run/docker.sock',
    path: "http://localhost:2375/v1.30/",
    headers: {
      'Content-Type': "application/json",
      Accept: "application/json"
    }
  }
}