<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">信息建设平台</view>
			<view class="forms">
				<view class="item">
					<view class="item-title">用户名</view>
					<input type="text" v-model="call" placeholder="请输入用户名">
				</view>
				<view class="item">
					<view class="item-title">密码</view>
					<input type="password" v-model="pass" placeholder="请输入密码">
				</view>
			</view>
			<view class="warn" @tap="goForget">找回密码</view>
			<view class="btn" @tap="goLogin">登陆</view>
			<view class="btn" style="background: #EEEEEE;color: #333;" @tap="goRegister">注册</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				call: '',
				pass: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			goLogin() {
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
			
				if (this.pass == '') {
					Toast.showToast('密码不能为空')
					return
				}
				
				let self = this
				let data1 = {
					username: this.call,
					password: this.pass
				}
				let data = {
					url: 'login',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							uni.setStorageSync('uid', res.data.body.id)
							uni.setStorageSync('name', res.data.body.name)
							uni.setStorageSync('phone', res.data.body.phone)
							uni.reLaunch({
							    url: '/pages/agree/agree'
							})
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			},
			goRegister() {
				uni.navigateTo({
				    url: '/pages/register/register'
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
					margin-bottom: 15rpx;
					
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
			
			.warn {
				width: 60%;
				margin: 0 auto;
				font-size: 14px;
				color: #172454;
				text-align: right;
				cursor: pointer;
			}
			
			.btn {
				width: 60%;
				margin: 15rpx auto;
				height: 22rpx;
				line-height: 22rpx;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				border-radius: 12px;
				background: #172454;
				cursor: pointer;
			}
		}
	}
</style>
