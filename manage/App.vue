<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			// 处理推送消息
			// this.handlePush()
		},
		onHide: function() {

		},
		methods: {
			// handlePush() {
			// 	const _self = this
			// 	const _handlePush = function(message) {
			// 		//监听接收透传消息事件  
			// 		plus.push.addEventListener('receive', function(msg) {
			// 			//处理透传消息的业务逻辑代码 
			// 			plus.nativeUI.alert("recevice:" + JSON.stringify(msg))
			// 			let count = _self.$store.state.count
			// 			count++
			// 			_self.$store.commit('changeCount', count)
			// 		}, false)
			// 	}
			// 	// 事件处理
			// 	plus.push.addEventListener('receive', _handlePush)
			// }
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	html,
	body {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	* {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
	}
</style>
