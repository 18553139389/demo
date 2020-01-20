<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">设置</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<ul>
				<li @tap="goForget">
					<view>重置登录密码</view>
					<img src="../../static/images/xiayiye2.png" alt="">
				</li>
				<li @tap="goAbout">
					<view>关于我们</view>
					<img src="../../static/images/xiayiye2.png" alt="">
				</li>
			</ul>
			<view class="back" @tap="goBack">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333'
			}
		},
		methods: {
			goForget() {
				uni.navigateTo({
					url: '/pages/resetPass/resetPass'
				})
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			goBack() {
				uni.removeStorageSync('message')
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			ul {
				width: 100%;
				display: flex;
				flex-direction: column;

				li {
					width: 100%;
					height: 90upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #333;
					padding: 0 28upx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;

					img {
						width: 14upx;
						height: 24upx;
					}
				}
			}

			.back {
				width: 50%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 14px;
				color: #FFFFFF;
				border-radius: 30px;
				background: #007AFF;
				margin: 50upx auto;
			}
		}
	}
</style>
