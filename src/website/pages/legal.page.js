const html = require('choo/html')
const header = require('../elements/header.el.js')
const footer = require('../elements/footer.el.js')

module.exports = (state, prev, send) => {
  return html`
  <div id="legal-page">
    ${header(state, prev, send)}
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <header>
            <h2 class="title">Legal</h2>
          </header>
          
        </div>
      </div>
    </section>

    <section class="section is-large">
      <div class="container">
        <div class="columns">

          <div class="column is-4">
            <aside class="menu">
              <p class="menu-label">
                Privacy Policy
              </p>
              <ul class="menu-list">
                <li><a>How do we collect and use information?</a></li>
                <li><a>What Information Do We Share With Third Parties?</a></li>
                <li><a>The Security of Your Information</a></li>
                <li><a>Links to Other Sites</a></li>
                <li><a>Modifying Your Information</a></li>
                <li><a>International Transfer</a></li>
                <li><a>Our Policy Toward Children</a></li>
                <li><a>Changes to Privacy Policy</a></li>
              </ul>

              <p class="menu-label">
                Terms of Service
              </p>
              <ul class="menu-list">
                <li><a>Agreement to these Terms</a></li>
                <li><a>Changes to the Terms or Services</a></li>
                <li><a>Alpha / Beta Testing Disclaimer</a></li>
                <li><a>Who May Use the Services</a></li>
                <li><a>Using the Services</a></li>
                <li><a>Content and Content Rights</a></li>
                <li><a>Content Ownership, Responsibility and Removal</a></li>
                <li><a>General Prohibitions</a></li>
                <li><a>DMCA/Copyright Policy</a></li>
                <li><a>Links to and Integration with Third Party Websites or Resources</a></li>
                <li><a>Termination</a></li>
                <li><a>Warranty Disclaimers</a></li>
                <li><a>Indemnity</a></li>
                <li><a>Limitation of Liability</a></li>
                <li><a>Governing Law</a></li>
                <li><a>Dispute Resolution for Individual Consumers</a></li>
                <li><a>Dispute Resolution for Companies</a></li>
                <li><a>General Terms</a></li>
              </ul>

              <p class="menu-label">
                Copyright & Intellectual Property Policy
              </p>
              <ul class="menu-list">
                <li><a>Notification of Copyright Infringement</a></li>
                <li><a>Notification of Trademark Infringement</a></li>
                <li><a>Notification of Other Intellectual Property (“IP”) Infringement</a></li>
                <li><a>Open Source Libraries</a></li>
              </ul>

            </aside>
          </div>

          <div class="column is-8 content">
            <h3 class="title is-4">Privacy Policy</h3>
              <h4 class="title is-5">How do we collect and use information?</h4>
              <h4 class="title is-5">What Information Do We Share With Third Parties?</h4>
              <h4 class="title is-5">The Security of Your Information</h4>
              <h4 class="title is-5">Links to Other Sites</h4>
              <h4 class="title is-5">Modifying Your Information</h4>
              <h4 class="title is-5">International Transfer</h4>
              <h4 class="title is-5">Our Policy Toward Children</h4>
              <h4 class="title is-5">Changes to Privacy Policy</h4>
            <h3 class="title is-4">Terms of Service</h3>
              <h4 class="title is-5">Agreement to these Terms</h4>
              <h4 class="title is-5">Changes to the Terms or Services</h4>
              <h4 class="title is-5">Alpha / Beta Testing Disclaimer</h4>
              <h4 class="title is-5">Who May Use the Services</h4>
              <h4 class="title is-5">Using the Services</h4>
              <h4 class="title is-5">Content and Content Rights</h4>
              <h4 class="title is-5">Content Ownership, Responsibility and Removal</h4>
              <h4 class="title is-5">General Prohibitions</h4>
              <h4 class="title is-5">DMCA/Copyright Policy</h4>
              <h4 class="title is-5">Links to and Integration with Third Party Websites or Resources</h4>
              <h4 class="title is-5">Termination</h4>
              <h4 class="title is-5">Warranty Disclaimers</h4>
              <h4 class="title is-5">Indemnity</h4>
              <h4 class="title is-5">Limitation of Liability</h4>
              <h4 class="title is-5">Governing Law</h4>
              <h4 class="title is-5">Dispute Resolution for Individual Consumers</h4>
              <h4 class="title is-5">Dispute Resolution for Companies</h4>
              <h4 class="title is-5">General Terms</h4>
            <h3 class="title is-4">Copyright & Intellectual Property Policy</h3>
              <h4 class="title is-5">Notification of Copyright Infringement</h4>
              <h4 class="title is-5">Notification of Trademark Infringement</h4>
              <h4 class="title is-5">Notification of Other Intellectual Property (“IP”) Infringement</h4>
              <h4 class="title is-5">Open Source Libraries</h4>
          </div>

        </div>
      </div>
    </section>
    ${footer(state, prev, send)}
  </div>`
}