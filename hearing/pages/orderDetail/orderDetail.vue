<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="message" v-if="list.type == 2">
				<view class="list-top">
					<view class="msg">商品信息</view>
				</view>
				<view class="product">
					<image src="../../static/images/pic.png"></image>
					<view class="content">
						<view class="price">￥<text style="font-size: 40rpx;">20</text></view>
						<view>有效期：{{list.start_date}} - {{list.end_date}}</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="list.type == 1">
				<view class="list-top">
					<view class="msg">店铺信息</view>
				</view>
				<view class="product">
					<image :src="list.logo"></image>
					<view class="content">
						<view class="price"><text style="font-size: 30rpx;">{{list.name}}</text></view>
						<view>{{list.content}}</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="list.type == 1">
				<view class="list-top">
					<view class="msg">订单信息</view>
					<view class="state">
						<view class="status" v-if="list.merchant_status == 1">已预约</view>
						<view class="status" v-if="list.merchant_status == 2">已完成</view>
						<view class="status" v-if="list.merchant_status == 3">已取消</view>
						<image src="../../static/images/yue.png" style="width: 30rpx;height: 30rpx;" v-if="list.merchant_status == 1"></image>
						<image src="../../static/images/yishiyong.png" style="width: 30rpx;height: 30rpx;" v-if="list.merchant_status == 2"></image>
						<image src="../../static/images/cancel.png" style="width: 30rpx;height: 30rpx;" v-if="list.merchant_status == 3"></image>
					</view>
				</view>
				<view class="orderMsg">
					<view class="orderMsg-list">
						<view class="list-item">订单号</view>
						<view class="list-right">{{list.orderId}}</view>
					</view>
					<view class="orderMsg-list">
						<view class="list-item">创建时间</view>
						<view class="list-right">{{list.createDate}}</view>
					</view>
					<view class="orderMsg-list" v-if="list.refundReason">
						<view class="list-item">取消原因</view>
						<view class="list-right">{{list.refundReason}}</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="list.type == 2">
				<view class="list-top">
					<view class="msg">订单信息</view>
					<view class="state">
						<view class="status" v-if="list.order_status == 1">待支付</view>
						<view class="status" v-if="list.order_status == 2">待使用</view>
						<view class="status" v-if="list.order_status == 3">已使用</view>
						<view class="status" v-if="list.order_status == 4">退款中</view>
						<view class="status" v-if="list.order_status == 5">已退款</view>
						<view class="status" v-if="list.order_status == 6">已取消</view>
						<image v-if="list.order_status == 1" src="../../static/images/pay.png" style="width: 30rpx;height: 27rpx;"></image>
						<image v-if="list.order_status == 2" src="../../static/images/yue.png" style="width: 30rpx;height: 30rpx;"></image>
						<image v-if="list.order_status == 3" src="../../static/images/yishiyong.png" style="width: 30rpx;height: 30rpx;"></image>
						<image v-if="list.order_status == 4 || list.order_status == 5" src="../../static/images/back.png" style="width: 30rpx;height: 30rpx;"></image>
						<image v-if="list.order_status == 6" src="../../static/images/cancel.png" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
				<view class="orderMsg">
					<view class="orderMsg-list">
						<view class="list-item">订单号</view>
						<view class="list-right">{{list.orderId}}</view>
					</view>
					<view class="orderMsg-list">
						<view class="list-item">订单金额</view>
						<view style="font-size: 30rpx;color: red;">￥{{list.orderMoney}}</view>
					</view>
					<view class="orderMsg-list">
						<view class="list-item">开始时间</view>
						<view class="list-right">{{list.start_date}}</view>
					</view>
					<view class="orderMsg-list">
						<view class="list-item">结束时间</view>
						<view class="list-right">{{list.end_date}}</view>
					</view>
					<view class="orderMsg-list">
						<view class="list-item">创建时间</view>
						<view class="list-right">{{list.createDate}}</view>
					</view>
					<view class="orderMsg-list" v-if="list.pay_time">
						<view class="list-item">支付时间</view>
						<view class="list-right">{{list.pay_time}}</view>
					</view>
					<view class="orderMsg-list" v-if="list.refundReason">
						<view class="list-item">退货原因</view>
						<view class="list-right">{{list.refundReason}}</view>
					</view>
					<view class="orderMsg-list" v-if="list.refundShenTime">
						<view class="list-item">提交时间</view>
						<view class="list-right">{{list.refundShenTime}}</view>
					</view>
					<view class="orderMsg-list" v-if="list.refundTime">
						<view class="list-item">完成时间</view>
						<view class="list-right">{{list.refundTime}}</view>
					</view>
					<view class="orderMsg-list" v-if="list.use_date">
						<view class="list-item">使用时间</view>
						<view class="list-right">{{list.use_date}}</view>
					</view>
					<view class="orderMsg-list" v-if="list.cancel_date">
						<view class="list-item">取消时间</view>
						<view class="list-right">{{list.cancel_date}}</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="list.type == 2 && list.order_status == 6">
				<view class="list-top">
					<view class="msg">取消进度</view>
				</view>
				<view class="bg-white padding">
					<view class="cu-steps">
						<view class="cu-item" :class="index>num3?'':'text-blue'" v-for="(item,index) in numList3" :key="index">
							<text class="num" :data-index="index + 1"></text> 
							<view class="texts">
								<text style="margin-bottom: 16rpx;">{{item.name}}</text>
								<text v-if="index == 0" style="font-size: 24rpx;color: #999;">{{createDate}}</text>
								<text v-if="index == 1" style="font-size: 24rpx;color: #999;">{{cancelDate}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="(list.type == 2 && list.order_status == 4) || (list.type == 2 && list.order_status == 5)">
				<view class="list-top">
					<view class="msg">退款进度</view>
				</view>
				<view class="bg-white padding">
					<view class="cu-steps">
						<view class="cu-item" :class="index>num5?'':'text-blue'" v-for="(item,index) in numList5" :key="index">
							<text class="num" :data-index="index + 1"></text> 
							<view class="texts">
								<text style="margin-bottom: 16rpx;">{{item.name}}</text>
								<text v-if="index == 0" style="font-size: 24rpx;color: #999;">{{backtime}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="(list.type == 2 && list.order_status == 1) || (list.type == 2 && list.order_status == 2) || (list.type == 2 && list.order_status == 3)">
				<view class="list-top">
					<view class="msg">下单进度</view>
				</view>
				<view class="bg-white padding">
					<view class="cu-steps">
						<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
							<text class="num" :data-index="index + 1"></text>
							<view class="texts">
								<text style="margin-bottom: 16rpx;">{{item.name}}</text>
								<text v-if="index == 0" style="font-size: 24rpx;color: #999;">{{createDate}}</text>
								<text v-if="index == 1" style="font-size: 24rpx;color: #999;">{{paytime}}</text>
								<text v-if="index == 3" style="font-size: 24rpx;color: #999;">{{usedate}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="list.type == 1 && list.merchant_status == 1">
				<view class="list-top">
					<view class="msg">预约进度</view>
				</view>
				<view class="bg-white padding">
					<view class="cu-steps">
						<view class="cu-item" :class="index>num1?'':'text-blue'" v-for="(item,index) in numList1" :key="index">
							<text class="num" :data-index="index + 1"></text> 
							<view class="texts">
								<text style="margin-bottom: 16rpx;">{{item.name}}</text>
								<text v-if="index == 0" style="font-size: 24rpx;color: #999;">{{appointment}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="list.type == 1 && list.merchant_status == 2">
				<view class="list-top">
					<view class="msg">预约进度</view>
				</view>
				<view class="bg-white padding">
					<view class="cu-steps">
						<view class="cu-item" :class="index>num4?'':'text-blue'" v-for="(item,index) in numList1" :key="index">
							<text class="num" :data-index="index + 1"></text> 
							<view class="texts">
								<text style="margin-bottom: 16rpx;">{{item.name}}</text>
								<text v-if="index == 0" style="font-size: 24rpx;color: #999;">{{appointment}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message" v-if="(list.type == 1 && list.merchant_status == 3)">
				<view class="list-top">
					<view class="msg">取消进度</view>
				</view>
				<view class="bg-white padding">
					<view class="cu-steps">
						<view class="cu-item" :class="index>num2?'':'text-blue'" v-for="(item,index) in numList2" :key="index">
							<text class="num" :data-index="index + 1"></text>
							<view class="texts">
								<text style="margin-bottom: 16rpx;">{{item.name}}</text>
								<text v-if="index == 0" style="font-size: 24rpx;color: #999;">{{createDate}}</text>
								<text v-if="index == 1" style="font-size: 24rpx;color: #999;">{{cancelDate}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message">
				<view class="list-top">
					<view class="msg">购买人信息</view>
				</view>
				<view class="orderMsg">
					<!-- <view class="orderMsg-list" v-if="list.type == 1">
						<view class="list-item">预约时间</view>
						<view class="list-right">{{list.appointment_date}}</view>
					</view> -->
					<view class="orderMsg-list">
						<view class="list-item">姓名</view>
						<view class="list-right">{{list.applyName}}</view>
					</view>
					<view class="orderMsg-list">
						<view class="list-item">电话</view>
						<view class="list-right">{{list.phone}}</view>
					</view>
				</view>
				<view class="btns" v-if="(list.type == 2 && list.order_status == 1) || (list.type == 2 && list.order_status == 2) || (list.type == 1 && list.merchant_status == 1)">
					<view class="btn1" @tap="goCancel(list.orderId)" v-if="list.type == 2 && list.order_status == 1">取消订单</view>
					<view class="btn1" @tap="goBack(list.orderId)" v-if="list.type == 2 && list.order_status == 2">申请退款</view>
					<view class="btn1" @tap="goCancel(list.orderId)" v-if="list.type == 1 && list.merchant_status == 1">取消预约</view>
					<button class="btn2" open-type="getUserInfo" @getuserinfo="goPay(list.orderId)" v-if="list.type == 2 && list.order_status == 1">去支付</button>
					<view class="btn2" @tap="showFun(list.orderId)" v-if="list.type == 2 && list.order_status == 2">去核销</view>
					<view class="btn2" @tap="goFinish(list.orderId)" v-if="list.type == 1 && list.merchant_status == 1">预约完成</view>
				</view>
			</view>
		</view>
		<pay-keyboard :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword"></pay-keyboard>
	</view>
</template>

<script>
	import payKeyboard from '../../components/keyboard/keyboard.vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				numList: [{
					name: '下单'
				}, {
					name: '付款'
				}, {
					name: '待使用'
				}, {
					name: '交易成功'
				}],
				num: 0,
				numList1: [{
					name: '已预约'
				}, {
					name: '预约完成'
				}],
				num1: 0,
				numList2: [{
					name: '下单'
				}, {
					name: '已取消'
				}],
				num2: 1,
				numList3: [{
					name: '下单'
				}, {
					name: '已取消'
				}],
				num5: 0,
				numList5: [{
					name: '提交成功'
				}, {
					name: '审核通过'
				},{
					name: '退款成功'
				}],
				num3: 1,
				num4: 1,
				id: '',
				list: {},
				show_key: false,
				createDate: '',
				cancelDate: '',
				appointment: '',
				paytime: '',
				usedate: '',
				backtime: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.init()
		},
		components: {
			payKeyboard
		},
		methods: {
			showFun(id) {
				this.show_key = true
			},
			hideFun() {
				this.show_key = false
			},
			getPassword(n) {
				this.show_key = false
				let self = this
				let data1 = {
					cmd: 'checkOrder',
					id: this.id,
					merchant_id: n.password,
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('核销成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			init() {
				let self = this
				let data1 = {
					cmd: 'getOrderById',
					orderId: this.id
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
								if(res.data.createDate) {
									self.createDate = res.data.createDate.substring(5)
								}
								if(res.data.cancel_date) {
									self.cancelDate = res.data.cancel_date.substring(5)
								}
								if(res.data.appointment_date) {
									self.appointment = res.data.appointment_date.substring(5)
								}
								if(res.data.pay_time) {
									self.paytime = res.data.pay_time.substring(5)
								}
								if(res.data.use_date) {
									self.usedate = res.data.use_date.substring(5)
								}
								if(res.data.refundTime) {
									self.backtime = res.data.refundTime.substring(5)
								}
								if(res.data.order_status == 1) {
									self.num = 0
								} else if(res.data.order_status == 2) {
									self.num = 1
								} else {
									self.num = 3
								}
								console.log(res)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goCancel(id) {
				uni.navigateTo({
					url: '/pages/cancel/cancel?id=' + id
				})
			},
			goFinish(id) {
				let self = this
				let data1 = {
					cmd: 'completeOrder',
					id: id,
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('预约完成')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								},500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goPay(id) {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.code)
						uni.getUserInfo({
							success: function(res) {
								console.log(res)
								let data1 = {
									cmd: 'payOrder',
									uid: uni.getStorageSync('uid'),
									id: id,
									code: loginRes.code,
									userInfo: res.userInfo,
									type: 3
								}
								Toast.showLoading('', function() {
									let data = {
										data: data1,
										success: function(res) {
											console.log(res)
											if (res.data.result == 0) {
												Toast.hideLoading()
												setTimeout(() => {
													uni.navigateBack({
														delta: 1
													})
												}, 500)
											} else {
												Toast.hideLoading()
												Toast.showToast(res.data.resultNote)
											}
										}
									}
									ajax(data)
								})
							}
						})
					}
				})
			},
			goBack(id) {
				uni.navigateTo({
					url: '/pages/moneyReason/moneyReason?id=' + id
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
		background: #f6f6f6;

		.fixed {
			width: 100%;
		}

		.texts {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.message {
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				background: #fff;
				margin-bottom: 24rpx;

				.list-top {
					width: 100%;
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					border-bottom: 1px solid #eee;
					position: relative;

					.msg {
						font-size: 30rpx;
						color: #333;
						height: 60rpx;
						line-height: 60rpx;
						font-weight: 600;
						padding-left: 24rpx;
					}

					.msg:before {
						position: absolute;
						width: 6rpx;
						height: 30rpx;
						border-radius: 30px;
						background: #08A7C1;
						left: 0;
						top: 24rpx;
						content: '';
					}

					.state {
						height: 70rpx;
						display: flex;
						align-items: center;

						.status {
							height: 70rpx;
							line-height: 70rpx;
							padding-right: 24rpx;
							position: relative;
						}

						.status:after {
							content: '';
							width: 2px;
							height: 24rpx;
							background: #08A8C0;
							position: absolute;
							right: 0;
							top: 23rpx;
						}

						image {
							margin-left: 24rpx;
						}
					}
				}

				.product {
					width: 100%;
					padding: 30rpx 0;
					display: flex;

					image {
						width: 110rpx;
						height: 110rpx;
						border-radius: 4px;
					}

					.content {
						width: 76%;
						height: 110rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding-left: 24rpx;
						box-sizing: border-box;

						.price {
							font-size: 28rpx;
							color: #333;
						}

						.content {
							width: 100%;
							font-size: 24rpx;
							color: #666;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}

				.orderMsg {
					width: 100%;
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					color: #333;
					margin: 24rpx 0;

					.orderMsg-list {
						width: 100%;
						display: flex;
						margin-bottom: 24rpx;

						.list-item {
							width: 25%;
							text-align: left;
							margin-right: 24rpx;
						}

						.list-right {
							width: 70%;
						}
					}

					.orderMsg-list:last-child {
						margin-bottom: 0;
					}
				}

				.btns {
					width: 100%;
					padding: 32rpx 0 0;
					display: flex;
					justify-content: flex-end;
					font-size: 28rpx;
					border-top: 1px solid #eee;

					.btn1 {
						height: 60rpx;
						line-height: 60rpx;
						padding: 0 20rpx;
						border: 1px solid #eee;
						border-radius: 30px;
						color: #333;
						margin-right: 30rpx;
						box-sizing: border-box;
					}

					.btn2 {
						height: 60rpx;
						line-height: 60rpx;
						border: 1px solid #08A8C0;
						border-radius: 30px;
						color: #08A8C0;
						font-size: 28rpx;
						margin: 0;
						padding: 0 24rpx;
						box-sizing: border-box;
						background: #fff;
					}
				}
			}
		}
	}
</style>
