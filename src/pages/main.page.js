const html = require('choo/html')
const autocomplete = require('../elements/autocomplete.el')

module.exports = function (state, prev, send) {
  function db (e, cmd) {
    e.preventDefault()
    send(`db:${cmd}`, {
      subject: e.target.form.subject.value,
      predicate: e.target.form.predicate.value,
      object: e.target.form.object.value
    })
    e.target.form.subject.value = ''
    e.target.form.predicate.value = ''
    e.target.form.object.value = ''
  }

  const cmds = ['put', 'get', 'del']

  return html`
    <div class="container">
      <div class="columns">
        <div class="column is-one-third">
          ${cmds.map(cmd => html`
            <div>
              <h2>${cmd}</h2>
              <form>
                <input class="input" name='subject' placeholder='subject'>
                <input class="input" name='predicate' placeholder='predicate'>
                <input class="input" name='object' placeholder='object'>
                <button class="button" onclick=${e => db(e, cmd)}>${cmd}</button>
              </form>
              <hr>
            </div>`
          )}
        </div>

        <div class="column">
          ${autocomplete(state, prev, send)}
          <p>results:</p>
          <div>
            ${state.app.searchResults.map(r => {
              return html`
                <div>
                  <p>${r.prefLabel || r.label}:</p>
                  <pre>${JSON.stringify(r, null, 2)}</pre>
                </div>
              `
            })}
          </div>
          <hr>
          <ul>
            ${state.app.results.map(r => {
              return html`
                <li class="control">
                  <span class="tag is-medium">
                    ${r.subject} ${r.predicate} ${r.object}.
                    <a class="delete" onclick=${e => send('db:del', r)}></a>
                  </span>
                </li>`
            })}
          </ul>
        </div>
      </div>
    </div>
  `
}
