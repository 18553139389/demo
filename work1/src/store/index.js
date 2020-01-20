import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count:0,
		todos:[
			{ id: 1, text: '苹果', done: true },
			{ id: 2, text: '橘子', done: true },
			{ id: 3, text: '香蕉', done: false},
			{ id: 4, text: '菠萝', done: true }
		]
	},
	//getters是store的计算属性,过滤返回的是done的值是true的列表
	getters: {
		done:state => {
			return state.todos.filter(item => item.done)
		},
		count:state => {
			return state.count
		},
		doneCount:(state,getters) => {
			return getters.done.length
		}
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		increment(state,payload) {
			state.count += payload.amount
		},
		decrement(state,payload) {
			state.count -= payload.amount
		}
	}
})

export default store