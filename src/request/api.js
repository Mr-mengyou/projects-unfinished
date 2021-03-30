import Vue from 'vue'

// 登录接口
const loginURL = '/user/login'
export const loginApi = function(loginForm) {
    return Vue.prototype.$post(loginURL, loginForm)
}

// 检查登录接口
const checkLoginURL = '/user/checkLogin'
export const checkLoginApi = function(userId) {
    return Vue.prototype.$get(checkLoginURL, {
        userId: userId
    })
}

// 上传个人信息
const myInfoURL = '/user/myInfo'
export const myInfoApi = function(myInfoList) {
    return Vue.prototype.$post(myInfoURL, myInfoList)
}

// 数据统计图
const getChartDataURL = '/user/getChartData'
export const getChartDataApi = function(dataType) {
    return Vue.prototype.$get(getChartDataURL, {
        dataType: dataType,
    })
}

//批量下载
export const testApi = function() {
    return Vue.prototype.$get()
}