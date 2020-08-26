<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">支付开户费</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="price">￥{{amount}}</view>
			<view class="open">开户费</view>
			<div class="login" @tap="goPay">立即支付</div>
			<view class="contents">**类目需支付￥{{amount}}的开户费，当店铺交易额达到￥{{pay}}，可申请提现</view>
		</view>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				pay: 0,
				obj: {},
				amount: 0
			}
		},
		onLoad(option) {
			this.pay = option.money
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/addShopOrder',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.obj = res.data.body
								self.amount = res.data.amount
								// self.goPay()
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goPay() {
				let self = this
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: JSON.stringify(self.obj), //微信、支付宝订单数据
					success: function(res) {
						console.log('success:' + JSON.stringify(res))
						uni.navigateBack({
							delta: 1
						})
					},
					fail: function(err) {
						console.log(self.obj1)
						console.log('fail:' + JSON.stringify(err))
					},
					complete: function(err) {
						console.log('fail:' + JSON.stringify(err))
					}
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

			.price {
				font-size: 36upx;
				color: #333;
				margin-top: 160upx;
			}

			.open {
				font-size: 28upx;
				color: #999;
				margin-top: 30upx;
			}


			.login {
				width: 80%;
				height: 90upx;
				line-height: 90upx;
				border-radius: 40upx;
				background: #FF4848;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				margin-top: 120upx;
			}

			.contents {
				width: 96%;
				display: flex;
				align-items: center;
				font-size: 26upx;
				color: #999;
				margin-top: 60upx;
			}
		}
	}
</style>
