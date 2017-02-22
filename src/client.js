const choo = require('choo')
const app = choo()

app.model(require('./models/app.model'))
app.model(require('./models/db.model'))

app.router(require('./router.js'))

const tree = app.start()
document.body.appendChild(tree)