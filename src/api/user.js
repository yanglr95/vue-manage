import request from '@/utils/request'

export function getUserBankInfo() {
  return request({
    url: '/api/user/bankInfo',
    method: 'get'
  })
}

export function userRecharge(data) {
  return request({
    url: '/api/user/recharge',
    method: 'post',
    data
  })
}

export function userWithdraw(data) {
  return request({
    url: '/api/user/withdraw',
    method: 'post',
    data
  })
}

export function sendSmsCode(data) {
  return request({
    url: '/api/user/sendSmsCode',
    method: 'post',
    data
  })
}

export function updateSetting(data) {
  return request({
    url: '/api/user/updateSetting',
    method: 'post',
    data
  })
}

export function getCallBack() {
  return request({
    url: '/api/getCallBack',
    method: 'post'
  })
}

export function updateResultData() {
  return request({
    url: '/api/delete/result',
    method: 'post'
  })
}
