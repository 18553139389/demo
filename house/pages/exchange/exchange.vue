<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">兑换详情</block>
			</cu-custom>
		</view>
		<view class="nav">
			<view :class="navIndex == k ? 'nav-item active' : 'nav-item'" v-for="(v,k) in nav" :key="k" @tap="changeIndex(k)">{{v}}</view>
		</view>
		<view class="list">
			<view class="warn" v-if="navIndex == 1">注：兑换码长按进行选择复制</view>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick" v-if="navIndex == 0" style="margin-top: 40rpx;">
				<view class="item" v-for="(v,k) in list" :key="k">
					<view class="item-title">{{v.pcname}}</view>
					<view class="item-code">订单号：<text>{{v.ordernum}}</text></view>
					<view class="detail">
						<view class="time">{{v.adtime}}</view>
						<view class="price">消耗：{{v.integrals}}积分</view>
						<view class="mark">已兑换</view>
					</view>
					<view class="right-btn">
						<view class="btn" @tap="goDetail(v.pcid)">去查看</view>
					</view>
				</view>
			</mescroll-uni>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			 @emptyclick="emptyClick" @topclick="topClick" v-if="navIndex == 1">
				<view class="item" v-for="(v,k) in list" :key="k">
					<view class="item-title">{{v.pcname}}</view>
					<view class="item-code">兑换码：<text @longtap="copy">{{v.codes}}</text></view>
					<view class="detail">
						<view class="time">{{v.adtime}}</view>
						<view class="price">消耗：{{v.integrals}}积分</view>
						<view class="mark">已兑换</view>
					</view>
					<view class="right-btn" @tap.stop>
						<view class="btn" @tap="goLook(v.codes,v.ordernum,v.urls)" v-if="v.state == 0">去使用</view>
						<view class="btn" style="background: #ccc;color: #FFFFFF;" v-if="v.state == 1">已使用</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<u-toast ref="uToast" />
		<view class="dialog" v-if="show" @tap="goHide">
			<view class="box" @tap.stop>
				<view class="box-title">请输入兑换码</view>
				<view class="card">
					<view>兑换码：</view>
					<input type="text" placeholder="请输入兑换码" v-model="code">
				</view>
				<view class="produce">注：兑换码在个人中心-我的积分-兑换记录-服务中查看</view>
				<view class="btn" @tap="goSubmit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Bg: '#ffffff',
				nav: ['保障','服务'],
				navIndex: 0,
				show: false,
				type: 1,
				order: '',
				code: '',
				code1: '',
				url: '',
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
					noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
				}
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
		onLoad(option) {
			this.type = option.type 
		},
		methods: {
			goBack() {
				if(this.type == 1) {
					uni.navigateBack({
						delta: 2
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			},
			changeIndex(k) {
				this.navIndex = k
				this.init(this.mescroll)
			},
			copy() {
				let self = this
				uni.setClipboardData({
				    data: '5412365789411225',
				    success: function () {
				        self.$refs.uToast.show({
				        	title: '复制成功',
				        	icon: false
				        })
				    }
				})
			},
			goDetail(id) {
				uni.navigateTo({
				    url: '/pages/myProduct/myProduct?id=' + id
				})
			},
			goLook(code,order,url) {
				this.show = true
				this.code1 = code
				this.order = order
				this.url = url
			},
			goHide() {
				this.show = false
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
				// 获取抽奖列表
				let self = this
				self.list = []
				let data1 = {
					uid: uni.getStorageSync('uid'),
					type: this.navIndex == 0 ? 1 : 2,
					nowPage: mescroll.num,
					pageCount: mescroll.size
				}
			
				this.$u.post('getmyproductorder', data1).then(res => {
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
			goSubmit() {
				if (this.code == '') {
					Toast.showToast('兑换码不能为空')
					return
				}
				
				if (this.code != this.code1) {
					Toast.showToast('兑换码不正确')
					return
				}
				
				this.$u.post('myproductorderuse', {
					uid: uni.getStorageSync('uid'),
					ordernum: this.order,
					codes: this.code
				}).then(res => {
					console.log(res)
					if(res.result == 0) {
						if(this.url) {
							uni.navigateTo({
								url: '/pages/book/book?url=' + this.url
							})
						} else {
							Toast.showToast('兑换成功')
							this.show = false
							this.list = []
							this.mescroll.resetUpScroll()
						}
					}
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
		
		.fixed {
			width: 100%;
		}
		
		.nav {
			width: 100%;
			background: #FFFFFF;
			padding: 28rpx 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			
			.nav-item {
				height: 50rpx;
				
				&.active {
					color: #fe5f23;
					border-bottom: 2px solid #fe5f23;
				}
			}
		}
		
		.list {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.warn {
				width: 100%;
				font-size: 28rpx;
				color: #999;
				margin: 30rpx 0;
			}
			
			.item {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #FFFFFF;
				position: relative;
				overflow: hidden;
				margin-bottom: 40rpx;
				
				.item-title {
					width: 100%;
					font-size: 30rpx;
					color: #333;
				}
				
				.item-code {
					width: 100%;
					font-size: 28rpx;
					color: #666;
					margin: 40rpx 0;
				}
				
				.detail {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					
					.time {
						color: #999;
					}
					
					.price {
						color: #fe5f23;
					}
					
					.mark {
						position: absolute;
						top: 0;
						right: 0;
						width: 120rpx;
						height: 46rpx;
						line-height: 46rpx;
						text-align: center;
						font-size: 24rpx;
						color: #FFFFFF;
						border-bottom-left-radius: 8px;
						background: #fe5f23;
					}
				}
				
				.right-btn {
					width: 100%;
					display: flex;
					flex-direction: row-reverse;
					margin-top: 60rpx;
					
					.btn {
						width: 160rpx;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
						font-size: 28rpx;
						color: #FFFFFF;
						border-radius: 6px;
						background: #fe5f23;
					}
				}
			}
		}
		
		.dialog {
			width: 100%;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			background: rgba(0,0,0,.5);
			z-index: 99;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.box {
				width: 80%;
				border-radius: 6px;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				
				.box-title {
					width: 100%;
					height: 110rpx;
					line-height: 110rpx;
					text-align: center;
					font-size: 30rpx;
					color: #333;
					font-weight: 600;
				}
				
				.card {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					
					input {
						font-size: 28rpx;
						color: #333;
						border-bottom: 1px solid #eee;
						margin-left: 20rpx;
					}
				}
				
				.produce {
					width: 80%;
					font-size: 26rpx;
					color: #999;
					margin: 30rpx auto;
					text-align: center;
					line-height: 18px;
				}
				
				.btn {
					width: 80%;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					border-radius: 24px;
					background: #fe5f23;
					font-size: 28rpx;
					color: #FFFFFF;
					margin: 0 auto 40rpx;
				}
			}
		}
	}
</style>
