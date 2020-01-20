<template>
	<view class="contain">
		<view class="back" @tap="back">
			<img class="backs" src="../../static/img/backs.png" alt="">
		</view>
		<van-swipe :autoplay="5000" indicator-color="#DE2910">
			<van-swipe-item v-for="(v,k) in bannerList" :key="k">
				<img class="banner" :src="v" alt="">
			</van-swipe-item>
		</van-swipe>
		<view class="produce">
			<view class="title">
				<block v-if="list.type == 1">
					<view class="price">￥{{list.oldPrice}}</view>
					<!-- <view class="score">纪念币：0</view> -->
				</block>
				<block v-if="list.type == 2">
					<view class="price">￥{{list.price}}</view>
					<view class="old">￥{{list.oldPrice}}</view>
					<view class="score">纪念币：{{list.point}}</view>
				</block>
				<block v-if="list.type == 3">
					<!-- <view class="price">￥0</view> -->
					<view class="score">纪念币：{{list.point}}</view>
				</block>
			</view>
			<view class="other">运送费：￥{{list.fee}}</view>
			<view class="name">{{list.title}}</view>
		</view>
		<view class="detail">
			<view class="hot_title">
				<view class="hot_left">
					<view v-for="(v,k) in tabs" :key="k" :class="itemIndex == k ? 'activity active' : 'activity'" @tap="changeTab(k)">{{v}}</view>
				</view>
			</view>
			<view style="width: 100%;padding-bottom: 100upx;overflow: hidden;" v-if="list && itemIndex == 0">
				<u-parse :content="list.content" class="parse"></u-parse>
			</view>
			<view class="comment" v-if="itemIndex == 1">
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				 @emptyclick="emptyClick" @topclick="topClick">
					<view class="comment-list" v-for="(v,k) in comment" :Key="k">
						<img class="icon" :src="v.icon" alt="">
						<view class="comment-right">
							<view class="comment-tit">
								<view>{{v.username}}</view>
								<view>{{v.createDate}}</view>
							</view>
							<view class="comment-text">{{v.content}}</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<view class="buy" @tap="goOrder">立即购买</view>
	</view>
</template>

<script>
	import {ajax,ajaxs} from '../../common/js/util.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import webView from '../../components/conText/conText.vue'
	import uParse from '../../components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				url: 'http://m.xgcyz1978.com/display/activity?id=cd300ecb3c1d47868d1db6fda97b9228',
				list: '',
				bannerList: [],
				ids: '',
				tabs: ['商品详情', '评价'],
				comment: [{
					url: '../../static/img/2.jpg',
					name: '小明',
					date: '2019-09-24 15:09',
					text: '产品质量还是不错的产品质量还是不错的产品质量还是不错的'
				}],
				itemIndex: 0,
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
						tip: '还没有该产品的评论', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				}
			}
		},
		components: {
			webView,
			MescrollUni,
			uParse
		},
		onLoad(option) {
			let self = this
			this.ids = option.id
			let datas = {
				productId: option.id
			}
			let data = {
				url: '/api/gzh/productDetail',
				data: datas,
				success: function(res) {
					if (res.data.result == 0) {
						self.bannerList = res.data.bannerList
						self.list = res.data
					}
				}
			}
			ajax(data)
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			goOrder() {
				//对象深拷贝
				let list = Object.assign({}, this.list)
				list.content = ''
				list = JSON.stringify(list)
				uni.navigateTo({
					url: '../shopOrder/shopOrder?list=' + list + '&id=' + this.ids
				})
			},
			changeTab(k) {
				this.itemIndex = k
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
				this.comment = []
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				let datas = {
					productId: this.ids,
					pageNo: pageNum,
					pageSize: pageSize
				}
				let data = {
					url: '/api/gzh/commentList',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							for (var j = 0; j < res.data.dataList.length; j++) {
								self.comment.push(res.data.dataList[j])
							}
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
		background: #FFFFFF;
	}

	.contain {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.banner {
		width: 100%;
		height: 100%;
	}

	.back {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		background: rgba(0, 0, 0, .3);
		position: absolute;
		top: 100upx;
		left: 30upx;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.backs {
		width: 32upx;
		height: 32upx;
	}

	.produce {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		border-bottom: 6px solid #f9f9f9;
	}

	.title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price {
		font-size: 14px;
		color: #DE2910;
	}

	.score {
		color: #DE2910;
	}

	.old {
		color: #666;
		text-decoration: line-through;
		margin-right: 200upx;
	}

	.name {
		margin-top: 14upx;
	}

	.detail {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
	}

	.hot_title {
		width: 100%;
		height: 80upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #333;
	}

	.hot_left {
		width: 100%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.activity {
		height: 80upx;
		line-height: 80upx;
		font-size: 14px;
		box-sizing: border-box;
		color: #333;
	}

	.active {
		color: #DE2910 !important;
		border-bottom: 1px solid #DE2910;
	}

	.buy {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}

	.comment {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin-bottom: 90upx;
	}

	.comment-list {
		width: 100%;
		display: flex;
		border-bottom: 1px solid #eee;
		padding: 30upx 0;
	}

	.comment-list:last-of-type {
		border-bottom: none;
	}

	.icon {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.comment-right {
		width: 600upx;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #333;
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.comment-tit {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.comment-text {
		width: 100%;
		text-align: justify;
		color: #666;
	}
	
	.other {
		margin-top: 14upx;
		font-size: 14px;
		color: #DE2910;
	}
</style>
