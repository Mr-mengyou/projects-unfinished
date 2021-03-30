import Vue from 'vue'
// 教师端修改消息列表
const editInformationURL = '/notifcation/editNotif'
export const editNotifApi = function(notifForm) {
    return Vue.prototype.$post(editInformationURL, notifForm)
}

// 教师端删除自己的消息列表
const deleteInformationURL = '/notifcation/delNotif'
export const delNotifApi = function(notifId) {
    return Vue.prototype.$get(deleteInformationURL, notifId)
}

// 教师端删除自己的活动列表
const deleteOwnActivURL = '/activity/delOwnActiv'
export const deleteOwnActivApi = function(id) {
    return Vue.prototype.$get(deleteOwnActivURL, {
        delId: id
    })
}

// 学生记录的接口
const stuRecordURL = '/activity/getUploadList'
export const stuRecordApi = function() {
    return Vue.prototype.$get(stuRecordURL)
}

// 获取自己发布的比赛列表的接口
const getOwnActivityURL = '/activity/getOwnActivityList'
export const getOwnActivityApi = function(id) {
    return Vue.prototype.$get(getOwnActivityURL, {
        publisher: id
    })
}