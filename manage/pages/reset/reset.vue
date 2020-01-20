<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">重置密码</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<ul>
				<li>
					<view class="left">手机号</view>
					<input type="text" v-model="tel" disabled="true" placeholder="请输入手机号">
				</li>
				<li>
					<view class="left">密码</view>
					<input type="password" v-model="pass" placeholder="请输入登录密码">
				</li>
				<li>
					<view class="left">重新输入</view>
					<input type="password" v-model="repeat" placeholder="请再次输入密码">
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
				repeat: '',
				pass: ''
			}
		},
		onLoad(option) {
			this.tel = option.tel
		},
		methods: {
			sure() {
				let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
				if (!reg.test(this.pass) || this.pass.length < 6 || this.pass.length > 12) {
					Toast.showToast('密码只能是字母和数字组合6-12位')
					return
				}
				
				if(this.pass != this.repeat) {
					Toast.showToast('两次密码输入不一致')
					return
				}
				
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					account: this.tel,
					password: this.pass,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/ResetPassword',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								Toast.showToast('重置密码成功')
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