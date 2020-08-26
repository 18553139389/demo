<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">更换手机号</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image class="logo" src="../../static/images/logo.png"></image>
			<view>当前手机号</view>
			<view class="call">{{call}}</view>
			<view class="change" @tap="goNext">点击更换</view>
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
				call: ''
			}
		},
		onShow() {
			this.call = uni.getStorageSync('call')
		},
		methods: {
			goNext() {
				uni.navigateTo({
					url: '/pages/two/two'
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
		overflow: hidden;
		background: #FFFFFF;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 30upx;
			box-sizing: border-box;
			font-size: 28upx;
			color: #333;
			
			.logo {
				width: 200upx;
				height: 200upx;
				border-radius: 6px;
				margin-bottom: 30upx;
			}
			
			.call {
				color: #999;
				margin-top: 30upx;
			}
			
			.change {
				width: 80%;
				border: 1px solid #eee;
				border-radius: 4px;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 30upx;
				color: #999;
				margin-top: 80upx;
			}
		}
	}
</style>
