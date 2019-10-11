<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white" @Back="Back">
				<block slot="backText"></block>
				<block slot="content">快速通道订单</block>
			</cu-custom>
		</view>
		<!--筛选条件; 模拟列表的重置和演示空布局-->
		<view class="nav">
			<view :class="{active:tabType==0}" @click="changeTab(0)">进行中</view>
			<view :class="{active:tabType==1}" @click="changeTab(1)">已完成</view>
		</view>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
		 @emptyclick="emptyClick" @topclick="topClick">
			<view class="wrapper">
				<block v-for="(v,k) in listData" :key="k" v-if="v.state == 1">
					<view class="list" @tap="goDetail(v.orderId)">
						<view class="name">
							<view class="name_tit">{{v.title}}</view>
							<view class="name_time" style="color: #999;">{{v.createDate}}</view>
						</view>
						<view class="message" style="padding-top: 20upx;">
							<view class="msgOrder">
								<text style="margin-bottom: 16upx;">订单编号：{{v.orderId}}</text>
								<text style="margin-bottom: 16upx;">到厅时间：{{v.reserveDate}}</text>
								<text>到厅人数：{{v.numbers}} 人</text>
							</view>
							<view class="price">￥{{v.amount}}元</view>
						</view>
						<img src="../../static/img/daifukuan.png" alt="">
					</view>
				</block>
				<block v-for="(v,k) in listData" :key="k" v-if="v.state == 2">
					<view class="list" @tap="goDetail(v.orderId)">
						<view class="name">
							<view class="name_tit">{{v.title}}</view>
							<view class="name_time" style="color: #999;">{{v.createDate}}</view>
						</view>
						<view class="message" style="padding-top: 20upx;">
							<view class="msgOrder">
								<text style="margin-bottom: 16upx;">订单编号：{{v.orderId}}</text>
								<text style="margin-bottom: 16upx;">到厅时间：{{v.reserveDate}}</text>
								<text>到厅人数：{{v.numbers}} 人</text>
							</view>
							<view class="price">￥{{v.amount}}元</view>
						</view>
						<img src="../../static/img/yiwancheng.png" alt="">
					</view>
				</block>
				<block v-for="(v,k) in listData" :key="k" v-if="v.state == 3">
					<view class="list" @tap="goDetail(v.orderId)">
						<view class="name">
							<view class="name_tit">{{v.title}}</view>
							<view class="name_time" style="color: #999;">{{v.createDate}}</view>
						</view>
						<view class="message" style="padding-top: 20upx;">
							<view class="msgOrder">
								<text style="margin-bottom: 16upx;">订单编号：{{v.orderId}}</text>
								<text style="margin-bottom: 16upx;">到厅时间：{{v.reserveDate}}</text>
								<text>到厅人数：{{v.numbers}} 人</text>
							</view>
							<view class="price">￥{{v.amount}}元</view>
						</view>
						<img src="../../static/img/yiguoqi.png" alt="">
					</view>
				</block>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import {ajaxs} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#ffffff',
				tabType: 0,
				listData: [],
				mescroll: null, //mescroll实例对象
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
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
					noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
						tip: '还没有订单数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				}
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
		onReady() {

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
		onShow() {
			if (this.mescroll) {
				this.listData = []
				this.upCallback(this.mescroll)
			}
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
			Back() {
				uni.navigateTo({
					url: '../order/order'
				})
			},
			// 切换菜单
			changeTab(type) {
				if (this.tabType !== type) {
					this.tabType = type
					this.listData = [] // 在这里手动置空列表,可显示加载中的请求进度
					this.mescroll.resetUpScroll() // 刷新列表数据
				}
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../stageDetail/stageDetail?id=' + id
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
				this.listData = []
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				if (this.tabType === 0) {
					let data = {
						url: '/api/gzh/fastwayOrderList',
						data: {
							uid: self.$store.state.uid,
							type: 1,
							pageNo: pageNum,
							pageSize: pageSize
						},
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								for (var j = 0; j < res.data.dataList.length; j++) {
									self.listData.push(res.data.dataList[j])
								}
							}
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.dataList
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.totalPage
							mescroll.endByPage(curPageData.length, totalPage)
							//设置列表数据
							// if (mescroll.num == 1) this.dataList = [] //如果是第一页需手动置空列表
							// self.dataList = self.dataList.concat(curPageData) //追加新数据
						}
					}
					ajaxs(data)
				} else if (this.tabType === 1) {
					let data = {
						url: '/api/gzh/fastwayOrderList',
						data: {
							uid: self.$store.state.uid,
							type: 2,
							pageNo: pageNum,
							pageSize: pageSize
						},
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								for (var j = 0; j < res.data.dataList.length; j++) {
									self.listData.push(res.data.dataList[j])
								}
							}
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.dataList
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.totalPage
							mescroll.endByPage(curPageData.length, totalPage)
							//设置列表数据
							// if (mescroll.num == 1) this.dataList = [] //如果是第一页需手动置空列表
							// self.dataList = self.dataList.concat(curPageData) //追加新数据
						}
					}
					ajaxs(data)
				}
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
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

	/*菜单*/
	.nav {
		font-size: 28upx;
		text-align: center;
		width: 100%;
		height: 72upx;
		position: fixed;
		top: 50px;
		left: 0;
		background: #fff;
		z-index: 6;
	}

	.nav view {
		display: inline-block;
		width: 50%;
		height: 72upx;
		padding: 16upx 0;
		box-sizing: border-box;
	}

	.nav .active {
		border-bottom: 2upx solid #FF6990;
		color: #FF6990;
	}

	.wrapper {
		width: 100%;
		padding: 100upx 30upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 30upx;
		padding: 30upx;
		box-sizing: border-box;
		position: relative;
	}
	
	.list>img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.name,
	.message {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		font-size: 14px;
		color: #333;
		padding: 0 0 30upx;
		box-sizing: border-box;
		z-index: 4;
	}

	.name_tit {
		width: 45%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.msgOrder {
		width: 75%;
		display: flex;
		flex-direction: column;
	}

	.price {
		font-size: 32upx;
		color: red;
	}
</style>
