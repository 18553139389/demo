<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">完善资料</view>
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
					<view class="img1" style="margin-left: 20rpx;">
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
						res.tempFilePaths.forEach((item, index) => {
							uni.uploadFile({
								url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								success: (uploadFileRes) => {
									let obj = JSON.parse(uploadFileRes.data)
									self.img1 = obj.result
								},
								fail: (res) => {
									Toast.showToast('上传失败')
								}
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
						res.tempFilePaths.forEach((item, index) => {
							uni.uploadFile({
								url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								success: (uploadFileRes) => {
									let obj = JSON.parse(uploadFileRes.data)
									self.img2 = obj.result
								},
								fail: (res) => {
									Toast.showToast('上传失败')
								}
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
						res.tempFilePaths.forEach((item, index) => {
							uni.uploadFile({
								url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								success: (uploadFileRes) => {
									let obj = JSON.parse(uploadFileRes.data)
									self.img3 = obj.result
								},
								fail: (res) => {
									Toast.showToast('上传失败')
								}
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
		
		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 15rpx;
			box-sizing: border-box;
			
			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
			}
			
			.btn {
				width: 60%;
				margin: 15rpx auto 10rpx;
				height: 22rpx;
				line-height: 22rpx;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				border-radius: 12px;
				background: #172454;
				cursor: pointer;
			}
			
			.titles {
				width: 100%;
				height: 20rpx;
				line-height: 20rpx;
				font-size: 14px;
				color: #333;
				font-weight: 600;
			}
			
			.item {
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333;
				padding: 8rpx 0;
				border-bottom: 1px solid #eee;
				
				.mark {
					width: 10%;
				}
				
				input {
					width: 65%;
					font-size: 14px;
					color: #333;
					margin-left: 8rpx;
				}
			}
			
			.person {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 14px;
				color: #333;
				padding: 15rpx 0;
				
				.imgs {
					width: 100%;
					display: flex;
					padding: 5rpx 0;
					
					.img1 {
						width: 30%;
						display: flex;
						flex-direction: column;
						align-items: center;
						
						.pic1 {
							width: 100%;
							height: 70rpx;
							border-radius: 4px;
							display: flex;
							justify-content: center;
							align-items: center;
							border: 1px solid #ddd;
							margin-bottom: 10rpx;
							position: relative;
							
							.close {
								width: 8rpx;
								height: 8rpx;
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 14px;
								color: #FFFFFF;
								background: red;
								position: absolute;
								top: -10px;
								right: -10px;
							}
							
							image {
								width: 20rpx;
								height: 20rpx;
							}
						}
					}
				}
				
				.picture {
					width: 50%;
					height: 100rpx;
					border: 1px solid #ddd;
					border-radius: 4px;
					margin-top: 5rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					
					image {
						width: 20rpx;
						height: 20rpx;
					}
					
					.close {
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 14px;
						color: #FFFFFF;
						background: red;
						position: absolute;
						top: -10px;
						right: -10px;
					}
				}
			}
		}
	}
</style>
