const html = require('choo/html')
const docSection = require('../elements/doc-section.el')
const highlightMenu = require('../elements/highlight-menu.el')

module.exports = function (state, prev, send) {
  let doc = state.app.doc

  if (!doc) {
    const {docId} = state.location.params
    doc = state.app.docs.find(doc => doc._id === docId)
    send('app:update', {doc})
  }

  return html`
    <div class="container-fluid">
      ${highlightMenu(state, prev, send)}
      <div class="columns">
        <div class="column is-9">
          <div style="height: 80vh; overflow: scroll; padding: 1em">
            ${doc.sections.map(section => docSection(section, prev, send))}
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

  function search (e) { 
    return send('app:update', {codeSearch: e.target.value}) 
  }

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
      const sectionId = doc.sections.findIndex(s => s.id === id)
      const oldSection = doc.sections[sectionId]
      const newSection = Object.assign({}, oldSection, {
        highlights: oldSection.highlights.concat([highlight])
      })

      const newDoc = Object.assign({}, doc, {
        sections: [
          ...doc.sections.slice(0, sectionId),
          newSection,
          ...doc.sections.slice(sectionId + 1)
        ]
      })

      send('app:update', {doc: newDoc})
    }
  }
}