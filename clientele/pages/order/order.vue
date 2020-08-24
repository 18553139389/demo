<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="search" @tap="goAll">
				<image src="../../static/images/search.png"></image>
				<input type="text" v-model="val" placeholder="请输入订单号或手机号" disabled>
				<view class="look">查询</view>
			</view>
			<view class="navs">
				<view :class="navIndex == k ? 'active navs-item' : 'navs-item'" v-for="(v,k) in nav" :key="k" @tap="changeNav(k)">{{v}}</view>
			</view>
		</view>
		<view class="all">
			<view class="items">
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				@emptyclick="emptyClick" @topclick="topClick">
					<view class="list-item" @tap="goDetail(v.ordernum)" v-for="(v,k) in list" :key="k">
						<image :src="v.certificateimage"></image>
						<view class="list-right">
							<view class="list-title">{{v.certificatename}}</view>
							<view class="list-state" style="width:120rpx;text-align:center;padding:8rpx 0;border-radius: 4px;background: #EAF5FF;color: #249AFD;" v-if="v.type == 1">收购</view>
							<view class="list-state" style="width:120rpx;text-align:center;padding:8rpx 0;border-radius: 4px;background: #FFEFEC;color: #FF411C;" v-if="v.type == 2">办证</view>
							<view class="list-state" style="width:120rpx;text-align:center;padding:8rpx 0;border-radius: 4px;background: #DDF6DE;color: #00B300;" v-if="v.type == 3">转让</view>
							<view v-if="v.state == 0">待审核</view>
							<view v-else-if="v.state == 8">已完成</view>
							<view v-else-if="v.state == 9">审核拒绝</view>
							<view v-else>处理中</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
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
				navIndex: 0,
				val: '',
				nav: ['全部','待审核','处理中','已完成'],
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
						tip: '没有搜索到相关订单', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				type: ''
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
		onLoad() {
			if(!uni.getStorageSync('uid')) {
				uni.reLaunch({
				    url: '/pages/first/first'
				})
			}
		},
		methods: {
			onShow() {
				let k = this.$store.state.orderIndex
				this.navIndex = k
				if(k == 0) {
					this.type = ''
				} else if(k == 1) {
					this.type = 0
				} else if(k== 2) {
					this.type = 1
				} else {
					this.type = 2
				}
				if(this.mescroll) {
					this.list = []
					this.mescroll.resetUpScroll()
				}
			},
			changeNav(k) {
				if(this.navIndex == k) {
					return
				}
				this.navIndex = k
				this.$store.commit('changeOrderIndex', k)
				if(k == 0) {
					this.type = ''
				} else if(k == 1) {
					this.type = 0
				} else if(k== 2) {
					this.type = 1
				} else {
					this.type = 2
				}
				this.list = []
				this.mescroll.resetUpScroll()
			},
			goDetail(order) {
				uni.navigateTo({
				    url: '/pages/orderDetail/orderDetail?order=' + order
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
					state: this.type,
					pageCount: mescroll.size,
					nowPage: mescroll.num
				}
				let data = {
					url: 'myorderlist',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							if (res.data.dataList) {
								for(let i=0;i<res.data.dataList.length;i++) {
									self.list.push(res.data.dataList[i])
								}
							}
						} else {
							Toast.showToast(res.data.resultNote)
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = []
						if (res.data.dataList) {
							curPageData = res.data.dataList
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
			},
			goAll() {
				uni.navigateTo({
				    url: '/pages/allOrder/allOrder'
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
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.search {
				width: 100%;
				height: 80rpx;
				padding: 0 24rpx;
				box-sizing: border-box;
				border-radius: 24px;
				background: #F6F6F6;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 28rpx 0;
				overflow: hidden;
				position: relative;
			
				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 30rpx;
					margin-left: 60rpx;
				}
			
				input {
					flex: 0.7;
					font-size: 28rpx;
					color: #333;
				}
				
				.look {
					height: 80rpx;
					line-height: 80rpx;
					position: absolute;
					top: 0;
					right: 0;
					padding: 0 32rpx;
					font-size: 28rpx;
					background: #E6FFE6;
					color: #00C800;
				}
			}
			
			.navs {
				width: 100%;
				display: flex;
				align-items: center;
				
				.navs-item {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 28rpx;
					color: #666;
					margin-right: 32rpx;
					
					&.active {
						color: #333;
						border-bottom: 2px solid #00C800;
					}
				}
			}
		}
		
		.all {
			width: 100%;
			display: flex;
			flex-direction: column;
			border-top: 1px solid #eee;
			padding: 28rpx;
			box-sizing: border-box;
			
			.items {
				width: 100%;
				display: flex;
				flex-direction: column;
				// margin-top: 60rpx;
				
				.list-item {
					width: 100%;
					display: flex;
					border-bottom: 1px solid #eee;
					padding-bottom: 36rpx;
					margin-bottom: 36rpx;
					
					image {
						width: 250rpx;
						height: 160rpx;
						border-radius: 4px;
					}
					
					.list-right {
						width: 72%;
						height: 160rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 28rpx;
						color: #666;
						padding-left: 28rpx;
						box-sizing: border-box;
						
						.list-title {
							width: 100%;
							font-size: 30rpx;
							color: #333;
							font-weight: 600;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
				
				.list-item:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
