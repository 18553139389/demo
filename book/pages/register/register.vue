<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :isIcons="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @Back="Back">
				<block slot="backText"></block>
				<block slot="content">注册用户</block>
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
				<input style="width: 80%;" v-model="nick" type="nick" placeholder="昵称只能是汉字且不能超过5个" />
			</div>
			<div class="common">
				<input v-model="pass" type="password" placeholder="请设置登录密码" />
			</div>
			<div class="common">
				<input v-model="surePass" type="password" placeholder="请再次输入登录密码" style="width: 80%;" />
			</div>
			<image class="add" src="../../static/images/add.png" @tap="goHead" v-if="!head"></image>
			<div class="icon" v-if="head">
				<image class="heads" :src="head"></image>
				<div class="red" @tap="goDel">X</div>
			</div>
			<div class="content">
				<jiuaiCheckbox @change='changeBox' :checked="type" :fontSize="24" :color="color" :borderStyle="borderStyle"></jiuaiCheckbox>
				<div class="read" @tap="goAgree">我已阅读并同意<span style="color:#FF6600;">《易淘商城用户协议》</span></div>
			</div>
		</div>
		<div class="login" @click="goSubmit">注册</div>
	</view>
</template>

<script>
	import cmdNavBar from "../../components/cmd-nav-bar/cmd-nav-bar.vue"
	import jiuaiCheckbox from "../../components/jiuai-checkbox/jiuai-checkbox.vue"
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
				type: true,
				color: '#FF6600',
				borderStyle: '1px solid #FF6600',
				pid: '',
				nick: '',
				head: ''
			}
		},
		onLoad(option) {
			this.pid = option.uid
		},
		components: {
			cmdNavBar,
			jiuaiCheckbox
		},
		methods: {
			changeBox(e) {
				this.type = e.detail.checked
			},
			getValidate() {
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				let self = this

				//验证手机号是否存在
				let data2 = {
					cmd: "phoneRegister",
					phone: this.call
				}

				let data3 = {
					data: data2,
					success: function(res) {
						if (res.data.result == 0) {
							if (res.data.isregister == 0) {
								let datas = {
									mobilePhone: this.call
								}
								self.rTime = 60
								let rTime = self.rTime
								self.btnState = true
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
									phone: self.call,
									type: 1
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
							} else {
								Toast.showToast('该手机号已被注册')
							}
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data3)
			},
			Back() {
				uni.redirectTo({
					url: '/pages/login/login?uid=' + this.uid
				})
			},
			goSubmit() {
				let self = this
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				if (this.code == '') {
					Toast.showToast('验证码不能为空')
					return
				}

				// if (this.code != this.validateCode) {
				// 	Toast.showToast('验证码不正确')
				// 	return
				// }

				if (!(/^([\u2E80-\u9FFF]){1,5}$/.test(this.nick))) {
					Toast.showToast('昵称格式不正确')
					return
				}

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
				
				if (!this.head) {
					Toast.showToast('请上传头像')
					return
				}

				if (!this.type) {
					Toast.showToast('请勾选协议')
					return
				}

				//注册账号
				let datas = {
					cmd: 'userRegister',
					phone: self.call,
					password: self.pass,
					nickname: self.nick,
					pid: self.pid,
					icon: self.head,
					code: this.code
				}
				Toast.showLoading('', function(re) {
					let data = {
						data: datas,
						success: function(re) {
							if (re.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('注册成功')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login?uid=' + self.uid
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(re.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goAgree() {
				uni.navigateTo({
					url: '/pages/agree/agree'
				})
			},
			goDel() {
				this.head = ''
			},
			goHead() {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						console.log(res)
						// 预览图片
						Toast.showLoading('上传中...', function() {
							uni.uploadFile({
								url: 'https://www.ytsh.vip/easyamoy/api/uploadFile',
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {
									Toast.hideLoading()
									let obj = JSON.parse(uploadFileRes.data)
									self.head = obj.dataobject
								},
								fail: (res) => {
									Toast.hideLoading()
									Toast.showToast('上传失败')
								}
							})
						})
					},
					fail: function(res) {
						Toast.hideLoading()
						Toast.showToast('上传失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	input:-webkit-autofill {
		background-color: #FFFFFF;
		background-image: none;
	}

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
			
			.add {
				width: 80rpx;
				height: 80rpx;
				margin: 24rpx 0;
			}
			
			.icon {
				width: 80rpx;
				height: 80rpx;
				position: relative;
				margin: 24rpx 0;
				
				.heads {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				
				.red {
					width: 32rpx;
					height: 32rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					background: red;
					font-size: 12px;
					color: #fff;
					position: absolute;
					top: -10rpx;
					right: -16rpx
				}
			}
			
			.head {
				font-size: 14px;
				color: #666;
			}

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

			.content {
				display: flex;
				align-items: center;
				font-size: 12px;
				color: #333;
				margin: 24upx 0 40upx;

				.read {
					margin-left: 20upx;
				}
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
