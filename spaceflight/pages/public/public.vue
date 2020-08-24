<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">发布供需</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="navs">
				<view :class="navIndex == k ? 'active nav-item' : 'nav-item'" v-for="(v,k) in nav" :key="k" @tap="changeNav(k)">{{v.name}}</view>
			</view>
			<view class="content" style="margin-bottom: 30rpx;">
				<view class="t_title">
					<view>供需标题</view>
					<input type="text" v-model="tit" placeholder="请输入标题">
				</view>
			</view>
			<view class="content" style="margin-bottom: 30rpx;">
				<view class="t_title">
					<view>封面图</view>
					<view class="upload" style="margin-top: 30rpx;">
						<image class="add" src="../../static/images/add.png" @tap="upHead"></image>
						<view class="img-list" v-for="(v,k) in banner" :key="k" v-if="banner.length > 0">
							<image :src="v" @tap="goPreview2(k)"></image>
							<view class="close" @tap="goDel2(k)">X</view>
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<textarea v-model="val" placeholder="供需内容信息" />
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
			<view class="mark">
				<view :class="v.state ? 'active mark-item' : 'mark-item'" v-for="(v,k) in label" :key="k" @tap="changeLabel(k)">{{v.title}}</view>
			</view>
			<view class="need">
				<view class="mark-left">需求标签：</view>
				<input type="text" v-model="add" placeholder="不能超过4个字">
			</view>
		</view>
		<view class="btn" @tap="submit">发布</view>
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
				backColor: '#fff',
				nav: [{
					name:'发布需求',
					id: 1
				},{
					name:'寻找需求',
					id: 2
				}],
				navId: 1,
				navIndex: 0,
				tit: '',
				val: '',
				add: '',
				label: [],
				imgs: [],
				videos: [],
				banner: [],
				id: '',
				type: -1
			}
		},
		onLoad(option) {
			if(option.type == 0) {
				this.type = option.type
				this.id = option.id
			}
			this.init()
		},
		components: {
			uniPopup
		},
		methods: {
			changeNav(k) {
				if(this.type == 0) {
					return
				}
				this.navIndex = k
				this.navId = this.nav[k].id
			},
			changeLabel(k) {
				this.label[k].state = !this.label[k].state
				this.$forceUpdate()
			},
			goPreview2(k) {
				uni.previewImage({
					current: k,
					urls: this.banner
				})
			},
			goDel2(k) {
				this.banner.splice(k,1)
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
			editor(id) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					gxId: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/editGongXuInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.tit = res.data.dateList.title
								self.banner.push(res.data.dateList.imageUrl)
								self.val = res.data.dateList.content
								if(res.data.dateList.imageUrls) {
									self.imgs = res.data.dateList.imageUrls
								}
								if(res.data.dateList.vedioUrl) {
									self.videos = res.data.dateList.vedioUrl
								}
								let mark = res.data.dateList.lablesId
								for(let i=0;i<mark.length;i++) {
									for(let j=0;j<self.label.length;j++) {
										if(mark[i] == self.label[j].id) {
											self.label[j].state = true
										}
									}
								}
								self.add = res.data.dateList.lable
								self.navIndex = parseInt(res.data.dateList.gongXuType) - 1
								self.$forceUpdate()
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			init(id) {
				let self = this
				//获取顶部导航列表
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/lableList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.label = res.data.dateList
								self.label.forEach((item,index) => {
									item.state = false
								})
								//编辑发布供需
								if(self.type == 0) {
									self.editor(self.id)
								}
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
				if(this.imgs.length >= 3) {
					Toast.showToast('最多上传3张图片')
					return
				}
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
				})
			},
			upHead() {
				//从相册中选择图片上传
				let self = this
				if(self.banner.length == 1) {
					Toast.showToast('封面图只能上传一张')
					return
				}
				uni.chooseImage({
					count: 1,
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
										self.banner.push(obj.dataList[0])
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
									url: 'https://zhr.lexishangcheng.com/api/addimgs', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										self.videos = []
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
								url: 'https://zhr.lexishangcheng.com/api/addimgs', //仅为示例，非真实的接口地址
								filePath: res.tempFilePath,
								name: 'file',
								success: (uploadFileRes) => {
									console.log(uploadFileRes)
									Toast.hideLoading()
									self.imgs = []
									let obj = JSON.parse(uploadFileRes.data)
									self.videos.push(obj.dataList[0])
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
			submit() {
				if(this.tit == '') {
					Toast.showToast('供需标题不能为空')
					return
				}
				
				if(this.banner.length == 0) {
					Toast.showToast('请上传封面图')
					return
				}
				
				if(this.val == '') {
					Toast.showToast('供需内容不能为空')
					return
				}
				
				if(this.imgs.length == 0 && this.videos.length == 0) {
					Toast.showToast('请上传图片或者视频')
					return
				}
				let labels = []
				this.label.forEach((item,index) => {
					if(item.state) {
						labels.push(item.id)
					}
				})
				// if(labels.length == 0) {
				// 	Toast.showToast('请选择标签')
				// 	return
				// }
				
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					type: this.navId,
					gxId: '',
					title: this.tit,
					image: this.banner.join(','),
					imageUrls: this.imgs.join(','),
					videoUrl: this.videos.join(','),
					lables: this.add,
					lableId: labels.join(','),
					content: this.val
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/addMyGX',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('已提交后台审核')
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
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.navs {
				width: 100%;
				display: flex;
				padding: 40rpx 0;
				
				.nav-item {
					width: 180rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 30rpx;
					color: #666;
					box-shadow: 0 0 5px rgba(0,0,0,.2);
					margin-right: 40rpx;
					border-radius: 30px;
					
					&.active {
						// background: #2862A1;
						color: #2862A1;
					}
				}
			}
			
			.content {
				width: 100%;
				padding: 24rpx 24rpx 0;
				border-radius: 4px;
				background: #f6f6f6;
				
				textarea {
					width: 100%;
					height: 280rpx;
					margin-bottom: 30rpx;
				}
				
				.t_title {
					width: 100%;
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					color: #666;
					
					input {
						width: 100%;
						height: 90rpx;
						line-height: 90rpx;
						font-size: 28rpx;
						color: #666;
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
				
				.upload {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					
					image {
						width: 120rpx;
						height: 120rpx;
						margin-right: 28rpx;
						margin-bottom: 28rpx;
					}
					
					.img-list {
						width: 120rpx;
						height: 120rpx;
						position: relative;
						margin-right: 28rpx;
						margin-bottom: 28rpx;
						
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
			
			.mark {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding: 40rpx 0 12rpx;
				
				.mark-item {
					padding: 6rpx 20rpx;
					border-radius: 30px;
					border: 1px solid #0081FF;
					font-size: 28rpx;
					color: #0081FF;
					margin: 0 28rpx 28rpx 0;
					
					&.active {
						background: #0081FF;
						color: #fff;
					}
				}
			}
			
			.need {
				width: 100%;
				height: 60rpx;
				display: flex;
				align-items: center;
				padding-bottom: 24rpx;
				
				.mark-left {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 28rpx;
					color: #666;
				}
				
				input {
					height: 60rpx;
					font-size: 28rpx;
					color: #666;
					margin-left: 28rpx;
				}
			}
		}
		
		.btn {
			width: 40%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			border-radius: 30px;
			background: #2862A1;
			margin: 60rpx auto;
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
	}
</style>
