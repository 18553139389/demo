<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="bg-shadeTop" @goBack="goBack">
				<block slot="content">支付成功</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/result.png" mode="widthFix"></image>
			<view class="sure" @tap="goMy">查看订单</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			goMy() {
				uni.reLaunch({
					url: '/pages/order/order?type=1'
				})
			},
			goBack() {
				uni.reLaunch({
					url: '/pages/article/article'
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
		background: #fff;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			image {
				width: 260rpx;
				margin-top: 120rpx;
			}
			
			.sure {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #fe5f23;
				border-radius: 30px;
				margin-top: 60rpx;
				font-size: 28rpx;
				color: #fff;
			}
		}
	}
</style>
