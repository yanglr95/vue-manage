/**
 * dashboard
 */
// const debug = require('debug')('controller:dashboard')
const { _, config } = require('../lib/utils')
const backUrl = config.bankCallBack

const dashboard = async(ctx, next) => {
  await next()
}

dashboard.list = async(ctx, next) => {
  const service = ctx.service.dashboard

  let data

  const {
    userId,
    ipAddress
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress
  }
  try {
    const values = await Promise.all([
      service.fetch(query, 'company')
      // service.fetch(query, 'tradList')
    ])
    data = {
      companyData: _.get(values, '[0]')
      // tradList: _.get(values, '[1].tradeCurveInfo')
    }
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
  ctx.dumpJSON(data)
}

dashboard.record = async(ctx, next) => {
  const service = ctx.service.dashboard

  const {
    userId,
    ipAddress,
    pageNumber,
    pageSize
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    pageNumber: ctx.checkBody('pageNumber').value || pageNumber,
    pageSize: ctx.checkBody('pageSize').value || pageSize,
    pointType: ctx.checkBody('pointType').value || '',
    pointStartDate: ctx.checkBody('pointStartDate').value || '',
    pointEndDate: ctx.checkBody('pointEndDate').value || ''
  }

  try {
    var ret = await service.fetch(query, 'record')
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

dashboard.companyEdit = async(ctx, next) => {
  const service = ctx.service.dashboard

  const {
    userId,
    ipAddress,
    pageNotifyUrl
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    redirectUrl: pageNotifyUrl
  }

  try {
    var ret = await service.fetch(query, 'companyEdit')
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

// bind bank card
dashboard.unBindCard = async(ctx, next) => {
  const service = ctx.service.dashboard

  const {
    userId,
    ipAddress,
    pageNotifyUrl
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    redirectUrl: pageNotifyUrl
  }

  try {
    const ret = await service.fetch(query, 'unBindCard')
    if (ret.result && ret.result.gatewayUrl) {
      ret.url = ret.result.gatewayUrl
      delete ret.result.gatewayUrl
    }
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

dashboard.bindCard = async(ctx, next) => {
  const service = ctx.service.dashboard

  const {
    userId,
    ipAddress,
    pageNotifyUrl
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    // bankcode: ctx.checkBody('bankcode').value,
    bankcardNo: ctx.checkBody('bankcardNo').value,
    redirectUrl: pageNotifyUrl
  }

  try {
    var ret = await service.update(query, 'bindCard')
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

module.exports = dashboard
