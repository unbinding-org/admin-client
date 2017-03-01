const doc = require('../../assets/dh1')
const websiteRoutes = require('../../router').websiteRoutes.map(arr => arr[0])

module.exports = {
  state: { user: null },
  reducers: { setUser: (state, user) => ({user}) },
  subscriptions: {
    onload: (send, done) => {
      send('db:getSession', (err, user) => {
        if (err) return send('handleUnauthorized', done)
        send('setUser', user, done)
      })
    }
  },
  effects: {
    handleUnauthorized: (state, data, send, done) => {
      const routeIsProtected = !websiteRoutes.includes(state.location.pathname)
      if (routeIsProtected) {
        send('location:set', '/', done)
      }
    },
    login: (state, data, send, done) => {
      send('db:login', data, (err, user) => {
        if (err) return console.error(err)
        send('setUser', user, done)
        send('location:set', '/concepts', done)
      })

    },
    logout: (state, data, send, done) => {
      send('db:logout', err => {
        if (err) return console.error(err)
        send('location:set', '/', done)
        send('setUser', null, done)
      })
    }
  }
}