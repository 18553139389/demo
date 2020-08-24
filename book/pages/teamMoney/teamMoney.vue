<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">团队佣金</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="top">
				<img class="bg" src="../../static/images/tuanduiyongjin_bg.png" alt="">
				<view class="money">{{parseFloat(list.allmoney).toFixed(2)}}</view>
				<view class="all">累计佣金（元）</view>
			</view>
			<view class="lists">
				<view class="item">
					<view>可提现佣金</view>
					<view style="color: #666;">{{list.nowmoney}}元</view>
				</view>
				<view class="item">
					<view>已申请佣金</view>
					<view style="color: #666;">{{list.applymoney}}元</view>
				</view>
				<view class="item">
					<view>成功提现佣金</view>
					<view style="color: #666;">{{list.alreadymoney}}元</view>
				</view>
				<view class="notice">用户须知</view>
				<view class="text">卖家确认收到款项后，立即获得团队佣金</view>
				<view class="text">注意：可用佣金满1元后才能申请提现</view>
				<view class="submit" @tap="goNow">我要提现</view>
			</view>
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
				list: {}
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			this.list.allmoney = parseFloat(this.list.allmoney).toFixed(2)
			this.list.nowmoney = parseFloat(this.list.nowmoney).toFixed(2)
			this.list.applymoney = parseFloat(this.list.applymoney).toFixed(2)
			this.list.alreadymoney = parseFloat(this.list.alreadymoney).toFixed(2)
		},
		methods: {
			goNow() {
				uni.navigateTo({
				    url: '/pages/money/money?money=' + this.list.nowmoney
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
			
			.top {
				width: 100%;
				height: 300upx;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				
				.bg {
					width: 100%;
					height: 300upx;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 0;
				}
				
				.money {
					font-size: 28px;
					color: #FFFFFF;
					z-index: 10;
				}
				
				.all {
					padding: 8upx 16upx;
					background: #FDE8DA;
					font-size: 14px;
					z-index: 10;
					border-radius: 4px;
					color: #FF6600;
					margin-top: 16upx;
				}
			}
			
			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 40upx 24upx;
				box-sizing: border-box;
				font-size: 14px;
				color: #333;
				
				.item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
				}
				
				.notice {
					width: 100%;
					font-size: 14px;
					color: #666;
					margin-top: 80upx;
				}
				
				.text {
					width: 100%;
					font-size: 14px;
					color: #999;
					margin-top: 8upx;
				}
				
				.submit {
					width: 70%;
					height: 90upx;
					line-height: 90upx;
					text-align: center;
					font-size: 15px;
					color: #FFFFFF;
					border-radius: 40px;
					background: #FF6600;
					margin: 160upx auto 0;
				}
			}
		}
	}
</style>
