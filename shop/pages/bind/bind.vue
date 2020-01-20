<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">绑定手机号</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="warn">提交订单,请先绑定手机号</view>
			<view class="forms">
				<view class="item">
					<view class="left">联系方式</view>
					<input type="number" v-model="call" placeholder="请输入联系方式">
				</view>
				<view class="item" style="justify-content: space-between;">
					<view class="getCode">
						<view class="left">验证码</view>
						<input type="number" v-model="code" placeholder="请输入验证码">
					</view>
					<button class="code" type="button" :disabled="btnState" @tap="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
				</view>
			</view>
			<view class="submit" @tap="goSubmit">确定</view>
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
				call: '',
				code: '',
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
			
				//验证手机号是否存在
				let data2 = {
					phone: this.call
				}
			
				let data3 = {
					url: '/checkPhone',
					data: data2,
					success: function(res) {
						if (res.data.result == 0) {
							if (res.data.state == 0) {
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
										url: '/sendSms',
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
			goSubmit() {
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
				
				let data1 = {
					uid: uni.getStorageSync('uid'),
					phone: this.call,
					code: this.code
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/bindPhone',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('绑定成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								}, 500)
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
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.warn {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 28upx;
				color: red;
			}
			
			.forms {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.item {
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					font-size: 28upx;
					color: #111111;
					border-bottom: 1px solid #eee;
					
					.left {
						width: 180upx;
						height: 80upx;
						line-height: 80upx;
					}
					
					input {
						width: 40%;
						height: 80upx;
						font-size: 28upx;
						color: #111111;
					}
					
					.getCode {
						width: 65%;
						display: flex;
						align-items: center;
						
						.left {
							width: 180upx;
							height: 80upx;
							line-height: 80upx;
						}
						
						input {
							width: 40%;
							height: 80upx;
							font-size: 28upx;
							color: #111111;
						}
					}
					
					.code {
						padding-left: 30upx;
						height: 40upx;
						line-height: 40upx;
						font-size: 28upx;
						color: red;
						border-radius: 0;
						border-left: 1px solid red;
						text-align: right;
						background: none;
						outline: none;
					}
					
					.code:after {
						border: none !important;
					}
				}
			}
			
			.submit {
				width: 80%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				margin: 80upx auto;
				background: #111111;
				border-radius: 4px;
				font-size: 30upx;
				color: #FFFFFF;
			}
		}
	}
</style>
