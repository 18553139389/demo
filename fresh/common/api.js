import Vue from 'vue'  //引入vue
import axios from 'axios'  //引入axios
import {axiosUrl}  from './config'  //引入配置的公共接口url
axios.defaults.baseURL = axiosUrl; //axios的基地址
Vue.prototype.$http = axios  //挂载axios到vue原型的$http属性下
Object.assign(Vue.prototype,{ //vue的原型合并axios和axiosUrl    
	_ajax : axios ,
    _api : axiosUrl
})
