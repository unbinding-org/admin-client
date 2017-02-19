const html = require('choo/html')

module.exports = (state, prev, send) => { 
  return html`
  <div class="control">
    <input 
     class="input" 
     name="searchInput" 
     placeholder="Search..."
     oninput=${e => {
      send('db:search', e.target.value)
     }}>
  </div>`
}