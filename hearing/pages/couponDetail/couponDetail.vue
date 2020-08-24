<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">优惠券详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<view class="card">
					<image :src="list.cover"></image>
					<view class="price">￥<text>{{list.amount}}</text></view>
					<view class="icons">销量：{{list.sales}}</view>
				</view>
				<view class="time">有效期：{{list.start_date}}至{{list.end_date}}</view>
			</view>
			<view class="pay">
				<view class="pay_left">
					<image src="../../static/images/zhiifufangshi.png"></image>
					<view>购买价</view>
				</view>
				<view class="pay_right">{{list.price}}</view>
			</view>
			<view class="box">
				<view class="rule">使用规则</view>
				<u-parse :content="html" @navigate="navigate"></u-parse>
			</view>
			<view class="btns" @tap="goSubmit">立即购买</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uParse from "../../components/feng-parse/parse.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				id: '',
				list: {},
				html: ''
			}
		},
		components:{
			uParse
		},
		onLoad(option) {
			this.id = option.id
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'getCouponById',
					id: this.id
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
								self.html = res.data.content
								console.log(res)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goSubmit() {
				uni.navigateTo({
				    url: '/pages/submitOrder/submitOrder?shop=' + this.list.id
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
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.item {
				width: 100%;
				display: flex;
				flex-direction: column;
				background: #fff;
				margin-bottom: 20rpx;
				
				.card {
					width: 100%;
					display: flex;
					align-items: center;
					position: relative;
					overflow: hidden;
					
					image {
						width: 240rpx;
						height: 160rpx;
						margin-right: 80rpx;
					}
					
					.price {
						font-size: 28rpx;
						color: #06A5C4;
						
						text {
							font-size: 80rpx;
							color: #06A5C4;
						}
					}
					
					.icons {
						padding: 0 30rpx;
						background: #D0131F;
						font-size: 20rpx;
						color: #fff;
						position: absolute;
						top: 0;
						right: 0;
						-webkit-transform-origin:left bottom;
						-moz-transform-origin:left bottom;
						transform-origin:left bottom;
						-webkit-transform:translate(29.29%,-100%) rotate(45deg);
						-moz-transform:translate(29.29%,-100%) rotate(45deg);
						transform:translate(29.29%,-100%) rotate(45deg);
					}
				}
				
				.time {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					padding: 0 24rpx;
					font-size: 28rpx;
					color: #333;
				}
			}
			
			.pay {
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 4px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				margin-bottom: 20rpx;
				
				.pay_left {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #01819A;
					
					image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 24rpx;
					}
				}
				
				.pay_right {
					font-size: 28rpx;
					color: #333;
				}
			}
			
			.box {
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				background: #fff;
				
				.rule {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					border-bottom: 1px solid #eee;
					font-size: 28rpx;
					color: #333;
					margin-bottom: 24rpx;
				}
			}
			
			.btns {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 4px;
				text-align: center;
				font-size: 30rpx;
				font-weight: 600;
				color: #fff;
				margin-top: 40rpx;
				background: #06A5C4;
			}
		}
	}
</style>
