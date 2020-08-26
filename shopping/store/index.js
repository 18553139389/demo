import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		uid: '',
		history: [],
		id: '',
		name: '',
		selectId: 3,
		slideId: ''
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeUid(state, item) {
			state.uid = item
		},
		changeHistory(state, item) {
			state.history = item
		},
		changeId(state, item) {
			state.id = item
		},
		changeName(state, item) {
			state.name = item
		},
		changeSelectId(state, item) {
			state.selectId = item
		},
		changeSlideId(state, item) {
			state.slideId = item
		}
	}
})

export default store
