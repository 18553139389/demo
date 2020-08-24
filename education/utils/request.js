import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-spin'
import 'vue-loading-spin/dist/loading.css'
Vue.use(Loading)
Vue.use(Loading, {
  isFixed: true, // 是否固定位置，默认为true
  isComponent: true, // 是否自动注册为全局组件，如果设置为false就不会注册成组件来使用
  isShowAnimation: true, // 是否显示动画效果，默认为true
  isShowMask: true,
  indicatorText: ''
})

let loading = Loading.get({})
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'https://www.jxqcjy.cn/'
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://www.jxqcjy.cn/'
}

axios.defaults.timeout = 200000

// post请求
function postRequest(url, data = {}, method = 'post', headers = {
  'Content-Type': 'application/json'
}) {
  loading.showLoading(false, false, '')
  return new Promise((resolve, reject) => {
    axios({
        url: url,
        method,
        headers,
        data: JSON.stringify(data)
      })
      .then(res => {
        loading.hideLoading()
        //成功
        resolve(res)
      })
      .catch(res => {
        //失败
        reject(res)
      })
  })
}

function postRequest1(url, data = {}, method = 'post', headers = {
  'Content-Type': 'application/json'
}) {
  return new Promise((resolve, reject) => {
    axios({
        url: url,
        method,
        headers,
        data: JSON.stringify(data)
      })
      .then(res => {
        //成功
        resolve(res)
      })
      .catch(res => {
        //失败
        reject(res)
      })
  })
}

export default {
  postRequest,
  postRequest1
}
