export default {
	post(url, token, data, successCallback, errorCallBack) {
		// window.$store.commit('system/COMMIT_NET_WORK_ERROR', false)
		return wx.request({
			url: url, 
			method: 'POST',
			data: data,
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				this.$store.commit('system/COMMIT_NET_WORK_ERROR', false)
				if (successCallback !== undefined) successCallback(res)
			},
			fail() {
				if (token) {
					this.$store.commit('system/COMMIT_NET_WORK_ERROR', true)
				}
				if (errorCallBack !== undefined) {
					if (errorCallBack !== undefined) errorCallBack()
				}
			}
		})
		// 		return $.ajax({
		// 			url: url,
		// 			type: 'POST',
		// 			data: data,
		// 			headers: {
		// 				'Authorization': token,
		// 				'Accept': 'Application/json'
		// 			},
		// 			success: function(response) {
		// 				window.$store.commit('system/COMMIT_NET_WORK_ERROR', false)
		// 				if (successCallback !== undefined) successCallback(response)
		// 			},
		// 			error: function(jqXHR, textStatus, errorThrown) {
		// 				if (token) {
		// 					window.$store.commit('system/COMMIT_NET_WORK_ERROR', true)
		// 				}
		// 				if (errorCallBack !== undefined) {
		// 					if (errorCallBack !== undefined) errorCallBack()
		// 				}
		// 			}
		// 		})
	},
	get(url, token, successCallback, errorCallBack) {
		// window.$store.commit('system/COMMIT_NET_WORK_ERROR', false)
		return wx.request({
			url: url, 
			method: 'GET',
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				// this.$store.commit('system/COMMIT_NET_WORK_ERROR', false)
				if (successCallback !== undefined) successCallback(res)
			},
			fail() {
				if (token) {
					window.$store.commit('system/COMMIT_NET_WORK_ERROR', true)
				}
				if (errorCallBack !== undefined) {
					errorCallBack()
				}
			},
			complete(res) {
				console.log(res)
			}
		})
		// 		return $.ajax({
		// 			url: url,
		// 			type: 'GET',
		// 			headers: {
		// 				'Authorization': token
		// 			},
		// 			success: function(response) {
		// 				window.$store.commit('system/COMMIT_NET_WORK_ERROR', false)
		// 				if (successCallback !== undefined) successCallback(response)
		// 			},
		// 			error: function(jqXHR, textStatus, errorThrown) {
		// 				if (token) {
		// 					window.$store.commit('system/COMMIT_NET_WORK_ERROR', true)
		// 				}
		// 				if (errorCallBack !== undefined) {
		// 					errorCallBack()
		// 				}
		// 			}
		// 		})
	}
}
