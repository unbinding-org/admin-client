const doc = require('../../assets/dh1')

module.exports = {
  state: {
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
    }]
  },
  effects: {
  },
  reducers: {
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