const Toast = {
	showToast(content,icon = 'none',callback){
		uni.showToast({
			title: content,
			icon: icon,
			duration: 2000,
			mask: true,
			success: callback
		})
	},
	hideToast() {
		uni.hideToast()
	},
	showLoading(content,callback) {
		uni.showLoading({
		    title: content,
			mask: true,
			success: callback
		})
	},
	hideLoading() {
		uni.hideLoading()
	}
}

export default Toast
