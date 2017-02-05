const html = require('choo/html')
const login = require('./login.el')

module.exports = el => (state, prev, send) => html`
  <div id="layout">

    <div class="nav">
      <div class="nav-left">
        <a class="nav-item">
          user: ${state.app.user ? state.app.user.name : 'not logged in'}
        </a>
      </div>
      <div class="nav-center">
        <h1 class="title nav-item">admin-client</h1>
      </div>
      <div class="nav-right">
        <span class="nav-item">
        ${login(state,prev, send)}
        </span>
      </div>
    </div>

    <div class="section">
      ${el(state,prev, send)}
    </div>
  </div>`
  
