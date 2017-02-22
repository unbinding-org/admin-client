const html = require('choo/html')

module.exports = function (state, prev, send) {
  const {docId} = state.location.params
  const doc = state.app.docs.find(doc => doc._id === docId)

  if (!doc) {
    return send('app:navigate', '/browser')
  }

  const search = e => send('app:update', {codeSearch: e.target.value})

  function filterKeyword (code) {
    return code.label.toLowerCase().includes(state.app.codeSearch.toLowerCase())
  }

  function addHighlight (e) {
    const selRange = window.getSelection().getRangeAt(0)
    const {startContainer, endContainer, startOffset, endOffset} = selRange
    const el = startContainer.parentElement
    const id = parseInt(el.id.slice(2))
    
    if (startContainer === endContainer) {
      const highlight = {start: startOffset, end: endOffset}
      const section = state.app.doc.sections.find(s => s.id === id)
      const newSection = Object.assign({}, section, {
        highlights: section.highlights.concat([highlight])
      })
      send('app:addHighlight', newSection)
    }
  }

  return html`
    <div class="container-fluid">
      <div class="columns">
        <div class="column is-9">
          <div style="height: 80vh; overflow: scroll; padding: 1em">
            ${doc.sections.map((section, index) => html`
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
            `)}
          </div>
        </div>
        <div class="column">
          <p class="content">
            <button class="button is-success" onclick=${addHighlight}>
              Add highlight
            </button>
          </p>
          <nav class="panel">
            <p class="panel-heading">
              Codes
            </p>
            <div class="panel-block">
              <p class="control has-icon">
                <input class="input" placeholder="Search" oninput=${search}>
                <span class="icon is-small">
                  <i class="fa fa-search"></i>
                </span>
              </p>
            </div>
            ${state.app.codes.filter(filterKeyword).map(code => html`
              <a class="panel-block">
                <span class="panel-icon">
                  <i class="fa fa-book" style="color: ${code.color};"></i>
                </span>
                ${code.label}
              </a>
            `)}
          </nav>
        </div>
      </div>
    </div>
  `
}