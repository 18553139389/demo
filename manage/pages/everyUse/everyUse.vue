<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{dw}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list" style="padding-top: 0;" v-for="(v,k) in list" :key="k">
				<view class="top" :style="{top:top + 'px'}">
					<view class="time" @tap="showType">
						<view v-if="tab == 0">{{v.addmonth}}</view>
						<view v-if="tab == 1">{{v.addyear}}年</view>
						<image src="../../static/images/selects.png"></image>
					</view>
					<view class="name">总用量</view>
					<view class="unit">{{v.goodsweight}}{{v.unit}}</view>
				</view>
				<view class="list-item">
					<view class="item" v-for="(ite,ind) in v.items" :key="ind" @tap="goDetail(ite.goodsname, k)">
						<view class="item-left">{{ite.goodsname}}</view>
						<view class="item-right">
							<view>{{ite.goodsweight}}{{ite.unit}}</view>
							<image src="../../static/images/rights.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<jPicker class="cont" ref="picker" @sure="bookChange" :showKey="tab == 0 ? 'addmonth' : 'addyear'" valKey="BID" :val="bookVal"
		 :options="time" />
	</view>
</template>

<script>
	import Vue from 'vue'
	import jPicker from '../../components/J-Picker/jPicker.vue'
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import wPicker from "../../components/w-picker/w-picker.vue"
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
				weight: ''
			}
		},
		components: {
			wPicker,
			jPicker
		},
		onLoad(option) {
			console.log(option)
			this.top = Vue.prototype.CustomBar
			this.tab = option.tab
			this.dw = option.dw
			this.date = option.date
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas1 = {}
				let url = ''
				if (this.tab == 0) {
					url = '/api/AppDataReport/TypeMonthAndDw2GoodsList2'
					datas1 = {
						token: uni.getStorageSync('token'),
						inorout: 2,
						addmonth: this.date,
						dw: this.dw,
						os: uni.getSystemInfoSync().platform,
						osversion: uni.getSystemInfoSync().system,
						appversion: uni.getStorageSync('appversion')
					}
				} else {
					url = '/api/AppDataReport/TypeYearAndDw2GoodsList2'
					datas1 = {
						token: uni.getStorageSync('token'),
						inorout: 2,
						addyear: this.date,
						dw: this.dw,
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
							self.list = res.data.Customerdata
							self.allList = res.data.Customerdata
							self.time = []
							self.list.forEach((item,index) => {
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
					}
				}
				ajax(data)
			},
			showType() {
				this.$refs.picker.showPicker()
			},
			goDetail(name,k) {
				if(this.tab == 0) {
					this.date = this.allList[k].addmonth
				} else {
					this.date = this.allList[k].addyear
				}
				uni.navigateTo({
					url: '/pages/useCar/useCar?date=' + this.date + '&tab=' + this.tab + '&dw=' + this.dw + '&name=' + name
				})
			},
			bookChange(e) {
				let list = this.allList
				if (this.tab == 0) {
					this.date = e.addmonth
					list.forEach((item,index) => {
						if(item.addmonth == e.addmonth) {
							let arr = []
							for(let i=index;i<this.allList.length;i++) {
								arr.push(list[i])
							}
							this.list = arr
						}
					})
				} else {
					this.date = e.addyear
					list.forEach((item,index) => {
						if(item.addyear == e.addyear) {
							let arr = []
							for(let i=index;i<this.allList.length;i++) {
								arr.push(list[i])
							}
							this.list = arr
						}
					})
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
				background: #00AAEF;
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

				.list-item {
					width: 100%;
					padding: 28rpx;
					box-sizing: border-box;
					border-top-left-radius: 12px;
					border-top-right-radius: 12px;
					background: #fff;
					display: flex;
					flex-direction: column;

					.item {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28rpx;
						color: #333;

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
	}
</style>
