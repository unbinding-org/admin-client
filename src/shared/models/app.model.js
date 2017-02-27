const doc = require('../../assets/dh1')

module.exports = {
  namespace: 'app',
  state: {
    concepts: [],
    highlightMenu: {
      visible: false,
      top: 0,
      left: 0
    },
    doc: null,
    docs: require('../../assets/docs'),
    codeSearch: '',
    codes: [{
      label:'Fermentum Porttitor',
      color: 'red'
    }, {
      label:'Curabitur',
      color: 'blue',
    }, {
      label:'Nulla',
      color: 'purple'
    }],
    loggingIn: false,
    user: null,
    results: [],
    searchResults: []
  },
  effects: {
    login: (state, data, send, done) => {
      send('db:login', data, (err, user) => {
        if (err) return console.error(err)
        send('app:update', {user}, done)
        send('location:set', '/concepts', done)
      })

    },
    logout: (state, data, send, done) => {
      send('db:logout', err => {
        if (err) return console.error(err)
        send('location:set', '/concepts', done)
        send('app:update', {user: null}, done)
      })
    }
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
  },
  subscriptions: {
    init: function (send, done) {
      // let selecting = false

      // document.addEventListener('selectionchange', function (e) {
      //   if (!selecting) {
      //     document.addEventListener('mouseup', onMouseUp)
      //     selecting = true
      //   }
      // })

      // function onMouseUp (e) {
      //   document.removeEventListener('mouseup', onMouseUp)
      //   document.addEventListener('mousedown', onMouseDown)
      //   selecting = false
      //   updateMenuVisibility()
      // }

      // function onMouseDown (e) {
      //   document.removeEventListener('mousedown', onMouseDown)
      //   if (selecting) {
      //     send('app:update', {highlightMenu: {visible: false, top:0, left: 0}}, done)
      //   }
      // }

      // function updateMenuVisibility() {
      //   const selection = window.getSelection()
      //   const range = selection.getRangeAt(0)
      //   const rect = range.getBoundingClientRect()
      //   const highlightMenu = {
      //     visible: range.startOffset !== range.endOffset,
      //     top: rect.top,
      //     left: rect.left + (rect.width/2)
      //   }
      //   send('app:update', {highlightMenu}, done)
      // }
    }
  }
}