const layout = require('./shared/pages/layout.el')
const concepts = require('./concepts/pages/layout.el')

const websiteRoutes = [
  ['/', require('./website/pages/landing.page')],
  ['/pricing', require('./website/pages/pricing.page')],
  ['/releases', require('./website/pages/releases.page')],
  ['/legal', require('./website/pages/legal.page')],
  ['/contact', require('./website/pages/contact.page')],
]

const appRoutes = [
  // ontology editor
  ['/concepts', layout(concepts(require('./concepts/pages/overview.page')))],
  ['/concepts/:conceptId', layout(concepts(require('./concepts/pages/single.page')))],

  // document editor
  ['/documents', layout(require('./documents/pages/overview.page'))],
  ['/documents/:docId', layout(require('./documents/pages/single.page'))]
]

const routes = [{default: '/'}, [
  ['/404', layout(require('./shared/pages/404.page'))],
  ...websiteRoutes,
  ...appRoutes
]]

module.exports = {
  websiteRoutes,
  appRoutes,
  routes
}