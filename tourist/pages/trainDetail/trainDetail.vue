<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
			</cu-custom>
		</view>
		<view class="lists">
			<view class="list">
				<view class="list-top">
					<view class="state" v-if="list.state == 1">新订单</view>
					<view class="state" v-if="list.state == 2">已付款</view>
					<view class="state" v-if="list.state == 3">已出票</view>
					<view class="state" v-if="list.state == 4">已取消</view>
					<view class="state" v-if="list.state == 5">已确认</view>
					<view class="state" v-if="list.state == 6">退票</view>
					<view class="state" v-if="list.state == 8">已退款</view>
					<view class="state" v-if="list.state == 9">退款中</view>
					<view class="state" v-if="list.state == 10">不能出票_退款中</view>
					<view class="state" v-if="list.state == 11">不能出票_已退款</view>
					<view class="state" v-if="list.state == 12">后续支付</view>
					<view class="state" v-if="list.state == 13">不能出票</view>
					<view class="state" v-if="list.state == 14">出票中</view>
					<view class="price">￥{{list.amount}}</view>
				</view>
				<view class="order">订单号：{{orderId}}</view>
				<view class="btns">
					<view class="pay" v-if="list.state == 1" @tap="goPay">去付款</view>
					<view class="cancel" v-if="list.state == 1" @tap="goCancel">取消订单</view>
				</view>
			</view>
			<view class="list">
				<view class="list-top">
					<view class="state">车次信息</view>
				</view>
				<view class="wrapper">
					<view class="clock">
						<view class="start">
							<view class="time">{{list.startTime}}</view>
							<view>{{list.startCity}}</view>
						</view>
						<view class="start">
							<view style="font-size: 12px;">{{list.trainNo}}</view>
							<img src="../../static/img/list.png" alt="">
							<view style="font-size: 12px;">约2小时20分</view>
						</view>
						<view class="start">
							<view class="time">{{list.endTime}}</view>
							<view>{{list.endCity}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" style="padding-bottom: 20upx;">
				<view class="list-top">
					<view class="state">乘客信息</view>
				</view>
				<view v-for="(v,k) in persons" :key="k">
					<view class="msg">
						<view style="width: 120upx;">乘客</view>
						<view style="margin-left: 30upx;">{{v.psgName}}</view>
					</view>
					<view class="msg">
						<view style="width: 120upx;">{{v.cardType}}</view>
						<view style="margin-left: 30upx;">{{v.cardNo}}</view>
					</view>
				</view>
				<view class="msg">
					<view style="width: 120upx;">联系人</view>
					<view style="margin-left: 30upx;">{{list.contactName}}</view>
				</view>
				<view class="msg">
					<view style="width: 120upx;">联系电话</view>
					<view style="margin-left: 30upx;">{{list.contactPhone}}</view>
				</view>
			</view>
			<view class="list" style="padding-bottom: 20upx;">
				<view class="list-top">
					<view class="state">订单信息</view>
				</view>
				<!-- <view class="msg">
					<view>订单编号</view>
					<view style="margin-left: 30upx;">12354689</view>
				</view> -->
				<!-- <view class="msg">
					<view>付款时间</view>
					<view style="margin-left: 30upx;">2019-05-28 15:20:56</view>
				</view> -->
				<view class="msg">
					<view>出行时间</view>
					<view style="margin-left: 30upx;">{{list.startDate}}</view>
				</view>
				<!-- <view class="msg">
					<view>退款时间</view>
					<view style="margin-left: 30upx;">2019-05-28 15:20:56</view>
				</view> -->
			</view>
		</view>
		<view class="back" v-if="list.state == 3" @tap="backMoney">我要退票</view>
		<!-- <view class="open">开发票</view> -->
		<!-- <view class="open" v-if="list.state == 4 || list.state == 5 || list.state == 8">删除订单</view> -->
		<van-dialog v-model="show" title="备注" show-cancel-button @confirm="confirm">
			<view class="beizhu">
				<textarea placeholder="取消原因" v-model="val"></textarea>
			</view>
		</van-dialog>
		<van-dialog v-model="show1" title="备注" show-cancel-button @confirm="confirm1">
			<view class="beizhu">
				<textarea placeholder="退票原因" v-model="val1"></textarea>
			</view>
		</van-dialog>
	</view>
</template>

<script>
	import {
		Toast,
		Dialog
	} from 'vant'
	import {
		ajax
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				list: [],
				orderId: '',
				airList: [],
				persons: [],
				startDate: '',
				show: false,
				val: '',
				show1: false,
				val1: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			//初始化详情数据
			this.orderId = option.id
			this.init(option.id)
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
			init(id) {
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					OrderNo: id
				}
				let data = {
					url: '/api/gzh/trainQueryOrderDetail',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data
							for (let j = 0; j < self.list.passenger.length; j++) {
								self.persons.push(self.list.passenger[j])
							}
						}
					}
				}
				ajax(data)
			},
			goPay() {
				let self = this
				let datas = {
					orderId: this.orderId
				}
				let data = {
					url: '/api/gzh/payTrainOrder',
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
				ajax(data)
			},
			backMoney() {
				this.show1 = true
			},
			goCancel() {
				// this.show = true
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					OrderNo: this.orderId
				}
				let data = {
					url: '/api/gzh/trainCancelOrder',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							// self.show = false
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
			},
			confirm() {
				if(this.val == ''){
					Toast('备注不能为空')
					return
				}
				
				let self = this
				let datas = {
					OrderNo: this.orderId,
					Remark: this.val
				}
				let data = {
					url: '/api/gzh/cancelFlightOrder',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.show = false
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
			},
			confirm1() {
				if(this.val1 == ''){
					Toast('备注不能为空')
					return
				}
				
				let self = this
				let psdIds = ''
				let psgnames = ''
				let air = ''
				for (let i = 0; i < self.persons.length; i++) {
					psdIds += self.persons[i].psgId + ','
					psgnames += self.persons[i].psgName + ','
				}
				psdIds = psdIds.substr(0,psdIds.lastIndexOf(','))
				psgnames = psgnames.substr(0,psgnames.lastIndexOf(','))
				let datas = {
					uid: this.$store.state.uid,
					OrderNo: this.orderId,
					PsgIDs: psdIds,
					PsgNames: psgnames,
					Remark: this.val1
				}
				console.log(datas)
				let data = {
					url: '/api/gzh/trainApplyRefund',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							self.show1 = false
							Toast('退票成功')
							uni.navigateBack({
								delta: 1
							})
						} else {
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(data)
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
	}

	.price {
		color: #DE2910;
		font-size: 18px;
	}

	.order {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 14px;
		color: #999;
		padding-left: 24upx;
		box-sizing: border-box;
	}

	.btns {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 30upx 0;
	}

	.pay {
		padding: 8upx 60upx;
		background: #DE2910;
		border-radius: 4px;
		font-size: 14px;
		color: #fff;
	}

	.cancel {
		padding: 8upx 60upx;
		background: #eee;
		border-radius: 4px;
		font-size: 14px;
		color: #A5A5A5;
	}

	.wrapper {
		width: 100%;
		background: #fff;
		border-radius: 4px;
	}

	.choiceTitle {
		width: 100%;
		height: 80upx;
		font-size: 14px;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clock {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		padding: 0 20upx;
		box-sizing: border-box;
		margin: 20upx 0 30upx;
	}

	.start {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		font-size: 18px;
	}

	.start>img {
		width: 280upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}

	.bottomList {
		height: 40upx;
		line-height: 40upx;
		font-size: 12px;
		color: #999;
		/* text-align: center; */
		/* margin-top: 16upx; */
		padding-left: 20upx;
	}

	.msg {
		width: 100%;
		height: 60upx;
		padding-left: 24upx;
		display: flex;
		align-items: center;
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
	
	.beizhu {
		width: 90%;
		margin: 20upx auto;
		height: 160upx;
		border: 1px solid #eee;
		border-radius: 4px;
	}
	
	.beizhu>textarea {
		width: 100%;
		height: 100%;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
	}
</style>
