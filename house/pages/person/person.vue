<template>
	<view class="contain">
		<view class="top">
			<image :src="userInfo.icon"></image>
			<view class="user">{{userInfo.nickname}}</view>
		</view>
		<view class="banner">
			<image :src="userInfo.image"></image>
		</view>
		<view class="list">
			<view class="item" @tap="goPoint">
				<image src="../../static/images/score.png" mode="widthFix"></image>
				<view class="right">
					<view>我的积分</view>
					<image src="../../static/images/choice.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item" @tap="goPrize">
				<image src="../../static/images/jiang.png" mode="widthFix"></image>
				<view class="right">
					<view>我的抽奖</view>
					<image src="../../static/images/choice.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item" @tap="goCash">
				<image src="../../static/images/money.png" mode="widthFix"></image>
				<view class="right">
					<view>我的提现</view>
					<image src="../../static/images/choice.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item" @tap="goVip">
				<image src="../../static/images/point.png" mode="widthFix"></image>
				<view class="right">
					<view>会员权益</view>
					<image src="../../static/images/choice.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item" @tap="goOrder">
				<image src="../../static/images/order.png" mode="widthFix"></image>
				<view class="right" style="border-bottom: none;">
					<view>我的订单</view>
					<image src="../../static/images/choice.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad(option) {
			// uni.setStorageSync('uid', '4c332ae298454b5aba20e045f3b17e68')
			// uni.clearStorage()
			if(uni.getStorageSync('uid')) {
				console.log(uni.getStorageSync('uid'))
			} else {
				if(option.uid) {
					console.log(option.uid)
					uni.setStorageSync('uid', option.uid)
				} else {
					// this.$u.post('weixinlogin?type=3').then(res => {
					// 	console.log(res)
					// })
					window.location.href = 'http://integral.dazhoutian.net/integralwall/api/weixinlogin?type=3'
				}
			}
		},
		onShow() {
			// 获取个人信息
			this.$u.post('userinfo', {
				uid: uni.getStorageSync('uid')
			}).then(res => {
				console.log(res)
				if(res.result == 0) {
					this.userInfo = res.dataobject
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goPoint() {
				uni.navigateTo({
				    url: '/pages/point/point?score=' + this.userInfo.integrals
				})
			},
			goPrize() {
				uni.navigateTo({
				    url: '/pages/prize/prize'
				})
			},
			goCash() {
				uni.navigateTo({
				    url: '/pages/cash/cash'
				})
			},
			goVip() {
				uni.navigateTo({
				    url: '/pages/vip/vip'
				})
			},
			goOrder() {
				uni.navigateTo({
				    url: '/pages/order/order'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;
		
		.fixed {
			width: 100%;
		}
		
		.top {
			width: 100%;
			height: 160rpx;
			background: #fe5f23;
			display: flex;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			
			.user {
				font-size: 28rpx;
				color: #FFFFFF;
				margin-left: 28rpx;
			}
		}
		
		.banner {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			
			image {
				width: 696rpx;
				height: 300rpx;
				border-radius: 6px;
				box-shadow: 0 0 5px rgba(0,0,0,.2);
			}
		}
		
		.list {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			
			.item {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				
				image {
					width: 60rpx;
				}
				
				.right {
					padding-left: 24rpx;
					box-sizing: border-box;
					flex: 1;
					height: 90rpx;
					border-bottom: 1px solid #eee;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 30rpx;
					color: #333;
				}
			}
		}
	}
</style>
