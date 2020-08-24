<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">结果</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<img src="../../static/images/chengg.png" alt="">
			<view class="suc">订单已提交</view>
			<view class="look" @tap="goOrder">查看订单详情</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333'
			}
		},
		methods: {
			goOrder() {
				uni.navigateTo({
					url: '/pages/order/order?type=0'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 15px;
			color: #333;
			
			img {
				width: 160upx;
				margin-top: 200upx;
			}
			
			.suc {
				margin: 40upx 0;
			}
			
			.look {
				padding: 24upx 60upx;
				color: #FFFFFF;
				background: #FF6600;
				border-radius: 30px;
				margin-top: 80upx;
			}
		}
	}
</style>
