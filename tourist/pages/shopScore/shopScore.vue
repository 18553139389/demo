<template>
	<view class="contain">
		<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
			<block slot="backText"></block>
			<block slot="content">纪念币商城</block>
		</cu-custom>
		<view class="topImg">
			<img src="../../static/img/1.jpg" />
		</view>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
		 @emptyclick="emptyClick" @topclick="topClick">
			<view class="recommend">
				<view class="recommend_list" @tap="goDetail(v.productId)" v-for="(v,k) in list" :key="k">
					<img class="recommend_img" :src="v.image" alt="">
					<view class="recommend_title">{{v.title}}</view>
					<view class="recommend_price">
						<block>
							<view class="scores">纪念币：{{v.point}}</view>
						</block>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
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
						tip: '还没有数据', // 提示
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
				self.init(mescroll)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(mescroll) {
				let self = this
				let datas = {
					type: 1,
					pageNo: mescroll.num
				}
				let data = {
					url: '/api/gzh/productList',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							for (var j = 0; j < res.data.dataList.length; j++) {
								self.list.push(res.data.dataList[j])
							}
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.dataList
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = res.data.totalPage
						mescroll.endByPage(curPageData.length, totalPage)
					}
				}
				ajax(data)
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../shopDetail/shopDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
		overflow: hidden;
	}

	.fixed {
		position: fixed;
		z-index: 99;
	}

	.topImg {
		width: 100%;
		height: 150px;
	}

	.topImg>img {
		width: 100%;
		height: 100%;
	}

	.recommend {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		background: #f9f9f9;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.recommend_list {
		width: 48%;
		border-radius: 4px;
		background: #fff;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #666;
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.recommend_img {
		width: 100%;
		/* height: 200upx; */
	}

	.recommend_title {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		padding-left: 20upx;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.recommend_price {
		width: 100%;
		padding: 0 20upx 12upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price {
		font-size: 14px;
		color: #DE2910;
	}

	.scores {
		color: #DE2910;
	}
</style>
