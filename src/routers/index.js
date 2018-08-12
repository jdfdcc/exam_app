import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import login from './login'
import pay from './pay'
import exam from './exam'
import mine from './mine'
import shop from './shop'

Vue.use(Router)
const router = new Router({
  // mode:"history",
  routes: [{
    path: '/',
    name: 'access',
    redirect: '/page/access/test&1'	//1登陆 2未登录
    // r4w7jCTcsS4g8qIRoMsSTRi5YMEKPaq2qHJ79w4VqG1GwDUF8YmZBU
    // redirect: '/page/access/LogoFooter.vueoM9JHwVfz-aPsdd4gY_GVVtGFsP4&rGddraJr4sgMzTdWN4X5K65NgRZ2RNNQr7VwC0-Xw3ihHwdg2G13D5gparnIVHuUMoy2hbEDIbf1z_yDrJdO1g&profile'
  }, {
    path: '/page',
    name: 'page',
    component(resolve) {
      require.ensure([], () => resolve(require('../components/common/PageTransition.vue')), 'pageTransition')
    },
    children: [...login, ...mine, ...exam, ...pay, ...shop]
  }]
})
// router.keepAlivePage = 'home,login,forgetPwd'
router.beforeEach((to, from, next) => {
  //返回的时候关闭弹窗
  store.commit('TOGGLE_DIALOG', {
    dialog: false
  })
  //改变title
  document.title = to.meta.title || document.title;
  if (from.meta.zoom) {
    document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no')
  }
  store.commit('TOGGLE_TAB', to.meta.hasFooter == true)
  if (false && to.meta.login != false && !store.state.common.user) {
    store.commit('TOGGLE_TOAST', {
      toast: true,
      toastMsg: '请先登录！'
    })
    next('/page/login')
  } else {
    next()
  }
})

//返回
Router.prototype.goBack = function (path) {
  this.isBack = true
  if (typeof path == 'string') {
    router.push(path)
  } else {
    window.history.go(-1)
  }
}

export default router
