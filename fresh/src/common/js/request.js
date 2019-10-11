import axios from 'axios'


// 环境的切换
// if (process.env.NODE_ENV == 'development') {
// 	axios.defaults.baseURL = 'http://122.114.49.11:8077/xiangxian/api/customer/services?json='
// } else if (process.env.NODE_ENV == 'debug') {
// 	axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
// 	axios.defaults.baseURL = 'http://122.114.49.11:8077/xiangxian/api/customer/services?json='
// }

axios.defaults.timeout = 10000

// post请求
function postRequest(data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    axios({
        url: encodeURI('http://39.108.249.42/api/customer/services?json=' + JSON.stringify(data)),
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
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

function postCommon(data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    axios({
        url: encodeURI('http://39.108.249.42/api/common/services?json=' + JSON.stringify(data)),
        method: method,
        headers: {
          'Content-Type': 'text/plain'
        }
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


function postFile(data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    axios({
        url: encodeURI('http://39.108.249.42/api/uploadFile'),
        method: method,
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
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
  postCommon,
  postFile
}
