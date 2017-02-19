const {REMOTE_DB} = require('../../.env')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-authentication'))

const local = new PouchDB('local_db')
const remote = new PouchDB(REMOTE_DB)
const hexastore = require('../lib/hexapouch')
const db = hexastore(local)

const uuid = require('../lib/uuid')

module.exports = {
  namespace: 'db',
  state: {
    test: 123
  },
  reducers: {
    update: (state, data) => data 
  },
  effects: {
    createResource: function (state, data, send, done) {
      const id = uuid()
      const triple = {subject: id, predicate: 'label', object: data}
      db.get({subject: id}, (err, results) => {
        if (err) return console.log(err)
        if (!results.length) {
          db.put(triple, err => {
            if (err) return console.error(err)
            send('app:addResult', triple, done)
          })
        }
      })
    },
    del: function (state, data, send, done) {
      db.del(data, err => {
        if (err) return console.error(err)
        send('app:removeResult', data, done)
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
        send('app:addResult', data, done)
      })
    },
    search: function (state, data, send, done) {
      db.search(data, (err, results) => {
        send('app:update', {searchResults: results}, done)
      })
    },
    login: function (state, data, send, done) {
      const {username, password} = data

      remote.login(username, password, (err, res) => {
        if (err) return console.error(err)

        local.sync(remote, {live: true, retry: true}).on('error', console.log)

        send('app:update', {user: res}, done)
        send('app:navigate', '/app', done)
      })
    },
    logout: function (state, data, send, done) {
      send('app:navigate', '/', done)
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