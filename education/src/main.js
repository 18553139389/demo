import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import '@/assets/css/reset.css'
Vue.prototype.$store = store
Vue.use(ViewUI)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Loading from 'vue-loading-spin'
import 'vue-loading-spin/dist/loading.css'
Vue.use(Loading)
Vue.use(Loading, {
  isFixed: true, // 是否固定位置，默认为true
  isComponent: true, // 是否自动注册为全局组件，如果设置为false就不会注册成组件来使用
  isShowAnimation: true ,// 是否显示动画效果，默认为true
  isShowMask: true,
  indicatorText: ''
})

Vue.prototype.$loading = Loading

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("uid")) { // 通过vuex state获取当前的token是否存在
      if(to.name == 'result' && sessionStorage.getItem("isTest") == 0) {
        next({
          path: '/fun',
          query: {
            redirect: to.name,
            params: to.params
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      } else {
         next()
      }
    } else {
      next({
        path: '/cardLogin',
        query: {
          redirect: to.name,
          params: to.params
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
