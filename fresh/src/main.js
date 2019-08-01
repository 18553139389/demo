import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import router from './router'
import FastClick from 'fastclick'
FastClick.attach(document.body)
import {
  Lazyload
} from 'vant';
Vue.use(Lazyload, {
  error: '../static/img/tilogo.png',
  loading: '../static/img/logo.png',
  attempt: 3
})
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.config.productionTip = false
import 'lib-flexible'
import './common/stylus/index.styl'

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '64f004184ffa1345e687318d205ad50e',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',
    'AMap.PolyEditor', 'AMap.CircleEditor'
  ],
  v: '1.4.4'
})

require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.filter('hideMiddle', function (val) { //手机号码隐藏过滤器
  return `${val.slice(0, 3)}****${val.slice(-4)}`
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (JSON.parse(localStorage.getItem("user"))) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
