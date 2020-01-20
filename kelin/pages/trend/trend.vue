<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">动态</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick">
				<ul>
					<li v-for="(v,k) in list" :key="k" @tap="goPicture(v.infoType,v.infoId,v.product)">
						<view class="public">
							<view class="public-user">
								<span style="font-size: 15px;font-weight: 600;color: #333;">{{v.date}}日</span>
								<span>{{v.year}}月</span>
							</view>
							<view class="public-right">
								<view class="public-msg">
									<view class="public-img">
										<img :src="v.avatar" alt="">
									</view>
									<view class="public-lead">
										<span style="font-size: 14px;font-weight: 600;color: #333;">{{v.roleName}}</span>
										<span style="color: #999;">{{v.time}}</span>
									</view>
								</view>
								<image :src="v.coverImage" mode="scaleToFill"></image>
								<view class="public-title">{{v.name}}</view>
							</view>
						</view>
					</li>
				</ul>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#333',
				list: [],
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
						size: 4, // 每页数据的数量
						time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					noMoreSize: 6, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
						tip: '没有搜到符合条件的数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				message: {}
			}
		},
		components: {
			MescrollUni
		},
		onLoad() {
			this.message = uni.getStorageSync('message')
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
		methods: {
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				this.list = []
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				self.init(mescroll)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(mescroll) {
				let self = this
				//请求动态数据
				let data2 = {
					Token: self.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/dynamic',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								for (var j = 0; j < res.data.body.page.list.length; j++) {
									let item = res.data.body.page.list[j]
									item.year = item.updateDate.substring(0, item.updateDate.lastIndexOf('-'))
									item.date = item.updateDate.substring(item.updateDate.lastIndexOf('-') + 1, item.updateDate.lastIndexOf(
										'-') + 3)
									item.time = item.updateDate.substring(item.updateDate.indexOf(' ') + 1, item.updateDate.length)
									item.avatar = 'https://sale.clingcenter.net' + item.avatar
									self.list.push(item)
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
			goPicture(type, id, obj) {
				if (type == 1) {
					uni.navigateTo({
						url: `/pages/detail/detail?id=${id}`
					})
				} else if (type == 2) {
					uni.navigateTo({
						url: `/pages/productImg/productImg?id=${id}`
					})
				} else if (type == 3) {
					let self = this
					//请求空调产品画册数据
					let data2 = {
						Token: this.message.Token,
						id,
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
											url: `/pages/album/album?id=${id}&list=${JSON.stringify(obj)}&lists=${JSON.stringify(lists)}`
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
				} else if (type == 4) {
					let self = this
					//请求空调培训材料数据
					let data2 = {
						Token: this.message.Token,
						id,
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
											url: `/pages/train/train?id=${id}&list=${JSON.stringify(obj)}&lists=${JSON.stringify(lists)}`
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
				} else if (type == 5) {
					let self = this
					let data2 = {
						Token: this.message.Token,
						id,
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
									let list = JSON.stringify(obj)
									uni.navigateTo({
										url: `/pages/360/360?url=${url}&id=${id}&list=${obj}&type=5`
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
				} else if (type == 6) {
					let self = this
					let data2 = {
						Token: this.message.Token,
						id,
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
									let list = JSON.stringify(obj)
									uni.navigateTo({
										url: `/pages/360/360?url=${url}&id=${id}&list=${obj}&type=6`
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
				} else if (type == 7) {
					let list = JSON.stringify(obj)
					uni.navigateTo({
						url: `/pages/video/video?id=${id}&list=${list}`
					})
				} else if (type == 8) {
					uni.navigateTo({
						url: `/pages/bill/bill?id=${id}`
					})
				} else if (type == 9) {
					let self = this
					//请求空调案例资讯数据
					let data2 = {
						Token: this.message.Token,
						id,
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
									}, 300)
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.msg)
								}
							}
						}
						ajax(data)
					})
				} else if (type == 10) {
					uni.navigateTo({
						url: `/pages/exampleDetail/exampleDetail?id=${id}`
					})
				} else if (type == 11) {
					uni.navigateTo({
						url: `/pages/speakDetail/speakDetail?id=${id}`
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
		align-items: center;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			ul {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin: 0;
				padding: 0;

				li {
					width: 100%;
					display: flex;
					flex-direction: column;
					padding: 28upx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;

					.public {
						width: 100%;
						display: flex;

						.public-user {
							width: 30%;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							height: 90upx;

							span {
								font-size: 14px;
								color: #999;
							}
						}

						.public-right {
							width: 70%;
							display: flex;
							flex-direction: column;

							.public-msg {
								display: flex;
								align-items: center;
								margin-bottom: 30upx;

								.public-img {
									width: 90upx;
									height: 90upx;
									border-radius: 50%;
									overflow: hidden;

									image {
										width: 90upx;
										height: 90upx;
										margin: 0;
									}
								}

								.public-lead {
									height: 90upx;
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									margin-left: 24upx;
								}
							}

							image {
								width: 300upx;
								height: 180upx;
								margin-bottom: 30upx;
							}

							.public-title {
								width: 100%;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
							}
						}
					}
				}
			}
		}
	}
</style>
