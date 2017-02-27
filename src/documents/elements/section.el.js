const html = require('choo/html')

module.exports = (section, prev, send) => html`
  <div class="columns">
    <div class="column">
      <div>
        ${section.highlights.map(h => html`<span>[</span>`)}
      </div>
    </div>

    <div class="column is-1">
      <small>
        ${section.id}
      </small>

    </div>
    <div class="column is-10">
      <div id="\$\$${section.id}" class="box">
        ${section.content}
      </div>
    </div>
  </div>
`
  
