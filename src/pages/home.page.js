const html = require('choo/html')

module.exports = function (state, prev, send) {
  function db (e, cmd) {
    e.preventDefault()
    send(`db:${cmd}`, {
      subject: e.target.form.subject.value,
      predicate: e.target.form.predicate.value,
      object: e.target.form.object.value
    })
  }

  const cmds = ['put', 'get', 'del']

  return html`
    <div>
      ${cmds.map(cmd => html`
        <div>
          <h2>${cmd}</h2>
          <form>
            <input name='subject'>
            <input name='predicate'>
            <input name='object'>
            <button onclick=${e => db(e, cmd)}>${cmd}</button>
          </form>
          <hr>
        </div>`
      )}
      <p>results:</p>
      <pre>
        ${JSON.stringify(state.app.results, null, 2)}
      </pre>
    </div>
  `
}
