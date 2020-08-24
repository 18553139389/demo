<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">供需对接</block>
			</cu-custom>
		</view>
		<view class="nav">
			<view :class="navIndex == k ? 'active item' : 'item'" v-for="(v,k) in nav" :key="k" @tap="changeNav(k)">{{v}}</view>
		</view>
		<view class="wrapper">
			<view class="search" @tap="goSearch">
				<image src="../../static/images/search.png"></image>
				<input type="text" v-model="val" placeholder="请输入关键字搜索" disabled>
			</view>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			@emptyclick="emptyClick" @topclick="topClick">
				<QSMasonry ref="QSMasonry" hasImage :col="col"></QSMasonry>
			</mescroll-uni>
		</view>
		<view class="bottom">
			<view class="public" @tap="goPublic">发布供需</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import QSMasonry from '../../components/QS-Masonry/QS-Masonry.vue'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				val: '',
				list: [],
				list1: [],
				navIndex: 0,
				nav: ['推荐','关注'],
				col: 2,
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
						tip: '没有新的数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				}
			}
		},
		components: {
			QSMasonry,
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
		methods: {
			onLoad() {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/login/login'
					})
				}
			},
			goPublic() {
				uni.navigateTo({
				    url: '/pages/public/public'
				})
			},
			goSearch() {
				uni.navigateTo({
				    url: '/pages/search/search'
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
				this.list = []
				this.list1 = []
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
				console.log('点击了回到顶部按钮')
			},
			init(mescroll) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					search: this.val,
					pageSize: mescroll.size,
					pageNo: mescroll.num,
					searchType: '',
					type: (this.navIndex + 1)
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/gongXuList',
						data: data1,
						success: function(res) {
							console.log(res)
							if(self.navIndex == 0) {
								if (res.data.result == 0) {
									Toast.hideLoading()
									if (res.data.dateList) {
										for(let i=0;i<res.data.dateList.length;i++) {
											self.list.push(res.data.dateList[i])
										}
										self.$nextTick(() => {
											self.list1 = []
											// self.$refs.QSMasonry.setData(self.list1)
											self.$refs.QSMasonry.setData(self.list,0)
										})
									}
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.resultNote)
								}
							} else {
								if (res.data.result == 0) {
									Toast.hideLoading()
									if (res.data.dateList) {
										for(let i=0;i<res.data.dateList.length;i++) {
											self.list1.push(res.data.dateList[i])
										}
										self.$nextTick(() => {
											self.list = []
											// self.$refs.QSMasonry.setData(self.list)
											self.$refs.QSMasonry.setData(self.list1,1)
										})
									}
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.resultNote)
								}
							}
							// 接口返回的当前页数据列表 (数组)
							let curPageData = []
							if (res.data.dateList) {
								curPageData = res.data.dateList
							}
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = 1
							if (res.data.totalPage) {
								totalPage = res.data.totalPage
							}
							mescroll.endByPage(curPageData.length, totalPage)
						}
					}
					ajax(data)
				})
			},
			changeNav(k) {
				if(this.navIndex == k) {
					return
				}
				this.navIndex = k
				this.list = []
				this.list1 = []
				this.mescroll.resetUpScroll()
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;

		.fixed {
			width: 100%;
		}
		
		.nav {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 28rpx;
			color: #666;
			margin: 20rpx 0 10rpx;
			
			.item {
				height: 50rpx;
				line-height: 50rpx;
				
				&.active {
					color: #0081FF;
					border-bottom: 1px solid #0081FF;
				}
			}
		}

		.wrapper {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding-bottom: 100rpx;

			.search {
				width: 100%;
				padding: 12rpx 24rpx;
				box-sizing: border-box;
				border-radius: 24px;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 28rpx 0;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 30rpx;
				}

				input {
					flex: 1;
					font-size: 28rpx;
					color: #333;
				}
			}
		}
		
		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			padding: 24rpx 0;
			background: #fff;
			font-size: 30rpx;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.public {
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border-radius: 30px;
				box-shadow: 0 0 5px rgba(0,0,0,0.2);
			}
		}
	}
</style>
