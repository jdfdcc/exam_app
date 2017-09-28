//个人中心
const myCenter = resolve => require.ensure([], () => resolve(require('../pages/mine/MyCenter.vue')), 'myCenter')
  //个人资料
const myProfile = resolve => require.ensure([], () => resolve(require('../pages/mine/MyProfile.vue')), 'myProfile')
  //身份认证
const idAuthentication = resolve => require.ensure([], () => resolve(require('../pages/mine/IdAuthentication.vue')), 'idAuthentication')
  //邮箱认证
const emailAuthentication = resolve => require.ensure([], () => resolve(require('../pages/mine/EmailAuthentication.vue')), 'emailAuthentication')
  //常住地址
const myAddress = resolve => require.ensure([], () => resolve(require('../pages/mine/MyAddress.vue')), 'myAddres')
  //修改密码
const changePassword = resolve => require.ensure([], () => resolve(require('../pages/mine/ChangePassword.vue')), 'changePassword')
  //我的订单
const myOrderList = resolve => require.ensure([], () => resolve(require('../pages/mine/MyOrderList.vue')), 'myOrderList')
  //订单详情
const orderDetails = resolve => require.ensure([], () => resolve(require('../pages/mine/OrderDetails.vue')), 'orderDetails')
  //我的保单
const myInsuranceList = resolve => require.ensure([], () => resolve(require('../pages/mine/MyInsuranceList.vue')), 'myInsuranceList')
  //保单详情
const insuranceDetails = resolve => require.ensure([], () => resolve(require('../pages/mine/InsuranceDetails.vue')), 'insuranceDetails')
  //常见问题
const faq = resolve => require.ensure([], () => resolve(require('../pages/mine/Faq.vue')), 'faq')
  //投诉建议
const feedback = resolve => require.ensure([], () => resolve(require('../pages/mine/Feedback.vue')), 'feedback')
  //联系我们
const contactUs = resolve => require.ensure([], () => resolve(require('../pages/mine/ContactUs.vue')), 'contactUs')


export default [{
    name: 'myCenter',
    path: 'myCenter',
    component: myCenter,
    meta: {
      login: false,
      title: '个人中心',
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
  {
    name: 'idAuthentication',
    path: 'idAuthentication',
    component: idAuthentication,
    meta: {
      login: true,
      title: '身份认证',
    }
  },
  {
    name: 'emailAuthentication',
    path: 'emailAuthentication',
    component: emailAuthentication,
    meta: {
      login: true,
      title: '邮箱认证',
    }
  },
  {
    name: 'myAddress',
    path: 'myAddress',
    component: myAddress,
    meta: {
      login: true,
      title: '常住地址',
    }
  },
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
    name: 'myOrderList',
    path: 'myOrderList',
    component: myOrderList,
    meta: {
      login: true,
      title: '我的订单',
    }
  },
  {
    name: 'orderDetails',
    path: 'orderDetails/:orderCode/:isShare',
    component: orderDetails,
    meta: {
      login: false,
      title: '我的订单',
    }
  },
  {
    name: 'myInsuranceList',
    path: 'myInsuranceList',
    component: myInsuranceList,
    meta: {
      login: true,
      title: '我的保单',
    }
  },
  {
    name: 'insuranceDetails',
    path: 'insuranceDetails/:insuranceCode',
    component: insuranceDetails,
    meta: {
      login: false,
      title: '我的保单',
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
    name: 'feedback',
    path: 'feedback',
    component: feedback,
    meta: {
      login: false,
      title: '用户反馈',
    }
  },
  {
    name: 'contactUs',
    path: 'contactUs',
    component: contactUs,
    meta: {
      login: false,
      title: '联系我们',
    }
  },
]