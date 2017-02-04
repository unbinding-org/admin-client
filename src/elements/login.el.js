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
    <div>
      <h2>login</h2>
      <form>
        <input name='username'>
        <input name='password' type='password'>
        <button onclick=${login}>Login</button>
      </form>
    </div>
  `
}
