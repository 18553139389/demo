<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">法律咨询</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<!-- <picker @change="bindPickerChange" :value="index" :range="array">
				<view class="question1">
					<input type="text" v-model="val1" placeholder="请选择" disabled>
					<image src="../../static/images/san.png"></image>
				</view>
			</picker> -->
			<picker @change="bindPickerChange1" :value="index1" :range="array1">
				<view class="address">
					<view>焦作市：</view>
					<view class="question2">
						<input type="text" v-model="val2" placeholder="请选择" disabled>
						<image src="../../static/images/san.png"></image>
					</view>
				</view>
			</picker>
			<view class="section">
				<!-- <input type="text" v-model="tit" placeholder="咨询标题"> -->
				<textarea v-model="val" placeholder="请输入咨询内容(不超过500字)" />
				<view class="upload">
					<image class="add" src="../../static/images/add.png" @tap="showPopup"></image>
					<view class="img-list" v-for="(v,k) in imgs" :key="k" v-if="imgs.length > 0">
						<image :src="v" @tap="goPreview(k)"></image>
						<view class="close" @tap="goDel(k)">X</view>
					</view>
					<view class="img-list" v-for="(v,k) in videos" :key="k" v-if="videos.length > 0">
						<image src="../../static/images/start.png"></image>
						<view class="close" @tap="goDel1(k)">X</view>
					</view>
				</view>
			</view>
			<view class="btn" @tap="goSubmit">提交</view>
		</view>
		<uni-popup ref="showpopup" type="bottom">
			<ul class="bottom">
				<li @tap="goPicture">上传图片</li>
				<li @tap="goVideo">上传视频</li>
			</ul>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				val1: '',
				val2: '',
				val: '',
				tit: '',
				index: 0,
				index1: 0,
				array: ['刑事','民事','行政','国家赔偿','司法救助'],
				array1: ['山阳区','解放区','中站区','马村区','修武县','武陟县','温县','博爱县','市属企业'],
				imgs: [],
				videos: []
			}
		},
		components: {
			uniPopup
		},
		onLoad() {
			
		},
		methods: {
			bindPickerChange(e) {
				console.log(e)
				this.val1 = this.array[e.detail.value]
			},
			bindPickerChange1(e) {
				this.val2 = this.array1[e.detail.value]
			},
			showPopup() {
				if(this.imgs.length >= 3) {
					Toast.showToast('最多上传3张图片')
					return
				}
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
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
			goDel1(k) {
				this.videos.splice(k,1)
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
									url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										console.log(uploadFileRes)
										self.videos = []
										let obj = JSON.parse(uploadFileRes.data)
										self.imgs.push(obj.result)
										console.log(self.imgs)
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
						console.log(res)
						Toast.showLoading('上传中...', function() {
							const uploadTask = uni.uploadFile({
								url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
								filePath: res.tempFilePath,
								name: 'file',
								success: (uploadFileRes) => {
									console.log(uploadFileRes)
									Toast.hideLoading()
									self.imgs = []
									let obj = JSON.parse(uploadFileRes.data)
									self.videos.push(obj.result)
									console.log(self.videos)
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
			goSubmit() {
				let self = this
				if (this.val2 == '') {
					Toast.showToast('请选择地址')
					return
				}
				// if (this.tit == '') {
				// 	Toast.showToast('标题不能为空')
				// 	return
				// }
				if (this.val == '') {
					Toast.showToast('内容不能为空')
					return
				}
				let data1 = {
					title: this.tit,
					address: this.val2,
					mes: this.val,
					file: this.imgs.join('|'),
					video: this.videos.join('|'),
					uid: uni.getStorageSync('uid')
				}
				let data = {
					url: 'lawyerawns',
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
		background: #f6f6f6;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.bottom {
			width: 100%;
			background: #FFFFFF;
		
			li {
				width: 100%;
				height: 110upx;
				line-height: 110upx;
				text-align: center;
				font-size: 15px;
				color: #333;
				border-bottom: 1px solid #eee;
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;
			
			.question1 {
				width: 100%;
				height: 70rpx;
				border-radius: 4px;
				background: #FFFFFF;
				padding: 0 24rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				input {
					width: 85%;
					height: 70rpx;
					font-size: 28rpx;
					color: #333;
				}
				
				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
			
			.address {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #333;
				margin-top: 30rpx;
				
				.question2 {
					width: 80%;
					height: 70rpx;
					border-radius: 4px;
					background: #FFFFFF;
					padding: 0 24rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					input {
						width: 85%;
						height: 70rpx;
						font-size: 28rpx;
						color: #333;
					}
					
					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
			
			.section {
				width: 100%;
				background: #FFFFFF;
				border-radius: 4px;
				padding: 24rpx;
				box-sizing: border-box;
				margin-top: 30rpx;
				
				input {
					width: 100%;
					height: 90rpx;
					font-size: 28rpx;
					color: #333;
				}
				
				textarea {
					width: 100%;
					height: 300rpx;
					font-size: 28rpx;
					color: #333;
				}
				
				.upload {
					width: 100%;
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
			}
			
			.btn {
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 4px;
				background: #06A5C4;
				font-size: 30rpx;
				color: #FFFFFF;
				margin: 60rpx auto 0;
			}
		}
	}
</style>
