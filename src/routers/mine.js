//个人中心
const myCenter = resolve => require.ensure([], () => resolve(require('../pages/mine/MyCenter.vue')), 'myCenter')
//个人资料
const myProfile = resolve => require.ensure([], () => resolve(require('../pages/mine/MyProfile.vue')), 'myProfile')
//身份认证
// const idAuthentication = resolve => require.ensure([], () => resolve(require('../pages/mine/IdAuthentication.vue')), 'idAuthentication')
//邮箱认证
// const emailAuthentication = resolve => require.ensure([], () => resolve(require('../pages/mine/EmailAuthentication.vue')), 'emailAuthentication')
//常住地址
// const myAddress = resolve => require.ensure([], () => resolve(require('../pages/mine/MyAddress.vue')), 'myAddres')
//修改密码
const changePassword = resolve => require.ensure([], () => resolve(require('../pages/mine/ChangePassword.vue')), 'changePassword')
//我的订单
// const myOrderList = resolve => require.ensure([], () => resolve(require('../pages/mine/MyOrderList.vue')), 'myOrderList')
//订单详情
// const orderDetails = resolve => require.ensure([], () => resolve(require('../pages/mine/OrderDetails.vue')), 'orderDetails')
//我的保单
// const myInsuranceList = resolve => require.ensure([], () => resolve(require('../pages/mine/MyInsuranceList.vue')), 'myInsuranceList')
//保单详情
// const insuranceDetails = resolve => require.ensure([], () => resolve(require('../pages/mine/InsuranceDetails.vue')), 'insuranceDetails')
//常见问题
const faq = resolve => require.ensure([], () => resolve(require('../pages/mine/children/Faq.vue')), 'faq')
//投诉建议
// const feedback = resolve => require.ensure([], () => resolve(require('../pages/mine/Feedback.vue')), 'feedback')
//联系我们
// const contactUs = resolve => require.ensure([], () => resolve(require('../pages/mine/ContactUs.vue')), 'contactUs')
//统计
const count = resolve => require.ensure([], () => resolve(require('../pages/mine/children/Count.vue')), 'count')
//统计
const changeMsg = resolve => require.ensure([], () => resolve(require('../pages/mine/children/ChangeMsg.vue')), 'changeMsg')

export default [{
    name: 'myCenter',
    path: 'myCenter',
    component: myCenter,
    meta: {
      login: false,
      title: '个人中心',
      hasFooter: true
    }
  },
  {
    name: 'myProfile',
    path: 'myProfile',
    component: myProfile,
    meta: {
      login: true,
      title: '个人资料',
    }
  },
  // {
  //   name: 'idAuthentication',
  //   path: 'idAuthentication',
  //   component: idAuthentication,
  //   meta: {
  //     login: true,
  //     title: '身份认证',
  //   }
  // },
  {
    name: 'changePassword',
    path: 'changePassword',
    component: changePassword,
    meta: {
      login: true,
      title: '修改密码',
    }
  },
  {
    name: 'faq',
    path: 'faq',
    component: faq,
    meta: {
      login: false,
      title: '常见问题',
    }
  },
  {
    name: 'count',
    path: 'count',
    component: count,
    meta: {
      login: false,
      title: '统计',
    }
  },
  //修改页面个人信息
  {
    name: 'changeMsg',
    path: 'changeMsg/:type',
    component: changeMsg,
    meta: {
      login: false,
      title: '修改信息',
    }
  }
]
