<template>
	<view class="contain">
		<image class="bg" src="https://oss.zhrsl.com/20200706185535A387.png"></image>
		<image class="logo" src="../../static/images/logo.png"></image>
		<view class="head">宇&nbsp;&nbsp;航&nbsp;&nbsp;云&nbsp;&nbsp;网</view>
		<view class="content">航天资讯、专家在线、供需对接、商家入驻</view>
		<view class="login">
			<button class="btns" style="margin-right: 40rpx;" open-type="getUserInfo" @getuserinfo="getuserinfos">
				<image src="../../static/images/youke.png"></image>
				<view>我是游客</view>
			</button>
			<button class="btns" open-type="getUserInfo" @getuserinfo="getuserinfos">
				<image src="../../static/images/vips.png"></image>
				<view>我是会员</view>
			</button>
		</view>
		<view class="call" v-if="show">
			<button class="phone" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号码</button>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	import WXBizDataCrypt from '../../common/WXBizDataCrypt.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				show: false,
				code: '',
				userInfo: {},
				session_key: '',
				phoneNumber: ''
			}
		},
		onLoad() {

		},
		methods: {
			getuserinfo(e) {
				console.log(e)
				console.log(e.detail.userInfo)
				let self = this
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.userInfo']) {
							//这里调用授权
							console.log("当前未授权")
						} else {
							console.log("授权")
							self.userInfo = e.detail.userInfo
							console.log(self.userInfo)
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes)
									self.code = loginRes.code
									self.show = true
									wx.request({
										url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx88deffbcececf498&secret=6e2d06e118da54b978e7d250e28822be&js_code=' +
											self.code + '&grant_type=authorization_code',
										method: 'POST',
										header: {
											'content-type': 'application/json'
										},
										success: function(r) {
											console.log(r)
											self.session_key = r.data.session_key
										}
									})
								},
								fail(err) {
									console.log(err)
								}
							})
						}
					}
				})
			},
			getuserinfos(e) {
				let self = this
				if (uni.getStorageSync('uid')) {
					this.login(uni.getStorageSync('uid'), uni.getStorageSync('rongYunToken'))
				} else {
					uni.getSetting({
						success(res) {
							if (!res.authSetting['scope.userInfo']) {
								//这里调用授权
								console.log("当前未授权")
							} else {
								console.log("授权")
								self.userInfo = e.detail.userInfo
								self.show = true
							}
						}
					})
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
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}, 500)
					}).catch(() => {
						Toast.hideLoading()
						Toast.showToast('登录失败')
					})
				})
			},
			getMessage() {
				let self = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						self.code = loginRes.code
						let data1 = {
							code: self.code,
							headImage: self.userInfo.avatarUrl,
							nickName: self.userInfo.nickName,
							phone: self.phoneNumber
						}
						let data = {
							url: '/api/wxLogin',
							data: data1,
							success: function(res) {
								console.log(res)
								if (res.data.result == 0) {
									uni.setStorageSync('uid', res.data.uid)
									uni.setStorageSync('rongYunToken', res.data.usersig)
									uni.setStorageSync('nick', res.data.nickName)
									uni.setStorageSync('icon', res.data.headImage)
									uni.setStorageSync('vip', res.data.vip)
									wx.$app.updateMyProfile({
										nick: uni.getStorageSync('nick'),
										avatar: uni.getStorageSync('icon')
									})
									setTimeout(() => {
										self.login(res.data.uid, res.data.usersig)
									}, 100)
									uni.reLaunch({
										url: '/pages/index/index'
									})
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.resultNote)
								}
							}
						}
						ajax(data)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			decryptPhoneNumber(e) {
				console.log(e)
				let self = this
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
					return
				} else {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes)
							self.code = loginRes.code
							// let pc = new WXBizDataCrypt('wx88deffbcececf498', self.session_key)
							// let datas = pc.decryptData(e.detail.encryptedData, e.detail.iv)
							let data2 = {
								code: self.code,
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData
							}
							let data = {
								url: '/api/bindPhone',
								data: data2,
								success: function(res) {
									console.log(res)
									if (res.data.result == 0) {
										self.show = false
										self.phoneNumber = res.data.phone
										self.getMessage()
									} else {
										Toast.showToast(res.data.resultNote)
									}
								}
							}
							ajax(data)
						},
						fail(err) {
							console.log(err)
						}
					})
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
		align-items: center;
		position: relative;

		.call {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.7);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 99;

			.phone {
				width: 60%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				border-radius: 4px;
				background: #0081FF;
				border: none;
				position: inherit;
			}
		}

		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
		}

		.logo {
			width: 170rpx;
			height: 170rpx;
			z-index: 10;
			margin-top: 140rpx;
		}

		.head {
			width: 100%;
			text-align: center;
			font-size: 60rpx;
			color: #fff;
			z-index: 10;
			margin: 30rpx 0;
		}

		.content {
			width: 100%;
			text-align: center;
			font-size: 32rpx;
			color: #fff;
			z-index: 10;
			margin: 0 0 30rpx;
		}

		.login {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10;
			margin-top: 40rpx;
			position: relative;

			.btns {
				padding: 20rpx 40rpx;
				border: 2px solid #fff;
				border-radius: 4px;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				color: #fff;
				background: none;
				position: inherit;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 24rpx;
				}
			}
		}
	}
</style>
