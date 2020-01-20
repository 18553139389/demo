import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    //路由重定向
    {
      path: '/',
      redirect: '/index'
    },
    //实现路由懒加载原理：这种写法打包时会给每个路由单独打包一个js文件，这样首屏加载时只需要加载首屏的js文件就可以了
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['../component/index.vue'], resolve)
    },
    {
      path: '/buy',
      name: 'buy',
      component: resolve => require(['../component/buy.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../component/login.vue'], resolve)
    },
    {
      path: '/cardLogin',
      name: 'cardLogin',
      component: resolve => require(['../component/cardLogin.vue'], resolve)
    },
    {
      path: '/zhineng',
      name: 'zhineng',
      component: resolve => require(['../component/zhineng.vue'], resolve)
    },
    {
      path: '/general',
      name: 'general',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/general.vue'], resolve)
    },
    {
      path: '/hobby',
      name: 'hobby',
      component: resolve => require(['../component/hobby.vue'], resolve)
    },
    {
      path: '/personMessage',
      name: 'personMessage',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/personMessage.vue'], resolve)
    },
    {
      path: '/bigData',
      name: 'bigData',
      component: resolve => require(['../component/bigData.vue'], resolve)
    },
    {
      path: '/commonSearch',
      name: 'commonSearch',
      component: resolve => require(['../component/commonSearch.vue'], resolve)
    },
    {
      path: '/minSchool',
      name: 'minSchool',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/minSchool.vue'], resolve)
    },
    {
      path: '/schoolDetail',
      name: 'schoolDetail',
      component: resolve => require(['../component/schoolDetail.vue'], resolve)
    },
    {
      path: '/minClasses',
      name: 'minClasses',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/minClasses.vue'], resolve)
    },
    {
      path: '/schoolSearch',
      name: 'schoolSearch',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/schoolSearch.vue'], resolve)
    },
    {
      path: '/hotMajor',
      name: 'hotMajor',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/hotMajor.vue'], resolve)
    },
    {
      path: '/newSchool',
      name: 'newSchool',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/newSchool.vue'], resolve)
    },
    {
      path: '/commonArt',
      name: 'commonArt',
      component: resolve => require(['../component/commonArt.vue'], resolve)
    },
    {
      path: '/minScores',
      name: 'minScores',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/minScores.vue'], resolve)
    },
    {
      path: '/commonSports',
      name: 'commonSports',
      component: resolve => require(['../component/commonSports.vue'], resolve)
    },
    {
      path: '/expert',
      name: 'expert',
      component: resolve => require(['../component/expert.vue'], resolve)
    },
    {
      path: '/expertDetail',
      name: 'expertDetail',
      component: resolve => require(['../component/expertDetail.vue'], resolve)
    },
    {
      path: '/exampleSuc',
      name: 'exampleSuc',
      component: resolve => require(['../component/exampleSuc.vue'], resolve)
    },
    {
      path: '/exampleDetail',
      name: 'exampleDetail',
      component: resolve => require(['../component/exampleDetail.vue'], resolve)
    },
    {
      path: '/xuanke',
      name: 'xuanke',
      component: resolve => require(['../component/xuanke.vue'], resolve)
    },
    {
      path: '/subjects',
      name: 'subjects',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/subjects.vue'], resolve)
    },
    {
      path: '/subjectsClass',
      name: 'subjectsClass',
      component: resolve => require(['../component/subjectsClass.vue'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['../component/about.vue'], resolve)
    },
    {
      path: '/question',
      name: 'question',
      component: resolve => require(['../component/question.vue'], resolve)
    },
    {
      path: '/questionDetail',
      name: 'questionDetail',
      component: resolve => require(['../component/questionDetail.vue'], resolve)
    },
    {
      path: '/person',
      name: 'person',
      component: resolve => require(['../component/person.vue'], resolve),
      meta: {
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/editor',
      name: 'editor',
      component: resolve => require(['../component/editor.vue'], resolve)
    },
    {
      path: '/hotClasses',
      name: 'hotClasses',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/hotClasses.vue'], resolve)
    },
    {
      path: '/zhifubao',
      name: 'zhifubao',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../component/zhifubao.vue'], resolve)
    },
    {
      path: '/tel',
      name: 'tel',
      component: resolve => require(['../component/tel.vue'], resolve)
    },
    {
      path: '/call',
      name: 'call',
      component: resolve => require(['../component/call.vue'], resolve)
    }
  ]
})
