import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		location: '',
		title: '',
		title1: '',
		address: '',
		lat: null,
		lon: null,
		navItem: 0
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeLocation(state, item) {
			state.location = item
		},
		changeTitle(state, item) {
			state.title = item
		},
		changeTitle1(state, item) {
			state.title1 = item
		},
		changeAddress(state, item) {
			state.address = item
		},
		changeLat(state, item) {
			state.lat = item
		},
		changeLon(state, item) {
			state.lon = item
		},
		changeNav(state, item) {
			state.navItem = item
		}
	}
})

export default store
