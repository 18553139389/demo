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
					<view class="state">订单详情</view>
				</view>
				<view class="msg">
					<view>订单号</view>
					<view style="margin-left: 30upx;">{{listData.orderId}}</view>
				</view>
				<view class="msg">
					<view>创建时间</view>
					<view style="margin-left: 30upx;">{{listData.createDate}}</view>
				</view>
				<view class="msg">
					<view>订单类型</view>
					<view style="margin-left: 30upx;" v-if="listData.category == 1">开卡</view>
					<view style="margin-left: 30upx;" v-if="listData.category == 2">续费</view>
					<view style="margin-left: 30upx;" v-if="listData.category == 3">升级</view>
				</view>
			</view>
			<view class="list">
				<view class="list-top">
					<view class="state">持卡人信息</view>
				</view>
				<view class="msg">
					<view>姓名</view>
					<view style="margin-left: 30upx;">{{listData.username}}</view>
				</view>
				<view class="msg">
					<view>手机</view>
					<view style="margin-left: 30upx;">{{listData.phone}}</view>
				</view>
				<view class="msg">
					<view>证件号码</view>
					<view style="margin-left: 30upx;">{{listData.idnumber}}</view>
				</view>
				<view class="msg">
					<view>收货地址</view>
					<view style="margin-left: 30upx;">{{listData.address}}</view>
				</view>
			</view>
			<view class="list">
				<view class="list-top">
					<view class="state">会员卡信息</view>
				</view>
				<view class="msg">
					<view>会员卡卡号</view>
					<view style="margin-left: 30upx;">{{listData.cardId}}</view>
				</view>
				<view class="msg">
					<view>会员卡类型</view>
					<view style="margin-left: 30upx;" v-if="listData.type == 1">银版纪念册</view>
					<view style="margin-left: 30upx;" v-if="listData.type == 2">金版纪念册</view>
				</view>
				<view class="msg">
					<view>年费</view>
					<view style="margin-left: 30upx;color: red;">￥{{listData.amount}}元</view>
				</view>
				<view class="msg">
					<view>支付方式</view>
					<view style="margin-left: 30upx;">微信</view>
				</view>
			</view>
		</view>
		<view class="pay" v-if="listData.state == 0">
			<view class="price" style="margin-left: 30upx;">实际付款：<text style="color: red;">￥{{listData.amount}}元</text></view>
			<view class="payBtns" @tap="paySuc">立即支付</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				id: '',
				list: [],
				listData: {}
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.id = option.id
			let self = this
			let datas = {
				orderId: this.id
			}
			let data = {
				url: '/api/gzh/cardOrderDetail',
				data: datas,
				success: function(res){
					if (res.data.result == 0) {
						console.log(res)
						self.listData = res.data
					}
				}
			}
			ajax(data)
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
			paySuc() {
				let self = this
				let datas = {
					orderId: this.id
				}
				let data = {
					url: '/api/gzh/payCardOrder',
					data: datas,
					success: function(res){
						console.log(res)
						if (res.data.result == 0) {
							let orderId = res.data.body.orderId
							let appId = res.data.body.appId
							let timeStamp = res.data.body.timeStamp
							let nonceStr = res.data.body.nonceStr
							let packages = res.data.body.prepay
							let signType = res.data.body.signType
							let paySign = res.data.body.paySign
							self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign, orderId)
						} else {
							Toast(res.data.resultNote)
						}
					},
					fail: function(res) {
						Toast(res.data.resultNote)
					}
				}
				ajax(data)
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
							uni.showLoading({
								title: '加载中',
								mask: true
							})
							let timer = setInterval(function(){
								let forms = {
									orderId: orderId
								}
								let look = {
									url: '/api/gzh/getCardOrderState',
									data: forms,
									success: function(res) {
										if (res.data.result == 0) {
											if (res.data.state == 1) {
												uni.hideLoading()
												clearInterval(timer)
												uni.navigateTo({
													url: '../sucResult/sucResult?type=' + res.data.cardType + '&time=' + res.data.endDate
												})
											} 
										}
									}
								}
								ajax(look)
							},200)
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
		padding: 30upx 0;
		box-sizing: border-box;
		margin-bottom: 120upx;
	}
	
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		background: #fff;
		box-shadow: 1px 0 4px #eee;
		margin-bottom: 30upx;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.list-top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #333;
		margin-bottom: 20upx;
	}
	
	.state {
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
		font-size: 15px;
	}
	
	.msg {
		width: 100%;
		height: 50upx;
		padding-left: 24upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #666;
	}
	
	.pay {
		width: 100%;
		height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		border-top: 1px solid #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;
		color: #333;
	}
	
	.payBtns {
		height: 100upx;
		line-height: 100upx;
		background: red;
		color: #fff;
		padding: 0 60upx;
	}
</style>
