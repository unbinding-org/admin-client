# hexapouch

very basic hexastore implementation on top of pouchdb, with pull-streams.
heavily influenced by [levelgraph][levelgraph].

## api

```js

// put
const triple = {subject: 'A', predicate: 'C', object: 'B'}
const source = db.put([triple])

pull(
  source,
  pull.onEnd(() => console.log('done!'))
)

// get
const source = db.get({predicate: 'C'})

pull(
  source,
  pull.collect((err, arr) => {
    if (err) return console.error(err)
    console.log(arr) // [{subject: 'A', predicate: 'C', object: 'B'}]
  }) 
)

// del
const triple = {subject: 'A', predicate: 'C', object: 'B'}
const source = db.del([triple])

pull(
  source,
  pull.onEnd(() => console.log('done!'))
)

```


[levelgraph]: https://github.com/mcollina/levelgraph