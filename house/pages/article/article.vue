<template>
	<view class="contain">
		<view class="top" @tap="goPerson">
			<image :src="userInfo.icon"></image>
			<view class="user">{{userInfo.nickname}}</view>
		</view>
		<view class="nav">
			<view class="nav-item">
				<view class="item-left common" @tap="goPoint">
					<view style="font-size: 40rpx;margin-bottom: 16rpx;">{{userInfo.allintegrals}}</view>
					<view>总积分</view>
				</view>
				<view class="item-left">
					<view style="font-size: 40rpx;margin-bottom: 16rpx;">{{userInfo.integrals}}</view>
					<view>可提现积分</view>
					<view class="money" @tap="goMoney">提现</view>
				</view>
			</view>
		</view>
		<view class="type">
			<view class="type-item">
				<view class="type-title">
					<view v-for="(v,k) in nav" :key="k" :class="itemIndex == k ? 'type-list active' : 'type-list'" @tap="changeItem(k)">{{v}}</view>
				</view>
				<view class="type-all" v-if="itemIndex == 0">
					<view class="warn">请勿在多平台阅读哦~</view>
					<view class="record">
						<view class="record-left">
							<view style="margin-bottom: 12rpx;"><text style="font-size: 40rpx;color: #fe5f23;margin-right: 8rpx;">{{readList.num1}}</text>篇</view>
							<view>今日已阅读</view>
						</view>
						<view class="record-left">
							<view style="margin-bottom: 12rpx;"><text style="font-size: 40rpx;color: #fe5f23;margin-right: 8rpx;">{{readList.num2}}</text>积分</view>
							<view style="font-size: 26rpx;color: #666;">今日已阅读</view>
						</view>
					</view>
					<view class="warn">点击开始阅读，进入后至少读6s，返回本页面</view>
					<view class="warns">请按正常速度阅读，减少阅读失败的概率</view>
					<view class="read" v-if="show">正在为您推荐下一篇文章...</view>
					<view class="btn" v-if="!show" @tap="startRead">开始阅读</view>
					<view class="btn" v-if="show">停止阅读</view>
				</view>
				<view class="type-all" v-if="itemIndex == 8">
					<view class="record">
						<view class="record-left">
							<view style="margin-bottom: 12rpx;"><text style="font-size: 40rpx;color: #fe5f23;margin-right: 8rpx;">{{prizeList.num1}}</text>次</view>
							<view style="font-size: 26rpx;color: #666;">今日已抽奖</view>
						</view>
						<view class="record-left">
							<view style="margin-bottom: 12rpx;"><text style="font-size: 40rpx;color: #fe5f23;margin-right: 8rpx;">{{prizeList.num2}}</text>积分</view>
							<view style="font-size: 26rpx;color: #666;">抽奖积分</view>
						</view>
					</view>
				</view>
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				 @emptyclick="emptyClick" @topclick="topClick" v-if="itemIndex == 2">
					<view class="products" @tap="goShop(v)" v-for="(v,k) in shopList" :key="k">
						<view class="imgs">
							<image :src="v.image"></image>
							<view class="mark" v-if="v.ishot == 1">热销</view>
						</view>
						<view class="shop-title">{{v.title}}</view>
						<view class="shop-time">{{v.descs}}</view>
					</view>
				</mescroll-uni>
				<view class="search" v-if="itemIndex == 1">
					<view class="search-box" @tap="goSearch">
						<image src="../../static/images/search.png" mode="widthFix"></image>
						<input type="text" v-model="value" placeholder="请输入关键字进行搜索">
					</view>
					<view class="all">
						<view class="book">全部书籍</view>
						<view class="more" @tap="goMore">
							<view>查看更多</view>
							<image src="../../static/images/choice.png" mode="widthFix"></image>
						</view>
					</view>
					<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
					 @emptyclick="emptyClick" @topclick="topClick">
						<view class="book-list">
							<view class="book-item" v-for="(v,k) in bookList" :key="k" :style="{marginRight:(k+1)%3==0?'0':'3.33%'}" @tap="goBook(v.nid,v.isrecord,v)">
								<image :src="v.image"></image>
								<view class="book-title">{{v.name}}</view>
							</view>
						</view>
					</mescroll-uni>
				</view>
			</view>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick" v-if="itemIndex == 8">
				<view class="product" v-for="(v,k) in list" :key="k" @tap="goDetail(v.lid,v.state)">
					<image :src="v.image"></image>
					<view class="product-title">{{v.name}}</view>
					<view class="product-time">活动截止时间：{{v.endtime}}</view>
					<view class="join" @tap.stop="goActive(v.lid,v.urls,v.integrals)" v-if="v.state == 0">参与抽奖</view>
					<view class="join" style="background: #ccc;" v-if="v.state == 1">已参与抽奖</view>
				</view>
			</mescroll-uni>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="show1" :content="content" title="温馨提示" confirm-color="#fe5f23"></u-modal>
	</view>
