import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // if (!store.getters.roles && !store.getters.roles.userId) {
      //   store.dispatch('GetUserInfo').then((res) => {
      //   }).catch((err) => {
      //     Message.error(err)
      //   })
      //   store.dispatch('LogOut').then(() => {
      //     location.reload()
      //   })
      // }
      if (!store.getters.mobile) {
        store.dispatch('GetUserInfo').then(res => {
          next({ ...to, replace: true })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('请登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
