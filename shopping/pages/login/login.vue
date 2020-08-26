<template>
	<view class="contain">
		<image class="logo" src="../../static/images/logo.png" alt=""></image>
		<div class="forms">
			<div class="common user">
				<input v-model="user" type="text" placeholder="请输入登录账号" />
			</div>
			<div class="common pass">
				<input v-model="pass" type="password" placeholder="请输入登录密码" />
			</div>
			<div class="forget" @click="goForget">忘记密码？</div>
		</div>
		<div class="login" @click="goLogin">登陆</div>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				user: '',
				pass: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				if(uni.getStorageSync('uid')) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},
			goForget() {
				uni.navigateTo({
					url: '/pages/forget/forget'
				})
			},
			goLogin() {
				if (this.user == '') {
					Toast.showToast('账号不能为空')
					return
				}
				if (this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				}
				let self = this
				let datas = {
					phone: this.user,
					password: md5(this.pass)
				}
				Toast.showLoading('登陆中...', function() {
					let data = {
						url: '/shopLogin',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								uni.setStorageSync('uid', res.data.uid)
								uni.setStorageSync('call', self.user)
								uni.setStorageSync('type', res.data.type)
								Toast.hideLoading()
								uni.switchTab({
									url: '/pages/index/index'
								})
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
		padding-top: 20%;
		overflow: hidden;

		.logo {
			width: 200upx;
			height: 200upx;
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
			margin-top: 10upx;
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
			font-size: 14px;
			color: #666;
			box-sizing: border-box;
			text-align: right;
		}

		.login {
			width: 80%;
			height: 90upx;
			line-height: 90upx;
			border-radius: 40upx;
			background: #FF4848;
			text-align: center;
			font-size: 15px;
			color: #FFFFFF;
			margin-top: 40upx;
		}
	}
</style>
