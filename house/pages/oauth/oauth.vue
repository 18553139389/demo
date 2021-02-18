<template>
	<view class="contain"></view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			if(uni.getStorageSync('uid')) {
				uni.reLaunch({
				    url: '/pages/article/article'
				})
			} else {
				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfb989075042af8ac&redirect_uri=http://integral.dazhoutian.net/integralwall/home/pages/article/article&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
