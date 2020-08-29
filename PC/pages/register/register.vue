<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">信息建设平台注册</view>
			<view class="forms">
				<view class="item">
					<view class="item-title">姓名</view>
					<input type="text" v-model="user" placeholder="请输入姓名">
				</view>
				<view class="item">
					<view class="item-title">手机号</view>
					<input type="text" v-model="call" placeholder="请输入手机号码">
				</view>
				<view class="item">
					<view class="item-title">验证码</view>
					<div class="common" style="padding-right: 0;">
						<input v-model="code" type="text" placeholder="验证码" />
						<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
					</div>
				</view>
				<view class="item">
					<view class="item-title">密码</view>
					<input type="text" v-model="pass" placeholder="请输入密码">
				</view>
				<view class="item">
					<view class="item-title">企业名称</view>
					<input type="text" v-model="nick" placeholder="请输入企业名称">
				</view>
			</view>
			<view class="btn" style="background: #EEEEEE;color: #333;" @tap="goRegister">注册</view>
			<view class="warn">已有账号，<text style="color: #172454;" @tap="goBack">立即登录</text></view>
			<view class="content">
				<jiuaiCheckbox @change='changeBox' :checked="type" :fontSize="10" :color="color" :borderStyle="borderStyle"></jiuaiCheckbox>
				<view class="read" @tap="goRead">我已阅读并同意《检察服务企业360用户协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import jiuaiCheckbox from "../../components/jiuai-checkbox/jiuai-checkbox.vue"
	export default {
		data() {
			return {
				user: '',
				call: '',
				pass: '',
				nick: '',
				code: '',
				btnState: false,
				rTime: '获取验证码',
				type: true,
				color: '#06A5C4',
				borderStyle: '1px solid #06A5C4'
			}
		},
		components: {
			jiuaiCheckbox
		},
		onLoad() {
			
		},
		methods: {
			changeBox(e) {
				this.type = e.detail.checked
			},
			goRead() {
				uni.navigateTo({
				    url: '/pages/web/web'
				})
			},
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
			goRegister() {
				if(this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				
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
				
				if(!this.type) {
					Toast.showToast('请勾选协议')
					return
				}
				
				let self = this
				let data1 = {
					phone: this.call,
					yzm: this.code,
					aunitName: this.nick,
					name: this.user,
					pwd: this.pass
				}
				let data = {
					url: 'register',
					data: data1,
					success: function(res) {
						if (res.data.success) {
							Toast.showToast('注册成功')
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
			},
			goBack() {
				uni.reLaunch({
				    url: '/pages/index/index'
				})
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
			
			.content {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: #333;
				margin: 20rpx 0 0;
			
				.read {
					margin-left: 10upx;
				}
			}
		}
	}
</style>
