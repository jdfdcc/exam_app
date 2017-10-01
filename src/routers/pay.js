const payExam = r => require.ensure([], () => r(require('../pages/pay/payExam.vue')), 'payExam')

export default [{
  name: 'payExam',
  path: 'payExam',
  meta: {
    login: false,
    hasFooter: false
  },
  component: payExam
}]
