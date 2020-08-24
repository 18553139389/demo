<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">重置登录密码</block>
			</cu-custom>
		</view>
		<div class="forms">
			<div class="common">
				<input v-model="old" type="password" placeholder="旧密码" />
			</div>
			<div class="common">
				<input v-model="news" type="password" placeholder="请设置新登录密码" />
			</div>
			<div class="common">
				<input v-model="newSure" type="password" placeholder="请再次输入新密码" />
			</div>
		</div>
		<div class="login" @click="goSubmit">确定</div>
	</view>
</template>

<script>
	import cmdNavBar from "../../components/cmd-nav-bar/cmd-nav-bar.vue"
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
		components: {
			cmdNavBar
		},
		methods: {
			goSubmit() {
				let self = this
				if (this.old == '') {
					Toast.showToast('旧密码不能为空')
					return
				}

				if (this.news == '') {
					Toast.showToast('新密码不能为空')
					return
				}

				if (this.newSure != this.news) {
					Toast.showToast('两次密码输入不一致')
					return
				}
				
				let data1 = {
					cmd: 'updatePassword',
					uid: uni.getStorageSync('uid'),
					oldpassword: this.old,
					password: this.news
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('重置成功')
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;

		.fixed {
			width: 100%;
		}

		.forms {
			width: 92%;
			display: flex;
			flex-direction: column;

			.common {
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #eee;
				padding: 0 10upx;
				box-sizing: border-box;
				margin-bottom: 20upx;
			}

			.common>input {
				font-size: 14px;
				color: #333;
			}

			.codes {
				height: 60upx;
				line-height: 60upx;
				background: #FF6600;
				border-radius: 40upx;
				font-size: 14px;
				color: #FFFFFF;
				margin: 0;
			}
		}

		.login {
			width: 60%;
			height: 90upx;
			line-height: 90upx;
			border-radius: 40upx;
			background: #FF6600;
			text-align: center;
			font-size: 15px;
			color: #FFFFFF;
			margin-top: 100upx;
		}
	}
</style>
