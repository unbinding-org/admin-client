const html = require('choo/html')
let listening

module.exports = (props, actions) => {
  if (props.results.length && !listening) {
    listening = true
    document.addEventListener('click', onClick)
  }

  return html`
    <div id="autocomplete" class="control" style="position: relative;">
      <input
       name="searchInput" 
       placeholder="Search..."
       oninput=${onInput}}
       class="input">
      <aside class="menu ${!props.results.length ? 'is-hidden' : ''}">
        <ul class="menu-list">
          ${props.results.map(result => html`
            <li>
              <a onclick=${e => select(result)}>
                ${result.prefLabel || result.label}
              </a>
            </li>
          `)}
        </ul>
      </aside>
    </div>`

  function onInput (e) {
    const value = e.target.value
    actions.search(value)
  }

  function select (result) {
    actions.select(result)
    closeDropdown()
  }

  function closeDropdown () {
    document.removeEventListener('click', onClick) 
    actions.search(null)  
    listening = false
  }

  function onClick (e) {
    const el = document.getElementById('autocomplete')
    const clickedOutside = e.target !== el && !el.contains(e.target)
    if (clickedOutside) { closeDropdown() }
  }
}