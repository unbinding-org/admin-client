const choo = require('choo')
const layout = require('./elements/layout.el')
const home = require('./pages/home.page')
const landing = require('./website/pages/landing.page')
const pricing = require('./website/pages/pricing.page')
const releases = require('./website/pages/releases.page')
const legal = require('./website/pages/legal.page')
const contact = require('./website/pages/contact.page')

const app = choo()

app.model(require('./models/app.model'))
// app.model(require('./models/db.model'))
app.router([
  ['/', landing],
  ['/pricing', pricing],
  ['/releases', releases],
  ['/legal', legal],
  ['/contact', contact],
  ['/admin', layout(home)]
])

const tree = app.start()
document.body.appendChild(tree)