const html = require('choo/html')
const autocomplete = require('../../shared/elements/autocomplete.el')

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
    <div class="container-fluid">
      <div class="columns">
        <div class="column">
        </div>
      </div>
    </div>
  `
}
