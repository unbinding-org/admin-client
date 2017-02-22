const html = require('choo/html')
const uuid = require('../lib/uuid')

class DocumentSection {
  constructor (id, content) {
    this._id = id
    this.content = content
    this.highlights = []
  }
}

class Doc {
  constructor (title, sections) {
    this._id = uuid()
    this.title = title
    this.sections = sections
    this.createdOn = Date.now()
  }
}

function formatDate (timestamp) {
  const date = new Date(timestamp)
  var monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()

  return `${day} ${monthNames[monthIndex]} ${year}`
}
 
module.exports = function (state, prev, send) {
  const search = e => send('app:update', {codeSearch: e.target.value})

  function filterKeyword (code) {
    return code.label.toLowerCase().includes(state.app.codeSearch.toLowerCase())
  }

  function onFileSelect (e) {
    const file = this.files[0]
    console.log('File type:', file.type)
    if (file.type === 'text/plain') {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function (e) {
        const text = e.target.result
        const sections = text.split('\n\n').map((section, index) => {
          return new DocumentSection(index + 1, section)
        })
        send('app:addDoc', new Doc(file.name, sections))
      }
    }
  }

  return html`
    <div class="container-fluid">
      <div class="columns">
        <div class="column is-3">
          <nav class="panel">
            <p class="panel-heading">
              Team Projects
            </p>

          <a class="panel-block is-active">
            <span class="panel-icon">
              <i class="fa fa-book"></i>
            </span>
            Unbinding Vocab
          </a>

          <a class="panel-block">
            <span class="panel-icon">
              <i class="fa fa-book"></i>
            </span>
            Some other project
          </a>

          <div class="panel-block">
            <button class="button is-primary is-outlined is-fullwidth">
              + New Project
            </button>
          </div>
            
          </nav>
        </div>

        <div class="column is-9">
          <div class="content">

            <div class="level">
              <div class="level-item">
                <h2 class="title is-5">
                  Unbinding Vocab
                  <a>
                    <span class="icon">
                      <i class="fa fa-caret-down"></i>
                    </span>
                  </a>
                </h2>
              </div>
              <div class="level-right">
                <input id="fileImport" style="display:none" type="file" onchange=${onFileSelect}>
                </input>
                <label class="button has-icon" for="fileImport">
                  <span class="icon is-small">
                    <i class="fa fa-cloud-upload"></i>
                  </span>
                  <span>Import</span>
                </label>
              </div>
            </div>

          </div>
          <div style="height: 80vh; overflow: scroll; padding: 1em">
            ${state.app.docs.map((doc, index) => html`
              <a href="/document/${doc._id}" class="document-list--item">
                <div class="card">
                  <div class="card-content" style="padding: 1rem;">
                    <div class="level">
                      <div class="level-left">
                        <span class="icon is-small">
                          <i class="fa fa-file-text-o"></i>
                        </span>
                      </div>
                      <p class="level-item has-text-left" style="width: 50%;">
                        ${doc.title}
                      </p>
                      <p class="level-item">${formatDate(doc.createdOn)}</div>
                      <p class="level-item"></div>
                    </div>
                  </div>
                </div>
              </a>
            `)}
          </div>
        </div>
        <div class="column">
        </div>
      </div>
    </div>
  `
}