<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">会员中心</block>
			</cu-custom>
		</view>
		<view class="bg">
			<image class="bgs" src="../../static/images/vip_bg.png"></image>
			<view class="vip">
				<view class="user">
					<view class="user-left">
						<image :src="list.headImage"></image>
						<view class="user-msg">
							<view>{{list.nickName}}</view>
							<image class="vip-img" src="../../static/images/vip.png"></image>
						</view>
					</view>
					<view class="share">享受会员权益</view>
				</view>
				<view class="btn">
					<view class="time">{{list.VipToDate}}</view>
					<view class="open" v-if="list.isVip == 'N'">未开通</view>
					<view class="open" v-if="list.isVip == 'Y'">已开通</view>
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="titles">会员权益</view>
			<image :src="list.quanyiImage"></image>
			<view class="buy" v-if="list.isVip == 'N'" @tap="buy">购买会员</view>
			<view class="buy" v-if="list.isVip == 'Y'" @tap="buy">续费</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				list: {}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(id, index) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/vipCenter',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			buy() {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/payOrder ',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: res.data.body.timeStamp,
									nonceStr: res.data.body.nonceStr,
									package: res.data.body.package,
									signType: res.data.body.signType,
									paySign: res.data.body.paySign,
									success(res) {
										uni.navigateTo({
										    url: '/pages/result/result?type=' + self.list.isVip
										})
									},
									fail(err) {
										Toast.showToast('支付失败')
									}
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						},
						complete(err) {
							console.log(err,'失败原因')
						}
					}
					ajax(data)
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
		background: #ffffff;

		.fixed {
			width: 100%;
		}

		.bg {
			width: 100%;
			padding: 150rpx 28rpx 0;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			box-shadow: 0 1px 5px rgba(0, 0, 0, .2);

			.bgs {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 0;
			}

			.vip {
				position: relative;
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				background: #fff;
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				display: flex;
				flex-direction: column;
				z-index: 9999;

				.user {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.user-left {
						display: flex;

						image {
							width: 110rpx;
							height: 110rpx;
							border-radius: 50%;
						}

						.user-msg {
							height: 110rpx;
							padding-left: 24rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							font-size: 30rpx;
							color: #333;

							.vip-img {
								width: 154rpx;
								height: 42rpx;
								border-radius: 0;
							}
						}
					}

					.share {
						height: 110rpx;
						font-size: 26rpx;
						color: red;
					}
				}

				.btn {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 30rpx;

					.time {
						font-size: 26rpx;
						color: #666;
					}

					.open {
						width: 140rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						font-size: 30rpx;
						color: #fff;
						border-radius: 30px;
						background: #866C40;
					}
				}
			}
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
			margin-top: 320rpx;
			padding: 0 28rpx;
			box-sizing: border-box;

			.titles {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 30rpx;
				color: #333;
				padding-left: 20rpx;
				position: relative;
			}

			.titles:before {
				content: '';
				width: 2px;
				height: 30rpx;
				border-radius: 4px;
				background: #0081FF;
				position: absolute;
				top: 20rpx;
				left: 0;
			}

			image {
				width: 100%;
				height: 360rpx;
				border-radius: 4px;
				margin-top: 60rpx;
			}

			.buy {
				width: 50%;
				height: 70rpx;
				line-height: 70rpx;
				color: #fff;
				background: #9b7f46;
				border-radius: 30px;
				text-align: center;
				font-size: 30rpx;
				margin: 80rpx auto 0;
			}
		}
	}
</style>
