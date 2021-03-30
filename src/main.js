import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Header from './components/Header'
import axios from 'axios'
import {
    get,
    post
} from './request/http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './static/css/index.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.use(Header.name, Header)

Vue.use(ElementUI)

new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount('#app')