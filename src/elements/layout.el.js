const html = require('choo/html')

module.exports = el => (state, prev, send) => html`
  <div>
    <p>user: ${state.app.user ? state.app.user.name : 'not logged in'}
    <h1>admin-client</h1>
    ${el(state,prev, send)}
  </div>`
  
