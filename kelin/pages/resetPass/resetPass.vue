<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">重置登陆密码</block>
			</cu-custom>
		</view>
		<div class="forms">
			<div class="common">
				<input v-model="old" type="password" placeholder="旧密码" />
			</div>
			<div class="common">
				<input v-model="news" type="password" placeholder="设置密码" />
			</div>
			<div class="common">
				<input v-model="repeatNews" type="password" placeholder="确认新密码" />
			</div>
		</div>
		<div class="login" @click="goSubmit">提交</div>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				old: '',
				news: '',
				repeatNews: ''
			}
		},
		onLoad() {
			this.message = uni.getStorageSync('message')
		},
		methods: {
			goSubmit() {
				let self = this
				if (this.old == '') {
					Toast.showToast('旧密码不能为空')
					return
				} 

				if (this.news == '') {
					Toast.showToast('登陆密码不能为空')
					return
				} else if (this.news.length < 6) {
					Toast.showToast('密码长度不能少于6位')
					return
				}

				if (this.repeatNews != this.news) {
					Toast.showToast('两次输入密码不一致')
					return
				}

				let datas = {
					Token: this.message.Token,
					oldPassword: this.old,
					newPassword: this.news
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/update/password',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								Toast.showToast('重置成功')
								setTimeout(() => {
									uni.navigateBack({
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}

	.fixed {
		width: 100%;
	}

	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 50upx;
	}

	.common {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		padding: 0 28upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}

	.common>input {
		font-size: 14px;
		color: #333;
	}

	.codes {
		height: 50upx;
		line-height: 50upx;
		background: #0081FF;
		border-radius: 40upx;
		font-size: 14px;
		color: #FFFFFF;
		margin: 0;
	}

	.login {
		width: 80%;
		height: 80upx;
		line-height: 80upx;
		border-radius: 40upx;
		background: #0081FF;
		text-align: center;
		font-size: 15px;
		color: #FFFFFF;
		margin-top: 40upx;
	}
</style>
