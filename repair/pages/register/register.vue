<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">注册</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image class="logo" src="../../static/images/logos.jpg"></image>
			<view class="forms">
				<view class="item">
					<image src="../../static/images/call.png"></image>
					<input type="text" v-model="call" placeholder="请输入手机号码" />
				</view>
				<div class="common" style="padding-right: 0;">
					<view class="box">
						<image src="../../static/images/pass.png"></image>
						<input v-model="code" type="text" placeholder="请输入验证码" />
					</view>
					<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
				</div>
				<div class="common" style="padding-right: 0;">
					<view class="box">
						<image src="../../static/images/pass.png"></image>
						<input v-model="pass" type="password" placeholder="请输入密码" />
					</view>
				</div>
				<view class="submit" @tap="goRegister">注册</view>
				<view class="agree">注册成功即同意<text @tap="goAgree">《跑步修-用户服务协议》</text></view>
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
				Color: '#333',
				backColor: '#fff',
				call: '',
				code: '',
				pass: '',
				btnState: false,
				rTime: '获取验证码'
			}
		},
		methods: {
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
			},
			goRegister() {
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
				
				let data1 = {
					phoneNum: this.call,
					password: this.pass,
					code: this.code
				}
				Toast.showLoading('发送中...', function() {
					let data = {
						url: '/api/register',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('注册成功')
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
			goAgree() {
				uni.navigateTo({
					url: '/pages/agree/agree?type=2'
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

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 28upx;
			box-sizing: border-box;
			
			.logo {
				width: 160rpx;
				height: 160rpx;
				border-radius: 4px;
				margin: 120rpx 0;
			}
			
			.forms {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.item {
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #eee;
					margin-bottom: 20upx;
					
					image {
						width: 56rpx;
						height: 56rpx;
						margin-right: 24rpx;
					}
					
					input {
						width: 70%;
						font-size: 28rpx;
						color: #333;
					}
				}
				
				.common {
					width: 100%;
					height: 100upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #eee;
					margin-bottom: 20upx;
					
					.box {
						display: flex;
						align-items: center;
						padding-left: 12rpx;
						
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 28rpx;
						}
						
						input {
							font-size: 28rpx;
							color: #333;
						}
					}
					
					.codes {
						height: 60upx;
						line-height: 60upx;
						background: #F25B40;
						border-radius: 40upx;
						font-size: 14px;
						color: #FFFFFF;
						margin: 0;
					}
				}
				
				.submit {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
					color: #fff;
					border-radius: 4px;
					background: #F25B40;
					margin-top: 50rpx;
				}
				
				.agree {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28rpx;
					color: #999;
					margin-top: 100rpx;
					
					text {
						color: #0081FF;
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>
