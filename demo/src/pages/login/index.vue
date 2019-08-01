<template>
	<div class="first">
		<img class="bg" src="../../../static/images/background.png" alt="">
		<div class="contain">
			<div style="padding: 20px;" @click="goHome">Home</div>
			<div class="logo-auth" style="">
				<img src="../../../static/images/logobig.png" @click="changeServer" alt="">
			</div>
			<div class="formData">
				<div class="phone">
					<div class="left" @click="popup">{{countrys}} ></div>
					<input v-model="telephone" class="phonePut" type="text" placeholder="请输入手机号">
				</div>
				<div class="pass">
					<div class="passleft">密码 ></div>
					<input v-model="password" class="phonePut" type="password" placeholder="请输入密码">
				</div>
				<mp-button type="primary" size="normal" :disabled="checkData" btnClass="sub" @click="login">登录</mp-button>
			</div>
			<div class="choice">
				<span @click="goForget">忘记密码</span>
				<span @click="goRegister">新用户注册</span>
			</div>
			<div style="margin-top: 4%; color:grey;">
				<div style="margin-left: 15%;">————<span style="margin-left: 17%; color:green">或</span><span style="margin-left: 15%;">————</span>
				</div>
			</div>
			<div class="wx" @click="wechatLogin">
				<img src="../../../static/images/WeChat.png" alt="">
				<span>微信登录</span>
			</div>
			<mp-picker ref="mpPicker" :pickerValueArray="list1" @onConfirm="sure"></mp-picker>
			<mp-toast type="success" v-model="validateSuc" content="登录成功" duration="1500"></mp-toast>
			<mp-toast type="warn" v-model="validateError" content="登录失败" duration="1500"></mp-toast>
			<mp-toast type="warn" v-model="loginWarn" content="登陆中..." duration="1500"></mp-toast>
		</div>
		<div class="dialog" v-if="admin">
			<div class="content">
				<h3>Please enter your password</h3>
				<input type="number" v-model="num">
				<div class="btns">
					<div style="color: #333;border-right: 1px solid #eee;" @click="onCancel">取消</div>
					<div @click="onConfirm">确定</div>
				</div>
			</div>
		</div>
		<div class="dialog" v-if="showChangeServer">
			<div class="con">
				<serverForm @update="showChangeServer = false" :uat="false"></serverForm>
			</div>
		</div>
		<div class="dialog" v-if="showChangeServerAdmin">
			<div class="con">
				<serverForm @update="showChangeServerAdmin = false" :uat="true"></serverForm>
			</div>
		</div>
		<div class="lowerRight" @click="choose">

		</div>
	</div>
</template>

