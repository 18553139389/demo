<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">支付</block>
			</cu-custom>
		</view>
		<view class="lists">
			<view class="list">
				<view class="list-top">
					<view class="state">订单信息</view>
				</view>
				<view>
					<view class="msg">
						<view class="msg_title">商品名称：</view>
						<view style="width: 75%;">{{list.title}}</view>
					</view>
					<view class="msg">
						<view class="msg_title">商品价格：</view>
						<view style="color: #DE2910;margin-left: -6upx;" v-if="list.type == 1">￥{{list.oldPrice}}</view>
						<view style="color: #DE2910;margin-left: -6upx;" v-if="list.type == 2">￥{{list.price}}</view>
						<view style="color: #DE2910;margin-left: -6upx;" v-if="list.type == 3">￥0</view>
					</view>
					<view class="msg">
						<view class="msg_title">运送费：</view>
						<view style="color: #DE2910;margin-left: -6upx;">￥{{list.fee}}</view>
					</view>
				</view>
				<view class="msg">
					<view class="msg_title">纪念币：</view>
					<view v-if="list.type == 1">0</view>
					<view v-if="list.type == 2">{{list.point * values}}</view>
					<view v-if="list.type == 3">{{list.point * values}}</view>
				</view>
				<view class="msg">
					<view class="msg_title" style="padding-bottom: 20upx;">应付总额：</view>
					<view style="color: #DE2910;margin-left: -6upx;">￥{{total}}</view>
				</view>
			</view>
			<view class="list">
				<view class="list-top">
					<view class="state">用户信息</view>
				</view>
				<view class="user">
					<view>{{listData.username}}</view>
					<view>{{listData.phone}}</view>
				</view>
				<view class="address">
					<view>{{listData.city + listData.address}}</view>
				</view>
			</view>
			<view class="list" v-if="list.type == 1 || list.type == 2">
				<view class="list-top">
					<view class="state">支付方式</view>
				</view>
				<view class="pay" @tap="goSuc">
					<view class="wx">
						<img class="banner" src="../../static/img/wx.png" alt="">
						<view>微信支付</view>
					</view>
					<img class="banner" src="../../static/img/right1.png" alt="">
				</view>
			</view>
		</view>
		<view class="buy" @tap="goSuc" v-if="list.type == 3">立即支付</view>
		<van-popup v-model="sub" :close-on-click-overlay="false" style="background: none !important;">
			<van-loading type="spinner" />
		</van-popup>
		<best-payment-password :show="payFlag" :forget="true" :value="paymentPwd" digits="6" @forgetPwd="forgetPwd" @submit="checkPwd" @cancel="togglePayment"></best-payment-password>
	</view>
</template>

