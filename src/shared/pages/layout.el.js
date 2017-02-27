const html = require('choo/html')
const routes = [{
  label: 'Concepts',
  route: '/concepts'
}, {
  label: 'Documents',
  route: '/documents'
}]

module.exports = el => (state, prev, send) => html`
  <div id="app">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          ${menuItems(state.location.pathname)}
        </div>
        <div class="nav-right">
          <a class="nav-item">
            user: ${state.app.user ? state.app.user.name : 'not logged in'}
          </a>
          <a class="nav-item" onclick=${e => send('app:logout')}>
            Logout
          </a>
        </div>
      </div>
    </nav>
    <div class="section">
      ${el(state,prev, send)}
    </div>
  </div>
`

function menuItems (path) {
  return routes.map(item => html`
    <a
     href="${item.route}"
     class="nav-item is-tab ${path.includes(item.route) ? 'is-active' : ''}">
      ${item.label}
    </a>
  `)
}

