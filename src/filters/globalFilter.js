import Vue from 'vue'
import codeData from '../assets/data/CodeData'

let allMap = {};
for (var key in codeData) {
  if (!allMap[key]) allMap[key] = {};
  for (var key_ in codeData[key]) {
    allMap[key][
      codeData[key][key_].code
    ] = codeData[key][key_].desc;
  }
}

/**
 * 全局公共过滤器 使用:{{'0' |commonFilter('relationFilter') }}
 * value 值
 * type 类型 对应码表(codeData)中的参数
 * default1 默认值
 */
Vue.filter('commonFilter', (value, type, default1) => {
  return allMap[type][value] || default1 || '——'
});