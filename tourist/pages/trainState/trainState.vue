<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white"
			 @Back="back">
				<block slot="backText"></block>
				<block slot="content">火车票订单</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="tabs">
				<view class="tab" @tap="change(k)" :class="itemIndex == k ? 'active' : ''" v-for="(v,k) in datas" :key="k">{{v}}</view>
			</view>
		</view>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
		 @emptyclick="emptyClick" @topclick="topClick">
			<view class="lists">
				<view class="list" @tap="goDetail(v.orderId)" v-for="(v,k) in list" :key="k">
					<view class="list-top">
						<view>订单编号：{{v.orderId}}</view>
					</view>
					<view class="list-middel">
						<view class="list-code">{{v.trainNo}}</view>
						<view class="start">
							<view class="start-point">
								<view class="start1">始</view>
								<view>{{v.startCity}}</view>
							</view>
							<view class="start-time">{{v.startTime}}</view>
						</view>
						<view class="icons">
							<img src="../../static/img/train_icon.png" alt="">
							<view>3小时10分钟</view>
						</view>
						<view class="start">
							<view class="start-point">
								<view class="start2">终</view>
								<view>{{v.endCity}}</view>
							</view>
							<view class="start-time">{{v.endTime}}</view>
						</view>
					</view>
					<view class="list-bottom">
						<view>出发日期：{{v.startDate}}</view>
						<view class="state" v-if="v.state == 1">新订单</view>
						<view class="state" v-if="v.state == 2">已付款</view>
						<view class="state" v-if="v.state == 3">已出票</view>
						<view class="state" v-if="v.state == 4">已取消</view>
						<view class="state" v-if="v.state == 5">已确认</view>
						<view class="state" v-if="v.state == 6">退票</view>
						<view class="state" v-if="v.state == 8">已退款</view>
						<view class="state" v-if="v.state == 9">退款中</view>
						<view class="state" v-if="v.state == 10">不能出票_退款中</view>
						<view class="state" v-if="v.state == 11">不能出票_已退款</view>
						<view class="state" v-if="v.state == 12">后续支付</view>
						<view class="state" v-if="v.state == 13">不能出票</view>
						<view class="state" v-if="v.state == 14">出票中</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		ajaxs
	} from '../../common/js/util.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				datas: ['全部', '待付款', '待出行', '已完成', '退款'],
				itemIndex: 0,
				tabType: 0,
				list: [],
				totalPage: 2,
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
						tip: '暂无订单数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				show: false,
				val: '',
				orderId: '',
				look: false
			}
		},
		components: {
			MescrollUni
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
		},
		onShow() {
			if(this.mescroll){
				this.list = []
				this.mescroll.resetUpScroll()
			}
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
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
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
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				if (this.tabType === 0) {
					self.init('0', mescroll)
				} else if (this.tabType === 1) {
					self.init('1', mescroll)
				} else if (this.tabType === 2) {
					self.init('2', mescroll)
				} else if (this.tabType === 3) {
					self.init('3', mescroll)
				} else if (this.tabType === 4) {
					self.init('4', mescroll)
				}
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(state = '', mescroll) {
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					type: state
				}
				let data = {
					url: '/api/gzh/trainOrderList',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							for (var j = 0; j < res.data.dataList.length; j++) {
								self.list.push(res.data.dataList[j])
							}
							self.look = false
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.dataList
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = res.data.totalPage
						mescroll.endByPage(curPageData.length, totalPage)
					}
				}
				ajaxs(data)
			},
			change(k) {
				if (this.look) {
					return false
				}
				this.itemIndex = k
				this.look = true
				if (this.tabType !== k) {
					this.tabType = k
					this.list = [] 
					this.mescroll.resetUpScroll() 
				}
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../trainDetail/trainDetail?id=' + id
				})
			},
			back() {
				uni.navigateTo({
					url: '../order/order'
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 0;
		top: 50px;
		z-index: 999;
		background: #fff;
	}

	.tabs {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #FFFFFF;
	}

	.tab {
		font-size: 14px;
		color: #333;
		padding: 16upx 0;
	}

	.active {
		color: #DE2910;
		border-bottom: 2px solid #DE2910;
	}

	.lists {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 120upx 30upx 30upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 4px;
		box-shadow: 1px 1px 4px #eee;
		margin-bottom: 30upx;
	}

	.list-top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #666;
		border-bottom: 1px dashed #eee;
		padding-bottom: 20upx;
	}

	.list-middel {
		width: 100%;
		display: flex;
		padding: 20upx 0;
		justify-content: space-between;
		border-bottom: 1px dashed #eee;
	}

	.list-code {
		font-size: 18px;
		font-weight: 500;
		color: #333;
	}

	.start {
		display: flex;
		flex-direction: column;
		margin-left: 20upx;
	}

	.start-point {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.start1 {
		padding: 0 2px;
		background: #DE2910;
		border-radius: 4px;
		font-size: 12px;
		color: #fff;
		margin-right: 14upx;
	}

	.start2 {
		padding: 0 2px;
		background: #01910B;
		border-radius: 4px;
		font-size: 12px;
		color: #fff;
		margin-right: 14upx;
	}

	.start-time {
		font-size: 12px;
		margin-top: 14upx;
	}

	.icons {
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #333;
	}

	.icons>img {
		width: 150upx;
		margin: 20upx 40upx 0;
	}

	.icons>view {
		margin-left: 40upx;
		margin-top: 10upx;
	}

	.list-bottom {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		color: #333;
		padding: 20upx 0 0;
	}
</style>
