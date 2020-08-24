import axios from 'axios'

// 环境的切换
axios.defaults.baseURL = 'http://m.xgcyz1978.com'
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
