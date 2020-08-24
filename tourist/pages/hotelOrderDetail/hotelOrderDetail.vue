<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
			</cu-custom>
		</view>
		<view class="orderMsg" style="margin-top: 30upx;">
			<view class="orderHead">
				<view class="title-left">订单信息</view>
			</view>
			<view class="orderList">
				<view class="list">
					<text>订单状态：</text>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 2">待付款</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 3">已付款</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 4">已入住</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 5">已取消</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 6">取消中</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 7">已退款</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 8">已离店</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 13">待确认</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 14">已确认</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 20">待入住</view>
					<view class="content" style="color: #DE2910;" v-if="list.orderStatus == 23">未入住</view>
				</view>
				<view class="list">
					<text>订单编号：</text>
					<view class="content">{{id}}</view>
				</view>
				<view class="list">
					<text>预定日期：</text>
					<view class="content">{{list.orderDate}}</view>
				</view>
				<view class="list">
					<text>订单金额：</text>
					<view class="content" style="color: #DE2910;">￥{{list.orderAmount}}</view>
				</view>
				<view class="list">
					<text>支付方式：</text>
					<view class="content" v-if="list.roomType == 0">酒店现付</view>
					<view class="content" v-if="list.roomType == 1">酒店预付</view>
				</view>
				<view class="list">
					<text>担保情况：</text>
					<view class="content" v-if="list.isGuarantee == 0">无需担保</view>
					<view class="content" v-if="list.isGuarantee == 1">需担保</view>
				</view>
			</view>
		</view>
		<view class="orderMsg" style="margin-top: 30upx;">
			<view class="orderHead">
				<view class="title-left">酒店信息</view>
			</view>
			<view class="orderList">
				<view class="item" style="padding-top: 0;">
					<view>{{list.hotelName}}</view>
				</view>
				<view class="item">
					<view>{{list.roomName}}</view>
					<view>{{list.roomCount}}间</view>
				</view>
				<view class="item">
					<view>入住时间</view>
					<view>{{list.inDate}}</view>
				</view>
				<view class="item">
					<view>离店时间</view>
					<view>{{list.outDate}}</view>
				</view>
				<view class="item" style="padding-bottom: 0;border-bottom: none;">
					<view>最晚到店时间</view>
					<view>18:00</view>
				</view>
			</view>
		</view>
		<view class="orderMsg" style="margin: 30upx auto;">
			<view class="orderHead">
				<view class="title-left">入住信息</view>
			</view>
			<view class="orderList">
				<view class="item">
					<view>入住人</view>
					<view>{{list.passengers}}</view>
				</view>
				<view class="item" style="padding-bottom: 0;border-bottom: none;">
					<view>联系人手机号</view>
					<view>{{list.contactMobile}}</view>
				</view>
			</view>
		</view>
		<view class="open" @tap="goPay" v-if="list.orderStatus == 2 && list.roomType == 1">去付款</view>
		<view class="back" @tap="cancelOrder" v-if="list.orderStatus == 2">取消订单</view>
		<van-dialog v-model="show1" title="备注" show-cancel-button @confirm="confirm1">
			<view class="beizhu">
				<textarea placeholder="退票原因" v-model="val1"></textarea>
			</view>
		</van-dialog>
	</view>
</template>

<script>
	import {
		ajaxs
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
				id: '',
				list: {},
				show1: false,
				val1: ''
			}
		},
		components: {
			Toast
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.id = option.id
			this.init()
		},
		methods: {
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			init() {
				let self = this
				let datas = {
					uid: self.$store.state.uid,
					orderId: self.id
				}
				let data = {
					url: '/api/gzh/hotelOrderDetail',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data
						}
					}
				}
				ajaxs(data)
			},
			goPay() {
				let self = this
				let datas = {
					orderId: this.id
				}
				let data = {
					url: '/api/gzh/payHotelOrder',
					data: datas,
					success: function(res) {
						console.log(res)
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
						}
					}
				}
				ajaxs(data)
			},
			onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign) {
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
							Toast('支付成功')
							uni.navigateBack({
								delta: 1
							})
						} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
							Toast('用户取消支付')
						} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
							Toast('网络异常，请重试')
						}
					}
				)
			},
			cancelOrder() {
				this.show1 = true
			},
			confirm1() {
				if (this.val1 == '') {
					Toast('备注不能为空')
					return
				}

				let self = this
				let datas = {
					uid: this.$store.state.uid,
					OrderID: this.id,
					CancelReason: this.val1
				}
				let data = {
					url: '/api/gzh/hotelCancelOrder',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							self.show1 = false
							Toast('取消成功')
							uni.navigateBack({
								delta: 1
							})
						} else {
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.orderMsg {
		width: 92%;
		padding: 30upx 0 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 4px;
		margin: 30upx auto 0;
	}

	.orderHead {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title-left {
		padding-left: 20upx;
		box-sizing: border-box;
		border-left: 4px solid red;
		font-size: 14px;
		color: #333;
	}

	.title-right {
		font-size: 14px;
		color: #DE2910;
		padding-right: 20upx;
	}

	.title {
		width: 100%;
		padding-left: 20upx;
		box-sizing: border-box;
		border-left: 4px solid red;
		font-size: 14px;
		color: #333;
	}

	.orderList {
		width: 100%;
		padding: 28upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24upx;
		font-size: 14px;
		color: #333;
	}

	.content {
		width: 70%;
		text-align: justify;
	}

	.item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
		padding: 20upx 0;
	}

	.open {
		width: 70%;
		margin: 0 auto 40upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		background: #DE2910;
		border-radius: 4px;
		font-size: 15px;
		color: #fff;
	}

	.back {
		width: 70%;
		margin: 0 auto 40upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		background: #eee;
		border-radius: 4px;
		font-size: 15px;
		color: #A5A5A5;
	}
</style>
