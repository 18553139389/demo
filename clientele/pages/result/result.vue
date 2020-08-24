<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">提交成功</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/result.png"></image>
			<view style="margin: 50rpx 0 28rpx;">提交成功</view>
			<view style="color: #666;font-size: 26rpx;">请耐心等待工作人员与您联系</view>
			<view class="btn" @tap="goSure">确定</view>
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
			goSure() {
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
			font-size: 30rpx;
			color: #333;
			
			image {
				width: 356rpx;
				height: 305rpx;
				margin-top: 160rpx;
			}
			
			.btn {
				width: 80%;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 30px;
				background: #E6FFE6;
				text-align: center;
				font-size: 30rpx;
				color: #00C800;
				margin-top: 160rpx;
			}
		}
	}
</style>
