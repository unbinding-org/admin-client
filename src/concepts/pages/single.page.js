const html = require('choo/html')
const autocomplete = require('../../shared/elements/autocomplete.el')
const defaultConcept = {
  id: null,
  label: ''
}

module.exports = function (state, prev, send) {
  const conceptId = state.location.params.conceptId
  const concept = state.app.concepts.find(concept => concept.id === conceptId) || defaultConcept

  function del () {
    send('deleteInstance', state.location.params.conceptId)
  }

  function search (value) {
    send('searchForProperty', value)
  }

  function select (result) {
    console.log(result)
  }

  const autocompleteProps = {results: state.searchResults}
  const autocompleteActions = {search, select}

  return html`
  <div id="concept">
    <h2 class="title">${concept.label}</h2>
    <table class="table">
      <tbody>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Label</td>
          <td>${concept.label}</td>
        </tr>
        <tr>
          <td> 
            <p class="control">
              ${autocomplete(autocompleteProps, autocompleteActions)}
            </p>
          </td>
          <td>
            <p class="control">
              <input class="input">
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    
    <button class="button is-danger" onclick=${del}>Delete concept</button>
  </div>`
}