module.exports = {
  namespace: 'app',
  state: {
    user: null,
    results: []
  },
  reducers: {
    update: (state, data) => data
  },
  subscriptions: {
    init: function (send, done) {

    }
  }
}