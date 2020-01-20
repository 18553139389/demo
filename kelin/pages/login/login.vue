<template>
	<view class="contain">
		<img class="logo" src="../../static/images/logo.png" alt="">
		<div class="forms">
			<div class="common user">
				<input v-model="user" type="text" placeholder="用户名" />
			</div>
			<div class="common pass">
				<input v-model="pass" type="password" placeholder="密码" />
			</div>
			<div class="forget" @click="goForget">忘记密码？</div>
		</div>
		<div class="login" @click="goLogin">登陆</div>
		<div class="mark">用户名和密码请联系客服索取</div>
		<div class="service" @tap="goCall">
			<img src="../../static/images/dibu_bohao.png" alt="">
			<span>0371-6666668</span>
		</div>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				user: '',
				pass: ''
			}
		},
		onLoad() {
			if (uni.getStorageSync('message')) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				if (uni.getStorageSync('tel') && uni.getStorageSync('pass')) {
					this.user = uni.getStorageSync('tel')
					this.pass = uni.getStorageSync('pass')
				}
			}
		},
		methods: {
			goLogin() {
				let self = this
				let datas = {
					username: this.user,
					password: this.pass
				}
				Toast.showLoading('登陆中...', function() {
					let data = {
						url: '/app/service/login',
						data: datas,
						success: function(res) {
							if (res.data.success == true) {
								uni.setStorageSync('message', res.data.body)
								uni.setStorageSync('tel', self.user)
								uni.setStorageSync('pass', self.pass)
								Toast.hideLoading()
								uni.switchTab({
									url: '/pages/index/index'
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
			goForget() {
				uni.navigateTo({
					url: '/pages/forget/forget'
				})
			},
			goCall() {
				uni.makePhoneCall({
					phoneNumber: '0371-6666668'
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
		padding-top: 30%;
		overflow: hidden;

		.logo {
			width: 320upx;
			height: 320upx;
		}

		.forms {
			width: 80%;
			display: flex;
			flex-direction: column;
			margin-top: 100upx;
		}

		.common {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			padding: 0 10upx;
			box-sizing: border-box;
		}

		.common>input {
			font-size: 14px;
			color: #333;
		}

		.user {
			margin-bottom: 20upx;
		}

		.forget {
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			font-size: 12px;
			color: #333;
			padding: 0 10upx;
			box-sizing: border-box;
		}

		.login {
			width: 80%;
			height: 80upx;
			line-height: 80upx;
			border-radius: 40upx;
			background: #0081FF;
			text-align: center;
			font-size: 15px;
			color: #FFFFFF;
			margin-top: 40upx;
		}

		.mark {
			width: 80%;
			height: 140upx;
			line-height: 140upx;
			text-align: center;
			font-size: 14px;
			color: #666;
		}

		.service {
			width: 90%;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 100upx;
		}

		.service>img {
			width: 40upx;
			height: 40upx;
			margin-right: 30upx;
		}

		.service>span {
			color: #0081FF;
		}
	}
</style>
