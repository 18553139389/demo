<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品统计</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="head">
				<view class="time" @tap="showType">
					<view>{{val}}</view>
					<img src="../../static/images/select.png" alt="">
				</view>
				<view class="time">
					<view class="choice" v-for="(v,k) in tab" :key="k" :class="itemIndex == k ? 'active' : ''" @tap="changeTab(k)">{{v}}</view>
				</view>
			</view>
			<view class="total">
				<view>{{summary}}</view>
			</view>
			<view class="count" v-if="type == 1">入库对比</view>
			<view class="count" v-if="type == 2">出库对比</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
				 :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchColumn" @touchmove="moveColumn"
				 @touchend="touchEndColumn"></canvas>
			</view>
		</view>
		<w-picker mode="yearMonth" startYear="2015" endYear="2030" step="1" :current="false" @confirm="onConfirm1" ref="picker1"
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
				Color: '#333',
				itemIndex: 0,
				val: '',
				tab: ['入库', '出库'],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				date: '',
				type: 1,
				summary: '',
				list: []
			}
		},
		components: {
			wPicker
		},
		onLoad() {
			let myDate = new Date();
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
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token'),
					month: this.date,
					type: this.type,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/product/Report',
						data: datas1,
						success: function(res) {
							console.log(JSON.stringify(res))
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.list = res.data.Customerdata
								self.summary = res.data.Extra.Summary
								let Column = {
									categories: [],
									series: []
								}
								let arr = []
								self.list.forEach((item) => {
									Column.categories.unshift(item.addmonth.substr(5))
									console.log(self.date)
									if (self.date == item.addmonth) {
										arr.unshift({
											"value": item.weight,
											"color": "#53bb6e",
											"textColor": "#ffffff"
										})
									} else {
										arr.unshift({
											"value": item.weight,
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
								} else {
									Column.series = [{
										"name": "出库量",
										"data": arr
									}]
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
			changeTab(k) {
				if (this.type == k + 1) {
					return
				}
				this.itemIndex = k
				this.type = k + 1
				this.init()
			},
			showType() {
				this.$refs.picker1.show()
			},
			onConfirm1(e) {
				console.log(JSON.stringify(e))
				this.val = `${e.checkArr[0][0]}年${e.checkArr[0][1]}月`
				this.date = e.result
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

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			.head {
				width: 100%;
				height: 70upx;
				padding: 0 28upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 15px;
				color: #333;

				.time {
					display: flex;
					align-items: center;

					img {
						width: 30upx;
						height: 30upx;
						margin-left: 12upx;
					}

					.choice {
						padding: 8upx 24upx;
						font-size: 14px;

						&.active {
							border-radius: 4px;
							background: #eee;
						}
					}
				}
			}

			.total {
				width: 100%;
				height: 80upx;
				display: flex;
				align-items: center;
				background: #eee;
				padding: 0 28upx;
				box-sizing: border-box;
				margin: 24upx 0;
			}

			.count {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				padding: 0 28upx;
				box-sizing: border-box;
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
		}
	}
</style>
