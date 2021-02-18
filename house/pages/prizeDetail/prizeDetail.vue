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
				lid: '',
				setTime: null,
				time: 20,
				show: false,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				obj: {}
			}
		},
		onLoad(option) {
			// 抽奖详情
			this.lid = option.id
			this.$u.post('getluckdrawdetail', {
				lid: option.id
			}).then(res => {
				console.log(res)
				this.obj = res.dataobject
				this.content = res.dataobject.urls
				this.time = res.dataobject.times1
				this.setTime = setInterval(() => {
					if(this.time > 0) {
						this.time--
					}
					if (this.time <= 0) {
						clearInterval(this.setTime)
						this.$u.post('addluckdrawrecord', {
							uid: uni.getStorageSync('uid'),
							lid: this.lid
						}).then(res => {
							console.log(res)
							this.$refs.uToast.show({
								title: '恭喜您获得' + this.obj.integrals + '积分',
								type: 'none'
							})
							this.$store.commit('getState',1)
						})
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
				uni.navigateBack({
					delta: 1
				})
			},
			goReturn() {
				this.show = false
			},
			goClose() {
				if (this.time == 0) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.show = true
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
