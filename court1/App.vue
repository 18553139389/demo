<script>
	import Vue from 'vue'
	export default {
		globalData: {
			userInfo: null
		},
		onLaunch: function() {
			//隐藏系统tabbar
			uni.hideTabBar()
			//微信小程序授权登陆操作
			wx.checkSession({
				success() {
					console.log('ok')
				},
				fail() {
					// session_key 已经失效，需要重新执行登录流程
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes)
							wx.redirectTo({
								url: "../login/login?code=" + loginRes.code
							})
						}
					})
				}
			})
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
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
			//隐藏系统tabbar
			uni.hideTabBar()
		},
		onHide: function() {
			
		},

	}
</script>

<style>
	@import "components/u-parse/u-parse.css";
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
