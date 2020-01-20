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
				uni.switchTab({
				    url: '/pages/index/index'
				})
			} else {
				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc3ef38a3e13e51b8&redirect_uri=http://m.tfgwzz.com/pages/index/index&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
