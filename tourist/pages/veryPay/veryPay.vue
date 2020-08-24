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
						<view class="msg_title">服务通道：</view>
						<view style="width: 75%;color: #999;">{{list.name}}</view>
					</view>
				</view>
				<view>
					<view class="msg">
						<view class="msg_title">服务地址：</view>
						<view style="width: 75%;color: #999;">{{list.address}}</view>
					</view>
				</view>
				<view>
					<view class="msg">
						<view class="msg_title">使用时间：</view>
						<view style="width: 75%;color: #999;">{{list.time}}</view>
					</view>
				</view>
				<view>
					<view class="msg">
						<view class="msg_title">服务人数：</view>
						<view style="width: 75%;color: #999;">{{list.num}}</view>
					</view>
				</view>
				<view class="msg">
					<view class="msg_title" style="padding-bottom: 20upx;">应付总额：</view>
					<view style="color: #DE2910;margin-left: -6upx;">￥{{list.price}}</view>
				</view>
			</view>
			<view class="list" style="padding-bottom: 20upx;">
				<view class="list-top">
					<view class="state">联系人信息</view>
				</view>
				<view>
					<view class="msg">
						<view class="msg_title">联系人：</view>
						<view style="width: 75%;color: #999;">{{list.user}}</view>
					</view>
				</view>
				<view>
					<view class="msg">
						<view class="msg_title">手机号：</view>
						<view style="width: 75%;color: #999;">{{list.tel}}</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list-top">
					<view class="state">已选服务</view>
				</view>
				<view class="classify_list">
					<view class="list_type" v-for="(v,k) in datas" :key="k">
						<image mode="scaleToFill" :src="v.icon"></image>
						<text style="color: red;">{{v.title}}</text>
					</view>
				</view>
			</view>
			<view class="list" @tap="goSuc">
				<view class="list-top">
					<view class="state">支付方式</view>
				</view>
				<view class="pay">
					<view class="wx">
						<img class="banner" src="../../static/img/wx.png" alt="">
						<view>微信支付</view>
					</view>
					<img class="banner" src="../../static/img/right1.png" alt="">
				</view>
			</view>
		</view>
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
				list: {},
				ids: '',
				datas: []
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			this.datas = this.list.list
			console.log(this.list)
		},
		methods: {
			goSuc() {
				uni.showLoading({
					title: '加载中'
				})
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					importantId: self.list.id,
					numbers: self.list.num,
					reserveDate: self.list.time,
					username: self.list.user,
					phone: self.list.tel,
					serIds: self.list.serIds
				}
				let data = {
					url: '/api/gzh/addImportantOrder',
					data: datas,
					success: function(res){
						if(res.data.result == 0){
							console.log(res)
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
				ajaxs(data)
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
							uni.hideLoading()
							// Toast('支付成功')
							setTimeout(function() {
								uni.navigateTo({
									url: '../shopSuc/shopSuc?type=2'
								})
							}, 300)
						} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
							uni.hideLoading();
							Toast('用户取消支付')
						} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
							uni.hideLoading();
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
		padding-left: 24upx;
		padding-top: 20upx;
		display: flex;
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

	.msg_title {
		width: 25%;
	}

	.classify_list {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		flex-wrap: wrap;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		/* border-top: 1px solid #eee; */
	}

	.list_type {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30upx;
	}

	.list_type text {
		font-size: 12px;
		color: #333;
	}

	.list_type>image {
		width: 66upx;
		height: 66upx;
		margin-bottom: 12upx;
		border-radius: 50%;
	}
</style>
