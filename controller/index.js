const Router = require('koa-router')

const dashboard = require('./dashboard.js')
const user = require('./user.js')
const settings = require('./settings.js')
const { _, fileType } = require('../lib/utils')

const router = new Router()

// router
router
  .get('*', async(ctx, next) => {
    const path = ctx.path
    if (_.startsWith(path, '/api') || _.startsWith(path, '/upload') || fileType.test(path) || path === '/') {
      await next()
    } else {
      ctx.redirect('/')
    }
  })

  // login
  .post('/api/login', user.loginPost)
  .post('/api/logout', user.logout)
  .get('/api/user/info', user.info)
  // dashboard
  .get('/api/company', dashboard.list)
  .post('/api/company/edit', dashboard.companyEdit)
  .post('/api/company/record', dashboard.record)
  .post('/api/company/unBindCard', dashboard.unBindCard)
  .post('/api/company/bindCard', dashboard.bindCard)
  // settings
  .post('/api/result', settings.handlerCallBack)
  // user
  .get('/api/user/bankInfo', user.bankInfo)
  .post('/api/user/recharge', user.recharge)
  .post('/api/user/withdraw', user.withdraw)
  .post('/api/user/sendSmsCode', user.sendSmsCode)
  .post('/api/user/updateSetting', user.updateUserSetting)
  // session callback result
  .post('/api/getCallBack', settings.handlerSessionResult)
  .post('/api/delete/result', settings.handlerSessionResultDel)

module.exports = (app) => {
  app
    .use(router.routes())
    .use(router.allowedMethods())
  return app
}
