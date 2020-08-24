<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content"></block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles">手机快捷登录</view>
			<view class="box">
				<view class="item">
					<image src="../../static/images/s1.png" style="width: 36rpx;height: 40rpx;"></image>
					<input type="text" v-model="call" placeholder="请输入手机号">
				</view>
				<view class="item" style="justify-content: space-between;margin-top: 30rpx;">
					<view class="validate">
						<image src="../../static/images/s2.png" style="width: 36rpx;height: 40rpx;"></image>
						<input type="text" v-model="code" placeholder="短信验证码">
					</view>
					<button type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
				</view>
				<view class="login" @tap="goLogin">登录</view>
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
				backColor: '#F6F6F6',
				call: '',
				code: '',
				code1: '',
				rTime: '获取验证码',
				btnState: false
			}
		},
		onLoad() {
			
		},
		methods: {
			getValidate() {
				if(this.call == ''){
					Toast.showToast('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))){
					Toast.showToast('手机号格式不正确')
					return
				}
				
				let self = this
				//验证手机号是否存在
				let data2 = {
					phone: this.call
				}
				
				let data3 = {
					url: 'phoneRegister',
					data: data2,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							if (res.data.isregister == 0) {
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
									phone: self.call
								}
								Toast.showLoading('发送中...', function() {
									let data = {
										url: 'getValidateCode',
										data: data1,
										success: function(res) {
											if (res.data.result == 0) {
												Toast.hideLoading()
												self.code1 = res.data.code
												console.log(res)
											} else {
												Toast.hideLoading()
												Toast.showToast(res.data.resultNote)
											}
										}
									}
									ajax(data)
								})
							} else {
								Toast.showToast('该手机号已被注册')
							}
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data3)
			},
			goLogin() {
				if(this.call == ''){
					Toast.showToast('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))){
					Toast.showToast('手机号格式不正确') 
					return
				}
				if(this.code != this.code1) {
					Toast.showToast('验证码错误')
					return
				}
				let data1 = {
					uid: uni.getStorageSync('uid'),
					phone: this.call,
					code: this.code
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'bindphone',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
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
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.titles {
				width: 100%;
				height: 300rpx;
				line-height: 300rpx;
				font-size: 36rpx;
				color: #333;
				font-weight: 600;
				padding-left: 28rpx;
				box-sizing: border-box;
				background: #f6f6f6;
			}
			
			.box {
				width: 100%;
				height: calc(100vh - 300rpx);
				background: #FFFFFF;
				padding: 40rpx 28rpx;
				box-sizing: border-box;
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				
				.item {
					width: 100%;
					height: 90rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					image {
						width: 28rpx;
						height: 32rpx;
					}
					
					input {
						width: 75%;
						height: 90rpx;
						margin-left: 24rpx;
						padding: 0 20rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						color: #333;
					}
					
					.validate {
						display: flex;
						align-items: center;
						
						input {
							width: 60%;
						}
					}
					
					button {
						display: inline-block;
						width: 30%;
						height: 50rpx;
						line-height: 50rpx;
						margin: 0;
						padding: 0;
						font-size: 14px;
						color: #00C800;
						background: #fff;
						background: none;
						border: none;
						outline: none;
						text-align: center;
						border-radius: 30px;
						background: #E6FFE6;
					}
					
					button:after {
						border: none;
					}
				}
				
				.login {
					width: 240rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
					color: #FFFFFF;
					border-radius: 30px;
					background: #00C800;
					margin: 80rpx auto 0;
				}
			}
		}
	}
</style>
