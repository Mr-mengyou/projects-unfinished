import Vue from 'vue'

// 登录接口
const loginURL = '/user/login'
export const loginApi = function(loginForm){
    return Vue.prototype.$post(loginURL,loginForm)
}

// 检查登录接口
const checkLoginURL = '/user/checkLogin'
export const checkLoginApi = function(){
    return Vue.prototype.$post(checkLoginURL)
}

// 获取未读消息的接口
const getUnreadURL = '/notifcation/getUnreadList'
export const getUnreadApi = function(username){
    return Vue.prototype.$get(getUnreadURL,username)
}

// 获取全部消息的接口
const getAllURL = '/notifcation/getAllList'
export const getAllApi = function(username){
    return Vue.prototype.$get(getAllURL,username)
}

// 获取已读消息的接口
const getReadURL = '/notifcation/getReadList'
export const getReadApi = function(username){
    return Vue.prototype.$get(getReadURL,username)
}

// 获取详细的消息的接口
const getDetailURL = '/notifcation/detail/'
export const getDetailApi = function(id){
    return Vue.prototype.$get(getDetailURL+id)
}

// 获取比赛列表的接口
const getActivityURL = '/activity/getActivityList'
export const getActivityApi = function(){
    return Vue.prototype.$get(getActivityURL)
}

// 参加比赛的接口
const joinActivityURL = '/activity/join'
export const joinActivityApi = function(ruleForm){
    return Vue.prototype.$post(joinActivityURL,ruleForm)
}

// 获取话题列表的接口
const getTopicURL = '/topic/getTopic'
export const getTopicApi = function(){
    return Vue.prototype.$get(getTopicURL)
}

// 发送主评论的接口
const senMainCommentURL = '/topic/addComment'
export const senMainCommentApi = function(mainCommentList){
    return Vue.prototype.$post(senMainCommentURL,mainCommentList)
}

// 发送副评论的接口
const sendSideCommentURL = '/topic/addSideComment'
export const sendSideCommentApi = function(sideCommentList){
    return Vue.prototype.$post(sendSideCommentURL,sideCommentList)
}

// 发布信息的接口
const addMessageURL = '/notifcation/addMessage'
export const addMessageApi = function(submitForm){
    return Vue.prototype.$post(addMessageURL,submitForm)
}

// 发布活动的接口
const addActivityURL = '/activity/addActivity'
export const addActivityApi = function(addActivForm){
    return Vue.prototype.$post(addActivityURL,addActivForm)
}

// 学生记录的接口
const stuRecordURL = '/activity/getUploadList'
export const stuRecordApi = function(){
    return Vue.prototype.$get(stuRecordURL)
}

// 自己参赛记录的接口
const recordURL = '/activity/getPersonList'
export const recordApi = function(personUid){
    return Vue.prototype.$get(recordURL,personUid)
}

// 修改自己的参赛记录的jiek
const editPersonURL = '/activity/editPerson'
export const editPerson = function(personUid,matchName){
    return Vue.prototype.$get(editPersonURL)
}

// 教师端修改消息列表
const editInformationURL = '/notifcation/editNotif'
export const editNotifApi = function(notifForm){
    return Vue.prototype.$post(editInformationURL,notifForm)
}

// 教师端删除消息列表
const deleteInformationURL = '/notifcation/delNotif'
export const delNotifApi = function(notifId){
    return Vue.prototype.$get(deleteInformationURL,notifId)
}