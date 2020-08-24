<template>
	<view class="contain">
		<view class="top">
			<image class="bg" src="../../static/images/bg.png" alt=""></image>
			<image class="logo" src="../../static/images/logo.png" alt=""></image>
		</view>
		
		<view class="forms">
			<view class="call">
				<image src="../../static/images/shoujihao.png" alt="" style="width: 40rpx;height: 40rpx;margin-right: 66rpx;"></image>
				<input type="text" v-model="call" placeholder="请输入手机号" cursor-spacing="200">
			</view>
			<view class="call">
				<image src="../../static/images/yanzhengma.png" alt=""></image>
				<input type="password" v-model="pass" placeholder="请输入密码" cursor-spacing="150">
			</view>
			<view class="call" style="border-bottom: none;color: #999;" @tap="goForget">忘记密码？</view>
		</view>
		<view class="btns" @click="goIndex">登录</view>
		<view class="content">
			<image @click="goRead" :src="check ? '../../static/images/checked.png' : '../../static/images/check.png'" alt=""></image>
			<view @click="goAgree" class="mark">我已阅读并同意<span>《旗云员工绩效系统用户协议》</span></view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				call: '',
				pass: '',
				check: true,
				version: ''
			}
		},
		onShow() {
			let self = this
			plus.runtime.getProperty(plus.runtime.appid, function(info) {
				uni.setStorageSync('appversion', info.version)
				self.version = info.version
			})
			uni.setStorageSync('os', uni.getSystemInfoSync().platform)
			uni.setStorageSync('osversion', uni.getSystemInfoSync().system)

			if (uni.getStorageSync('call')) {
				this.call = uni.getStorageSync('call')
			}

			if (uni.getStorageSync('pass')) {
				this.pass = uni.getStorageSync('pass')
			}

			// if (uni.getStorageSync('token')) {
			// 	uni.redirectTo({
			// 		url: '/pages/index/index'
			// 	})
			// }
		},
		methods: {
			goRead() {
				this.check = !this.check
			},
			goIndex() {
				let self = this
				if (this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				}

				if (!this.check) {
					Toast.showToast('请勾选协议')
					return
				}

				let datas = {
					account: this.call,
					password: this.pass,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: self.version
				}
				Toast.showLoading('登陆中...', function() {
					let data = {
						url: '/api/CompanyUser/login',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								uni.setStorageSync('token', res.data.Customerdata.token)
								uni.setStorageSync('call', self.call)
								uni.setStorageSync('pass', self.pass)
								uni.setStorageSync('apisecret', res.data.Customerdata.apisecret)
								uni.redirectTo({
									url: '/pages/index/index'
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			goAgree() {
				uni.navigateTo({
					url: '/pages/read/read'
				})
			},
			goForget() {
				if (uni.getStorageSync('id')) {
					uni.navigateTo({
						url: '/pages/modify/modify'
					})
				} else {
					Toast.showToast('使用本系统前请联系客服人员开户')
				}
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
		overflow: hidden;

		.top {
			width: 100%;
			height: 466upx;
			position: relative;

			.bg {
				width: 100%;
				height: 100%;
			}

			.logo {
				position: absolute;
				left: 50%;
				bottom: -120upx;
				width: 260upx;
				height: 260upx;
				margin-left: -120upx;
			}
		}

		.forms {
			width: 80%;
			margin: 150upx auto 60upx;
			display: flex;
			flex-direction: column;

			.call {
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333;
				border-bottom: 1px solid #eee;

				image {
					width: 46upx;
					height: 46upx;
					margin-right: 60upx;
				}
			}
		}

		.btns {
			width: 80%;
			height: 90upx;
			line-height: 90upx;
			text-align: center;
			font-size: 14px;
			color: #FFFFFF;
			border-radius: 4px;
			background: #00AAEF;
			margin: 0 auto;
		}

		.content {
			width: 80%;
			margin: 100upx auto 0;
			display: flex;
			align-items: center;

			image {
				width: 40upx;
				height: 40upx;
				margin-right: 20upx;
			}

			.mark {
				font-size: 12px;
				color: #333;

				span {
					color: #00AAEF;
				}
			}
		}
	}
</style>
