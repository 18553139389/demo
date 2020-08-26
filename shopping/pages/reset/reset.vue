<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">重置密码</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="forms">
				<input type="password" v-model="old" placeholder="请输入原密码">
			</view>
			<view class="forms">
				<input type="password" v-model="news" placeholder="请输入新密码">
			</view>
			<view class="forms">
				<input type="password" v-model="sure" placeholder="请再次输入确认密码">
			</view>
			<view class="btns" @tap="goSure">确定</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				Color: '#333',
				old: '',
				news: '',
				sure: ''
			}
		},
		methods: {
			goSure() {
				let self = this
				if (this.old == '') {
					Toast.showToast('原密码不能为空')
					return
				}
				if (this.news == '') {
					Toast.showToast('新密码不能为空')
					return
				}
				if (this.news !== this.sure) {
					Toast.showToast('两次密码输入不一致')
					return
				}
				let datas = {
					uid: uni.getStorageSync('uid'),
					oldPassword: md5(this.old),
					newPassword: md5(this.news)
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/resetPassword',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('密码重置成功')
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
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 30upx;
			box-sizing: border-box;
			
			.forms {
				width: 100%;
				height: 90upx;
				border-bottom: 1px solid #eee;
				display: flex;
				align-items: center;
				
				input {
					width: 80%;
					height: 70upx;
					font-size: 28upx;
					color: #333;
				}
			}
			
			.btns {
				width: 80%;
				height: 80upx;
				line-height: 80upx;
				border-radius: 40upx;
				background: #FF4848;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				margin: 80upx auto 0;
			}
		}
	}
</style>
