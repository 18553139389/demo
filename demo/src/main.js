import Vue from 'vue'
import App from './App'
import Boostrap from './library/Boostrap'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store'
import Es6Promise from 'es6-promise'
import MpvueRouterPatch from 'mpvue-router-patch'
import 'mpvue-weui/src/style/weui.css'

Vue.use(MpvueRouterPatch)
const wx = Vue.wechat
const http = Vue.http

require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.config.productionTip = false
App.mpType = 'app'

//全局定义vuex属性
Vue.prototype.$store = store

const app = new Vue({
	store,
	App,
	beforeCreate() {
		let env = process.env.NODE_ENV
		let self = this
		// window.__proto__.$store = this.$store
		this.$store.commit('server/COMMIT_SET_SERVER_READY', false)
		this.$store.dispatch('env/SET_ENV', env).then(() => {
			Boostrap.init(this.$store, {
				preProcess: function() {
					self.$store.dispatch('account/GET_ACCOUNT')
					// setTimeout(function() {
					// 	self.$store.dispatch('payment/GET_DATA_FROM_CLOUD')
					// }, 0)
					self.$store.dispatch('account/GET_ACCOUNT')
					setTimeout(function () {
					  self.$store.dispatch('payment/GET_DATA_FROM_CLOUD')
					}, 0)
				},
				successCb: function() {}
			})
		})
	}
})
app.$mount()

// new Vue({
// 	store,
// 	render: h => h(App),
// 	beforeCreate() {
// 		let env = process.env.NODE_ENV
// 		let self = this
// 		// window.__proto__.$store = this.$store
// 		this.$store.commit('server/COMMIT_SET_SERVER_READY', false)
// 		this.$store.dispatch('env/SET_ENV', env).then(() => {
// 			Boostrap.init(this.$store, {
// 				preProcess: function() {
// 					self.$store.dispatch('account/GET_ACCOUNT')
// 					setTimeout(function() {
// 						self.$store.dispatch('payment/GET_DATA_FROM_CLOUD')
// 					}, 0)
// 				},
// 				successCb: function() {}
// 			})
// 		})
// 	}
// }).$mount('#app')
