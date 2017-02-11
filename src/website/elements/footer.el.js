const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
  <footer class="footer">
    <nav class="level">
      <div class="level-left">
        <a href="/pricing" class="level-item">Pricing</a>
        <a href="/releases" class="level-item">Releases</a>
        <a href="/legal" class="level-item">Legal</a>
        <a href="/contact" class="level-item">Contact</a>
      </div>

      <div class="level-right">
        <a class="level-item">
          <span class="icon is-small">
            <i class="fa fa-heart"></i>
          </span>
        </a>
      </div>
    </div>
  </footer>`
}