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
						<view>商品名称：</view>
						<view style="margin-left: 30upx;">{{list.title}}</view>
					</view>
					<view class="msg">
						<view>商品价格：</view>
						<view style="margin-left: 30upx;color: #DE2910;" v-if="list.type == 1">￥{{list.oldPrice}}</view>
						<view style="margin-left: 30upx;color: #DE2910;" v-if="list.type == 2">￥{{list.price}}</view>
						<view style="margin-left: 30upx;color: #DE2910;" v-if="list.type == 3">￥0</view>
					</view>
				</view>
				<view class="msg">
					<view>使用积分：</view>
					<view style="margin-left: 30upx;" v-if="list.type == 1">0</view>
					<view style="margin-left: 30upx;" v-if="list.type == 2">{{list.point}}</view>
					<view style="margin-left: 30upx;" v-if="list.type == 3">{{list.point}}</view>
				</view>
				<view class="msg">
					<view>应付总额：</view>
					<view style="margin-left: 30upx;color: #DE2910;">￥{{total}}</view>
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
			<view class="list">
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
		<van-popup v-model="sub" :close-on-click-overlay="false" style="background: none !important;">
			<van-loading type="spinner" />
		</van-popup>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import {Toast} from 'vant'
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
				sub: false
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			this.ids = option.id
			this.total = option.total
			this.listData = this.$store.state.saveAddress
			this.text = option.text
		},
		methods: {
			goSuc() {
				let self = this
				self.sub = true
				let datas = {
					uid: this.$store.state.uid,
					productId: this.ids,
					receiverId: this.listData.id,
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
				ajax(data)
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
		height: 60upx;
		padding-left: 24upx;
		display: flex;
		align-items: center;
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
</style>
