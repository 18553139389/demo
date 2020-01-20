// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import router from './router'
import Vant from 'vant'
import FastClick from 'fastclick'
FastClick.attach(document.body)
import 'vant/lib/index.css'
Vue.use(Vant)
import './assets/styles/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
import store from './store'
import 'lib-flexible'
import $ from 'jquery'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
	key: '64f004184ffa1345e687318d205ad50e',
	plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',
		'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder'
	],
	v: '1.4.4'
})

import Carousel3d from 'vue-carousel-3d'
Vue.use(Carousel3d)

require('es6-promise').polyfill()
Es6Promise.polyfill()

new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
