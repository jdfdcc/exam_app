const payExam = r => require.ensure([], () => r(require('../pages/pay/payExam.vue')), 'payExam')
const moneyCharge = r => require.ensure([], () => r(require('../pages/pay/moneyCharge.vue')), 'moneyCharge')

export default [{
  name: 'payExam',
  path: 'payExam',
  meta: {
    login: false,
    hasFooter: false
  },
  component: payExam
}, {
  name: 'moneyCharge',
  path: 'moneyCharge',
  meta: {
    login: false,
    hasFooter: false
  },
  component: moneyCharge
}]
