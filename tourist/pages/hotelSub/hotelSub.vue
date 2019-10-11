<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">填写订单</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="top">
				<view>{{list.name}}</view>
				<view class="star" v-if="list.star == 5">五星级/豪华</view>
				<view class="star" v-if="list.star == 4">四星级/高档</view>
				<view class="star" v-if="list.star == 3">三星级/舒适</view>
				<view class="star" v-if="list.star <= 2">二星级/普通</view>
			</view>
			<view class="time">
				<view class="hotel-date">
					<img src="../../static/img/date.png" alt="">
					<view style="margin-left: 30upx;">入住时间 {{date1}}</view>
				</view>
				<view class="hotel-date">
					<img src="../../static/img/date.png" alt="">
					<view style="margin-left: 30upx;">离店时间 {{date2}}</view>
				</view>
			</view>
			<view class="time">
				<view>{{list.room}}</view>
				<view style="color: #E73C1D;">1间</view>
			</view>
			<view class="forms">
				<view style="width: 200upx;">入住人</view>
				<input v-model="user" type="text" placeholder="请输入姓名" placeholder-class="place">
			</view>
			<view class="forms">
				<view style="width: 200upx;">联系人</view>
				<input v-model="connect" type="text" placeholder="请输入联系人" placeholder-class="place">
			</view>
			<view class="forms">
				<view style="width: 200upx;">联系手机</view>
				<input v-model="tel" type="text" placeholder="请输入手机号" placeholder-class="place">
			</view>
			<view class="time" @tap="choiceTime">
				<view>到店时间</view>
				<view class="choice">
					<view style="color: #E73C1D;">{{clock}}</view>
					<img src="../../static/img/right.png" alt="" style="width: 24upx;margin-left: 20upx;">
				</view>
			</view>
			<view class="bank" v-if="list.type == 0 && list.safeType != 0">
				<view class="safe">
					<view class="card">信用卡担保</view>
					<view class="content">{{list.safe}}</view>
				</view>
				<view class="bankCard">
					<view class="formCard">
						<view style="width: 200upx;">信用卡号</view>
						<input v-model="card" type="text" placeholder="请输入信用卡号" placeholder-class="place">
					</view>
					<view class="time" @tap="useTime">
						<view>有效期</view>
						<view class="choice">
							<view style="color: #E73C1D;">{{time1}}</view>
							<img src="../../static/img/right.png" alt="" style="width: 24upx;margin-left: 20upx;">
						</view>
					</view>
					<view class="formCard">
						<view style="width: 200upx;">CVV2码</view>
						<input v-model="code" type="text" placeholder="卡背后末三位数字" placeholder-class="place">
					</view>
					<view class="formCard">
						<view style="width: 200upx;">持卡人</view>
						<input v-model="cardName" type="text" placeholder="请输入持卡人姓名" placeholder-class="place">
					</view>
					<view class="time" @tap="goType">
						<view>证件类型</view>
						<view class="choice">
							<view style="color: #E73C1D;">{{cardType}}</view>
							<img src="../../static/img/right.png" alt="" style="width: 24upx;margin-left: 20upx;">
						</view>
					</view>
					<view class="formCard" style="border-bottom: none;">
						<view style="width: 200upx;">证件卡号</view>
						<input v-model="cardNum" type="text" placeholder="证件卡号" placeholder-class="place">
					</view>
				</view>
			</view>
		</view>
		<view class="payBtn">
			<view>订单总价：<text style="font-size: 16px;color: #E73C1D;">￥{{list.total}}</text></view>
			<view class="btns" @tap="goSubmit">提交订单</view>
		</view>
		<van-popup v-model="show1" position="bottom">
			<van-picker show-toolbar :columns="columns1" @cancel="onCancel1" @confirm="onConfirm1" />
		</van-popup>
		<van-popup v-model="show3" position="bottom">
			<van-picker show-toolbar :columns="columns2" @cancel="onCancel2" @confirm="onConfirm2" />
		</van-popup>
		<van-popup v-model="show2" position="bottom" :overlay="false">
			<van-datetime-picker v-model="currentTime" type="date" :min-date="minDate" @cancel="cancel" @confirm="confirm" />
		</van-popup>
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
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				list: {},
				user: '',
				tel: '',
				card: '',
				code: '',
				cardName: '',
				cardNum: '',
				connect: '',
				show1: false,
				show2: false,
				show3: false,
				clock: '18:00之前',
				columns1: ['18:00之前', '18:00-06:00', '06:00之后'],
				columns2: ['身份证', '护照', '其他'],
				currentTime: new Date(),
				minDate: new Date(),
				time1: 'MM/YY',
				time2: '',
				cardType: '身份证'
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
		},
		computed: {
			date1() {
				return this.$store.state.hotelDate1
			},
			date2() {
				return this.$store.state.hotelDate2
			}
		},
		methods: {
			choiceTime() {
				this.show1 = true
			},
			onCancel1() {
				this.show1 = false
			},
			onConfirm1(val) {
				this.show1 = false
				this.clock = val
			},
			goType() {
				this.show3 = true
			},
			onCancel2() {
				this.show3 = false
			},
			onConfirm2(val) {
				this.show3 = false
				this.cardType = val
			},
			useTime() {
				this.show2 = true
			},
			confirm(val) {
				this.time1 = this.dateFtt("MM/dd", val)
				this.time2 = this.dateFtt("yyyy/MM/dd", val)
				this.show2 = false
			},
			cancel() {
				this.show2 = false
			},
			dateFtt(fmt, date) { //author: meizz   
				var o = {
					"M+": date.getMonth() + 1, //月份   
					"d+": date.getDate(), //日   
					"h+": date.getHours(), //小时   
					"m+": date.getMinutes(), //分   
					"s+": date.getSeconds(), //秒   
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
					"S": date.getMilliseconds() //毫秒   
				}
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
				return fmt
			},
			goSubmit() {
				let self = this
				if (this.user == '') {
					Toast('请输入入住人姓名')
					return
				}
				
				if (this.connect == '') {
					Toast('请输入联系人姓名')
					return
				}
				
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}
				if (this.list.type == 1) {
					let datas = {
						uid: self.$store.state.uid,
						HId: self.list.HId,
						RoomId: self.list.RoomId,
						ProductId: self.list.ProductId,
						IsGuarantee: false,
						InDate: self.$store.state.hotelFullDate1,
						OutDate: self.$store.state.hotelFullDate2,
						LatestTime: self.clock,
						OrderAmount: self.list.total,
						RoomsCount: 1,
						Passengers: self.user,
						ContactName: self.connect,
						ContactMobile: self.tel,
						CreditCard: null,
						BookRemark: ''
					}
					uni.showLoading({
						title: '提交中',
						mask: true
					})
					let data = {
						url: '/api/gzh/hotelCreateOrder',
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
								self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign, orderId)
							} else {
								uni.hideLoading()
								Toast(res.data.resultNote)
							}
						}
					}
					ajaxs(data)
				} else if(this.list.type == 0 && this.list.safeType != 0) {
					if (this.card == '') {
						Toast('请输入信用卡卡号')
						return
					}
					
					if (this.time1 == 'MM/YY') {
						Toast('请选择有效期')
						return
					}
					
					if (this.code == '') {
						Toast('请输入CVV2码')
						return
					}
					
					if (this.cardName == '') {
						Toast('请输入持卡人')
						return
					}
					
					if (this.cardNum == '') {
						Toast('请输入证件号')
						return
					}
					
					if(this.cardType == '身份证') {
						let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
						if(!(idcardReg.test(this.cardNum))){
							Toast('身份证不合法')
							return
						}
					}
					
					let time = this.time2.split('/')
					let num = 0
					
					if(self.cardType == '身份证'){
						num = 0
					} else if(self.cardType == '护照'){
						num == 1
					} else if(self.cardType == '其他'){
						num == 2
					}
					
					let CreditCardInfo = {
						Number: self.card,
						CVV: self.code,
						ExpirationYear: parseInt(time[0]),
						ExpirationMonth: parseInt(time[1]),
						HolderName: self.cardName,
						IdType: num,
						IdNo: self.cardNum
					}
					
					
					let datas = {
						uid: self.$store.state.uid,
						HId: self.list.HId,
						RoomId: self.list.RoomId,
						ProductId: self.list.ProductId,
						IsGuarantee: false,
						InDate: self.$store.state.hotelFullDate1,
						OutDate: self.$store.state.hotelFullDate2,
						LatestTime: self.clock,
						OrderAmount: self.list.total,
						RoomsCount: 1,
						Passengers: self.user,
						ContactName: self.connect,
						ContactMobile: self.tel,
						CreditCard: CreditCardInfo,
						BookRemark: ''
					}
					
					uni.showLoading({
						title: '提交中',
						mask: true
					})
					let data = {
						url: '/api/gzh/hotelCreateOrder',
						data: datas,
						success: function(res) {
							if (res.data.result == 0) {
								uni.hideLoading()
								uni.navigateTo({
									url: '../hotelSuc/hotelSuc'
								})
							} else {
								uni.hideLoading()
								Toast(res.data.resultNote)
							}
						}
					}
					ajaxs(data)
				} else if(this.list.type == 0 && this.list.safeType == 0) {
					let datas = {
						uid: self.$store.state.uid,
						HId: self.list.HId,
						RoomId: self.list.RoomId,
						ProductId: self.list.ProductId,
						IsGuarantee: false,
						InDate: self.$store.state.hotelFullDate1,
						OutDate: self.$store.state.hotelFullDate2,
						LatestTime: self.clock,
						OrderAmount: self.list.total,
						RoomsCount: 1,
						Passengers: self.user,
						ContactName: self.connect,
						ContactMobile: self.tel,
						CreditCard: null,
						BookRemark: ''
					}
					console.log(datas)
					uni.showLoading({
						title: '提交中',
						mask: true
					})
					let data = {
						url: '/api/gzh/hotelCreateOrder',
						data: datas,
						success: function(res) {
							if (res.data.result == 0) {
								uni.hideLoading()
								uni.navigateTo({
									url: '../hotelSuc/hotelSuc'
								})
							} else {
								uni.hideLoading()
								Toast(res.data.resultNote)
							}
						}
					}
					ajaxs(data)
				}
			},
			onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign, orderId) {
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
							uni.hideLoading()
							uni.navigateTo({
								url: '../hotelSuc/hotelSuc'
							})
						} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
							uni.hideLoading()
							Toast('用户取消支付')
						} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
							uni.hideLoading()
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
		background: #F8F8F8;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.top {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.star {
		margin-top: 20upx;
		font-size: 14px;
		color: #E73C1D;
	}

	.time,
	.forms {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24upx 30upx;
		box-sizing: border-box;
		background: #fff;
		border-bottom: 1px solid #eee;
		font-size: 12px;
		color: #666;
	}

	.hotel-date {
		display: flex;
		align-items: center;
	}

	.item-left>img {
		width: 30upx;
	}

	.place {
		font-size: 12px;
		color: #999;
	}

	input {
		font-size: 12px;
		color: #666;
		text-align: right;
	}

	.choice {
		height: 36upx;
		display: flex;
		align-items: center;
	}

	.bank {
		width: 100%;
		padding: 30upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin-bottom: 120upx;
	}

	.safe {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.card {
		width: 30%;
		background: #E73C1D;
		border-radius: 4px;
		font-size: 12px;
		color: #fff;
		padding: 10upx;
		text-align: center;
	}

	.content {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 4px;
		font-size: 12px;
		color: #666;
		text-align: justify;
		margin-top: 30upx;
	}

	.bankCard {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 30upx;
	}

	.formCard {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24upx 30upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #666;
		background: #fff;
		border-bottom: 1px solid #eee;
	}

	.payBtn {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
		padding: 0 0 0 30upx;
		box-sizing: border-box;
		box-shadow: 1px 1px 5px #eee;
	}

	.btns {
		width: 180upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		background: #E73C1D;
		font-size: 14px;
		color: #fff;
	}
</style>
