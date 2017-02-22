const fs = require('fs')
const filepath = process.argv[2]
const file = fs.readFileSync(filepath).toString()
const sections = file.split('\n\n').filter(f => f).map((text, index) => {
  return {
    id: index + 1,
    content: text,
    highlights: []
  }
})
console.log(JSON.stringify(sections, null, 2))