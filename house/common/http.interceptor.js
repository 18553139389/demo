const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://integral.dazhoutian.net:8080/integralwall/api',
		method: 'POST',
		dataType: 'json',
		showLoading: false,
		loadingText: '请求中...',
		loadingTime: 800,
		originalData: false,
		loadingMask: true,
		header: {
			'content-type': 'application/json;charset=UTF-8'
		}
	})
}

export default {
	install
}
