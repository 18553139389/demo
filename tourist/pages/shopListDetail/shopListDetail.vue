<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :isIcon="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
				<block slot="right">
					<img class="icon" src="../../static/img/phone.png" alt="">
				</block>
			</cu-custom>
		</view>
		<view class="lists">
			<view class="list">
				<view class="list-top">
					<view class="state">收货信息</view>
				</view>
				<view class="location">
					<img class="icon" src="../../static/img/location1.png" alt="">
					<view class="location_right">
						<view class="user">
							<text style="margin-right: 30upx;">{{list.username}}</text>
							<text>{{list.phone}}</text>
						</view>
						<view>{{list.city + list.address}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lists">
			<view class="list">
				<view class="list-top">
					<view class="state">商品详情</view>
				</view>
				<view class="list_title">
					<view class="title_left">
						<img class="icon" src="../../static/img/fangzi.png" alt="">
						<view style="margin: 0 20upx;">{{list.title}}</view>
					</view>
					<view class="states" v-if="v.state == 0">待付款</view>
					<view class="states" v-if="v.state == 1">待发货</view>
					<view class="states" v-if="v.state == 2">待收货</view>
					<view class="states" v-if="v.state == 3">已完成</view>
				</view>
				<view class="list_content">
					<img class="c_img" src="../../static/img/list.jpg" alt="">
					<view class="c_content">
						<view>{{list.title}}</view>
						<view v-if="list.type == 1">积分:0</view>
						<view v-if="list.type == 2">积分:{{list.point}}</view>
						<view v-if="list.type == 3">积分:{{list.point}}</view>
						<view class="money">
							<view v-if="list.type == 1" style="color: #DE2910;font-size: 16px;">{{list.oldPrice}}</view>
							<view v-if="list.type == 2" style="color: #DE2910;font-size: 16px;">{{list.price}}</view>
							<view v-if="list.type == 3" style="color: #DE2910;font-size: 16px;">{{list.oldPrice}}</view>
							<view>x{{v.qty}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="order_list">
				<view class="order">
					<view>运费</view>
					<view>￥0.0元</view>
				</view>
				<view class="order">
					<view>订单总价</view>
					<view v-if="list.type == 1">{{list.oldPrice}}</view>
					<view v-if="list.type == 2">{{list.price}}</view>
					<view v-if="list.type == 3">{{list.oldPrice}}</view>
				</view>
				<view class="order">
					<view>消耗积分</view>
					<view v-if="list.type == 1">0</view>
					<view v-if="list.type == 2">{{list.point}}</view>
					<view v-if="list.type == 3">{{list.point}}</view>
				</view>
				<view class="order">
					<view>付款方式</view>
					<view>微信支付</view>
				</view>
				<view class="order">
					<view>订单状态</view>
					<view v-if="v.state == 0">待付款</view>
					<view v-if="v.state == 1">待发货</view>
					<view v-if="v.state == 2">待收货</view>
					<view v-if="v.state == 3">已完成</view>
				</view>
				<view class="order">
					<view>买家留言</view>
					<view>{{list.remarks}}</view>
				</view>
			</view>
		</view>
		<view class="lists" style="margin-bottom: 100upx;">
			<view class="list-top">
				<view class="state">商品详情</view>
			</view>
			<view class="message">
				<view class="msg_left">
					<img class="c_img" src="../../static/img/detail.png" alt="">
					<view style="margin-left: 20upx;">订单信息</view>
				</view>
				<view class="msg_left">
					<view class="btn" @tap="goLook">查看物流</view>
					<view class="btn" style="margin-left: 30upx;" @tap="goService">申请售后</view>
				</view>
			</view>
			<view class="order">
				<view>订单号</view>
				<view>{{ids}}</view>
			</view>
			<!-- <view class="order">
				<view>订单状态</view>
				<view>2018-05-09 18:00</view>
			</view> -->
			<view class="order">
				<view>付款时间</view>
				<view>{{list.payDate}}</view>
			</view>
			<view class="order">
				<view>快递单号</view>
				<view>{{list.expressNo}}</view>
			</view>
			<view class="order">
				<view>发货时间</view>
				<view>{{list.sendDate}}</view>
			</view>
			<view class="order">
				<view>确认收货</view>
				<view>{{list.finishDate}}</view>
			</view>
		</view>
		<view class="buy" @tap="goPay" v-if="list.type == 1">去支付</view>
		<view class="buy" @tap="goOrder" v-if="list.type == 3">确定收货</view>
		<van-popup v-model="sub" :close-on-click-overlay="false" style="background: none !important;">
			<van-loading type="spinner" />
		</van-popup>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../common/js/util.js'
	import {
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				list: {},
				ids: '',
				sub: false
			}
		},
		onLoad(option) {
			let self = this
			this.ids = option.id
			let datas = {
				uid: this.$store.state.uid,
				orderId: option.id
			}
			let data = {
				url: '/api/gzh/productOrderDetail',
				data: datas,
				success: function(res) {
					if (res.data.result == 0) {
						self.list = res.data
					}
				}
			}
			ajax(data)
		},
		methods: {
			goPay() {
				let self = this
				self.sub = true
				let datas = {
					orderId: this.ids
				}
				let data = {
					url: '/api/gzh/payProductOrder',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
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
			goOrder() {
				let self = this
				let datas = {
					orderId: this.ids
				}
				let data = {
					url: '/api/gzh/finishProductOrder',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							Toast('确认完成')
						}
					}
				}
				ajax(data)
			},
			goLook() {
				uni.navigateTo({
					url: '../logistics/logistics'
				})
			},
			goService() {
				uni.navigateTo({
					url: '../service/service?id=' + this.ids
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		/* height: 100%; */
		background: #FFF;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.icon {
		width: 40upx;
	}

	.lists {
		width: 100%;
		padding: 0 30upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
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

	.location {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 30upx;
	}

	.location_right {
		flex: 1;
		padding-left: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.user {
		display: flex;
		align-items: center;
		margin-bottom: 10upx;
	}

	.list_item {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 4px;
		box-shadow: 1px 1px 5px #eee;
		display: flex;
		flex-direction: column;
		margin-bottom: 30upx;
	}

	.list_title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #666;
		margin-top: 30upx;
	}

	.title_left {
		display: flex;
		align-items: center;
	}

	.icon {
		width: 40upx;
	}

	.list_content {
		width: 100%;
		display: flex;
		font-size: 14px;
		color: #666;
		margin-top: 50upx;
		padding-bottom: 40upx;
	}

	.c_img {
		width: 160upx;
		height: 160upx;
		border-radius: 4px;
	}

	.c_content {
		flex: 1;
		padding-left: 30upx;
		box-sizing: border-box;
		height: 160upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.money {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.order_list {
		width: 100%;
		padding-top: 40upx;
		border-top: 1px dashed #eee;
	}

	.order {
		width: 100%;
		height: 50upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.message {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding: 30upx 0;
		border-bottom: 1px dashed #eee;
		margin-bottom: 30upx;
	}

	.msg_left {
		display: flex;
		align-items: center;
	}

	.msg_left>img {
		width: 40upx;
		height: 40upx;
	}

	.btn {
		padding: 2px 20upx;
		background: #DE2910;
		border-radius: 4px;
		font-size: 12px;
		color: #fff;
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
</style>
