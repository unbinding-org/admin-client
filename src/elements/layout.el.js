const html = require('choo/html')
const login = require('./login.el')

module.exports = el => (state, prev, send) => html`
  <div>
    <p>user: ${state.app.user ? state.app.user.name : 'not logged in'}
    <h1>admin-client</h1>
    ${login(state,prev, send)}
    ${el(state,prev, send)}
  </div>`
  
