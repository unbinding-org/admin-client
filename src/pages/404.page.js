const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <div class="container-fluid">
      <h2 class="title">Oops.</h2>
    </div>
  `
}