import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'recharge',
    hidden: true,
    children: [{
      path: 'recharge',
      component: _import('recharge/index'),
      name: 'recharge',
      meta: { title: '充值', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'withdraw',
    hidden: true,
    children: [{
      path: 'withdraw',
      component: _import('withdraw/index'),
      name: 'withdraw',
      meta: { title: '提现', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'result',
    hidden: true,
    children: [{
      path: 'result',
      component: _import('result/index'),
      name: 'result',
      meta: { title: '结果页', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'password',
    hidden: true,
    children: [{
      path: 'password/edit',
      component: _import('password/edit'),
      name: 'password',
      meta: { title: '修改密码', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'bankcard',
    hidden: true,
    children: [{
      path: 'bankcard',
      component: _import('bankcard/index'),
      name: 'bankcard',
      meta: { title: 'bankcard', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'mobile',
    hidden: true,
    children: [{
      path: 'mobile/edit',
      component: _import('mobile/edit'),
      name: 'mobile',
      meta: { title: '修改手机号', noCache: true }
    }]
  }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
