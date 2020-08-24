import Vue from 'vue'
import Vuex from 'vuex'
import conversation from './modules/conversation.js'
import group from './modules/group'
import user from './modules/user'
import global from './modules/global'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    conversation,
    group,
    user,
    global
  },
  state: {
  	content: ''
  },
  mutations: {
  	getContent(state, content) {
  		state.content = content
  	}
  }
})

export default store
