<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">个人资料</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<view>修改头像</view>
				<view class="item-right">
					<img class="head" :src="portrait" @tap="goImg" alt="">
					<img class="back" src="../../static/images/myback.png" alt="">
				</view>
			</view>
			<view class="item">
				<view>昵称</view>
				<view class="item-right">
					<input type="text" v-model="name">
					<img class="back" src="../../static/images/myback.png" alt="">
				</view>
			</view>
			<view class="item" @tap="goCall">
				<view>手机号</view>
				<view class="item-right">
					<view>{{list.mobile}}</view>
					<img class="back" src="../../static/images/myback.png" alt="">
				</view>
			</view>
			<view class="item">
				<view>服务区域</view>
				<view class="item-right">
					<view>{{list.districtFullName}}</view>
					<img class="back" src="../../static/images/myback.png" alt="">
				</view>
			</view>
			<view class="entry" @tap="goApply">保存</view>
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
				name: '',
				portrait: '',
				head: '',
				list: {}
			}
		},
		onShow() {
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
						url: 'app/service/maintainer/maintainer/info',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.list = res.data.body
								uni.setStorageSync('call', self.list.mobile)
								self.name = self.list.name
								self.portrait = self.list.portrait
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goImg() {
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
									self.portrait = 'https://weixiu.lixinapp.com' + url.body.fileUrl
									self.head = url.body.fileUrl
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
			goCall() {
				uni.navigateTo({
					url: '/pages/validate/validate'
				})
			},
			goApply() {
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid'),
					name: this.name,
					portrait: this.portrait
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/modify/info',
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
			
			.item {
				width: 100%;
				height: 90upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #eee;
				font-size: 28upx;
				color: #333;
				
				.item-right {
					display: flex;
					align-items: center;
					
					.head {
						width: 70upx;
						height: 70upx;
						border-radius: 50%;
					}
					
					.back {
						width: 22upx;
						height: 29upx;
						margin-left: 24upx;
					}
					
					input {
						text-align: right;
					}
				}
			}
			
			.entry {
				width: 70%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				background: #006EE3;
				border-radius: 30px;
				font-size: 30upx;
				color: #FFFFFF;
				margin: 60upx auto 0;
			}
		}
	}
</style>
