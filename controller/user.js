/**
 * user
 * */
// const debug = require('debug')('controller:user')
const { _, config } = require('../lib/utils')
// const cache = require('./cache')
const { bankCallBack: backUrl } = config

exports.loginPost = async(ctx, next) => {
  const service = ctx.service.user
  const {
    userId,
    ipAddress
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    phone: ctx.checkBody('mobile').value,
    pwd: ctx.checkBody('password').value
  }
  try {
    const ret = await service.login(query)
    const userId = _.get(ret, 'userId') - 0 || 0
    const mobile = _.get(ret, 'mobile')
    ctx.session.isLogin = true
    ctx.session.user = {
      userId,
      mobile
    }
    ctx.dumpJSON({
      mobile
    })
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

exports.logout = async(ctx, next) => {
  ctx.session.isLogin = false
  ctx.session.user = {}
  ctx.dumpJSON()
}

exports.info = async(ctx, next) => {
  const isLogin = ctx.session.isLogin
  const user = ctx.session.user
  const { mobile } = user

  if (!isLogin || !user || !mobile) {
    ctx.throw(401)
  }

  const query = {
    mobile
  }

  ctx.dumpJSON(query)
}

exports.bankInfo = async(ctx, next) => {
  const service = ctx.service.user
  var ret
  const {
    userId,
    ipAddress
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress
  }
  try {
    ret = await service.fetch(query, 'getBankInfo')
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

exports.recharge = async(ctx, next) => {
  const service = ctx.service.user
  var ret
  const {
    userId,
    ipAddress,
    pageNotifyUrl
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    amt: ctx.checkBody('amount').value,
    bankCode: ctx.checkBody('bankCode').value,
    returnUrl: pageNotifyUrl
  }

  try {
    ret = await service.fetch(query, 'userRecharge')
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

exports.withdraw = async(ctx, next) => {
  const service = ctx.service.user
  var ret
  const {
    userId,
    ipAddress,
    pageNotifyUrl
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    amt: ctx.checkBody('amount').value,
    platform: 'PC',
    returnUrl: pageNotifyUrl
  }
  try {
    ret = await service.fetch(query, 'userWithdraw')
    ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

exports.sendSmsCode = async(ctx, next) => {
  const service = ctx.service.user
  var ret
  const {
    userId,
    ipAddress
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    type: ctx.checkBody('type').value,
    mobile: ctx.checkBody('mobile').value || _.get(ctx.session, 'user.mobile')
  }
  try {
    ret = await service.fetch(query, 'sendSmsCode')
    return ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

exports.userInfoEdit = async(ctx, next) => {
  const service = ctx.service.user
  var ret
  const {
    userId,
    ipAddress
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    type: ctx.checkBody('type').value,
    mobile: _.get(ctx.session, 'user.mobile'),
    smsCode: ctx.checkBody('smsCode').value
  }
  try {
    ret = await service.fetch(query, 'editInfo')
    return ctx.dumpJSON(ret)
  } catch (error) {
    ctx.dumpJSON(400, error.message || error)
    return
  }
}

exports.updateUserSetting = async(ctx, next) => {
  const service = ctx.service.user
  var ret
  const {
    userId,
    ipAddress
  } = ctx.parseParams()

  const query = {
    userId,
    ipAddress,
    type: ctx.checkBody('type').value,
    mobile: ctx.checkBody('mobile').value,
    smsCode: ctx.checkBody('smsCode').value,
    pwd: ctx.checkBody('password').value || ''
  }
  try {
    ret = await service.update(query, 'updateSetting')

    return ctx.dumpJSON(ret)
  } catch (err) {
    ctx.body = err._response
    return
  }
}
