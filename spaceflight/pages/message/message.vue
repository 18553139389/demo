<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">消息</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick">
				<view class="item" v-if="allConversation.length > 0 && ite.lastMessage.fromAccount !== myInfo.userID" v-for="(ite,idx) in allConversation"
				:key="idx" @longpress="longTimePress(ite)" @tap="goTalk(ite.userProfile.userID,ite)">
					<view class="expert">
						<view class="head">
							<image :src="ite.userProfile.avatar"></image>
							<view class="icon" v-if="ite.unreadCount > 0"></view>
						</view>
						<view class="column">
							<view class="column-box">
								<view class="nick">{{ite.userProfile.nick || ite.userProfile.userID}}</view>
								<view class="column-content">{{ite.lastMessage.messageForShow}}</view>
							</view>
							<view class="times">{{ite.lastMessage._lastTime}}</view>
						</view>
					</view>
				</view>
				<view class="item" v-for="(v,k) in list" :key="k" @tap="goDetail(v.id,v.date)" @longpress="DelNotice(v.id,k)">
					<view class="warn" v-if="v.isRead == 2"></view>
					<view class="message">
						<view class="top">
							<image src="../../static/images/m.png"></image>
							<view>系统通知</view>
						</view>
						<view class="content">{{v.title}}</view>
						<view class="time">{{v.date}}</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
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
						tip: '没有新的数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				conversation: {}
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
			if(this.mescroll) {
				this.list = []
				this.mescroll.resetUpScroll()
			}
		},
		computed: {
			...mapState({
				allConversation: state => state.conversation.allConversation
			}),
			...mapGetters(['totalUnreadCount', 'myInfo'])
		},
		methods: {
			goDetail(id, date) {
				uni.navigateTo({
					url: '/pages/messageDetail/messageDetail?id=' + id + '&time=' + date
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
					uid: uni.getStorageSync('uid'),
					pageSize: mescroll.size,
					pageNo: mescroll.num,
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/myMessage',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (res.data.dataList) {
									for(let i=0;i<res.data.dataList.length;i++) {
										self.list.push(res.data.dataList[i])
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
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			format(shijianchuo) {
				var time = new Date(shijianchuo)
				var y = time.getFullYear()
				var m = time.getMonth() + 1
				var d = time.getDate()
				var h = time.getHours()
				var mm = time.getMinutes()
				var s = time.getSeconds()
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
			},
			// 将某会话设为已读
			setMessageRead(item) {
				if (item.unreadCount === 0) {
					return
				}
				wx.$app.setMessageRead({
					conversationID: item.conversationID
				})
			},
			goTalk(id, ite) {
				this.setMessageRead(ite)
				wx.$app.updateMyProfile({
					nick: uni.getStorageSync('nick'),
					avatar: uni.getStorageSync('icon')
				})
				this.empty(id)
			},
			empty(id) {
				// 发起会话
				this.$store.dispatch('checkoutConversation', `C2C${id}`)
					.then(() => {

					})
					.catch(() => {

					})
			},
			longTimePress(item) {
				this.conversation = item
				this.handleModalShow()
			},
			handleModalShow() {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认删除此会话吗',
					success: function(res) {
						if (res.confirm) {
							self.handleConfirm()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			handleConfirm() {
				this.deleteConversation(this.conversation)
			},
			deleteConversation(item) {
				console.log(item)
				wx.$app.deleteConversation(item.conversationID).then((res) => {
					console.log('delete success', res)
				})
			},
			DelNotice(id,k) {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认删除此通知吗',
					success: function(res) {
						if (res.confirm) {
							self.delMessage(id,k)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			delMessage(id,k) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					mid: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/delMessage',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list.splice(k,1)
								Toast.showToast('删除成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
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
			padding: 0 28rpx;
			box-sizing: border-box;

			.item {
				width: 100%;
				background: #fff;
				border-radius: 4px;
				padding: 24rpx;
				box-sizing: border-box;
				display: flex;
				margin-top: 10px;

				.warn {
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background: red;
					margin-top: 30rpx;
				}

				.message {
					width: 85%;
					display: flex;
					flex-direction: column;
					padding-left: 20rpx;
					box-sizing: border-box;

					.top {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #0C2A6A;

						image {
							width: 70rpx;
							height: 70rpx;
							margin-right: 24rpx;
						}
					}

					.content {
						font-size: 26rpx;
						color: #333;
						margin: 12rpx 0 40rpx 24rpx;
					}

					.time {
						font-size: 24rpx;
						color: #999;
						margin: 0 0 0 24rpx;
					}
				}

				.expert {
					width: 100%;
					display: flex;

					.head {
						width: 100rpx;
						height: 100rpx;
						position: relative;

						image {
							width: 100%;
							height: 100%;
							border-radius: 4px;
						}

						.icon {
							width: 32rpx;
							height: 32rpx;
							border-radius: 50%;
							border: 4px solid #FFD0D0;
							background: red;
							position: absolute;
							top: -16rpx;
							right: -16rpx;
						}
					}

					.column {
						width: 75%;
						display: flex;
						flex-direction: column;

						.column-box {
							height: 100rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							padding-left: 24rpx;
							box-sizing: border-box;

							.nick {
								font-size: 30rpx;
								color: #0C2A6A;
							}

							.column-content {
								width: 100%;
								font-size: 26rpx;
								color: #333;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						.times {
							width: 100%;
							padding-left: 24rpx;
							font-size: 24rpx;
							color: #999;
							margin-top: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
