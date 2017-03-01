const choo = require('choo')
const app = choo()

app.model(require('./shared/models/auth.model'))
app.model(require('./shared/models/app.model'))
app.model(require('./shared/models/db.model'))
app.model(require('./documents/models/documents.model'))
app.model(require('./concepts/models/concepts.model'))

app.router(require('./router.js').routes)

const tree = app.start()
document.body.appendChild(tree)