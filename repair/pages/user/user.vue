<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">个人信息</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<view style="width: 160rpx;">头像</view>
				<view class="msg" @tap="goHead">
					<image class="head" :src="imgs ? imgs : '../../static/images/heads.png'"></image>
				</view>
			</view>
			<view class="item">
				<view style="width: 160rpx;">昵称</view>
				<view class="msg">
					<input type="text" v-model="nick" placeholder="修改昵称">
				</view>
			</view>
			<view class="btn" @tap="submit">确认修改</view>
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
				title: '',
				nick: '',
				list: {},
				imgs: '',
				img1: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/memberInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
								self.imgs = self.list.userIcon
								self.nick = self.list.nickName
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goHead() {
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
									url: 'http://123.56.237.159/runrepair/api/uploadImage',
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										console.log(uploadFileRes)
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.img1 = obj.dataList[0]
										self.imgs = 'http://123.56.237.159' + obj.dataList[0]
										console.log(self.imgs)
										Toast.showToast('上传成功')
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
			submit() {
				if(this.nick == '') {
					Toast.showToast('昵称不能为空')
					return
				}
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					userIcon: self.img1,
					nickName: self.nick
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/updateMemberInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
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
		background: #f5f5f5;
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
			border-top: 10px solid #f5f5f5;
			
			.item {
				width: 100%;
				padding: 28rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				background: #fff;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;
				color: #333;
				
				image {
					width: 30rpx;
					height: 30rpx;
				}
				
				.msg {
					display: flex;
					align-items: center;
					
					input {
						height: 60rpx;
						line-height: 60rpx;
						text-align: right;
						font-size: 28rpx;
						color: #666;
					}
					
					.head {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}
			}
			
			.btn {
				width: 50%;
				margin: 80rpx auto 0;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 28rpx;
				color: #fff;
				background: #F15903;
				border-radius: 30px;
			}
		}
	}
</style>
