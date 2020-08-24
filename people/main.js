import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store 
// 复制到粘贴板插件
// import VueClipboard from 'vue-clipboard2'
// VueClipboard.config.autoSetContainer = true
// Vue.use(VueClipboard)

Vue.config.productionTip = false

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()