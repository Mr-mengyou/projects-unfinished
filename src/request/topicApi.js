import Vue from 'vue'
// 获取话题列表的接口
const getTopicURL = '/topic/getTopic'
export const getTopicApi = function() {
    return Vue.prototype.$get(getTopicURL)
}

// 发送主评论的接口
const senMainCommentURL = '/topic/addComment'
export const senMainCommentApi = function(mainCommentList) {
    return Vue.prototype.$post(senMainCommentURL, mainCommentList)
}

// 发送副评论的接口
const sendSideCommentURL = '/topic/addSideComment'
export const sendSideCommentApi = function(sideCommentList) {
    return Vue.prototype.$post(sendSideCommentURL, sideCommentList)
}