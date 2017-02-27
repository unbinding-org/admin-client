const html = require('choo/html')
const login = require('../elements/login.el.js')
const footer = require('../elements/footer.el.js')

module.exports = (state, prev, send) => {
  console.log(state.app.user)
  const showModal = e => {
    if (state.app.user) {
      return send('location:set', '/concepts')
    }
    send('app:update', {modalVisible: true})
  }
  const hideModal = e => send('app:update', {modalVisible: false})

  return html`
  <div id="landing-page">
    <div class="modal ${state.app.modalVisible ? 'is-active': ''}">
      <div class="modal-background" onclick=${hideModal}></div>
      <div class="modal-content">
        <div class="columns-fluid">
          <div class="column is-6 is-offset-3">
            <div class="box">
              ${login(state, prev, send)}
            </div>
          </div>  
        </div>
      </div>
    </div>

    <header class="hero is-large is-dark">
      <div class="hero-head">
        <nav class="nav">
          <div class="nav-left">
            <a class="nav-item">
              <h1 class="h1">
                logo
              </h1>
            </a>
          </div>

          <div class="nav-right">
            <span class="nav-item">
              <button class="button is-dark is-outlined is-inverted" 
               onclick=${showModal}>
                Sign in
              </button>
            </span>
            <span class="nav-item">
              <button class="button is-primary" 
               onclick=${showModal}>
                Sign up
              </button>
            </span>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container">
        </div>
      </div>

      <div class="hero-foot">
        <div class="container">

        </div>
      </div>

    </header>

    <div class="hero is-large">
      <div class="hero-body">
        <div class="container">
        </div>
      </div>
    </div>

    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns">
            <div class="column is-offset-4 is-4 content">

              <h3>Try {app} for free.</h3>

              ${login(state, prev, send)}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${footer(state, prev, send)}
  </div>`
}