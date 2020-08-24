<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">选择支付</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image class="logo" src="../../static/images/logos.jpg" mode="scaleToFill"></image>
			<view class="item" @tap="goPay1">
				<img src="../../static/images/zhifubao1.png" alt="">
				<view>支付宝支付</view>
			</view>
			<view class="item" @tap="goPay2">
				<img src="../../static/images/wx.png" alt="">
				<view>微信支付</view>
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
				backColor: '#F8F9FB',
				ordernum: '',
				userid: '',
				price: 0,
				owner: ''
			}
		},
		onLoad(option) {
			this.ordernum = option.ordernum
			this.price = option.price
		},
		methods: {
			goPay1() {
				let add = Math.floor(Math.random()*8000+1000)
				if(!add) {
					Toast.showToast('拉取支付失败，请重试')
					return
				}
				if(!this.ordernum) {
					Toast.showToast('订单异常')
					return
				}
				let ordernum = this.ordernum + add
				let url = ''
				url = 'https://www.ytsh.vip/easyamoy/api/alipay?ordernum=' + ordernum + '&amount=' + this.price + '&subject=商品委托代卖'
				//  这句很重要
				if(url) {
					const form = document.createElement('form');
					form.action = url //此处form就是后台返回接收到的数据
					form.method = 'post' //此处form就是后台返回接收到的数据
					document.body.appendChild(form)
					document.forms[0].submit()
				}
			},
			goPay2() {
				if(!this.ordernum) {
					Toast.showToast('订单异常')
					return
				}
				let data1 = {
					cmd: 'wxPayOrder',
					money: this.price,
					ordernum: this.ordernum
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								window.location.href = res.data.body.mweburl
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
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
		background: #fff;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			height: 100vh;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.logo {
				width: 360upx;
				height: 138upx;
				margin: 160rpx 0;
			}
			
			.item {
				width: 50%;
				padding: 20upx 40upx;
				border: 1px solid #ddd;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30upx;
				color: #333;
				margin-bottom: 60upx;
				background: #fff;
				
				img {
					width: 50upx;
					height: 50upx;
					margin-right: 24upx;
				}
			}
		}
	}
</style>
