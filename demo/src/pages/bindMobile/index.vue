<template>
	<div class="first">
		<img class="bg" src="../../../static/images/background.png" alt="">
		<div class="contain">
			<div class="logo-auth" style="">
				<img src="../../../static/images/logobig.png" alt="">
			</div>
			<div class="formList">
				<div style="width: 100%;border-bottom: 1px solid #eee;display: flex;align-items: center;">
					<div class="list_label" @click="popup">{{countrys}}</div>
					<input v-model="telphone" type="tel" placeholder="请输入手机号">
				</div>
			</div>
			<div class="formList">
				<div class="codeleft">
					<div class="list_label">验证码</div>
					<input v-model="captcha" type="text" placeholder="请输入短信验证码">
				</div>
				<div class="coderight">
					<mp-button type="primary" size="small" btnClass="mb15" :disabled="checkCode" @click="requestCode">
						发送验证码
					</mp-button>
					<span style="font-size: 14px; color: #999;" v-if="sendMsgDisabled">({{rTime}} s)</span>
				</div>
			</div>
			<mp-button type="primary" size="mormal" :disabled="checkData" @click="onRegister" btnClass="mb">绑定</mp-button>
			<mp-picker ref="mpPicker" :pickerValueArray="list1" @onConfirm="sure"></mp-picker>
			<mp-toast type="success" v-model="showSuc" content="发送验证码成功" duration="1500"></mp-toast>
			<mp-toast type="warn" v-model="showWarn" content="发送验证码失败,请稍后再试" duration="1500"></mp-toast>
			<mp-toast type="warn" v-model="validatePhone" content="手机号格式不正确" duration="1500"></mp-toast>
			<mp-toast type="success" v-model="validateSuc" content="绑定成功" duration="1500"></mp-toast>
			<mp-toast type="warn" v-model="warnMsg" :content="message" duration="1500"></mp-toast>
			<mp-toast type="warn" v-model="warnError" :content="绑定失败" duration="1500"></mp-toast>
		</div>
	</div>
</template>

<script>
	import mpPicker from 'mpvue-weui/src/picker'
	import mpButton from 'mpvue-weui/src/button';
	import sms from '@lib/Sms'
	import utli from '@lib/Utli'
	import mobilePhone from '@lib/MoiblePhone'
	import mpToast from 'mpvue-weui/src/toast';

	export default {
		data() {
			return {
				telphone: '',
				captcha: '',
				country: ['中国 +86'],
				countrys: '中国 +86 >',
				list1: [{
					label: '中国 +86'
				}, {
					label: '澳大利亚 +61'
				}],
				rTime: 60, // 发送验证码倒计时
				sendMsgDisabled: false, // 发送验证码按钮状态,
				showSuc: false,
				showWarn: false,
				validatePhone: false,
				message: '',
				validateSuc: false,
				warnMsg: false,
				warnError: false
			}
		},
		computed: {
			checkCode() {
				let disableSubmit = true
				if (!this.sendMsgDisabled && this.telphone && this.telphone !== '' && this.telphone.length > 5) {
					disableSubmit = false
				}
				return disableSubmit
			},
			checkData() {
				let disableSubmit = true
				if (this.telphone && this.captcha) {
					disableSubmit = false
				}
				return disableSubmit
			}
		},
		components: {
			mpPicker,
			mpButton,
			mpToast
		},
		mounted() {
			console.log(this.$route.query,'小token在哪里')
		},
		methods: {
			popup() {
				this.$refs.mpPicker.show();
			},
			sure(item) {
				this.country[0] = item.label
				this.countrys = item.label
			},
			requestCode() {
				let self = this
				console.log(this.telphone)
				sms.requestCode(
					this.$store,
					this.telphone,
					(data) => {
						this.showSuc = true
					},
					(e) => {
						this.showWarn = true
					}
				)
				this.sendMsgDisabled = true
				let rTime = this.rTime
				let interval = setInterval(() => {
					if (--self.rTime <= 0) {
						self.rTime = rTime
						self.sendMsgDisabled = false
						clearInterval(interval)
					}
				}, 1000)
			},
			onRegister() {
				if (this.telphone == '' || this.telphone.length <= 5) {
					this.validatePhone = true
					return
				}

				var that = this
				let code = this.country[0] === '中国 +86' ? 'CN' : 'AU'
				let data = {
					mobile: this.telphone,
					mobile_international: mobilePhone.mobileNumberOutputWithCountryCode(this.telphone, code),
					captcha: this.captcha,
					wechat: true
				}
				let endpoint = this.$store.getters['server/getEndpoint']
				let api = this.$store.getters['configs/getApiList'].customer_api_endpoint + '/update'
				let apiurl = endpoint + api
				console.log(this.$route.query,'小token在哪里')
				let token = this.$route.query.token
				data = JSON.stringify(data)
				console.log(data,token,'看看有东西吗')
				wx.request({
					url: apiurl,
					method: 'POST',
					data: data,
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if (res.data.code === 200) {
							that.validateSuc = true
							that.$store.dispatch('account/SAVE_ACCOUNT', {
								account: res.data,
								cb: () => {
									that.redirectCheck()
								}
							})
						} else {
							that.message = res.data.message
							that.warnMsg = true
						}
					},
					fail() {
						this.warnError = true
					}
				})
			},
			redirectCheck() {
				let page = this.$store.getters['page/getPage']
				if (page) {
					utli.goToUrl(this.$router, page, 'push')
					this.$store.commit('page/CLEAR_REDIRECT')
				} else {
					this.$router.push('../index/main')
				}
			},
			goHome() {
				this.$router.push('../index/main')
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.first {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.bg {
		width: 100%;
		height: 100%;
	}

	.contain {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.logo-auth {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50rpx 50rpx 150rpx;
		box-sizing: border-box;
	}

	.logo-auth img {
		width: 220rpx;
		height: 220rpx;
	}

	.code {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.codeleft {
		width: 60%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.coderight {
		width: 35%;
		height: 43px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	button.mb {
		width: 90%;
		margin: 50rpx 5%;
		height: 64rpx;
		line-height: 64rpx;
		font-size: 32rpx;
		text-align: center;
		border-radius: 6px;
	}

	.pick {
		position: absolute;
		top: 0;
		left: 0;
		width: 20%;
		height: 44px;
		z-index: 100;
	}

	.formList {
		width: 100%;
		height: 44px;
		display: -webkit-flex;
		display: flex;
		padding: 0 15px;
		box-sizing: border-box;
		line-height: 24px;
		position: relative;
		background-color: #fff;
		color: #333;
		font-size: 14px;
		margin-bottom: 30px;
	}

	.list_label {
		max-width: 90px;
		min-width: 90px;
		flex: 1;
	}
</style>
