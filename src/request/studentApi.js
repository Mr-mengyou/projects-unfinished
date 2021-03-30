import Vue from 'vue'
// 自己参赛记录的接口
const recordURL = '/activity/getPersonList'
export const recordApi = function(personUid) {
    return Vue.prototype.$get(recordURL, personUid)
}

// 修改自己的参赛记录的jiek
const editPersonURL = '/activity/editPerson'
export const editPersonApi = function(personUid, matchName) {
    return Vue.prototype.$get(editPersonURL, {
        personUid: personUid,
        matchName: matchName
    })
}

//删除自己的参赛记录
const deletePersonActivURL = '/activity/cancelApply'
export const deletePersonActivApi = function(personUid, matchName, cancelLevel) {
    return Vue.prototype.$get(deletePersonActivURL, {
        personUid: personUid,
        matchName: matchName,
        cancelLevel: cancelLevel,
    })
}