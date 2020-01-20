import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: {},
    personList: {},
    typeAll: 0,
    code: 0
  },
  mutations: {
    getMessage(state, n) {
      state.message = n
    },
    getPersonList(state, n) {
      state.personList = n
    },
    getType(state, n) {
      state.typeAll = n
    },
    getCode(state, n) {
      state.code = n
    },
    add(state, n) {
      state.count += n
    },
    reduce(state) {
      state.count--
    }
  },
  actions: {
    //普通的异步修改状态主要分为context,commit
    addActions(context, n) {
      context.commit('add', n)
    },

    reduceActions({
      commit
    }) {
      commit('reduce')
    },

    //异步操作的顺序执行问题,当A方法必须依赖于B方法执行的结果时
    addAction(context, n) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('add', n)
          resolve()
        }, 1000)
      })
    },

    reduceAction({
      dispatch,
      commit
    }) {
      return dispatch('addAction', 4).then(() => {
        commit('reduce')
      })
    }
  }
})

export default store
