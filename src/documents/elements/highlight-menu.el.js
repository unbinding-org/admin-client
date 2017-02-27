const html = require('choo/html')

module.exports = (state, prev, send) => { 
  const {visible, top, left} = state.app.highlightMenu
  const style = `
    display: block;
    position: absolute; 
    z-index: 200; 
    top: ${top-25-12.5}px; 
    left: ${left}px; 
    height: 25px;
    background-color: black;
    opacity: 0.9;
    ${!visible ? 'display: none' : ''}
  `

  return html`
  <div style=${style}>
    <div class="level">
      <div class="level-item">
        <button>
          <span class="icon">
            <i class="fa fa-twitter"></i>
          </span>
        </button>
      </div>
      <div class="level-item">
        <button>
          <span class="icon">
            <i class="fa fa-twitter"></i>
          </span>
        </button>
      </div>
    </div>
  </div>`
}