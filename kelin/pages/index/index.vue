<template>
	<view class="contain">
		<view class="wrapper">
			<view class="head" :style="style">
				<div class="search" @click="goSearch">
					<img src="../../static/images/search.png" alt="">
					<input v-model="val" type="text" placeholder="请输入关键词搜索" disabled />
				</div>
				<view class="message" @tap="goMessage">
					<img src="../../static/images/xiaoxi.png" alt="">
					<view class="red" v-if="has"></view>
				</view>
			</view>
			<view class="banner">
				<swiper class="swiper" :autoplay="autoplay" :interval="interval">
					<swiper-item v-for="(v,k) in swiperList" :key="k" @tap="goText(v.title,v.url)">
						<image style="width: 100%;height: 100%;" :src="v.image" mode="scaleToFill" alt=""></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="news">
				<img src="../../static/images/zuixintongzhi.png" alt="">
				<view class="content">
					<an-notice-bar :text="text" :showSerial="false"></an-notice-bar>
				</view>
				<div class="more" @tap="goNotice">更多</div>
			</view>
			<div class="list">
				<div class="item" v-if="show1">
					<div class="titles">客车空调系统</div>
					<swiper class="swiper" :indicator-dots="status1" indicator-active-color="#2076FF">
						<swiper-item v-for="(item,index) in total1" :key="index">
							<ul class="list-items">
								<li @click="goAll(1,v.name,v.id)" v-for="(v,k) in list1" :key="k" v-if="k >= 8 * index && k < 8 * (index + 1)">
									<img :src="v.image" alt="">
									<div>{{v.name}}</div>
								</li>
							</ul>
						</swiper-item>
					</swiper>
				</div>
				<div class="item" v-if="show2">
					<div class="titles">智能工业中央空调</div>
					<swiper class="swiper" :indicator-dots="status2" indicator-active-color="#2076FF">
						<swiper-item v-for="(item,index) in total2" :key="index">
							<ul class="list-items">
								<li @click="goAll(2,v.name,v.id)" v-for="(v,k) in list2" :key="k" v-if="k >= 8 * index && k < 8 * (index + 1)">
									<img :src="v.image" alt="">
									<div>{{v.name}}</div>
								</li>
							</ul>
						</swiper-item>
					</swiper>
				</div>
				<div class="item">
					<swiper class="swiper" style="height: 600upx;margin-top: 32upx;">
						<swiper-item v-for="(item,index) in count3" :key="index">
							<ul class="list-products">
								<li style="width: 25%;" @click="goDetail(k, v.id)" :class="(k+1)%3 == 0 ? 'noMargin' : ''" v-for="(v,k) in data3"
								:key="k" v-if="k >= 9 * index && k < 9 * (index + 1)">
									<img :src="v.img" alt="">
									<div>{{v.title}}</div>
								</li>
							</ul>
						</swiper-item>
					</swiper>
				</div>
				<div class="item" v-if="list3.length > 0">
					<div class="product">
						<div class="titles">最近观看</div>
						<div class="more" @click="goRecent">
							<span>更多</span>
							<img src="../../static/images/xiayige.png" alt="">
						</div>
					</div>
					<ul class="product-list">
						<li v-for="(v,k) in list3" :key="k" @tap="goLook(v)" v-if="k <= 3">
							<img :src="v.coverImage" alt="">
							<p>{{v.name}}</p>
							<div class="detail">{{v.label}}</div>
						</li>
					</ul>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import AnNoticeBar from '../../components/an-notice-bar/an-notice-bar.vue'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				val: '',
				StatusBar: this.StatusBar,
				autoplay: true,
				interval: 5000,
				text: '',
				status1: false,
				status2: false,
				data3: [{
					title: '产品画册',
					img: '../../static/images/chanpinhuace.png',
					id: 3
				}, {
					title: '产品图片',
					img: '../../static/images/chanpintupian.png',
					id: 2
				}, {
					title: '产品海报',
					img: '../../static/images/chanpinhaibao.png',
					id: 8
				}, {
					title: '相关视频',
					img: '../../static/images/xiangguanship.png',
					id: 7
				}, {
					title: '全景360°',
					img: '../../static/images/quanjing360.png',
					id: 5
				}, {
					title: '培训材料',
					img: '../../static/images/peixuncailiao.png',
					id: 4
				}, {
					title: '故事案例',
					img: '../../static/images/gushianli.png',
					id: 10
				}, {
					title: '销售话术',
					img: '../../static/images/xiaoshouhuashu.png',
					id: 11
				}, {
					title: '微页',
					img: '../../static/images/cheweiye.png',
					id: 6
				}],
				count3: 1,
				has: false,
				message: {},
				swiperList: [],
				show1: false,
				total1: 1,
				list1: [],
				show2: false,
				total2: 1,
				list2: [],
				list3: []
			}
		},
		components: {
			AnNoticeBar
		},
		onShow() {
			this.message = uni.getStorageSync('message')
			this.init()
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar
				var style = `padding-top:${StatusBar}px;`
				return style
			}
		},
		methods: {
			init() {
				let self = this
				// 是否有新动态
				let data5 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/has/dynamic',
						data: data5,
						success: function(res) {
							Toast.hideLoading()
							if (res.data.success == true) {
								self.has = res.data.body.hasDynamic
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
				// 请求轮播图数据
				let data1 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/carousel',
						data: data1,
						success: function(res) {
							console.log(res)
							Toast.hideLoading()
							if (res.data.success == true) {
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									self.swiperList = res.data.body.list
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
				// 请求公告数据
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/notice',
						data: data1,
						success: function(res) {
							if (res.data.success == true) {
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									let text = ''
									res.data.body.list.forEach((item) => {
										text += item.title + '|'
									})
									self.text = text.substr(0, text.length - 1)
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
				//请求客车空调系统数据
				let arr = this.message.productType.split(',')
				if (arr.indexOf('1') > -1) {
					this.show1 = true
					let data2 = {
						Token: this.message.Token,
						productType: '1'
					}
					Toast.showLoading('加载中...', function() {
						let data = {
							url: '/app/service/product/category',
							data: data2,
							success: function(res) {
								Toast.hideLoading()
								if (res.data.success == true) {
									if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
										self.total1 = Math.ceil(res.data.body.list.length / 8)
										if(self.total1 > 1) {
											self.status1 = true
										}
										self.list1 = res.data.body.list
									}
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.msg)
								}
							}
						}
						ajax(data)
					})
				}
				//请求智能工业中央空调系统数据
				let arr1 = this.message.productType.split(',')
				if (arr1.indexOf('2') > -1) {
					this.show2 = true
					let data3 = {
						Token: this.message.Token,
						productType: '2'
					}
					Toast.showLoading('加载中...', function() {
						let data = {
							url: '/app/service/product/category',
							data: data3,
							success: function(res) {
								Toast.hideLoading()
								if (res.data.success == true) {
									if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
										self.total2 = Math.ceil(res.data.body.list.length / 8)
										if(self.total2 > 1) {
											self.status2 = true
										}
										self.list2 = res.data.body.list
									}
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.msg)
								}
							}
						}
						ajax(data)
					})
				}
				//最近观看数据
				let data3 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/view/recent',
						data: data3,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									self.list3 = res.data.body.page.list
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
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			goMessage() {
				uni.navigateTo({
					url: '/pages/trend/trend'
				})
			},
			goNotice() {
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			},
			goAll(k, name, id) {
				uni.navigateTo({
					url: `/pages/product/product?type=${k}&name=${name}&id=${id}`
				})
			},
			goDetail(k, id) {
				if (k == 6) {
					uni.navigateTo({
						url: '/pages/example/example'
					})
				} else if (k == 7) {
					uni.navigateTo({
						url: '/pages/speak/speak'
					})
				} else {
					this.$store.commit('changeSelectId', id)
					uni.switchTab({
						url: '/pages/allProduct/allProduct'
					})
				}
			},
			goLook(item) {
				if (item.infoType == 1) {
					uni.navigateTo({
						url: `/pages/detail/detail?id=${item.viewId}`
					})
				} else if (item.infoType == 3) {
					let self = this
					//请求空调产品画册数据
					let data2 = {
						Token: this.message.Token,
						id: item.viewId,
						infoType: 3
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
											url: `/pages/album/album?id=${item.viewId}&list=${JSON.stringify(item)}&lists=${JSON.stringify(lists)}`
										})
									}, 300)
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.msg)
								}
							}
						}
						ajax(data)
					})
				} else if (item.infoType == 4) {
					let self = this
					//请求空调培训材料数据
					let data2 = {
						Token: this.message.Token,
						id: item.viewId,
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
											url: `/pages/train/train?id=${item.viewId}&list=${JSON.stringify(item)}&lists=${JSON.stringify(lists)}`
										})
									}, 300)
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.msg)
								}
							}
						}
						ajax(data)
					})
				} else if (item.infoType == 5) {
					let self = this
					let data2 = {
						Token: this.message.Token,
						id: item.viewId,
						infoType: 5
					}
					Toast.showLoading('加载中...', function() {
						let data = {
							url: '/app/service/product/additional',
							data: data2,
							success: (res) => {
								if (res.data.success == true) {
									let url = ''
									url = res.data.body.info.content
									let list = JSON.stringify(item)
									uni.navigateTo({
										url: `/pages/360/360?url=${url}&id=${item.viewId}&list=${list}&type=5`
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
				} else if (item.infoType == 6) {
					let self = this
					let data2 = {
						Token: this.message.Token,
						id: item.viewId,
						infoType: 6
					}
					Toast.showLoading('加载中...', function() {
						let data = {
							url: '/app/service/product/additional',
							data: data2,
							success: (res) => {
								if (res.data.success == true) {
									let url = ''
									url = res.data.body.info.content
									let list = JSON.stringify(item)
									uni.navigateTo({
										url: `/pages/360/360?url=${url}&id=${item.viewId}&list=${list}&type=6`
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
				} else if (item.infoType == 8) {
					uni.navigateTo({
						url: `/pages/bill/bill?id=${item.viewId}`
					})
				}
			},
			goText(title, url) {
				uni.navigateTo({
				    url: `/pages/imgText/imgText?title=${title}&url=https://sale.clingcenter.net/${url}`
				})
			},
			goRecent() {
				uni.navigateTo({
					url: '/pages/nearLook/nearLook'
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
		background: #F8F9FB;
	}

	.wrapper {
		width: 90%;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		position: relative;

		.head {
			width: 100%;
			padding: 0 32upx 20upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background: #F8F9FB;

			.search {
				width: 90%;
				height: 70upx;
				display: flex;
				align-items: center;
				background: #F0F0F0;
				border-radius: 4px;
				padding: 0 20upx;

				img {
					width: 30upx;
					height: 37upx;
					margin-right: 20upx;
				}

				input {
					flex: 1;
					height: 50upx;
					font-size: 14px;
					color: #333;
				}
			}

			.message {
				width: 39upx;
				height: 46upx;
				position: relative;

				.red {
					width: 24upx;
					height: 24upx;
					border-radius: 50%;
					background: red;
					position: absolute;
					top: 0;
					left: 20upx;
				}

				img {
					width: 39upx;
					height: 46upx;
				}
			}
		}

		.banner {
			width: 100%;
			height: 360upx;
			border-radius: 4px;
			overflow: hidden;
			margin: 160upx 0 40upx;

			.swiper {
				width: 100%;
				height: 100%;
			}
		}

		.news {
			width: 100%;
			height: 90upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20upx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 4px;

			img {
				width: 126upx;
				height: 31upx;
			}

			.content {
				width: 60%;
				font-size: 14px;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-left: 30upx;
			}

			.more {
				height: 24upx;
				line-height: 24upx;
				padding-left: 20upx;
				border-left: 1px solid #999;
				font-size: 12px;
				color: #999;
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
					width: 80%;
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
							padding: 30upx 20upx 0;
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
									text-align: center;
								}
							}
						}

						.list-products {
							width: 100%;
							height: 100%;
							display: flex;
							flex-wrap: wrap;
							padding: 30upx 20upx 0;
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
								margin-right: 12.5%;

								&.noMargin {
									margin-right: 0;
								}

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

				.product {
					width: 100%;
					height: 80upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.more {
						display: flex;
						align-items: center;
						font-size: 14px;
						color: #999;

						img {
							width: 13upx;
							height: 22upx;
							margin-left: 12upx;
						}

					}
				}

				.product-list {
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					margin: 0;
					padding: 0;

					li {
						width: 48%;
						display: flex;
						flex-direction: column;
						background: #FFFFFF;
						margin-bottom: 4%;
						position: relative;

						img {
							width: 100%;
							height: 216upx;
						}

						p {
							width: 100%;
							padding: 12upx;
							box-sizing: border-box;
							font-size: 12px;
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

						.detail {
							position: absolute;
							top: 0;
							left: 0;
							padding: 8upx 12upx;
							font-size: 12px;
							color: #FFFFFF;
							background: #FF3535;
						}
					}
				}
			}
		}
	}
</style>
