const examHome = r => require.ensure([], () => r(require('../pages/exam/examHome.vue')), 'examHome')
const testList = r => require.ensure([], () => r(require('../pages/exam/testList.vue')), 'testList')
const examDetail = r => require.ensure([], () => r(require('../pages/exam/examDetail.vue')), 'examDetail')
const errorList = r => require.ensure([], () => r(require('../pages/exam/errorList.vue')), 'errorList')
const simulateExam = r => require.ensure([], () => r(require('../pages/exam/simulateExam.vue')), 'simulateExam')
const errorExamDetail = r => require.ensure([], () => r(require('../pages/exam/errorExamDetail.vue')), 'errorExamDetail')

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
  path: 'testList/:id',
  meta: {
    login: false,
    hasFooter: false
  },
  component: testList
}, {
  name: 'examDetail',
  path: 'examDetail/:course',
  meta: {
    login: false,
    hasFooter: false
  },
  component: examDetail
}, {
  name: 'errorList',
  path: 'errorList/:id',
  meta: {
    login: false,
    hasFooter: false
  },
  component: errorList
}, {
  name: 'simulateExam',
  path: 'simulateExam/:id',
  meta: {
    login: false,
    hasFooter: false
  },
  component: simulateExam
}, {
  name: 'errorExamDetail',
  path: 'errorExamDetail/:course',
  meta: {
    login: false,
    hasFooter: false
  },
  component: errorExamDetail
}]
