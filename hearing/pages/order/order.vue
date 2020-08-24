<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white"
			 @Back="Back">
				<block slot="backText"></block>
				<block slot="content">我的预约</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="nav" :style="{top: top + 'px'}">
				<view v-for="(v,k) in order" :key="k" :class="itemIndex == k ? 'nav-item active' : 'nav-item'" @tap="changeNav(k)">{{v}}</view>
			</view>
			<view class="top">
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				 @emptyclick="emptyClick" @topclick="topClick">
					<view class="list" v-for="(v,k) in list" :key="k">
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 2 && v.order_status == 1">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">待支付</view>
									<image src="../../static/images/pay.png" style="width: 30rpx;height: 27rpx;"></image>
								</view>
							</view>
							<view class="product">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">￥<text style="font-size: 40rpx;">{{v.orderMoney}}</text></view>
									<view>有效期：{{v.start_date}} - {{v.end_date}}</view>
								</view>
							</view>
							<view class="btns" @tap="">
								<view class="btn1" @tap.stop="goCancel(v.orderId)">取消订单</view>
								<view class="btn2" @tap.stop="goPay(v.orderId)">去支付</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 1 && v.merchant_status == 1">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">已预约</view>
									<image src="../../static/images/yue.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">{{v.name}}</view>
									<view>{{v.content}}</view>
								</view>
							</view>
							<view class="btns" @tap="">
								<view class="btn3" @tap.stop="goCancel(v.orderId)">取消预约</view>
								<view class="btn2" @tap.stop="goFinish(v.orderId)">预约完成</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 2 && v.order_status == 2">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">待使用</view>
									<image src="../../static/images/yue.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">￥<text style="font-size: 40rpx;">{{v.orderMoney}}</text></view>
									<view>有效期：{{v.start_date}} - {{v.end_date}}</view>
								</view>
							</view>
							<view class="btns" @tap="">
								<view class="btn3" @tap.stop="goBack(v.orderId)" style="margin-right: 30rpx;">申请退款</view>
								<view class="btn2" @tap.stop="showFun(v.orderId)">去核销</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 2 && v.order_status == 3">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">已使用</view>
									<image src="../../static/images/yishiyong.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product" style="border: none;">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">￥<text style="font-size: 40rpx;">{{v.orderMoney}}</text></view>
									<view>有效期：{{v.start_date}} - {{v.end_date}}</view>
								</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 1 && v.merchant_status == 2">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">已完成</view>
									<image src="../../static/images/yishiyong.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product" style="border: none;">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">{{v.name}}</view>
									<view>{{v.content}}</view>
								</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 1 && v.merchant_status == 3">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">已取消</view>
									<image src="../../static/images/cancel.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product" style="border: none;">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">{{v.name}}</view>
									<view>{{v.content}}</view>
								</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 2 && v.order_status == 6">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">已取消</view>
									<image src="../../static/images/cancel.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product" style="border: none;">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">￥<text style="font-size: 40rpx;">{{v.orderMoney}}</text></view>
									<view>有效期：{{v.start_date}} - {{v.end_date}}</view>
								</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 2 && v.order_status == 5">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">已退款</view>
									<image src="../../static/images/back.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product" style="border: none;">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">￥<text style="font-size: 40rpx;">{{v.orderMoney}}</text></view>
									<view>有效期：{{v.start_date}} - {{v.end_date}}</view>
								</view>
							</view>
						</view>
						<view class="list-item" @tap="goDetail(v.orderId)" v-if="v.type == 2 && v.order_status == 4">
							<view class="list-top">
								<view>订单编号：{{v.orderId}}</view>
								<view class="state">
									<view class="status">退款中</view>
									<image src="../../static/images/back.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
							<view class="product" style="border: none;">
								<image src="../../static/images/pic.png"></image>
								<view class="content">
									<view class="price">￥<text style="font-size: 40rpx;">{{v.orderMoney}}</text></view>
									<view>有效期：{{v.start_date}} - {{v.end_date}}</view>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<pay-keyboard :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword"></pay-keyboard>
	</view>
</template>

