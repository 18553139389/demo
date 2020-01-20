<template>
	<view class="contain">
		<view class="wrapper">
			<view class="head" :style="style">
				<span>{{message.companyname}}</span>
				<view class="message" @tap="goMessage">
					<img src="../../static/images/xiaoxi.png" alt="">
					<view class="icon" v-if="count != 0">{{count}}</view>
				</view>
			</view>
			<view class="banner">
				<swiper class="swiper" :autoplay="autoplay" :interval="interval" circular="true">
					<swiper-item v-for="(v,k) in swiperList" :key="k" @tap="goUrl(v.title, v.url)">
						<img style="width: 100%;height: 100%;" :src="v.img" alt="">
					</swiper-item>
				</swiper>
			</view>
			<ul class="tab">
				<li @tap="goLook">
					<img src="../../static/images/zizhongchaxun.png" alt="">
					<span>车辆管理</span>
				</li>
				<li @tap="goTell">
					<img src="../../static/images/tongxunlu.png" alt="">
					<span>通讯录</span>
				</li>
				<li @tap="goMessage">
					<img src="../../static/images/xitongtongzhi.png" alt="">
					<span>系统通知</span>
				</li>
				<li @tap="goSet">
					<img src="../../static/images/xitongshezhi.png" alt="">
					<span>系统设置</span>
				</li>
			</ul>
			<ul class="nav">
				<li @tap="goReport">
					<img src="../../static/images/cheliangjilu.png" alt="">
				</li>
				<li @tap="goProduct">
					<img src="../../static/images/chanpinguanli.png" alt="">
				</li>
			</ul>
			<view class="list">
				<view class="heads">
					<view class="report">进出记录</view>
					<view class="more">
						<span @tap="goReport">更多</span>
						<img src="../../static/images/jiantou.png" alt="">
					</view>
				</view>
				<ul class="team">
					<li v-for="(v,k) in list" :key="k">
						<view class="cars">
							<view>{{v.carnum}}</view>
							<view class="names">
								<view class="weights" v-if="v.modi_oriweight != 0">
									<view style="margin-bottom: 8upx;text-decoration: line-through;" v-if="v.inorout == 1">+{{v.modi_oriweight}}{{v.goodsweightunit}}</view>
									<view style="margin-bottom: 8upx;text-decoration: line-through;" v-if="v.inorout == 2">-{{v.modi_oriweight}}{{v.goodsweightunit}}</view>
									<view>{{v.modi_cnname}}</view>
								</view>
								<view v-if="v.inorout == 1" @tap="changeWeight(v.id)">+{{v.goodsjsweight}}{{v.goodsweightunit}}</view>
								<view v-if="v.inorout == 2" style="color: red;" @tap="changeWeight(v.id)">-{{v.goodsjsweight}}{{v.goodsweightunit}}</view>
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
			</view>
		</view>
		<chunLei-modal v-model="value" :mData="inputData" :type="type1" @onConfirm="onConfirm3" @cancel="cancel3" navMask="false" nav="false"></chunLei-modal>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import chunLeiModal from '../../components/chunLei-modal/chunLei-modal.vue'
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
						title: '货物重量：',
						content: '',
						type: 'number',
						placeholder: ''
					}]
				},
				type1: 'input'
			}
		},
		components: {
			chunLeiModal
		},
		onHide() {
			clearInterval(this.time)
		},
		onUnload() {
			clearInterval(this.time)
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
			init() {
				let self = this
				if(uni.getStorageSync('cid') && uni.getStorageSync('cid') != null) {
					let cid = uni.getStorageSync('cid')
					this.getCid(cid)
				} else {
					//客户端标识
					let timer = setInterval(() => {
						let pinf = plus.push.getClientInfo()
						if(pinf.clientid != 'null' && pinf.clientid && pinf.clientid != null) {
							uni.setStorageSync('cid', pinf.clientid)
							clearInterval(timer)
							self.getCid(pinf.clientid)
						}
					},300)
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
				//进出记录
				let datas1 = {
					token: uni.getStorageSync('token'),
					begintime: '',
					endtime: '',
					pageno: 1,
					pagesize: 5,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/Truck/AllRecords',
						data: datas1,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.list = res.data.Customerdata
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
						if(res.data.Code == 0) {
							if(res.data.Customerdata.cnt > 99) {
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
				if(url == '' || url == null) {
					return
				}
				uni.navigateTo({
					url: '/pages/text/text?title=' + title + '&url=' + url
				})
			},
			changeWeight(id) {
				if(uni.getStorageSync('enable') == 0) {
					return
				}
				this.value = true
				this.ids = id
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

					img {
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

				li {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 15px;
					color: #333;

					img {
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

					img {
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

						img {
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
