<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">申请补卡</block>
				<block slot="right">
					<img class="question" @tap="goScore" src="../../static/img/question.png" alt="">
				</block>
			</cu-custom>
		</view>
		<view style="background-color: #F8F8F8;padding: 30upx 0;">
			<view class="vip">
				<img :src="card.image" alt="">
			</view>
		</view>
		<view class="control">
			<view class="vipNum">会员卡号：{{list.cardNo}}</view>
			<view>到期时间： {{list.endDate}}</view>
		</view>
		<view class="message">
			<view class="cu-form-group" @tap="openPicker">
				<view class="title">收货地址</view>
				<input placeholder="请选择省市县" name="input" :disabled="true" v-model="region"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">地址详情</view>
				<input placeholder="详细地址、如街道、楼牌号等" name="input" v-model="location"></input>
			</view>
		</view>
		<view class="tip">补卡申请将提交后台管理员审核，具体审核结果已微信通知为准</view>
		<view class="card_btn" @tap="submit">提交补卡申请</view>
		<lotus-address @choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
		<van-dialog v-model="show" title="补卡费用" show-cancel-button show-confirm-button confirm-button-text="支付" confirm-button-color="red" @confirm="confirm">
			<view class="price">￥{{amount}}元</view>
			<view class="explain">补卡说明：支付成功后，请耐心等待工作人员审核！</view>
		</van-dialog>
	</view>
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue"
	import {
		ajax
	} from '../../common/js/util.js'
	import {
		Toast,
		Dialog
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				show: false,
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				},
				region: '',
				location: '',
				card: {},
				list: {},
				address: '',
				amount: 0,
				appId: '',
				timeStamp: '',
				nonceStr: '',
				packages: '',
				signType: '',
				paySign: ''
			}
		},
		components: {
			"lotus-address": lotusAddress,
			Toast
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
		},
		onShow() {
			console.log(this.$store.state.vipType)
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
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/vipCard',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							console.log(res)
							for (let i = 0; i < res.data.dataList.length; i++) {
								if (res.data.dataList[i].cardType == self.$store.state.vipType) {
									self.list = res.data
									self.card = res.data.dataList[i]
								}
							}
						}
					}
				}
				ajax(data)
			},
			//打开picker
			openPicker() {
				this.lotusAddressData.visible = true;
			},
			//回传已选的省市区的值
			choseValue(res) {
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.provice; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区
					this.region = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
				console.log(this.region)
			},
			open() {
				uni.navigateTo({
					url: '../opened/opened'
				});
			},
			bindCard() {
				uni.navigateTo({
					url: '../bind/bind'
				});
			},
			submit() {
				let self = this
				if (this.region == '') {
					Toast('请选择地址')
					return
				}

				if (this.location == '') {
					Toast('地址详情不能为空')
					return
				}
				
				this.address = this.region + '' + this.location
				let datas = {
					url: '/api/gzh/replacement',
					data: {
						uid: this.$store.state.uid,
						address: self.address
					},
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.amount = res.data.amount
							self.appId = res.data.body.appId
							self.timeStamp = res.data.body.timeStamp
							self.nonceStr = res.data.body.nonceStr
							self.packages = res.data.body.prepay
							self.signType = res.data.body.signType
							self.paySign = res.data.body.paySign
							self.show = true
						} else {
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(datas)
			},
			confirm() {
				let self = this
				self.onBridgeReady(self.appId, self.timeStamp, self.nonceStr, self.packages, self.signType, self.paySign)
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
							self.show = false
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

	.question {
		width: 40upx;
		height: 40upx;
	}

	.msg {
		margin-right: 30upx;
		width: 38upx;
		height: 38upx;
	}

	.vip {
		width: 90%;
		height: 300upx;
		margin: 0 auto;
		position: relative;
	}

	.vip>img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
	}

	.bind_produce>view {
		width: 100%;
		height: 50upx;
		font-size: 14px;
		color: #999;
		text-align: left;
	}

	.bind_produce>p {
		width: 100%;
		font-size: 12px;
		color: #999;
		text-align: justify;
	}

	.bind_produce {
		width: 100%;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* border-bottom: 1px solid #eee; */
		box-sizing: border-box;
	}

	.message {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		background: #fff;
		margin-top: 30upx;
	}

	.cu-form-group {
		padding: 0 !important;
		min-height: 90upx !important;
		border: none !important;
	}

	.cu-form-group>input {
		background: #F8F8F8;
		padding: 0 20upx;
		height: 60upx;
	}

	.title {
		width: 200upx;
	}

	.tip {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #999;
	}

	.card_btn {
		width: 90%;
		border-radius: 4px;
		border: 1px solid #eee;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin: 160upx auto 0;
		background: #DE2910;
		font-size: 15px;
		color: #fff;
	}

	.cards {
		font-size: 16px;
		color: #fff;
		padding-top: 60upx;
		margin-left: 60upx;
	}

	.author {
		font-size: 12px;
		color: #fff;
		margin-top: 40upx;
		margin-left: 60upx;
	}

	.content {
		font-size: 12px;
		color: #fff;
		margin-top: 10upx;
		margin-left: 60upx;
	}

	.control {
		width: 100%;
		padding: 80upx 30upx 30upx;
		box-sizing: border-box;
		background: url(../../static/img/cardbg.png) no-repeat;
		background-size: 100% 100%;
		margin-top: -90upx;
		font-size: 12px;
		color: #999;
		position: relative;
		z-index: 10;
	}

	.vipNum {
		margin-bottom: 20upx;
	}
	
	.price {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 40upx;
		color: red;
	}
	
	.explain {
		width: 90%;
		margin: 0 auto;
		font-size: 28upx;
		color: #333;
		margin-bottom: 30upx;
	}
</style>
