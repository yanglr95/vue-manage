'use strict'

/**
 * user memo
 */
const request = require('../lib/request.js')
const { config } = require('../lib/utils.js')
const apiBase = config.apiBase
module.exports = {
  query(values) {
    const url = '/user/checkMobile'
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    })
  },
  updatePassword(values) {
    const url = '/user/resetPwd'
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: apiBase
    })
  }
}
