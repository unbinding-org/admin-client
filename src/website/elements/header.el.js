const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item" href="/">logo</a>
        </div>
      </nav>
    </div>
  </header>`
}