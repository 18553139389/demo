<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			let self = this
			uni.getSystemInfo({
				success: function(e) {
					self.$store.commit('setSystemInfo', e)
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
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "stylus/base.styl";
	@import url("/components/gaoyia-parse/parse.css");
	
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
	
	button:after {
		border none
	}
</style>
