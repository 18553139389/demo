<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">缴纳保证金</block>
			</cu-custom>
		</view>
		<view class="sure">
			<view class="titles">您需要缴纳保证金才可以登录接单，请先缴纳保证金</view>
			<view class="money"><span style="font-size: 28upx;">￥</span>{{price}}</view>
			<view class="login" @tap="goPay">微信支付</view>
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
				price: 0
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/deposit/get',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.price = res.data.body.deposit
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goPay() {
				let data1 = {
					mid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/deposit/pay',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								uni.requestPayment({
								    provider: 'wxpay',
								    timeStamp: res.data.body.timeStamp,
								    nonceStr: res.data.body.nonceStr,
								    package: res.data.body.package,
								    signType: res.data.body.signType,
								    paySign: res.data.body.paySign,
								    success: function (res) {
								        uni.switchTab({
								            url: '/pages/index/index'
								        })
								    },
								    fail: function (err) {
								        Toast.showToast('支付失败')
								    }
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
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
		
		.sure {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 30upx;
			
			.titles {
				width: 70%;
				font-size: 26upx;
				color: #666;
				text-align: center;
			}
			
			.money {
				margin: 60upx 0;
				font-size: 60upx;
				color: #333;
			}
			
			.login {
				width: 70%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 30px;
				font-size: 28upx;
				color: #FFFFFF;
				background: #006EE3;
			}
		}
	}
</style>
