import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/tiezidetail'
		},
		{
			path: '/skilldetail',
			name:'skilldetail',
			component: () => import("@/components/skilldetail")
		},
		{
			path: '/taskdetail',
			name:'taskdetail',
			component: () => import("@/components/taskdetail")
		},
		{
			path: '/jinjiedetail',
			name:'jinjiedetail',
			component: () => import("@/components/jinjiedetail")
		},
		{
			path: '/kjdetail',
			name:'kjdetail',
			component: () => import("@/components/kjdetail")
		},
		{
			path: '/help',
			name:'help',
			component: () => import("@/components/help")
		},
		{
			path: '/tiezidetail',
			name:'tiezidetail',
			component: () => import("@/components/tiezidetail")
		},
		{
			path: '/qzdetail',
			name:'qzdetail',
			component: () => import("@/components/qzdetail")
		}
	]
})
