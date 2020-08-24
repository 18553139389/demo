<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">忘记密码</block>
			</cu-custom>
		</view>
		<!-- <image class="logo" src="../../static/images/pic.png"></image> -->
		<view class="forms">
			<view class="item">
				<image src="../../static/images/call.png" style="width: 36rpx;height: 40rpx;"></image>
				<input type="text" v-model="call" placeholder="请输入手机号">
			</view>
			<view class="item" style="justify-content: space-between;margin-top: 30rpx;">
				<view class="validate">
					<image src="../../static/images/code.png" style="width: 36rpx;height: 40rpx;"></image>
					<input type="text" v-model="code" placeholder="短信验证码">
				</view>
				<button type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
			</view>
			<view class="item" style="margin-top: 30rpx;">
				<image src="../../static/images/pass.png" style="width: 36rpx;height: 40rpx;"></image>
				<input type="password" v-model="pass" placeholder="请设置密码">
			</view>
			<view class="item" style="margin-top: 30rpx;">
				<image src="../../static/images/pass.png" style="width: 36rpx;height: 40rpx;"></image>
				<input type="password" v-model="repeat" placeholder="请再次输入密码">
			</view>
			<view class="btn" @tap="goSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	// import md5 from 'js-md5'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				call: '',
				code: '',
				pass: '',
				repeat: '',
				rTime: '获取验证码',
				btnState: false
			}
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
				this.rTime = 60
				let rTime = this.rTime
				this.btnState = true
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
						url: 'sendOut',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success) {
								Toast.hideLoading()
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goSubmit() {
				if(this.call == ''){
					Toast.showToast('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))){
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
				
				if(this.pass !== this.repeat) {
					Toast.showToast('两次密码输入不一致')
					return
				}
				
				let self = this
				let data1 = {
					phone: this.call,
					Syzm: this.code,
					newPassword: this.pass
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'resetPassword',
						data: data1,
						success: function(res) {
							if (res.data.success) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
								setTimeout(() => {
									wx.navigateBack({
									  delta: 1
									})
								},500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
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
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.logo {
			width: 180rpx;
			height: 180rpx;
			border-radius: 4px;
			margin-top: 140rpx;
		}
		
		.forms {
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-top: 100rpx;
			
			.item {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;
				
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
					margin: 0;
					padding: 0;
					font-size: 14px;
					color: #FE5063;
					background: #fff;
					background: none;
					border: none;
					outline: none;
					text-align: right;
				}
				
				button:after {
					border: none;
				}
			}
			
			.warn {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 40rpx;
				
				.warn-left {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					
					image {
						margin-left: 24rpx;
						width: 36rpx;
						height: 36rpx;
					}
				}
				
				.find {
					font-size: 28rpx;
					color: red;
				}
			}
			
			.btn {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				font-weight: 600;
				border-radius: 4px;
				background: #06A5C4;
				margin-top: 100rpx;
			}
		}
	}
</style>
