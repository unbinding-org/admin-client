module.exports = {
  namespace: 'app',
  state: {
    loggingIn: false,
    user: null,
    results: [],
    searchResults: []
  },
  effects: {
    navigate: (state, data, send, done) => {
      const a = document.createElement('a')
      a.setAttribute('href', data)
      a.click()
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