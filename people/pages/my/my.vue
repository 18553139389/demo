<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">我的</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="message" @tap="goUser">
				<image src="../../static/images/head.png"></image>
				<view class="user">
					<view>{{name}}</view>
					<view class="tel">
						<image src="../../static/images/tel.png"></image>
						<view>{{phone}}</view>
					</view>
				</view>
			</view>
			<view class="tabs">
				<view class="tabs-title">
					<image src="../../static/images/circle.png"></image>
					<view>我的服务</view>
				</view>
				<view class="nav">
					<view class="nav-item" @tap="goAsk" style="background: #FFFBEF;">
						<image src="../../static/images/p1.png"></image>
						<view>我的法律咨询</view>
					</view>
					<view class="nav-item" @tap="goSuggest" style="background: #E9F7F0;">
						<image src="../../static/images/p2.png"></image>
						<view>我的问题反映</view>
					</view>
					<view class="nav-item" @tap="goLink" style="background: #F4F7FF;">
						<image src="../../static/images/p3.png"></image>
						<view>联系我们</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				name: '',
				phone: ''
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				let data = {
					url: 'userInfo',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							Toast.hideLoading()
							self.name = res.data.body.name
							self.phone = res.data.body.phone
						} else {
							Toast.hideLoading()
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			},
			goUser() {
				uni.navigateTo({
					url: '/pages/user/user'
				})
			},
			goAsk() {
				uni.navigateTo({
					url: '/pages/myAsk/myAsk'
				})
			},
			goSuggest() {
				uni.navigateTo({
					url: '/pages/mySuggest/mySuggest'
				})
			},
			goLink() {
				uni.navigateTo({
					url: '/pages/link/link'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
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
			
			.message {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				background: #FFFFFF;
				
				image {
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
				}
				
				.user {
					height: 110rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					font-size: 28rpx;
					color: #333;
					margin-left: 28rpx;
					
					.tel {
						width: 100%;
						display: flex;
						align-items: center;
						
						image {
							width: 30rpx;
							height: 34rpx;
							margin-right: 24rpx;
							border-radius: 0;
						}
					}
				}
			}
			
			.tabs {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				
				.tabs-title {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 28rpx;
					color: #333;
					display: flex;
					align-items: center;
					
					image {
						width: 46rpx;
						height: 20rpx;
						margin-right: 28rpx;
					}
				}
				
				.nav {
					width: 100%;
					background: #FFFFFF;
					border-radius: 4px;
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
					
					.nav-item {
						width: 30%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 26rpx;
						color: #333;
						padding: 40rpx 0;
						
						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-bottom: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
