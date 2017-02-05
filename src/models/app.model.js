module.exports = {
  namespace: 'app',
  state: {
    user: null,
    results: []
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