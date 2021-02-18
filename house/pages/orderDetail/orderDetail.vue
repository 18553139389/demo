<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">订单详情</block>
			</cu-custom>
		</view>
		<view class="top">
			<view>订单：{{obj.ordernum}}</view>
			<view style="margin-top: 28rpx;">日期：{{obj.paytime}}</view>
		</view>
		<view class="address">
			<image src="../../static/images/icon.png" mode="widthFix"></image>
			<view class="message">
				<view class="user">
					<view>{{obj.name}}</view>
					<view style="margin-left: 30rpx;color: #999;">{{obj.phone}}</view>
				</view>
				<view class="detail">{{obj.address}}</view>
			</view>
		</view>
		<view class="product">
			<image :src="obj.goodsimage"></image>
			<view class="produce">
				<view class="produce-top">{{obj.goodsname}}</view>
				<view class="price">￥{{obj.goodsprice}}</view>
			</view>
		</view>
		<view class="order">
			<view class="title">付款明细</view>
			<view class="list">
				<view>订单总额：</view>
				<view>￥{{obj.goodsprice}}</view>
			</view>
			<view class="list">
				<view>订单状态：</view>
				<view v-if="obj.state == 1">待发货</view>
				<view v-if="obj.state == 2">已发货</view>
			</view>
			<view class="list" v-if="obj.state == 2">
				<view>快递：</view>
				<view>{{obj.logisticsname}}</view>
			</view>
			<view class="list" v-if="obj.state == 2">
				<view>快递号：</view>
				<view>{{obj.logisticsnum}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Bg: '#ffffff',
				obj: {}
			}
		},
		onLoad(option) {
			// 获取订单详情
			this.$u.post('getmygoodsorderdetail', {
				ordernum: option.order
			}).then(res => {
				console.log(res)
				if(res.result == 0) {
					this.obj = res.dataobject
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;
		
		.fixed {
			width: 100%;
		}
		
		.top {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			background: #fe5f23;
			font-size: 30rpx;
			color: #FFFFFF;
		}
		
		.address {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			margin: 30rpx 0;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			
			image {
				width: 60rpx;
			}
			
			.message {
				width: 90%;
				padding-left: 28rpx;
				box-sizing: border-box;
				
				.user {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					color: #333;
				}
				
				.detail {
					width: 100%;
					font-size: 28rpx;
					color: #333;
					margin-top: 20rpx;
					line-height: 18px;
				}
			}
		}
		
		.product {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			display: flex;
			margin-bottom: 30rpx;
			
			image {
				width: 140rpx;
				height: 140rpx;
				border-radius: 6px;
			}
			
			.produce {
				width: 75%;
				height: 140rpx;
				display: flex;
				flex-direction: column;
				padding-left: 24rpx;
				box-sizing: border-box;
				justify-content: space-between;
				
				.produce-top {
					width: 100%;
					font-size: 28rpx;
					color: #333;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				
				.price {
					font-size: 30rpx;
					color: red;
					font-weight: 600;
				}
			}
		}
		
		.order {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			
			.title {
				width: 100%;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 30rpx;
				color: #333;
				font-weight: 600;
				padding-left: 24rpx;
				box-sizing: border-box;
				position: relative;
				margin-bottom: 20rpx;
			}
			
			.title:before {
				content: '';
				position: absolute;
				width: 2px;
				height: 24rpx;
				background: #fe5f23;
				border-radius: 24px;
				top: 12rpx;
				left: 0;
			}
			
			.list {
				width: 100%;
				height: 70rpx;
				padding-left: 24rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #999;
			}
		}
	}
</style>
