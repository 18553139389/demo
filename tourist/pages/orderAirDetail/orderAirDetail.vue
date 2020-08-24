<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
				<block slot="right" v-if="list.invoice == 0 && list.state == 6">开发票</block>
			</cu-custom>
		</view>
		<view class="lists">
			<view class="list">
				<view class="list-top">
					<view class="state" v-if="list.state == 1">新订单</view>
					<view class="state" v-if="list.state == 2">已受理</view>
					<view class="state" v-if="list.state == 3">已取消</view>
					<view class="state" v-if="list.state == 4">待出票</view>
					<view class="state" v-if="list.state == 5">已出票</view>
					<view class="state" v-if="list.state == 6">已完成</view>
					<view class="state" v-if="list.state == 16">需补款</view>
					<view class="state" v-if="list.state == 17">不能出票</view>
					<view class="state" v-if="list.state == 30">出票中</view>
					<view class="state" v-if="list.state == 31">已退款</view>
					<view class="state" v-if="list.state == 32">退款中</view>
					<view class="state" v-if="list.state == 33">暂不能出票</view>
					<view class="price">￥{{list.totalAmount}}</view>
				</view>
				<view class="order">订单号：{{orderId}}</view>
				<view class="btns">
					<view class="pay" v-if="list.state == 1" @tap="goPay">去付款</view>
					<view class="cancel" v-if="list.state == 1" @tap="goCancel">取消订单</view>
				</view>
			</view>
			<view class="list">
				<view class="list-top">
					<view class="state">航班信息</view>
				</view>
				<view class="wrapper" v-for="(v,k) in airList" :key="k">
					<view class="choiceTitle">
						<view>{{v.begin_date}}</view>
						<view style="margin-left: 20upx;">{{v.scity_name}}-{{v.ecity_name}}</view>
					</view>
					<view class="clock">
						<view class="start">
							<view class="time">{{v.begin_time.substr(0,v.begin_time.lastIndexOf(':'))}}</view>
							<view>{{v.scity_name}} {{v.sterminal}}</view>
						</view>
						<view class="start">
							<!-- <view style="font-size: 12px;">k107</view> -->
							<img src="../../static/img/list.png" alt="">
							<!-- <view style="font-size: 12px;">约2小时20分</view> -->
						</view>
						<view class="start">
							<view class="time">{{v.arrive_time.substr(0,v.arrive_time.lastIndexOf(':'))}}</view>
							<view>{{v.ecity_name}} {{v.eterminal}}</view>
						</view>
					</view>
					<view class="bottomList">航班号：{{v.flight_no}}</view>
					<view class="bottomList" style="margin-bottom: 20upx;">航空公司名称：{{v.airLine_name}}</view>
				</view>
			</view>
			<view class="list">
				<view class="list-top">
					<view class="state">乘机人信息</view>
				</view>
				<view v-for="(v,k) in persons" :key="k">
					<view class="msg">
						<view>乘机人</view>
						<view style="margin-left: 30upx;">{{v.psgName}}</view>
					</view>
					<view class="msg">
						<view>身份证</view>
						<view style="margin-left: 30upx;">{{v.cardNo}}</view>
					</view>
				</view>
				<view class="msg">
					<view>联系人</view>
					<view style="margin-left: 30upx;">{{list.contactName}} {{list.contactMobile}}</view>
				</view>
			</view>
			<view class="list">
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
					<view style="margin-left: 30upx;">{{startDate}}</view>
				</view>
				<!-- <view class="msg">
					<view>退款时间</view>
					<view style="margin-left: 30upx;">2019-05-28 15:20:56</view>
				</view> -->
			</view>
		</view>
		<view class="back" v-if="list.state == 5" @tap="backMoney">我要退票</view>
		<!-- <view class="open">开发票</view> -->
		<view class="open" v-if="list.state == 3 || list.state == 6 || list.state == 31">删除订单</view>
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
	import {Toast,Dialog} from 'vant'
	import {ajax} from '../../common/js/util.js'
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
					orderId: id
				}
				let data = {
					url: '/api/gzh/flightOrderDetail',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data
							for (let i = 0; i < self.list.airlineInfoList.length; i++) {
								self.airList.push(self.list.airlineInfoList[i])
							}
							self.startDate = self.list.airlineInfoList[0].begin_date + ' ' + self.list.airlineInfoList[0].begin_time
							for (let j = 0; j < self.list.passengerList.length; j++) {
								self.persons.push(self.list.passengerList[j])
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
					url: '/api/gzh/payFlightOrder',
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
				this.show = true
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
				for (let i = 0; i < self.airList.length; i++) {
					air += self.airList[i].airlineId + ','
				}
				psdIds = psdIds.substr(0,psdIds.lastIndexOf(','))
				psgnames = psgnames.substr(0,psgnames.lastIndexOf(','))
				air = air.substr(0,air.lastIndexOf(','))
				let datas = {
					OrderNo: this.orderId,
					PsgIDs: psdIds,
					PsgNames: psgnames,
					RefundType: 1,
					AirLineIDs: air,
					Remark: this.val1
				}
				let data = {
					url: '/api/gzh/flightApplyRefund',
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
			},
			goRight() {
				uni.navigateTo({
					url: '../bill/bill?amount=' + this.list.totalAmount + '&orderId=' + this.orderId
				})
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
