var state = true
export default {
	start() {
		wx.getNetworkType({
			success(res) {
				const networkType = res.networkType
				if (networkType != 'none') {
					wx.showLoading({
						title: '加载中',
						success() {
							state = false
						}
					})
					let timer = setTimeout(() => {
						if (!state) {
							wx.hideLoading()
							wx.showToast({
								title: '服务器繁忙',
								icon: 'loading',
								duration: 20000000
							})
						}
					}, 15000)
				} else {
					wx.showToast({
						title: '当前无网络连接',
						duration: 20000000
					})
				}
			}
		})
	},
	destroy(timer) {
		wx.hideLoading()
		state = true
	}
}
