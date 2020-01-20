import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		head: '',
		location: '',
		lat: '',
		lon: ''
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeLocation(state,location) {
			state.location = location
		},
		changeLat(state,item) {
			state.lat = item
		},
		changeLon(state,item) {
			state.lon = item
		},
		changeHead(state,item) {
			state.head = item
		}
	}
})

export default store