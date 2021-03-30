import Vue from 'vue'
// 获取未读消息的接口
const getUnreadURL = '/notifcation/getUnreadList'
export const getUnreadApi = function(username) {
    return Vue.prototype.$get(getUnreadURL, username)
}

// 获取全部消息的接口
const getAllURL = '/notifcation/getAllList'
export const getAllApi = function(username) {
    return Vue.prototype.$get(getAllURL, username)
}

// 获取已读消息的接口
const getReadURL = '/notifcation/getReadList'
export const getReadApi = function(username) {
    return Vue.prototype.$get(getReadURL, username)
}

// 获取详细的消息的接口
const getDetailURL = '/notifcation/detail/'
export const getDetailApi = function(id) {
    return Vue.prototype.$get(getDetailURL + id)
}


// 发布信息的接口
const addMessageURL = '/notifcation/addMessage'
export const addMessageApi = function(submitForm) {
    return Vue.prototype.$post(addMessageURL, submitForm)
}