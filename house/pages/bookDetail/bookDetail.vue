<template>
	<view class="contain">
		<view class="wrapper">
			<web-view :webview-styles="webviewStyles" :src="content"></web-view>
		</view>
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
		<view class="read" v-if="show1" @tap="goArticle">去看小说</view>
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
				content: '',
				nid: '',
				url: '',
				name: '',
				integrals: 0,
				setTime: null,
				time: 20,
				show: false,
				show1: false,
				state: 0,
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
			window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=3")
			// window.addEventListener('pageshow', function(event) {
			// 	console.log(event)
			// 	console.log(window.performance)
			// 	if (event.persisted || window.performance && window.performance.navigation.type == 2) {
			// 		console.log('window.performance.navigation.type: ' + window.performance.navigation.type)
			// 		uni.reLaunch({
			// 			url: '/pages/article/article'
			// 		})
			// 	}
			// }, false)
			this.state = option.state
			this.content = option.url2
			this.time = option.times1
			this.integrals = option.integrals
			this.nid = option.nid
			this.url = option.url1
			this.name = option.name
			this.setTime = setInterval(() => {
				this.time--
				if (this.time <= 0) {
					clearInterval(this.setTime)
					this.show1 = true
				}
			}, 1000)
		},
		methods: {
			goRead() {
				this.show = false
				clearInterval(this.setTime)
				window.location.href = this.url
				// uni.navigateTo({
				// 	url: '/pages/book/book?url=' + encodeURIComponent(this.url) + '&title=' + this.name + '&type=1' + '&state=' + this.state
				// })
			},
			goReturn() {
				this.show = false
			},
			goClose() {
				if (this.time == 0) {
					// 阅读小说获得积分
					this.goArticle()
				} else {
					this.show = true
				}
			},
			goArticle() {
				if(this.showBtn) {
					return
				} else {
					// 阅读小说获得积分
					this.$u.post('addnovelsrecord', {
						uid: uni.getStorageSync('uid'),
						nid: this.nid
					}).then(res => {
						this.showBtn = true
						// this.$refs.uToast.show({
						// 	title: '恭喜您获得' + this.integrals + '积分',
						// 	type: 'none',
						// 	url: '/pages/book/book',
						// 	params: {
						// 		url: encodeURIComponent(this.url),
						// 		title: this.name,
						// 		type: 1,
						// 		state: this.state
						// 	}
						// })
						this.$refs.uToast.show({
							title: '恭喜您获得' + this.integrals + '积分',
							type: 'none'
						})
						setTimeout(() => {
							window.location.href = this.url
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
