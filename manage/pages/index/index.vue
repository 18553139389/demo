<template>
	<view class="contain">
		<view class="wrapper">
			<view class="head" :style="style">
				<span>{{message.companyname}}</span>
				<view class="message" @tap="goMessage">
					<image src="../../static/images/xiaoxi.png" alt=""></image>
					<view class="icon" v-if="count != 0">{{count}}</view>
				</view>
			</view>
			<view class="banner">
				<swiper class="swiper" :autoplay="autoplay" :interval="interval" circular="true">
					<swiper-item v-for="(v,k) in swiperList" :key="k" @tap="goUrl(v.title, v.url)">
						<image style="width: 100%;height: 100%;" :src="v.img" alt=""></image>
					</swiper-item>
				</swiper>
			</view>
			<ul class="tab">
				<!-- <li @tap="goLook">
					<image src="../../static/images/zizhongchaxun.png" alt=""></image>
					<span>车辆管理</span>
				</li> -->
				<li @tap="goCount">
					<image src="../../static/images/tingji.png" alt=""></image>
					<span>统计</span>
				</li>
				<li @tap="goTell">
					<image src="../../static/images/tongxunlu.png" alt=""></image>
					<span>通讯录</span>
				</li>
				<!-- <li @tap="goMessage">
					<image src="../../static/images/xitongtongzhi.png" alt=""></image>
					<span>系统通知</span>
				</li> -->
				<li @tap="useCount">
					<image src="../../static/images/yongliang.png" alt=""></image>
					<span>用量</span>
				</li>
				<li @tap="goSet">
					<image src="../../static/images/xitongshezhi.png" alt=""></image>
					<span>系统设置</span>
				</li>
			</ul>
			<!-- <ul class="nav">
				<li @tap="goReport">
					<image src="../../static/images/cheliangjilu.png" alt=""></image>
				</li>
				<li @tap="goProduct">
					<image src="../../static/images/chanpinguanli.png" alt=""></image>
				</li>
			</ul> -->
			<view class="list">
				<view class="heads">
					<view class="report">进出记录</view>
					<view class="more">
						<span @tap="goReport">更多</span>
						<image src="../../static/images/jiantou.png" alt=""></image>
					</view>
				</view>
				<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
				@topclick="topClick">
					<ul class="team">
						<li v-for="(v,k) in list" :key="k" @tap="viewRecord('详细信息',v.billno)">
							<view class="cars">
								<view>{{v.carnum}}</view>
								<view class="names" @tap="">
									<view class="weights" v-if="v.modi_oriweight != 0">
										<view style="margin-bottom: 8upx;text-decoration: line-through;" v-if="v.inorout == 1">+{{v.modi_oriweight}}{{v.goodsweightunit}}</view>
										<view style="margin-bottom: 8upx;text-decoration: line-through;" v-if="v.inorout == 2">-{{v.modi_oriweight}}{{v.goodsweightunit}}</view>
										<view>{{v.modi_cnname}}</view>
									</view>
									<view v-if="v.inorout == 1" @tap.stop="changeWeight(v.id,v)">+{{v.goodsjsweight}}{{v.goodsweightunit}}</view>
									<view v-if="v.inorout == 2" style="color: red;" @tap.stop="changeWeight(v.id,v)">{{v.goodsjsweight}}{{v.goodsweightunit}}</view>
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
		<chunLei-modal v-model="value" :mData="inputData" :type="type1" @onConfirm="onConfirm3" @cancel="cancel3" :navMask="false"
		 :nav="false"></chunLei-modal>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import chunLeiModal from '../../components/chunLei-modal/chunLei-modal.vue'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				autoplay: true,
				interval: 5000,
				message: {},
				count: 0,
				swiperList: [],
				list: [],
				time: '',
				value: false,
				ids: '',
				inputData: {
					content: [{
						title: '修改重量：',
						content: '',
						unit: '',
						type: 'number',
						placeholder: ''
					}]
				},
				type1: 'input',
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
						size: 5, // 每页数据的数量
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
				}
			}
		},
		components: {
			MescrollUni,
			chunLeiModal
		},
		onHide() {
			clearInterval(this.time)
		},
		onUnload() {
			clearInterval(this.time)
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
			this.init()
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar
				var style = `padding-top:${StatusBar}px;`
				return style
			}
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
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				self.getReport(mescroll)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			getReport(mescroll) {
				let self = this
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				//进出记录
				let datas1 = {
					token: uni.getStorageSync('token'),
					begintime: '',
					endtime: '',
					pageno: pageNum,
					pagesize: pageSize,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				let data = {
					url: '/api/Truck/AllRecords',
					data: datas1,
					success: function(res) {
						console.log(res)
						if (res.data.Code == 0) {
							res.data.Customerdata.forEach((item) => {
								self.list.push(item)
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
			goCount() {
				uni.navigateTo({
					url: '/pages/all/all'
				})
			},
			useCount() {
				uni.navigateTo({
					url: '/pages/useList/useList'
				})
			},
			init() {
				let self = this
				if (uni.getStorageSync('cid') && uni.getStorageSync('cid') != null) {
					let cid = uni.getStorageSync('cid')
					this.getCid(cid)
				} else {
					//客户端标识
					let timer = setInterval(() => {
						let pinf = plus.push.getClientInfo()
						if (pinf.clientid != 'null' && pinf.clientid && pinf.clientid != null) {
							uni.setStorageSync('cid', pinf.clientid)
							clearInterval(timer)
							self.getCid(pinf.clientid)
						}
					}, 300)
				}
				let datas = {
					token: uni.getStorageSync('token'),
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/account',
						data: datas,
						success: function(res) {
							console.log(JSON.stringify(res))
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.goVersion()
								self.message = res.data.Customerdata
								uni.setStorageSync('cnname', res.data.Customerdata.cnname)
								uni.setStorageSync('job', res.data.Customerdata.job)
								uni.setStorageSync('id', res.data.Customerdata.companyid)
								uni.setStorageSync('jobid', res.data.Customerdata.jobid)
								uni.setStorageSync('enable', res.data.Customerdata.editable)
								self.time = setInterval(() => {
									self.getNotice(res.data.Customerdata.companyid, res.data.Customerdata.account)
								},2000)
								res.data.Customerdata.appbanner.forEach((item) => {
									self.swiperList.push(item)
								})
							} else if (res.data.Code == -2 || res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			goVersion() {
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/Upgrade/Req',
						data: datas,
						success: function(res) {
							console.log(JSON.stringify(res))
							if (res.data.Code == 0) {
								Toast.hideLoading()
								if (res.data.Customerdata.isforce == 0) {
									uni.showModal({
										title: '在线升级',
										content: res.data.Customerdata.Trips,
										success: function(re) {
											if (re.confirm) {
												plus.nativeUI.showWaiting("下载最新文件中,请稍候...")
												plus.downloader.createDownload(res.data.Customerdata.apk, {
													filename: "_doc/update/"
												}, function(d, status) {
													if (status == 200) {
														plus.nativeUI.closeWaiting()
														console.log("下载wgt成功：" + d.filename)
														self.installWgt(d.filename); // 安装wgt包
													} else {
														console.log("下载wgt失败！")
														plus.nativeUI.alert("下载APP失败！")
													}
												}).start()
											} else if (re.cancel) {
												console.log('用户点击取消')
											}
										}
									})
								} else {
									uni.showModal({
										title: '在线升级',
										content: res.data.Customerdata.Trips,
										showCancel: false,
										success: function(re) {
											if (re.confirm) {
												plus.nativeUI.showWaiting("下载最新文件中,请稍候...")
												plus.downloader.createDownload(res.data.Customerdata.apk, {
													filename: "_doc/update/"
												}, function(d, status) {
													if (status == 200) {
														plus.nativeUI.closeWaiting()
														console.log("下载wgt成功：" + d.filename)
														self.installWgt(d.filename); // 安装wgt包
													} else {
														console.log("下载wgt失败！")
														plus.nativeUI.alert("下载APP失败！")
													}
												}).start()
											} else if (re.cancel) {
												console.log('用户点击取消')
											}
										}
									})
								}
							} else if (res.data.Code == -1) {
								Toast.hideLoading()
								// Toast.showToast(res.data.Description)
							} else if (res.data.Code == -2) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			installWgt(path) {
				plus.nativeUI.showWaiting("正在安装...");
				plus.runtime.install(path, {
					force: true
				}, function() {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.alert("APP更新完成！", function() {
						plus.runtime.restart()
					})
				}, function(e) {
					plus.nativeUI.closeWaiting()
					plus.nativeUI.alert("安装失败：" + e.message)
				})
			},
			getCid(cid) {
				//#ifdef APP-PLUS
				plus.device.getInfo({
					success: function(e) {
						console.log('getDeviceInfo success: ' + JSON.stringify(e));
						let uuid = e.uuid
						let datas1 = {
							token: uni.getStorageSync('token'),
							cid,
							deviceid: uuid,
							os: uni.getSystemInfoSync().platform,
							osversion: uni.getSystemInfoSync().system,
							appversion: uni.getStorageSync('appversion')
						}
						let data = {
							url: '/api/CompanyUser/Updcid',
							data: datas1,
							success: function(res) {
								console.log(JSON.stringify(res))
							}
						}
						ajax(data)
					},
					fail: function(e) {
						console.log('getDeviceInfo failed: ' + JSON.stringify(e));
					}
				})
				//#endif  
			},
			getNotice(companyid, account) {
				let self = this
				let datas1 = {
					companyid,
					account,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				let data = {
					url: '/api/Notice/NewNoticeCounter',
					data: datas1,
					success: function(res) {
						console.log(JSON.stringify(res))
						if (res.data.Code == 0) {
							if (res.data.Customerdata.cnt > 99) {
								self.count = '99+'
							} else {
								self.count = res.data.Customerdata.cnt
							}
						}
					}
				}
				ajax(data)
			},
			goTell() {
				uni.navigateTo({
					url: '/pages/user/user'
				})
			},
			goMessage() {
				uni.navigateTo({
					url: '/pages/message/message'
				})
			},
			goProduct() {
				uni.navigateTo({
					url: '/pages/product/product'
				})
			},
			goReport() {
				this.$store.commit('changeProductState','')
				this.$store.commit('changeProductItem','')
				this.$store.commit('changeCarNum','')
				uni.navigateTo({
					url: '/pages/report/report'
				})
			},
			goSet() {
				uni.navigateTo({
					url: '/pages/set/set'
				})
			},
			goLook() {
				uni.navigateTo({
					url: '/pages/look/look'
				})
			},
			goUrl(title, url) {
				if (url == '' || url == null) {
					return
				}
				uni.navigateTo({
					url: '/pages/rich/rich?title=' + title + '&url=' + url
				})
			},
			viewRecord(title, billno) {
				if (billno == '' || billno == null) {
					return
				}
				uni.navigateTo({
					url: '/pages/text/text?title=' + title + '&billno=' + billno + '&apisecret=' + uni.getStorageSync('apisecret')
				})
			},
			changeWeight(id, item) {
				if (uni.getStorageSync('enable') == 0) {
					return
				}
				this.value = true
				this.ids = id
				this.inputData.content[0].content = item.goodsweight;
				this.inputData.content[0].unit = item.goodsweightunit;
			},
			onConfirm3(e) {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					id: this.ids,
					goodsjsweight: e[0].content,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/Truck/ModifyRecords',
						data: datas1,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
								self.init()
							} else if (res.data.Code == -2 || res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			cancel3() {

			},
			onBackPress(e) {
				this.value = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			.head {
				width: 100%;
				position: fixed;
				top: 0;
				left: 0;
				background: #FFFFFF;
				z-index: 9999;

				span {
					display: inline-block;
					width: 100%;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					font-size: 15px;
					color: #333;
				}

				.message {
					width: 42upx;
					height: 42upx;
					position: absolute;
					top: calc(var(--status-bar-height) + 20upx);
					right: 30upx;

					image {
						width: 42upx;
						height: 42upx;
					}

					.icon {
						position: absolute;
						width: 34upx;
						height: 34upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 50%;
						background: red;
						font-size: 8px;
						color: #FFFFFF;
						top: -6upx;
						right: -12upx;
						font-weight: 600;
					}
				}
			}

			.banner {
				width: 100%;
				height: 330upx;
				overflow: hidden;
				margin-top: calc(var(--status-bar-height) + 90upx);

				.swiper {
					width: 100%;
					height: 100%;
				}
			}

			.tab {
				width: 100%;
				padding: 40upx 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				border-bottom: 40rpx solid #fafafa;

				li {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 15px;
					color: #333;

					image {
						width: 100upx;
						height: 100upx;
						margin-bottom: 20upx;
						border-radius: 4px;
					}
				}
			}

			.nav {
				width: 100%;
				display: flex;
				justify-content: space-between;
				border-top: 24upx solid #FAFAFA;
				border-bottom: 24upx solid #FAFAFA;
				padding: 20upx 30upx;
				box-sizing: border-box;

				li {
					width: 48%;

					image {
						width: 100%;
						height: 150upx;
					}
				}
			}

			.list {
				width: 100%;
				padding: 20upx 30upx;
				box-sizing: border-box;

				.heads {
					width: 100%;
					height: 90upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #333;

					.report {
						height: 30upx;
						line-height: 30upx;
						border-left: 2px solid #00AAEF;
						padding-left: 24upx;
					}

					.more {
						display: flex;
						align-items: center;
						color: #999;

						image {
							width: 14upx;
							height: 23upx;
							margin-left: 10upx;
						}
					}
				}

				.team {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;

					li {
						width: 100%;
						box-sizing: border-box;
						border: 1px solid #eee;
						border-radius: 4px;
						box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
						margin-bottom: 30upx;

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
				}
			}
		}
	}
</style>