</template>

<script>
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				nav: ['文章', '小说', '购物'],
				userInfo: {},
				itemIndex: 0,
				show: false,
				readList: {},
				prizeList: {},
				raid: '',
				value: '',
				bookList: [],
				shopList: [],
				list: [],
				mescroll: null, //mescroll实例对象
				downOption: {
					use: false, // 是否启用下拉刷新; 默认true
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
						tip: '没有符合条件的数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				state: 0,
				content: '',
				show1: false,
				start: 0
			}
		},
		onLoad(option) {
			// 获取今日阅读信息
			// uni.clearStorage()
			// uni.setStorageSync('uid', '4c332ae298454b5aba20e045f3b17e68')
			if(uni.getStorageSync('uid')) {
				console.log(uni.getStorageSync('uid'))
			} else {
				if(option.uid) {
					uni.setStorageSync('uid', option.uid)
				} else {
					// this.$u.post('weixinlogin?type=1').then(res => {
					// 	console.log(res)
					// })
					window.location.href = 'http://integral.dazhoutian.net/integralwall/api/weixinlogin?type=1'
				}
			}
			// if(this.getRequest('nav') == 3) {
			// 	this.itemIndex = 2
			// 	this.$store.commit('getStateItem',2)
			// } else if(this.getRequest('nav') == 4) {
			// 	this.itemIndex = 3
			// 	this.$store.commit('getStateItem',3)
			// } else {
			// 	this.itemIndex = 0
			// 	this.$store.commit('getStateItem',0)
			// }
			
			if(this.getRequest('nav') == 3) {
				this.itemIndex = 1
				this.$store.commit('getStateItem',1)
			} else if(this.getRequest('nav') == 4) {
				this.itemIndex = 2
				this.$store.commit('getStateItem',2)
			} else {
				this.itemIndex = 0
				this.$store.commit('getStateItem',0)
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
			document.title = '积分活动'
			let ua = navigator.userAgent.toLowerCase()
			let isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ios') > -1
			if(isiOS && this.getRequest('nav') == 2) {
				window.addEventListener('pageshow', function(event) {
					if (event.persisted || window.performance && window.performance.navigation.type == 2) {
						window.location.reload()
					}
				}, false)
			}
			// 获取个人信息
			this.$u.post('userinfo', {
				uid: uni.getStorageSync('uid')
			}).then(res => {
				console.log(res)
				if (res.result == 0) {
					this.userInfo = res.dataobject
				}
			})

			// 获取今日阅读信息
			this.$u.post('getdayreadarticle', {
				uid: uni.getStorageSync('uid')
			}).then(res => {
				console.log(res)
				this.readList = res.dataobject
				this.raid = res.dataobject.raid
				this.state = res.dataobject.readstate
				this.content = '您的文章阅读数量已达到上限，请休息至' + res.dataobject.readtime + '后再来阅读'
			})

			// 获取今日抽奖信息
			this.$u.post('getdayluckdraw', {
				uid: uni.getStorageSync('uid')
			}).then(res => {
				console.log(res)
				this.prizeList = res.dataobject
			}).catch(err => {
				this.$refs.uToast.show({
					title: err.resultNote,
					type: 'none'
				})
			})
			
			this.itemIndex = this.$store.state.stateItem
			if (this.mescroll) {
				this.list = []
				this.bookList = []
				this.shopList = []
				this.init(this.mescroll)
				this.init1(this.mescroll)
				this.init2(this.mescroll)
			}
		},
		methods: {
			goPoint() {
				uni.navigateTo({
				    url: '/pages/point/point?score=' + this.userInfo.integrals
				})
			},
			goPerson() {
				uni.reLaunch({
					url: '/pages/person/person'
				})
			},
			getRequest(paras) {
				var url = location.href
				var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&")
				var paraObj = {}
				var j = null
				for (var i = 0; j = paraString[i]; i++) {
					paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
				}
				var returnValue = paraObj[paras.toLowerCase()]
				if (typeof(returnValue) == "undefined") {
					return ""
				} else {
					return returnValue
				}
			},
			changeItem(k) {
				this.itemIndex = k
				this.$store.commit('getStateItem',k)
				// if(k == 1) {
				// 	this.list = []
				// } else if(k == 2) {
				// 	this.bookList = []
				// }
				
				if(k == 1) {
					this.bookList = []
				} else if(k == 2) {
					this.shopList = []
				}
			},
			startRead() {
				if (this.state == 0) {
					this.show = true
					this.$u.post('getreadarticledetail', {
						raid: this.raid
					}).then(res => {
						console.log(res)
						if (res.dataobject.url2) {
							// let ua = navigator.userAgent.toLowerCase()
							// var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1
							// if(isAndroid) {
							// 	window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=2")
							// }
							setTimeout(() => {
								this.show = false
								uni.navigateTo({
									url: '/pages/activeDetail/activeDetail?raid=' + this.raid
								})
							}, 3000)
						} else {
							setTimeout(() => {
								this.show = false
								this.$u.post('addreadarticlerecord', {
									uid: uni.getStorageSync('uid'),
									raid: this.raid
								}).then(response => {
									let content = res.dataobject.url1
									window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=2")
									window.location.href = content
									// uni.navigateTo({
									// 	url: '/pages/articleDetail/articleDetail?url=' + encodeURIComponent(res.dataobject.url1) + '&type=2'
									// })
								})
							}, 3000)
						}
					})
				} else {
					this.show1 = true
				}
			},
			goActive(id, url, point) {
				if (url) {
					uni.navigateTo({
						url: '/pages/prizeDetail/prizeDetail?id=' + id
					})
				} else {
					this.$u.post('addluckdrawrecord', {
						uid: uni.getStorageSync('uid'),
						lid: id
					}).then(res => {
						console.log(res)
						this.$refs.uToast.show({
							title: '恭喜您获得' + point + '积分',
							type: 'none'
						})
						this.init(this.mescroll)
					})
				}
			},
			goShop(item) {
				let items = JSON.stringify(item)
				this.$store.commit('getList', items)
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + item.goodsid
				})
			},
			goMore() {
				uni.navigateTo({
					url: '/pages/moreBook/moreBook'
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
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
				// if (this.itemIndex == 1) {
				// 	self.init(mescroll)
				// } else if (this.itemIndex == 2) {
				// 	self.init1(mescroll)
				// } else if (this.itemIndex == 3) {
				// 	self.init2(mescroll)
				// }
				
				if (this.itemIndex == 1) {
					self.init1(mescroll)
				} else if (this.itemIndex == 2) {
					self.init2(mescroll)
				} 
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(mescroll) {
				// 获取抽奖列表
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					nowPage: mescroll.num,
					pageCount: mescroll.size
				}

				this.$u.post('getluckdrawlist', data1).then(res => {
					console.log(res)
					if (res.result == 0) {
						if (res.dataList) {
							for (let j = 0; j < res.dataList.length; j++) {
								self.list.push(res.dataList[j])
							}
						}
					} else {
						this.$refs.uToast.show({
							title: res.resultNote,
							type: 'none'
						})
					}
					// 接口返回的当前页数据列表 (数组)
					let curPageData = []
					if (res.dataList) {
						curPageData = res.dataList
					}
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = 1
					if (res.totalPage) {
						totalPage = res.totalPage
					}
					mescroll.endByPage(curPageData.length, totalPage)
				})
			},
			init1(mescroll) {
				// 获取抽奖列表
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					nowPage: mescroll.num,
					pageCount: mescroll.size
				}

				this.$u.post('getnovelslist', data1).then(res => {
					console.log(res)
					if (res.result == 0) {
						if (res.dataList) {
							for (let j = 0; j < res.dataList.length; j++) {
								self.bookList.push(res.dataList[j])
							}
						}
					} else {
						this.$refs.uToast.show({
							title: res.resultNote,
							type: 'none'
						})
					}
					// 接口返回的当前页数据列表 (数组)
					let curPageData = []
					if (res.dataList) {
						curPageData = res.dataList
					}
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = 1
					if (res.totalPage) {
						totalPage = res.totalPage
					}
					mescroll.endByPage(curPageData.length, totalPage)
				})
			},
			init2(mescroll) {
				// 获取抽奖列表
				let self = this
				let data1 = {
					nowPage: mescroll.num,
					pageCount: mescroll.size
				}

				this.$u.post('getgoodsarticlelist', data1).then(res => {
					console.log(res)
					if (res.result == 0) {
						if (res.dataList) {
							for (let j = 0; j < res.dataList.length; j++) {
								self.shopList.push(res.dataList[j])
							}
						}
					} else {
						this.$refs.uToast.show({
							title: res.resultNote,
							type: 'none'
						})
					}
					// 接口返回的当前页数据列表 (数组)
					let curPageData = []
					if (res.dataList) {
						curPageData = res.dataList
					}
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = 1
					if (res.totalPage) {
						totalPage = res.totalPage
					}
					mescroll.endByPage(curPageData.length, totalPage)
				})
			},
			goBook(id, state, item) {
				if (state == 0 && item.url2) {
					this.$u.route({
						url: 'pages/bookDetail/bookDetail',
						params: {
							url1: item.url1,
							url2: item.url2,
							times1: item.times1,
							integrals: item.integrals,
							nid: item.nid,
							name: item.name,
							state
						}
					})
				} else if (state == 0 && !item.url2) {
					this.$u.post('addnovelsrecord', {
						uid: uni.getStorageSync('uid'),
						nid: item.nid
					}).then(res => {
						console.log(res)
						uni.navigateTo({
							url: '/pages/book/book?url=' + encodeURIComponent(item.url1) + '&title=' + item.name  + '&type=2' + '&state=' + state
						})
					})
				} else if (state == 1 && !item.url2) {
					uni.navigateTo({
						url: '/pages/book/book?url=' + encodeURIComponent(item.url1) + '&title=' + item.name  + '&type=2' + '&state=' + state
					})
				} else if (state == 1 && item.url2) {
					uni.navigateTo({
						url: '/pages/book/book?url=' + encodeURIComponent(item.url1) + '&title=' + item.name  + '&type=2' + '&state=' + state
					})
				}
			},
			goMoney() {
				uni.navigateTo({
					url: '/pages/money/money?score=' + this.userInfo.integrals
				})
			},
			goDetail(id,state) {
				uni.navigateTo({
					url: '/pages/produce/produce?id=' + id + '&state=' + state
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;

		.top {
			width: 100%;
			height: 160rpx;
			background: #fe5f23;
			display: flex;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.user {
				font-size: 28rpx;
				color: #FFFFFF;
				margin-left: 28rpx;
			}
		}

		.nav {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			margin: 50rpx 0;

			.nav-item {
				width: 100%;
				height: 160rpx;
				border-radius: 6px;
				background: #FFFFFF;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				display: flex;

				.item-left {
					width: 50%;
					height: 160rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					color: #fe5f23;
					position: relative;

					&.common:after {
						content: '';
						position: absolute;
						top: 40rpx;
						right: 0;
						width: 1px;
						height: 80rpx;
						background: #fe5f23;
					}

					.money {
						width: 100rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						background: #fe5f23;
						position: absolute;
						top: 55rpx;
						right: 0;
						border-top-left-radius: 24px;
						border-bottom-left-radius: 24px;
						font-size: 28rpx;
						color: #FFFFFF;
					}
				}
			}
		}

		.type {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			overflow: hidden;
			margin-bottom: 30rpx;

			.type-item {
				width: 100%;
				display: flex;
				flex-direction: column;
				border-radius: 6px;
				background: #FFFFFF;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				padding-bottom: 40rpx;

				.type-title {
					width: 100%;
					height: 90rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;

					.type-list {
						width: 20%;
						height: 90rpx;
						line-height: 90rpx;
						text-align: center;
						font-size: 30rpx;
						color: #333;

						&.active {
							color: #fe5f23;
							border-bottom: 2px solid #fe5f23;
						}
					}
				}

				.type-all {
					width: 100%;
					display: flex;
					flex-direction: column;

					.warn {
						width: 100%;
						height: 90rpx;
						line-height: 90rpx;
						text-align: center;
						font-size: 28rpx;
						color: #333;
					}

					.warns {
						width: 100%;
						text-align: center;
						font-size: 24rpx;
						color: #999;
					}

					.read {
						width: 100%;
						text-align: center;
						font-size: 24rpx;
						color: red;
						margin-top: 40rpx;
					}

					.btn {
						width: 90%;
						margin: 40rpx auto 0;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						border-radius: 6px;
						background: #fe5f23;
						font-size: 30rpx;
						color: #FFFFFF;
					}

					.record {
						width: 100%;
						display: flex;
						justify-content: space-around;
						align-items: center;
						margin: 60rpx 0;

						.record-left {
							display: flex;
							flex-direction: column;
							align-items: center;
							font-size: 28rpx;
							color: #333;
						}
					}
				}

				.search {
					width: 100%;
					display: flex;
					flex-direction: column;
					padding: 0 28rpx;
					box-sizing: border-box;

					.search-box {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
						border-radius: 30px;
						background: #e3e3e3;
						display: flex;
						align-items: center;
						padding: 0 24rpx;
						box-sizing: border-box;
						margin: 40rpx 0 30rpx;

						image {
							width: 50rpx;
							margin-bottom: 4rpx;
						}

						input {
							font-size: 28rpx;
							color: #333;
							margin-left: 30rpx;
						}
					}

					.all {
						width: 100%;
						height: 70rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 30rpx;
						color: #333;

						.book {
							position: relative;
							padding-left: 20rpx;
						}

						.book:before {
							content: '';
							width: 2px;
							height: 28rpx;
							border-radius: 20px;
							background: #fe5f23;
							position: absolute;
							top: 0;
							left: 0;
						}

						.more {
							font-size: 28rpx;
							color: #999;
							display: flex;
							align-items: center;

							image {
								width: 46rpx;
								margin-bottom: 10rpx;
							}
						}
					}

					.book-list {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						margin-top: 30rpx;

						.book-item {
							width: 30%;
							display: flex;
							flex-direction: column;
							margin-bottom: 30rpx;

							image {
								width: 100%;
								height: 280rpx;
								border-radius: 6px;
							}

							.book-title {
								width: 100%;
								font-size: 28rpx;
								color: #333;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								margin: 16rpx 0;
								text-align: center;
							}

							.book-time {
								font-size: 26rpx;
								color: #999;
								text-align: center;
							}
						}
					}
				}
			}

			.product {
				width: 100%;
				display: flex;
				flex-direction: column;
				border-radius: 6px;
				background: #FFFFFF;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				padding: 28rpx;
				box-sizing: border-box;
				margin-top: 50rpx;

				image {
					width: 100%;
					border-radius: 6px;
					height: 334rpx;
				}

				.product-title {
					font-size: 28rpx;
					color: #333;
					margin: 24rpx 0;
				}

				.product-time {
					font-size: 26rpx;
					color: #999;
				}

				.join {
					width: 100%;
					margin: 40rpx auto 0;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 6px;
					background: #fe5f23;
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}

			.products {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;

				.imgs {
					width: 100%;
					height: 334rpx;
					border-radius: 6px;
					overflow: hidden;
					position: relative;
					
					image {
						width: 100%;
						height: 334rpx;
					}
					
					.mark {
						width: 70rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 24rpx;
						color: #fff;
						position: absolute;
						top: 0;
						right: 0;
						background: #fe5f23;
						border-bottom-left-radius: 6px;
					}
				}

				.shop-title {
					font-size: 28rpx;
					color: #333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					line-height: 20px;
					margin: 24rpx 0;
				}

				.shop-time {
					font-size: 26rpx;
					color: #999;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					line-height: 20px;
				}
			}
		}
	}
</style>
