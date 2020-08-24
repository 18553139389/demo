import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store  
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'

Vue.use(Vant)

Vue.config.productionTip = false

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
