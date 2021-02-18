import Vue from 'vue'
import App from './App'
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
import './static/style/reset.css'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import uView from "uview-ui"
Vue.use(uView)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})

import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
