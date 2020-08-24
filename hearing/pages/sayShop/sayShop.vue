<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">提交订单</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="items">
				<view class="items_list" style="margin-bottom: 30rpx;">
					<view class="items_name">选择时间</view>
					<input @tap="choiceTime" type="text" v-model="time1" placeholder="请选择时间" disabled>
				</view>
				<view class="items_list" style="margin-bottom: 30rpx;">
					<view class="items_name">姓名</view>
					<input type="text" v-model="user" placeholder="请填写姓名">
				</view>
				<view class="items_list">
					<view class="items_name">联系方式</view>
					<input type="text" v-model="call" placeholder="请填写联系方式">
				</view>
			</view>
		</view>
		<view class="btns" @tap="goResult">立即预约</view>
		<KXDateTime ref="date" :visible='1' :data='date' :end='enddate' :start='startdate' @rundata='kxdatetime'></KXDateTime>
	</view>
</template>

<script>
	import KXDateTime from "../../components/kx-datetime/kx-datetime.vue"
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#fff',
				backColor: '#06A5C4',
				time: '',
				time1: '',
				user: '',
				call: '',
				shopId: '',
				date: '',
				startdate: '',
				enddate: '2030-1-1 00:00'
			}
		},
		components: {
			KXDateTime
		},
		onLoad(option) {
			this.shopId = option.id
			let date = new Date()
			this.startdate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + '00:00'
			console.log(this.startdate)
		},
		methods: {
			goResult() {
				let self = this
				if (this.time == '') {
					Toast.showToast('请选择日期')
					return
				}
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				let data1 = {
					cmd: 'saveMerchantOrder',
					uid: uni.getStorageSync('uid'),
					id: this.shopId,
					name: this.user,
					phone: this.call,
					appointment_date: this.time
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.navigateTo({
									url: '/pages/result/result?type=0'
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			choiceTime() {
				this.$refs.date.open()
			},
			kxdatetime(e) {
				this.time1 = e
				this.time = new Date(e).getTime()
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

		.wrapper {
			width: 100%;
			height: 300rpx;
			background: #f6f6f6;
			position: relative;
			background: #06A5C4;

			.items {
				width: 92%;
				padding: 24rpx 24rpx 40rpx;
				box-sizing: border-box;
				border-radius: 4px;
				position: absolute;
				top: 40rpx;
				left: 4%;
				display: flex;
				flex-direction: column;
				background: #fff;

				.items_list {
					width: 100%;
					display: flex;
					flex-direction: column;

					.items_name {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 28rpx;
						color: #333;
					}

					input {
						width: 100%;
						height: 70rpx;
						padding: 0 20rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						color: #333;
						background: #f6f6f6;
					}
				}
			}
		}

		.btns {
			width: 92%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			font-weight: 600;
			border-radius: 4px;
			background: #06A5C4;
			position: absolute;
			left: 4%;
			bottom: 30rpx;
		}
	}
</style>
