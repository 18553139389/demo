<template>
	<view class="contain">
		<view class="wrapper">
			<!-- <web-view :webview-styles="webviewStyles" :src="content"></web-view> -->
			<iframe :src="content" frameborder="0" scrolling="no" class="forms"></iframe>
		</view>
		<!-- <video class="video" src="../../static/images/1.mp4" :controls="false" :enable-progress-gesture="false" :autoplay="true"></video> -->
		<cover-view class="message">
			<view class="message-left">
				<view class="title">
					<view>广告</view>
					<image src="../../static/images/down.png" mode="widthFix"></image>
				</view>
				<view class="titles">
					<view>{{time}}s后可获得奖励</view>
				</view>
			</view>
			<view class="message-left" @tap="goClose">
				<view class="title">
					<image src="../../static/images/voice.png" mode="widthFix"></image>
				</view>
				<view class="titles">
					<view>关闭</view>
				</view>
			</view>
		</cover-view>
		<view class="read" v-if="show1" @tap="goArticle">去看文章</view>
		<view class="dialog" v-if="show">
			<view class="box">
				<view class="text">暂未获得奖励，是否继续观看广告</view>
				<view class="btn">
					<view class="common" style="color: #FFFFFF;background: #fe5f23;" @tap="goRead">放弃</view>
					<view class="common" @tap="goReturn">继续</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: 'http://yirui.dazhoutian.net/jifen/index.html',
				raid: '',
				setTime: null,
				time: 20,
				show: false,
				show1: false,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				obj: {},
				showBtn: false
			}
		},
		onLoad(option) {
			window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=2")
			// let ua = navigator.userAgent.toLowerCase()
			// let isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ios') > -1 //ios终端
			// let isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1
			// if(isiOS) {
			// 	window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=2")
			// } 
			// if(isAndroid) {
			// 	window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=2")
			// }
			// 文章详情
			this.raid = option.raid
			this.$u.post('getreadarticledetail', {
				raid: option.raid
			}).then(res => {
				console.log(res)
				this.obj = res.dataobject
				this.content = res.dataobject.url2
				this.time = res.dataobject.times1
				this.setTime = setInterval(() => {
					this.time--
					if (this.time <= 0) {
						clearInterval(this.setTime)
						this.show1 = true
					}
				}, 1000)
			}).catch(err => {
				this.$refs.uToast.show({
					title: err.resultNote,
					type: 'none'
				})
			})
		},
		methods: {
			goRead() {
				this.show = false
				clearInterval(this.setTime)
				// uni.navigateTo({
				// 	url: '/pages/articleDetail/articleDetail?url=' + encodeURIComponent(this.obj.url1) + '&type=1'
				// })
				window.location.href = this.obj.url1
			},
			goReturn() {
				this.show = false
			},
			goClose() {
				if (this.time == 0) {
					this.goArticle()
				} else {
					this.show = true
				}
			},
			goArticle() {
				if(this.showBtn) {
					return
				} else {
					// 阅读文章获得积分
					this.$u.post('addreadarticlerecord', {
						uid: uni.getStorageSync('uid'),
						raid: this.raid
					}).then(res => {
						console.log(res)
						this.showBtn = true
						// this.$refs.uToast.show({
						// 	title: '恭喜您获得' + this.obj.integrals + '积分',
						// 	type: 'none',
						// 	url: '/pages/articleDetail/articleDetail',
						// 	params: {
						// 		url: encodeURIComponent(this.obj.url1),
						// 		type: 1
						// 	}
						// })
						this.$refs.uToast.show({
							title: '恭喜您获得' + this.obj.integrals + '积分',
							type: 'none'
						})
						setTimeout(() => {
							window.location.href = this.obj.url1
						},2000)
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;
		position: relative;

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.forms {
				width: 100%;
				height: 100vh;
			}
		}

		.video {
			width: 100%;
			height: 100%;
		}

		.message {
			position: absolute;
			top: 40rpx;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;
			z-index: 999999;

			.message-left {
				height: 80rpx;
				padding: 0 30rpx;
				border-radius: 30px;
				background: rgba(0, 0, 0, .5);
				display: flex;
				align-items: center;

				.title {
					font-size: 28rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					position: relative;
					padding-right: 20rpx;

					image {
						width: 32rpx;
						margin-left: 16rpx;
					}
				}

				.titles {
					height: 40rpx;
					font-size: 28rpx;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					padding-left: 20rpx;
					border-left: 1px solid #FFFFFF;
				}
			}
		}

		.read {
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 24px;
			position: absolute;
			left: 50%;
			bottom: 5%;
			background: #fe5f23;
			font-size: 30rpx;
			color: #FFFFFF;
			text-align: center;
			margin-left: -25%;
			z-index: 99999999;
		}

		.dialog {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .4);
			z-index: 99999999;
			display: flex;
			justify-content: center;
			align-items: center;

			.box {
				width: 80%;
				padding: 50rpx 32rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #FFFFFF;

				.text {
					font-size: 30rpx;
					color: #333;
					text-align: center;
					line-height: 20px;
				}

				.btn {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 40rpx 0 0;

					.common {
						padding: 16rpx 30rpx;
						border: 1px solid #fe5f23;
						border-radius: 30px;
						font-size: 30rpx;
						color: #fe5f23;
					}
				}
			}
		}
	}
</style>
