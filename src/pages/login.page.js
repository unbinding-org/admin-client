const html = require('choo/html')

module.exports = function (state, prev, send) {
  const update = e => send('app:update', {[e.target.id]: e.target.value})
  const updateDB = e => send('db:update', {[e.target.id]: e.target.value})
  const fields = ['url', 'user', 'password']

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
