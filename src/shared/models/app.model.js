const doc = require('../../assets/dh1')

module.exports = {
  namespace: 'app',
  state: {
    concepts: [],
    loggingIn: false,
    user: null
  },
  effects: {
  },
  reducers: {
    update: (state, data) => data,
    addDoc: (state, data) => ({docs: [...state.docs, data]}),
    addHighlight: (state, data) => {
      const index = state.doc.sections.findIndex(s => s.id === data.id)
      const sections = [
        ...state.doc.sections.slice(0, index),
        data,
        ...state.doc.sections.slice(index + 1)
      ]
      
      return {
        doc: Object.assign({}, state.doc, {sections})
      }
    },
    addResult: (state, data) => {
      return {
        results: state.results.concat(data)
      }
    },
    removeResult: (state, data) => {
      return {
        results: state.results.filter(r => r !== data)
      }
    }
  }
}