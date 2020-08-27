<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">充值</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="user">
				<view class="user-left">
					<image src="../../static/images/logo.png" v-if="head == ''"></image>
					<image :src="head" v-if="head"></image>
					<view class="user-box">
						<view style="font-weight: 600;font-family: PingFang-SC-Bold;" class="users">{{userInfo.username}}</view>
						<view>{{userInfo.classisName}}</view>
					</view>
				</view>
				<view class="user-right">
					<view>剩余<text style="color: #F91D37;">{{userInfo.qty}}</text>餐</view>
					<view style="padding: 4rpx 20rpx;border-radius: 30px;border: 1px solid #eee;" @tap="goOrder">我的账单</view>
				</view>
			</view>
			<view class="warn">
				<view>温馨提示</view>
				<view style="margin-top: 16rpx;">今日充值，第2天就可以正常使用了哦！</view>
			</view>
			<view class="titles">充值套餐</view>
			<view class="list">
				<view :class="navIndex == k ? 'active item' : 'item'" v-for="(v,k) in priceList" :key="k" @tap="changeNav(k,v.price,v.optionId)">
					<view style="margin-bottom: 20rpx;">{{v.days}}餐</view>
					<view>（{{v.price}}元）</view>
				</view>
			</view>
			<view class="add" @tap="goOpen">充值</view>
		</view>
		<view class="bg" v-if="show">
			<view class="bg-list">
				<view class="bg-title">
					<view class="bg-name">
						<text>温馨提示</text>
						<view class="close" @tap="goClose">X</view>
					</view>
				</view>
				<view class="bg-warn">你确定要充值套餐吗？</view>
				<view class="bg-content">在套餐期间内，如遇请假套餐天数将按照请假时间顺延</view>
				<view class="btn" @tap="goSure">确认支付</view>
			</view>
		</view>
		<view class="bg" v-if="show1">
			<view class="bg-list">
				<view class="bg-title">
					<view class="bg-name">
						<text>充值会员</text>
						<view class="close" @tap="goClose1">X</view>
					</view>
				</view>
				<view class="bg-warn" style="margin-bottom: 10rpx;">￥{{price}}</view>
				<view class="bg-content">套餐</view>
				<view class="free">
					<view>手续费</view>
					<view>{{free * 100}}%</view>
				</view>
				<view class="btn" @tap="goPay">需支付{{total}}</view>
			</view>
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
				navIndex: 0,
				show: false,
				show1: false,
				userInfo: {},
				free: '',
				price: 0,
				total: 0,
				priceList: [],
				optionId: '',
				head: ''
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					studentId: uni.getStorageSync('studentId')
				}
				let data = {
					url: '/studentInfo',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.userInfo = res.data
							self.head = self.userInfo.icon
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
				
				// 获取套餐列表
				let data2 = {
					studentId: uni.getStorageSync('studentId')
				}
				let data3 = {
					url: '/rechargeOptionList',
					data: data2,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.free = res.data.fee
							self.price = res.data.dataList[0].price
							self.optionId = res.data.dataList[0].optionId
							self.total = parseFloat(parseInt(self.price) + parseFloat(self.price * self.free)).toFixed(2)
							self.priceList = res.data.dataList
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data3)
			},
			changeNav(k,price,id) {
				this.navIndex = k
				this.optionId = id
				this.price = price
				this.total = parseFloat(parseInt(this.price) + parseFloat(this.price * this.free)).toFixed(2)
			},
			goClose() {
				this.show = false
			},
			goClose1() {
				this.show1 = false
			},
			goOpen() {
				this.show = true
			},
			goSure() {
				this.show = false
				this.show1 = true
			},
			goPay() {
				let self = this
				let data1 = {
					studentId: uni.getStorageSync('studentId'),
					optionId: this.optionId
				}
				let data = {
					url: '/addRechargeOrder',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.body.timeStamp,
								nonceStr: res.data.body.nonceStr,
								package: res.data.body.package,
								signType: res.data.body.signType,
								paySign: res.data.body.paySign,
								success(res) {
									self.show1 = false
									uni.navigateTo({
									    url: '/pages/success/success'
									})
								},
								fail(err) {
									Toast.showToast('支付失败')
								}
							})
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			goOrder() {
				uni.navigateTo({
				    url: '/pages/orderList/orderList'
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
		
		.bg {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.4);
			z-index: 999999999;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.bg-list {
				width: 80%;
				padding: 28rpx 0;
				box-sizing: border-box;
				border-radius: 6px;
				background: #FFFFFF;
				
				.bg-title {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					
					.bg-name {
						width: 100%;
						text-align: center;
						position: relative;
						
						.close {
							position: absolute;
							top: 6rpx;
							right: 28rpx;
							font-size: 30rpx;
							color: #333;
						}
					}
				}
				
				.bg-warn {
					width: 100%;
					font-size: 28rpx;
					color: #333;
					margin: 28rpx 0;
					text-align: center;
					font-weight: 600;
				}
				
				.bg-content {
					width: 80%;
					margin: 0 auto;
					font-size: 28rpx;
					color: #999;
					text-align: center;
				}
				
				.free {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					padding: 28rpx;
					box-sizing: border-box;
				}
				
				.btn {
					width: 220rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 28rpx;
					color: #fff;
					border-radius: 30px;
					background: #F91D37;
					margin: 30rpx auto;
				}
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;
			
			.user {
				width: 100%;
				border-radius: 4px;
				box-shadow: 0 1px 4px rgba(0,0,0,.2);
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				
				.user-left {
					width: 50%;
					display: flex;
					border-right: 1px solid #eee;
					
					image {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
					}
					
					.user-box {
						height: 110rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						font-size: 26rpx;
						color: #333;
						margin-left: 24rpx;
						
						.users {
							font-size: 28rpx;
							font-weight: 600;
						}
					}
				}
				
				.user-right {
					width: 50%;
					height: 110rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 26rpx;
					color: #333;
					justify-content: space-around;
				}
			}
			
			.warn {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 4px;
				background: #F0F0F0;
				margin: 30rpx 0;
				font-size: 26rpx;
				color: #FF7133;
			}
			
			.titles {
				font-size: 28rpx;
				color: #333;
			}
			
			.list {
				width: 100%;
				margin-top: 30rpx;
				
				.item {
					float: left;
					width: 30%;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-radius: 4px;
					padding: 30rpx 0;
					border: 1px solid #eee;
					margin-right: 3.33%;
					margin-bottom: 3.33%;
					
					&.active {
						background: #F91D37 !important;
						color: #FFFFFF !important;
					}
				}
			}
			
			.add {
				width: 40%;
				height: 70rpx;
				line-height: 70rpx;
				background: #F91D37;
				border-radius: 30px;
				font-size: 30rpx;
				color: #FFFFFF;
				margin: 80rpx auto 0;
				text-align: center;
			}
		}
	}
</style>
