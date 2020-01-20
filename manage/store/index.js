import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		uid: '',
		history: [],
		count: 0
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeUid(state, item) {
			state.uid = item
		},
		changeHistory(state, item) {
			state.history = item
		},
		changeCount(state, item) {
			state.count = item
		}
	}
})

export default store
