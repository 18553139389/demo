<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">结果</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<img src="../../static/images/chengg.png" alt="">
			<view style="font-size: 14px;color: #999;margin-top: 30upx;">已提交提现申请</view>
			<view class="suc">正在等待平台审核</view>
			<view class="look" @tap="goTeam">回到团队中心</view>
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
			goTeam() {
				uni.switchTab({
				    url: '/pages/team/team'
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
				margin: 20upx 0 0;
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
