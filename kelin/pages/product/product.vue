<template>
	<view class="contain">
		<view class="wrapper">
			<view class="head" :style="style">
				<text class="cuIcon-back text" @tap="goBack"></text>
				<div class="search" @tap="goSearch">
					<img src="../../static/images/search.png" alt="">
					<input v-model="val" type="text" disabled placeholder="请输入关键词搜索" />
				</div>
			</view>
			<view class="tabs">
				<div class="tabs-item" v-for="(v,k) in list" :key="k" @click="changTab(k)">
					<span :class="itemIndex == k ? 'active' : ''">{{v}}</span>
					<img src="../../static/images/xiala.png" alt="">
				</div>
			</view>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick" style="width: 100%;">
				<div class="products">
					<ul class="lists">
						<li v-for="(v,k) in productList" :key="k" :class="(k+1)%4 == 0 ? 'types' : ''" @tap="goDetail(v.id)">
							<img :src="v.coverImage" alt="">
							<div>{{v.name}}</div>
						</li>
					</ul>
					<div class="mask" v-if="show" @click="showType">
						<div class="type">
							<ul class="wrappers">
								<li v-for="(v1,k1) in list1" :key="k1" @click.stop="changeType(k1,v1.name,v1.id)">
									<img v-if="typeIndex == k1" src="../../static/images/xuanzhong.png" alt="">
									<div>{{v1.name}}</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import {
		ajax
	} from '../../request/request.js'
	export default {
		data() {
			return {
				val: '',
				list: ['冷量', '其他'],
				productList: [],
				itemIndex: 0,
				typeIndex: -1,
				show: false,
				type: 0,
				list1: [],
				ids: '',
				totalPage: 0,
				mescroll: null, //mescroll实例对象
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					autoShowLoading: true, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
					isLock: false, // 是否锁定下拉刷新,默认false;
					isBoth: true, // 下拉刷新时,如果滑动到列表底部是否可以同时触发上拉加载;默认true,两者可同时触发;
					offset: 80, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
					inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
					outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
					bottomOffset: 20, // 当手指touchmove位置在距离body底部20upx范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
					minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
					textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
					textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
					textLoading: '加载中 ...' // 加载中的提示文本
				},
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					isLock: false, // 是否锁定上拉加载,默认false;
					isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 20, // 每页数据的数量
						time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					noMoreSize: 20, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
					textLoading: '加载中 ...', // 加载中的提示文本
					textNoMore: '-- 没有更多数据 --', // 没有更多数据的提示文本
					toTop: {
						// 回到顶部按钮,需配置src才显示
						src: "http://www.mescroll.com/img/mescroll-totop.png", // 图片路径
						offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
						duration: 300 // 回到顶部的动画时长,默认300ms
					},
					empty: {
						use: true, // 是否显示空布局
						icon: "http://www.mescroll.com/img/mescroll-empty.png", // 图标路径
						tip: '没有符合条件的数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				look: false
			}
		},
		components: {
			MescrollUni
		},
		onUnload() {
			this.mescroll = null;
		},
		//注册滚动到底部的事件,用于上拉加载
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom()
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e)
		},
		onLoad(option) {
			this.type = option.type
			this.list.unshift(option.name)
			this.ids = option.id
			this.message = uni.getStorageSync('message')
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar
				var style = `padding-top:${StatusBar}px;`
				return style
			}
		},
		methods: {
			init1() {
				let self = this
				//请求客车空调系统数据
				if (this.type == 1) {
					let data2 = {
						Token: this.message.Token,
						productType: '1'
					}
					Toast.showLoading('加载中...', function() {
						let data = {
							url: '/app/service/product/category',
							data: data2,
							success: (res) => {
								Toast.hideLoading()
								if (res.data.success == true) {
									self.list1 = []
									if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
										res.data.body.list.forEach((item, index) => {
											self.list1.push(item)
											if (item.id == self.ids) {
												self.typeIndex = index
											}
										})
										self.look = false
									}
								} else {
									Toast.showToast(res.data.msg)
								}
							}
						}
						ajax(data)
					})
				} else {
					let data3 = {
						Token: this.message.Token,
						productType: '2'
					}
					Toast.showLoading('加载中...', function() {
						let data = {
							url: '/app/service/product/category',
							data: data3,
							success: (res) => {
								Toast.hideLoading()
								if (res.data.success == true) {
									self.list1 = []
									if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
										res.data.body.list.forEach((item, index) => {
											self.list1.push(item)
											if (item.id == self.ids) {
												self.typeIndex = index
											}
										})
										self.look = false
									}
								} else {
									Toast.showToast(res.data.msg)
								}
							}
						}
						ajax(data)
					})
				}
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
							if (res.data.success == true) {
								self.list1 = []
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									res.data.body.list.forEach((item) => {
										self.list1.push(item)
									})
									self.look = false
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
			init3() {
				let self = this
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/cooling',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								self.list1 = []
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									res.data.body.list.forEach((item) => {
										self.list1.push(item)
									})
									self.look = false
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
			init4() {
				let self = this
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/other',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								self.list1 = []
								Toast.hideLoading()
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									res.data.body.list.forEach((item) => {
										self.list1.push(item)
									})
									self.look = false
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
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				this.productList = []
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				if (this.itemIndex == 0) {
					self.changeList1(mescroll)
				} else if (this.itemIndex == 1) {
					self.changeList3(mescroll)
				} else if (this.itemIndex == 2) {
					self.changeList4(mescroll)
				}
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
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
				this.look = true
				if (this.itemIndex != k) {
					this.typeIndex = -1
				}
				this.itemIndex = k
				this.show = true
				if (k == 0) {
					this.init1()
				} else if (k == 1) {
					this.init3()
				} else if (k == 2) {
					this.init4()
				}
			},
			changeType(k, val, id) {
				this.typeIndex = k
				this.show = false
				if (this.itemIndex == 0) {
					this.list.shift()
					this.list.unshift(val)
					this.ids = id
					this.changeList1(this.mescroll)
				} else if (this.itemIndex == 1) {
					this.ids = id
					this.changeList3(this.mescroll)
				} else if (this.itemIndex == 2) {
					this.ids = id
					this.changeList4(this.mescroll)
				}
			},
			changeList1(mescroll) {
				let self = this
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productCategory: this.ids
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								self.productList = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.productList.push(item)
									})
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.body.page.list
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.body.page.totalPage
							mescroll.endByPage(curPageData.length, totalPage)
						}
					}
					ajax(data)
				})
			},
			changeList2(mescroll) {
				let self = this
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productModel: this.ids
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.productList = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.productList.push(item)
									})
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.body.page.list
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.body.page.totalPage
							mescroll.endByPage(curPageData.length, totalPage)
						}
					}
					ajax(data)
				})
			},
			changeList3(mescroll) {
				let self = this
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productCooling: this.ids
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								self.productList = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.productList.push(item)
									})
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.body.page.list
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.body.page.totalPage
							mescroll.endByPage(curPageData.length, totalPage)
						}
					}
					ajax(data)
				})
			},
			changeList4(mescroll) {
				let self = this
				//请求空调类型数据
				let data2 = {
					Token: this.message.Token,
					productOther: this.ids
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/page',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.productList = []
								Toast.hideLoading()
								if (res.data.body.page.list != 'undefined' && res.data.body.page.list.length > 0) {
									res.data.body.page.list.forEach((item) => {
										self.productList.push(item)
									})
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.body.page.list
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.body.page.totalPage
							mescroll.endByPage(curPageData.length, totalPage)
						}
					}
					ajax(data)
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			},
			showType() {
				this.show = false
			},
			goBack() {
				uni.navigateBack({
					delta: 1
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
		background: #FFFFFF;
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

			.text {
				font-size: 18px;
			}

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
				justify-content: center;
				width: 24%;

				span {
					display: inline-block;
					max-width: 80%;
					font-size: 14px;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding-right: 13upx;
					box-sizing: border-box;

					&.active {
						font-weight: 700;
					}
				}

				img {
					width: 24upx;
					height: 14upx;
				}
			}
		}

		.products {
			width: 100%;
			display: flex;
			justify-content: center;
			padding-top: 40upx;

			.lists {
				width: 90%;
				display: flex;
				flex-wrap: wrap;

				li {
					width: 20%;
					display: flex;
					flex-direction: column;
					font-size: 12px;
					color: #333;
					margin-right: 6.6%;
					margin-bottom: 6.6%;

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

			.mask {
				width: 100%;
				background: rgba(0, 0, 0, .5);
				position: absolute;
				top: calc(var(--status-bar-height) + 180upx);
				left: 0;
				bottom: 0;
				z-index: 9999;

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
