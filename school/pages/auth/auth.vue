<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">授权登陆</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image src="../../static/images/logo.png"></image>
			<view class="titles">校园营养餐订购</view>
			<button class="btn" open-type="getUserInfo" @getuserinfo="getuserinfos">授权登陆</button>
			<view class="warn">仅供学校学生家长使用</view>
		</view>
		<view class="call" v-if="show">
			<button class="phone" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号码</button>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				code: '',
				show: false,
				userInfo: {}
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
							self.userInfo = e.detail.userInfo
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									self.code = loginRes.code
									let data1 = {
										code: self.code,
										nickname: self.userInfo.nickName
									}
									let data = {
										url: '/userLogin',
										data: data1,
										success: function(res) {
											uni.setStorageSync('uid', res.data.uid)
											if(res.data.phoneState == 0) {
												self.show = true
											} else {
												if(res.data.studentId) {
													uni.setStorageSync('studentId', res.data.studentId)
													uni.setStorageSync('student', res.data.studentName)
													uni.switchTab({
													    url: '/pages/index/index'
													})
												} else {
													uni.reLaunch({
													    url: '/pages/add/add'
													})
												}
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
							self.code = loginRes.code
							let data1 = {
								code: self.code,
								encryptedData: e.detail.encryptedData,
								iv: e.detail.iv
							}
							let data = {
								url: '/getPhoneNum',
								data: data1,
								success: function(res) {
									if (res.data.result == 0) {
										uni.setStorageSync('phone',res.data.phone)
										self.show = false
										uni.reLaunch({
										    url: '/pages/add/add'
										})
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
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			image {
				width: 280rpx;
				height: 280rpx;
				margin-top: 200rpx;
			}
			
			.titles {
				width: 100%;
				font-size: 30rpx;
				font-weight: 600;
				color: #333;
				text-align: center;
				margin: 30rpx 0 50rpx;
			}
			
			.btn {
				width: 300rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				background: #F91D37;
				border-radius: 30px;
				font-size: 30rpx;
				color: #FFFFFF;
			}
			
			.warn {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 28rpx;
				color: #999;
				margin-top: 30rpx;
			}
		}
		
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
	}
</style>
