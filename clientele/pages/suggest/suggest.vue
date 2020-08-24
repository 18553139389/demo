<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">投诉建议</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<!-- <view class="user">
				<view>投诉对象</view>
				<input type="text" v-model="user">
			</view> -->
			<view class="titles">投诉内容</view>
			<textarea v-model="content" placeholder="请输入投诉内容,以便我们提供更好的帮助" />
			<!-- <view class="titles">我的建议</view>
			<textarea v-model="suggest" placeholder="请输入我的建议" /> -->
			<view class="titles">图片上传</view>
			<view class="imgs">
				<image class="add" src="../../static/images/add.png" @tap="upHead"></image>
				<view class="img-list" v-for="(v,k) in imgs" :key="k" v-if="imgs.length > 0">
					<image :src="v" @tap="goPreview(k)"></image>
					<view class="close" @tap="goDel(k)">X</view>
				</view>
			</view>
			<view class="titles">联系方式</view>
			<input class="call" type="text" v-model="call" placeholder="便于我们与您联系">
			<view class="btns" @tap="goSubmit">提交</view>
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
				content: '',
				suggest: '',
				call: '',
				imgs: [],
				img: []
			}
		},
		onLoad() {
			
		},
		methods: {
			goSubmit() {
				let self = this
				if (this.content == '') {
					Toast.showToast('投诉内容不能为空')
					return
				}
				if (this.img.length == 0) {
					Toast.showToast('请上传图片')
					return
				}
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				let data1 = {
					uid: uni.getStorageSync('uid'),
					content: this.content,
					phone: this.call,
					images: this.img
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'addfeedback',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
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
			},
			upHead() {
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
									url: 'https://xcx.lmokzz.com/oklookcard/api/uploadmanyFile', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										console.log(uploadFileRes)
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.imgs.push('http://39.106.207.196' + obj.dataarr[0])
										self.img.push(obj.dataarr[0])
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
			goPreview(k) {
				uni.previewImage({
					current: k,
					urls: this.imgs
				})
			},
			goDel(k) {
				this.imgs.splice(k,1)
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
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.user {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				
				input {
					font-size: 28rpx;
					color: #333;
					border-bottom: 1px solid #eee;
					margin-left: 30rpx;
				}
			}
			
			.titles {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 28rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				color: #666;
				background: #f6f6f6;
			}
			
			textarea {
				width: 100%;
				height: 360rpx;
				background: #FFFFFF;
				padding: 28rpx;
				box-sizing: border-box;
				font-size: 26rpx;
				color: #333;
			}
			
			.imgs {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				
				image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 28rpx;
				}
				
				.img-list {
					width: 120rpx;
					height: 120rpx;
					position: relative;
					margin-right: 28rpx;
					
					image {
						width: 100%;
						height: 100%;
						border-radius: 4px;
					}
					
					.close {
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						background: red;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 24rpx;
						color: #fff;
						position: absolute;
						top: -15rpx;
						right: -15rpx;
					}
				}
			}
			
			.call {
				width: 100%;
				height: 90rpx;
				background: #FFFFFF;
				font-size: 28rpx;
				color: #333;
				padding: 0 28rpx;
				box-sizing: border-box;
			}
			
			.btns {
				width: 240rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 28rpx;
				color: #333;
				border-radius: 30px;
				border: 1px solid #999;
				margin: 40rpx 0;
			}
		}
	}
</style>
