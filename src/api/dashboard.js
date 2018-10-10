import request from '@/utils/request'

export function companyList() {
  return request({
    url: '/api/company',
    method: 'get'
  })
}

export function companyEdit(data) {
  return request({
    url: '/api/company/edit',
    method: 'post',
    data
  })
}

export function companyRecord(data) {
  return request({
    url: '/api/company/record',
    method: 'post',
    data
  })
}

export function bindCard(data) {
  return request({
    url: '/api/company/bindCard',
    method: 'post',
    data
  })
}

export function unBindCard(data) {
  return request({
    url: '/api/company/unBindCard',
    method: 'post',
    data
  })
}
