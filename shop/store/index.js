import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		address: '',
		aid: ''
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeAddress(state, item) {
			state.address = item
		},
		changeAid(state, item) {
			state.aid = item
		}
	}
})

export default store
