<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :isIcons="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @tap="Back">
				<block slot="backText"></block>
				<block slot="content">收购详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="bg">
				<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#FFFFFF">
					<swiper-item v-if="videoUrl">
						<video id="demoVideo" class="video" :src="videoUrl" controls>
							<!-- <cover-image class="controls-play" :src="videoImg" @tap="goPlay"></cover-image> -->
						</video>
					</swiper-item>
					<swiper-item v-for="(v,k) in list.images" :key="k">
						<image class="logo" :src="v" @tap="goPreview(k)"></image>
					</swiper-item>
				</swiper>
				<view class="icons">
					<button open-type="share">
						<image class="icon" src="../../static/images/share.png"></image>
					</button>
					<image class="icon" v-if="list.iscoll == 1" src="../../static/images/store.png" @tap="goStore"></image>
					<image class="icon" v-if="list.iscoll == 0" src="../../static/images/store1.png" @tap="goStore"></image>
					<image src="../../static/images/friend.png" class="friend" mode="widthFix"></image>
				</view>
			</view>
			<view class="produce">
				<view class="produce-left">
					<view class="titles">{{list.name}}</view>
					<view class="all">
						<!-- <view style="font-size: 28rpx;color: #FF0000;font-weight: 600;">￥{{list.price}}</view> -->
						<view style="font-size: 28rpx;color: #FF411B;">有效期：{{list.termofvalidity}}</view>
					</view>
				</view>
				<view class="produce-right">浏览量：{{list.looknum}}</view>
			</view>
			<view class="service">
				<view class="service-item" style="margin-bottom: 28rpx;">
					<image src="../../static/images/wx.png"></image>
					<view>客服微信：{{list.weixin}}</view>
				</view>
				<view class="service-item" @tap="goCalls">
					<image src="../../static/images/phone.png"></image>
					<view>{{list.phone}}</view>
				</view>
			</view>
			<view class="next">
				<view class="step">
					<view class="step-title">一、公司介绍</view>
					<!-- <view class="content">{{list.introduce}}</view> -->
					<u-parse :content="list.introduce" />
				</view>
				<view class="step">
					<view class="step-title">二、公司基本情况调查</view>
					<!-- <view class="content">{{list.guarantees}}</view> -->
					<u-parse :content="list.guarantees" />
				</view>
				<!-- <view class="step">
					<view class="step-title">三、业务流程</view>
					<image src="../../static/images/step.png" mode="widthFix"></image>
				</view> -->
			</view>
			<view class="hot" style="margin-top: 40rpx;" v-if="aboutList.length > 0">
				<view class="titles">
					<view class="titles-left">
						<view class="bigs">相关推荐</view>
					</view>
				</view>
				<view class="lists">
					<view class="item" v-for="(v,k) in aboutList" :key="k" @tap="goDetail(v.cid)">
						<image :src="v.image"></image>
						<view class="item-right">
							<view class="item-tit">{{v.name}}</view>
							<view class="box" @tap.stop="">
								<!-- <view>￥{{v.price}}</view> -->
								<view style="color: #FF411C;font-weight: 500;">有效期：{{v.termofvalidity}}</view>
								<image src="../../static/images/call.png" @tap="goCall(v.phone)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn" @tap="goOrder">立即下单</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uParse from '../../components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				Color: '#333',
				list: {},
				aboutList: [],
				ids: '',
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				type: 0,
				videoImg: '',
				videoUrl: ''
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.ids = option.id
			this.type = option.type
			this.videoCtx = uni.createVideoContext('demoVideo')
			this.init(option.id)
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '收购详情',
				path: '/pages/buyDetail/buyDetail?id=' + this.ids + '&type=0'
			}
		},
		methods: {
			goOrder() {
				uni.navigateTo({
					url: '/pages/goOrder/goOrder?id=' + this.ids
				})
			},
			goPlay() {
				this.videoCtx.play()
			},
			init(id) {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					cid: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'certificatesdetail',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataobject
								self.videoImg = res.data.dataobject.videoimage
								self.videoUrl = res.data.dataobject.videourl
								if (res.data.dataList) {
									self.aboutList = res.data.dataList
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/buyDetail/buyDetail?id=' + id
				})
			},
			goCall(n) {
				uni.makePhoneCall({
					phoneNumber: n
				})
			},
			goStore() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					cid: this.ids
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'certificatescoll',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (self.list.iscoll == 0) {
									self.list.iscoll = 1
									Toast.showToast('收藏成功')
								} else {
									self.list.iscoll = 0
									Toast.showToast('取消收藏')
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			Back() {
				if(this.type == 0) {
					uni.redirectTo({
					    url: '/pages/buy/buy'
					})
				} else {
					uni.navigateBack({
					    delta: 1
					})
				}
			},
			goCalls() {
				uni.makePhoneCall({
				    phoneNumber: this.list.phone
				})
			},
			goPreview(k) {
				uni.previewImage({
					current: k,
					urls: this.list.images
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
		align-items: center;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			.bg {
				width: 100%;
				height: 360rpx;
				position: relative;

				.bgs {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				
				swiper {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				
					swiper-item {
						width: 100%;
						height: 360rpx;
				
						image {
							width: 100%;
							height: 100%;
						}
						
						.video {
							width: 100%;
							height: 100%;
							position: relative;
							
							.controls-play {
								width: 100%;
								height: 100%;
								position: absolute;
								top: 0;
								left: 0;
							}
						}
					}
				}

				.icons {
					width: 100%;
					height: 90rpx;
					display: flex;
					align-items: center;
					flex-direction: row-reverse;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 99;
					
					button {
						background: none;
						margin: 0;
						padding: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						border: none;
						outline: none;
					}
					
					button:after {
						border: none;
					}

					.icon {
						width: 60rpx;
						height: 60rpx;
						margin-right: 30rpx;
					}
					
					.friend {
						width: 240rpx;
						position: absolute;
						top: 80rpx;
						right: 20rpx;
					}
				}
			}

			.produce {
				width: 100%;
				padding: 36rpx 28rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 10rpx solid #eee;

				.produce-left {
					display: flex;
					flex-direction: column;

					.titles {
						font-size: 30rpx;
						color: #333;
						font-weight: 600;
					}

					.all {
						display: flex;
						align-items: center;
						margin-top: 20rpx;
					}
				}

				.produce-right {
					padding: 12rpx 24rpx;
					border-radius: 30px;
					background: #E5FFE5;
					font-size: 26rpx;
					color: #00C700;
				}
			}

			.service {
				width: 100%;
				padding: 36rpx 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid #eee;

				.service-item {
					width: 100%;
					height: 80rpx;
					border-radius: 4px;
					background: #F5F5F5;
					padding: 0 24rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;

					image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 24rpx;
					}
				}
			}

			.next {
				width: 100%;
				padding: 36rpx 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid #eee;

				.step {
					width: 100%;
					display: flex;
					flex-direction: column;
					margin-bottom: 30rpx;

					.step-title {
						font-size: 30rpx;
						font-weight: 600;
						color: #00C700;
						margin-bottom: 28rpx;
					}

					.content {
						font-size: 26rpx;
						color: #666;
						line-height: 20px;
					}

					image {
						width: 100%;
					}
				}
			}

			.hot {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;

				.titles {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.titles-left {
						display: flex;
						flex-direction: column;
						font-size: 28rpx;
						color: #666;

						.bigs {
							font-size: 36rpx;
							color: #333;
							font-weight: 600;
							position: relative;
						}

						.bigs:before {
							content: '';
							position: absolute;
							top: 0;
							right: -30rpx;
							width: 8rpx;
							height: 8rpx;
							border-radius: 50%;
							border: 6rpx solid #00C800;
						}
					}
				}

				.lists {
					width: 100%;
					display: flex;
					flex-direction: column;

					.item {
						display: flex;
						padding: 40rpx 0;
						border-bottom: 1px solid #eee;

						image {
							width: 220rpx;
							height: 140rpx;
							border-radius: 6px;
						}

						.item-right {
							width: 72%;
							height: 140rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							font-size: 30rpx;
							color: #333;
							font-weight: 600;
							padding-left: 24rpx;
							box-sizing: border-box;

							.box {
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;
								font-size: 30rpx;
								color: #FF0000;

								.item-tit {
									width: 100%;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}

								image {
									width: 38rpx;
									height: 38rpx;
								}
							}
						}

						.item-rights {
							width: 72%;
							height: 140rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 30rpx;
							color: #999;
							padding-left: 24rpx;
							box-sizing: border-box;
						}
					}

					.item:last-child {
						border-bottom: none;
					}
				}
			}

			.btn {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				margin: 40rpx auto;
				border-radius: 30px;
				background: #00C700;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
</style>
