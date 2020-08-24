<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">找回密码</block>
			</cu-custom>
		</view>
		<div class="forms">
			<div class="common">
				<input v-model="call" type="text" placeholder="请输入手机号" />
			</div>
			<div class="common" style="padding-right: 0;">
				<input v-model="code" type="text" placeholder="验证码" />
				<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
			</div>
			<div class="common">
				<input v-model="pass" type="password" placeholder="请设置登录密码" />
			</div>
			<div class="common">
				<input v-model="surePass" type="password" placeholder="请再次输入登录密码" />
			</div>
		</div>
		<div class="login" @click="goSubmit">提交</div>
	</view>
</template>

<script>
	import cmdNavBar from "../../components/cmd-nav-bar/cmd-nav-bar.vue"
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				call: '',
				code: '',
				validateCode: '',
				pass: '',
				surePass: '',
				btnState: false,
				rTime: '获取验证码',
				type: true
			}
		},
		components: {
			cmdNavBar
		},
		methods: {
			checkboxChange() {
				
			},
			getValidate() {
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				let self = this
				let datas = {
					mobilePhone: this.call
				}
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
				
				//获取验证码
				let data1 = {
					cmd: 'getValidateCode',
					phone: this.call
				}
				Toast.showLoading('发送中...', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('发送成功')
								self.validateCode = res.data.code
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goSubmit() {
				let self = this
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				if (this.code == '') {
					Toast.showToast('验证码不能为空')
					return
				}
				
				// if(this.code != this.validateCode) {
				// 	Toast.showToast('验证码不正确')
				// 	return
				// }

				if (this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				} else if (this.pass.length < 6) {
					Toast.showToast('密码长度不能少于6位')
					return
				}

				if (this.surePass != this.pass) {
					Toast.showToast('两次输入密码不一致')
					return
				}
				
				//忘记密码
				let data1 = {
					cmd: 'forgetPwd',
					phone: this.call,
					password: this.pass,
					code: this.code
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		
		.fixed {
			width: 100%;
		}

		.forms {
			width: 92%;
			display: flex;
			flex-direction: column;
			
			.common {
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #eee;
				padding: 0 10upx;
				box-sizing: border-box;
				margin-bottom: 20upx;
			}
			
			.common>input {
				font-size: 14px;
				color: #333;
			}
			
			.codes {
				height: 60upx;
				line-height: 60upx;
				background: #FF6600;
				border-radius: 40upx;
				font-size: 14px;
				color: #FFFFFF;
				margin: 0;
			}
		}

		.login {
			width: 80%;
			height: 90upx;
			line-height: 90upx;
			border-radius: 40upx;
			background: #FF6600;
			text-align: center;
			font-size: 15px;
			color: #FFFFFF;
			margin-top: 40upx;
		}
	}
</style>
