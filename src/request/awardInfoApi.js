import Vue from 'vue'
//获取获奖信息
const getAwardInfoURL = '/user/getAwardInfo'
export const getAwardInfoApi = function() {
    return Vue.prototype.$get(getAwardInfoURL)
}

// 发布获奖信息的比赛下拉框
const getMatchNameURL = '/user/getMatchName'
export const getMatchNameApi = function() {
    return Vue.prototype.$get(getMatchNameURL)
}

// 发布获奖信息
const addAwardInfoURL = '/user/writeAwardInfo'
export const addAwardInfoApi = function(awardInfo) {
    return Vue.prototype.$post(addAwardInfoURL, awardInfo)
}