<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">申请加入</block>
				<block slot="right"></block>
			</cu-custom>
		</view>
		<view class="produce">
			<p>尊敬的持卡人，为了保障您更好享受驿站会员卡为您提供的专属特权服务，请确认下您的真实姓名、手机号和收货地址，实体卡将线下邮寄给您。</p>
		</view>
		<view class="message">
			<view class="user_msg">持卡人信息</view>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入您的姓名" name="input" :disabled="type" v-model="user"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机</view>
				<input placeholder="请输入开卡手机" name="input" :disabled="type" v-model="tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">证件号码</view>
				<input placeholder="请输入身份证号" name="input" :disabled="type" v-model="card"></input>
			</view>
			<view class="cu-form-group" v-if="type == 0" @tap="openPicker">
				<view class="title">收货地址</view>
				<input placeholder="请选择省市县" name="input" :disabled="true" v-model="region"></input>
			</view>
			<view class="cu-form-group" v-if="type == 0">
				<view class="title">地址详情</view>
				<input placeholder="详细地址、如街道、楼牌号" name="input" :disabled="type" v-model="address"></input>
			</view>
		</view>
		<view class="card_msg">
			<view class="user_msg">开卡信息</view>
			<view class="cu-form-group">
				<view class="title">会员卡类型</view>
				<view style="color: #DE2910;" v-if="cardType == 1">银版纪念册会员</view>
				<view style="color: #DE2910;" v-if="cardType == 2">金版纪念册会员</view>
			</view>
			<view class="cu-form-group">
				<view class="title">年费</view>
				<view style="color: red;font-weight: 600;font-size: 16px;">￥{{total}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">支付方式</view>
				<view>微信支付</view>
			</view>
			<checkbox-group class="block" @change="CheckboxChange">
				<view class="cu-form-group" style="border-top: 1px solid #eee;">
					<checkbox class='red' :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
					<view class="title" style="width: auto;padding-right: 0;font-size: 12px;margin-left: 16upx;" @tap="goIdea">我已仔细阅读并同意相关<text
						 style="color: blue;">《驿站会员隐私条款》</text>所有内容</view>
				</view>
			</checkbox-group>
		</view>
		<view class="pay">
			<view class="money">实付款： <text>￥{{total}}</text></view>
			<view class="payBtn" @tap="paySuc">立即支付</view>
		</view>
		<lotus-address @choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../common/js/util.js'
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue"
	import jweixin from '../../common/js/wx.js'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				type: false,
				cardType: 0,
				cards: 0,
				user: '',
				tel: '',
				card: '',
				address: '',
				total: 0,
				timer: null,
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: ''
				},
				region: '',
				checkbox: [{
					checked: false,
					value: 'A'
				}]
			}
		},
		components: {
			"lotus-address": lotusAddress,
			Toast
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.cards = option.type
			this.cardType = option.cardType
			this.total = option.price
			if (this.$store.state.vipType == 0) {
				this.type = false
			} else {
				this.type = true
				this.init()
			}
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
						console.log(res)
						if (res.data.result == 0) {
							self.user = res.data.username
							self.tel = res.data.phone
							self.card = res.data.idNumber
							self.region = res.data.city
							self.address = res.data.address
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
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
				console.log(this.checkbox)
			},
			goIdea() {
				uni.navigateTo({
					url: '../content/content?url=' + encodeURIComponent('https://m.xgcyz1978.com/display/agreement?id=5')
				})
			},
			onUnload() {
				uni.hideLoading()
			},
			paySuc() {
				let self = this

				if (this.user == '') {
					Toast('姓名不能为空')
					return
				}

				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}

				let idcardReg =
					/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				if (this.card == '') {
					Toast('身份证不能为空')
					return
				} else if (!(idcardReg.test(this.card))) {
					Toast('身份证不合法')
					return
				}

				if (this.type == 0) {
					if (this.city == '') {
						Toast('请选择地址')
						return
					}

					if (this.address == '') {
						Toast('请填写地址详情')
						return
					}
				}

				if (!this.checkbox[0].checked) {
					Toast('请阅读协议')
					return
				}

				let datas = {
					uid: this.$store.state.uid,
					type: parseInt(this.cards) + 1,
					cardType: this.cardType,
					username: this.user,
					phone: this.tel,
					idNumber: this.card,
					city: this.region,
					address: this.address,
					amount: this.total
				}
				let data = {
					url: '/api/gzh/addVip',
					data: datas,
					success: function(res) {
						console.log(res)
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
												let datas = {
													type: parseInt(self.cards) + 1,
													cardType: self.cardType,
													time: res.data.endDate
												}
												uni.navigateTo({
													url: '../sucResult/sucResult?list='+JSON.stringify(datas)
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
		position: relative;
	}

	.produce {
		width: 100%;
		padding: 20upx 30upx;
		display: flex;
		box-sizing: border-box;
		/* border-bottom: 2px solid #eee; */
		border-top: 2px solid #eee;
	}

	.produce>p {
		font-size: 12px;
		color: #999;
		text-align: justify;
	}

	.message {
		width: 90%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		/* border-bottom: 2px solid #eee; */
		background: #fff;
		margin: 0 auto;
		border-radius: 4px;
	}

	.user_msg {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: 15px;
		color: #333;
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
	}

	.cu-form-group {
		padding: 0 !important;
		min-height: 90upx !important;
		padding-left: 20upx !important;
		box-sizing: border-box;
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

	.card_msg {
		width: 90%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		padding-bottom: 160upx;
		margin: 30upx auto 0;
		border-radius: 4px;
		background: #fff;
	}

	uni-checkbox::before {
		font-size: 12px;
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
</style>
