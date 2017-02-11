const html = require('choo/html')
const header = require('../elements/header.el.js')
const footer = require('../elements/footer.el.js')

module.exports = (state, prev, send) => {
  return html`
  <div id="contact-page">
    ${header(state, prev, send)}
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="content">
            <h2 class="title">Contact</h2>
          </div>
        </div>
      </div>
    </section>

    <section class="section is-large">
      <div class="container">
      </div>
    </section>

    ${footer(state, prev, send)}
  </div>`
}