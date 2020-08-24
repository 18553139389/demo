<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">我想合作</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<view class="list-item">
					<view>联系人</view>
					<input type="text" v-model="link" placeholder="请输入联系人">
				</view>
				<view class="list-item">
					<view>联系方式</view>
					<input type="text" v-model="call" placeholder="请输入联系方式">
				</view>
				<view class="list-item">
					<view>合作意向</view>
					<textarea v-model="content" placeholder="请输入您的合作意向" />
				</view>
				<view class="list-item">
					<view>合作资质</view>
					<view class="load">
						<view class="img-list" @tap="upLoad">
							<image src="../../static/images/add.png"></image>
						</view>
						<view class="img-list" v-for="(v,k) in imgs" :key="k">
							<image :src="v" @tap="goPreview(k)"></image>
							<view class="close" @tap="goDel(k)">X</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @tap="submit">提交</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				imgs: [],
				link: '',
				call: ''
			}
		},
		onLoad() {

		},
		methods: {
			upLoad() {
				if(this.imgs.length >= 3) {
					Toast.showToast('最多上传3张图片')
					return
				}
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
									url: 'https://zhr.lexishangcheng.com/api/addimgs', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.imgs.push(obj.dataList[0])
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
			},
			submit() {
				if(this.link == '') {
					Toast.showToast('联系人不能为空')
					return
				}
				
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				if(this.content == '') {
					Toast.showToast('合作意向不能为空')
					return
				}
				
				if(this.imgs.length == 0) {
					Toast.showToast('请上传资质图片')
					return
				}
				
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					name: this.link,
					content: this.content,
					fileUrl: this.imgs.join(','),
					phone: this.call
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/hezuo',
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
			position: relative;
			border-top: 10px solid #f6f6f6;
			background: #fff;
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.list-item {
					width: 100%;
					padding: 40rpx 28rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					font-size: 30rpx;
					color: #333;
					
					input {
						width: 100%;
						height: 70rpx;
						border-radius: 4px;
						background: #f6f6f6;
						padding: 0 24rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						color: #333;
						margin-top: 40rpx;
					}
					
					textarea {
						width: 100%;
						height: 260rpx;
						border-radius: 4px;
						padding: 24rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						color: #333;
						background: #f6f6f6;
						margin-top: 40rpx;
					}
					
					.load {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						margin-top: 40rpx;
						
						.img-list {
							width: 100rpx;
							height: 100rpx;
							position: relative;
							margin-right: 24rpx;
							margin-bottom: 24rpx;
							
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
				}
			}
		}
		
		.btn {
			width: 40%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 30px;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			background: #2862A1;
			margin: 60rpx auto;
		}
	}
</style>
