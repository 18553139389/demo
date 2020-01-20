import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uid:'',
		userInfo:{}
		// identity:'',
		// nickname:'',
		// phone:''
	},
	//getters是store的计算属性,过滤返回的是done的值是true的列表
	getters: {},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		setuid(state,data) {
			state.uid = data
		},
		setuserInfo(state,data) {
			state.userInfo = data
			// state.identity = data.identity;
			// state.nickname = data.nickname;
			// state.phone = data.phone;
		}
	}
})

export default store