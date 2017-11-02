const payExam = r => require.ensure([], () => r(require('../pages/pay/payExam.vue')), 'payExam')
const moneyCharge = r => require.ensure([], () => r(require('../pages/pay/moneyCharge.vue')), 'moneyCharge')
const payState = r => require.ensure([], () => r(require('../pages/pay/payState.vue')), 'payState')

export default [{
	name: 'payExam',
	path: 'payExam/:payItem',
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
}, {
	name: "payState",
	path: 'payState',
	meta: {
		login: false,
		hasFooter: false
	},
	component: payState
}]
