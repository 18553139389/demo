<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">找回密码</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<input type="text" v-model="call" placeholder="请输入手机号">
			</view>
			<view class="item">
				<input v-model="code" type="text" placeholder="请输入验证码" />
				<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
			</view>
			<view class="item">
				<input type="password" v-model="pass" placeholder="请输入密码">
			</view>
			<view class="btn" @tap="submit">确认修改</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				title: '',
				call: '',
				code: '',
				pass: '',
				btnState: false,
				rTime: '获取验证码'
			}
		},
		onLoad(option) {
			
		},
		methods: {
			submit() {
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				if(this.code == '') {
					Toast.showToast('验证码不能为空')
					return
				}
				if(this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				}
				if(this.pass.length < 6) {
					Toast.showToast('密码长度不能低于6位')
					return
				}
				let self = this
				let data1 = {
					phoneNum: this.call,
					code: self.code,
					password: self.pass
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/findPassword',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			getValidate() {
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
			
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
					phoneNum: this.call
				}
				Toast.showLoading('发送中...', function() {
					let data = {
						url: '/api/sendSmsCode',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('发送成功')
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
		background: #f5f5f5;
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
			border-top: 10px solid #f5f5f5;
			
			.item {
				width: 100%;
				padding: 28rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				background: #fff;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;
				color: #333;
				
				input {
					width: 60%;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 28rpx;
					color: #333;
				}
				
				.codes {
					height: 50upx;
					line-height: 50upx;
					font-size: 28rpx;
					color: #333;
					background: #fff;
					margin: 0;
				}
			}
			
			.btn {
				width: 50%;
				margin: 80rpx auto 0;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 28rpx;
				color: #fff;
				background: #F15903;
				border-radius: 30px;
			}
		}
	}
</style>
