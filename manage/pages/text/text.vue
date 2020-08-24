<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="title">单号：{{record.billno}}</view>
			<view class="message">
				<view class="message-list">
					<view class="message-left">#</view>
					<view class="message-right">信息</view>
				</view>
				<view class="message-list">
					<view class="message-left">车牌</view>
					<view class="message-right">{{record.carnum}}</view>
				</view>
				<view class="message-list">
					<view class="message-left">时间</view>
					<view class="message-right">{{record.addtime}}</view>
				</view>
				<view class="message-list">
					<view class="message-left">毛重</view>
					<view class="message-right">{{record.allweight}}</view>
				</view>
				<view class="message-list">
					<view class="message-left">皮重</view>
					<view class="message-right">{{record.selfweight}}</view>
				</view>
				<view class="message-list" style="border-bottom: 1px solid #eee;">
					<view class="message-left">净重</view>
					<view class="message-right">{{record.goodsweight}}</view>
				</view>
			</view>
			<view class="pic">进出照片</view>
			<view class="list">
				<view class="list-item" v-for="(v,k) in list.imgs" :key="k">
					<view class="list-title">
						<view>时间：{{v.addtime}}</view>
						<view>相机：{{v.portid}}</view>
					</view>
					<view class="list-pic">
						<image :src="v.img" @tap="goPreview(k)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				title: '',
				list: {},
				record: {},
				arr: []
			}
		},
		onLoad(option) {
			this.title = option.title
			this.init(option.billno, option.apisecret)
		},
		methods: {
			init(billno, apisecret) {
				let self = this
				let datas = {
					billno,
					apisecret,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/truck/view',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.list = res.data.Customerdata
								self.record = self.list.record
								self.list.imgs.forEach((item,index) => {
									self.arr.push(item.img)
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
			goPreview(k) {
				uni.previewImage({
					urls: this.arr,
					current: k
				})
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
			padding: 0 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.title {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 36rpx;
				color: #333;
				font-weight: 600;
			}

			.message {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-bottom: 40rpx;

				.message-list {
					width: 100%;
					height: 70rpx;
					border-top: 1px solid #eee;
					border-left: 1px solid #eee;
					border-right: 1px solid #eee;
					display: flex;

					.message-left {
						width: 20%;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 30rpx;
						color: #333;
						padding: 0 0 0 24rpx;
						box-sizing: border-box;
						border-right: 1px solid #eee;
					}

					.message-right {
						width: 70%;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 30rpx;
						color: #333;
						padding: 0 0 0 24rpx;
						box-sizing: border-box;
					}
				}
			}

			.pic {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 30rpx;
				color: #333;
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;

				.list-item {
					width: 100%;
					border: 1px solid #eee;
					border-radius: 4px;
					box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
					margin-bottom: 28rpx;

					.list-title {
						width: 100%;
						height: 100rpx;
						padding: 0 28rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #333;
					}

					.list-pic {
						width: 100%;
						border-top: 1px solid #eee;
						padding: 28rpx;
						box-sizing: border-box;
						background: #F5F5F5;

						image {
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
