<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">我的</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="user">
				<view class="user-left" @tap="goUser">
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
			<view class="order">
				<view class="name">我的订单</view>
				<view class="content">剩余：{{userInfo.qty}}餐</view>
				<view class="content">请假：{{day}}天</view>
				<view class="content">预计到期日期：{{userInfo.endDate}}</view>
			</view>
			<view class="list">
				<view class="item" @tap="goSuggest">
					<image src="../../static/images/wode_yijian.png"></image>
					<view>意见反馈</view>
				</view>
				<view class="item" style="margin-right: 0;" @tap="goUs">
					<image src="../../static/images/wode_women.png"></image>
					<view>关于我们</view>
				</view>
				<view class="item" @tap="goCall">
					<image src="../../static/images/wode_laoshi.png"></image>
					<view>联系老师</view>
				</view>
				<view class="item" style="margin-right: 0;" @tap="goMessage">
					<image src="../../static/images/wode_xiaoxi.png"></image>
					<view>我的消息</view>
				</view>
			</view>
			<view class="link">客服热线：<text style="color: #FFC62C;">{{userInfo.customerPhone}}</text></view>
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
				userInfo: {},
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
			goOrder() {
				uni.navigateTo({
				    url: '/pages/orderList/orderList'
				})
			},
			goUser() {
				uni.navigateTo({
				    url: '/pages/user/user'
				})
			},
			goSuggest() {
				uni.navigateTo({
				    url: '/pages/suggest/suggest'
				})
			},
			goMessage() {
				uni.navigateTo({
				    url: '/pages/message/message'
				})
			},
			goUs() {
				uni.navigateTo({
				    url: '/pages/web/web'
				})
			},
			goCall() {
				uni.makePhoneCall({
				    phoneNumber: this.userInfo.teacherPhone
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
			
			.order {
				width: 100%;
				border-radius: 4px;
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				background: #FFFFFF;
				margin-top: 30rpx;
				
				.name {
					font-size: 28rpx;
					font-weight: 600;
				}
				
				.content {
					font-size: 26rpx;
					color: #666;
					margin-top: 20rpx;
				}
			}
			
			.list {
				width: 100%;
				border-radius: 4px;
				padding: 28rpx 0 0 0;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				
				.item {
					width: 48%;
					border-radius: 4px;
					background: #FFFFFF;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					padding: 36rpx 0;
					margin-right: 4%;
					margin-bottom: 4%;
					
					image {
						width: 120rpx;
						height: 120rpx;
						margin-bottom: 12rpx;
					}
				}
			}
			
			.link {
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				color: #666;
			}
		}
	}
</style>
