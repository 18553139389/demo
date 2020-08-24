<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :isIcons="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @tap="Back">
				<block slot="backText"></block>
				<block slot="content">收购</block>
			</cu-custom>
		</view>
		<!-- <view class="look" :style="{top:top1 + 'px'}">
			<view class="search" :style="{top:top1 + 'px'}" @tap="goSearch">
				<image src="../../static/images/search.png"></image>
				<input type="text" v-model="val" placeholder="请输入要搜索的资质名称" disabled>
			</view>
			<scroll-view class="navs" scroll-x="true" :style="{top:top + 'px'}">
				<view :class="navIndex == k ? 'active nav-item':'nav-item'" v-for="(v,k) in nav" :key="k" @tap="changeNav(k,v.cbid)">{{v.name}}</view>
			</scroll-view>
			<view class="types">
				<view class="types-time" style="margin-right: 60rpx;" @tap="goTime">
					<view>按时间</view>
					<image src="../../static/images/sort.png"></image>
				</view>
				<view class="types-time" @tap="goPrice">
					<view>按价格</view>
					<image src="../../static/images/sort.png"></image>
				</view>
			</view>
		</view> -->
		<view class="look">
			<view class="search" @tap="goSearch">
				<image src="../../static/images/search.png"></image>
				<input type="text" v-model="val" placeholder="请输入要搜索的资质名称" disabled>
			</view>
			<view class="alls">
				<scroll-view class="navs" scroll-x="true">
					<view :class="navIndex == k ? 'active nav-item':'nav-item'" v-for="(v,k) in nav" :key="k" @tap="changeNav(k,v.cbid)">{{v.name}}</view>
				</scroll-view>
				<image class="nav-img" src="../../static/images/right.png"></image>
			</view>
			<view class="types">
				<view class="types-time" style="margin-right: 60rpx;" @tap="goTime">
					<view>按时间</view>
					<image src="../../static/images/sort.png"></image>
				</view>
				<view class="types-time" @tap="goPrice">
					<view>按价格</view>
					<image src="../../static/images/sort.png"></image>
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="lists">
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				@emptyclick="emptyClick" @topclick="topClick">
					<view class="item" @tap="goDetail(v.cid)" v-for="(v,k) in list" :key="k">
						<view class="item-img">
							<image :src="v.image"></image>
							<view class="state" v-if="v.iszhuan == 1">已转让</view>
						</view>
						<view class="item-right">
							<view class="item-tit" style="font-size: 34rpx;">{{v.name}}</view>
							<view class="box">
								<!-- <view>￥{{v.price}}</view> -->
								<view style="color: #FF411C;font-weight: 500;">有效期：{{v.termofvalidity}}</view>
								<image src="../../static/images/call.png" @tap="goCall(v.phone)"></image>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<view class="public">
			<view>没有找到合适的？点击</view>
			<view class="btn" @tap="goPublic">发布</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#333',
				top: 0,
				top1: 0,
				navIndex: 0,
				val: '',
				nav: [{
					cbid: '',
					name: '全部'
				}],
				list: [],
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
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
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
						tip: '还没有添加相关数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				navId: '',
				type: 0
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
		onShow() {
			this.top = Vue.prototype.CustomBar + 70
			this.top1 = Vue.prototype.CustomBar
			this.$nextTick(() => {
				this.inits()
			})
		},
		methods: {
			inits() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: 'getclassibuyList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								for(let i=0;i<res.data.dataList.length;i++) {
									self.nav.push(res.data.dataList[i])
								}
								self.list = []
								self.mescroll.resetUpScroll()
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goSearch() {
				uni.navigateTo({
				    url: '/pages/search/search'
				})
			},
			changeNav(k,id) {
				if(this.navIndex == k) {
					return
				}
				this.navIndex = k
				this.navId = id
				this.list = []
				this.mescroll.resetUpScroll()
			},
			goTime() {
				if(this.type == 0) {
					this.type = 1
				} else {
					this.type = 0
				}
				this.list = []
				this.mescroll.resetUpScroll()
			},
			goPrice() {
				if(this.type == 2) {
					this.type = 3
				} else {
					this.type = 2
				}
				this.list = []
				this.mescroll.resetUpScroll()
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/buyDetail/buyDetail?id=' + id + '&type=0'
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
					cbid: self.navId,
					content: self.val,
					sort: self.type,
					pageCount: mescroll.size,
					nowPage: mescroll.num
				}
				let data = {
					url: 'certificateslist',
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
			goCall(n) {
				uni.makePhoneCall({
				    phoneNumber: n
				})
			},
			goPublic() {
				uni.navigateTo({
				    url: '/pages/public/public'
				})
			},
			Back() {
				uni.switchTab({
				    url: '/pages/index/index'
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

		.public {
			width: 100%;
			height: 90rpx;
			background: #F6F6F6;
			padding: 0 28rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #666;
			display: flex;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;

			.btn {
				width: 120rpx;
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 4px;
				background: #FFBFC3;
				font-size: 30rpx;
				color: #FF0000;
				margin-left: 30rpx;
				text-align: center;
			}
		}

		.look {
			width: 100%;
			background: #FFFFFF;
			z-index: 99;
			padding: 0 28rpx;
			box-sizing: border-box;
			position: relative;
			
			.search {
				width: 100%;
				padding: 18rpx 24rpx;
				box-sizing: border-box;
				border-radius: 24px;
				background: #F6F6F6;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 28rpx 0 0;

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
			}

			.alls {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				
				.navs {
					width: 93%;
					height: 70rpx;
					line-height: 70rpx;
					white-space: nowrap;
					background: #fff;
					z-index: 999;
					vertical-align: middle;
					margin: 36rpx 0;
					
					.nav-item {
						display: inline-block;
						height: 14px;
						line-height: 14px;
						padding: 0 28rpx 0 0;
						margin-right: 28rpx;
						font-size:34rpx;
						color: #999;
						border-right: 2px solid #999;
				
						&.active {
							color: #333 !important;
						}
					}
				
					.nav-item:last-child {
						border-right: none;
					}
				}
				
				.nav-img {
					position: absolute;
					top: 52rpx;
					right: 0;
					width: 36rpx;
					height: 36rpx;
					z-index: 999;
				}
			}

			.types {
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 32rpx;

				.types-time {
					padding: 16rpx 40rpx;
					background: #F6F6F6;
					border-radius: 4px;
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-left: 30rpx;
					}
				}
			}
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28rpx 90rpx;
			box-sizing: border-box;
			align-items: center;

			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;

				.item {
					display: flex;
					padding: 40rpx 0;
					border-bottom: 1px solid #eee;

					.item-img {
						width: 220rpx;
						height: 140rpx;
						position: relative;
						border-radius: 6px;
						overflow: hidden;
						
						image {
							width: 220rpx;
							height: 140rpx;
						}
						
						.state {
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							z-index: 999;
							background: rgba(0,0,0,.4);
							font-size: 26rpx;
							color: #0081FF;
						}
					}

					.item-right {
						width: 72%;
						height: 140rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 30rpx;
						color: #333;
						font-weight: 600;
						padding-left: 24rpx;
						box-sizing: border-box;

						.box {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							// font-size: 30rpx;
							color: #FF0000;

							.item-tit {
								width: 100%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size:40rpx !important;
							}

							image {
								width: 38rpx;
								height: 38rpx;
							}
						}
					}

					.item-rights {
						width: 72%;
						height: 140rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 30rpx;
						color: #999;
						padding-left: 24rpx;
						box-sizing: border-box;
					}
				}

				.item:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
