import jsonp from 'jsonp'
import format from './format'
import store from '../vuex/store'
import utils from './index';
import cache from './cache';

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
    if (utils.cache.get("token")) {
      let token = utils.cache.get("token");
      if (globalConfig.isDebug) {
        token = 'cce81b3efd2fbf868ecca6e35ddde4a2';
      }
      paremts = paremts + "&token=" + token;
    }
    try {
      // console.log([][1].name)
      jsonp(globalConfig.rootUrl + service + paremts, {
        timeout: 15000
      }, function (err, data) {
        store.commit('LOADING_DISABLED', false)
        store.commit('LOADING', {
          loading: false
        })
        if (err) {
          store.commit('TOGGLE_TOAST', {
            toast: true,
            toastMsg: '网络异常,请检查网络'
          })
          // callback({
          //   CODE: false
          // })
        } else {
          callback({
            CODE: data.status == '0',
            data: data
          })
        }
      });
    } catch (e) {
      console.log(1)
    }
  }
}