<script>
	import mpPicker from 'mpvue-weui/src/picker'
	import mpButton from 'mpvue-weui/src/button'
	import utli from '@lib/Utli'
	import mobilePhone from '@lib/MoiblePhone'
	import mpToast from 'mpvue-weui/src/toast'
	import serverForm from '@/components/ServerForm'

	export default {
		data() {
			return {
				admin: false,
				show: false,
				msg: 'Hello World!',
				telephone: '',
				password: '',
				showLoading: false,
				list1: [{
					label: '中国 +86'
				}, {
					label: '澳大利亚 +61'
				}],
				country: ['中国 +86'],
				countrys: '中国 +86',
				clickTimes: 0,
				timer: null,
				showChangeServer: false,
				showChangeServerAdmin: false,
				errorshow: false,
				counts: 0,
				chooses: false,
				uat: false,
				validateSuc: false,
				validateError: false,
				loginWarn: false,
				num: ''
			}
		},
		computed: {
			checkData() {
				var disableSubmit = true
				if (this.telephone && this.password) {
					disableSubmit = false
				}
				return disableSubmit
			}
		},
		methods: {
			changeServer() {
				this.clickTimes++
				if (!this.timer) {
					this.timer = setTimeout(() => {
						this.clickTimes = 0
						this.timer = null
					}, 4000)
				}
				if (this.clickTimes > 10) {
					this.clickTimes = 0
					this.timer = null
					this.admin = true
				}
			},
			onCancel() {
				this.admin = false
			},
			onConfirm() {
				if (this.chooses === true) {
					if (this.num === '111111') {
						this.admin = false
						this.chooses = false
						this.showChangeServerAdmin = true
					} else {
						this.errorshow = true
					}
				} else {
					if (this.num === '888888') {
						this.admin = false
						this.showChangeServer = true
						this.num = ''
					} else {
						this.errorshow = true
					}
				}
			},
			choose() {
				this.counts += 1
				console.log(this.counts)
				if (this.counts === 6) {
					this.counts = 0
					this.chooses = true
					this.admin = true
				}
			},
			popup() {
				this.$refs.mpPicker.show();
			},
			sure(item) {
				this.countrys = item.label
				this.country[0] = item.label
			},
			goForget() {
				this.$router.push('../forget/main')
			},
			goRegister() {
				this.$router.push('../register/main')
			},
			goHome() {
				this.$router.push({
					path: '/pages/index/main',
					reLaunch: true
				})
			},
			login() {
				this.showLoading = true
				let self = this
				let server = utli.getServerByStore(this.$store)
				let requestUrl = this.$store.getters['configs/getApiList'].core_customer + '/v2/login'
				let apiUrl = this.$store.getters['server/getEndpoint'] + requestUrl
				let code = this.country[0].split(' ')[1]
				code = code === '+86' ? 'CN' : 'AU'
				console.log(this.telephone, code)
				let mobile = mobilePhone.mobileNumberOutputWithCountryCode(this.telephone, code)
				console.log(mobile)
				let postData = {
					'mobile_international': mobile,
					'company': server.company_uuid,
					'password': this.password,
					'deviceId': this.$store.getters['account/getDeviceId'],
					'in_app': true
				}
				wx.request({
					url: apiUrl,
					method: 'POST',
					data: JSON.stringify(postData),
					header: {
						'Authorization': '',
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if (res.data.code === 200) {
							self.loginSuccess(res)
							self.validateSuc = true
							self.telephone = ''
							self.password = ''
						} else {
							self.validateError = true
						}
					},
					fail() {
						self.warnError = true
					}
				})
			},
			wechatLogin() {
				let self = this
				wx.login({
					success: res => {
						wx.getSetting({
							success(setRes) {
								// 判断是否已授权  
								if (!setRes.authSetting['scope.userInfo']) {
									// 授权访问  
									self.$router.push('../auther/main')
								} else {
									wx.getUserInfo({
										success: resqu => {
											// 可以将 res 发送给后台解码出 unionId
											console.log(res.code)
											console.log(resqu)
											self.wechatSuccess(resqu, res.code)
										}
									})
								}
							}
						})
					}
				})
			},
			wechatSuccess(response, code) {
				this.loginWarn = true
				let state = '_' + (+new Date())
				let self = this
				let server = utli.getServerByStore(this.$store)
				let datas = {
					encryptedData: response.encryptedData,
					iv: response.iv,
					rawData: response.rawData,
					signature: response.signature
				}
				let postData = {
					'state': state,
					'code': code,
					'company': server.company_uuid,
					'deviceId': this.$store.getters['account/getDeviceId'],
					'response': response,
					'in_app': true,
					'is_applet': true,
					'user_info': datas
				}
				let requestUrl = this.$store.getters['configs/getApiList'].core_social_media_wechat + '/wechat'
				let apiUrl = this.$store.getters['server/getEndpoint'] + requestUrl
				wx.request({
					url: apiUrl,
					method: 'POST',
					data: JSON.stringify(postData),
					header: {
						'Authorization': '',
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						console.log(res, '看看有数据吗')
						self.loginSuccess(res)
					},
					fail() {
						console.log(res, '失败的原因')
					}
				})
			},
			loginSuccess(response) {
				let self = this
				if (response.data.data.mobile === undefined || response.data.data.mobile === null || response.data.data.mobile ==='') {
					this.loginWarn = false
					this.$router.push({
						path: '../bindMobile/main',
						query: {
							token: response.data.data.token
						}
					})
				} else {
					this.loginWarn = false
					this.$store.dispatch('account/SAVE_ACCOUNT', {
						account: response.data,
						cb: () => {
							self.redirectCheck()
						}
					})
				}
				this.showLoading = false
			},
			redirectCheck() {
				let page = this.$store.getters['page/getPage']
				if(this.$route.query.uuid){
					page.query = this.$route.query.uuid
				}
				if (page) {
					utli.goToUrl(this.$router, page, 'push')
					this.$store.commit('page/CLEAR_REDIRECT')
				} else {
					this.$router.push({
						path: '../index/main'
					})
				}
			},
			loginFail() {
				this.showLoading = false
			}
		},
		components: {
			mpPicker,
			mpButton,
			mpToast,
			serverForm
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
	}

	.logo-auth img {
		width: 220rpx;
		height: 220rpx;
	}

	.formData {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.phone,
	.pass {
		width: 90%;
		height: 90rpx;
		border: 3px solid #eee;
		border-radius: 20px;
		margin-top: 36rpx;
		overflow: hidden;
		padding: 0 28rpx;
		box-sizing: border-box;
		display: flex;
	}

	.left {
		width: 40%;
		height: 100%;
		font-size: 30rpx;
		color: #333;
		display: flex;
		align-items: center;
	}

	.passleft {
		width: 25%;
		height: 100%;
		font-size: 30rpx;
		color: #333;
		display: flex;
		align-items: center;
	}

	.phonePut {
		width: 55%;
		height: 100%;
		font-size: 30rpx;
		color: #333;
		display: flex;
		align-items: center;
		outline: none;
		border: none;
	}

	button.sub {
		width: 90%;
		height: 80rpx;
		background: green;
		font-size: 32rpx;
		color: #fff;
		border-radius: 20px;
		margin-top: 36rpx;
	}

	.wx {
		width: 90%;
		height: 80rpx;
		background: darkgreen;
		font-size: 32rpx;
		color: #fff;
		border-radius: 20px;
		margin-top: 36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 50rpx auto;
	}

	.wx img {
		width: 44rpx;
		height: 36rpx;
		margin-right: 12rpx;
	}

	.wx span {
		font-size: 32rpx;
		color: #fff;
	}

	.choice {
		margin: 16rpx auto;
		width: 88%;
		display: flex;
		justify-content: space-between;
	}

	.choice span {
		font-size: 30rpx;
		color: #999;
	}

	.dialog {
		position: absolute;
		z-index: 1000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .8);
	}

	.content {
		width: 80%;
		height: 160px;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -40%;
		margin-top: -80px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.content h3 {
		font-size: 15px;
		color: #333;
		margin-top: 0.3rem;
	}

	.content input {
		width: 80%;
		height: 0.6rem;
		border: 1px solid #eee;
		border-radius: 8px;
		padding: 0 12px;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
	}

	.btns {
		width: 100%;
		border-top: 1px solid #eee;
		display: flex;
		height: 0.8rem;
	}

	.btns>div {
		width: 50%;
		height: 0.8rem;
		line-height: 0.8rem;
		color: green;
		font-size: 15px;
		text-align: center;
	}

	.lowerRight {
		height: 10%;
		width: 20%;
		position: fixed;
		bottom: 0px;
		right: 0px;
	}

	.con {
		width: 80%;
		height: 6rem;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 10000;
		background: #fff;
		margin-left: -40%;
		margin-top: -3rem;
	}
</style>
