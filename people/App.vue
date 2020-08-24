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

		},
		onHide: function() {

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

	.uni-page-body {
		height: 100%;
	}

	* {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
	}

	.uni-radio-input {
		width: 16px !important;
		height: 16px !important;
	}

	uni-radio::before,
	uni-checkbox::before {
		right: 2px !important;
	}

	uni-button:after {
		border: none !important;
	}
</style>
