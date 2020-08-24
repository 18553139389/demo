<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">净水器小程序师傅端</block>
			</cu-custom>
		</view>
		<image class="bg" src="https://weixiu.lixinapp.com/app/service/common/login/image" mode="scaleToFill"></image>
		<view class="forms">
			<view class="item">
				<input type="text" v-model="call" placeholder="请输入员工号或手机号" style="margin-bottom: 40upx;">
				<input type="password" v-model="pass" placeholder="请输入密码">
			</view>
			<view class="login" @tap="goLogin">登陆</view>
			<view class="mark">
				<view @tap="goForget">忘记密码</view>
				<view @tap="goRegister">注册</view>
			</view>
			<view class="content">
				<jiuaiCheckbox @change='changeBox' :checked="type" :fontSize="20" :color="color" :borderStyle="borderStyle"></jiuaiCheckbox>
				<view style="margin-left: 12upx;" @tap="goAgree">我已阅读并同意《维修师傅协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import jiuaiCheckbox from "../../components/jiuai-checkbox/jiuai-checkbox.vue"
	export default {
		data() {
			return {
				Color: '#333',
				call: '',
				pass: '',
				type: true,
				color: '#FF6600',
				borderStyle: '1px solid #FF6600',
				wxCode: ''
			}
		},
		components: {
			jiuaiCheckbox
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						self.wxCode = loginRes.code
						let data1 = {
							code: self.wxCode
						}
						Toast.showLoading('', function() {
							let data = {
								url: 'app/service/maintainer/login/byCode',
								data: data1,
								success: function(res) {
									console.log(res)
									Toast.hideLoading()
									if (res.data.success == true) {
										uni.setStorageSync('uid', res.data.body.mid)
										if (res.data.body.maintainerAuditStatus == 1) {
											uni.navigateTo({
												url: '/pages/message/message'
											})
										} else if (res.data.body.maintainerAuditStatus == 2) {
											Toast.showToast('账号正在审核')
										} else if (res.data.body.maintainerAuditStatus == 3 && res.data.body.depositStatus == 0) {
											uni.navigateTo({
												url: '/pages/promise/promise'
											})
										} else if (res.data.body.maintainerAuditStatus == 3 && res.data.body.depositStatus == 1) {
											uni.switchTab({
												url: '/pages/order/order'
											})
										} else if (res.data.body.maintainerAuditStatus == 4) {
											uni.switchTab({
												url: '/pages/order/order'
											})
										} else if (res.data.body.maintainerAuditStatus == 5) {
											Toast.showToast('账号审核未通过')
										}
									}
								}
							}
							ajax(data)
						})
					}
				})
			},
			changeBox(e) {
				this.type = e.detail.checked
			},
			goAgree() {
				let self = this
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/common/protocols/maintainer/reg',
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								let title = encodeURIComponent('用户协议')
								let content = encodeURIComponent(res.data.body.content)
								uni.navigateTo({
								    url: `/pages/produce/produce?title=${title}&content=${content}`
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goRegister() {
				uni.getSetting({
					success(res) {
						// 判断scope后对应的scope.userInfo是否授权
						if (res.authSetting['scope.userInfo']) {
							// 如果已经授权,则执行后续操作
							uni.navigateTo({
								url: '/pages/register/register'
							})
						} else if (!res.authSetting['scope.userInfo']) {
							uni.navigateTo({
								url: '/pages/oauth/oauth'
							})
						}
					}
				})
			},
			goForget() {
				// if (!uni.getStorageSync('call')) {
				// 	Toast.showToast('请先去注册')
				// 	return
				// }
				uni.navigateTo({
					url: '/pages/forget/forget'
				})
			},
			goLogin() {
				let self = this
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				if (this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				}
				//消息推送授权
				uni.requestSubscribeMessage({
				  tmplIds: ['LMVqVdOmHjy5E9dBf8MqRBndqMhAAc8LeYVwtlCGARI','Wl9gX8snh4_-PNAEwChDNDnPA-S-3NTObHCI09G3vzY'],
				  success (res) { 
					  console.log(res)
				  },
				  complete(res) {
					  console.log(res)
				  }
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						self.wxCode = loginRes.code
						let data1 = {
							mobile: self.call,
							code: self.wxCode,
							password: self.pass
						}
						Toast.showLoading('', function() {
							let data = {
								url: 'app/service/maintainer/login',
								data: data1,
								success: function(res) {
									Toast.hideLoading()
									if (res.data.success == true) {
										uni.setStorageSync('uid', res.data.body.mid)
										if (res.data.body.maintainerAuditStatus == 1) {
											uni.setStorageSync('call', self.call)
											uni.navigateTo({
												url: '/pages/message/message'
											})
										} else if (res.data.body.maintainerAuditStatus == 2) {
											Toast.showToast('账号正在审核')
										} else if (res.data.body.maintainerAuditStatus == 3 && res.data.body.depositStatus == 0) {
											uni.setStorageSync('call', self.call)
											uni.navigateTo({
												url: '/pages/promise/promise'
											})
										} else if (res.data.body.maintainerAuditStatus == 3 && res.data.body.depositStatus == 1) {
											uni.setStorageSync('call', self.call)
											uni.switchTab({
												url: '/pages/order/order'
											})
										} else if (res.data.body.maintainerAuditStatus == 4) {
											uni.setStorageSync('call', self.call)
											uni.switchTab({
												url: '/pages/order/order'
											})
										} else if (res.data.body.maintainerAuditStatus == 5) {
											Toast.showToast('账号审核未通过')
										}
									} else {
										Toast.showToast(res.data.msg)
									}
								}
							}
							ajax(data)
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
		}

		.bg {
			width: 100%;
			height: 340upx;
		}

		.forms {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 60upx;

			.item {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 50upx 0 110upx;

				input {
					width: 70%;
					height: 70upx;
					border-radius: 30px;
					border: 1px solid #eee;
					font-size: 28upx;
					color: #333;
					padding: 0 30upx;
				}
			}

			.login {
				width: 70%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 30px;
				font-size: 28upx;
				color: #FFFFFF;
				background: #006EE3;
			}

			.mark {
				width: 70%;
				height: 90upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26upx;
				color: #666;
			}

			.content {
				width: 70%;
				display: flex;
				align-items: center;
				font-size: 26upx;
				color: #999;
				margin-top: 60upx;
			}
		}
	}
</style>
