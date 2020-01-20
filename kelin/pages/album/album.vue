<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品画册</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="product">
				<image :src="obj1.coverImage" mode="scaleToFill"></image>
				<view class="product-list">
					<view class="product-title">{{obj1.name}}</view>
					<view class="product-mask">{{obj1.textIntroduce}}</view>
					<view class="product-mask">{{obj1.otherIntroduce}}</view>
					<view class="product-mask">更新时间：{{obj.updateDate}}</view>
				</view>
			</view>
			<view class="btns">
				<view class="preview" @tap="downloader(obj.previewUrl)">预览</view>
				<view class="preview" style="border: 1px solid #0081FF;background: #FFFFFF;color: #0081FF;" @tap="goDown">下载({{size}}M)</view>
			</view>
			<ul class="mark">
				<li @click="goSuggest">
					<img src="../../static/images/fankui.png" alt="">
					<span>反馈</span>
				</li>
				<li @tap="shareInfo">
					<img src="../../static/images/fenxiang.png" alt="">
					<span>分享</span>
				</li>
				<li @tap="goZan">
					<img src="../../static/images/huace_dianzan.png" alt="">
					<span>点赞({{count}})</span>
				</li>
				<li @click="goStore">
					<img :src="store ? '../../static/images/huace_shoucang2.png' : '../../static/images/huace_shoucang.png'" alt="">
					<span>收藏</span>
				</li>
			</ul>
		</view>
		<view class="about" v-if="listData.length > 0">
			<view class="titles">产品画册</view>
			<ul>
				<li v-for="(v,k) in listData" :key="k" @tap="initData(v)">
					<image :src="v.coverImage" mode="scaleToFill"></image>
					<p>{{v.name}}</p>
					<p style="font-size: 12px;color: #999;">{{v.content}}</p>
				</li>
			</ul>
		</view>
		<view class="suggest" v-if="show" @tap="goHide">
			<view class="suggest-bg" @click.stop="">
				<view class="contents">如果您对材料有任何意见或建议，请在此填写提交</view>
				<view class="texts">
					<textarea v-model="val" placeholder="请输入反馈信息~" cursor-spacing="100" @input="maxFont" @confirm="goSubmit" maxlength="100"></textarea>
					<span>{{total}}/100</span>
				</view>
				<view class="btns" @tap.stop="goSubmit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import share from "../../common/share.js"
	import {
		ajax
	} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				store: false,
				liked: false,
				val: '',
				show: false,
				listData: [],
				obj: {},
				obj1: {},
				count: 0,
				total: 0,
				size: 0,
				ids: '',
				href: ''
			}
		},
		onLoad(option) {
			this.message = uni.getStorageSync('message')
			this.ids = option.id
			this.obj1 = JSON.parse(option.list)
			if (option.lists) {
				this.obj = JSON.parse(option.lists)
				console.log(this.obj)
				this.count = this.obj.likedCount
				this.store = this.obj.collected
				this.liked = this.obj.liked
				this.size = (this.obj.size / 1048576).toFixed(2)
			} else {
				this.initData()
			}
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let data2 = {
					Token: this.message.Token,
					id,
					infoType: 3
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/similar',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									self.listData = res.data.body.list
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
			initData(item) {
				let self = this
				self.obj1 = item
				//请求空调产品画册数据
				let data2 = {
					Token: this.message.Token,
					id: item.id,
					infoType: 3
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.obj = res.data.body.info
								self.store = self.obj.collected
								self.liked = self.obj.liked
								self.ids = self.obj.product.id
								self.count = self.obj.likedCount
								self.size = (self.obj.size / 1048576).toFixed(2)
								self.init(item.id)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goStore() {
				let self = this
				if (!this.store) {
					//收藏成功
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 3
					}
					let data = {
						url: '/app/service/collect/add',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.store = !self.store
								Toast.showToast('收藏成功')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				} else {
					//取消收藏
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 3
					}
					let data = {
						url: '/app/service/collect/delete',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.store = !self.store
								Toast.showToast('取消收藏')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				}
			},
			goZan() {
				let self = this
				if (!this.liked) {
					//点赞成功
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 3
					}
					let data = {
						url: '/app/service/like/add',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.count++
								self.liked = !self.liked
								Toast.showToast('点赞成功')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				} else {
					//取消点赞
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 3
					}
					let data = {
						url: '/app/service/like/delete',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.count--
								self.liked = !self.liked
								Toast.showToast('取消点赞')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				}
			},
			goDown() {
				let that = this
				Toast.showLoading('下载中...', function() {
					plus.io.resolveLocalFileSystemURL('_downloads/' + that.obj.name,
						function(entry) { //如果已存在文件，则打开文件
							if (entry.isFile) {
								Toast.hideLoading()
								Toast.showToast("文件已存在:" + entry.fullPath)
								// plus.runtime.openFile('_downloads/' + that.obj.name)
							}
						},
						function() {
							var dtask = plus.downloader.createDownload(that.obj.content, {
								filename: '_downloads/' + that.obj.name
							}, function(d, status) {
								if (status == 200) {
									Toast.hideLoading()
									Toast.showToast("下载成功")
									plus.io.resolveLocalFileSystemURL('_downloads/' + that.obj.name,
										function(entry) { //如果已存在文件，则打开文件
											if (entry.isFile) {
												Toast.showToast(entry.fullPath)
											}
										}
									)
								} else {
									Toast.showToast("下载失败: " + status)
								}
							})
							dtask.start()
						}
					)
				})
			},
			downloader(path) {
				let url = 'https://sale.clingcenter.net/' + path
				uni.navigateTo({
					url: `/pages/parse/parse?url=${url}&type=0`
				})
				// let that = this
				// Toast.showLoading('加载中...', function() {
				// 	const downloadTask = uni.downloadFile({
				// 		url: that.obj.content,
				// 		success: (res) => {
				// 			Toast.hideLoading()
				// 			let filePath = res.tempFilePath
				// 			console.log(filePath)
				// 			uni.saveFile({
				// 				tempFilePath: filePath,
				// 				success: function(re) {
				// 					let savedFilePath = re.savedFilePath
				// 					console.log(savedFilePath)
				// 					uni.openDocument({
				// 						filePath: savedFilePath,
				// 						success: function(r) {
				// 							console.log('打开文档成功')
				// 						}
				// 					})
				// 				}
				// 			})
				// 		}
				// 	})
				// })
			},
			onBackPress() {
				//监听back键，关闭弹出菜单
				if (this.shareObj.shareMenu.isVisible()) {
					this.shareObj.shareMenu.hide();
					this.shareObj.alphaBg.hide();
					return true
				}
			},
			shareInfo() {
				let shareInfo = {
					href: `https://sale.clingcenter.net/static/share/productAlbum.html?ids=${this.ids}&token=${this.message.Token}`,
					title: this.obj1.name,
					desc: this.obj1.textIntroduce,
					imgUrl: this.obj1.coverImage
				}
				let shareList = [{
						icon: "/static/images/wx.png",
						text: "微信好友",
					},
					{
						icon: "/static/images/pyq.png",
						text: "朋友圈"
					},
					{
						icon: "/static/images/qq.png",
						text: "QQ",
					}
				]
				this.shareObj = share(shareInfo, shareList, function(index) {
					let shareObj = {
						href: shareInfo.href || "",
						title: shareInfo.title || "",
						summary: shareInfo.desc || "",
						success: (res) => {
							console.log("success:" + JSON.stringify(res));
						},
						fail: (err) => {
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSceneSession";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSenceTimeline";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider = "qq";
							shareObj.type = 1;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
					}
				})
				this.$nextTick(() => {
					this.shareObj.alphaBg.show()
					this.shareObj.shareMenu.show()
				})
			},
			maxFont() {
				if (this.val.length >= 100) {
					Toast.showToast('反馈内容不能超过100字')
					return
				}
				this.total = this.val.length
			},
			goSuggest() {
				this.show = true
			},
			goSubmit() {
				let self = this
				if (self.val == '') {
					Toast.showToast('内容不能为空')
					return
				}
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
					infoType: 3,
					content: this.val
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/feedback/add',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								self.show = false
								self.val = ''
								self.total = 0
								Toast.showToast('提交成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goUpload() {
				uni.switchTab({
					url: '/pages/upload/upload'
				})
			},
			goHide() {
				this.show = false
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
		position: relative;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;

			.product {
				width: 100%;
				display: flex;

				image {
					width: 45%;
					height: 220upx;
				}

				.product-list {
					width: 55%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-left: 30upx;
					box-sizing: border-box;

					.product-title {
						width: 100%;
						font-size: 14px;
						color: #333;
						overflow: hidden;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.product-mask {
						width: 100%;
						font-size: 12px;
						color: #999;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

			.btns {
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-top: 30upx;

				.preview {
					padding: 0 80upx;
					height: 60upx;
					line-height: 60upx;
					text-align: center;
					font-size: 14px;
					color: #FFFFFF;
					background: #0081FF;
					border-radius: 30px;
				}
			}

			.mark {
				width: 100%;
				display: flex;
				align-items: center;
				margin: 30upx 0;

				li {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #999;

					img {
						width: 40upx;
						height: 40upx;
						margin-bottom: 20upx;
					}
				}
			}
		}

		.about {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			background: #F8F9FB;
			display: flex;
			flex-direction: column;

			.titles {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				font-size: 15px;
				font-weight: 600;
				color: #333;
			}

			ul {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				background: #F8F9FB;

				li {
					width: 48%;
					display: flex;
					flex-direction: column;
					align-items: center;
					background: #FFFFFF;
					padding: 16upx;
					box-sizing: border-box;
					margin-bottom: 4%;

					image {
						width: 100%;
						height: 200upx;
					}

					p {
						margin-top: 12upx;
						font-size: 14px;
						color: #333;
						overflow: hidden;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}
		}

		.suggest {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 10000;
			background: rgba(0, 0, 0, .5);

			.suggest-bg {
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				padding: 40upx 28upx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-top-left-radius: 30px;
				border-top-right-radius: 30px;

				.contents {
					width: 100%;
					height: 90upx;
					line-height: 90upx;
					font-size: 14px;
					color: #666;
				}

				.texts {
					width: 100%;
					display: flex;
					flex-direction: column;
					background: #FAFAFA;
					border-radius: 4px;
					border: 1px solid #eee;
					padding: 24upx;
					box-sizing: border-box;
					align-items: flex-end;

					textarea {
						width: 100%;
						height: 240upx;

					}
				}

				.btns {
					width: 40%;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					border-radius: 30px;
					background: #0081FF;
					font-size: 14px;
					color: #FFFFFF;
					margin: 40upx auto 0;
				}
			}
		}
	}
</style>
