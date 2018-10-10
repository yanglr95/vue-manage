
/**
 * user
 */
const request = require('../lib/request')
const { config } = require('../lib/utils')
// const db = require('../lib/db')

// const redis = db.redis
const ERROR_ACTION_URL = 'ERROR_ACTION_URL'

const API_BASE = config.apiBase

module.exports = {
  login(values) {
    const url = '/enterprise/login'
    return request(url, {
      method: 'POST',
      form: values,
      baseUrl: API_BASE
    })
  },
  query(values, action) {
    const map = {
      list: '/user/userList',
      transaction: '/user/userChangeEmpEdit'
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
  fetch(values, action) {
    const map = {
      company: '/enterprise/getEnterpriseInfo',
      getBankInfo: '/enterprise/getBankInfo',
      userRecharge: '/enterprise/platformRecharge',
      userWithdraw: '/paycenter/applyForCash',
      sendSmsCode: '/enterprise/gensmscode.action',
      editInfo: '/enterprise/validateSmsCode'
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
      updateSetting: '/enterprise/validateSmsCode'
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
