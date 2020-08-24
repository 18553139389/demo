<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">修改密码</block>
			</cu-custom>
		</view>
		<view class="forms">
			<input type="password" v-model="old" placeholder="请输入旧密码">
			<input type="password" v-model="news" placeholder="请输入新密码">
			<input type="password" v-model="newSure" placeholder="请再次输入新密码">
			<view class="login" @tap="goFinish">完成</view>
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
				old: '',
				news: '',
				newSure: ''
			}
		},
		methods: {
			goFinish() {
				let self = this
				if(this.old == '') {
					Toast.showToast('旧密码不能为空')
					return 
				}
				if(this.news == '') {
					Toast.showToast('新密码不能为空')
					return 
				}
				if(this.news.length < 6) {
					Toast.showToast('新密码不能低于6位')
					return 
				}
				if(this.news != this.newSure) {
					Toast.showToast('两次密码输入不一致')
					return 
				}
				let data1 = {
					mid: uni.getStorageSync('uid'),
					oldPassword: this.old,
					password: this.news
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/modify/password/old',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								}, 500)
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

		.fixed {
			width: 100%;
		}

		.forms {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-top: 40upx;

			input {
				width: 100%;
				height: 70upx;
				padding: 0 24upx;
				box-sizing: border-box;
				font-size: 28upx;
				color: #333;
				border: 1px solid #eee;
				border-radius: 4px;
				margin-bottom: 20upx;
			}

			.login {
				width: 70%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 30px;
				font-size: 28upx;
				color: #FFFFFF;
				background: #006EE3;
				margin: 80upx auto 0;
			}
		}
	}
</style>
