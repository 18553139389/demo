const toast = {
	showTitle(title) {
		uni.showToast({
		    title,
			icon: 'none',
		    duration: 2000
		})
	},
	hideTitle() {
		uni.hideToast()
	},
	showLoading(name) {
		uni.showLoading({
			title: name
		})
	},
	hideLoading() {
		uni.hideLoading()
	}
}

export default toast
