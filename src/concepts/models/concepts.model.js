const uuid = require('../../lib/uuid')

module.exports = {
  state: {
    searchResults: []
  },
  reducers: {
    update: (state, data) => data
  },
  effects: {

    searchForProperty: function (state, data, send, done) {
      if (!data) {
        return send('update', {searchResults: []}, done)
      }

      send('db:search', data, (err, searchResults) => {
        send('update', {searchResults}, done)
      })
    },

    createInstance: function (state, data, send, done) {
      const id = uuid()
      const triple = {subject: id, predicate: 'label', object: data}

      send('db:get', {subject: id}, (err, results) => {
        if (err) return console.error(err)

        if (!results.length) {
          send('db:put', triple, err => {
            if (err) return console.error(err)

            send('db:search', '', (err, concepts) => {
              send('app:update', {concepts}, done)
              send('location:set', '/concepts/' + id, done)
            })

          })
        }
      })
    },

    deleteInstance: function (state, data, send, done) {
      send('db:get', {subject: data}, (err, triples) => {
        if (err) return console.error(err)

        // TODO: start loading state here

        const promises = triples.map(triple => {
          return new Promise((resolve, reject) => {
            send('db:del', triple, err => {
              if (err) return reject(err)
              resolve()
            })
          })
        })

        Promise.all(promises).then(values => {
          // TODO: stop loading state here
          send('db:search', '', (err, concepts) => {
            send('app:update', {concepts}, done)
            send('location:set', '/concepts', done)
          })
        })  

      })
    }
    
  }
}