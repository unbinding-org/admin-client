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
    del:    (state, data, send, done) => db.del(data, done),
    get:    (state, data, send, done) => db.get(data, done),
    put:    (state, data, send, done) => db.put(data, done),
    search: (state, data, send, done) => db.search(data, done),

    getSession: (state, data, send, done) => {
      remote.getSession((err, res) => {
        if (err) {
          done(err)
        } else if (!res.userCtx.name) {
          done(new Error('Not logged in.'))
        } else {
          local.sync(remote, {live: true, retry: true})
          done(null, res.userCtx)
        }
      })
    },

    login: function (state, data, send, done) {
      const {username, password} = data

      remote.login(username, password, (err, user) => {
        if (err) { return done(err) }

        local.sync(remote, {live: true, retry: true}).on('error', done)
        done(null, user)
      })
    },

    logout: function (state, data, send, done) {
      remote.logout((err, res) => {
        if (err) return done(err)

        send('location:set', '/', done)
      })
    }
  }
}