const html = require('choo/html')

module.exports = function (state, prev, send) {
  function login (e) {
    e.preventDefault()
    send('db:login', {
      username: e.target.form.username.value,
      password: e.target.form.password.value
    })
  }

  return html`
    <form>
      <div class="control is-horizontal is-grouped">
        <p class="control is-expanded">
          <input class="input" name='username' placeholder='username'>
        </p>
        <p class="control is-expanded">
          <input class="input" name='password' type='password'  placeholder='password'>
        </p>
        <button class="button" onclick=${login}>Login</button>
      </div>
    </form>
  `
}
