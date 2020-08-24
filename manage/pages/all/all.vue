<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">统计</block>
			</cu-custom>
		</view>
		<view class="counts">
			<view class="tabs">
				<view :class="tabIndex == k ? 'tabs-item active' : 'tabs-item'" v-for="(v,k) in tabs" :key="k" @tap="changeTabs(k)">{{v}}</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="head">
				<view class="time" @tap="showType">
					<view>{{val}}</view>
					<image src="../../static/images/select.png" alt=""></image>
				</view>
				<view class="time">
					<view class="choice" v-for="(v,k) in tab" :key="k" :class="itemIndex == k ? 'active' : ''" @tap="changeTab(k)">{{v}}</view>
				</view>
			</view>
			<view class="total">
				<view>共{{weight.count}}车次，合计</view>
			</view>
			<view class="weight">{{weight.goodsweight}}</view>
			<view class="count" v-if="type == 1">入库对比</view>
			<view class="count" v-if="type == 2">出库对比</view>
			<view class="count" v-if="type == 100">其他对比</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
				 :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchColumn" @touchmove="moveColumn"
				 @touchend="touchEndColumn"></canvas>
			</view>
			<view class="rank">
				<view class="rank-title" v-if="type == 1">入库排行榜</view>
				<view class="rank-title" v-if="type == 2">出库排行榜</view>
				<view class="rank-title" v-if="type == 100">其他排行榜</view>
				<view class="item" v-for="(v,k) in listNum" :key="k" @tap="goWork(v.goodsname)">
					<view class="item-left">
						<view class="sort">{{k+1}}</view>
						<view>{{v.goodsname}}</view>
					</view>
					<view class="item-right">
						<view>{{v.goodsweight}}{{v.unit}}</view>
						<image src="../../static/images/rights.png"></image>
					</view>
				</view>
			</view>
		</view>
		<w-picker mode="yearMonth" startYear="2015" endYear="2030" step="1" :current="false" @confirm="onConfirm1" ref="picker1"
		themeColor="#00AAEF">
		</w-picker>
		<w-picker mode="half" startYear="2015" endYear="2030" step="1" :current="false" @confirm="onConfirm2" ref="picker2"
		themeColor="#00AAEF">
		</w-picker>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import wPicker from "../../components/w-picker/w-picker.vue"
	import uCharts from '../../components/u-charts/u-charts.js'
	import {
		ajax
	} from '../../request/request.js'
	var _self;
	var canvaColumn = null
	export default {
		data() {
			return {
				Color: '#fff',
				backColor: '#00AAEF',
				itemIndex: 0,
				val: '',
				tab: ['入库', '出库', '其他'],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				date: '',
				type: 1,
				summary: '',
				list: [],
				listNum: [],
				tabs: ['月统计', '年统计'],
				tabIndex: 0,
				weight: {}
			}
		},
		components: {
			wPicker
		},
		onLoad() {
			let myDate = new Date()
			let tYear = myDate.getFullYear()
			let tMonth = (myDate.getMonth() + 1) > 9 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1)
			this.val = `${tYear}年${tMonth}月`
			this.date = `${tYear}-${tMonth}`

			_self = this
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio
						_self.pixelRatio = 1
					}
				}
			})
			this.cWidth = uni.upx2px(750)
			this.cHeight = uni.upx2px(500)
			this.init()
		},
		methods: {
			init() {
				if(this.tabIndex == 0) {
					this.goWeight()
					this.goCount()
					this.goNumer()
				} else {
					this.goWeightYear()
					this.goNumerYear()
					this.goCountYear()
				}
			},
			goWeightYear() {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					addyear: this.date,
					inorout: this.type,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
			
				Toast.showLoading('', function() {
					let data = {
						url: '/api/AppDataReport/TypeAndYear2CntAndWeight',
						data: datas1,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.weight = res.data.Customerdata
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
			goWeight() {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					addmonth: this.date,
					inorout: this.type,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}

				Toast.showLoading('', function() {
					let data = {
						url: '/api/AppDataReport/TypeAndMonth2CntAndWeight',
						data: datas1,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.weight = res.data.Customerdata
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
			goNumer() {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					addmonth: this.date,
					inorout: this.type,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/AppDataReport/TypeAndMonth2GoodsList',
						data: datas1,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.listNum = res.data.Customerdata
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
			goNumerYear() {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					addyear: this.date,
					inorout: this.type,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				
				Toast.showLoading('', function() {
					let data = {
						url: '/api/AppDataReport/TypeAndYear2GoodsList',
						data: datas1,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.listNum = res.data.Customerdata
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
			goCount() {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					addmonth: this.date,
					inorout: this.type,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}

				Toast.showLoading('', function() {
					let data = {
						url: '/api/AppDataReport/TypeAndMonth2MonthList',
						data: datas1,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								let Column = {
									categories: [],
									series: []
								}
								if (res.data.Customerdata.length > 0) {
									self.list = res.data.Customerdata
									let arr = []
									self.list.forEach((item) => {
										Column.categories.unshift(item.addmonth.substr(5))
										if (self.date == item.addmonth) {
											arr.unshift({
												"value": item.goodsweight,
												"color": "#53bb6e",
												"textColor": "#ffffff"
											})
										} else {
											arr.unshift({
												"value": item.goodsweight,
												"color": "#CBEBD4",
												"textColor": "#ffffff"
											})
										}
									})
									if (self.type == 1) {
										Column.series = [{
											"name": "入库量",
											"data": arr
										}]
									} else if (self.type == 2) {
										Column.series = [{
											"name": "出库量",
											"data": arr
										}]
									} else {
										Column.series = [{
											"name": "其他",
											"data": arr
										}]
									}
								} else {
									Column.categories.unshift(self.date.substr(5))
									let arr = [{
										"value": 0,
										"color": "#CBEBD4",
										"textColor": "#ffffff"
									}]
									if (self.type == 1) {
										Column.series = [{
											"name": "入库量",
											"data": arr
										}]
									} else if (self.type == 2) {
										Column.series = [{
											"name": "出库量",
											"data": arr
										}]
									} else {
										Column.series = [{
											"name": "其他",
											"data": arr
										}]
									}
								}
								_self.showColumn("canvasColumn", Column)
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
			goCountYear() {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					addyear: this.date,
					inorout: this.type,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
			
				Toast.showLoading('', function() {
					let data = {
						url: '/api/AppDataReport/TypeAndYear2YearList',
						data: datas1,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								let Column = {
									categories: [],
									series: []
								}
								if (res.data.Customerdata.length > 0) {
									self.list = res.data.Customerdata
									let arr = []
									self.list.forEach((item) => {
										Column.categories.unshift(item.addyear)
										if (self.date == item.addyear) {
											arr.unshift({
												"value": item.goodsweight,
												"color": "#53bb6e",
												"textColor": "#ffffff"
											})
										} else {
											arr.unshift({
												"value": item.goodsweight,
												"color": "#CBEBD4",
												"textColor": "#ffffff"
											})
										}
									})
									if (self.type == 1) {
										Column.series = [{
											"name": "入库量",
											"data": arr
										}]
									} else if (self.type == 2) {
										Column.series = [{
											"name": "出库量",
											"data": arr
										}]
									} else {
										Column.series = [{
											"name": "其他",
											"data": arr
										}]
									}
								} else {
									Column.categories.unshift(self.date.substr(5))
									let arr = [{
										"value": 0,
										"color": "#CBEBD4",
										"textColor": "#ffffff"
									}]
									if (self.type == 1) {
										Column.series = [{
											"name": "入库量",
											"data": arr
										}]
									} else if (self.type == 2) {
										Column.series = [{
											"name": "出库量",
											"data": arr
										}]
									} else {
										Column.series = [{
											"name": "其他",
											"data": arr
										}]
									}
								}
								_self.showColumn("canvasColumn", Column)
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
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					padding: [15, 5, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					fontSize: 12,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					dataLabel: false,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						data: [{
							position: 'left',
							axisLine: false,
							format: (val) => {
								return val.toFixed(0)
							},
						}]
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				})
			},
			touchColumn(e) {
				canvaColumn.scrollStart(e)
			},
			moveColumn(e) {
				canvaColumn.scroll(e)
			},
			touchEndColumn(e) {
				canvaColumn.scrollEnd(e)
				canvaColumn.touchLegend(e, {
					animation: true,
				})
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				})
			},
			goWork(name) {
				uni.navigateTo({
					url: '/pages/list/list?name=' + name + '&date=' + this.date + '&type=' + this.type + '&tab=' + this.tabIndex
				})
			},
			changeTabs(k) {
				this.tabIndex = k
				let myDate = new Date()
				let tYear = myDate.getFullYear()
				let tMonth = (myDate.getMonth() + 1) > 9 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1)
				if(k == 0) {
					this.val = `${tYear}年${tMonth}月`
					this.date = `${tYear}-${tMonth}`
				} else {
					this.val = `${tYear}年`
					this.date = `${tYear}`
				}
				this.init()
			},
			changeTab(k) {
				if (this.type == k + 1) {
					return
				}
				this.itemIndex = k
				if (k == 2) {
					this.type = 100
				} else {
					this.type = k + 1
				}
				this.init()
			},
			showType() {
				if(this.tabIndex == 0) {
					this.$refs.picker1.show()
				} else {
					this.$refs.picker2.show()
				}
			},
			onConfirm1(e) {
				console.log(JSON.stringify(e))
				this.val = `${e.checkArr[0][0]}年${e.checkArr[0][1]}月`
				this.date = e.result
				this.init()
			},
			onConfirm2(e) {
				console.log(e)
				this.val = `${e.checkArr[0][0]}年`
				this.date = e.checkArr[0][0]
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
		}

		.counts {
			width: 100%;
			display: flex;
			flex-direction: column;
			background: #00AAEF;

			.tabs {
				width: 100%;
				padding: 0 28rpx 28rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				font-size: 30rpx;
				color: #fff;

				.tabs-item {
					height: 70rpx;
					line-height: 70rpx;
					box-sizing: border-box;

					&.active {
						border-bottom: 4rpx solid #fff;
					}
				}
			}
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			background: #00AAEF;

			.head {
				width: 100%;
				height: 70upx;
				padding: 0 28upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 15px;
				color: #fff;

				.time {
					display: flex;
					align-items: center;

					image {
						width: 30upx;
						height: 30upx;
						margin-left: 12upx;
					}

					.choice {
						padding: 8upx 24upx;
						box-sizing: border-box;
						font-size: 28rpx;

						&.active {
							border-radius: 30px;
							border: 1px solid #fff;
						}
					}
				}
			}

			.total {
				width: 100%;
				height: 80upx;
				display: flex;
				align-items: center;
				padding: 0 28upx;
				box-sizing: border-box;
				background: #00AAEF;
				font-size: 26rpx;
				color: #fff;
			}

			.weight {
				width: 100%;
				display: flex;
				align-items: center;
				padding: 0 28upx 30rpx;
				box-sizing: border-box;
				background: #00AAEF;
				font-size: 40rpx;
				color: #fff;
			}

			.count {
				width: 100%;
				height: 140upx;
				line-height: 140upx;
				padding: 0 28upx;
				box-sizing: border-box;
				background: #fff;
				border-top-left-radius: 12px;
				border-top-right-radius: 12px;
			}

			/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
			.qiun-charts {
				width: 750upx;
				height: 500upx;
				background-color: #FFFFFF;

				.charts {
					width: 750upx;
					height: 500upx;
					background-color: #FFFFFF;
				}
			}

			.rank {
				width: 100%;
				display: flex;
				flex-direction: column;
				background: #fff;
				padding: 0 28rpx;

				.rank-title {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 28rpx;
					color: #333;
				}

				.item {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					color: #333;

					.item-left {
						display: flex;
						align-items: center;
						height: 60rpx;
						font-size: 28rpx;
						color: #333;

						.sort {
							margin-right: 30rpx;
						}
					}

					.item-right {
						display: flex;
						align-items: center;
						height: 60rpx;
						font-size: 28rpx;
						color: #333;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-left: 8rpx;
						}
					}
				}
			}
		}
	}
</style>
