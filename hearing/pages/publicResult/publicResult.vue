<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :Color="Color" :backColor="backColor" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">发布成功</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/yuyuechenggong.png"></image>
			<view class="text">您已发布成功</view>
			<view class="wait">请耐心等待后台管理员审核</view>
			<view class="detail" @tap="goSure">确定</view>
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
				call: ''
			}
		},
		onLoad() {

		},
		methods: {
			goSure() {
				uni.switchTab({
					url: '/pages/hear/hear'
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
				margin: 80rpx 0 24rpx;
			}
			
			.wait {
				font-size: 24rpx;
				color: #999;
				margin-bottom: 80rpx;
			}
			
			.detail {
				width: 30%;
				padding: 12rpx 30rpx;
				border: 1px solid #06A5C4;
				border-radius: 4px;
				font-size: 28rpx;
				color: #06A5C4;
				text-align: center;
			}
		}
	}
</style>
