const ajax = (opt) => {
	opt = opt || {}
	opt.url = opt.url || ''
	opt.data = JSON.stringify(opt.data) || {}
	
	opt.method = opt.method || 'POST'
	opt.header = opt.header || {
		"Content-Type": "application/json",
	}
	opt.success = opt.success || function() {}
	opt.fail = opt.fail || function() {}
	console.log(opt.data)
	uni.request({
		url: 'http://39.99.254.186' + opt.url,
		data: opt.data,
		method: opt.method,
		header: opt.header,
		dataType: "json",
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

export {ajax}
