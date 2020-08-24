<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">店铺详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="head">
				<swiper class="swiper" :indicator-color="color" indicator-active-color="rgba(0,0,0,.3)" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(v,k) in list.images" :key="k">
						<image :src="v"></image>
					</swiper-item>
				</swiper>
				<view class="top_title">{{list.name}}</view>
				<view class="top_text">{{list.content}}</view>
			</view>
			<view class="middle">
				<view class="middle-left" @tap="goCall">
					<image src="../../static/images/dianhua.png"></image>
					<view>{{list.phone}}</view>
				</view>
				<view class="middle-left">
					<image src="../../static/images/shijian.png"></image>
					<view>{{list.open_time}}</view>
				</view>
			</view>
			<view class="bottom">
				<view class="address" @tap="goFind">
					<image src="../../static/images/dizhi.png"></image>
					<view class="addres_name">{{list.address}}</view>
				</view>
				<map style="width: 100%; height: 300px;" :enable-3D="true" :scale="scale" :latitude="latitude" :longitude="longitude"
				:markers="covers" @tap="goFind" @markertap="goFind" @callouttap="goFind"></map>
				<view class="btns">
					<image src="../../static/images/lijiyuyue.png"></image>
					<view @tap="goSay">立即预约</view>
				</view>
			</view>
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
				backColor: '#fff',
				latitude: '',
				longitude: '',
				scale: 10,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				color: 'rgba(255,255,255,0.5)',
				covers: [{
					latitude: '',
					longitude: '',
					iconPath: '../../static/images/dizhi.png',
					callout: {
						content: '商都路世贸中心',
						borderRadius: 16,
						bgColor: '#ffffff',
						padding: 6,
						fontSize: 14,
						color: '#333333',
						display: 'ALWAYS'
					}
				}],
				id: '',
				list: {}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'getMerchantById',
					id: this.id
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
								self.latitude = res.data.lat
								self.longitude = res.data.lon
								self.covers[0].latitude = res.data.lat
								self.covers[0].longitude = res.data.lon
								self.covers[0].callout.content = res.data.name
								console.log(res)
								console.log(self.latitude, self.longitude)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goSay() {
				uni.navigateTo({
					url: '/pages/sayShop/sayShop?id=' + this.list.id
				})
			},
			qqMapTransBMap(lng, lat) {
				let x_pi = 3.14159265358979324 * 3000.0 / 180.0
				let x = lng
				let y = lat
				let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
				let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
				let lngs = z * Math.cos(theta) + 0.0065
				let lats = z * Math.sin(theta) + 0.006
				return {
					lng: lngs,
					lat: lats
				}
			},
			bMapTransqqMap(lng, lat) {
				let x_pi = (3.14159265358979324 * 3000.0) / 180.0
				let x = lng - 0.0065
				let y = lat - 0.006
				let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
				let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
				let lngs = z * Math.cos(theta)
				let lats = z * Math.sin(theta)
				return {
					longitude: lngs,
					latitude: lats
				}
			},
			goFind() {
				const latitude = parseFloat(this.latitude)
				const longitude = parseFloat(this.longitude)
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					name: this.list.name,
					success: function() {
						console.log('success')
					},
					complete: function(e) {
						console.log(e)
					}
				})
			},
			goCall() {
				uni.makePhoneCall({
					phoneNumber: this.list.phone
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
			background: #fff;

			.head {
				width: 100%;
				padding: 0 28rpx 32rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid #eee;
				
				swiper {
					width: 100%;
					height: 360rpx;
					
					swiper-item {
						width: 100%;
						height: 360rpx;
						
						image {
							width: 100%;
							height: 360rpx;
							border-radius: 4px;
						}
					}
				}

				.top_title {
					font-size: 30rpx;
					font-weight: 600;
					color: #333;
					margin: 36rpx 0;
				}

				.top_text {
					width: 100%;
					font-size: 28rpx;
					color: #999;
				}
			}

			.middle {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				border-bottom: 1px solid #eee;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.middle-left {
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

			.bottom {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;

				.address {
					display: flex;
					font-size: 28rpx;
					color: #333;
					margin-bottom: 36rpx;

					image {
						width: 30rpx;
						height: 35rpx;
						margin-right: 24rpx;
					}

					.addres_name {
						width: 80%;
					}
				}

				.btns {
					width: 100%;
					height: 70rpx;
					border-radius: 4px;
					background: #06A5C4;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
					font-weight: 600;
					color: #fff;
					margin-top: 36rpx;

					image {
						width: 42rpx;
						height: 49rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
