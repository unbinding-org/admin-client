const choo = require('choo')
const layout = require('./elements/layout.el')
const home = require('./pages/home.page')

const app = choo()

app.model(require('./models/app.model'))
app.model(require('./models/db.model'))
app.router(['/', layout(home)])

const tree = app.start()
document.body.appendChild(tree)