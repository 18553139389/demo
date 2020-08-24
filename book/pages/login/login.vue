<template>
	<view class="contain">
		<img class='logo' src="../../static/images/logos.jpg" alt="">
		<view class="wrapper">
			<view class="forms">
				<view class="common">
					<input type="text" v-model="tel" placeholder="请输入手机号" cursor-spacing="100">
				</view>
				<view class="common">
					<input type="password" v-model="pass" placeholder="请输入登录密码" cursor-spacing="100">
				</view>
			</view>
			<view class="login" @tap="goIndex">登陆</view>
			<view class="other">
				<view @tap="goRegister">快速注册></view>
				<view style="border-left: 1px solid #FF6600;" @tap="goForget">忘记密码?</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				tel: '',
				pass: '',
				uid: ''
			}
		},
		onLoad(option) {
			if(option.uid) {
				this.uid = option.uid
			}
		},
		methods: {
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register?uid=' + this.uid
				})
			},
			goIndex() {
				let self = this
				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.tel))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				if (this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				}
				//登陆账号
				let data1 = {
					cmd: 'userLogin',
					phone: this.tel,
					password: this.pass
				}
				Toast.showLoading('登陆中...', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('登陆成功')
								uni.setStorageSync('uid', res.data.uid)
								// uni.setStorageSync('uid', '6d0915751a274fafa314a999e10c45ec')
								uni.removeStorageSync('changeAddress')
								uni.removeStorageSync('changeItem')
								uni.removeStorageSync('history')
								
								let data2 = {
									cmd: 'myaddresslist',
									uid: res.data.uid
								}
								Toast.showLoading('', function() {
									let data = {
										data: data2,
										success: function(response) {
											if (response.data.result == 0) {
												if (response.data.dataList) {
													let list = response.data.dataList
													list.forEach((item) => {
														if(item.isdefault == 1) {
															uni.setStorageSync('changeAddress', item.address + item.addressdetail)
															let lists = {
																phone: item.phone,
																name: item.name,
																aid: item.aid
															}
															uni.setStorageSync('changeItem', JSON.stringify(lists))
														}
													})
													Toast.hideLoading()
													setTimeout(() => {
														uni.switchTab({
															url: '/pages/index/index'
														})
													}, 500)
												} else {
													Toast.hideLoading()
													setTimeout(() => {
														uni.switchTab({
															url: '/pages/index/index'
														})
													}, 500)
												}
											} else {
												Toast.hideLoading()
												Toast.showToast(res.data.resultNote)
											}
										}
									}
									ajax(data)
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goForget() {
				uni.navigateTo({
					url: '/pages/forget/forget'
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
		align-items: center;

		.logo {
			width: 360upx;
			height: 150upx;
			margin: 120upx 0 80upx;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			.forms {
				width: 85%;
				display: flex;
				flex-direction: column;
				margin: 0 auto;

				.common {
					width: 100%;
					height: 100upx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #eee;
					padding: 0 16upx;
					box-sizing: border-box;
					margin-bottom: 30upx;

					input {
						width: 100%;
						font-size: 14px;
						color: #333;
					}
				}
			}

			.login {
				width: 80%;
				height: 88upx;
				line-height: 88upx;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				border-radius: 30px;
				background: #FF6600;
				margin: 60upx auto 0;
			}

			.other {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 50upx;

				view {
					width: 200upx;
					font-size: 14px;
					color: #333;
					text-align: center;
				}
			}
		}
	}
</style>
