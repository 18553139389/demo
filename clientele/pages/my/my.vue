<template>
	<view class="contain">
		<view class="bg">
			<view class="user">
				<view class="user-left">
					<image :src="userList.icon"></image>
					<view class="message">
						<view>{{userList.nickname}}</view>
						<view class="call">
							<image src="../../static/images/me.png"></image>
							<view>{{userList.phone}}</view>
						</view>
					</view>
				</view>
				<image src="../../static/images/right.png"></image>
			</view>
		</view>
		<view class="wrapper">
			<view class="nav">
				<view class="nav-item" @tap="goOrder(1)">
					<image src="../../static/images/nav1.png"></image>
					<view>待审核</view>
				</view>
				<view class="nav-item" @tap="goOrder(2)">
					<image src="../../static/images/nav2.png"></image>
					<view>处理中</view>
				</view>
				<view class="nav-item" @tap="goOrder(3)">
					<image src="../../static/images/nav3.png"></image>
					<view>已完成</view>
				</view>
			</view>
			<view class="service">
				<view class="my">我的服务</view>
				<view class="icons">
					<view class="icons-item" style="margin-right: 3.33%;" @tap="goPublic">
						<image src="../../static/images/icon1.png"></image>
						<view>我的发布</view>
					</view>
					<view class="icons-item" style="margin-right: 3.33%;" @tap="goInvite">
						<image src="../../static/images/icon2.png"></image>
						<view>我的邀请</view>
					</view>
					<view class="icons-item" @tap="goStore">
						<image src="../../static/images/icon3.png"></image>
						<view>我的收藏</view>
					</view>
					<view class="icons-item" style="margin-right: 3.33%;" @tap="goAsk">
						<image src="../../static/images/lianxiwom.png"></image>
						<view>联系客服</view>
					</view>
					<view class="icons-item" style="margin-right: 3.33%;" @tap="goQuestion">
						<image src="../../static/images/icon5.png"></image>
						<view>常见问题</view>
					</view>
					<view class="icons-item" style="margin-right: 3.33%;" @tap="goSuggest">
						<image src="../../static/images/icon6.png"></image>
						<view>投诉建议</view>
					</view>
				</view>
			</view>
			<view class="service" v-if="JSON.stringify(order) != '{}'">
				<view class="my" style="color: #00C800;border-bottom: none;">进行中的订单</view>
				<view class="order">
					<view class="order-left">
						<view class="order-name">{{order.certificatename}}</view>
						<view v-if="v.state == 0">当前阶段: 待审核</view>
						<view v-else-if="v.state == 8">当前阶段: 已完成</view>
						<view v-else-if="v.state == 9">当前阶段: 审核拒绝</view>
						<view v-else>当前阶段: 处理中</view>
					</view>
					<view class="order-look" @tap="goLook">点击查看</view>
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
				userList: {},
				order: {}
			}
		},
		onLoad() {
			if(!uni.getStorageSync('uid')) {
				uni.reLaunch({
				    url: '/pages/first/first'
				})
				return
			}
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'userinfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.userList = res.data.dataobject
								self.userList.phone = self.userList.phone.substr(0,3) + '****' + self.userList.phone.substr(7)
								self.order = res.data.dataobject1
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goQuestion() {
				uni.navigateTo({
				    url: '/pages/question/question'
				})
			},
			goSuggest() {
				uni.navigateTo({
				    url: '/pages/suggest/suggest'
				})
			},
			goPublic() {
				uni.navigateTo({
				    url: '/pages/myPublic/myPublic'
				})
			},
			goStore() {
				uni.navigateTo({
				    url: '/pages/store/store'
				})
			},
			goInvite() {
				uni.navigateTo({
				    url: '/pages/invite/invite?img='+this.userList.qrcode
				})
			},
			goAsk() {
				uni.navigateTo({
				    url: '/pages/ask/ask'
				})
			},
			goOrder(k) {
				this.$store.commit('changeOrderIndex', k)
				uni.switchTab({
				    url: '/pages/order/order'
				})
			},
			goLook() {
				uni.navigateTo({
				    url: '/pages/orderDetail/orderDetail?order=' + this.order.ordernum
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #F6F6F6;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.bg {
			width: 100%;
			height: 330rpx;
			background: #00C800;
			position: relative;
			
			.user {
				position: absolute;
				width: 92%;
				top: 160rpx;
				left: 4%;
				padding: 40rpx 28rpx 120rpx 28rpx;
				box-sizing: border-box;
				border-radius: 10px;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				image {
					width: 46rpx;
					height: 46rpx;
				}
				
				.user-left {
					display: flex;
					
					image {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
					}
					
					.message {
						padding-left: 28rpx;
						height: 110rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 28rpx;
						color: #333;
						
						.call {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: #666;
							
							image {
								width: 28rpx;
								height: 38rpx;
								margin-right: 16rpx;
							}
						}
					}
				}
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.nav {
				width: 100%;
				padding: 60rpx 56rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				background: #FFFFFF;
				
				.nav-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					
					image {
						width: 110rpx;
						height: 110rpx;
						margin-bottom: 28rpx;
					}
				}
			}
			
			.service {
				width: 92%;
				margin: 30rpx auto;
				padding: 0 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 12rpx;
				display: flex;
				flex-direction: column;
				
				.my {
					width: 100%;
					height: 90rpx;
					line-height: 90rpx;
					font-size: 30rpx;
					color: #333;
					font-weight: 600;
					border-bottom: 1px solid #eee;
				}
				
				.icons {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					margin-top: 40rpx;
					
					.icons-item {
						width: 30%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 28rpx;
						color: #666;
						margin-bottom: 40rpx;
						
						image {
							width: 60rpx;
							height: 60rpx;
							margin-bottom: 28rpx;
						}
					}
				}
				
				.order {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 28rpx;
					
					.order-left {
						display: flex;
						flex-direction: column;
						font-size: 26rpx;
						color: #666;
						
						.order-name {
							color: #333;
							margin-bottom: 20rpx;
						}
					}
					
					.order-look {
						padding: 12rpx 28rpx;
						border-radius: 4px;
						background: #FFBFC3;
						font-size: 28rpx;
						color: #fff;
					}
				}
			}
		}
	}
</style>
