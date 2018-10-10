'use strict'

/**
 * service
 */
module.exports = (app, config) => {
  const service = app.context.service = {}
  service.settings = require('./settings.js')
  service.user = require('./user.js')
  service.dashboard = require('./dashboard.js')
  service.forgot = require('./forgot.js')
  return app
}
