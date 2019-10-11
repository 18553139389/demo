<template>
	<view class="contain">
		<view class="logo">
			<img src="../../static/img/logo.png" alt="">
		</view>
		<view class="forms">
			<view class="list">
				<img src="../../static/img/shouji.png" alt="">
				<input placeholder="请输入手机号" type="number" v-model="tel">
			</view>
			<view class="list">
				<img src="../../static/img/yanzhengma.png" alt="">
				<input placeholder="请输入验证码" type="number" v-model="code">
				<button class="code" type="button" :disabled="btnState" @tap="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
			</view>
			<view class="save" @tap="submit">保存</view>
		</view>
		<view class="bottom">
			<view class="content">
				<text>信任</text>
				<text>尊贵</text>
				<text>便利</text>
			</view>
		</view>
	</view>
</template>

<script>
	var jweixin = require('jweixin-module')
	import {Toast} from 'vant'
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				rTime: '获取验证码',
				tel: '',
				code: '',
				btnState: false,
				uid: null
			}
		},
		components: {
			Toast
		},
		onShow() {
			// this.init()
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
				this.uid = uids
				if (this.getRequest('bind') && this.getRequest('type')) {
					var bind = this.getRequest('bind')
					var type = this.getRequest('type')
					if (bind == 1 && type == 1) {
						uni.switchTab({
							url: '/pages/vip/vip'
						})
					} else if (bind == 1 && type == 2) {
						uni.switchTab({
							url: '/pages/shop/shop'
						})
					}
				}
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
				let url = window.location.href.split('#')[0]
				// let url = 'http://m.xgcyz1978.com/h5/'
				let datas = {
					url: url
				}
				alert(url)
				let data = {
					url: '/api/gzh/auth',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							jweixin.config({
								debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: res.data.appId, // 必填，公众号的唯一标识
								timestamp: res.data.timestamp, // 必填，生成签名的时间戳
								nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
								signature: res.data.signature, // 必填，签名，见附录1
								jsApiList: ['checkJsApi', 'getLocation']
							});
							jweixin.error(function(res) {
								//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
								alert("扫码出错了1：" + res.errMsg)
							});
							jweixin.ready(function() {
								jweixin.getLocation({
									type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
									success: function(res) {
										alert(JSON.stringify(res))
									}
								});
							});
						}
					}
				}
				ajax(data)
			},
			getValidate() {
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}

				let self = this
				this.rTime = 60
				let rTime = this.rTime
				this.btnState = true
				let interval = setInterval(() => {
					if (--self.rTime <= 0) {
						self.rTime = '获取验证码'
						clearInterval(interval)
						self.btnState = false
					}
				}, 1000)

				let datas = {
					url: '/api/gzh/sendSms',
					data: {
						phone: self.tel
					},
					success: function(res) {
						console.log(res)
					}
				}

				ajax(datas)
			},
			submit() {
				let self = this
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}

				if (this.code == '') {
					Toast('验证码不能为空')
					return
				}
				let datas = {
					url: '/api/gzh/bindPhone',
					data: {
						uid: self.uid,
						phone: self.tel,
						code: self.code
					},
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							uni.switchTab({
								url: '/pages/index/index'
							})
						} else {
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(datas)
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
		background: #FFFFFF;
	}

	.logo {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 200upx;
	}

	.forms {
		width: 100%;
		padding: 120upx 60upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.list {
		width: 100%;
		display: flex;
		align-items: center;
		height: 100upx;
		border-bottom: 1px solid #eee;
		margin-bottom: 30upx;
	}

	.list>img {
		width: 40upx;
	}

	.list>input {
		width: 55%;
		margin-left: 30upx;
	}

	.code {
		flex: 1;
		text-align: right;
		color: #DE2910;
	}

	button {
		border: none !important;
		background: none !important;
	}

	uni-button:after {
		border: none !important;
	}

	.save {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #DE2910;
		border-radius: 4px;
		margin-top: 80upx;
	}

	.bottom {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 200upx;
	}

	.content {
		width: 35%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid #DE2910;
		font-size: 15px;
		color: #DE2910;
		padding: 12upx 0;
	}
</style>
