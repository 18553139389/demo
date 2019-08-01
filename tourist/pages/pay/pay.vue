<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">支付</block>
			</cu-custom>
		</view>
		<view class="orderMsg" style="margin-top: 20upx;">
			<view class="title">订单信息</view>
			<view class="orderList">
				<view class="list">
					<text>贵宾厅：</text>
					<view class="content">{{listData.title}}</view>
				</view>
				<view class="list">
					<text>贵宾厅位置：</text>
					<view class="content">{{listData.address}}</view>
				</view>
				<view class="list">
					<text>到厅时间：</text>
					<view class="content">{{listData.reserveDate}}</view>
				</view>
				<view class="list">
					<text>服务人次：</text>
					<view class="content">{{listData.numbers}}人</view>
				</view>
				<view class="list">
					<text>应付总额：</text>
					<view class="content">¥{{listData.amount}}</view>
				</view>
			</view>
		</view>
		<view class="orderMsg">
			<view class="title">联系人信息</view>
			<view class="orderList">
				<view class="list">
					<text>联系人：</text>
					<view class="content">{{listData.username}}</view>
				</view>
				<view class="list">
					<text>手机号：</text>
					<view class="content">{{listData.phone}}</view>
				</view>
			</view>
		</view>
		<view class="orderMsg">
			<view class="title">支付方式</view>
			<view class="wxList" @tap="goPay">
				<view class="wx">
					<img src="../../static/img/wx.png" alt="">
					<text>微信支付</text>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import jweixin from '../../common/js/wx.js'
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				id: '',
				ids: '',
				listData: {}
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
			this.id = option.order
			this.ids = option.id
			this.init()
		},
		onReady() {
			
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
					uid: this.$store.state.uid,
					orderId: self.id
				}
				let data = {
					url: '/api/gzh/viphallOrderDetail',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.listData = res.data
						}
					}
				}
				ajax(data)
			},
			goOrder() {
				uni.navigateTo({
					url: '../appointment/appointment'
				})
			},
			goPay() {
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					vipHallId: self.ids,
					numbers: self.listData.numbers,
					reserveDate: self.listData.reserveDate,
					username: self.listData.username,
					phone: self.listData.phone,
					amount: self.listData.amount
				}
				let data = {
					url: '/api/gzh/bookingVipHall',
					data: datas,
					success: function(res){
						if(res.data.result == 0){
							let appId = res.data.body.appId
							let timeStamp = res.data.body.timeStamp
							let nonceStr = res.data.body.nonceStr
							let packages = res.data.body.prepay
							let signType = res.data.body.signType
							let paySign = res.data.body.paySign
							self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign)
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
							Toast('微信支付成功')
							uni.navigateTo({
								url: '../vipOrder/vipOrder'
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
	
	.orderMsg {
		width: 92%;
		padding: 20upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin: 0 auto 30upx;
		background: #fff;
		border-radius: 4px;
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
		margin-bottom: 24upx;
		font-size: 14px;
		color: #333;
	}
	
	.content {
		width: 70%;
		text-align: justify;
	}
	
	.wxList {
		width: 100%;
		height: 110upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding-left: 28upx;
	}
	
	.wxList>img {
		width: 30upx;
		height: 30upx;
	}
	
	.wx {
		height: 110upx;
		display: flex;
		align-items: center;
	}
	
	.wx>img {
		width: 40upx;
		height: 40upx;
		margin-right: 30upx;
	}
	
</style>
