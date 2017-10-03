import services from './index'
const url = {
  //登陆接口
  login: globalConfig.rootUrl + 'c=apiuser&a=login&'
}
class API { //新建一个API类
  constructor({
    services,
    url
  }) {
    let serobj = {}
    this.url = url
    this.services = services
    Object.keys(url).forEach((item) => {
      serobj[item] = services.jsonp.bind(null, url[item])
    })
    Object.assign(this, serobj) //导入多个方法
  }
  seturl(url, params) { //返回原始方法
    return this.services.jsonp.call(this, url, params)
  }
}
export default new API({
  services,
  url
})
