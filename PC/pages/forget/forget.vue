<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">找回密码</view>
			<view class="forms">
				<view class="item">
					<view class="item-title">注册手机号</view>
					<input type="text" v-model="call" placeholder="请输入手机号">
				</view>
				<view class="item">
					<view class="item-title">验证码</view>
					<div class="common" style="padding-right: 0;">
						<input v-model="code" type="text" placeholder="验证码" />
						<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
					</div>
				</view>
				<view class="item">
					<view class="item-title">新密码</view>
					<input type="password" v-model="pass" placeholder="请输入新密码">
				</view>
				<view class="item">
					<view class="item-title">确认新密码</view>
					<input type="password" v-model="repeatPass" placeholder="请输入确认密码">
				</view>
			</view>
			<view class="btn" @tap="goSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				user: '',
				call: '',
				pass: '',
				repeatPass: '',
				nick: '',
				code: '',
				btnState: false,
				rTime: '获取验证码'
			}
		},
		onLoad() {
			
		},
		methods: {
			goLogin() {
				if (this.user == '') {
					Toast.showToast('用户名不能为空')
					return
				}
			},
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
				let data = {
					url: 'sendOut',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							Toast.showToast('发送成功')
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			},
			goBack() {
				uni.reLaunch({
				    url: '/pages/index/index'
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
				
				if(this.pass !== this.repeatPass) {
					Toast.showToast('两次密码输入不一致')
					return
				}
				
				let self = this
				let data1 = {
					phone: this.call,
					Syzm: this.code,
					newPassword: this.pass
				}
				let data = {
					url: 'resetPassword',
					data: data1,
					success: function(res) {
						if (res.data.success) {
							Toast.showToast('修改成功')
							setTimeout(() => {
								wx.navigateBack({
								  delta: 1
								})
							},500)
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		
		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 15rpx;
			box-sizing: border-box;
			
			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
			}
			
			.forms {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 30rpx;
				
				.item {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 10rpx;
					
					.common {
						width: 60%;
						height: 20rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #eee;
						cursor: pointer;
						
						input {
							font-size: 14px;
							color: #333;
						}
						
						.codes {
							height: 10rpx;
							line-height: 10rpx;
							background: #eeeeee;
							border: none;
							font-size: 14px;
							color: #333;
							margin: 0;
						}
					}
					
					.item-title {
						width: 60%;
						font-size: 15px;
						font-weight: 600;
						color: #333;
					}
					
					input {
						width: 60%;
						height: 20rpx;
						font-size: 14px;
						color: #333;
						border-bottom: 1px solid #eee;
					}
				}
			}
			
			.btn {
				width: 60%;
				margin: 15rpx auto 10rpx;
				height: 22rpx;
				line-height: 22rpx;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				border-radius: 12px;
				background: #172454;
				cursor: pointer;
			}
			
			.warn {
				width: 60%;
				margin: 0 auto;
				font-size: 14px;
				color: #999;
				text-align: right;
				cursor: pointer;
			}
		}
	}
</style>
