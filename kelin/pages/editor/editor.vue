<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">个人资料</block>
				<block slot="right">保存</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="modify">修改头像</view>
			<view class="upload" @tap="goPicture">
				<img class="upload-img" :src="head" alt="">
				<img class="upload-right" src="../../static/images/xiayiye2.png" alt="">
			</view>
		</view>
		<ul class="user">
			<li>
				<span>姓名</span>
				<input type="text" v-model="user" placeholder="请填写姓名" disabled>
			</li>
			<li>
				<span>邮箱</span>
				<input type="text" v-model="email" placeholder="请填写邮箱" disabled>
			</li>
			<li>
				<span>手机号</span>
				<input type="text" v-model="tel" placeholder="请填写电话" disabled>
			</li>
		</ul>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				head: '../../static/images/2.jpg',
				user: '',
				email: '',
				tel: '',
				message: {}
			}
		},
		onLoad() {
			this.message = uni.getStorageSync('message')
			this.user = this.message.name
			this.email = this.message.email
			this.tel = this.message.mobilePhone
			this.head = this.message.avatar
		},
		methods: {
			goPicture() {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://sale.clingcenter.net/app/service/file/upload', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'files',
									formData: {
										Token: self.message.Token
									},
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.head = obj.body.files
									},
									fail: (res) => {
										Toast.hideLoading()
										Toast.showToast('上传失败')
									}
								})
							})
						})
					},
					fail: function(res) {
						Toast.hideLoading()
						Toast.showToast('上传失败')
					}
				})
			},
			goRight() {
				let self = this
				let data5 = {
					Token: this.message.Token,
					avatar: self.head
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/modify/avatar',
						data: data5,
						success: function(res) {
							Toast.hideLoading()
							if (res.data.success == true) {
								self.message.avatar = self.head
								uni.setStorageSync('message', self.message)
								Toast.showToast('修改成功')
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
		background: #F8F9FB;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			padding: 28upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #FFFFFF;
			border-top: 1px solid #eee;

			.modify {
				font-size: 14px;
				color: #333;
			}

			.upload {
				display: flex;
				align-items: center;

				.upload-img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					overflow: hidden;
				}

				.upload-right {
					width: 20upx;
					height: 30upx;
					margin-left: 40upx;
				}
			}
		}

		.user {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-top: 30upx;

			li {
				width: 100%;
				height: 100upx;
				padding: 0 28upx;
				box-sizing: border-box;
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
				border-bottom: 1px solid #eee;

				input {
					font-size: 14px;
					color: #333;
					text-align: right;
				}
			}
		}
	}
</style>
