const html = require('choo/html')

module.exports = el => function (state, prev, send) {

  function create (e) {
    e.preventDefault()
    send('createInstance', e.target.label.value)
  }

  return html`
  <div id="ontology-editor">
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">

          <p class="menu-label">
            Concepts
          </p>

          <ul class="menu-list">
            <a href="/concepts"
              class="${state.location.pathname === '/concepts' 
                ? 'is-active' 
                : ''}"
              >All</a>
            ${state.app.concepts.map(concept => html`
              <li>
                <a 
                  href="/concepts/${concept.id}" 
                  class="${state.location.pathname.includes(concept.id) 
                      ? 'is-active' 
                      : ''}">
                  ${concept.prefLabel || concept.label}
                </a>
              </li>
            `)}
          </ul>

          <p class="menu-label">
            Add Concept
          </p>

          <form class="form" onsubmit=${create}>
            <p class="control has-addons">
              <input class="input" name="label" placeholder="Choose a label...">
              <button class="button" type="submit">Create</button>
            </p>
          </form>

        </aside>

        
      </div>

      <div class="column">
        ${el(state, prev, send)}
      </div>
    </div>
  </div>`
}