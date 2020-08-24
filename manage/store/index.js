import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		productItem: '',
		productState: '',
		carNum: ''
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeProductItem(state, item) {
			state.productItem = item
		},
		changeProductState(state, item) {
			state.productState = item
		},
		changeCarNum(state, item) {
			state.carNum = item
		},
	}
})

export default store
