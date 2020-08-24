<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">设置</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="forms">
				<view class="common" @tap="goSet">
					<view>重置登录密码</view>
					<view class="msg">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="common" @tap="goAbout">
					<view>关于我们</view>
					<view class="msg">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="common" @tap="goSuggest">
					<view>意见反馈</view>
					<view class="msg">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
			</view>
			<view class="btns" @tap="goQuit">退出登录</view>
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
			goSet() {
				uni.navigateTo({
				    url: '/pages/reset/reset'
				})
			},
			goAbout() {
				uni.navigateTo({
				    url: '/pages/about/about'
				})
			},
			goSuggest() {
				uni.navigateTo({
				    url: '/pages/personSuggest/personSuggest'
				})
			},
			goQuit() {
				uni.removeStorageSync('uid')
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			padding: 0 28upx;
			box-sizing: border-box;
			flex-direction: column;
			align-items: center;
			
			.forms {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.common {
					width: 100%;
					height: 100upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 14px;
					color: #333;
					
					.msg {
						display: flex;
						align-items: center;
						
						img {
							width: 18upx;
							height: 27upx;
							margin-left: 24upx;
						}
					}
				}
			}
			
			.btns {
				width: 50%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				margin: 50upx auto 0;
				border-radius: 4px;
				background: #FF6600;
				color: #FFFFFF;
				font-size: 28upx;
			}
		}
	}
</style>
