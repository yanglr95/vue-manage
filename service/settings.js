'use strict'

/**
 * user setting
 */
const request = require('../lib/request.js')
const { config } = require('../lib/utils.js')

const ERROR_ACTION_URL = 'ERROR_ACTION_URL'
const API_BASE = config.apiBase

module.exports = {
  fetch(values, action) {
    const map = {
      'recharge': '/escrow/recharge/synchronizeQuickConfirm',
      'withDraw': '/paycenter/withDrawSynCallBack',
      'companyEdit': '/redirect/companyInfoChange',
      'bindCard': '/redirect/companyBankcardChange',
      'unBindCard': '/redirect/unBindcard'
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