<script>
	import payKeyboard from '../../components/keyboard/keyboard.vue'
	import Vue from 'vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				itemIndex: 0,
				order: ['全部', '待付款', '已预约', '待使用', '已使用'],
				show_key: false,
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
				state: 0,
				top: 0,
				id: '',
				show_key: false
			}
		},
		components: {
			MescrollUni,
			payKeyboard
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
		onLoad(option) {
			if (option.type) {
				this.state = option.type
				this.itemIndex = option.type
			}
		},
		onShow() {
			if (this.mescroll) {
				this.list = []
				this.mescroll.resetUpScroll()
			}
			let self = this
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					self.top = Vue.prototype.CustomBar
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		methods: {
			showFun(id) {
				this.show_key = true
				this.id = id
			},
			hideFun() {
				this.show_key = false
			},
			getPassword(n) {
				let self = this
				this.show_key = false
				let data1 = {
					cmd: 'checkOrder',
					id: this.id,
					merchant_id: n.password,
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('核销成功')
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
			changeNav(k) {
				if (this.itemIndex == k) {
					return
				}
				this.itemIndex = k
				this.state = k
				this.list = []
				this.mescroll.resetUpScroll()
			},
			goCancel(id) {
				uni.navigateTo({
					url: '/pages/cancel/cancel?id=' + id
				})
			},
			goBack(id) {
				uni.navigateTo({
					url: '/pages/backMoney/backMoney?id=' + id
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?id=' + id
				})
			},
			goPay(id) {
				let self = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.code)
						uni.getUserInfo({
							success: function(res) {
								console.log(res)
								let data1 = {
									cmd: 'payOrder',
									uid: uni.getStorageSync('uid'),
									id: id,
									code: loginRes.code,
									userInfo: res.userInfo,
									type: 3
								}
								Toast.showLoading('', function() {
									let data = {
										data: data1,
										success: function(res) {
											console.log(res)
											if (res.data.result == 0) {
												Toast.hideLoading()
												uni.requestPayment({
													provider: 'wxpay',
													timeStamp: res.data.body.timeStamp,
													nonceStr: res.data.body.nonceStr,
													package: res.data.body.package,
													signType: res.data.body.signType,
													paySign: res.data.body.paySign,
													success: function(res) {
														console.log(res)
														self.list = []
														self.mescroll.resetUpScroll()
													},
													fail: function(err) {
														Toast.showToast(err)
													}
												})
											} else {
												Toast.hideLoading()
												Toast.showToast(res.data.resultNote)
											}
										}
									}
									ajax(data)
								})
							}
						})
					}
				})
			},
			goFinish(id) {
				let self = this
				let data1 = {
					cmd: 'completeOrder',
					id: id,
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('预约完成')
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
				console.log('点击了回到顶部按钮');
			},
			init(mescroll) {
				//获取搜索数据
				let self = this
				let data1 = {
					cmd: 'orderList',
					uid: uni.getStorageSync('uid'),
					nowPage: mescroll.num,
					state: this.state
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
								}
							} else {
								Toast.hideLoading()
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
				})
			},
			Back() {
				uni.switchTab({
					url: '/pages/my/my'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f6f6f6;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;

			.nav {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				height: 70rpx;
				background: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: fixed;
				top: 128rpx;
				left: 0;
				background: #fff;
				z-index: 999;

				.nav-item {
					height: 70rpx;
					line-height: 70rpx;
					font-size: 28rpx;
					color: #333;

					&.active {
						color: #08A8C0;
						border-bottom: 2px solid #08A8C0;
					}
				}
			}

			.top {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding-top: 70rpx;

				.list {
					width: 100%;
					padding: 28rpx 28rpx 0;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;

					.list-item {
						width: 100%;
						padding: 20rpx;
						box-sizing: border-box;
						border-radius: 4px;
						background: #fff;
						margin-top: 24rpx;

						.list-top {
							width: 100%;
							height: 70rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 28rpx;
							color: #333;
							border-bottom: 1px solid #eee;

							.state {
								height: 70rpx;
								display: flex;
								align-items: center;

								.status {
									height: 70rpx;
									line-height: 70rpx;
									padding-right: 24rpx;
									position: relative;
								}

								.status:after {
									content: '';
									width: 2px;
									height: 24rpx;
									background: #08A8C0;
									position: absolute;
									right: 0;
									top: 23rpx;
								}

								image {
									margin-left: 24rpx;
								}
							}
						}

						.product {
							width: 100%;
							padding: 30rpx 0;
							border-bottom: 1px solid #eee;
							display: flex;

							image {
								width: 110rpx;
								height: 110rpx;
								border-radius: 4px;
							}

							.content {
								width: 76%;
								height: 110rpx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								padding-left: 24rpx;
								box-sizing: border-box;

								.price {
									font-size: 28rpx;
									color: #333;
								}

								.content {
									width: 100%;
									font-size: 24rpx;
									color: #666;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
						}

						.btns {
							width: 100%;
							padding: 32rpx 0 0;
							display: flex;
							justify-content: flex-end;
							font-size: 28rpx;

							.btn1 {
								padding: 6rpx 20rpx;
								border: 1px solid #eee;
								border-radius: 30px;
								color: #333;
								margin-right: 30rpx;
							}

							.btn2 {
								padding: 6rpx 20rpx;
								border: 1px solid #08A8C0;
								border-radius: 30px;
								color: #08A8C0;
							}

							.btn3 {
								padding: 6rpx 20rpx;
								border: 1px solid #eee;
								border-radius: 30px;
								color: #333;
							}
						}
					}
				}
			}
		}
	}
</style>
