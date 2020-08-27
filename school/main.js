import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store 
Vue.config.productionTip = false

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()