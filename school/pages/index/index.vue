<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :backColor="backColor" bgColor="bg-shadeTop text-white" @goLeft="goLeft">
				<block slot="backText">
					<view class="left">
						<view>{{name}}</view>
						<image src="../../static/images/select.png"></image>
					</view>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="warn" v-if="qty == 0">
				<view>您还未充值套餐</view>
				<view class="enter" @tap="goMoney">去充值</view>
			</view>
			<view class="warn" v-if="qty > 0">
				<view>您的套餐还剩{{qty}}餐</view>
			</view>
			<view class="box">
				<view class="box-title">本周菜谱</view>
				<view class="list">
					<view class="item" style="background: #eeeeff;" @tap="goDetail(weekList1)" v-if="weekList1 == 1">
						<image src="../../static/images/zhouyi.png"></image>
						<view class="day">周一</view>
						<view class="date">（{{arr[0]}}）</view>
					</view>
					<view class="item" style="background: #fce3db;margin-right: 0;" @tap="goDetail(weekList2)" v-if="weekList2 == 2">
						<image src="../../static/images/zhouer.png"></image>
						<view class="day">周二</view>
						<view class="date">（{{arr[1]}}）</view>
					</view>
					<view class="item" style="background: #ffe9cc;" @tap="goDetail(weekList3)" v-if="weekList3 == 3">
						<image src="../../static/images/zhousan.png"></image>
						<view class="day">周三</view>
						<view class="date">（{{arr[2]}}）</view>
					</view>
					<view class="item" style="background: #f5f4d6;margin-right: 0;" @tap="goDetail(weekList4)" v-if="weekList4 == 4">
						<image src="../../static/images/zhousi.png"></image>
						<view class="day">周四</view>
						<view class="date">（{{arr[3]}}）</view>
					</view>
					<view class="item" style="background: #f5f4d6;" @tap="goDetail(weekList5)" v-if="weekList5 == 5">
						<image src="../../static/images/zhouwu.png"></image>
						<view class="day">周五</view>
						<view class="date">（{{arr[4]}}）</view>
					</view>
					<view class="item" style="background: #eeeeff;margin-right: 0;" @tap="goDetail(weekList6)" v-if="weekList6 == 6">
						<image src="../../static/images/zhouliu.png"></image>
						<view class="day">周六</view>
						<view class="date">（{{arr[5]}}）</view>
					</view>
					<view class="item" style="background: #fce3db;" @tap="goDetail(weekList7)" v-if="weekList7 == 7">
						<image src="../../static/images/zhouri.png"></image>
						<view class="day">周日</view>
						<view class="date">（{{arr[6]}}）</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg" v-if="show">
			<view class="bg-list">
				<view class="bg-title">
					<view class="bg-name">
						<text>切换学生</text>
						<view class="close" @tap="goClose">X</view>
					</view>
				</view>
				<view class="bg-content">选择哪个学生，小程序中将展示哪个学生的数据</view>
				<view class="bg-item">
					<view class="student" v-for="(v,k) in studentLists" :key="k" @tap="goStudent(v.username, v.studentId)">
						<image src="../../static/images/logo.png"></image>
						<view class="user">
							<view style="color: #333;">{{v.username}}</view>
							<view>{{v.school}}{{v.classis}}</view>
						</view>
					</view>
				</view>
				<view class="add" @tap="goAdd">添加新学生</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#f7f7f7',
				arr: [],
				show: false,
				name: '',
				studentLists: [],
				weekList: [],
				qty: 0,
				weekList1: 0,
				weekList2: 0,
				weekList3: 0,
				weekList4: 0,
				weekList5: 0,
				weekList6: 0,
				weekList7: 0
			}
		},
		onShow() {
			// d是当前星期一的日期对象
			var d = this.getMonDate()
			for (var i = 0; i < 7; i++) {
				this.arr.push(d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + ((d.getMonth() + 1))) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()))
				d.setDate(d.getDate() + 1)
			}
			this.name = uni.getStorageSync('student')
			this.getList()
			this.studentList()
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				let self = this
				let data1 = {
					studentId: uni.getStorageSync('studentId')
				}
				let data = {
					url: '/studentInfo',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.qty = res.data.qty
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			getMonDate() {
				var d = new Date(),
					day = d.getDay(),
					date = d.getDate()
				if (day == 1)
					return d
				if (day == 0)
					d.setDate(date - 6)
				else
					d.setDate(date - day + 1)
				return d
			},
			goLeft() {
				this.show = true
			},
			goClose() {
				this.show = false
			},
			goDetail(type) {
				let ids = ''
				for(let i=0;i<this.weekList.length;i++) {
					if(type == this.weekList[i].type) {
						ids = this.weekList[i].recipeId
					}
				}
				uni.navigateTo({
				    url: '/pages/detail/detail?date=' + this.arr[type] + '&id=' + ids
				})
			},
			studentList() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				let data = {
					url: '/studentList',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.studentLists = res.data.dataList
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			goAdd() {
				uni.navigateTo({
				    url: '/pages/adds/adds'
				})
			},
			getList() {
				let self = this
				let data1 = {
					studentId: uni.getStorageSync('studentId')
				}
				let data = {
					url: '/recipeList',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.weekList = res.data.dataList
							for(let i=0;i<res.data.dataList.length;i++) {
								if(res.data.dataList[i].type == 1) {
									self.weekList1 = 1
								}
								if(res.data.dataList[i].type == 2) {
									self.weekList2 = 2
								}
								if(res.data.dataList[i].type == 3) {
									self.weekList3 = 3
								}
								if(res.data.dataList[i].type == 4) {
									self.weekList4 = 4
								}
								if(res.data.dataList[i].type == 5) {
									self.weekList5 = 5
								}
								if(res.data.dataList[i].type == 6) {
									self.weekList6 = 6
								}
								if(res.data.dataList[i].type == 7) {
									self.weekList7 = 7
								}
							}
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			goStudent(name, id) {
				this.show = false
				uni.setStorageSync('student', name)
				uni.setStorageSync('studentId', id)
				this.name = uni.getStorageSync('student')
				this.getUserInfo()
				this.getList()
				this.weekList1 = 0
				this.weekList2 = 0
				this.weekList3 = 0
				this.weekList4 = 0
				this.weekList5 = 0
				this.weekList6 = 0
				this.weekList7 = 0
			},
			goMoney() {
				uni.switchTab({
				    url: '/pages/order/order'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f7f7f7;
		display: flex;
		flex-direction: column;
		align-items: center;

		.fixed {
			width: 100%;

			.left {
				display: flex;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 24rpx;
				}
			}
		}
		
		.bg {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.4);
			z-index: 999999999;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.bg-list {
				width: 80%;
				padding: 28rpx 0;
				box-sizing: border-box;
				border-radius: 6px;
				background: #FFFFFF;
				
				.bg-title {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					
					.bg-name {
						width: 100%;
						text-align: center;
						position: relative;
						
						.close {
							position: absolute;
							top: 6rpx;
							right: 28rpx;
							font-size: 30rpx;
							color: #333;
						}
					}
				}
				
				.bg-content {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 26rpx;
					color: #FF7133;
					background: #F0F0F0;
					margin: 24rpx 0;
				}
				
				.bg-item {
					width: 100%;
					padding: 0 28rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					
					.student {
						display: flex;
						margin-bottom: 28rpx;
						
						image {
							width: 90rpx;
							height: 90rpx;
							border-radius: 50%;
						}
						
						.user {
							height: 90rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							font-size: 24rpx;
							color: #666;
							margin-left: 28rpx;
						}
					}
				}
				
				.add {
					width: 200rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 28rpx;
					color: #FFFFFF;
					background: #F91D37;
					border-radius: 30px;
					margin: 0 auto;
				}
			}
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;

			.warn {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #3c3c3c;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;
				color: #e5c086;

				.enter {
					padding: 4rpx 24rpx;
					border-radius: 24px;
					background: #e5c086;
					color: #3c3c3c;
				}
			}

			.box {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 6px;
				margin-top: 30rpx;

				.box-title {
					width: 100%;
					font-size: 30rpx;
					color: #333;
					text-align: center;
					font-weight: 600;
					font-family: PingFang-SC-Bold;
				}

				.list {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					margin-top: 30rpx;

					.item {
						width: 48%;
						display: flex;
						flex-direction: column;
						align-items: center;
						border-radius: 4px;
						// margin-right: 4%;
						margin-bottom: 4%;

						image {
							width: 160rpx;
							height: 130rpx;
						}

						.day {
							width: 100%;
							font-size: 26rpx;
							font-weight: 600;
							color: #3c3c3c;
							text-align: center;
							margin: 16rpx 0;
						}

						.date {
							width: 100%;
							font-size: 26rpx;
							color: #999;
							text-align: center;
							margin-bottom: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
