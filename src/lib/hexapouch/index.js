const pull = require('pull-stream')

// properties with range of plain text
const plainTextProperties = [
  'definition'
]

module.exports = function (localDB) {
  return new Hexastore(localDB)
}

function Hexastore (localDB) {
  this.db = localDB
  this.put = put
  this.get = get
  this.del = del
}

function createKeys (S, P, O) {
  if (plainTextProperties.includes(P)) {
    return [
      `spo::${S}::${P}::${__plainText__}`,
      `spo::${P}::${S}::${__plainText__}`
    ]
  }

  return [
    `spo::${S}::${P}::${O}`,
    `sop::${S}::${O}::${P}`,
    `ops::${O}::${P}::${S}`,
    `osp::${O}::${S}::${P}`,
    `pso::${P}::${S}::${O}`,
    `pos::${P}::${O}::${S}`
  ]
}

function put (triple, cb) {
  const S = triple.subject
  const P = triple.predicate
  const O = triple.object
  const docs = createKeys(S, P, O).map(key => ({_id: key, triple}))
  this.db.bulkDocs(docs, cb)
}

function get (query, cb) {
  const str = getStr(query)

  const opts = {
    include_docs: true,
    startkey: str,
    endkey: str + '\uffff'
  }

  this.db.allDocs(opts, (err, res) => {
    if (err) return cb(err)

    cb(null, res.rows.map(r => r.doc.triple))
  })
} 

function del (triple, cb) {
  const S = triple.subject
  const P = triple.predicate
  const O = triple.object 
  const keys = createKeys(S, P, O)
  
  this.db.allDocs({include_docs: true, keys}, (err, res) => {
    const deleted = res.rows.map(row => {
      row.doc._deleted = true
      return row.doc
    })
    this.db.bulkDocs(deleted, cb)
  })
}

function getStr (query) {
  const S = query.subject || null
  const P = query.predicate || null 
  const O = query.object || null

  if (S & P & O)
    return `spo::${S}::${P}::${O}`
  if (S && P)
    return `spo::${S}::${P}::`
  if (P && O)
    return `pos::${P}::${O}::`
  if (S && O)  
    return `sop::${S}::${O}::`
  if (S)
    return `spo::${S}::`
  if (P)
    return `pso::${P}::`
  if (O)  
    return `ops::${O}::`
  return `spo::`
}