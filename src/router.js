const layout = require('./elements/layout.el')

module.exports = [{default: '/'}, [
  // website
  ['/', require('./website/pages/landing.page')],
  ['/pricing', require('./website/pages/pricing.page')],
  ['/releases', require('./website/pages/releases.page')],
  ['/legal', require('./website/pages/legal.page')],
  ['/contact', require('./website/pages/contact.page')],

  // app,
  ['/404', layout(require('./pages/404.page'))],
  ['/ontology', layout(require('./pages/onto-editor.page'))],
  ['/document/:docId', layout(require('./pages/doc-editor.page'))],
  ['/browser', layout(require('./pages/doc-browser.page'))]
]]