window.globalConfig = {
  rootUrl: "http://118.89.129.81/com.ifp.ipartner/",
  wxUrl: 'http://rh.keypowerplus.com/', //微信安全域名
  isDebug: true, //是否开启接口debug模式
  plat: 'web', //WEB、NATIVE
  os: 'android', //操作系统 ios:苹果操作系统 android:安卓系统
  timeout: 1000 * 180, //默认是3000毫秒
  version: 'v1.0',
  loginType: 'extraExtCheck', //登录方式--国泰项目传extraExtCheck
  from: 'iwechat', //header--from
  transfer: 'GTO2OINTERFACE2017#@!%88', //接口数据交互加密key
  comId: 'GTO2O20170118' //保险公司编码--保险公司Id(固定为：GTO2O20170118）
}
let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//初始化系统信息
globalConfig.os = isiOS ? "ios" : "android";
import Vue from 'vue'
import App from './components/common/App'
import store from './vuex/store'
import router from './routers'
import 'muse-components/styles/base.less'
// --------------引用框架组件开始--------------------------------------
// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'
// import 'muse-themes/theme-default.min.css'
// import '' // 加载基础的样式
import contentBlock from 'muse-components/contentBlock'
import dialog from 'muse-components/dialog'
import paper from 'muse-components/paper'
import avatar from 'muse-components/avatar'
import divider from 'muse-components/divider'
import iconButton from 'muse-components/iconButton'
import appbar from 'muse-components/appbar'
import popup from 'muse-components/popup'
import { bottomNav, bottomNavItem } from 'muse-components/bottomNav'
import { list, listItem } from 'muse-components/list'
import icon from 'muse-components/icon'
import textField from 'muse-components/textField'
import { tabs, tab } from 'muse-components/tabs'
import { row, col } from 'muse-components/grid'
import raisedButton from 'muse-components/raisedButton'
import selectField from 'muse-components/selectField'
import flatButton from 'muse-components/flatButton'
import checkbox from 'muse-components/checkbox'
import { menu, menuItem } from 'muse-components/menu'
import radio from 'muse-components/radio'
import { card, cardHeader, cardMedia, cardTitle, cardText, cardActions } from 'muse-components/card'
import { step, stepButton, stepContent, stepLabel, stepper } from 'muse-components/stepper'
// import snackbar from 'muse-components/snackbar'
// ..
Vue.component(contentBlock.name, contentBlock)
Vue.component(avatar.name, avatar)
Vue.component(divider.name, divider)
Vue.component(iconButton.name, iconButton)
Vue.component(dialog.name, dialog)
Vue.component(paper.name, paper)
Vue.component(appbar.name, appbar)
Vue.component(popup.name, popup)
Vue.component(list.name, list)
Vue.component(listItem.name, listItem)
Vue.component(bottomNav.name, bottomNav)
Vue.component(bottomNavItem.name, bottomNavItem)
Vue.component(icon.name, icon)
Vue.component(textField.name, textField)
Vue.component(tabs.name, tabs)
Vue.component(tab.name, tab)
Vue.component(row.name, row)
Vue.component(col.name, col)
Vue.component(raisedButton.name, raisedButton)
Vue.component(selectField.name, selectField)
Vue.component(flatButton.name, flatButton)
Vue.component(checkbox.name, checkbox)
Vue.component(menuItem.name, menuItem)
Vue.component(menu.name, menu)
Vue.component(radio.name, radio)
Vue.component(card.name, card)
Vue.component(cardHeader.name, cardHeader)
Vue.component(step.name, step)
  //step, stepButton, stepContent, stepLabel, stepper
Vue.component(stepButton.name, stepButton)
Vue.component(stepContent.name, stepContent)
Vue.component(stepLabel.name, stepLabel)
Vue.component(stepper.name, stepper)
  // Vue.component(snackbar.name, snackbar)
  // --------------引用框架组件结束-------------------------------------
import 'vue-swipe/dist/vue-swipe.css'
import ('@/assets/css/main.scss')
import { Swipe, SwipeItem } from 'vue-swipe'
import '@/filters/globalFilter.js'
import '@/assets/lib/finger/alloy_finger.js'
import '@/assets/lib/finger/alloy_finger.vue.js'
// import '@/directives/title.js'
import Navigation from 'vue-navigation'
import Page from './components/common/Page'
import ValidatorInput from './components/common/ValidatorInput'
import vueScrollBehavior from 'vue-scroll-behavior'

import utils from './utils'
window.utils = utils
  // Vue.use(MuseUI)
Vue.use(AlloyFingerVue)
Vue.use(Navigation, {
  router,
  store,
  keyName: 'Exam'
})
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.component('page', Page)
Vue.component('ValidatorInput', ValidatorInput)
Vue.config.productionTip = false
Vue.use(vueScrollBehavior, {
  router: router
})
Vue.mixin({
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      //定义常量 用于页面判断
      constSet: {
        oneself: "00",
        idCertType: "0"
      }
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    back(url) {
      router.goBack(url)
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

// if (navigator.userAgent.indexOf('iP') > -1) {
//   MuseUI.config({
//     disableTouchRipple: true,
//     disableFocusRipple: true
//   })
// }