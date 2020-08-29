<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">法律咨询</view>
			<view class="forms">
				<view class="item">
					<view class="titles">焦作市</view>
					<xfl-select
					:list="array1"
					:clearable="false"
					:showItemNum="9"
					:listShow="false"
					:isCanInput="false"  
					:placeholder = "'请选择'"
					:initValue="val"
					:selectHideType="'independent'"
					@change="change"
					>
					</xfl-select>
				</view>
				<view class="content">
					<textarea v-model="content" placeholder="请输入咨询内容" />
					<view class="imgs">
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
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import xflSelect from '../../components/xfl-select/xfl-select.vue'
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				user: '',
				pass: '',
				val: '',
				array1: ['山阳区', '解放区', '中站区', '马村区', '修武县', '武陟县', '温县', '博爱县', '市属企业'],
				model1: '',
				title: '',
				content: '',
				imgs: [],
				videos: [],
				tit: ''
			}
		},
		components: {
			xflSelect,
			uniPopup
		},
		onLoad() {

		},
		methods: {
			showPopup() {
				if(this.imgs.length >= 3) {
					Toast.showToast('最多上传3张图片')
					return
				}
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
				})
			},
			change(e) {
				console.log(e)
				this.val = e.newVal
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
						res.tempFilePaths.forEach((item, index) => {
							uni.uploadFile({
								url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								success: (uploadFileRes) => {
									self.videos = []
									let obj = JSON.parse(uploadFileRes.data)
									self.imgs.push(obj.result)
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
						const uploadTask = uni.uploadFile({
							url: 'http://47.94.251.81:9008/api/addimg', //仅为示例，非真实的接口地址
							filePath: res.tempFilePath,
							name: 'file',
							success: (uploadFileRes) => {
								self.imgs = []
								let obj = JSON.parse(uploadFileRes.data)
								self.videos.push(obj.result)
							},
							fail: (re) => {
								Toast.showToast('上传失败')
							}
						})
									
						uploadTask.onProgressUpdate((res) => {
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
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
				if (this.val == '') {
					Toast.showToast('请选择地址')
					return
				}
				if (this.content == '') {
					Toast.showToast('内容不能为空')
					return
				}
				let data1 = {
					title: this.tit,
					address: this.val,
					mes: this.content,
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
							Toast.showToast('提交成功')
							setTimeout(() => {
								uni.navigateBack({
								    delta: 1
								})
							},500)
						} else {
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
	li {
		list-style: none;
	}
	
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		
		.bottom {
			width: 100%;
			background: #FFFFFF;
		
			li {
				width: 100%;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				font-size: 15px;
				color: #333;
				border-bottom: 1px solid #eee;
			}
		}

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

			.forms {
				width: 80%;
				border-top: 1px solid #eee;
				margin: 20rpx auto 0;

				.item {
					width: 100%;
					display: flex;
					flex-direction: column;

					.titles {
						font-size: 15px;
						font-weight: 600;
						color: #333;
						margin-top: 15rpx;
						margin-bottom: 10rpx;
					}
					
					input {
						width: 100%;
						height: 20rpx;
						border-radius: 4px;
						border: 1px solid #dcdfe6;
						padding: 0 3%;
						box-sizing: border-box;
						font-size: 14px;
					}
				}
				
				.content {
					width: 100%;
					height: 150rpx;
					border-radius: 4px;
					border: 1px solid #dcdfe6;
					padding: 1.5% 3%;
					box-sizing: border-box;
					font-size: 14px;
					margin-top: 15rpx;
					
					textarea {
						width: 100%;
						height: 70rpx;
						font-size: 14px;
					}
					
					.imgs {
						width: 100%;
						display: flex;
						align-items: center;
						margin-top: 30rpx;
						
						.add {
							width: 30rpx;
							height: 30rpx;
							margin-right: 5rpx;
							border-radius: 4px;
						}
						
						.img-list {
							display: flex;
							position: relative;
							
							image {
								width: 30rpx;
								height: 30rpx;
								margin-right: 5rpx;
								border-radius: 4px;
							}
							
							.close {
								width: 8rpx;
								height: 8rpx;
								border-radius: 50%;
								background: red;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 8px;
								color: #fff;
								position: absolute;
								top: -10px;
								right: 0;
							}
						}
					}
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
			}
		}
	}
</style>