<script>
	var md5 = require('js-md5')
	import {ajax,ajaxs} from '../../common/js/util.js'
	import {Toast,Dialog} from 'vant'
	import bestPaymentPassword from '../../components/best-payment-password/best-payment-password.vue'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				list: {},
				listData: {},
				ids: '',
				total: 0,
				text: '',
				sub: false,
				values: 0,
				payFlag: false,
				paymentPwd: '',
				passType: null
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			console.log(this.list)
			this.ids = option.id
			this.total = option.total
			this.listData = this.$store.state.saveAddress
			this.text = option.text
			this.values = option.values
			this.init()
		},
		components: {
			bestPaymentPassword,
			Toast,
			Dialog
		},
		methods: {
			init() {
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/userInfo',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.passType = res.data.payPasswordState
						}
					}
				}
				ajaxs(data)
			},
			togglePayment() {
				this.payFlag = !this.payFlag
			},
			checkPwd(e) {
				let self = this
				this.paymentPwd = e
				let datas = {
					uid: this.$store.state.uid,
					productId: this.ids,
					receiverId: this.listData.id,
					qty: this.values,
					remarks: this.text,
					payPassword: md5.hex(this.paymentPwd)
				}

				let data = {
					url: '/api/gzh/saveProductOrder',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.togglePayment()
							setTimeout(function() {
								uni.navigateTo({
									url: '../shopSuc/shopSuc'
								})
							}, 300)
						} else if (res.data.result == 1){
							self.togglePayment()
							self.paymentPwd = ''
							Toast(res.data.resultNote)
						}
					}
				}
				ajaxs(data)
			},
			goSuc() {
				let self = this
				self.sub = true
				// if (this.list.type == 3) {
				// 	self.sub = false
				// 	if (self.passType == 0) {
				// 		Dialog.confirm({
				// 			title: '提示',
				// 			message: '你还没有设置新密码',
				// 			showConfirmButton: true,
				// 			showCancelButton: true,
				// 			confirmButtonText: "去设置",
				// 			confirmButtonColor: "#DE2910"
				// 		}).then(() => {
				// 			// on confirm
				// 			uni.navigateTo({
				// 				url: '/pages/setPass/setPass'
				// 			})
				// 		}).catch(() => {
				// 			// on cancel
				// 		});
				// 	} else {
				// 		self.togglePayment()
				// 	}
				// } else {
				// 	let datas = {
				// 		uid: this.$store.state.uid,
				// 		productId: this.ids,
				// 		receiverId: this.listData.id,
				// 		qty: this.values,
				// 		remarks: this.text
				// 	}
				// 	let data = {
				// 		url: '/api/gzh/saveProductOrder',
				// 		data: datas,
				// 		success: function(res) {
				// 			if (res.data.result == 0) {
				// 				let orderId = res.data.orderId
				// 				let appId = res.data.body.appId
				// 				let timeStamp = res.data.body.timeStamp
				// 				let nonceStr = res.data.body.nonceStr
				// 				let packages = res.data.body.prepay
				// 				let signType = res.data.body.signType
				// 				let paySign = res.data.body.paySign
				// 				self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign)
				// 			} else {
				// 				Toast(res.data.resultNote)
				// 				self.sub = false
				// 			}
				// 		}
				// 	}
				// 	ajaxs(data)
				// }
				
				let datas = {
					uid: this.$store.state.uid,
					productId: this.ids,
					receiverId: this.listData.id,
					qty: this.values,
					remarks: this.text
				}
				let data = {
					url: '/api/gzh/saveProductOrder',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							let orderId = res.data.orderId
							let appId = res.data.body.appId
							let timeStamp = res.data.body.timeStamp
							let nonceStr = res.data.body.nonceStr
							let packages = res.data.body.prepay
							let signType = res.data.body.signType
							let paySign = res.data.body.paySign
							self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign)
						} else {
							Toast(res.data.resultNote)
							self.sub = false
						}
					}
				}
				ajaxs(data)
			},
			onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign) {
				let self = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						'appId': appId,
						'timeStamp': timeStamp,
						'nonceStr': nonceStr,
						'package': packages,
						'signType': signType,
						'paySign': paySign
					},
					function(res) {
						if (res.err_msg === 'get_brand_wcpay_request:ok') {
							self.sub = false
							// Toast('支付成功')
							setTimeout(function() {
								uni.navigateTo({
									url: '../shopSuc/shopSuc'
								})
							}, 300)
						} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
							self.sub = false
							Toast('用户取消支付')
						} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
							self.sub = false
							Toast('网络异常，请重试')
						}
					}
				)
			},
			forgetPwd() {
				uni.navigateTo({
					url: '../setPass/setPass'
				})
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.lists {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		background: #fff;
		border-radius: 4px;
		box-shadow: 1px 0 4px #eee;
		margin-bottom: 30upx;
	}

	.list-top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx 30upx 0 0;
		box-sizing: border-box;
	}

	.state {
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
		font-size: 15px;
		font-weight: 600;
		margin-bottom: 20upx;
	}

	.msg {
		width: 100%;
		padding-left: 24upx;
		padding-top: 20upx;
		display: flex;
	}

	.user {
		width: 100%;
		height: 60upx;
		padding: 0 24upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.address {
		width: 100%;
		padding: 24upx;
		box-sizing: border-box;
	}

	.wx {
		display: flex;
		align-items: center;
	}

	.wx>img {
		width: 40upx;
		margin-right: 20upx;
	}

	.pay {
		width: 100%;
		height: 60upx;
		padding: 24upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.buy {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}

	.msg_title {
		width: 27%;
	}
</style>
