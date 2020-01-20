import axios from 'axios'

// 环境的切换
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'http://112.35.113.88'
	// axios.defaults.baseURL = 'http://192.168.3.198:8080'
} else if (process.env.NODE_ENV == 'debug') {
	axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'http://112.35.113.88'
}

axios.defaults.timeout = 10000

// post请求
function postRequest(url, data = {}, method = 'post') {
	return new Promise((resolve, reject) => {
		axios({
				url: url,
				method: method,
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
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
function jjj(){
	console.log(1111)
}
function ppp(){
	console.log(222)
}
export default {postRequest,jjj,ppp}
