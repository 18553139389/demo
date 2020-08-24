<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="backs" :Color="Color" :backColor="backColor" :isIcons="backs" bgColor="bg-shadeTop text-white" @Back="Back">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="items">
				<view class="items_list" style="margin-bottom: 30rpx;">
					<view class="items_name">资讯标题</view>
					<input v-if="state" type="text" v-model="user" placeholder="请输入资讯标题">
				</view>
				<view class="items_list">
					<view class="items_name">资讯详情</view>
						<textarea v-if="state" v-model="call" placeholder="请输入资讯详情" />
					</view>
				<view class="items_list" style="margin-top: 40rpx;">
					<view class="items_name">资讯视频（视频请控制在五分钟以内）</view>
					<view class="contains">
						<image src="../../static/images/shagnchuanzhaopin.png" @click="showPopup"></image>
						<view class="video" v-if="video.length > 0">
							<image @tap.stop="goPlay(k)" src="../../static/images/start.png" style="width: 68rpx;height: 68rpx;"></image>
							<view class="close" @tap="goDelete1(k)">X</view>
						</view>
					</view>
					<view class="img1" v-if="img2.length > 0">
						<view v-for="(v,k) in img2" :key="k" class="view" v-if="img2.length > 0">
							<image style="margin-bottom: 20rpx;" :src="v" @tap="goPreview(v)"></image>
							<view class="close" @tap="goDelete(k)">X</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btns" @tap="goResult">发布</view>
		<view class="play" v-if="show">
			<video :src="videoUrl" objectFit="cover"></video>
		</view>
		<uni-popup ref="showpopup" type="bottom">
			<ul class="bottom">
				<!-- <li @tap="goPicture">上传图片</li> -->
				<li @tap="goVideo">上传视频</li>
			</ul>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../../components/popup/uni-popup.vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				user: '',
				call: '',
				img1: '',
				img2: [],
				video: '',
				videoUrl: '',
				show: false,
				title: '发布',
				backs: true,
				state: true
			}
		},
		components: {
			uniPopup
		},
		onLoad() {

		},
		methods: {
			goResult() {
				let self = this
				if(this.user == '') {
					Toast.showToast('标题不能为空')
					return
				}
				if(this.call == '') {
					Toast.showToast('详情不能为空')
					return
				}
				// if(this.img1 == '') {
				// 	Toast.showToast('请上传封面')
				// 	return
				// }
				if(this.img2.length == 0 && this.video == '') {
					Toast.showToast('请上传视频或者图片')
					return
				}
				let img2 = this.img2.join('|')
				let data1 = {
					cmd: 'saveHearth',
					message: this.user,
					content: this.call,
					video_url: this.video,
					images: img2,
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.navigateTo({
								    url: '/pages/publicResult/publicResult'
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			showPopup() {
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
				})
			},
			goPicture() {
				this.$refs['showpopup'].close()
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
									url: 'https://xcx.boinhearing.cn/api/addimgs', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										self.video = []
										let obj = JSON.parse(uploadFileRes.data)
										self.img2.push(obj.objects[0])
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
			goVideo() {
				this.$refs['showpopup'].close()
				//从相册中选择视频上传
				let self = this
				uni.chooseVideo({
					compressed: true,
					maxDuration: 60,
					success: function(res) {
						if(res.duration > 300) {
							Toast.showToast('上传视频不能超过5分钟')
							return
						}
						Toast.showLoading('上传中...', function() {
							const uploadTask = uni.uploadFile({
								url: 'https://xcx.boinhearing.cn/api/addimgs', //仅为示例，非真实的接口地址
								filePath: res.tempFilePath,
								name: 'file',
								success: (uploadFileRes) => {
									Toast.hideLoading()
									let obj = JSON.parse(uploadFileRes.data)
									self.img2 = []
									self.video = obj.objects[0]
								},
								fail: (re) => {
									Toast.hideLoading()
									Toast.showToast('上传失败')
								}
							})
			
							uploadTask.onProgressUpdate((res) => {
								console.log('上传进度' + res.progress);
								console.log('已经上传的数据长度' + res.totalBytesSent);
								console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
							})
						})
					},
					fail: (res) => {
						console.log(JSON.stringify(res))
						Toast.hideLoading()
						Toast.showToast('上传失败了')
					}
				})
			},
			choose() {
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://xcx.boinhearing.cn/api/addimgs', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.img1 = obj.objects
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
			goPreview(url) {
				uni.previewImage({
					urls: url
				})
			},
			goDelete(k) {
				this.img2.splice(k,1)
			},
			goDelete1(k) {
				this.video.splice(k,1)
			},
			goDelete2(k) {
				this.img1 = ''
			},
			goPlay(k) {
				this.show = true
				this.videoUrl = this.video
				this.title = '关闭'
				this.state = false
			},
			Back() {
				if(this.title == '发布') {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.show = false
					this.title = '发布'
					this.state = true
				}
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
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.items {
				width: 100%;
				padding: 24rpx 24rpx 40rpx;
				box-sizing: border-box;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				background: #fff;
				
				.items_list {
					width: 100%;
					display: flex;
					flex-direction: column;
					
					.items_name {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 28rpx;
						color: #333;
						margin-bottom: 30rpx;
					}
					
					.contains {
						width: 100%;
						display: flex;
						align-items: center;
						
						.video {
							margin-right: 30rpx;
							position: relative;
							
							.close {
								width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
								background: red;
								font-size: 28rpx;
								color: #fff;
								display: flex;
								justify-content: center;
								align-items: center;
								position: absolute;
								top: -16rpx;
								right: -16rpx;
							}
						}
					}
					
					input {
						width: 100%;
						height: 70rpx;
						padding: 0 20rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						color: #333;
						background: #f6f6f6;
					}
					
					textarea {
						width: 100%;
						height: 300rpx;
						padding: 20rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						color: #333;
						background: #f6f6f6;
					}
					
					image {
						width: 68rpx;
						height: 64rpx;
						margin-right: 30rpx;
					}
					
					.img1 {
						width: 100%;
						border-radius: 4px;
						margin-top: 30rpx;
						position: relative;
						
						image {
							width: 100%;
							height: 300rpx;
						}
						
						.close {
							width: 32rpx;
							height: 32rpx;
							border-radius: 50%;
							background: red;
							font-size: 28rpx;
							color: #fff;
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							top: -16rpx;
							right: -16rpx;
						}
						
						.view {
							width: 100%;
							display: flex;
							flex-direction: column;
							position: relative;
							
							.close {
								width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
								background: red;
								font-size: 28rpx;
								color: #fff;
								display: flex;
								justify-content: center;
								align-items: center;
								position: absolute;
								top: -16rpx;
								right: -16rpx;
							}
						}
					}
				}
			}
		}
		
		.btns {
			width: 92%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			font-weight: 600;
			border-radius: 4px;
			background: #06A5C4;
			margin: 30rpx auto;
		}
		
		.bottom {
			width: 100%;
			background: #FFFFFF;
		
			li {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 14px;
				color: #333;
				border-bottom: 1px solid #eee;
			}
		}
		
		.play {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			background: #000000;
		
			.video-title {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				background: #FFFFFF;
				font-size: 14px;
				color: #333;
				text-align: center;
				z-index: 9999999;
				margin-top: 60upx;
			}
		
			video {
				width: 100%;
				height: calc(100vh - 150upx - var(--window-bottom));
			}
		}
	}
</style>
