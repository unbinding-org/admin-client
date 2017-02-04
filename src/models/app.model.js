module.exports = {
  namespace: 'app',
  state: {
    user: null
  },
  reducers: {
    update: (state, data) => data
  },
  subscriptions: {
    init: function (send, done) {

    }
  }
}