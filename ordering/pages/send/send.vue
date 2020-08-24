<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/chenggong.png"></image>
			<view class="produce">您的请假申请老师已收到请耐心等待老师审批，审批结果将以消息通知您！</view>
			<view class="btn" @tap="goResult">我知道了</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333'
			}
		},
		onLoad() {
			
		},
		methods: {
			goResult() {
				uni.switchTab({
				    url: '/pages/index/index'
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
			font-size: 28rpx;
			color: #333;
			
			image {
				width: 120rpx;
				height: 120rpx;
				margin-top: 200rpx;
				margin-bottom: 50rpx;
			}
			
			.produce {
				width: 80%;
				margin: 0 auto;
				font-size: 26rpx;
				color: #666;
				text-align: center;
			}
			
			.btn {
				width: 200rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				border: 1px solid #eee;
				border-radius: 30px;
				font-size: 28rpx;
				color: #333;
				margin-top: 100rpx;
			}
		}
	}
</style>
