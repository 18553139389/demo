import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		list: {},
		states: 0,
		stateItem: 0
	},
	mutations: {
		getList(state,item) {
			state.list = item
		},
		getState(state,item) {
			state.states = item
		},
		getStateItem(state,item) {
			state.stateItem = item
		},
	}
})

export default store