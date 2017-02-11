const html = require('choo/html')
const header = require('../elements/header.el.js')
const footer = require('../elements/footer.el.js')
const marked = require('marked')

module.exports = (state, prev, send) => {
  const content = html`<div class="content"></div>`
  content.innerHTML = marked('')

  return html`
  <div id="releases-page">
    ${header(state, prev, send)}
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="content">
            <h2 class="title">Releases</h2>
          </div>
        </div>
      </div>
    </section>

    <section class="section is-large">
      <div class="container">
        ${content}
      </div>
    </section>

    ${footer(state, prev, send)}
  </div>`
}