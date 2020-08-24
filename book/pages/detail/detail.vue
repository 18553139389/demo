<template>
	<view class="contain">
		<view class="banner">
			<!-- <swiper class="swiper" :autoplay="autoplay" :interval="interval" circular="true" @change="change">
				<swiper-item v-for="(v,k) in swiperList" :key="k">
					<img style="width: 100%;height: 100%;" :src="v" alt="">
				</swiper-item>
			</swiper> -->
			<image class="swiper" v-for="(v,k) in swiperList" :key="k" :src="v" alt="" mode="aspectFit"></image>
			<view class="back" @tap="goBack">
				<img src="../../static/images/back1.png" alt="">
			</view>
			<!-- <view class="mark">{{swiperIndex}} / {{total}}</view> -->
			<view class="item">
				<view class="item-title">{{list.name}}</view>
				<view class="item-user">
					<view class="item-price">
						<view style="font-size: 22px;color: #FF6600;">￥{{list.price}}</view>
						<view class="user">产品所有人：{{list.username}}</view>
					</view>
				</view>
				<view class="item-title" style="margin-top: 24upx;">商品详情</view>
				<view class="item-content">
					<u-parse :content="list.content" />
				</view>
			</view>
		</view>
		<view class="buy" @tap="goBuy" v-if="show1">立即购买</view>
		<view class="buys" v-if="!show1">商品已售罄</view>
		<view class="read" v-if="show">
			<view class="content">
				<view class="content-box">
					<view class="content-title">
						<view>购买协议</view>
						<img @tap="goClose" src="../../static/images/close.png" alt="">
					</view>
					<view class="text">
						<scroll-view scroll-y="true" style="height: 16vh;">
							<u-parse :content="content" />
						</scroll-view>
					</view>
					<view class="agree" @tap="goOrder">同意并购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import uParse from '../../components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				autoplay: true,
				interval: 5000,
				total: 0,
				swiperIndex: 1,
				swiperList: [],
				show: false,
				show1: true,
				list: {},
				content: '',
				uid: '',
				ids: ''
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.uid = option.uid
			this.ids = option.id
			if(option.state == 2) {
				this.show1 = false
			}
		},
		onShow() {
			this.init(this.ids)
		},
		onUnload() {
			this.show = false
		},
		onHide() {
			this.show = false
		},
		methods: {
			init(id) {
				let self = this
				//获取购买协议
				let data2 = {
					cmd: 'getgreement',
					type: 2
				}
				Toast.showLoading('', function() {
					let data = {
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.content = res.data.datastr
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
				//获取商品详情
				let data1 = {
					cmd: 'goodsdetail',
					gid: id
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataobject
								self.swiperList = res.data.dataobject.images
								self.total = self.swiperList.length
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goBack() {
				uni.navigateBack({
				    delta: 1
				})
			},
			change(e) {
				this.swiperIndex = e.detail.current + 1
			},
			goBuy() {
				if(!uni.getStorageSync('uid')) {
					uni.redirectTo({
					    url: '/pages/login/login?uid=' + this.uid
					})
				} else {
					if(this.list.stocks == 1) {
						this.show = true
					} else {
						Toast.showToast('该商品已售罄')
						return
					}
				}
			},
			goClose() {
				this.show = false
			},
			goOrder() {
				let obj = {
					img: this.list.image,
					name: this.list.name,
					price: this.list.price,
					id: this.list.gid,
					userid: this.list.userid
				}
				uni.navigateTo({
				    url: '/pages/submitOrder/submitOrder?obj='+JSON.stringify(obj)+'&user='+this.list.username
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
		
		.banner {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			padding-top: 50upx;
		
			.swiper {
				width: 92%;
				// height: 500upx;
			}
			
			.back {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0,0,0,.4);
				border-radius: 50%;
				font-size: 18px;
				color: #FFFFFF;
				position: absolute;
				left: 28upx;
				top: 28upx;
				
				img {
					width: 30upx;
					height: 30upx;
				}
			}
			
			.mark {
				padding: 10upx 30upx;
				background: rgba(0,0,0,.4);
				border-radius: 40px;
				font-size: 15px;
				color: #FFFFFF;
				position: absolute;
				right: 40upx;
				bottom: 80upx;
			}
			
			.item {
				// position: absolute;
				// left: 0;
				// top: 700upx;
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 28upx 0;
				box-sizing: border-box;
				border-top-left-radius: 20px;
				border-top-right-radius: 20px;
				background: #FFFFFF;
				z-index: 99;
				margin-bottom: 120upx;
				
				.item-title {
					width: 100%;
					height: 70upx;
					line-height: 70upx;
					font-size: 15px;
					color: #333;
					padding: 0 28upx;
					box-sizing: border-box;
				}
				
				.item-content {
					width: 100%;
					font-size: 14px;
					color: #333;
					padding: 28upx;
					box-sizing: border-box;
				}
				
				.item-user {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					padding: 28upx 28upx 60upx;
					box-sizing: border-box;
					border-bottom: 20upx solid #FAFAFA;
					
					.item-price {
						display: flex;
						align-items: center;
						
						.user {
							padding: 8upx 30upx;
							border-radius: 30px;
							background: #FF6600;
							color: #FFFFFF;
							margin-left: 30upx;
						}
					}
				}
			}
		}
		
		.buy {
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 15px;
			background: #F86342;
			color: #FFFFFF;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
		}
		
		.buys {
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 15px;
			background: #333;
			color: #FFFFFF;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
		}
		
		.read {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.4);
			z-index: 9999;
			
			.content {
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				
				.content-box {
					width: 100%;
					border-top-left-radius: 20px;
					border-top-right-radius: 20px;
					background: #FFFFFF;
					
					.content-title {
						width: 100%;
						height: 100upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 15px;
						font-weight: 600;
						color: #333;
						padding: 0 28upx;
						box-sizing: border-box;
						
						img {
							width: 30upx;
							height: 30upx;
						}
					}
					
					.text {
						width: 100%;
						max-height: calc(80vh - 200upx);
						font-size: 14px;
						color: #666;
						text-align: justify;
						padding: 0 28upx 28upx;
						box-sizing: border-box;
					}
					
					.agree {
						width: 100%;
						height: 100upx;
						line-height: 100upx;
						text-align: center;
						font-size: 15px;
						background: #FF6600;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
