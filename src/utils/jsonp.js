import jsonp from 'jsonp'
import format from './format'
import store from '../vuex/store'

export default {
  post(service, params, callback) {
    store.commit('LOADING', {
      loading: true,
      msg: '正在加载'
    });
    let paremts = "";
    for (let key in params) {
      if (params[key]) {
        paremts = paremts + "&" + key + "=" + params[key];
      }
    }
    jsonp(globalConfig.rootUrl + service + paremts, function (err, data) {
      store.commit('LOADING_DISABLED', false)
      store.commit('LOADING', {
        loading: false
      })
      if (err) {
        store.commit('TOGGLE_TOAST', {
          toast: true,
          toastMsg: '网络异常,请检查网络'
        })
        callback({
          CODE: false
        })
      } else {
        callback({
          CODE: data.status == '0',
          data: data
        })
      }
    });
  }
}
