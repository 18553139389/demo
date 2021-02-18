<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="bg-shadeTop" @goBack="goBack">
				<block slot="content">我的抽奖</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item" @tap="goRecord">
				<view>参与记录</view>
				<image src="../../static/images/choice.png" mode="widthFix"></image>
			</view>
			<view class="item" @tap="getRecord">
				<view>中奖记录</view>
				<image src="../../static/images/choice.png" mode="widthFix"></image>
			</view>
			<view class="item" style="border-bottom: none;" @tap="goAddress">
				<view>收货地址</view>
				<image src="../../static/images/choice.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goRecord() {
				uni.navigateTo({
				    url: '/pages/prizeRecord/prizeRecord'
				})
			},
			getRecord() {
				uni.navigateTo({
				    url: '/pages/getPrize/getPrize'
				})
			},
			goAddress() {
				uni.navigateTo({
				    url: '/pages/personAddress/personAddress'
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
		
		.wrapper {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			
			.item {
				width: 100%;
				height: 90rpx;
				border-bottom: 1px solid #eee;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30rpx;
				color: #333;
				
				image {
					width: 60rpx;
				}
			}
		}
	}
</style>
