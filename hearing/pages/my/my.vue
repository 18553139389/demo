<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :Color="Color" :backColor="backColor" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">个人中心</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="user">
				<image :src="userList.icon"></image>
				<view class="message" @tap="goPerson">
					<view class="msg-top">
						<view class="name">{{userList.nickname}}</view>
						<view>个人主页</view>
					</view>
					<view>用户端</view>
				</view>
			</view>
			<view class="order">
				<image src="../../static/images/wdedingdan.png"></image>
				<view @tap="goOrder(0)">我的订单</view>
				<view class="nav">
					<view class="nav-item" @tap="goOrder(1)">
						<image src="../../static/images/order1.png"></image>
						<view>待付款</view>
					</view>
					<view class="nav-item" @tap="goOrder(2)">
						<image src="../../static/images/order4.png"></image>
						<view>已预约</view>
					</view>
					<view class="nav-item" @tap="goOrder(3)">
						<image src="../../static/images/order2.png"></image>
						<view>待使用</view>
					</view>
					<view class="nav-item" @tap="goOrder(4)">
						<image src="../../static/images/order3.png"></image>
						<view>已使用</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list-item" @tap="goMessage">
					<image src="../../static/images/select1.png"></image>
					<view>消息</view>
				</view>
				<view class="list-item" @tap="goComment">
					<image src="../../static/images/select2.png"></image>
					<view>我的评论</view>
				</view>
				<view class="list-item" @tap="goStore">
					<image src="../../static/images/select3.png"></image>
					<view>我的收藏</view>
				</view>
				<view class="list-item" @tap="goAbout('1')">
					<image src="../../static/images/select5.png"></image>
					<view>关于我们</view>
				</view>
				<view class="list-item" @tap="goAbout('2')">
					<image src="../../static/images/select6.png"></image>
					<view>用户守则</view>
				</view>
				<view class="list-item" @tap="goQuestion">
					<image src="../../static/images/select7.png"></image>
					<view>意见反馈</view>
				</view>
			</view>
			<view class="back" @tap="goBack">退出登录</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#ffffff',
				userList: {}
			}
		},
		computed: {
		  ...mapState({
		    myInfo: state => state.user.myInfo
		  })
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'userInfo',
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.userList = res.data
								console.log(res)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goPerson() {
				uni.navigateTo({
				    url: '/pages/user/user'
				})
			},
			goMessage() {
				uni.navigateTo({
				    url: '/pages/message/message'
				})
			},
			goOrder(k) {
				uni.navigateTo({
				    url: '/pages/order/order?type=' + k
				})
			},
			goComment() {
				uni.navigateTo({
				    url: '/pages/myComment/myComment'
				})
			},
			goStore() {
				uni.navigateTo({
				    url: '/pages/myStore/myStore'
				})
			},
			goAbout(num) {
				uni.navigateTo({
				    url: '/pages/myContent/myContent?num=' + num
				})
			},
			goQuestion() {
				uni.navigateTo({
				    url: '/pages/question/question'
				})
			},
			goBack() {
				if (this.myInfo.userID) {
				  this.$store.dispatch('resetStore')
				}
				uni.clearStorageSync()
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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.user {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				display: flex;
				
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
				
				.message {
					width: 75%;
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-left: 24rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #666;
					
					.msg-top {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28rpx;
						color: #666;
						
						.name {
							font-size: 30rpx;
							color: #333;
							font-weight: 600;
						}
					}
				}
			}
			
			.order {
				width: 100%;
				padding: 28rpx 28rpx 60rpx;
				box-sizing: border-box;
				border-radius: 6px;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #fff;
				background: #07A0CE;
				margin: 30rpx 0;
				position: relative;
				
				image {
					width: 32rpx;
					height: 38rpx;
					margin-right: 24rpx;
				}
				
				.nav {
					width: 100%;
					padding: 28rpx;
					box-sizing: border-box;
					background: #fff;
					border-radius: 6px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: absolute;
					left: 0;
					bottom: -160rpx;
					
					.nav-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 28rpx;
						color: #333;
						
						image {
							width: 80rpx;
							height: 80rpx;
							margin-bottom: 24rpx;
							margin-right: 0;
						}
					}
				}
			}
			
			.list {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				display: flex;
				flex-direction: column;
				margin-top: 160rpx;
				
				.list-item {
					width: 100%;
					height: 90rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					border-bottom: 1px solid #eee;
					
					image {
						width: 42rpx;
						height: 42rpx;
						margin-right: 24rpx;
					}
				}
			}
			
			.back {
				width: 80%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				font-weight: 600;
				border-radius: 4px;
				background: #06A5C4;
				margin: 40rpx auto 0;
			}
		}
	}
</style>
