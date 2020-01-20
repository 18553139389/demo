<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">上报材料</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<p class="titles">请为本次上传的图片或视频添加相应的描述（活动名主题、所属车型）</p>
			<view class="types">
				<span>请选择型号：</span>
				<!-- <span style="margin-left: 16upx;font-weight: 600;">{{type}}</span> -->
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
					<img src="../../static/images/xiala.png" alt="">
				</view>
			</view>
			<view class="files">
				<view class="content">
					<textarea v-model="text" placeholder="请简单描述下您上传的资料~"></textarea>
				</view>
				<ul class="upload">
					<li class="picture" @click="showPopup">
						<img src="../../static/images/shangchuanziliao.png" alt="">
						<span>上传图片/视频</span>
					</li>
					<li class="picture" v-for="(v,k) in list" :key="k">
						<img :src="v" alt="" @click="preview">
						<img class="del" src="../../static/images/del.png" @tap="delPicture(k)" alt="">
					</li>
					<li class="picture" v-for="(v,k) in videoList" :key="k">
						<img @click.stop="goPlay(k)" src="../../static/images/start.png" alt="">
						<img class="del" src="../../static/images/del.png" @tap="delVideo(k)" alt="">
					</li>
				</ul>
			</view>
			<view class="warn">
				<p>（上传素材说明：此时请上传市场素材，包括照片、视频等；为保证您上传的素材能够很方便的被其他同事使用，请注意图片大小在5M左右/张，格式为jpeg/jpg/png;视频大小控制200M以内，格式为mp4/mov;文件太大可能会失败。）</p>
				<view class="upload" @tap="goSubmit">一键上传</view>
				<view class="history" @tap="goReport">上传记录</view>
			</view>
		</view>
		<view class="play" v-if="show">
			<view class="video-title" @click="hideVideo">关闭</view>
			<video :src="videoUrl" objectFit="cover"></video>
		</view>
		<uni-popup ref="showpopup" type="bottom" @change="change">
			<ul class="bottom">
				<li @click="goPicture">上传图片</li>
				<li @click="goVideo">上传视频</li>
			</ul>
		</uni-popup>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	import uniPopup from '../../components/popup/uni-popup.vue'
	export default {
		data() {
			return {
				Color: '#333',
				type: '型号',
				text: '',
				ids: '',
				list: [],
				videoList: [],
				videoUrl: '',
				show: false,
				index: 0,
				array: []
			}
		},
		components: {
			uniPopup
		},
		onShow() {
			this.message = uni.getStorageSync('message')
			this.init()
		},
		methods: {
			init() {
				let self = this
				//请求全部产品数据
				let data2 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/all',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								self.array = res.data.body.list
								self.ids = self.array[0].id
								if (self.$store.state.id) {
									self.array.forEach((item, index) => {
										if (item.id == self.$store.state.id) {
											self.ids = item.id
											self.index = index
										}
									})
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
				let ids = this.array[this.index].id
				this.$store.commit('changeId', ids)
			},
			change(e) {
				console.log('是否打开:' + e.show)
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
									url: 'https://sale.clingcenter.net/app/service/file/upload', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'files',
									formData: {
										Token: self.message.Token
									},
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.list.push(obj.body.files)
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
			preview() {
				uni.previewImage({
					urls: this.list,
					success: function(data) {
						console.log(JSON.stringify(data))
					},
					fail: function(err) {
						console.log(err.errMsg)
					}
				})
			},
			dataURLtoFile(dataurl, filename) { //将base64转换为文件
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {
					type: mime
				});

			},
			goVideo() {
				this.$refs['showpopup'].close()
				//从相册中选择视频上传
				let self = this
				uni.chooseVideo({
					compressed: false,
					success: function(res) {
						Toast.showLoading('上传中...', function() {
							const uploadTask = uni.uploadFile({
								url: 'https://sale.clingcenter.net/app/service/file/upload', //仅为示例，非真实的接口地址
								filePath: res.tempFilePath,
								name: 'files',
								formData: {
									Token: self.message.Token
								},
								success: (uploadFileRes) => {
									Toast.hideLoading()
									let obj = JSON.parse(uploadFileRes.data)
									self.videoList.push(obj.body.files)
									self.videoUrl = obj.body.files
								},
								fail: (re) => {
									console.log(JSON.stringify(re))
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

				// 相册选择
				// plus.gallery.pick(function(a) {
				// 	plus.io.resolveLocalFileSystemURL(a, function(entry) {
				// 		entry.file(function(file){
				// 			var fileReader = new plus.io.FileReader()
				// 				fileReader.readAsDataURL(file)
				// 				var formdata = new FormData()
				// 				var newfile
				// 				fileReader.onloadend = function(f){
				// 					newfile = self.dataURLtoFile(f.target.result.toString(),'detail.mp4')//图片文件流
				// 					var formdata = new FormData()
				// 					formdata.append('file', newfile.file)
				// 					let data2 = {
				// 						Token: this.message.Token,
				// 						files: formdata
				// 					}
				// 					Toast.showLoading('上传中...', function() {
				// 						let data = {
				// 							url: '/app/service/file/upload',
				// 							data: data2,
				// 							success: (res) => {
				// 								if (res.data.success == true) {
				// 									Toast.hideLoading()
				// 									Toast.showToast('上传成功')
				// 								} else {
				// 									Toast.hideLoading()
				// 									Toast.showToast(res.data.msg)
				// 								}
				// 							}
				// 						}
				// 						ajax(data)
				// 					})
				// 				}
				// 		})
				// 	}, function(e) {
				// 		console.log("读取拍照文件错误：" + e.message);
				// 	});
				// }, function(a) {}, {
				// 	filter: "video"
				// })
			},
			goPlay(k) {
				this.show = true
				this.videoUrl = this.videoList[k]
			},
			delPicture(k) {
				this.list.splice(k, 1)
			},
			delVideo(k) {
				this.videoList.splice(k, 1)
			},
			hideVideo() {
				this.show = false
			},
			goSubmit() {
				let self = this
				if (this.text == '') {
					Toast.showToast('描述内容不能为空')
					return
				}

				if (this.list.length == 0 && this.videoList.length == 0) {
					Toast.showToast('请上传图片或者视频')
					return
				}

				let arr = [...this.list, ...this.videoList]
				let files = ''
				if (arr.length == 1) {
					files = arr[0]
				} else {
					files = arr.join('|')
				}
				console.log(this.ids)
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					product: this.ids,
					describes: this.text,
					files
				}
				Toast.showLoading('上传中...', function() {
					let data = {
						url: '/app/service/user/upload',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								self.text = ''
								self.list = []
								self.videoList = []
								Toast.showToast('上传成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goReport() {
				uni.navigateTo({
					url: '/pages/history/history'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;

			.titles {
				width: 100%;
				font-size: 14px;
				color: #666;
			}

			.types {
				width: 100%;
				display: flex;
				align-items: center;
				margin: 24upx 0;

				.uni-list-cell-db {
					display: flex;
					align-items: center;
				}

				span {
					font-size: 14px;
					color: #333;
				}

				img {
					width: 22upx;
					height: 15upx;
					margin-left: 16upx;
				}
			}

			.files {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 24upx;
				box-sizing: border-box;
				background: #FAFAFA;

				.content {
					width: 100%;
					height: 200upx;
					margin-bottom: 40upx;

					textarea {
						width: 100%;
						height: 100%;
						font-size: 12px;
					}
				}

				.upload {
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					li {
						width: 22%;
						float: left;
						margin-right: 3%;
						margin-bottom: 3%;
					}

					.picture {
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 12px;
						color: #666;
						position: relative;

						span {
							text-align: center;
						}

						img {
							width: 130upx;
							height: 130upx;
							margin-bottom: 20upx;
						}

						.del {
							width: 30upx;
							height: 30upx;
							position: absolute;
							top: -10upx;
							right: -10upx;
						}

						video {
							width: 120upx;
							height: 120upx;
						}
					}
				}
			}

			.warn {
				width: 100%;
				font-size: 14px;
				color: #999;

				p {
					margin: 30upx 0;
					font-size: 12px;
				}

				.upload {
					width: 90%;
					margin: 50upx auto 30upx;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					font-size: 15px;
					color: #FFFFFF;
					border-radius: 30px;
					background: #0081FF;
				}

				.history {
					width: 100%;
					height: 100upx;
					line-height: 100upx;
					text-align: center;
					font-size: 15px;
					color: #333;
					text-align: center;
				}
			}
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
			position: absolute;
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
				z-index: 999999;
				margin-top: 60upx;
			}

			video {
				width: 100%;
				height: calc(100vh - 150upx - var(--window-bottom));
			}
		}
	}
</style>
