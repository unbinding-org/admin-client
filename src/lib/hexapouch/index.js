const pull = require('pull-stream')

module.exports = function (localDB) {
  return new Hexastore(localDB)
}

function Hexastore (localDB) {
  this.db = localDB
  this.put = put
  this.get = get
  this.del = del
}

function put (triple, cb) {
  const S = triple.subject
  const P = triple.predicate
  const O = triple.object 
  const docs = [
    {_id: `spo::${S}::${P}::${O}`, triple},
    {_id: `sop::${S}::${O}::${P}`, triple},
    {_id: `ops::${O}::${P}::${S}`, triple},
    {_id: `osp::${O}::${S}::${P}`, triple},
    {_id: `pso::${P}::${S}::${O}`, triple},
    {_id: `pos::${P}::${O}::${S}`, triple},
  ]
  this.db.bulkDocs(docs, cb)
}

function get (query, cb) {
  const db = this.db
  const str = getStr(query)

  const opts = {
    include_docs: true,
    startkey: str,
    endkey: str + '\uffff'
  }

  db.allDocs(opts, (err, res) => {
    if (err) return cb(err)

    cb(null, res.rows.map(r => r.doc.triple))
  })
} 

function del (triple, cb) {
  const S = triple.subject
  const P = triple.predicate
  const O = triple.object 
  const keys = [
    `spo::${S}::${P}::${O}`,
    `sop::${S}::${O}::${P}`,
    `ops::${O}::${P}::${S}`,
    `osp::${O}::${S}::${P}`,
    `pso::${P}::${S}::${O}`,
    `pos::${P}::${O}::${S}`
  ]
  this.db.allDocs({include_docs: true, keys}, (err, res) => {
    const deleted = res.rows.map(row => {
      row.doc._deleted = true
      return row.doc
    })
    this.db.bulkDocs(deleted, cb)
  })
}

function getStr (query) {
  const S = query.subject ? query.subject : null
  const P = query.predicate ? query.predicate : null 
  const O = query.object ? query.object : null

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