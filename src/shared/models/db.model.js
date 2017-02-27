const {REMOTE_DB} = require('../../../.env')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const local = new PouchDB('local_db')
const remote = new PouchDB(REMOTE_DB)
const hexastore = require('../../lib/hexapouch')
const db = hexastore(local)

module.exports = {
  namespace: 'db',
  reducers: { update: (state, data) => data },
  effects: {
    del: (state, data, send, done) => db.del(data, done),
    get: (state, data, send, done) => db.get(data, done),
    put: (state, data, send, done) => db.put(data, done),
    search: (state, data, send, done) => db.search(data, done),

    login: function (state, data, send, done) {
      const {username, password} = data

      remote.login(username, password, (err, res) => {
        if (err) return console.error(err)

        local.sync(remote, {live: true, retry: true}).on('error', done)
        done(null)
      })
    },

    logout: function (state, data, send, done) {
      remote.logout((err, res) => {
        if (err) return done(err)

        done(null)
      })
    }
  },
  subscriptions: {
    setup: (send, done) => {
      // if user is logged it, save his info in state
      remote.getSession((err, res) => {
        if (err || !res.userCtx.name) return console.error(err || res)

        send('app:update', {user: res.userCtx}, done)

        local.sync(remote, {live: true, retry: true})

        db.search('', (err, concepts) => {
          send('app:update', {concepts}, done)
        })
      })
    }
  }
}