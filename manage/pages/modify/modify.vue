<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">修改密码</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<ul>
				<li>
					<view class="left">手机号</view>
					<input type="text" v-model="tel" placeholder="请输入手机号">
				</li>
				<li>
					<view class="left">验证码</view>
					<view class="right">
						<input type="text" v-model="code" placeholder="请输入验证码">
						<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
					</view>
				</li>
				<li>
					<view class="left">密码</view>
					<input type="password" v-model="pass" placeholder="请输入密码">
				</li>
			</ul>
			<view class="btns" @tap="sure">保存</view>
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
				tel: '',
				code: '',
				pass: '',
				btnState: false,
				rTime: '获取验证码'
			}
		},
		methods: {
			getValidate() {
				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
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
				
				let datas = {
					mobile: this.tel,
					type: 1,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/sms/sendsms',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								Toast.showToast('发送成功')
							} else if (res.data.Code == -2 || res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			sure() {
				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				if(this.code == '') {
					Toast.showToast('验证码不能为空')
					return
				}
				
				let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
				if (!reg.test(this.pass) || this.pass.length < 6 || this.pass.length > 12) {
					Toast.showToast('密码只能是字母和数字组合6-12位')
					return
				}
				
				let self = this
				let datas = {
					mobile: this.tel,
					companyid: uni.getStorageSync('id'),
					type: 1,
					smscode: this.code,
					password: this.pass,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/companyuser/ChangePswd',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								Toast.showToast('修改密码成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
							} else if (res.data.Code == -2 || res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
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
		display: flex;
		flex-direction: column;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			border-top: 24upx solid #FAFAFA;
			
			ul {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				li {
					width: 100%;
					height: 90upx;
					padding: 0 28upx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #333;
					
					.left {
						width: 25%;
					}
					
					.right {
						width: 75%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.codes {
							height: 50upx;
							line-height: 50upx;
							background: #0081FF;
							border-radius: 4px;
							font-size: 14px;
							color: #FFFFFF;
							margin: 0;
						}
					}
				}
			}
			
			.btns {
				width: 70%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				border-radius: 4px;
				margin: 60upx auto;
				background: #4081FF;
			}
		}
	}
</style>