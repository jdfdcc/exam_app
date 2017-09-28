const login = r => require.ensure([], () => r(require('../pages/login/Login.vue')), 'login')
const pwd = r => require.ensure([], () => r(require('../pages/login/childen/Pwd.vue')), 'pwd')
const access = r => require.ensure([], () => r(require('../pages/login/Access.vue')), 'access')
export default [{
  name: 'access',
  path: 'access/:id',
  meta: {
    login: false,
  },
  component: access
}, {
  name: 'login',
  path: 'login',
  meta: {
    login: false,
    title: "登录"
  },
  component: login
}, {
  name: 'pwd',
  path: 'pwd',
  meta: {
    login: false,
    title: "忘记密码"
  },
  component: pwd
}]