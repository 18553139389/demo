<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">提交成功</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<img src="../../static/images/chenggong@2x.png" alt="">
			<view class="submit">提交订单成功</view>
			<view class="submit" style="font-size: 30upx;">货款将在收到货品后打款</view>
			<view class="sure" @tap="goResult">确定</view>
			<view class="mark">返款规则</view>
			<view class="content">{{content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333',
				content: ''
			}
		},
		onLoad(option) {
			this.content = option.content
		},
		methods: {
			goResult() {
				uni.switchTab({
				    url: '/pages/order/order'
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
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			img {
				width: 240upx;
				height: 240upx;
				margin-top: 60upx;
			}
			
			.submit {
				width: 100%;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				font-size: 32upx;
				color: #111111;
			}
			
			.sure {
				width: 80%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 30upx;
				color: #FFFFFF;
				margin: 60upx auto;
				border-radius: 30px;
				background: #111111;
			}
			
			.mark {
				width: 100%;
				height: 60upx;
				line-height: 60upx;
				font-size: 32upx;
				color: red;
			}
			
			.content {
				width: 100%;
				font-size: 30upx;
				color: #111111;
			}
		}
	}
</style>
