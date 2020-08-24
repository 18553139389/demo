<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">修改绑定</block>
			</cu-custom>
		</view>
		<view class="forms">
			<view class="titles">点击获取验证码，将会有一条包含验证码的短信发送到您绑定的手机 {{call}}</view>
			<view class="code">
				<input type="text" v-model="code" placeholder="请输入验证码">
				<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
			</view>
			<view class="login" @tap="goSure">下一步</view>
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
				btnState: false,
				rTime: '获取验证码',
				call: '',
				code: '',
				val: ''
			}
		},
		onLoad() {
			this.call = uni.getStorageSync('call')
			this.call = this.call.substring(0, 3) + '****' + this.call.substring(7, 11)
		},
		methods: {
			getValidate() {
				let self = this
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
					mobile: uni.getStorageSync('call'),
					aim: 3
				}
				Toast.showLoading('发送中...', function() {
					let data = {
						url: 'app/service/maintainer/auth/code',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								Toast.showToast('发送成功')
								self.val = res.data.body.authCode
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goSure() {
				if (this.code == '') {
					Toast.showToast('验证码不能为空')
					return
				}
				if (this.code != this.val) {
					Toast.showToast('验证码错误')
					return
				}
				uni.navigateTo({
				    url: '/pages/modify/modify'
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
		overflow: hidden;

		.fixed {
			width: 100%;
		}

		.forms {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-top: 40upx;

			.titles {
				width: 70%;
				font-size: 26upx;
				color: #666;
				text-align: center;
				margin: 0 auto 50upx;
			}

			input {
				width: 100%;
				height: 70upx;
				padding: 0 24upx;
				box-sizing: border-box;
				font-size: 28upx;
				color: #333;
				border: 1px solid #eee;
				border-radius: 4px;
				margin-bottom: 20upx;
			}

			.code {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20upx;

				input {
					width: 60%;
					height: 70upx;
					padding: 0 24upx;
					box-sizing: border-box;
					border: 1px solid #eee;
					color: #333;
					font-size: 28upx;
					border-radius: 4px;
					margin-bottom: 0;
				}

				.codes {
					font-size: 28upx;
					height: 70upx;
					line-height: 70upx;
					padding: 0 32upx;
					background: #006EE3;
					border-radius: 4px;
					color: #FFFFFF;
					margin: 0;
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
				margin: 80upx auto 0;
			}
		}
	}
</style>
