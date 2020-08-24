<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">完善资料</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles">基本信息</view>
			<view class="item">
				<view class="mark">真实姓名：</view>
				<input type="text" v-model="user" placeholder="请输入姓名">
			</view>
			<view class="item">
				<view class="mark">手机号：</view>
				<input type="text" v-model="call" placeholder="请输入手机号">
			</view>
			<view class="item">
				<view class="mark">企业名称：</view>
				<input type="text" v-model="nick" placeholder="请输入企业名称">
			</view>
			<view class="item">
				<view class="mark">企业信用代码：</view>
				<input type="text" v-model="code" placeholder="请输入企业信用代码">
			</view>
			<view class="person">
				<view>身份证件：</view>
				<view class="imgs">
					<view class="img1">
						<view class="pic1">
							<image src="../../static/images/adds.png" @tap="go1" v-show="!img1"></image>
							<image class="up" :src="img1" style="width: 100%;height: 100%;" v-show="img1"></image>
							<view class="close" v-show="img1" @tap="goDel1">X</view>
						</view>
						<view>身份证正面</view>
					</view>
					<view class="img1">
						<view class="pic1">
							<image src="../../static/images/adds.png" @tap="go2" v-show="!img2"></image>
							<image :src="img2" style="width: 100%;height: 100%;" v-show="img2"></image>
							<view class="close" v-show="img2" @tap="goDel2">X</view>
						</view>
						<view>身份证反面</view>
					</view>
				</view>
				<view>营业执照：</view>
				<view class="picture">
					<image src="../../static/images/adds.png" @tap="go3" v-show="!img3"></image>
					<image :src="img3" style="width: 100%;height: 100%;" v-show="img3"></image>
					<view class="close" v-show="img3" @tap="goDel3">X</view>
				</view>
			</view>
			<view class="btn" @tap="goSubmit">提交</view>
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
				user: '',
				call: '',
				nick: '',
				code: '',
				img1: '',
				img2: '',
				img3: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			go1() {
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
									url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.img1 = obj.result
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
			go2() {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.img2 = obj.result
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
			go3() {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.img3 = obj.result
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
			goDel1() {
				this.img1 = ''
			},
			goDel2() {
				this.img2 = ''
			},
			goDel3() {
				this.img3 = ''
			},
			goSubmit() {
				let self = this
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				if (this.nick == '') {
					Toast.showToast('企业名称不能为空')
					return
				}
				if (this.code == '') {
					Toast.showToast('信用代码不能为空')
					return
				}
				if (this.img1 == '') {
					Toast.showToast('请上传身份证正面')
					return
				}
				if (this.img2 == '') {
					Toast.showToast('请上传身份证反面')
					return
				}
				if (this.img3 == '') {
					Toast.showToast('请上传营业执照')
					return
				}
				let data1 = {
					name: this.user,
					uid: uni.getStorageSync('uid'),
					phone: this.call,
					unitName: this.nick,
					unitNumb: this.code,
					card: this.img1,
					cardB: this.img2,
					hubpro: this.img3
				}
				let data = {
					url: 'personalData',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							Toast.hideLoading()
							Toast.showToast('提交成功')
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.btn {
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 4px;
				background: #06A5C4;
				font-size: 30rpx;
				color: #FFFFFF;
				margin: 40rpx auto;
			}
			
			.titles {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				color: #333;
				font-weight: 600;
			}
			
			.item {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				padding: 24rpx 0;
				border-bottom: 1px solid #eee;
				
				.mark {
					width: 30%;
				}
				
				input {
					width: 65%;
					font-size: 28rpx;
					color: #333;
					margin-left: 20rpx;
				}
			}
			
			.person {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				color: #333;
				padding: 30rpx 0;
				
				.imgs {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: 30rpx 0;
					
					.img1 {
						width: 48%;
						display: flex;
						flex-direction: column;
						align-items: center;
						
						.pic1 {
							width: 100%;
							height: 200rpx;
							border-radius: 4px;
							display: flex;
							justify-content: center;
							align-items: center;
							border: 1px solid #ddd;
							margin-bottom: 30rpx;
							position: relative;
							
							.close {
								width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 28rpx;
								color: #FFFFFF;
								background: red;
								position: absolute;
								top: -16rpx;
								right: -16rpx;
							}
							
							image {
								width: 70rpx;
								height: 70rpx;
							}
						}
					}
				}
				
				.picture {
					width: 100%;
					height: 240rpx;
					border: 1px solid #ddd;
					border-radius: 4px;
					margin-top: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					
					image {
						width: 80rpx;
						height: 80rpx;
					}
					
					.close {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28rpx;
						color: #FFFFFF;
						background: red;
						position: absolute;
						top: -16rpx;
						right: -16rpx;
					}
				}
			}
		}
	}
</style>
