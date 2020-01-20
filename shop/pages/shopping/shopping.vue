<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" :backColor="backColor">
				<block slot="backText"></block>
				<block slot="content">代理商</block>
				<block slot="right">
					<view class="mine" @tap="goOpen">我要推广</view>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<img class='bg' src="../../static/images/tuiguang.png" alt="">
			<view class="lists">
				<view class="item">
					<view class="total">我的代理总人数</view>
					<view class="num">{{total}}</view>
				</view>
				<view class="item">
					<view class="tab">
						<view class="tab-item" v-for="(v,k) in tab" :key="k" :class="itemIndex == k ? 'active' : ''" @tap="change(k)">{{v.name}}({{k == 0 ? num1 : num2}})</view>
					</view>
					<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
					 @emptyclick="emptyClick" @topclick="topClick" style="width: 100%;">
						<view class="report">
							<view class="report-list" v-for="(v,k) in list" :key="k">
								<view class="report-left">
									<img :src="v.icon" alt="">
									<view class="msg">
										<view>{{v.nickname}}</view>
										<view style="color: 24upx;">获得收益：{{v.fee}}</view>
									</view>
								</view>
								<view class="report-right">累计出货：<span style="color: red;">￥{{v.amount}}</span></view>
							</view>
						</view>
					</mescroll-uni>
				</view>
			</view>
		</view>
		<view class="bgs" v-if="show" @tap="goHide">
			<img src="../../static/images/bgs.png" alt="">
		</view>
	</view>
</template>

<script>
	import jweixin from '../../common/wx.js'
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#EDEDED',
				itemIndex: 0,
				tab: [{
					name: '一级代理商',
					count: 10
				}, {
					name: '二级代理商',
					count: 20
				}],
				num1: 0,
				num2: 0,
				total: 0,
				list: [],
				type: 1,
				show: false,
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
						tip: '还没有好友哦~~', // 提示
						// btnText: '去逛逛 >' // 按钮
					},
					timer: null
				}
			}
		},
		components: {
			MescrollUni
		},
		onUnload() {
			this.mescroll = null
			clearTimeout(this.timer)
		},
		onHide() {
			clearTimeout(this.timer)
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
			this.timer = setTimeout(() => {
				this.goFriend()
				this.goShare()
			}, 800)
		},
		methods: {
			change(k) {
				this.itemIndex = k
				if (k == 0) {
					this.type = 1
				} else if (k == 1) {
					this.type = 2
				}
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
				self.init(mescroll, this.type)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(mescroll, type) {
				//获取列表数据
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					type,
					pageNo: mescroll.num,
					pageSize: mescroll.size
				}
				let data = {
					url: '/myFriends',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.total = res.data.members
							self.num1 = res.data.total1
							self.num2 = res.data.total2
							if (res.data.dataList) {
								for (var j = 0; j < res.data.dataList.length; j++) {
									self.list.push(res.data.dataList[j])
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
			goFriend() {
				let self = this
				let url = window.location.href.split('#')[0]
				let datas = {
					url: url
				}
				let data = {
					url: '/auth',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							let appId = res.data.appId
							let timestamp = res.data.timestamp
							let nonceStr = res.data.noncestr
							let signature = res.data.signature
							self.shareFriend(appId, timestamp, nonceStr, signature)
						}
					}
				}
				ajax(data)
			},
			goShare() {
				let self = this
				let url = window.location.href.split('#')[0]
				let datas = {
					url: url
				}
				let data = {
					url: '/auth',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							let appId = res.data.appId
							let timestamp = res.data.timestamp
							let nonceStr = res.data.noncestr
							let signature = res.data.signature
							self.shareMenu(appId, timestamp, nonceStr, signature)
						}
					}
				}
				ajax(data)
			},
			shareFriend(appId, timestamp, nonceStr, signature) {
				jweixin.config({
					// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					debug: false,
					// 必填，公众号的唯一标识
					appId: appId,
					// 必填，生成签名的时间戳
					timestamp: timestamp,
					// 必填，生成签名的随机串
					nonceStr: nonceStr,
					// 必填，签名，见附录1
					signature: signature,
					// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
				})
				jweixin.error(function(res) {
					//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
					// alert("扫码出错了" + res.errMsg)
				})
				jweixin.ready(function() {
					jweixin.onMenuShareAppMessage({
						title: '邀请你加入货集集', // 分享标题
						desc: '高价收购货品的平台', // 分享描述
						link: 'http://m.tfgwzz.com/oauth/oauth.html?uid=' + uni.getStorageSync('uid'),
						imgUrl: 'http://m.tfgwzz.com/logo.png', // 分享图标
						type: 'link', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							Toast.showToast('分享成功')
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							Toast.showToast('分享失败')
							// 用户取消分享后执行的回调函数
						}
					})
				})
			},
			shareMenu(appId, timestamp, nonceStr, signature) {
				jweixin.config({
					// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					debug: false,
					// 必填，公众号的唯一标识
					appId: appId,
					// 必填，生成签名的时间戳
					timestamp: timestamp,
					// 必填，生成签名的随机串
					nonceStr: nonceStr,
					// 必填，签名，见附录1
					signature: signature,
					// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
				})
				jweixin.error(function(res) {
					//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
					// alert("扫码出错了" + res.errMsg)
				});
				jweixin.ready(function() {
					jweixin.onMenuShareTimeline({
						title: '邀请你加入货集集', // 分享标题
						link: 'http://m.tfgwzz.com/oauth/oauth.html?uid=' + uni.getStorageSync('uid'),
						imgUrl: 'http://m.tfgwzz.com/logo.png', // 分享图标
						success: function() {
							Toast.showToast('分享成功')
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							Toast.showToast('分享失败')
							// 用户取消分享后执行的回调函数
						}
					})
				})
			},
			goOpen() {
				this.show = true
			},
			goHide() {
				this.show = false
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
		background: #EDEDED;
		position: relative;

		.fixed {
			width: 100%;

			.mine {
				width: 160upx;
				color: red;
				text-align: right;
			}
		}

		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.bg {
				width: 100%;
				height: 260upx;
				border-radius: 4px;
				margin-bottom: 20upx;
			}

			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;

				.item {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					background: #FFFFFF;
					border-radius: 4px;
					margin: 0 0 20upx;
					font-size: 30upx;
					color: #111111;

					.total {
						width: 100%;
						height: 90upx;
						line-height: 90upx;
						text-align: center;
						font-size: 30upx;
						color: red;
					}

					.num {
						font-size: 80upx;
						color: #111111;
						margin-bottom: 30upx;
					}

					.tab {
						width: 100%;
						display: flex;
						align-items: center;
						padding: 20upx 0;

						.tab-item {
							width: 50%;
							height: 60upx;
							line-height: 60upx;
							text-align: center;
							font-size: 30upx;
							color: #999;

							&.active {
								color: #111111;
							}
						}

						.tab-item:first-child {
							border-right: 1px solid #eee;
						}
					}

					.report {
						width: 100%;
						display: flex;
						flex-direction: column;

						.report-list {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 24upx 40upx;
							box-sizing: border-box;

							.report-left {
								display: flex;

								img {
									width: 100upx;
									height: 100upx;
									border-radius: 50%;
									margin-right: 24upx;
								}

								.msg {
									height: 100upx;
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									font-size: 30upx;
									color: #111111;
								}
							}

							.report-right {
								font-size: 30upx;
								color: #111111;
							}
						}
					}
				}
			}
		}

		.bgs {
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .5);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9999;
			display: flex;
			justify-content: center;

			img {
				width: 650upx;
				height: 650upx;
			}
		}
	}
</style>
