<template>
	<view class="contain">
		<image class="logo" src="../../static/images/pic.png"></image>
		<view class="forms">
			<view class="item">
				<image src="../../static/images/call.png" style="width: 36rpx;height: 40rpx;"></image>
				<input type="text" v-model="call" placeholder="请输入手机号">
			</view>
			<view class="item" style="margin-top: 60rpx;">
				<image src="../../static/images/pass.png" style="width: 36rpx;height: 40rpx;"></image>
				<input type="password" v-model="pass" placeholder="请输入密码">
			</view>
			<view class="warn">
				<view class="warn-left">
					<view @tap="goRegister">立即注册</view>
					<image src="../../static/images/question.png"></image>
				</view>
				<view class="find" @tap="goForget">找回密码</view>
			</view>
			<view class="btn" @tap="goLogin">登录</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				call: '',
				pass: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				if (uni.getStorageSync('uid')) {
					this.call = uni.getStorageSync('call')
					this.pass = uni.getStorageSync('pass')
					this.login(uni.getStorageSync('uid'), uni.getStorageSync('rongYunToken'))
				}
			},
			login(userID, userSig) {
				Toast.showLoading('登录中...', function() {
					wx.$app.login({
						userID,
						userSig
					}).then(() => {
						Toast.hideLoading()
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 500)
					}).catch(() => {
						Toast.hideLoading()
						Toast.showToast('登录失败')
					})
				})
			},
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			goForget() {
				uni.navigateTo({
					url: '/pages/forget/forget'
				})
			},
			goLogin() {
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				if (this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				}
				let self = this
				let data1 = {
					cmd: 'userLogin',
					phone: this.call,
					password: md5(this.pass)
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()

								if (res.data.type == 2) {
									Toast.showToast('小程序不能登录专家端')
									return
								} else {
									// Toast.showToast('登陆成功')
									uni.setStorageSync('uid', res.data.uid)
									uni.setStorageSync('rongYunToken', res.data.rongYunToken)
									uni.setStorageSync('nick', res.data.nickname)
									uni.setStorageSync('icon', res.data.icon)
									uni.setStorageSync('call', self.call)
									uni.setStorageSync('pass', self.pass)
									setTimeout(() => {
										self.login(res.data.uid, res.data.rongYunToken)
									},100)
								}
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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo {
			width: 180rpx;
			height: 180rpx;
			border-radius: 4px;
			margin-top: 200rpx;
		}

		.forms {
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-top: 100rpx;

			.item {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;

				input {
					width: 75%;
					height: 90rpx;
					margin-left: 24rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #333;
				}
			}

			.warn {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 40rpx;

				.warn-left {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;

					image {
						margin-left: 24rpx;
						width: 36rpx;
						height: 36rpx;
					}
				}

				.find {
					font-size: 28rpx;
					color: #FE5063;
				}
			}

			.btn {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				font-weight: 600;
				border-radius: 4px;
				background: #06A5C4;
				margin-top: 140rpx;
			}
		}
	}
</style>
