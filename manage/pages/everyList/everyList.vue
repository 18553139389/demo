<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{car}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list" style="padding-top: 0;">
				<view class="top" :style="{top:top + 'px'}">
					<view class="time" @tap="showType">
						<view v-if="tab == 0">{{date}}</view>
						<view v-if="tab == 1">{{date}}年</view>
						<image src="../../static/images/selects.png"></image>
					</view>
					<view class="name">{{dw}}({{name}})</view>
					<view class="unit">{{weight.goodsweight}}{{weight.unit}}</view>
				</view>
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				@topclick="topClick">
					<ul class="team">
						<li v-for="(v,k) in list" :key="k" @tap="viewRecord('详细信息',v.billno)">
							<view class="cars">
								<view>{{v.carnum}}</view>
								<view class="names">
									<view class="weights" v-if="v.modi_oriweight != 0">
										<view style="margin-bottom: 8upx;text-decoration: line-through;" v-if="v.inorout == 1">+{{v.modi_oriweight}}{{v.goodsweightunit}}</view>
										<view style="margin-bottom: 8upx;text-decoration: line-through;" v-if="v.inorout == 2">-{{v.modi_oriweight}}{{v.goodsweightunit}}</view>
										<view>{{v.modi_cnname}}</view>
									</view>
									<view v-if="v.inorout == 1">+{{v.goodsjsweight}}{{v.goodsweightunit}}</view>
									<view v-if="v.inorout == 2">-{{v.goodsjsweight}}{{v.goodsweightunit}}</view>
								</view>
							</view>
							<view class="msg">
								<view v-if="v.inorout == 1">入库</view>
								<view v-if="v.inorout == 2">出库</view>
								<view>{{v.goodsname}}</view>
							</view>
							<view class="msg">
								<view>操作员：{{v.adduser}}</view>
								<view>{{v.addtime}}</view>
							</view>
						</li>
					</ul>
				</mescroll-uni>
			</view>
		</view>
		<jPicker class="cont" ref="picker" @sure="bookChange" :showKey="tab == 0 ? 'addmonth' : 'addyear'" valKey="BID" :val="bookVal" :options="time" />
	</view>
</template>

<script>
	import Vue from 'vue'
	import jPicker from '../../components/J-Picker/jPicker.vue'
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import wPicker from "../../components/w-picker/w-picker.vue"
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				Color: '#fff',
				backColor: '#00AAEF',
				top: 0,
				tab: null,
				date: '',
				type: '',
				name: '',
				dw: '',
				car: '',
				bookVal: '请选择',
				time: [],
				list: [],
				allList: [],
				total: '',
				totalPage: 0,
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
						size: 8, // 每页数据的数量
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
						tip: '没有进出记录数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				weight: {}
			}
		},
		components: {
			wPicker,
			jPicker,
			MescrollUni
		},
		onUnload() {
			this.mescroll = null
			// this.value = false
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
			this.top = Vue.prototype.CustomBar
			this.tab = option.tab
			this.name = option.name
			this.type = option.type
			this.dw = option.dw
			this.car = option.car
			this.date = option.date
		},
		methods: {
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
				let self = this
				self.init(mescroll, this.date, this.type, this.name, this.dw, this.car)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			init(mescroll, date, type, name, dw, car) {
				let self = this
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let datas1 = {}
				let url = ''
				if (this.tab == 0) {
					url = '/api/AppDataReport/AllRecords'
					datas1 = {
						token: uni.getStorageSync('token'),
						adduser: '',
						inorout: type,
						buyorsale: 0,
						addmonth: date,
						dw: dw,
						goodsname: name,
						carnum: car,
						pageno: mescroll.num,
						pagesize: mescroll.size,
						os: uni.getSystemInfoSync().platform,
						osversion: uni.getSystemInfoSync().system,
						appversion: uni.getStorageSync('appversion')
					}
				} else {
					url = '/api/AppDataReport/AllRecords'
					datas1 = {
						token: uni.getStorageSync('token'),
						adduser: '',
						inorout: type,
						buyorsale: 0,
						addyear: date,
						dw: dw,
						goodsname: name,
						carnum: car,
						pageno: mescroll.num,
						pagesize: mescroll.size,
						os: uni.getSystemInfoSync().platform,
						osversion: uni.getSystemInfoSync().system,
						appversion: uni.getStorageSync('appversion')
					}
				}

				let data = {
					url,
					data: datas1,
					success: function(res) {
						console.log(res)
						if (res.data.Code == 0) {
							res.data.Customerdata.forEach((item) => {
								self.list.push(item)
							})
							self.weight = res.data.Extra
							let list = []
							if(self.tab == 0) {
								list = res.data.Extra.addmonths
							} else {
								list = res.data.Extra.addyears
							}
							self.time = []
							list.forEach((item,index) => {
								let obj = {}
								if(self.tab == 0) {
									obj = {
										addmonth: item.addmonth
									}
								} else {
									obj = {
										addyear: item.addyear
									}
								}
								self.time.push(obj)
							})
						} else if (res.data.Code == -2 || res.data.Code == -1) {
							Toast.showToast(res.data.Description)
							uni.removeStorageSync('token')
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/login/login'
								})
							}, 500)
						} else {
							Toast.showToast(res.data.Description)
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.Customerdata
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = res.data.Extra.Recordcount
						mescroll.endByPage(curPageData.length, totalPage)
					}
				}
				ajax(data)
			},
			showType() {
				this.$refs.picker.showPicker()
			},
			viewRecord(title, billno) {
				if(billno == '' || billno == null) {
					return
				}
				uni.navigateTo({
					url: '/pages/text/text?title=' + title + '&billno=' + billno + '&apisecret=' + uni.getStorageSync('apisecret')
				})
			},
			bookChange(e){
				let list = this.allList
				if(this.tab == 0) {
					this.date = e.addmonth
					this.list = []
					this.mescroll.resetUpScroll()
				} else {
					this.date = e.addyear
					this.list = []
					this.mescroll.resetUpScroll()
				}
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

		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
		
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding-top: 40rpx;
		
				.top {
					width: 100%;
					padding: 0 28rpx;
					background: #00AAEF;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					position: sticky;
					z-index: 99;
		
					.time {
						width: 100%;
						height: 60rpx;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #fff;
						margin-bottom: 30rpx;
						margin-top: 30rpx;
		
						image {
							width: 30rpx;
							height: 30rpx;
							margin-left: 8rpx;
						}
					}
		
					.name {
						width: 100%;
						font-size: 28rpx;
						color: #fff;
						margin-bottom: 24rpx;
					}
		
					.unit {
						font-size: 50rpx;
						font-weight: 600;
						color: #fff;
						margin-bottom: 24rpx;
					}
				}
			}
		}

		.team {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;
			background: #fff;
		
			li {
				width: 100%;
				box-sizing: border-box;
				border: 1px solid #eee;
				border-radius: 4px;
				box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
				background: #FFFFFF;
				margin-top: 30upx;
		
				.cars {
					width: 100%;
					height: 80upx;
					padding: 0 20upx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 16px;
					color: #00AAEF;
					
					.names {
						display: flex;
						align-items: center;
						
						.weights {
							display: flex;
							flex-direction: column;
							align-items: center;
							margin-right: 80upx;
							margin-top: 40upx;
							font-size: 12px;
							color: #999;
						}
					}
				}
		
				.msg {
					width: 100%;
					height: 80upx;
					padding: 0 20upx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #333;
				}
			}
		
			li:first-child {
				margin-top: 0;
			}
		}
	}
</style>
