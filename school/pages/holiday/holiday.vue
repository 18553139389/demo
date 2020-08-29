<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" :backColor="backColor" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">请假</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="user">
				<view class="user-left">
					<image src="../../static/images/logo.png" v-if="head == ''"></image>
					<image :src="head" v-if="head"></image>
					<view class="user-box">
						<view style="font-weight: 600;font-family: PingFang-SC-Bold;" class="users">{{userInfo.username}}</view>
						<view>{{userInfo.classisName}}</view>
					</view>
				</view>
				<view class="user-right">
					<view>剩余<text style="color: #F91D37;">{{userInfo.qty}}</text>餐</view>
					<view style="padding: 4rpx 20rpx;border-radius: 30px;border: 1px solid #eee;" @tap="goOrder">我的账单</view>
				</view>
			</view>
			<view class="date">
				<uni-calendar :range="info.range" :showMonth="false" @change="change" @monthSwitch="monthSwitch" />
				<view class="send">
					<view class="send-left">
						<view style="margin-bottom: 12rpx;">本月已请假：</view>
						<view>{{day}}天</view>
					</view>
					<view class="send-right">
						<view class="send-btn" @tap="goHoliday" style="margin-right: 28rpx;">请假</view>
						<view class="send-btn" @tap="goNotice">请假结果</view>
					</view>
				</view>
				<view class="warn">
					<view style="margin-bottom: 8rpx;">请假规则：</view>
					<view style="margin-bottom: 8rpx;">1、每天14：30之前可请明天的假</view>
					<view>2、14：30以后只能请后天以后的假</view>
				</view>
			</view>
		</view>
		<view class="bg" v-if="show">
			<view class="bg-list">
				<view class="bg-title">
					<view class="bg-name">
						<text>温馨提示</text>
						<view class="close" @tap="goClose">X</view>
					</view>
				</view>
				<view class="bg-warn">你确定要请假吗？</view>
				<view class="dates">日期：{{startDate}}<text v-if="endDate">至{{endDate}}</text></view>
				<view class="btns">
					<view class="btn" @tap="goCancel">取消</view>
					<view class="btn" style="color: #FFFFFF;background: #F91D37;" @tap="goSure">确定</view>
				</view>
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
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				show: false,
				startDate: '',
				endDate: '',
				userInfo: {},
				dayList: [],
				day: 0,
				head: ''
			}
		},
		onShow() {
			this.init()
			this.getDay()
		},
		methods: {
			init() {
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
							self.userInfo = res.data
							self.head = self.userInfo.icon
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			getDay() {
				let self = this
				let date = new Date()
				date.getFullYear()
				date.getMonth()
				let time = date.getFullYear() + '-' + (date.getMonth() + 1)
				let data1 = {
					studentId: uni.getStorageSync('studentId'),
					month: time
				}
				let data = {
					url: '/leaveLog',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.day = res.data.dataList.length
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			change(e) {
				console.log('change 返回:', e)
				this.dayList = []
				if(e.range.data.length == 0) {
					this.startDate = e.range.before
					this.endDate = e.range.after
					this.dayList.push(e.range.before)
				} else {
					if(new Date(e.range.before).getTime() > new Date(e.range.after).getTime()) {
						this.startDate = e.range.after
						this.endDate = e.range.before
					} else {
						this.startDate = e.range.before
						this.endDate = e.range.after
					}
					this.dayList = e.range.data
				}
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			goClose() {
				this.show = false
			},
			goCancel() {
				this.show = false
			},
			goSure() {
				let self = this
				let data1 = {
					studentId: uni.getStorageSync('studentId'),
					dates: this.dayList
				}
				let data = {
					url: '/addLeave',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.show = false
							uni.navigateTo({
							    url: '/pages/send/send'
							})
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			goHoliday() {
				if(this.startDate == '') {
					Toast.showToast('请选择请假日期')
					return
				}
				this.show = true
			},
			goOrder() {
				uni.navigateTo({
				    url: '/pages/orderList/orderList'
				})
			},
			goNotice() {
				uni.navigateTo({
				    url: '/pages/message/message'
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
		background: #f7f7f7;
		
		.fixed {
			width: 100%;
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
				
				.bg-warn {
					width: 100%;
					font-size: 28rpx;
					color: #333;
					margin: 28rpx 0;
					text-align: center;
					font-weight: 600;
				}
				
				.dates {
					width: 100%;
					text-align: center;
					font-size: 28rpx;
					color: #333;
				}
				
				.btns {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					margin-top: 30rpx;
					
					.btn {
						width: 180rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 24px;
						border: 1px solid #eee;
					}
				}
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;
			
			.user {
				width: 100%;
				border-radius: 4px;
				box-shadow: 0 1px 4px rgba(0,0,0,.2);
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				background: #FFFFFF;
				
				.user-left {
					width: 50%;
					display: flex;
					border-right: 1px solid #eee;
					
					image {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
					}
					
					.user-box {
						height: 110rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						font-size: 26rpx;
						color: #333;
						margin-left: 24rpx;
						
						.users {
							font-size: 28rpx;
							font-weight: 600;
						}
					}
				}
				
				.user-right {
					width: 50%;
					height: 110rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 26rpx;
					color: #333;
					justify-content: space-around;
				}
			}
			
			.date {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 4px;
				background: #FFFFFF;
				margin-top: 30rpx;
				
				.send {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 36rpx;
					box-sizing: border-box;
					margin-top: 10rpx;
					
					.send-left {
						display: flex;
						flex-direction: column;
						font-size: 28rpx;
						color: #333;
					}
					
					.send-right {
						display: flex;
						align-items: center;
						
						.send-btn {
							width: 140rpx;
							height: 50rpx;
							line-height: 50rpx;
							text-align: center;
							font-size: 28rpx;
							color: #FFFFFF;
							border-radius: 20px;
							background: #F91D37;
						}
					}
				}
				
				.warn {
					width: 100%;
					padding: 28rpx 36rpx;
					box-sizing: border-box;
					border-radius: 4px;
					background: #F0F0F0;
					display: flex;
					flex-direction: column;
					font-size: 26rpx;
					color: #FF7133;
					margin-top: 30rpx;
				}
			}
		}
	}
</style>
