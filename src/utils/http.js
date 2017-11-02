import axios from 'axios'
import format from './format'
import store from '../vuex/store'

let instance = axios.create({
	timeout: 3000,
	method: 'get',
	headers: {
		"chaobenxueyuan": "CcyRMndYUdndxxcCmsranYkreWz"
	}
});
//当请求异常，网络异常,返回异常时候进行提示
function showError() {
	store.commit('LOADING', {
		loading: false
	})
	store.commit('TOGGLE_TOAST', {
		toast: true,
		toastMsg: '网络异常,请检查网络'
	})
};
//请求拦截器
instance.interceptors.request.use(config => {
	store.commit('LOADING', {
		loading: true,
		msg: '正在加载'
	})
	config.url = globalConfig.jwUrl;
	return config
}, error => {
	store.commit('TOGGLE_TOAST', {
		toast: true,
		toastMsg: '发送请求失败！'
	})
	return Promise.reject({
		isLogicError: false,
		errorMessage: "网络异常,请检查网络"
	})
});
//返回拦截器
instance.interceptors.response.use(response => {
	if (location.href.indexOf('page/access') == -1) {
		store.commit('LOADING_DISABLED', false)
		store.commit('LOADING', {
			loading: false
		})
	}
	try {
		console.log("%c 返回数据>>>>>>>", 'color:green', JSON.stringify(response))
		if (true) {
			let errorMsg = "后台返回数据data为空";
			if (response.data.packageList.packages.response.responsePayload.data) {
				errorMsg = response.data.packageList.packages.response.responsePayload.data.ErrorMessage || response.data.packageList.packages.response.responsePayload.msg || "网络异常";
			}
			return Promise.reject({
				isLogicError: true,
				errorMessage: errorMsg,
				data: {}
			})
		}
	} catch (e) {
		console.log(e)
		showError();
		return Promise.reject({
			isLogicError: false,
			errorMessage: JSON.stringify(e)
		})
	}
	response.data = {};
	return response
}, error => {
	store.commit('LOADING_DISABLED', false)
	showError();
	return Promise.reject({
		isLogicError: false,
		errorMessage: JSON.stringify(error)
	})
})

export default {
	axios: axios,
	post(service, params) {
		// params.service = service;
		// console.log("%c 请求数据>>>>>>>", 'color:green', service, JSON.parse(JSON.stringify(params)))
		return instance.get("", params)
	}
}
