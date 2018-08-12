const shopList = r => require.ensure([], () => r(require('../pages/shop/ShopList.vue')), 'shopList')
const shopDetail = r => require.ensure([], () => r(require('../pages/shop/ShopDetail.vue')), 'shopDetail')
export default [{
  name: 'shopList',
  path: 'shopList',
  meta: {
    login: true,
    title: "市场",
    hasFooter: true
  },
  component: shopList
},{
  name: 'shopDetail',
  path: 'shopDetail/:id',
  meta: {
    login: true,
    title: "商品详情",
  },
  component: shopDetail
}]
