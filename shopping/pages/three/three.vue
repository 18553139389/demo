<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">更换手机号</block>
			</cu-custom>
		</view>
		<view class="forms">
			<input type="text" v-model="call" placeholder="请输入新手机号">
			<view class="code">
				<input type="text" v-model="code" placeholder="获取验证码" style="border-bottom: none;">
				<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
			</view>
			<view class="change" @tap="goNext">完成绑定</view>
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
				call: '',
				code: '',
				btnState: false,
				btnState: false,
				rTime: '获取验证码',
				validate: '',
				getCode: ''
			}
		},
		onLoad(option) {
			this.validate = option.code
		},
		methods: {
			getValidate() {
				let self = this
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
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
				
				let datas = {
					phone: this.call
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/sendSms',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.getCode = res.data.code
								Toast.showToast('验证码发送成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goNext() {
				let self = this
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				if (this.code == '') {
					Toast.showToast('验证码不能为空')
					return
				}
				let datas = {
					uid: uni.getStorageSync('uid'),
					code1: this.validate,
					phone: this.call,
					code2: this.getCode
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/editShopPhone',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.setStorageSync('call', self.call)
								Toast.showToast('手机号更换成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 2
									})
								},800)
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
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		background: #FFFFFF;
		
		.fixed {
			width: 100%;
		}
		
		.forms {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 40upx;
		
			input {
				width: 100%;
				height: 100upx;
				font-size: 28upx;
				color: #333;
				border-bottom: 1px solid #eee;
			}
		
			.code {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100upx;
				border-bottom: 1px solid #eee;
		
				input {
					width: 60%;
					color: #333;
					font-size: 28upx;
				}
		
				.codes {
					font-size: 28upx;
					height: 60upx;
					line-height: 60upx;
					padding: 0 32upx;
					background: #FF4848;
					color: #FFFFFF;
					margin: 0;
				}
			}
			
			.change {
				width: 80%;
				border: 1px solid #eee;
				border-radius: 4px;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 30upx;
				color: #999;
				margin-top: 80upx;
			}
		}
	}
</style>
