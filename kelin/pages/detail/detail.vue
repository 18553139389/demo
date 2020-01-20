<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="product">
				<image :src="obj.coverImage" mode="scaleToFill"></image>
				<view class="product-list">
					<view class="product-title">{{obj.name}}</view>
					<view class="product-mask">{{obj.textIntroduce}}</view>
					<view class="product-mask">{{obj.otherIntroduce}}</view>
				</view>
			</view>
			<ul class="mark">
				<li @click="goStore">
					<img :src="store ? '../../static/images/huace_shoucang2.png' : '../../static/images/huace_shoucang.png'" alt="">
					<span>收藏</span>
				</li>
				<li @tap="shareInfo">
					<img src="../../static/images/fenxiang.png" alt="">
					<span>分享</span>
				</li>
				<li @click="goSuggest">
					<img src="../../static/images/fankui.png" alt="">
					<span>反馈</span>
				</li>
				<li @tap="goUpload">
					<img src="../../static/images/shangchuan.png" alt="">
					<span>上传</span>
				</li>
			</ul>
			<div class="list">
				<div class="item">
					<div class="titles">资料清单</div>
					<swiper class="swiper">
						<swiper-item>
							<ul class="list-items">
								<li @tap="goPicture">
									<img :src="state.hasAlbum ? '../../static/images/fenlei1.png' : '../../static/images/chanpin2.png'" alt="">
									<div>产品画册</div>
								</li>
								<li @tap="goImg">
									<img :src="state.hasImage ? '../../static/images/fenlei2.png' : '../../static/images/tupian2.png'" alt="">
									<div>产品图片</div>
								</li>
								<li @tap="goBill">
									<img :src="state.hasPoster ? '../../static/images/fenlei3.png' : '../../static/images/haibao2.png'" alt="">
									<div>产品海报</div>
								</li>
								<li @tap="go360(6)">
									<img :src="state.hasMicroPage ? '../../static/images/fenlei4.png' : '../../static/images/cheweiye2.png'" alt="">
									<div>微页</div>
								</li>
								<li @tap="goVideo">
									<img :src="state.hasVideo ? '../../static/images/fenlei5.png' : '../../static/images/shipin2.png'" alt="">
									<div>相关视频</div>
								</li>
								<li @tap="go360(5)">
									<img :src="state.hasPanorama ? '../../static/images/fenlei6.png' : '../../static/images/quanjing2.png'"  alt="">
									<div>全景360°</div>
								</li>
								<li @tap="goTrain">
									<img :src="state.hasTrain ? '../../static/images/fenlei7.png' : '../../static/images/peixun2.png'" alt="">
									<div>培训材料</div>
								</li>
								<li @tap="goPdf">
									<img :src="state.hasNews ? '../../static/images/fenlei8.png' : '../../static/images/anli2.png'" alt="">
									<div>案例资讯</div>
								</li>
							</ul>
						</swiper-item>
					</swiper>
				</div>
			</div>
		</view>
		<view class="about" v-if="listData.length > 0">
			<view class="titles">相关空调</view>
			<ul>
				<li v-for="(v,k) in listData" :key="k" @tap="goDetail(v.id)">
					<image :src="v.coverImage" mode="scaleToFill"></image>
					<p>{{v.name}}</p>
				</li>
			</ul>
		</view>
		<view class="suggest" v-if="show" @click="goHide">
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
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				store: false,
				val: '',
				show: false,
				total: 0,
				obj: {},
				state: {},
				listData: [],
				ids: ''
			}
		},
		onLoad(option) {
			this.message = uni.getStorageSync('message')
			this.ids = option.id
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/detail',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.obj = res.data.body.product
								self.store = self.obj.collected
								self.state.hasImage = res.data.body.hasImage
								self.state.hasAlbum = res.data.body.hasAlbum
								self.state.hasTrain = res.data.body.hasTrain
								self.state.hasPanorama = res.data.body.hasPanorama
								self.state.hasMicroPage = res.data.body.hasMicroPage
								self.state.hasVideo = res.data.body.hasVideo
								self.state.hasPoster = res.data.body.hasPoster
								self.state.hasNews = res.data.body.hasNews
								console.log(self.state)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
				//请求相关空调接口数据
				let data3 = {
					Token: this.message.Token,
					id
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/similar',
						data: data3,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								self.listData = res.data.body.list
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
				this.store = !this.store
				let self = this
				if(!this.store) {
					//取消收藏
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 1
					}
					let data = {
						url: '/app/service/collect/delete',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.showToast('取消收藏')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				} else {
					//收藏成功
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 1
					}
					let data = {
						url: '/app/service/collect/add',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.showToast('收藏成功')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				}
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			},
			onBackPress() {
				//监听back键，关闭弹出菜单
				if (this.shareObj.shareMenu.isVisible()) {
					this.shareObj.shareMenu.hide()
					this.shareObj.alphaBg.hide()
					return true
				}
			},
			shareInfo() {
				let shareInfo = {
					href: `https://sale.clingcenter.net/static/share/productDetail.html?ids=${this.ids}&token=${this.message.Token}`,
					title: this.obj.name,
					desc: this.obj.textIntroduce,
					imgUrl: this.obj.coverImage
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
				console.log(this.total)
			},
			goSuggest() {
				this.show = true
			},
			goSubmit() {
				let self = this
				if(self.val == '') {
					Toast.showToast('内容不能为空')
					return
				}
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
					infoType: 1,
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
				this.$store.commit('changeId', this.ids)
				this.$store.commit('changeName', this.obj.name)
				uni.switchTab({
					url: '/pages/upload/upload'
				})
			},
			goHide() {
				this.show = false
			},
			goPicture() {
				if(!this.state.hasAlbum) {
					return
				}
				let self = this
				//请求空调产品画册数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
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
								let lists = res.data.body.info
								setTimeout(() => {
									uni.navigateTo({
									    url: `/pages/album/album?id=${self.ids}&list=${JSON.stringify(self.obj)}&lists=${JSON.stringify(lists)}`
									})
								},300)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goTrain() {
				if(!this.state.hasTrain) {
					return
				}
				let self = this
				//请求空调培训材料数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
					infoType: 4
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								let lists = res.data.body.info
								setTimeout(() => {
									uni.navigateTo({
									    url: `/pages/train/train?id=${self.ids}&list=${JSON.stringify(self.obj)}&lists=${JSON.stringify(lists)}`
									})
								},300)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goPdf() {
				if(!this.state.hasNews) {
					return
				}
				let self = this
				//请求空调产品画册数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
					infoType: 9
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								let url = res.data.body.url
								setTimeout(() => {
									uni.navigateTo({
									    url: `/pages/pdf/pdf?url=https://sale.clingcenter.net/${url}`
									})
								},300)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goImg() {
				if(!this.state.hasImage) {
					return
				}
				uni.navigateTo({
				    url: `/pages/productImg/productImg?id=${this.ids}`
				})
			},
			goBill() {
				if(!this.state.hasPoster) {
					return
				}
				uni.navigateTo({
				    url: `/pages/bill/bill?id=${this.ids}`
				})
			},
			goVideo() {
				if(!this.state.hasVideo) {
					return
				}
				let list = JSON.stringify(this.obj)
				uni.navigateTo({
				    url: `/pages/video/video?id=${this.ids}&list=${list}`
				})
			},
			go360(type) {
				if(type == 5) {
					if(!this.state.hasPanorama) {
						return
					}
				}
				if(type == 6) {
					if(!this.state.hasMicroPage) {
						return
					}
				}
				let self = this
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
					infoType: type
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								let url = ''
								url = res.data.body.info.content
								let list = JSON.stringify(self.obj)
								uni.navigateTo({
								    url: `/pages/360/360?url=${url}&id=${self.ids}&list=${list}&type=${type}`
								})
								Toast.hideLoading()
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
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

			.mark {
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;

				li {
					height: 90upx;
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #999;
					margin-right: 40upx;

					img {
						width: 30upx;
						height: 30upx;
						margin-right: 16upx;
					}
				}
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;

				.item {
					width: 100%;
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

					.swiper {
						width: 100%;
						height: 440upx;

						swiper-item {
							width: 100%;
							height: 440upx;

							.list-items {
								width: 100%;
								height: 100%;
								display: flex;
								flex-wrap: wrap;
								padding: 30upx 0;
								box-sizing: border-box;
								background: #FFFFFF;
								border-radius: 4px;

								li {
									width: 25%;
									display: flex;
									flex-direction: column;
									align-items: center;
									font-size: 12px;
									color: #333;
									margin-bottom: 32upx;

									img {
										width: 100upx;
										height: 100upx;
										margin-bottom: 12upx;
									}

									div {
										width: 100%;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
										text-align: center;
									}
								}
							}
						}
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
