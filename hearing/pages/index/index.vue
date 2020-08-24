<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" bgColor="bg-shadeTop text-white">
				<block slot="backText">
					<view class="nav">
						<image src="../../static/images/dingwei.png"></image>
						<view>{{addressName}}</view>
					</view>
				</block>
			</cu-custom>
		</view>
		<view class="bg">
			<view class="search" @tap="goSearch">
				<image src="../../static/images/sousuo.png"></image>
				<input type="text" placeholder="请输入关键字搜索" placeholder-style="color:#fff;" disabled>
			</view>
		</view>
		<view class="imgs">
			<view class="item" style="margin-top: 0;" @tap="goCoupon">
				<image :src="image1"></image>
			</view>
			<view class="item" @tap="goShop">
				<image :src="image2"></image>
			</view>
			<view class="item" @tap="goWeb">
				<image :src="image3"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import amapFile from '../../common/amap-wx.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				amapPlugin: null,
				key: '',
				addressName: '',
				latitude: '',
				longitude: '',
				image1: '',
				image2: '',
				image3: ''
			}
		},
		onLoad() {
			let self = this
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					self.getRegeo()
				}
			})
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'index'
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								console.log(res)
								self.image1 = res.data.image1
								self.image2 = res.data.image2
								self.image3 = res.data.image3
								self.$store.commit('getContent', res.data.content)
								console.log(self.$store.state.content)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			getRegeo() {
				Toast.showToast('获取定位中...')
				let self = this
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(res)
						self.latitude = res.latitude
						self.longitude = res.longitude
						uni.setStorageSync('latitude', res.latitude)
						uni.setStorageSync('longitude', res.longitude)
						var myAmapFun = new amapFile.AMapWX({
							key: '6cc2e6e48b5b6eb7100b5b9337ffe099'
						})
						myAmapFun.getRegeo({
							location: self.longitude + ',' + self.latitude,
							success: function(data) {
								//成功回调
								console.log(data)
								self.addressName = data[0].regeocodeData.addressComponent.district
								uni.setStorageSync('address', data[0].regeocodeData.addressComponent.city)
								Toast.hideLoading()
							},
							fail: function(info) {
								//失败回调
								console.log(info)
								Toast.hideLoading()
							}
						})
					}
				})
			},
			goAddress() {
				uni.navigateTo({
				    url: '/pages/address/address'
				})
			},
			goSearch() {
				uni.navigateTo({
				    url: '/pages/search/search'
				})
			},
			goCoupon() {
				uni.navigateTo({
				    url: '/pages/coupon/coupon'
				})
			},
			goShop() {
				uni.navigateTo({
				    url: '/pages/searchDetail/searchDetail'
				})
			},
			goWeb() {
				uni.navigateTo({
				    url: '/pages/web/web'
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

			.nav {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #fff;

				image {
					width: 32rpx;
					height: 36rpx;
					margin-right: 24rpx;
				}
			}
		}

		.bg {
			width: 100%;
			padding: 150rpx 32rpx 36rpx;
			background: #06A5C4;
			border-bottom-left-radius: 20px;
			border-bottom-right-radius: 20px;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;

			.search {
				width: 100%;
				height: 70rpx;
				border-bottom: 1px solid #fff;
				display: flex;
				align-items: center;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 24rpx;
				}

				input {
					font-size: 28rpx;
					color: #fff;
				}
			}
		}
		
		.imgs {
			width: 100%;
			padding: 180rpx 32rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.item {
				width: 100%;
				height: 320rpx;
				border-radius: 16px;
				overflow: hidden;
				margin-top: 40rpx;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
