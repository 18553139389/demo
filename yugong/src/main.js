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
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'
Vue.config.productionTip = false
import store from './store'
import $ from 'jquery'
import 'lib-flexible/flexible'
import mixins from './mixins'
import install from './components/commons/index';
import { Toast } from 'vant';
Vue.use(Vant).use(install).use(Toast)
Vue.mixin(mixins)

require('es6-promise').polyfill()
Es6Promise.polyfill()

router.beforeEach((to,form,next)=>{
	if(window.sessionStorage.getItem("youke")=='3' && to.name != 'index' && to.name != 'login'){		
		const toast = Toast.loading({
			duration: 0,       // 持续展示 toast
			forbidClick: true, // 禁用背景点击
			loadingType: 'spinner',
			message: '返回登陆'
		  });
		  
		  let second = 1;
		  const timer = setInterval(() => {
			second--;
			if (second) {
			  toast.message = `倒计时 ${second} 秒`;
			} else {
			  clearInterval(timer);
			  Toast.clear();
			  next('/login')
			}
		  }, 1000);
	}else if(window.sessionStorage.getItem("youke") !='3' &&  to.name=='rank' && JSON.parse(window.sessionStorage.getItem("userInfo")).identity !='0'){
		
			Toast.fail('暂无权限！');
			return;
	}else{
		next()
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
