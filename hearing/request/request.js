const ajax = (opt) => {
	opt = opt || {}
	opt.url = opt.url || ''
	opt.data = opt.data || {}
	opt.method = opt.method || 'POST'
	opt.header = opt.header || {
		"Content-Type": "application/x-www-form-urlencoded",
	}
	opt.success = opt.success || function() {}
	opt.fail = opt.fail || function() {}
	console.log(opt.data)
	// https://xcx.boinhearing.cn
	uni.request({
		url: 'https://xcx.boinhearing.cn/api/service?json=' + JSON.stringify(opt.data),
		data: opt.data,
		method: opt.method,
		header: opt.header,
		success: function(res) {
			opt.success(res)
		},
		fail: function(res) {
			opt.fail(res)
			uni.showToast({
				title: '请稍后重试',
				icon: 'none'
			})
		}
	})
}

export {
	ajax
}
