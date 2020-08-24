<template>
	<view class="contain">
		<button open-type="getUserInfo" @getuserinfo="getuserinfo">点击授权</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getuserinfo(e) {
				uni.setStorageSync('nickName', e.detail.userInfo.nickName)
				uni.setStorageSync('avatar', e.detail.userInfo.avatarUrl)
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		
		button {
			width: 60%;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			font-size: 30upx;
			color: #FFFFFF;
			border-radius: 4px;
			background: #006EE3;
		}
	}
</style>
