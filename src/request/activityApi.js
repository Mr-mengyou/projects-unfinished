import Vue from 'vue'
// 获取比赛列表的接口
const getActivityURL = '/activity/getActivityList'
export const getActivityApi = function() {
    return Vue.prototype.$get(getActivityURL)
}


// 参加比赛的接口
const joinActivityURL = '/activity/join'
export const joinActivityApi = function(ruleForm) {
    return Vue.prototype.$post(joinActivityURL, ruleForm)
}


// 发布活动的接口
const addActivityURL = '/activity/addActivity'
export const addActivityApi = function(addActivForm) {
    return Vue.prototype.$post(addActivityURL, addActivForm)
}