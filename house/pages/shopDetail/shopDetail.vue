<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">
					<view style="color: #333;">文章详情</view>
				</block>
			</cu-custom>
		</view>
		<view class="product" @tap="goDetail">
			<view class="title">{{obj.name}}</view>
			<view class="box">
				<image :src="obj.image"></image>
				<view class="item">
					<view class="box-title">{{obj.name}}</view>
					<view class="price">
						<view>￥{{obj.price}}</view>
						<view class="btn">去购买</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- <u-parse :html="content" :tag-style="style"></u-parse> -->
			<u-parse :content="content"></u-parse>
		</view>
	</view>
</template>

<script>
	var jweixin = require('jweixin-module')
	var surl = window.location.href.split('#')[0]
	import uParse from '../../components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				Bg: '#ffffff',
				style: {
					div: 'color: #333;font-size:30rpx;margin-bottom:20rpx;line-height:18px;',
					span: 'font-size: 30rpx'
				},
				obj: {},
				content: '',
				items: {},
				type: 0
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			let item = null
			if(option.type) {
				this.type = 1
				item = JSON.parse(uni.getStorageSync('content'))
			} else {
				item = JSON.parse(this.$store.state.list)
			}
			this.items = item
			this.content = item.content
			console.log(item)
			// 获取商品详情
			this.$u.post('getgoodsarticledetail', {
				goodsid: item.goodsid
			}).then(res => {
				console.log(res)
				if (res.result == 0) {
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
			goDetail() {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail?id=' + this.obj.goodsid
				})
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
								link: "http://integral.dazhoutian.net/integralwall/home/pages/shopDetail/shopDetail?id=" + self.ids + '&type=1', // 分享链接  
								imgUrl: 'http://integral.dazhoutian.net/integralwall/userfiles/files/logo.jpg', // 分享图标                                
								success: function() {
									uni.setStorageSync('content',JSON.stringify(self.items))
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数  
								}
							})
							//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）  
							jweixin.updateTimelineShareData({
								title: self.obj.name, // 分享标题                                  
								link: "http://integral.dazhoutian.net/integralwall/home/pages/shopDetail/shopDetail?id=" + self.ids + '&type=1',
								imgUrl: 'http://integral.dazhoutian.net/integralwall/userfiles/files/logo.jpg', // 分享图标                                
								success: function() {
									uni.setStorageSync('content',JSON.stringify(self.items))
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
	@import url("../../components/u-parse/u-parse.css");
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
		}

		.content {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
		}

		.product {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28rpx;
			box-sizing: border-box;
			margin-top: 30rpx;

			.title {
				width: 100%;
				font-size: 30rpx;
				color: #333;
			}

			.box {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				border-radius: 6px;
				margin: 30rpx 0;
				display: flex;

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 4px;
				}

				.item {
					width: 75%;
					padding-left: 24rpx;
					box-sizing: border-box;
					height: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.box-title {
						width: 100%;
						font-size: 28rpx;
						color: #333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.price {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 30rpx;
						color: #fe5f23;

						.btn {
							padding: 16rpx 32rpx;
							border-radius: 30px;
							background: #fe5f23;
							font-size: 28rpx;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
</style>
