import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		content: '',
		choiceArr: [],
		orderIndex: 0
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeContent(state, item) {
			state.content = item
		},
		changeArr(state, item) {
			state.choiceArr = item
		},
		changeOrderIndex(state, item) {
			state.orderIndex = item
		}
	}
})

export default store
