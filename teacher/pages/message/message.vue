<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">完善资料</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="user">
				<view class="user-name">真实名字</view>
				<input type="text" v-model="user" placeholder="请输入真实姓名">
			</view>
			<view class="user" style="margin: 30upx 0;">证件上传</view>
			<view class="imgs">
				<view class="imgs-item" @tap="goImg(0)">
					<view class="imgs-show">
						<view class="add">+</view>
						<img class="bg" :src="'https://weixiu.lixinapp.com/' + img1" alt="">
					</view>
					<view class="imgs-name">身份证正面</view>
				</view>
				<view class="imgs-item" @tap="goImg(1)">
					<view class="imgs-show">
						<view class="add">+</view>
						<img class="bg" :src="'https://weixiu.lixinapp.com/' + img2" alt="">
					</view>
					<view class="imgs-name">身份证反面</view>
				</view>
				<view class="imgs-item" @tap="goImg(2)">
					<view class="imgs-show">
						<view class="add">+</view>
						<img class="bg" :src="'https://weixiu.lixinapp.com/' + img3" alt="">
					</view>
					<view class="imgs-name">手持身份证</view>
				</view>
			</view>
			<view class="service">
				<view class="service-name">服务区域</view>
				<view class="section">
					<view class="item">
						<picker @change="bindPickerChange" :value="index1" :range="array1" range-key="name">
							<view class="uni-input">{{val1}}</view>
						</picker>
						<img src="../../static/images/icon.png" alt="">
					</view>
					<view class="item">
						<picker @change="bindPickerChange1" :value="index2" :range="array2" range-key="name">
							<view class="uni-input">{{val2}}</view>
						</picker>
						<img src="../../static/images/icon.png" alt="">
					</view>
					<view class="item">
						<picker @change="bindPickerChange2" :value="index3" :range="array3" range-key="name">
							<view class="uni-input">{{val3}}</view>
						</picker>
						<img src="../../static/images/icon.png" alt="">
					</view>
				</view>
			</view>
			<view class="mark">服务区域由平台开通，如未找到所在区域，可联系平台管理员</view>
			<view class="login" @tap="goSubmit">提交</view>
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
				img1: '',
				img2: '',
				img3: '',
				val1: '省',
				index1: 0,
				array1: [],
				id1: '',
				val2: '市',
				index2: 0,
				array2: [],
				id2: '',
				val3: '区',
				index3: 0,
				array3: [],
				id3: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/district/province',
						data: data1,
						success: function(res) {
							console.log(res)
							Toast.hideLoading()
							if(res.data.success == true) {
								self.array1 = res.data.body.list
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goSubmit() {
				if(this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if(this.img1 == '') {
					Toast.showToast('请上传身份证正面')
					return
				}
				if(this.img2 == '') {
					Toast.showToast('请上传身份证反面')
					return
				}
				if(this.img3 == '') {
					Toast.showToast('请上传手持身份证')
					return
				}
				if(this.val1 == '省') {
					Toast.showToast('请选择省份')
					return
				}
				if(this.val2 == '市') {
					Toast.showToast('请选择市')
					return
				}
				if(this.val3 == '区') {
					Toast.showToast('请选择区')
					return
				}
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid'),
					realName: this.user,
					identification1: this.img1,
					identification2: this.img2,
					identification3: this.img3,
					districtId: this.id3
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/improve/info',
						data: data1,
						success: function(res) {
							console.log(res)
							Toast.hideLoading()
							if(res.data.success == true) {
								console.log(res)
								uni.showModal({
									title: '提示',
									content: '您的资料已提交，我们将在1个工作日内审核您的申请，请留意通知',
									showCancel: false,
									confirmColor: '#006EE3',
									success: function(res) {
										if (res.confirm) {
											uni.reLaunch({
											    url: '/pages/login/login'
											})
										}
									}
								})
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goImg(type) {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						console.log(res)
						// 预览图片
						Toast.showLoading('上传中...', function() {
							uni.uploadFile({
								url: 'https://weixiu.lixinapp.com/app/service/maintainer/file/upload',
								filePath: res.tempFilePaths[0],
								name: 'file',
								formData: {
									mid: uni.getStorageSync('uid')
								},
								success: (uploadFileRes) => {
									Toast.hideLoading()
									let url = JSON.parse(uploadFileRes.data)
									if (type == 0) {
										self.img1 = url.body.fileUrl
									} else if (type == 1) {
										self.img2 = url.body.fileUrl
									} else if (type == 2) {
										self.img3 = url.body.fileUrl
									}
								},
								fail: (res) => {
									Toast.hideLoading()
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
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.val1 = this.array1[e.target.value].name
				this.id1 = this.array1[e.target.value].id
				this.getCity()
				this.val2 = '市'
				this.id2 = ''
				this.val3 = '区'
				this.id3 = ''
			},
			getCity() {
				let self = this
				let data2 = {
					mid: uni.getStorageSync('uid'),
					id: this.id1
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/district/city',
						data: data2,
						success: function(res) {
							console.log(res)
							Toast.hideLoading()
							if(res.data.success == true) {
								self.array2 = res.data.body.list
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			getTown() {
				let self = this
				let data2 = {
					mid: uni.getStorageSync('uid'),
					id: this.id2
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/district/county',
						data: data2,
						success: function(res) {
							console.log(res)
							Toast.hideLoading()
							if(res.data.success == true) {
								self.array3 = res.data.body.list
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.val2 = this.array2[e.target.value].name
				this.id2 = this.array2[e.target.value].id
				this.getTown()
				this.val3 = '区'
				this.id3 = ''
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.val3 = this.array3[e.target.value].name
				this.id3 = this.array3[e.target.value].id
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
			margin-top: 30upx;
			display: flex;
			flex-direction: column;

			.user {
				width: 100%;
				height: 70upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.user-name {
					width: 20%;
					font-size: 28upx;
					color: #333;
				}

				input {
					width: 80%;
					height: 70upx;
					padding: 0 24upx;
					box-sizing: border-box;
					font-size: 28upx;
					color: #333;
					border: 1px solid #eee;
					border-radius: 4px;
				}
			}

			.imgs {
				width: 100%;
				display: flex;
				justify-content: space-around;

				.imgs-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.imgs-show {
						width: 180upx;
						height: 180upx;
						border-radius: 4px;
						border: 1px solid #eee;
						overflow: hidden;
						display: flex;
						justify-content: space-around;
						align-items: center;
						position: relative;

						.add {
							font-size: 100upx;
							color: #333;
						}

						.bg {
							width: 100%;
							height: 100%;
							position: absolute;
							top: 0;
							left: 0;
							z-index: 10;
						}
					}

					.imgs-name {
						font-size: 28upx;
						color: #999;
						margin-top: 20upx;
					}
				}
			}

			.service {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 60upx;

				.service-name {
					width: 20%;
					font-size: 28upx;
					color: #333;
				}

				.section {
					width: 80%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item {
						width: 30%;
						height: 70upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 20upx;
						box-sizing: border-box;
						border: 1px solid #eee;
						border-radius: 4px;
						font-size: 28upx;
						color: #333;
						
						picker {
							width: 80%;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}

						img {
							width: 24upx;
							height: 24upx;
						}
					}
				}
			}

			.mark {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				font-size: 26upx;
				color: #666;
				margin-top: 30upx;
				text-align: center;
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
