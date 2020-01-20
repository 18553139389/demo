import axios from 'axios'

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
function postRequest(url, data = {}, method = 'post', headers = {'Content-Type': 'application/json'}) {
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
	postRequest
}
