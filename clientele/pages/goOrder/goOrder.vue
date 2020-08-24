<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">下单</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="head">填写订单信息</view>
			<view class="list">
				<view class="list-item">
					<view>姓名</view>
					<input type="text" v-model="link" placeholder="请输入姓名">
				</view>
				<view class="list-item">
					<view>联系方式</view>
					<input type="text" v-model="call" placeholder="请输入联系方式">
				</view>
				<view class="list-item">
					<view>地址</view>
					<input type="text" v-model="address" placeholder="请输入地址">
				</view>
				<view class="list-item">
					<view>上传凭证</view>
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
			<view class="btn" @tap="goOrder">提交</view>
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
				link: '',
				call: '',
				address: '',
				imgs: [],
				img: [],
				ids: ''
			}
		},
		onLoad(option) {
			this.ids = option.id
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
				this.img.splice(k,1)
				this.imgs.splice(k,1)
			},
			goOrder() {
				let self = this
				if (this.link == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				if (this.address == '') {
					Toast.showToast('地址不能为空')
					return
				}
				if (this.img.length == 0) {
					Toast.showToast('请上传图片')
					return
				}
				let data1 = {
					uid: uni.getStorageSync('uid'),
					cid: this.ids,
					name: this.link,
					phone: this.call,
					address: this.address,
					images: this.img
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'paycertificates',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('下单成功')
								setTimeout(() => {
									uni.navigateTo({
									    url: '/pages/result/result'
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
			border-top: 10rpx solid #eee;
			
			.head {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				padding: 0 28rpx 0 60rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				color: #333;
				border-bottom: 1px solid #eee;
				position: relative;
			}
			
			.head:before {
				content: '';
				position: absolute;
				width: 3px;
				height: 24rpx;
				border-radius: 30px;
				top: 33rpx;
				left: 28rpx;
				background: #00C800;
			}
			
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
			
			.btn {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				margin: 0 auto;
				border-radius: 30px;
				background: #00C700;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
</style>
