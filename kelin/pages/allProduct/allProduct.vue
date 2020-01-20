<template>
	<view class="contain">
		<view class="wrapper">
			<view class="head" :style="style">
				<view class="all" @tap="showModal" data-target="bottomModal">
					<span v-if="select == 3">产品画册</span>
					<span v-if="select == 2">产品图片</span>
					<span v-if="select == 8">产品海报</span>
					<span v-if="select == 4">培训材料</span>
					<span v-if="select == 7">相关视频</span>
					<span v-if="select == 5">全景360°</span>
					<span v-if="select == 6">微页</span>
					<span v-if="select == 11">销售话术</span>
					<span v-if="select == 10">故事案例</span>
					<img src="../../static/images/xiala.png" alt="">
				</view>
				<div class="search">
					<img src="../../static/images/search.png" alt="">
					<input v-model="val" type="text" confirm-type="search" @confirm="goResult" placeholder="请输入关键词搜索" />
				</div>
			</view>
			<view class="tabs">
				<div class="tabs-item">
					<span>类型</span>
				</div>
				<div class="tabs-item" v-for="(v,k) in lists" :key="k" @click="changTab(k)">
					<span :class="itemIndex == k ? 'active' : ''">{{v}}</span>
					<img src="../../static/images/xiala.png" alt="">
				</div>
			</view>
			<div class="products">
				<scroll-view class="side" scroll-y>
					<ul>
						<li v-for="(v,k) in list1" :key="k" @tap="changeSlide(k,v.id)" :class="slideIndex == k ? 'activs' : ''">{{v.name}}</li>
					</ul>
				</scroll-view>
				<scroll-view class="allList" scroll-y @scrolltolower="scrolltolower">
					<ul class="lists" v-if="show2 && list.length > 0">
						<li v-for="(v,k) in list" :key="k" :class="(k+1)%3 == 0 ? 'types' : ''" @tap="goDetail(v)">
							<img :src="v.coverImage" alt="">
							<div>{{v.name}}</div>
						</li>
					</ul>
					<view v-if="show1" class="loading">{{warn}}</view>
					<view class="noData" v-if="!show2">
						<image class="no" src="http://www.mescroll.com/img/mescroll-empty.png" mode="scaleToFill" alt="">
							<view>没有查询到符合条件的数据</view>
					</view>
				</scroll-view>
				<div class="mask" v-if="show" @click="showType">
					<div class="type">
						<ul class="wrappers">
							<li v-for="(v,k) in typeList" :key="k" @click.stop="changeType(k, v.id)">
								<img v-if="typeIndex == k" src="../../static/images/xuanzhong.png" alt="">
								<div>{{v.name}}</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" @tap="hide">
			<view class="cu-dialog">
				<radio-group class="block" @change="RadioChange">
					<ul class="content">
						<li v-for="(v,k) in navList" :key='k' @tap="getRadio(v.id)">
							<view>{{v.name}}</view>
							<radio :checked="radio==v.id ? true : false" :value="v.id" color="#0081FF"></radio>
						</li>
					</ul>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				val: '',
				lists: ['冷量', '其他'],
				typeList: [],
				navList: [{
					name: '产品画册',
					id: '3'
				}, {
					name: '产品图片',
					id: '2'
				}, {
					name: '产品海报',
					id: '8'
				}, {
					name: '培训材料',
					id: '4'
				}, {
					name: '相关视频',
					id: '7'
				}, {
					name: '全景360°',
					id: '5'
				}, {
					name: '微页',
					id: '6'
				}, {
					name: '销售话术',
					id: '11'
				}, {
					name: '故事案例',
					id: '10'
				}],
				itemIndex: -1,
				typeIndex: 0,
				slideIndex: 0,
				show: false,
				list: [],
				list1: [],
				show1: false,
				show2: true,
				total: 0,
				totalPage: 2,
				warn: '加载中...',
				modalName: null,
				radio: '3',
				oldRadio: 0,
				select: '3',
				look: false,
				look1: false,
				ids: ''
			}
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar
				var style = `padding-top:${StatusBar}px;`
				return style
			}
		},
		onShow() {
			this.message = uni.getStorageSync('message')
			this.select = this.$store.state.selectId
			this.radio = this.$store.state.selectId
			//获取侧边栏类型数据
			this.init1()
		},
		methods: {
			changeSlide(k, id) {
				if (this.slideIndex == k) {
					return
				}

				if (this.look1) {
					return
				}
				this.slideIndex = k
				this.itemIndex = -1
				this.look1 = true
				this.$store.commit('changeSlideId', id)
				this.changeList1(id)
			},
			init1() {
				let self = this
				let data2 = {}
				let arr = this.message.productType.split(',')
				if (arr.indexOf('1') > -1 && arr.indexOf('2') == -1) {
					data2 = {
						Token: this.message.Token,
						productType: '1'
					}
				}
				if (arr.indexOf('1') == -1 && arr.indexOf('2') > -1) {
					data2 = {
						Token: this.message.Token,
						productType: '2'
					}
				}
				if (arr.indexOf('1') > -1 && arr.indexOf('2') > -1) {
					data2 = {
						Token: this.message.Token
					}
				}
				//请求空调分类数据
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/category',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								self.list1 = []
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									res.data.body.list.forEach((item) => {
										self.list1.push(item)
									})
									if (self.slideIndex == -1) {
										if (self.itemIndex == 0) {
											self.changeList3(self.ids)
										} else {
											self.changeList4(self.ids)
										}
									} else {
										if(self.$store.state.slideId) {
											self.changeList1(self.$store.state.slideId)
										} else {
											self.changeList1(self.list1[0].id)
										}
									}
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
			init2() {
				let self = this
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/model',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.typeList = []
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									res.data.body.list.forEach((item) => {
										self.typeList.push(item)
									})
								}
								self.look = false
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			init3() {
				let self = this
				//请求冷量数据
				let data2 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/cooling',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								self.typeList = []
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									res.data.body.list.forEach((item) => {
										self.typeList.push(item)
									})
								}
								self.look = false
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			init4() {
				let self = this
				//请求其他数据
				let data2 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/other',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								self.typeList = []
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									res.data.body.list.forEach((item) => {
										self.typeList.push(item)
									})
								}
								self.look = false
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			changeList1(id) {
				let self = this
				this.ids = id
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productCategory: id,
					infoType: this.select,
					productName: this.val
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.list = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.list.push(item)
									})
									self.show2 = true
								} else {
									self.show2 = false
								}
								self.look1 = false
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			changeList2(id) {
				let self = this
				this.ids = id
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productModel: id,
					infoType: this.select,
					productName: this.val
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.list = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.list.push(item)
									})
									self.show2 = true
								} else {
									self.show2 = false
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
			changeList3(id) {
				let self = this
				this.ids = id
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productCooling: id,
					infoType: this.select,
					productName: this.val
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.list = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.list.push(item)
									})
									self.show2 = true
								} else {
									self.show2 = false
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
			changeList4(id) {
				let self = this
				this.ids = id
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productOther: id,
					infoType: this.select,
					productName: this.val
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.list = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.list.push(item)
									})
									self.show2 = true
								} else {
									self.show2 = false
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
			changTab(k) {
				if (this.look) {
					return
				}

				if (this.itemIndex != k) {
					this.typeIndex = 0
				}

				this.itemIndex = k
				this.show = true
				this.look = true
				if (k == 0) {
					this.init3()
				} else if (k == 1) {
					this.init4()
				}
			},
			changeType(k, id) {
				this.show = false
				this.typeIndex = k
				this.slideIndex = -1
				if (this.itemIndex == 0) {
					this.changeList3(id)
				} else if (this.itemIndex == 1) {
					this.changeList4(id)
				}
			},
			showType() {
				this.show = false
			},
			scrolltolower() {
				let self = this
				this.show1 = true
				setTimeout(() => {
					if (this.total < this.totalPage) {
						self.dataList.forEach((item) => {
							self.list.push(item)
						})
						this.total++
					} else {
						self.warn = '没有数据了'
					}
				}, 1000)
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.radio = this.oldRadio
				this.modalName = null
			},
			hide() {
				this.modalName = null
			},
			getRadio(id) {
				this.radio = id
				this.RadioChange(id)
			},
			RadioChange(id) {
				// this.oldRadio = this.radio
				this.radio = id
				this.select = this.radio
				this.$store.commit('changeSelectId', id)
				this.modalName = null
				if (this.slideIndex == -1) {
					if (this.itemIndex == 0) {
						this.changeList3(this.ids)
					} else {
						this.changeList4(this.ids)
					}
				} else {
					this.changeList1(this.ids)
				}
			},
			goSure() {
				this.select = this.radio
				this.modalName = null
				if (this.slideIndex == -1) {
					this.changeList2(this.ids)
				} else {
					this.changeList1(this.ids)
				}
			},
			goResult() {
				if (this.val == '') {
					Toast.showToast('搜索内容不能为空')
					return
				}

				if (this.slideIndex == -1) {
					this.changeList2(this.ids)
				} else {
					this.changeList1(this.ids)
				}
			},
			goDetail(item) {
				if (this.select == 3) {
					let self = this
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
								if (res.data.success == true) {
									Toast.hideLoading()
									let lists = res.data.body.info
									setTimeout(() => {
										uni.navigateTo({
											url: `/pages/album/album?id=${item.id}&list=${JSON.stringify(item)}&lists=${JSON.stringify(lists)}`
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
				} else if (this.select == 2) {
					uni.navigateTo({
						url: `/pages/productImg/productImg?id=${item.id}`
					})
				} else if (this.select == 4) {
					let self = this
					//请求空调培训材料数据
					let data2 = {
						Token: this.message.Token,
						id: item.id,
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
											url: `/pages/train/train?id=${item.id}&list=${JSON.stringify(item)}&lists=${JSON.stringify(lists)}`
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
				} else if (this.select == 5) {
					let self = this
					let data2 = {
						Token: this.message.Token,
						id: item.id,
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
										url: `/pages/360/360?url=${url}&id=${item.id}&list=${list}&type=5`
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
				} else if (this.select == 6) {
					let self = this
					let data2 = {
						Token: this.message.Token,
						id: item.id,
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
										url: `/pages/360/360?url=${url}&id=${item.id}&list=${list}&type=6`
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
				} else if (this.select == 7) {
					let list = JSON.stringify(item)
					uni.navigateTo({
						url: `/pages/video/video?id=${item.id}&list=${list}`
					})
				} else if (this.select == 8) {
					uni.navigateTo({
						url: `/pages/bill/bill?id=${item.id}`
					})
				} else if (this.select == 10) {
					uni.navigateTo({
						url: `/pages/exampleDetail/exampleDetail?id=${item.id}`
					})
				} else if (this.select == 11) {
					uni.navigateTo({
						url: `/pages/speakDetail/speakDetail?id=${item.id}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;

		.content {
			width: 100%;
			display: flex;
			flex-direction: column;

			li {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 14px;
				border-bottom: 1px solid #eee;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30upx;
				box-sizing: border-box;
			}
		}
	}

	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;

		.head {
			width: 90%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.all {
				width: 35%;
				height: 70upx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				border: 1px solid #eee;
				border-radius: 4px;
				font-size: 14px;
				color: #333;

				img {
					width: 16upx;
					height: 9upx;
				}
			}

			.search {
				width: 60%;
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
		}

		.tabs {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 40upx 5%;
			border-bottom: 1px solid #eee;

			.tabs-item {
				display: flex;
				align-items: center;

				span {
					font-size: 14px;
					color: #333;

					&.active {
						font-weight: 700;
					}
				}

				img {
					width: 24upx;
					height: 14upx;
					margin-left: 24upx;
				}
			}
		}

		.products {
			width: 100%;
			display: flex;
			position: relative;
			font-size: 0;

			.side {
				width: 28%;
				height: calc(100vh - 184upx - var(--status-bar-height));
				background: #F8F9FB;

				li {
					width: 100%;
					padding: 40upx 16upx;
					box-sizing: border-box;
					font-size: 12px;
					color: #333;
					text-align: center;

					&.activs {
						background: #007AFF;
						color: #FFFFFF;
					}
				}
			}

			.allList {
				width: 72%;
				height: calc(100vh - 184upx - var(--status-bar-height));

				.lists {
					width: 100%;
					padding: 0 28upx;
					box-sizing: border-box;
					display: flex;
					flex-wrap: wrap;

					li {
						width: 30%;
						float: left;
						display: flex;
						flex-direction: column;
						font-size: 12px;
						color: #333;
						margin-right: 3.33%;
						margin-top: 3.33%;
						height: 220upx;

						&.types {
							margin-right: 0;
						}

						img {
							width: 135upx;
							height: 135upx;
						}

						div {
							width: 100%;
							text-align: center;
							margin-top: 20upx;
						}
					}
				}

				.loading {
					width: 100%;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					font-size: 12px;
					color: #333;
				}

				.noData {
					width: 100%;
					height: calc(100vh - 184upx - var(--status-bar-height));
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.no {
						width: 180upx;
						height: 180upx;
					}

					view {
						width: 100%;
						height: 90upx;
						line-height: 90upx;
						text-align: center;
						font-size: 14px;
						color: #333;
					}
				}
			}

			.mask {
				width: 100%;
				background: rgba(0, 0, 0, .5);
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;

				.type {
					width: 100%;
					padding: 30upx 5%;
					box-sizing: border-box;
					background: #FFFFFF;
					border-top: 1px solid #eee;

					.wrappers {
						width: 100%;
						display: flex;
						flex-wrap: wrap;

						li {
							width: 50%;
							display: flex;
							align-items: center;
							font-size: 14px;
							color: #333;
							margin-bottom: 30upx;

							img {
								width: 22upx;
								height: 18upx;
								margin-right: 20upx;
							}
						}
					}
				}
			}
		}
	}
</style>
