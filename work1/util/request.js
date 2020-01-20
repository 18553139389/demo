import axios from 'axios'

// 环境的切换
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'http://222.143.144.244:38081/hebipassport/'
	// axios.defaults.baseURL = 'http://192.168.3.202:8080/hebipassport'
} else if (process.env.NODE_ENV == 'debug') {
	axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'http://222.143.144.244:38081/hebipassport/'
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

export default {
	postRequest: postRequest
}
