<template>
	<view class="contain">
		<view class="head">
			<image class="logo" src="../../static/images/logos.jpg" mode="scaleToFill"></image>
			<input type="text" placeholder="请输入关键词搜索" disabled @tap="goSearch" />
		</view>
		<view class="banner">
			<swiper class="swiper" :autoplay="autoplay" :interval="interval" circular="true">
				<swiper-item v-for="(v,k) in swiperList" :key="k" @tap="goSwiper(v)">
					<img style="width: 100%;height: 100%;" :src="v.image" alt="">
				</swiper-item>
			</swiper>
		</view>
		<view class="news">
			<view class="n-left">
				<img src="../../static/images/notice1.png" alt="">
				<view class="speaks">系统公告：</view>
			</view>
			<view class="content">
				<an-notice-bar :text="text" :showSerial="false"></an-notice-bar>
			</view>
			<div class="more" @tap="goMore">更多</div>
		</view>
		<swiper class="swiper">
			<swiper-item v-for="(item,index) in total" :key="index">
				<ul class="type">
					<li v-for="(v,k) in typeList" :key="k" v-if="k >= 8 * index && k < 8 * (index + 1)" @tap="goType(v.cid)">
						<img :src="v.image" alt="">
						<view>{{v.name}}</view>
					</li>
				</ul>
			</swiper-item>
		</swiper>
		<view class="items">
			<view class="items-title">作品展示</view>
			<scroll-view scroll-x="true" class="scroll-x">
				<view class="items-box">
					<view class="items-product" v-for="(v,k) in productList" :key="k" @tap="goProduct(v)">
						<img :src="v.image" alt="">
						<view>{{v.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="items">
			<view class="items-title">发现好物</view>
			<scroll-view scroll-x="true" class="scroll-x">
				<view class="items-box">
					<view class="items-product" v-for="(v,k) in authorList" :key="k" @tap="goPicture(v)">
						<img :src="v.image" alt="">
						<view>{{v.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import AnNoticeBar from '../../components/an-notice-bar/an-notice-bar.vue'
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				text: '还没有发布新的通知',
				autoplay: true,
				interval: 5000,
				swiperList: [],
				typeList: [],
				productList: [],
				authorList: [],
				total: 0
			}
		},
		components: {
			AnNoticeBar
		},
		onShow() {
			if (!uni.getStorageSync('uid')) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			} else {
				this.init()
			}
		},
		onLoad() {

		},
		methods: {
			init() {
				let self = this
				//获取通知列表
				let data2 = {
					cmd: 'noticeslist',
					uid: uni.getStorageSync('uid'),
					nowPage: 1,
					pageCount: 10
				}
				Toast.showLoading('', function() {
					let data = {
						data: data2,
						success: function(res) {
							console.log(res)
							let arr = []
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(res.data.dataList && res.data.dataList.length > 1) {
									for (var j = 0; j < res.data.dataList.length; j++) {
										arr.push(res.data.dataList[j].title)
									}
									self.text = arr.join('|')
								} else if(res.data.dataList && res.data.dataList.length == 1) {
									self.text = res.data.dataList[0].title
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
				
				let data1 = {
					cmd: 'homepage',
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.swiperList = res.data.bannerList
								self.total = Math.ceil(res.data.classList.length / 8)
								self.typeList = res.data.classList
								self.productList = res.data.workList
								self.authorList = res.data.painterList
								uni.setStorageSync('flag', res.data.flag)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			goType(cid) {
				uni.navigateTo({
					url: '/pages/type/type?cid=' + cid
				})
			},
			goMore() {
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			},
			goProduct(list) {
				let title = encodeURIComponent(list.name)
				list.content = list.content.replace(/%/g, '%25')
				let content = encodeURIComponent(list.content)
				let banner = JSON.stringify(list.banner)
				uni.navigateTo({
					url: `/pages/noticeDetail/noticeDetail?title=${title}&content=${content}&banner=${banner}`
				})
			},
			goPicture(list) {
				let title = encodeURIComponent(list.name)
				list.content = list.content.replace(/%/g, '%25')
				let content = encodeURIComponent(list.content)
				let banner = JSON.stringify(list.banner)
				uni.navigateTo({
					url: `/pages/noticeDetail/noticeDetail?title=${title}&content=${content}&banner=${banner}`
				})
			},
			goSwiper(list) {
				let title = '详情'
				list.content = list.content.replace(/%/g, '%25')
				let content = encodeURIComponent(list.content)
				let banner = JSON.stringify(list.images)
				uni.navigateTo({
					url: `/pages/noticeDetail/noticeDetail?title=${title}&content=${content}&banner=${banner}`
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

		.head {
			width: 100%;
			height: 120upx;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.logo {
				width: 300upx;
				height: 115upx;
			}

			input {
				width: 480upx;
				height: 70upx;
				line-height: 70rpx;
				background: #F7F7F7;
				border-radius: 4px;
				font-size: 14px;
				color: #333;
				padding: 6rpx 24upx 0;
				box-sizing: border-box;
			}
		}

		.banner {
			width: 100%;
			height: 350upx;
			overflow: hidden;

			.swiper {
				width: 100%;
				height: 100%;
			}
		}

		.news {
			width: 94%;
			height: 90upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30upx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 4px;
			background: #F7F7F7;
			margin: 24upx auto;
			font-size: 14px;
			color: #333;

			.n-left {
				display: flex;
				align-items: center;
				
				img {
					width: 44upx;
					height: 44upx;
				}
				
				.speaks {
					height: 44upx;
					line-height: 44upx;
					font-size: 14px;
					color: #333;
					margin-left: 20rpx;
				}
			}

			.content {
				width: 50%;
				font-size: 14px;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.more {
				height: 24upx;
				line-height: 24upx;
				padding-left: 20upx;
				border-left: 1px solid #999;
				font-size: 14px;
				color: #999;
			}
		}

		.swiper {
			width: 100%;
			height: 380upx;

			.type {
				width: 100%;
				padding: 14upx 0;
				// box-sizing: border-box;
				// overflow: hidden;

				li {
					width: 25%;
					float: left;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 14px;
					color: #333;
					margin-bottom: 30rpx;

					img {
						width: 120upx;
						height: 120upx;
					}

					view {
						width: 100%;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-top: 10rpx;
					}
				}
			}
		}

		.items {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28upx;
			box-sizing: border-box;
			// margin-top: 20upx;

			.items-title {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				font-size: 15px;
				font-weight: 600;
				color: #333;
			}

			.scroll-x {
				width: 100%;
				display: flex;

				.items-box {
					width: 100%;
					display: flex;
					align-items: center;

					.items-product {
						width: 32%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 14px;
						color: #666;
						margin-left: 3%;

						img {
							width: 216upx;
							height: 216upx;
							border-radius: 4px;
						}

						view {
							width: 100%;
							height: 60upx;
							line-height: 60upx;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.items-product:first-child {
						margin-left: 0;
					}
				}
			}
		}
	}
</style>
