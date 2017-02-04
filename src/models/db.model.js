const {REMOTE_DB} = require('../../.env')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const local = new PouchDB('local_db')
const remote = new PouchDB(REMOTE_DB)

module.exports = {
  namespace: 'db',
  state: {
  },
  reducers: {
    update: (state, data) => data 
  },
  effects: {
    login: function (state, data, send, done) {
      const {username, password} = data

      remote.login(username, password, (err, res) => {
        if (err) return console.error(err)
        send('db:sync', done)
        send('app:update', {user: res.userCtx}, done)
      })
    },
    sync: function (state, data, send, done) {
      local.sync(remote, {live: true, retry: true}).on('error', console.log)
    }
  },
  subscriptions: {
    setup: (send, done) => {
      // if user is logged it, save his info in state
      remote.getSession((err, res) => {
        if (err || !res.userCtx.name) return console.error(err, res)
        console.log(err, res)
        send('db:sync', done)
        send('app:update', {user: res.userCtx}, done)
      })
    }
  }
}