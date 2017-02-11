module.exports = {
  namespace: 'app',
  state: {
    loggingIn: false,
    user: null,
    results: []
  },
  effects: {
    login: (state, data, send, done) => {
      send('app:update', {loggingIn: true}, done)
    }
  },
  reducers: {
    update: (state, data) => data,
    addResult: (state, data) => {
      return {
        results: state.results.concat(data)
      }
    },
    removeResult: (state, data) => {
      return {
        results: state.results.filter(r => r !== data)
      }
    }
  },
  subscriptions: {
    init: function (send, done) {

    }
  }
}