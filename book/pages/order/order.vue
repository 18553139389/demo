<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :isBacks="true" :Color="Color" :isIcon="false" :isIcons="true" bgColor="bg-shadeTop text-white" @Back="Back" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">我的订单</block>
				<block slot="right">
					<view class="complain">
						<view>投诉订单</view>
						<view class="icon" v-if="icon && user.appeal != 0">{{user.appeal}}</view>
					</view>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<scroll-view scroll-x="true" class="scroll-X" style="width: 100%;">
				<view class="tabs">
					<view v-for="(v,k) in tab" :key="k" :class="itemIndex == k ? 'active' : ''" @tap="changeTab(k)">
						{{v}}
						<view class="icon" v-if="k == 1 && icon && user.payment != 0">{{user.payment}}</view>
						<view class="icon" v-if="k == 2 && icon && user.receivables != 0">{{user.receivables}}</view>
						<view class="icon" v-if="k == 3 && icon && user.grounding != 0">{{user.grounding}}</view>
						<view class="icon" v-if="k == 4 && icon && user.alreadsell != 0">{{user.alreadsell}}</view>
						<view class="icon" v-if="k == 5 && icon && user.alreadsend != 0">{{user.alreadsend}}</view>
					</view>
				</view>
			</scroll-view>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			@emptyclick="emptyClick" @topclick="topClick">
				<view class="lists" @tap.stop="">
					<view class="item" v-for="(v,k) in lists" :key="k" @tap="goDetail(v.ordernum)">
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
							<view style="color: #FF6600;" v-if="uid == v.uid && v.state == 4">已完成</view>
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
						<view class="time" v-if="v.state == 0">
							<view>付款倒计时，过期订单自动取消：</view>
							<uni-countdown :show-day="false" :minute="v.minute" :second="v.seconds" :show-colon="false" color="#FF6600"
							 @timeup="timeup" />
						</view>
						<view class="time" v-if="uid == v.taid && v.state1 == 1">
							<view>收款倒计时，过期订单自动取消：</view>
							<uni-countdown :show-day="false" :minute="v.minute1" :second="v.seconds1" :show-colon="false" color="#FF6600"
							@timeup="timeup" />
						</view>
						<view class="btns" @tap.stop="">
							<view class="pay1" @tap="goPay1(v.ordernum)" v-if="v.taid != 1 && v.state == 0">我已付款</view>
							<view class="pay2" @tap="goPay2(v.ordernum,v.taid,v.goodsprice)" v-if="uid == v.uid && v.state == 0">去付款</view>
							<view class="pay1" @tap="goPay3(v.ordernum)" v-if="uid == v.taid && v.state1 == 1">没有收到款项，我要投诉</view>
							<view class="pay2" @tap="goPay4(v.ordernum)" v-if="uid == v.taid && v.state1 == 1">确定收到款项</view>
							<view class="pay2" @tap="goPay5(v.goodsprice,v.ordernum)" v-if="uid == v.uid && v.state == 2 && showTime">委托代卖</view>
							<view class="pay1" @tap="goPay9(v)" v-if="uid == v.taid && v.state1 == 3">查看物流</view>
							<view class="pay2" @tap="goPay6(v.ordernum)" v-if="uid == v.taid && v.state1 == 3">确认收货</view>
							<view class="pay3" @tap="goPay7(v.ordernum)" v-if="(uid == v.taid && v.state1 == 7) || (uid == v.uid && v.state == 7)">删除订单</view>
							<view class="pay3" @tap="goPay8(v.ordernum)" v-if="(uid == v.uid && v.state == 4) || (uid == v.taid && v.state1 == 4)">删除订单</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view class="mask" v-if="show">
			<view class="dialog">
				<view class="close" @tap="close">x</view>
				<view class="titles">委托代卖</view>
				<view class="titles" style="color: #666;font-size: 14px;">原价：￥{{oldPrice}}</view>
				<view class="titles" style="color: #666;font-size: 14px;">加价幅度</view>
				<view class="count">
					<view class="code" style="border-bottom-right-radius: 0;border-top-right-radius: 0;margin-right: 12upx;" @tap="reduce">-</view>
					<input type="number" v-model="val1">
					<view>%</view>
					<view class="code" style="border-bottom-left-radius: 0;border-top-left-radius: 0;margin-left: 12upx;" @tap="add">+</view>
				</view>
				<view class="pay" @tap="goPay">立即支付{{totals}}元</view>
			</view>
		</view>
		<view class="mask" v-if="show1">
			<view class="dialog">
				<view class="closes" @tap="close1">x</view>
				<img src="../../static/images/codes.png" alt="">
				<view style="text-align: center;margin: 30upx 0;">企业商户号临时维护中，请手动保存二维码打开支付宝进行支付，给您带来不便，敬请谅解！</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax,ajax1} from '../../request/request.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import uniCountdown from '../../components/uni-countdown/uni-countdown.vue'
	export default {
		data() {
			return {
				Color: '#333',
				itemIndex: 0,
				tab: ['全部', '待付款', '待收款', '待上架', '已售出', '已发货'],
				val: 0,
				val1: 6,
				show: false,
				show1: false,
				list: {},
				type: 0,
				lists: [],
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
				state: '',
				look: false,
				uid: '',
				testMinute: 0,
				testSecond: 0,
				showTime: false,
				user: {},
				icon: false,
				orderNum: ''
			}
		},
		components: {
			uniCountdown,
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
		onLoad(option) {
			this.type = option.type
			if (this.type == 1) {
				this.itemIndex = 1
				this.state = 0
			} else if (this.type == 2) {
				this.itemIndex = 2
				this.state = 1
			} else if (this.type == 3) {
				this.itemIndex = 3
				this.state = 2
			}
		},
		onShow() {
			this.uid = uni.getStorageSync('uid')
			//判断委托代卖按钮
			// let current = new Date().getTime()
			// let time1 = new Date(this.getDateStr(0) + ' 09:00:00').getTime() || Date.parse(new Date(this.getDateStr(0) + ' 09:00:00'))
			// let time2 = new Date(this.getDateStr(1) + ' 09:00:00').getTime() || Date.parse(new Date(this.getDateStr(1) + ' 09:00:00'))
			// if (current > time1 && current < time2) {
			// 	this.showTime = true
			// }
			// 判断委托代卖按钮
			// let self = this
			// if(this.mescroll) {
			// 	self.init(this.mescroll, this.state)
			// }
		},
		computed: {
			totals() {
				let total = 0
				total = parseFloat(this.oldPrice) * 0.04
				total = total.toFixed(2)
				return total
			}
		},
		methods: {
			getDateStr(dayCount) {
				let u = navigator.userAgent
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端 
				if (null == dayCount) {
					dayCount = 0
				}
				let date = new Date()
				date.setDate(date.getDate() + dayCount) //设置日期
				let year = date.getFullYear()
				let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
				let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
				if(isiOS) {
					return year + '/' + month + '/' + day
				} else {
					return year + '-' + month + '-' + day
				}
			},
			changeTab(k) {
				if (this.look) {
					return
				}
				this.itemIndex = k
				if (this.itemIndex == 0) {
					this.state = ''
				} else if (this.itemIndex == 1) {
					this.state = 0
				} else if (this.itemIndex == 2) {
					this.state = 1
				} else if (this.itemIndex == 3) {
					this.state = 2
				} else if (this.itemIndex == 4) {
					this.state = 3
				} else if (this.itemIndex == 5) {
					this.state = 4
				}
				this.look = true
				this.lists = []
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
				this.lists = []
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
			timeup() {
				// this.lists = []
				// this.mescroll.resetUpScroll()
			},
			init(mescroll, type) {
				//获取搜索数据
				let self = this
				//重新获取角标状态数量
				let data2 = {
					cmd: 'userInfo',
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.user = res.data.dataobject
								self.icon = true
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
				//获取订单列表数据
				let data1 = {
					cmd: 'myorderlist',
					uid: uni.getStorageSync('uid'),
					type: type,
					nowPage: mescroll.num,
					pageCount: mescroll.size
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (res.data.dataList) {
									for (var j = 0; j < res.data.dataList.length; j++) {
										self.lists.push(res.data.dataList[j])
									}
									let u = navigator.userAgent
									let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端 
									console.log(Date.parse(new Date()))
									if(isiOS) {
										self.lists.forEach((item) => {
											item.adtime = item.adtime.split('-').join('/')
											item.zftime = item.zftime.split('-').join('/')
										})
									}
									self.lists.forEach((item) => {
										if (item.state == 0) {
											let times = new Date(item.adtime).getTime() + 24 * 60 * 60 * 1000 || Date.parse(new Date(item.adtime)) + 24 * 60 * 60 * 1000 //24小时 * 60分钟 * 60秒 * 1000
											let current = new Date().getTime() || Date.parse(new Date())
											let count = times - current
											let testMinute = parseInt((count % (1000 * 60 * 60)) / (1000 * 60))
											let testSeconds = (count % (1000 * 60)) / 1000
											item.minute = testMinute
											item.seconds = testSeconds
										}

										if (item.state1 == 1) {
											let times1 = new Date(item.zftime).getTime() + 24 * 60 * 60 * 1000 || Date.parse(new Date(item.zftime)) + 24 * 60 * 60 * 1000 //24小时 * 60分钟 * 60秒 * 1000
											let current1 = new Date().getTime() || Date.parse(new Date())
											let count1 = times1 - current1
											let testMinute1 = parseInt((count1 % (1000 * 60 * 60)) / (1000 * 60))
											let testSeconds1 = (count1 % (1000 * 60)) / 1000
											item.minute1 = testMinute1
											item.seconds1 = testSeconds1
										}
									})
									console.log(self.lists)
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
				
				let data3 = {
					cmd: 'getbutton'
				}
				Toast.showLoading('', function() {
					let data = {
						data: data3,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(res.data.datastr == 0) {
									self.showTime = true
								} else {
									self.showTime = false
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goPay() {
				let self = this
				let data1 = {
					cmd: 'ordersubstitutesale',
					uid: uni.getStorageSync('uid'),
					ordernum: this.orderNum,
					jiajia: this.val1
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								if(!res.data.ordernum) {
									Toast.showToast('订单异常,刷新重试')
									return
								}
								let order = res.data.ordernum
								uni.navigateTo({
									url: '/pages/pay/pay?ordernum=' + order + '&price=' + self.val
								})
								
								// let url = ''
								// url = 'https://www.ytsh.vip/easyamoy/api/alipay?ordernum=' + order + '&amount=' + self.val + '&subject=商品委托代卖'
								// if(url) {
								// 	const form = document.createElement('form');
								// 	form.action = url //此处form就是后台返回接收到的数据
								// 	form.method = 'post' //此处form就是后台返回接收到的数据
								// 	document.body.appendChild(form)
								// 	document.forms[0].submit()
								// }
								self.show = false
								// self.show1 = true
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goPay1(order) {
				let self = this
				uni.showModal({
					title: '提示',
					content: '您已经付过款了吗？',
					confirmColor: '#FF6600',
					success: function(res) {
						if (res.confirm) {
							let data1 = {
								cmd: 'orderpaymoney',
								uid: uni.getStorageSync('uid'),
								ordernum: order
							}
							Toast.showLoading('', function() {
								let data = {
									data: data1,
									success: function(res) {
										console.log(res)
										if (res.data.result == 0) {
											Toast.hideLoading()
											self.lists = []
											self.mescroll.resetUpScroll()
										} else {
											Toast.hideLoading()
											Toast.showToast(res.data.resultNote)
										}
									}
								}
								ajax(data)
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			goPay2(order, userid, price) {
				let self = this
				if (userid == 1) {
					if(!order) {
						Toast.showToast('订单异常,刷新重试')
						return
					}
					uni.navigateTo({
						url: '/pages/pay/pay?ordernum=' + order + '&price=' + price
					})
					
					// let url = ''
					// url = 'https://www.ytsh.vip/easyamoy/api/alipay?ordernum=' + orders + '&amount=' + price + '&subject=商品委托代卖'
					// //  这句很重要
					// if(url) {
					// 	const form = document.createElement('form');
					// 	form.action = url //此处form就是后台返回接收到的数据
					// 	form.method = 'post' //此处form就是后台返回接收到的数据
					// 	document.body.appendChild(form)
					// 	document.forms[0].submit()
					// }
				} else {
					let list = {
						price,
						order
					}
					uni.navigateTo({
					    url: '/pages/shop/shop?list=' + JSON.stringify(list)
					})
				}
			},
			goPay3(order) {
				uni.navigateTo({
					url: '/pages/suggest/suggest?order=' + order
				})
			},
			goPay4(order) {
				let self = this
				uni.showModal({
					title: '提示',
					content: '您是否已经收到货款？',
					confirmColor: '#FF6600',
					success: function(res) {
						if (res.confirm) {
							let data1 = {
								cmd: 'orderputmoney',
								uid: uni.getStorageSync('uid'),
								ordernum: order
							}
							Toast.showLoading('', function() {
								let data = {
									data: data1,
									success: function(res) {
										console.log(res)
										if (res.data.result == 0) {
											Toast.hideLoading()
											self.lists = []
											self.mescroll.resetUpScroll()
										} else {
											Toast.hideLoading()
											Toast.showToast(res.data.resultNote)
										}
									}
								}
								ajax(data)
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			goPay5(price, order) {
				this.show = true
				this.oldPrice = price
				this.orderNum = order
				this.val = parseFloat(price) * 0.04
				this.val = this.val.toFixed(2)
			},
			goPay6(order) {
				let self = this
				let data1 = {
					cmd: 'orderconfirm',
					uid: uni.getStorageSync('uid'),
					ordernum: order
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.lists = []
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
			goPay7(order) {
				let self = this
				let data1 = {
					cmd: 'truedeleteorder',
					uid: uni.getStorageSync('uid'),
					ordernum: order
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('删除成功')
								self.lists = []
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
			goPay8(order) {
				let self = this
				let data1 = {
					cmd: 'deleteorder',
					uid: uni.getStorageSync('uid'),
					ordernum: order
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('删除成功')
								self.lists = []
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
			goPay9(item) {
				uni.navigateTo({
					url: '/pages/logistics/logistics?expressCode=' + item.expressCode + '&expressNo=' + item.expressNo
				})
			},
			close() {
				this.show = false
				this.val1 = 6
			},
			reduce() {
				if (this.val1 <= -6) {
					return
				}
				this.val1--
			},
			add() {
				if (this.val1 >= 6) {
					return
				}
				this.val1++
			},
			goRight() {
				uni.navigateTo({
					url: '/pages/exampleOrder/exampeOrder'
				})
			},
			goDetail(order) {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?order=' + order
				})
			},
			Back() {
				uni.switchTab({
				    url: '/pages/person/person'
				})
			},
			close1() {
				let self = this
				this.show1 = false
				Toast.showToast('委托成功')
				setTimeout(() => {
					self.lists = []
					self.mescroll.resetUpScroll()
				},500)
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

			.complain {
				width: 160upx;
				height: 50upx;
				line-height: 50upx;
				text-align: right;
				font-size: 15px;
				color: #666;
				position: relative;

				.icon {
					width: 32upx;
					height: 32upx;
					border-radius: 50%;
					background: red;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 18upx;
					color: #FFFFFF;
					position: absolute;
					top: -12upx;
					right: -20upx;
				}
			}
		}

		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			margin: 30upx 0;

			.tabs {
				width: 480px;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333;
				border: 1px solid #eee;
				border-radius: 4px;
				margin-bottom: 40upx;

				view {
					width: 80px;
					text-align: center;
					padding: 12upx 0;
					border-right: 1px solid #eee;
					box-sizing: border-box;
					position: relative;

					&.active {
						background: #FF6600;
						border-right: none;
						color: #FFFFFF;
					}

					.icon {
						width: 32upx;
						height: 32upx;
						border-radius: 50%;
						background: red;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 18upx;
						color: #FFFFFF;
						position: absolute;
						top: 8upx;
						right: 12upx;
						z-index: 99;
					}
				}

				view:last-child {
					border-right: none;
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
						display: flex;
						align-items: center;
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
						
						.pay3 {
							padding: 8upx 40upx;
							border-radius: 4px;
							border: 1px solid #eee;
							font-size: 14px;
							color: #333;
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

		.mask {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .6);
			z-index: 999;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 99999;

			.dialog {
				width: 92%;
				padding: 30upx;
				border-radius: 4px;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;

				.close {
					width: 100%;
					text-align: right;
					font-size: 18px;
					color: #999;
				}
				
				.closes {
					width: 100%;
					text-align: right;
					font-size: 24px;
					color: #999;
				}

				.titles {
					width: 100%;
					font-size: 15px;
					color: #333;
					text-align: center;
					margin-bottom: 20upx;
				}

				.count {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 36upx;
					color: #666;
					margin: 24upx 0;

					.code {
						width: 90upx;
						height: 46upx;
						border: 1px solid #eee;
						border-radius: 4px;
						text-align: center;
						font-size: 44upx;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					input {
						width: 90upx;
						height: 40upx;
						border: 1px solid #eee;
						border-radius: 4px;
						text-align: center;
						font-size: 36upx;
					}
				}

				.pay {
					padding: 10upx 30upx;
					border-radius: 4px;
					background: #FF6600;
					font-size: 14px;
					color: #FFFFFF;
					margin: 24upx 0;
				}
			}
		}
	}
</style>
