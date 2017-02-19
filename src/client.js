const choo = require('choo')
const layout = require('./elements/layout.el')
const app = choo()

app.model(require('./models/app.model'))
app.model(require('./models/db.model'))

app.router([
  // website
  ['/', require('./website/pages/landing.page')],
  ['/pricing', require('./website/pages/pricing.page')],
  ['/releases', require('./website/pages/releases.page')],
  ['/legal', require('./website/pages/legal.page')],
  ['/contact', require('./website/pages/contact.page')],

  // app
  ['/app', layout(require('./pages/main.page'))]
])

const tree = app.start()
document.body.appendChild(tree)