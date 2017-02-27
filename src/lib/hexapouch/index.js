// properties with range of plain text
const plainTextProperties = ['definition']
// predicates who's value will be used for search 
const keysToSearchIn = ['label', 'prefLabel']

module.exports = function (localDB) {
  return new Hexastore(localDB)
}

function Hexastore (localDB) {
  this.db = localDB
  this.put = put
  this.get = get
  this.del = del
  this.search = search
}

function put (triple, cb) {
  const S = triple.subject
  const P = triple.predicate
  const O = triple.object
  const docs = createKeys(S, P, O).map(key => ({_id: key, triple}))
  this.db.bulkDocs(docs, cb)
}

function get (triple, cb) {
  const str = createIndexKey(triple)

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

function search (term, cb) {
  const normalizedTerm = term.toLowerCase()
  const keys = keysToSearchIn
    .map(predicate => createIndexKey({predicate}))
    .sort()

  const opts = {
    include_docs: true,
    startkey: keys[0],
    endkey: keys[keys.length - 1] + '\uffff'
  }

  // First get docs that relate to the searchable predicates
  this.db.allDocs(opts, (err, res) => {
    if (err) return cb(err)

    const keys = res.rows
      .filter(row => row.doc.triple.object.toLowerCase().includes(normalizedTerm))
      .map(row => createIndexKey({subject: row.doc.triple.subject}))
      .sort()

    const opts = {
      include_docs: true,
      startkey: keys[0],
      endkey: keys[keys.length - 1] + '\uffff'
    }

    // Then get docs that have the search term has the value of those predicates
    this.db.allDocs(opts, (err, res) => {
      if (err) return cb(err)

      const triples = res.rows.map(row => row.doc.triple)
      const subjects = triples
        .filter(triple => keysToSearchIn.includes(triple.predicate))
        .filter(triple => triple.object.toLowerCase().includes(normalizedTerm))
        .map(triple => triple.subject)

      

      const resources = subjects.map(subjectId => {
        let resource = {}

        const props = triples.filter(triple => triple.subject === subjectId)
          
        props.forEach(triple => {
          resource[triple.predicate] = triple.object
        })

        resource.id = subjectId

        return resource 
      })

      
      

      cb(null, resources)
    })

  })
}

function getResourceEntity (subject) {

}

function createIndexKey (triple) {
  const S = triple.subject || null
  const P = triple.predicate || null 
  const O = triple.object || null

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