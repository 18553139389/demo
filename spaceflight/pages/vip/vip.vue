<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">VIP服务</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="navs" :style="{top:top + 'px'}">
				<view :class="itemIndex == k ? 'active nav-item' : 'nav-item'" v-for="(v,k) in nav" :key="k" @tap="changeNav(k)">{{v}}</view>
			</view>
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
			@emptyclick="emptyClick" @topclick="topClick">
				<view class="list">
					<view class="list-item" @tap="goDetail(v.id)" v-for="(v,k) in list" :key="k">
						<view class="list-left">
							<image :src="v.headImage"></image>
							<view class="message">
								<view class="m_title">{{v.nickName}}</view>
								<view class="m_method">研究方向：{{v.specialty}}</view>
								<view class="m_content">{{v.company + v.dept}}</view>
							</view>
						</view>
						<image class="call" src="../../static/images/call.png" @tap.stop="goCall(v.phone)"></image>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view class="vips" v-if="show" @tap="goHide">
			<view class="vips-box" @tap.stop="">
				<view class="warn">权限不足，请去开通会员</view>
				<view class="open" @tap="goVip">去开通</view>
			</view>
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
				backColor: '#fff',
				nav: ['专家咨询','创业指导'],
				top: 0,
				itemIndex: 0,
				show: false,
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
						tip: '还没有添加专家', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				}
			}
		},
		components: {
			MescrollUni
		},
		onLoad() {
			this.top = Vue.prototype.Custom
			if(!uni.getStorageSync('uid')) {
				uni.reLaunch({
				    url: '/pages/login/login'
				})
			}
		},
		onUnload() {
			this.mescroll = null
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
			changeNav(k) {
				if(this.itemIndex == k) {
					return
				}
				this.itemIndex = k
				this.list = []
				this.mescroll.resetUpScroll()
			},
			goDetail(id) {
				if(uni.getStorageSync('vip') == 2) {
					this.show = true
					return
				}
				uni.navigateTo({
				    url: '/pages/expert/expert?id=' + id + '&index=' + (parseInt(this.itemIndex) + 1)
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
					type: parseInt(this.itemIndex) + 1,
					pageSize: mescroll.size,
					pageNo: mescroll.num
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/vipList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (res.data.dataList) {
									self.list = res.data.dataList
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
			goCall(tel) {
				if(uni.getStorageSync('vip') == 2) {
					this.show = true
					return
				}
				uni.makePhoneCall({
				    phoneNumber: tel
				})
			},
			goHide() {
				this.show = false
			},
			goVip() {
				this.show = false
				uni.navigateTo({
				    url: '/pages/openVip/openVip'
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
		
		.vips {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999999999;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.4);
			display: flex;
			justify-content: center;
			align-items: center;
			
			.vips-box {
				width: 80%;
				border-radius: 6px;
				background: #fff;
				display: flex;
				flex-direction: column;
				
				.warn {
					width: 100%;
					padding: 40rpx 0;
					text-align: center;
					font-size: 30rpx;
					color: #333;
					border-bottom: 1px solid #eee;
				}
				
				.open {
					width: 100%;
					padding: 40rpx 0;
					text-align: center;
					font-size: 30rpx;
					color: #0081FF;
				}
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
			
			.navs {
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 30rpx;
				color: #999;
				position: fixed;
				left: 0;
				border-top: 10px solid #f6f6f6;
				box-sizing: border-box;
				background: #fff;
				z-index: 999;
				
				.active {
					color: #333;
				}
			}
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding-top: 100rpx;
				
				.list-item {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 36rpx 28rpx;
					box-sizing: border-box;
					background: #fff;
					border-bottom: 10px solid #f6f6f6;
					
					.list-left {
						width: 80%;
						display: flex;
						
						image {
							width: 120rpx;
							height: 120rpx;
							border-radius: 4px;
						}
						
						.message {
							width: 75%;
							height: 120rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							font-size: 28rpx;
							color: #333;
							padding-left: 24rpx;
							
							.m_title {
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
							}
							
							.m_method {
								font-size: 26rpx;
								color: #0081FF;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
							}
							
							.m_content {
								font-size: 26rpx;
								color: #999;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
							}
						}
					}
					
					.call {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
		}
	}
</style>
