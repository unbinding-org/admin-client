const html = require('choo/html')

module.exports = function (state, prev, send) {
  function login (e) {
    e.preventDefault()
    send('db:login', {
      username: e.target.form.username.value,
      password: e.target.form.password.value
    })
  }

  function logout (e) {
    e.preventDefault()
    send('db:logout')
  }

  return html`
    <form>
      ${state.app.user 
        ? html`<div>
            <button class="button" onclick=${logout}>logout</button>
           </div>`
        : html`<div class="control is-horizontal is-grouped">
            <p class="control is-expanded">
              <input class="input" name='username' placeholder='username'>
            </p>
            <p class="control is-expanded">
              <input class="input" name='password' type='password'  placeholder='password'>
            </p>
            <button class="button" onclick=${login}>Login</button>
           </div>`
      }
    </form>
  `
}
