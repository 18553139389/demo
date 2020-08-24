<template>
	<view class="contain">
		<view class="search">
			<text class="cuIcon-back" style="font-size: 15px;" @tap="goBack"></text>
			<mSearch :mode="2" button="inside" :show="false" @search="search($event,3)"></mSearch>
		</view>
		<!--筛选条件; 模拟列表的重置和演示空布局-->
		<!-- <view class="nav">
			<view :class="{active:tabType==0}" @click="changeTab(0)">机场</view>
			<view :class="{active:tabType==1}" @click="changeTab(1)">高铁</view>
		</view> -->
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
		 @emptyclick="emptyClick" @topclick="topClick">
			<view class="list">
				<view class="item-list" v-for="(v,k) in dataList" :key="k" @tap="goDetail(v.id)">
					<view class="item-name">
						<text>{{v.title}}</text>
						<view class="item-location">
							<img src="../../static/img/location.png" alt="">
							<text style="margin-left: 10upx;">{{v.subtitle}}</text>
						</view>
					</view>
					<img src="../../static/img/right.png" alt="">
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import mSearch from '../../components/search/search.vue'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import {ajaxs} from '../../common/js/util.js'
	export default {
		data() {
			return {
				tabType: 0, // 菜单
				totalPage: 2,
				dataList: [],
				mescroll: null, //mescroll实例对象
				keyword: '',
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
						tip: '还没有相关数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				}
			}
		},
		components: {
			mSearch,
			MescrollUni
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
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
				this.dataList = []
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				let data = {
					url: '/api/gzh/importantList',
					data: {
						type: 1,
						keyword: self.keyword,
						pageNo: pageNum,
						pageSize: pageSize
					},
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							for (var j = 0; j < res.data.dataList.length; j++) {
								self.dataList.push(res.data.dataList[j])
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
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			goBack() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../veryProduce/veryProduce?id=' + id
				})
			},
			search(e, val) {
				console.log(e)
				this.keyword = e
				this.dataList = []
				this.upCallback(this.mescroll)
			},
			// 切换菜单
			changeTab(type) {
				if (this.tabType !== type) {
					this.tabType = type
					this.dataList = [] // 在这里手动置空列表,可显示加载中的请求进度
					this.mescroll.resetUpScroll() // 刷新列表数据
				}
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.search {
		width: 100%;
		height: 90upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: none;
	}

	/*菜单*/
	.nav {
		font-size: 28upx;
		text-align: center;
		height: 72upx;
	}

	.nav view {
		display: inline-block;
		width: 50%;
		padding: 16upx 0;
	}

	.nav .active {
		border-bottom: 2upx solid #DE2910;
		color: #DE2910;
	}

	.list {
		width: 100%;
	}

	.item-list {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.item-list>img {
		width: 30upx;
		height: 30upx;
	}

	.item-name {
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
	}

	.item-location {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #333;
		margin-top: 16upx;
	}

	.item-location>img {
		width: 18upx;
		height: 24upx;
	}
</style>
