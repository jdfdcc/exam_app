const examHome = r => require.ensure([], () => r(require('../pages/exam/examHome.vue')), 'examHome')
const testList = r => require.ensure([], () => r(require('../pages/exam/testList.vue')), 'testList')
const examDetail = r => require.ensure([], () => r(require('../pages/exam/examDetail.vue')), 'examDetail')

export default [{
  name: 'examHome',
  path: 'examHome',
  meta: {
    login: false,
    hasFooter: true
  },
  component: examHome
}, {
  name: 'testList',
  path: 'testList',
  meta: {
    login: false,
    hasFooter: false
  },
  component: testList
}, {
  name: 'examDetail',
  path: 'examDetail',
  meta: {
    login: false,
    hasFooter: false
  },
  component: examDetail
}]