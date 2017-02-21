const html = require('choo/html')

module.exports = el => (state, prev, send) => html`
  <div id="layout">

    <div class="nav">
      <div class="nav-left">
        <a class="nav-item" href="/ontology">ontology</a>
        <a class="nav-item" href="/document">document</a>
      </div>
      <div class="nav-center">
        <h1 class="title nav-item">admin-client</h1>
      </div>
      <div class="nav-right">
        <a class="nav-item">
          user: ${state.app.user ? state.app.user.name : 'not logged in'}
        </a>
        <a class="nav-item" onclick=${e => send('db:logout')}>
          Logout
        </a>
      </div>
    </div>

    <div class="section">
      ${el(state,prev, send)}
    </div>
  </div>`
  
