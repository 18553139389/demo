<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">填写订单</block>
			</cu-custom>
		</view>
		<!-- <van-stepper v-model="value" integer :min="1" disable-input /> -->
		<view class="formData">
			<view class="list">
				<view>贵宾厅</view>
				<view class="right">{{name}}</view>
			</view>
			<view class="list">
				<view>到厅时间</view>
				<view class="right" style="color: #999;" @tap="choiceTime">{{time}}</view>
			</view>
			<view class="list">
				<view>到厅人数</view>
				<view class="right" style="background: none;padding-left: 0;">
					<van-stepper v-model="value" integer :min="1" disable-input input-width="32px" />
				</view>
			</view>
			<view class="list">
				<view>联系人</view>
				<view class="right">
					<input type="text" placeholder="请输入联系人姓名" v-model="user">
				</view>
			</view>
			<view class="list">
				<view>手机号</view>
				<view class="right">
					<input type="number" placeholder="请输入手机号" v-model="tel">
				</view>
			</view>
		</view>
		<view class="notice">
			<view class="title" style="margin-bottom: 30upx;">服务须知</view>
			<view class="mark">{{notice}}</view>
		</view>
		<view class="pay" v-if="isVip == 0">
			<view class="money">实付款： <text>￥{{price}}</text></view>
			<view class="payBtn" @tap="paySuc">立即支付</view>
		</view>
		<view class="sort" @tap="goOrder" v-if="isVip == 1">立即预约</view>
		<van-popup v-model="show" position="bottom" :overlay="false">
			<van-datetime-picker v-model="currentTime" type="datetime" :min-date="minDate" @cancel="cancel" @confirm="confirm" />
		</van-popup>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: 1,
				backColor: '#FFFFFF',
				currentTime: new Date(),
				minDate: new Date(),
				show: false,
				time: "请选择到厅时间",
				name: "",
				user: "",
				tel: "",
				id: "",
				isVip: 0,
				notice: '',
				price: 0
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
			this.name = decodeURIComponent(option.name) 
			this.id = option.id
			this.isVip = option.isVip
			this.notice = decodeURIComponent(option.notice)
			this.price = option.price
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
					vipHallId: this.id,
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/vipHallDetail',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.imgs = res.data.images
							self.listData = res.data
							self.serviceList = res.data.serviceList
							self.assistantList = res.data.assistantList
							self.name = res.data.title
							self.isVip = res.data.isVip
						}
					}
				}
				ajax(data)
			},
			confirm(val) {
				this.time = this.dateFtt("yyyy-MM-dd hh:mm", val)
				this.show = false
			},
			cancel() {
				this.show = false
			},
			choiceTime() {
				this.show = true
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
			paySuc() {
				if(this.time == '请选择到厅时间'){
					Toast('请选择时间')
					return
				}
				
				if(this.user == ''){
					Toast('请输入联系人')
					return
				}
				
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}
				
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					vipHallId: self.id,
					numbers: self.value,
					reserveDate: self.time,
					username: self.user,
					phone: self.tel,
					amount: self.price
				}
				let data = {
					url: '/api/gzh/bookingVipHall',
					data: datas,
					success: function(res){
						if(res.data.result == 0){
							let orderId = res.data.orderId
							let appId = res.data.body.appId
							let timeStamp = res.data.body.timeStamp
							let nonceStr = res.data.body.nonceStr
							let packages = res.data.body.prepay
							let signType = res.data.body.signType
							let paySign = res.data.body.paySign
							self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign, orderId)
						}else{
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign,orderId) {
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
							Toast("您已成功预约贵宾厅")
							setTimeout(function(){
								uni.navigateTo({
									url: '../vipOrder/vipOrder'
								})
							},500)
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
				if(this.time == '请选择到厅时间'){
					Toast('请选择时间')
					return
				}
				
				if(this.user == ''){
					Toast('请输入联系人')
					return
				}
				
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}
				
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					vipHallId: self.id,
					numbers: self.value,
					reserveDate: self.time,
					username: self.user,
					phone: self.tel,
					amount: 0
				}
				let data = {
					url: '/api/gzh/bookingVipHall',
					data: datas,
					success: function(res){
						if(res.data.result == 0){
							Toast("您已成功预约贵宾厅")
							setTimeout(function(){
								uni.navigateTo({
									url: '../vipOrder/vipOrder'
								})
							},500)
						}else{
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

	.formData {
		width: 92%;
		margin: 30upx auto;
		background: #fff;
		border-radius: 4px;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		/* border-bottom: 1px solid #eee; */
	}

	.right {
		width: 70%;
		text-align: left;
	}

	.notice {
		width: 100%;
		padding: 0 30upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #999;
	}

	.mark {
		width: 100%;
		margin-bottom: 12upx;
	}

	.pay {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		border-top: 2px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.money {
		height: 100upx;
		line-height: 100upx;
	}

	.money>text {
		margin-left: 30upx;
		color: red;
	}

	.sort {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		/* border-top: 2px solid #eee; */
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.right,.right>input {
		background: #F8F8F8;
		padding: 0 20upx;
		height: 60upx;
		line-height: 60upx;
	}
	
	.pay {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		border-top: 2px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.money {
		height: 100upx;
		line-height: 100upx;
	}
	
	.money>text {
		margin-left: 30upx;
		color: red;
	}
	
	.payBtn {
		height: 100upx;
		line-height: 100upx;
		font-size: 14px;
		color: #fff;
		padding: 0 40upx;
		background: #DE2910;
	}
	
	.sort {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		border-top: 2px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #DE2910;
		color: #fff;
		font-size: 15px;
	}
	
	.van-stepper__minus, .van-stepper__plus {
		background-color: #fff !important;
	}
</style>
