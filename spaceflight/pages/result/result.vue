<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">支付成功</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/result.png"></image>
			<view class="content" v-if="type == 'N'">恭喜您开通会员成功</view>
			<view class="content" v-if="type == 'Y'">恭喜您续费会员成功</view>
			<view class="sure" @tap="goMy">确定</view>
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
				backColor: '#fff',
				list: {},
				type: ''
			}
		},
		onLoad(option) {
			this.type = option.type
		},
		methods: {
			goMy() {
				uni.setStorageSync('vip', 1)
				uni.navigateBack({
				    delta: 2
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
				height: 260rpx;
				margin-top: 120rpx;
			}
			
			.content {
				font-size: 28rpx;
				color: #666;
				margin-top: 40rpx;
			}
			
			.sure {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #0c2a6a;
				border-radius: 30px;
				margin-top: 60rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
</style>
