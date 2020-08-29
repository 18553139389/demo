<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">个人中心</view>
			<view class="box">
				<view class="list">
					<view class="titles">
						<view>基本信息</view>
						<view class="circle"></view>
					</view>
					<view class="user" @tap="goUser">
						<view class="msg">
							<view>用户名：</view>
							<view style="margin-left: 5rpx;">{{name}}</view>
						</view>
						<view class="msg">
							<view>头像：</view>
							<image src="../../static/images/head.png" style="margin-left: 10rpx;"></image>
						</view>
						<view class="msg" style="margin-bottom: 0;">
							<view>手机号：</view>
							<view style="margin-left: 5rpx;">{{phone}}</view>
						</view>
					</view>
				</view>
				<view class="list" style="border-right: none;padding-left: 10rpx;box-sizing: border-box;">
					<view class="service">
						<image src="../../static/images/circle.png"></image>
						<view>我的服务</view>
					</view>
					<view class="items" @tap="goAsk">
						<image src="../../static/images/p1.png"></image>
						<view>我的法律咨询</view>
					</view>
					<view class="items" @tap="goAsk1">
						<image src="../../static/images/p2.png"></image>
						<view>我的问题反映</view>
					</view>
					<view class="items" @tap="goAbout">
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
			goAsk() {
				uni.navigateTo({
				    url: '/pages/ask/ask'
				})
			},
			goAsk1() {
				uni.navigateTo({
				    url: '/pages/ask1/ask1'
				})
			},
			goUser() {
				uni.navigateTo({
				    url: '/pages/message/message'
				})
			},
			goAbout() {
				uni.navigateTo({
				    url: '/pages/about/about'
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
		
		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 15rpx;
			box-sizing: border-box;
			
			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
			}
			
			.box {
				width: 100%;
				margin-top: 10rpx;
				border-top: 1px solid #eee;
				display: flex;
				
				.list {
					width: 50%;
					display: flex;
					flex-direction: column;
					margin-top: 20rpx;
					padding-right: 10rpx;
					box-sizing: border-box;
					border-right: 1px solid #eee;
					
					.titles {
						width: 30rpx;
						font-size: 15px;
						font-weight: 600;
						color: #333;
						position: relative;
						
						.circle {
							width: 4px;
							height: 4px;
							border: 2px solid #333;
							border-radius: 50%;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
					
					.user {
						width: 100%;
						background: #f6f6f6;
						border-radius: 4px;
						padding: 10rpx;
						box-sizing: border-box;
						margin-top: 10rpx;
						
						.msg {
							width: 100%;
							display: flex;
							align-items: center;
							font-size: 14px;
							color: #666;
							margin-bottom: 15rpx;
							
							image {
								width: 20rpx;
								height: 20rpx;
								border-radius: 50%;
							}
						}
					}
					
					.service {
						display: flex;
						align-items: center;
						font-size: 15px;
						font-weight: 600;
						margin-bottom: 8rpx;
						
						image {
							width: 12rpx;
							height: 7rpx;
							margin-right: 8rpx;
						}
					}
					
					.items {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 14px;
						color: #333;
						padding-left: 18rpx;
						box-sizing: border-box;
						margin-bottom: 10rpx;
						
						image {
							width: 20rpx;
							height: 20rpx;
							margin-right: 8rpx;
						}
					}
				}
			}
		}
	}
</style>
