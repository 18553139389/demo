<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">投诉订单</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="tab">
				<view class="tab-item" v-for="(v,k) in tab" :key="k" :class="itemIndex == k ? 'active' : ''" @tap="changeTab(k)">{{v}}</view>
			</view>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick">
				<view class="lists">
					<view class="item" v-for="(v,k) in list" :key="k">
						<view class="state">
							<view>订单编号：{{v.ordernum}}</view>
							<view style="color: #FF6600;" v-if="uid == v.uid && v.state == 0">待付款</view>
							<view style="color: #FF6600;" v-if="uid == v.uid && v.state == 1">待卖家收款</view>
							<view style="color: #FF6600;" v-if="uid == v.taid && v.state1 == 1">待收款</view>
							<view style="color: #FF6600;" v-if="uid == v.uid && v.state == 2">待上架</view>
							<view style="color: #FF6600;" v-if="uid == v.taid && v.state1 == 2">待发货</view>
							<view style="color: #FF6600;" v-if="uid == v.uid && v.state == 3">已委托</view>
							<view style="color: #FF6600;" v-if="uid == v.taid && v.state1 == 3">已发货</view>
							<view style="color: #FF6600;" v-if="uid == v.taid && v.state1 == 4">已完成</view>
							<view style="color: #FF6600;" v-if="uid == v.uid && v.state == 6">已申诉</view>
							<view style="color: #FF6600;" v-if="uid == v.taid && v.state1 == 6">已申诉</view>
							<view style="color: #FF6600;" v-if="uid == v.uid && v.state == 7">已取消</view>
							<view style="color: #FF6600;" v-if="uid == v.taid && v.state1 == 7">已取消</view>
						</view>
						<view class="product">
							<img :src="v.goodsimage" alt="">
							<view class="product-item">
								<view class="product-title">{{v.goodsname}}</view>
								<view class="price">
									<view style="font-size: 32upx;color: #FF6600;">￥{{v.goodsprice}}</view>
									<view style="font-size: 32upx;color: #999;">x1</view>
								</view>
							</view>
						</view>
						<view class="total" style="padding-bottom: 30upx;border-bottom: 1px solid #eee;">
							<view style="margin-right: 40upx;">共1个商品</view>
							<view>实付：<span style="color: #FF6600;">￥{{v.goodsprice}}</span></view>
						</view>
						<view class="btns" @tap.stop="">
							<view class="pay1" @tap="goCall(v.pingtaiphone)">联系平台撤销投诉</view>
							<view class="pay2" v-if="uid == v.taid && v.state1 == 6" @tap="goCall(v.userphone)">联系客户</view>
							<view class="pay2" v-if="uid == v.uid && v.state1 == 6" @tap="goCall(v.taphone)">联系卖家</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
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
				itemIndex: 0,
				tab: ['投诉订单', '被投诉订单'],
				uid: '',
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
					textNoMore: '-- 已经到底了 --', // 已经到底了的提示文本
					toTop: {
						// 回到顶部按钮,需配置src才显示
						src: "http://www.mescroll.com/img/mescroll-totop.png", // 图片路径
						offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
						duration: 300 // 回到顶部的动画时长,默认300ms
					},
					empty: {
						use: true, // 是否显示空布局
						icon: "http://www.mescroll.com/img/mescroll-empty.png", // 图标路径
						tip: '没有符合条件的订单', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				state: 5,
				look: false
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
			this.uid = uni.getStorageSync('uid')
		},
		methods: {
			changeTab(k) {
				if (this.look) {
					return
				}
				this.itemIndex = k
				if (this.itemIndex == 0) {
					this.state = 5
				} else if (this.itemIndex == 1) {
					this.state = 6
				} 
				this.look = true
				this.list = []
				this.mescroll.resetUpScroll()
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
				self.init(mescroll, this.state)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(mescroll, type) {
				//获取搜索数据
				let self = this
				//获取订单列表数据
				let data1 = {
					cmd: 'myorderlist',
					uid: self.uid,
					type,
					nowPage: mescroll.num,
					pageCount: mescroll.size
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (res.data.dataList) {
									for (var j = 0; j < res.data.dataList.length; j++) {
										self.list.push(res.data.dataList[j])
									}
									self.look = false
								}
							} else {
								Toast.hideLoading()
								self.look = false
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
							self.look = false
						}
					}
					ajax(data)
				})
			},
			goCall(val) {
				uni.makePhoneCall({
				    phoneNumber: val 
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
			padding: 0 28upx;
			box-sizing: border-box;

			.tab {
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-self: center;
				font-size: 14px;
				color: #333;
				margin-bottom: 30upx;

				.tab-item {
					padding: 10upx 40upx;
					border-radius: 4px;
					border: 1px solid #eee;

					&.active {
						background: #FF6600;
						border: none;
						color: #FFFFFF;
					}
				}
			}

			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;

				.item {
					width: 100%;
					display: flex;
					flex-direction: column;
					margin-bottom: 60upx;

					.state {
						width: 100%;
						height: 80upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 14px;
						color: #999;
						border-bottom: 1px solid #eee;
					}

					.product {
						width: 100%;
						display: flex;
						justify-content: space-between;
						margin: 30upx 0;

						img {
							width: 120upx;
							height: 120upx;
							border-radius: 4px;
						}

						.product-item {
							width: 80%;
							height: 120upx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							font-size: 14px;
							color: #333;

							.product-title {
								width: 100%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.price {
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;
							}
						}
					}

					.total {
						width: 100%;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						font-size: 28upx;
						color: #999;
					}

					.time {
						width: 100%;
						height: 90upx;
						line-height: 90upx;
						font-size: 12px;
						color: #999;
						border-bottom: 1px solid #eee;
					}

					.btns {
						width: 100%;
						display: flex;
						justify-content: flex-end;
						margin: 36upx 0;

						.pay2 {
							padding: 8upx 40upx;
							border-radius: 4px;
							background: #FF6600;
							font-size: 14px;
							color: #FFFFFF;
						}

						.pay1 {
							padding: 8upx 40upx;
							border-radius: 4px;
							background: #FFFFFF;
							font-size: 14px;
							color: #FF6600;
							border: 1px solid #eee;
							margin-right: 30upx;
						}
					}
				}
			}
		}
	}
</style>
