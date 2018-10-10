
const ErrMsg = require('../lib/errormsg')

exports.handlerCallBack = async(ctx, next) => {
  const service = ctx.service.settings
  const SERVICES_TO_ACTION = {
    'RECHARGE': 'recharge',
    'WITHDRAW': 'withDraw',
    'ENTERPRISE_INFORMATION_UPDATE': 'companyEdit',
    'ENTERPRISE_BIND_BANKCARD': 'bindCard',
    'UNBIND_BANKCARD': 'unBindCard'
  }
  // let data

  const {
    userId,
    ipAddress
  } = ctx.parseParams()

  const serviceName = ctx.checkBody('serviceName').value
  const action = serviceName && SERVICES_TO_ACTION[serviceName]

  ctx.assert(serviceName)
  ctx.assert(serviceName)

  const query = {
    userId,
    ipAddress,
    serviceName: serviceName,
    platformNo: ctx.checkBody('platformNo').value,
    responseType: ctx.checkBody('responseType').value,
    keySerial: ctx.checkBody('keySerial').value,
    respData: ctx.checkBody('respData').value,
    userDevice: ctx.checkBody('userDevice').value,
    sign: ctx.checkBody('sign').value
  }

  try {
    var ret = await service.fetch(query, action)
    ctx.session.result = {
      isError: 0,
      message: '',
      data: ret
    }
  } catch (error) {
    ctx.session.result = {
      isError: 1,
      message: error.message,
      data: error
    }
  }
  ctx.redirect('/')
}

exports.handlerSessionResult = async(ctx, next) => {
  const { result } = ctx.session
  
  return ctx.dumpJSON(result)
}

exports.handlerSessionResultDel = async(ctx, next) => {
  ctx.session.result = ''
  ctx.dumpJSON()
}
