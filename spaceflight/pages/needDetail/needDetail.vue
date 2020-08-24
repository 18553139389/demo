<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">供需详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<view class="list-item">
					<view class="detail">
						<view class="detail-left" @tap="goUser">
							<image :src="list.headImage"></image>
							<view class="detail-right">
								<view class="name">{{list.title}}</view>
								<view class="mark">
									<view style="margin-right: 40rpx;" v-if="list.gongXuType == 1">提供需求</view>
									<view style="margin-right: 40rpx;" v-if="list.gongXuType == 2">寻找需求</view>
								</view>
							</view>
						</view>
						<view class="about" v-if="list.isGZ != 0 && list.isGZ == 'Y'" @tap="goCare">已关注</view>
						<view class="about" v-if="list.isGZ != 0 && list.isGZ == 'N'" @tap="goCare" style="background: #ededed;">未关注</view>
					</view>
					<view class="service">
						<view class="service-item" v-for="(v,k) in list.lables" :key="k">{{v}}</view>
					</view>
					<view class="shop">
						<image src="../../static/images/s4.png" v-if="shop.weidianUrl" @tap="goShop(1)"></image>
						<image src="../../static/images/s1.png" v-if="shop.jingdongUrl" @tap="goShop(2)"></image>
						<!-- <image src="../../static/images/s3.png" v-if="shop.taobaoUrl" @tap="goShop(3)"></image> -->
						<image src="../../static/images/s2.png" v-if="shop.disanfangUrl" @tap="goShop(4)"></image>
					</view>
					<view class="time">{{list.createDate}}</view>
					<view class="content">{{list.content}}</view>
					<view class="play" v-if="list.vedioUrl && list.vedioUrl.length > 0" @tap.stop="">
						<video v-for="(v,k) in list.vedioUrl" :key="k" :src="v" objectFit="cover"></video>
					</view>
					<view class="play" v-if="list.imageUrls && list.imageUrls.length > 0" @tap.stop="">
						<image v-for="(item,index) in list.imageUrls" :key="index" :src="item" mode="widthFix"></image>
					</view>
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
				backColor: '#fff',
				ids: '',
				list: {},
				shop: {}
			}
		},
		onLoad(option) {
			this.init(option.id)
			this.ids = option.id
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					gxId: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/gongXuInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dateList
								//获取微店
								let data2 = {
									uid: self.list.uid
								}
								Toast.showLoading('', function() {
									let data = {
										url: '/api/myShop',
										data: data2,
										success: function(res) {
											console.log(res)
											if (res.data.result == 0) {
												Toast.hideLoading()
												self.shop = res.data.data
											} else {
												Toast.hideLoading()
												Toast.showToast(res.data.resultNote)
											}
										}
									}
									ajax(data)
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
			goCare() {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					gxId: this.ids,
					type: 1
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/gongXuAttention',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								if(self.list.isGZ == 'N') {
									self.list.isGZ = 'Y'
								} else {
									self.list.isGZ = 'N'
								}
								self.$forceUpdate()
								Toast.showToast(res.data.resultNote)
								Toast.hideLoading()
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goUser() {
				uni.navigateTo({
				    url: '/pages/user/user?id=' + this.list.uid 
				})
			},
			goShop(k) {
				let url = ''
				if(k == 1) {
					url = this.shop.weidianUrl
				} else if(k == 2) {
					url = this.shop.jingdongUrl
				} else if(k == 3) {
					url = this.shop.taobaoUrl
				} else if(k == 4) {
					url = this.shop.disanfangUrl
				}
				uni.navigateTo({
				    url: '/pages/web/web?url=' + url
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
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
			border-top: 10px solid #f6f6f6;
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.list-item {
					width: 100%;
					padding: 40rpx 28rpx;
					box-sizing: border-box;
					background: #fff;
					display: flex;
					flex-direction: column;
					
					.detail {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-bottom: 28rpx;
						
						.detail-left {
							display: flex;
							
							image {
								width: 110rpx;
								height: 110rpx;
								border-radius: 4px;
							}
							
							.detail-right {
								// width: 75%;
								height: 110rpx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								padding-left: 24rpx;
								box-sizing: border-box;
								
								.name {
									width: 100%;
									font-size: 28rpx;
									color: #333;
								}
								
								.mark {
									display: flex;
									font-size: 26rpx;
									color: #0081FF;
								}
							}
						}
						
						.about {
							padding: 0 24rpx;
							height: 50rpx;
							line-height: 50rpx;
							font-size: 26rpx;
							color: #fff;
							border-radius: 4px;
							background: #0081FF;
							text-align: center;
						}
					}
					
					.service {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						
						.service-item {
							padding: 6rpx 20rpx;
							border-radius: 30px;
							border: 1px solid #0081FF;
							font-size: 28rpx;
							color: #0081FF;
							margin: 0 28rpx 28rpx 0;
						}
					}
					
					.shop {
						width: 100%;
						display: flex;
						border-bottom: 1px solid #eee;
						padding-bottom: 28rpx;
						
						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 28rpx;
						}
					}
					
					.time {
						width: 100%;
						font-size: 24rpx;
						color: #999;
						margin: 30rpx 0;
					}
					
					.content {
						width: 100%;
						font-size: 28rpx;
						color: #333;
					}
					
					.play {
						width: 100%;
						
						video {
							width: 100%;
							height: 360rpx;
							margin-top: 30rpx;
						}
						
						image {
							width: 100%;
							margin-top: 30rpx;
							border-radius: 4px;
						}
					}
				}
			}
		}
	}
</style>
