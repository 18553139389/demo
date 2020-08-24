<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white"
			 @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">酒店列表</block>
				<block slot="right">
					<view>地图</view>
				</block>
			</cu-custom>
		</view>
		<view class="type">
			<view class="icon" @tap="sortPrice">
				<view>价格</view>
				<img src="../../static/img/down1.png" alt="">
			</view>
			<view class="icon" @tap="sortStar">
				<view>星级</view>
				<img src="../../static/img/down1.png" alt="">
			</view>
		</view>
		<view class="wrapper">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick">
				<view class="list">
					<view class="list-item" v-for="(v,k) in listData" :key="k" @tap="goDetail(v.HotelId)" v-if="v.MinPrice">
						<img class="item-left" :src="v.DefaultPicture" alt="">
						<view class="item-right">
							<view class="name">{{v.HotelName}}</view>
							<view class="star">
								<view style="font-size: 14px;color: #E73C1D;" v-if="v.Star == 5">五星级/豪华</view>
								<view style="font-size: 14px;color: #E73C1D;" v-if="v.Star == 4">四星级/高档</view>
								<view style="font-size: 14px;color: #E73C1D;" v-if="v.Star == 3">三星级/舒适</view>
								<view style="font-size: 14px;color: #E73C1D;" v-if="v.Star <= 2">二星级/普通</view>
								<view style="font-size: 16px;color: #E73C1D;">￥{{v.MinPrice}}</view>
							</view>
							<view class="address">地址：{{v.Address}}</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import {
		ajaxs
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				list: {},
				listData: [],
				type: null,
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
						tip: '没有搜索到附近的酒店', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				}
			}
		},
		components: {
			MescrollUni
		},
		onLoad(option) {
			let self = this
			this.list = JSON.parse(option.list)
			this.type = option.type
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
			goRight() {
				if(this.type == 0){
					uni.navigateTo({
						url: '../hotelMap/hotelMap?list='+JSON.stringify(this.listData)+'&type=0',
						animationType: 'slide-in-left',
						animationDuration: 500
					})
				}else{
					uni.navigateTo({
						url: '../hotelMap/hotelMap?list='+JSON.stringify(this.listData)+'&type=1',
						animationType: 'slide-in-left',
						animationDuration: 500
					})
				}
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
				this.list.PageSize = pageSize
				this.list.PageIndex = pageNum
				let data = {
					url: '/api/gzh/hotelSearchHotelList',
					data: self.list,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							for (var j = 0; j < res.data.Data.DataHotel.length; j++) {
								self.listData.push(res.data.Data.DataHotel[j])
							}
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.Data.DataHotel
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = res.data.Data.TotalPageCount
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
			CompareDate1(t1, t2) {
				var a = t1.MinPrice
				var b = t2.MinPrice
				return parseInt(a) - parseInt(b)
			},
			CompareDate(t1, t2) {
				var a = t1.Star
				var b = t2.Star
				return parseInt(a) - parseInt(b)
			},
			sortPrice() {
				this.listData.sort(this.CompareDate1)
			},
			sortStar() {
				this.listData.sort(this.CompareDate)
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../hotelDetail/hotelDetail?id='+id,
					animationType: 'slide-in-left',
					animationDuration: 500
				})
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
	}

	.wrapper {
		width: 100%;
		height: 100%;
		padding-top: 80upx;
	}

	.list {
		width: 100%;
		height: 100%;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.list-item:first-of-type {
		padding-top: 0 !important;
	}

	.list-item {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 40upx 0;
		border-bottom: 1px dashed #eee;
	}

	.item-left {
		width: 200upx;
		height: 150upx;
		border-radius: 4px;
	}

	.item-right {
		width: 490upx;
		height: 150upx;
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.name {
		width: 100%;
		font-size: 14px;
		color: #333;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.star {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.address {
		width: 100%;
		font-size: 12px;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.type {
		width: 100%;
		height: 80upx;
		display: flex;
		align-items: center;
		background: #E73C1D;
		font-size: 14px;
		color: #fff;
		position: fixed;
	}
	
	.icon {
		width: 50%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.icon>img {
		width: 32upx;
		margin-left: 20upx;
	}
</style>
