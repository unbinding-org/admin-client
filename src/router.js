const layout = require('./shared/pages/layout.el')
const concepts = require('./concepts/pages/layout.el')

module.exports = [{default: '/'}, [
  // website
  ['/', require('./website/pages/landing.page')],
  ['/pricing', require('./website/pages/pricing.page')],
  ['/releases', require('./website/pages/releases.page')],
  ['/legal', require('./website/pages/legal.page')],
  ['/contact', require('./website/pages/contact.page')],

  // app,
  ['/404', layout(require('./shared/pages/404.page'))],

  // ontology editor
  ['/concepts', layout(concepts(require('./concepts/pages/overview.page')))],
  ['/concepts/:conceptId', layout(concepts(require('./concepts/pages/single.page')))],

  // document editor
  ['/documents', layout(require('./documents/pages/overview.page'))],
  ['/documents/:docId', layout(require('./documents/pages/single.page'))]
]]