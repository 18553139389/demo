<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">
					<view style="color: #333;">商品详情</view>
				</block>
			</cu-custom>
		</view>
		<view class="banner">
			<u-swiper :list="obj.images" border-radius="0" height="680"></u-swiper>
			<view class="product">
				<view class="title">{{obj.name}}</view>
				<view class="price">￥{{obj.price}}</view>
				<view class="content">{{obj.descs}}</view>
			</view>
			<view class="produce">
				<!-- <u-parse :html="obj.content" :tag-style="style"></u-parse> -->
				<u-parse :content="obj.content"></u-parse>
			</view>
		</view>
		<view class="bottom">
			<view class="price">￥{{obj.price}}</view>
			<view class="buy" @tap="goBuy">购买</view>
		</view>
	</view>
</template>

<script>
	var jweixin = require('jweixin-module')
	var surl = window.location.href.split('#')[0]
	import uParse from '../../components/u-parse/u-parse.vue'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Bg: '#ffffff',
				style: {
					div: 'color: #333;font-size:30rpx;margin-bottom:20rpx;line-height:18px;',
					span: 'font-size: 30rpx',
					img: 'margin-bottom:20rpx;'
				},
				obj: {},
				ids: '',
				type: 0
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			if(option.type) {
				this.type = 1
			}
			this.ids = option.id
			uni.setStorageSync('addressId', '')
			// 获取商品详情
			this.$u.post('getgoodsarticledetail', {
				goodsid: option.id
			}).then(res => {
				console.log(res)
				if(res.result == 0) {
					this.obj = res.dataobject
				}
			})
		},
		onShow() {
			this.shareFilm()
		},
		methods: {
			goBack() {
				if(this.type = 1) {
					uni.reLaunch({
					    url: '/pages/article/article?nav=4'
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			},
			goBuy() {
				if(uni.getStorageSync('uid')) {
					uni.navigateTo({
						url: '/pages/address/address?goodsid=' + this.obj.goodsid + '&price=' + this.obj.price
					})
				} else {
					this.$u.post('weixinlogin?type=1').then(res => {
						console.log(res)
					})
				}
			},
			shareFilm() {
				uni.request({
					url: 'http://integral.dazhoutian.net:8080/integralwall/api/wxShare',
					method: 'POST',
					header: {
						'content-type': 'application/json;charset=UTF-8'
					},
					data: {
						url: surl
					},
					success: res => {
						console.log(res)
						let self = this
						jweixin.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
							appId: res.data.appId, // 必填，公众号的唯一标识  
							timestamp: res.data.timestamp, // 必填，生成签名的时间戳  
							nonceStr: res.data.nonceStr, // 必填，生成签名的随机串  
							signature: res.data.signature, // 必填，签名，见附录1  
							surl: surl, //自己添加的，debug为true的时候可以网页打印出对应的URL是否正确  
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
						})
				
						jweixin.ready(function() {
							//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）  
							jweixin.updateAppMessageShareData({
								title: self.obj.name, // 分享标题  
								desc: self.obj.descs, // 分享描述  
								link: "http://integral.dazhoutian.net/integralwall/home/pages/productDetail/productDetail?id=" + self.ids + '&type=1', // 分享链接  
								imgUrl: 'http://integral.dazhoutian.net/integralwall/userfiles/files/logo.jpg', // 分享图标                                
								success: function() {
									// 用户确认分享后执行的回调函数  
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数  
								}
							})
							//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）  
							jweixin.updateTimelineShareData({
								title: self.obj.name, // 分享标题                                  
								link: "http://integral.dazhoutian.net/integralwall/home/pages/productDetail/productDetail?id=" + self.ids + '&type=1',
								imgUrl: 'http://integral.dazhoutian.net/integralwall/userfiles/files/logo.jpg', // 分享图标                                
								success: function() {
									// 用户确认分享后执行的回调函数  
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数  
								}
							})
						})
					},
					fail: () => {
						console.log('request fail', err);
					},
					complete: () => {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
		}

		.banner {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.product {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				
				.title {
					width: 100%;
					font-size: 30rpx;
					font-weight: 600;
					color: #333;
					margin: 30rpx 0;
				}
				
				.price {
					width: 100%;
					font-size: 30rpx;
					font-weight: 600;
					color: #fe5f23;
					margin-bottom: 30rpx;
				}
				
				.content {
					width: 100%;
					font-size: 28rpx;
					color: #999;
					line-height: 20px;
					margin-bottom: 30rpx;
				}
			}
			
			.produce {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				margin-bottom: 120rpx;
			}
		}
		
		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 90rpx;
			background: #FFFFFF;
			box-shadow: 0 1px 5px rgba(0,0,0,.2);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;
			z-index: 999;
			
			.price {
				font-size: 30rpx;
				font-weight: 600;
				color: #fe5f23;
			}
			
			.buy {
				width: 160rpx;
				height: 70rpx;
				line-height: 70rpx;
				background: #fe5f23;
				border-radius: 4px;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>
