const choo = require('choo')
const layout = require('./elements/layout.el')
const login = require('./pages/login.page')

const app = choo()

app.model(require('./models/app.model'))
app.model(require('./models/db.model'))
app.router(['/', layout(login)])

const tree = app.start()
document.body.appendChild(tree)