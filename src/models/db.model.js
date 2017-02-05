const {REMOTE_DB} = require('../../.env')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const local = new PouchDB('local_db')
const remote = new PouchDB(REMOTE_DB)
const hexastore = require('../lib/hexapouch')
const db = hexastore(local)

local.sync(remote, {live: true, retry: true}).on('error', console.log)

module.exports = {
  namespace: 'db',
  state: {
  },
  reducers: {
    update: (state, data) => data 
  },
  effects: {
    del: function (state, data, send, done) {
      db.del(data, err => {
        if (err) return console.error(err)
        console.log('done!', data)
      })
    },
    get: function (state, data, send, done) {
      db.get(data, (err, results) => {
        if (err) return console.error(err)
        send('app:update', {results}, done)
      })
    },
    put: function (state, data, send, done) {
      db.put(data, err => {
        if (err) return console.error(err)
        console.log('done!')
      })
    },
    login: function (state, data, send, done) {
      const {username, password} = data

      remote.login(username, password, (err, res) => {
        if (err) return console.error(err)

        send('app:update', {user: res}, done)
      })
    },
    logout: function (state, data, send, done) {
      remote.logout((err, res) => {
        if (err) return console.error(err)
        send('app:update', {user: null}, done)
      })
    }
  },
  subscriptions: {
    setup: (send, done) => {
      // if user is logged it, save his info in state
      remote.getSession((err, res) => {
        if (err || !res.userCtx.name) return console.error(err || res)
        send('app:update', {user: res.userCtx}, done)
      })
    }
  }
}