import jsonp from 'jsonp'
import format from './format'
import store from '../vuex/store'
import utils from './index';
import cache from './cache';

export default {
	post(service, params, callback) {
		console.log("%c 请求数据>>>>>>>", 'color:green', service, JSON.parse(JSON.stringify(params)))
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
				token = utils.cache.get("token");
			}
			paremts = paremts + "&token=" + token;
		}
		let url = globalConfig.rootUrl + service + paremts;
		console.log(url)
		try {
			// console.log([][1].name)
			jsonp(url, {
				timeout: 15000
			}, function (err, data) {
				console.log("%c 返回数据>>>>>>>", 'color:green', data)
				store.commit('LOADING_DISABLED', false)
				store.commit('LOADING', {
					loading: false
				})
				if (err) {
					store.commit('TOGGLE_TOAST', {
						toast: true,
						toastMsg: '网络异常,请检查网络'
					})
					data.data = data.msgs
				} else {
					callback({
						CODE: data.status == '0',
						data: data
					})
				}
			});
		} catch (e) {
		}
	}
}
