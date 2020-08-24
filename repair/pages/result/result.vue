<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">预约成功</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/success.png"></image>
			<view class="content">您已成功预约下单</view>
			<view class="btn" @tap="submit">查看订单</view>
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
				type: 0
			}
		},
		onLoad(option) {
			this.type = option.type
		},
		methods: {
			submit() {
				uni.navigateTo({
					 url: '/pages/order/order?type=' + this.type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
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
			padding: 0 28upx;
			box-sizing: border-box;
			
			image {
				width: 120rpx;
				height: 120rpx;
				margin-top: 120rpx;
			}
			
			.content {
				width: 100%;
				font-size: 30rpx;
				color: #666;
				margin: 60rpx 0;
				text-align: center;
			}
			
			.btn {
				width: 50%;
				margin: 60rpx auto 0;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 28rpx;
				color: #fff;
				background: #F15903;
				border-radius: 30px;
			}
		}
	}
</style>
