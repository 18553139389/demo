<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :isIcons="true" bgColor="bg-shadeTop text-white" @goRight="goRight" @Back="Back">
				<block slot="backText"></block>
				<block slot="content">我的</block>
				<block slot="right">
					<image src="../../static/images/set.png"></image>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="top">
				<image :src="lists.userIcon ? lists.userIcon : '../../static/images/heads.png'"></image>
				<view class="user">
					<view class="name">{{lists.nickName}}</view>
					<view class="vip">普通用户</view>
				</view>
			</view>
			<view class="order">
				<view class="titles">我的订单</view>
				<view class="list">
					<view class="list-item" v-for="(v,k) in list" :key="k" :style="{marginRight:(k+1)%4 == 0 ? '0' : '2%'}" @tap="goOrder(k)">
						<image :src="v.url"></image>
						<view>{{v.name}}</view>
					</view>
				</view>
			</view>
			<view class="all">
				<view class="all-list" @tap="goLink">
					<view class="all-left">
						<image src="../../static/images/all1.png"></image>
						<view>联系我们</view>
					</view>
					<image class="icon" src="../../static/images/rights.png" mode=""></image>
				</view>
				<view class="all-list" @tap="goEnter">
					<view class="all-left">
						<image src="../../static/images/all2.png"></image>
						<view>入驻</view>
					</view>
					<image class="icon" src="../../static/images/rights.png" mode=""></image>
				</view>
				<view class="all-list" @tap="goAbout">
					<view class="all-left">
						<image src="../../static/images/all3.png"></image>
						<view>关于我们</view>
					</view>
					<image class="icon" src="../../static/images/rights.png" mode=""></image>
				</view>
				<view class="all-list" style="border-bottom: none;" @tap="goQuestion">
					<view class="all-left">
						<image src="../../static/images/all4.png"></image>
						<view>意见反馈</view>
					</view>
					<image class="icon" src="../../static/images/rights.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				list: [{
					name: '维修订单',
					url: '../../static/images/order1.png'
				},{
					name: '回收订单',
					url: '../../static/images/order2.png'
				},{
					name: '安装订单',
					url: '../../static/images/order3.png'
				},{
					name: '家装订单',
					url: '../../static/images/order2.png'
				},{
					name: '清洗订单',
					url: '../../static/images/order4.png'
				},{
					name: '其他',
					url: '../../static/images/order5.png'
				}],
				lists: {}
			}
		},
		onShow() {
			if(!uni.getStorageSync('uid')) {
				uni.navigateTo({
				    url: '/pages/login/login'
				})
				return
			}
			this.init()
		},
		methods: {
			Back() {
				uni.redirectTo({
				    url: '/pages/index/index'
				})
			},
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/memberInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.lists = res.data
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goLink() {
				uni.navigateTo({
				    url: '/pages/link/link'
				})
			},
			goEnter() {
				uni.navigateTo({
				    url: '/pages/enter/enter'
				})
			},
			goRight() {
				uni.navigateTo({
				    url: '/pages/set/set'
				})
			},
			goOrder(k) {
				uni.navigateTo({
				    url: '/pages/order/order?type=' + (k+1)
				})
			},
			goAbout() {
				uni.navigateTo({
				    url: '/pages/agree/agree?type=0'
				})
			},
			goQuestion() {
				uni.navigateTo({
				    url: '/pages/question/question'
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
		background: #f5f5f5;

		.fixed {
			width: 100%;
			
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.top {
				width: 100%;
				display: flex;
				padding: 20rpx 28rpx 40rpx;
				box-sizing: border-box;
				background: #fff;
				
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
				
				.user {
					height: 100rpx;
					padding-left: 30rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.name {
						font-size: 30rpx;
						color: #333;
					}
					
					.vip {
						width: 140rpx;
						height: 46rpx;
						line-height: 46rpx;
						text-align: center;
						font-size: 24rpx;
						color: #fff;
						background: url(../../static/images/bg.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}
			
			.order {
				width: 92%;
				margin: 28rpx auto;
				padding: 0 24rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				
				.titles {
					width: 100%;
					height: 90rpx;
					line-height: 90rpx;
					font-size: 30rpx;
					color: #333;
					border-bottom: 1px solid #eee;
				}
				
				.list {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					padding: 24rpx 0;
					
					.list-item {
						width: 23.5%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 28rpx;
						color: #666;
						margin-right: 2%;
						margin-bottom: 30rpx;
						
						image {
							width: 60rpx;
							height: 60rpx;
							margin-bottom: 10rpx;
						}
					}
				}
			}
			
			.all {
				width: 92%;
				margin: 0 auto;
				padding: 0 24rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				
				.all-list {
					width: 100%;
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					.all-left {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #333;
						
						image {
							width: 50rpx;
							height: 50rpx;
							margin-right: 24rpx;
						}
					}
					
					.icon {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
	}
</style>
