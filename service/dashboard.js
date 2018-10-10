'use strict'

/**
 * dashboard
 */
const request = require('../lib/request')
const { config } = require('../lib/utils')
const ERROR_ACTION_URL = 'ERROR_ACTION_URL'

const API_BASE = config.apiBase

module.exports = {
  fetch(values, action) {
    const map = {
      'company': '/enterprise/getEnterpriseInfo',
      'companyEdit': '/enterprise/companyInfoChange',
      'record': '/enterprise/listPointLog',
      'unBindCard': '/account/unbindCardOp'
    }
    const url = action && map[action]
    if (!url) {
      throw new Error(ERROR_ACTION_URL)
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE
    })
  },
  update(values, action) {
    const map = {
      'bindCard': '/enterprise/companyBankcardChange'
    }
    const url = action && map[action]
    if (!url) {
      throw new Error(ERROR_ACTION_URL)
    }
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE
    })
  }
}
