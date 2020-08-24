<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :Color="Color" :backColor="backColor" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/yuyuechenggong.png"></image>
			<view class="text">{{title}}</view>
			<view class="detail" @tap="goDetail">查看订单详情</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#ffffff',
				user: '',
				call: '',
				title: '支付成功'
			}
		},
		onLoad(option) {
			if(option.type == 0) {
				this.title = '预约成功'
			}
		},
		methods: {
			goDetail() {
				uni.redirectTo({
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
			align-items: center;
			
			image {
				width: 361rpx;
				height: 307rpx;
				margin-top: 80rpx;
			}
			
			.text {
				font-size: 28rpx;
				color: #333;
				margin: 80rpx 0;
			}
			
			.detail {
				padding: 12rpx 30rpx;
				border: 1px solid #06A5C4;
				border-radius: 4px;
				font-size: 28rpx;
				color: #06A5C4;
			}
		}
	}
</style>
