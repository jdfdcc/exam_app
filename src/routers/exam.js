const examHome = r => require.ensure([], () => r(require('../pages/exam/examHome.vue')), 'examHome')
const testList = r => require.ensure([], () => r(require('../pages/exam/testList.vue')), 'testList')
const examDetail = r => require.ensure([], () => r(require('../pages/exam/examDetail.vue')), 'examDetail')
const errorList = r => require.ensure([], () => r(require('../pages/exam/errorList.vue')), 'errorList')
const simulateExam = r => require.ensure([], () => r(require('../pages/exam/simulateExam.vue')), 'simulateExam')
const errorExamDetail = r => require.ensure([], () => r(require('../pages/exam/errorExamDetail.vue')), 'errorExamDetail')
const collectList = r => require.ensure([], () => r(require('../pages/exam/collectList.vue')), 'collectList')
const collectDetail = r => require.ensure([], () => r(require('../pages/exam/collectDetail.vue')), 'collectDetail')
const chooseCourse = r => require.ensure([], () => r(require('../pages/exam/chooseCourse.vue')), 'chooseCourse')

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
    hasFooter: false,
    title: "超本学院"
  },
  component: testList
}, {
  name: 'examDetail',
  path: 'examDetail/:course',
  meta: {
    login: false,
    hasFooter: false,
    title: "超本学院"
  },
  component: examDetail
}, {
  name: 'errorList',
  path: 'errorList/:id',
  meta: {
    login: false,
    hasFooter: false,
    title: "超本学院"
  },
  component: errorList
}, {
  name: 'errorExamDetail',
  path: 'errorExamDetail/:course',
  meta: {
    login: false,
    hasFooter: false,
    title: "错题详情"
  },
  component: errorExamDetail
}, {
  name: 'simulateExam',
  path: 'simulateExam/:id',
  meta: {
    login: false,
    hasFooter: false,
    title: "超本学院"
  },
  component: simulateExam
}, {
  name: 'collectList',
  path: 'collectList/:id',
  meta: {
    login: false,
    hasFooter: false,
    title: "我的收藏"
  },
  component: collectList
}, {
  name: 'collectDetail',
  path: 'collectDetail/:course',
  meta: {
    login: false,
    hasFooter: false,
    title: "收藏详情"
  },
  component: collectDetail
}, {
  name: 'chooseCourse',
  path: 'chooseCourse',
  meta: {
    login: false,
    hasFooter: false,
    title: "选择科目"
  },
  component: chooseCourse
}]
