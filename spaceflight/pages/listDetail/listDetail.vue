<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">资讯详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles">{{lists.title}}</view>
			<view class="time">
				<image src="../../static/images/task.png"></image>
				<view>{{lists.creatDate}}</view>
			</view>
			<!-- <u-parse :content="lists.content"></u-parse> -->
			<u-parse :content="lists.content" />
		</view>
		<view class="bottom">
			<view class="list" @tap="goShow">
				<image src="../../static/images/message.png"></image>
				<view>{{commentCount}}</view>
			</view>
			<view class="list" @tap="goZan">
				<image src="../../static/images/praise.png" v-if="zan == 'n'"></image>
				<image src="../../static/images/praise_fill.png" v-if="zan == 'y'"></image>
				<view>{{lists.zanCount}}</view>
			</view>
		</view>
		<view class="bg" v-if="show" @tap="goCancel">
			<scroll-view class="bg-box" scroll-y="true" @tap.stop="" @scrolltolower="upCallbacks">
				<mescroll-uni ref="comment" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				@emptyclick="emptyClick" @topclick="topClick">
					<view class="bg-item" v-for="(v,k) in list" :key="k">
						<image :src="v.headImage"></image>
						<view class="bg-list">
							<view class="name">{{v.nickName}}</view>
							<view class="bg-content">{{v.reportContent}}</view>
							<view class="bg-time">{{v.creatDate}}</view>
						</view>
					</view>
				</mescroll-uni>
				<view class="submit">
					<input type="text" confirm-type="send" v-model="comment" placeholder="说两句吧~" @confirm="confirm">
					<view @tap.stop="goCancel">取消</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uParse from '../../components/gaoyia-parse/parse.vue'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				show: false,
				lists: {},
				comment: '',
				zan: '',
				ids: '',
				commentCount: 0,
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
						size: 10, // 每页数据的数量
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
						tip: '没有新的评论', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				html: ''
			}
		},
		components: {
			MescrollUni,
			uParse
		},
		onLoad(option) {
			this.inits(option.id)
			this.ids = option.id
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
			inits(id) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					newsId: id
				}
				let data = {
					url: '/api/newsInfo',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.zan = res.data.zan
							self.commentCount = res.data.commentCount
							self.lists = res.data.content
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
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
				this.list = []
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				console.log(pageNum)
				let self = this
				self.init(mescroll)
			},
			upCallbacks() {
				console.log(this.mescroll)
				this.mescroll && this.mescroll.onReachBottom()
				this.mescroll.num = this.mescroll.num + 1
				this.init(this.mescroll)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(mescroll) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					newsId: this.ids,
					pageSize: 8,
					pageNo: mescroll.num
				}
				let data = {
					url: '/api/reportList',
					data: data1,
					success: function(res) {
						console.log(res)
						if (mescroll.num > res.data.totalPage) {
							// 接口返回的当前页数据列表 (数组)
							let curPageData = []
							if (res.data.typeList) {
								curPageData = res.data.typeList
							}
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = 1
							if (res.data.totalPage) {
								totalPage = res.data.totalPage
							}
							mescroll.endByPage(curPageData.length, totalPage)
							return
						}
						if (res.data.result == 0) {
							if (res.data.typeList) {
								for(let i=0;i<res.data.typeList.length;i++) {
									self.list.push(res.data.typeList[i])
								}
							}
						} else {
							Toast.showToast(res.data.resultNote)
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = []
						if (res.data.typeList) {
							curPageData = res.data.typeList
						}
						console.log(curPageData.length)
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = 1
						if (res.data.totalPage) {
							totalPage = res.data.totalPage
						}
						mescroll.endByPage(curPageData.length, totalPage)
					}
				}
				ajax(data)
			},
			goShow() {
				this.show = true
			},
			goHide() {
				this.show = false
			},
			goZan() {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					newsId: this.ids
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/clickZan',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 1) {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
								if (res.data.zan == 'y') {
									self.zan = res.data.zan
									self.lists.zanCount = parseInt(self.lists.zanCount) + 1
									self.$forceUpdate()
								} else {
									self.zan = res.data.zan
									self.lists.zanCount = parseInt(self.lists.zanCount) - 1
									self.$forceUpdate()
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
			confirm() {
				if(this.comment == '') {
					Toast.showToast('评论不能为空')
					return
				}
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					newsId: this.ids,
					content: this.comment
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/submitReport',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.showToast('提交成功，等待审核')
								self.comment = ''
								self.list = []
								self.mescroll.resetUpScroll()
								Toast.hideLoading()
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goCancel() {
				this.comment = ''
				this.show = false
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
			padding: 28rpx;
			box-sizing: border-box;
			background: #fff;
			margin-bottom: 100rpx;

			.titles {
				width: 100%;
				padding: 12rpx 0 40rpx;
				border-bottom: 1px solid #eee;
				font-size: 30rpx;
				text-align: center;
			}

			.time {
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #999;
				margin: 30rpx 0;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 24rpx;
				}
			}

			.content {
				width: 100%;
				font-size: 28rpx;
				color: #666;
				margin-bottom: 30rpx;
			}

			.imgs {
				width: 100%;
			}
		}

		.bottom {
			width: 100%;
			height: 120rpx;
			background: #fff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 42rpx;
			color: #333;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 90;

			.list {
				display: flex;
				align-items: center;

				image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 24rpx;
				}
			}
		}

		.bg {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .4);
			z-index: 10000000;

			.bg-box {
				width: 100%;
				height: 60vh;
				padding: 60rpx 28rpx 100rpx;
				box-sizing: border-box;
				background: #fff;
				border-top-left-radius: 16px;
				border-top-right-radius: 16px;
				display: flex;
				flex-direction: column;
				position: absolute;
				left: 0;
				bottom: 0;

				.bg-item {
					width: 100%;
					display: flex;
					margin-bottom: 28rpx;

					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}

					.bg-list {
						width: 75%;
						display: flex;
						flex-direction: column;
						margin-left: 24rpx;
						box-sizing: border-box;
						border-bottom: 1px solid #eee;

						.name {
							width: 100%;
							height: 90rpx;
							line-height: 90rpx;
							font-size: 28rpx;
							color: #0081FF;
						}

						.bg-content {
							width: 100%;
							font-size: 26rpx;
							color: #333;
							line-height: 18px;
						}

						.bg-time {
							width: 100%;
							font-size: 24rpx;
							color: #999;
							margin: 28rpx 0;
						}
					}
				}

				.submit {
					position: fixed;
					left: 0;
					bottom: 15rpx;
					width: 100%;
					height: 70rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 28rpx;
					box-sizing: border-box;
					font-size: 30rpx;
					color: #0081FF;

					input {
						width: 85%;
						height: 70rpx;
						font-size: 28rpx;
						color: #333;
						border-radius: 30px;
						background: #f6f6f6;
						padding: 0 20rpx;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>
