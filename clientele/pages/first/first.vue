<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content"></block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="box">
				<view class="titles">你暂未获取微信授权，将无法正常使用小程序功能，如果正常使用，请点击“授权登陆”按钮，打开头像、昵称等信息的授权</view>
				<view class="btns">
					<view class="btn1" @tap="goLogin">暂不授权</view>
					<button class="btn2" open-type="getUserInfo" @getuserinfo="getuserinfos">授权登陆</button>
				</view>
			</view>
			<view class="call" v-if="show">
				<button class="phone" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号码</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import WXBizDataCrypt from '../../common/WXBizDataCrypt.js'
	export default {
		data() {
			return {
				Color: '#333',
				userInfo: {},
				code: '',
				session_key: '',
				show: false
			}
		},
		onLoad() {
			if(uni.getStorageSync('uid')) {
				uni.switchTab({
				    url: '/pages/index/index'
				})
			}
		},
		methods: {
			getuserinfos(e) {
				let self = this
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
							nickName: self.userInfo.nickName,
							avatarUrl: self.userInfo.avatarUrl,
							pid:uni.getStorageSync('pid')||''
						}
						let data = {
							url: 'login',
							data: data1,
							success: function(res) {
								console.log(res)
								if (res.data.result == 0) {
									uni.setStorageSync('uid', res.data.uid)
									uni.reLaunch({
										url: '/pages/call/call'
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
				let self = this
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
					return
				} else { //允许授权  
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes)
							self.code = loginRes.code
							let data1 = {
								code: self.code,
								encryptedData: e.detail.encryptedData,
								iv: e.detail.iv
							}
							let data = {
								url: 'getPhoneNum',
								data: data1,
								success: function(res) {
									console.log(res)
									if (res.data.result == 0) {
										uni.setStorageSync('phone',res.data.phone)
										self.show = false
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
			},
			goLogin() {
				uni.switchTab({
				    url: '/pages/index/index'
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
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			justify-content: center;
			
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
			
			.box {
				width: 90%;
				border-radius: 4px;
				background: #FFFFFF;
				padding: 28rpx;
				box-sizing: border-box;
				box-shadow: 0 -1px 5px rgba(0,0,0,.2);
				display: flex;
				flex-direction: column;
				margin-top: 320rpx;
				
				.titles {
					width: 100%;
					font-size: 26rpx;
					color: #666;
					text-align: justify;
					line-height: 20px;
				}
				
				.btns {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					margin-top: 30rpx;
					
					.btn1 {
						height: 70rpx;
						line-height: 70rpx;
						padding: 0 28rpx;
						border-radius: 4px;
						border: 1px solid #eee;
					}
					
					.btn2 {
						height: 70rpx;
						line-height: 70rpx;
						padding: 0 28rpx;
						border-radius: 4px;
						border: 1px solid #eee;
						font-size: 28rpx;
						color: #fff;
						background: green;
						margin: 0;
					}
				}
			}
		}
	}
</style>
