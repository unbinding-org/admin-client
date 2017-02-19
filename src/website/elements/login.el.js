const html = require('choo/html')

module.exports = function (state, prev, send) {
  const isDisabled = state.db.loggingIn ? 'is-disabled' : ''
  const isLoading = state.db.loggingIn ? 'is-loading' : ''

  function login (e) {
    e.preventDefault()
    const {username, password} = e.target.form
    send('db:login', {username: username.value, password: password.value})
  }

  return html`
  <form class="form">
    <div class="control">
      <label>Email</label>
      <input class="input ${isDisabled}" name="username">
    </div>
    <div class="control">
      <label>Password</label>
      <input class="input ${isDisabled}" type="password" name="password">
    </div>
    <div class="control has-addons has-addons-centered">
      <p class="help">
        By creating an account, you agree to our <a>Terms of Service</a>.
      </p>
    </div>
    <p class="control-group">
      <p class="control has-addons has-addons-centered">
        <button class="button is-primary ${isLoading}" onclick=${login}>
          Sign in or Create account
        </button>
      </p>
      <p class="control has-addons has-addons-centered">
        <button class="button is-link ${isDisabled}">
          Forgot password?
        </button>
      </p>
    </p>
  </form>`
}