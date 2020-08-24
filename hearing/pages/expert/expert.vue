<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">专家详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="top">
				<view class="expert">
					<image :src="list.icon"></image>
					<view>{{list.nickname}}</view>
				</view>
				<view class="title">
					<image src="../../static/images/bianji.png"></image>
					<view>专业描述</view>
				</view>
				<view class="content">{{list.msg}}</view>
			</view>
			<view class="top" style="margin-top: 28rpx;">
				<view class="imgs">
					<image src="../../static/images/img.png"></image>
					<view>图片</view>
				</view>
				<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
				 duration="500">
					<swiper-item v-for="(item,index) in list.images" :key="index">
						<image :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="imgs">
					<view>专家介绍</view>
				</view>
				<u-parse :content="html" @navigate="navigate"></u-parse>
			</view>
			<view class="btns" @tap="goTalk">
				<image src="../../static/images/lijiyuyue.png"></image>
				<view>立即沟通</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uParse from "../../components/feng-parse/parse.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#ffffff',
				list: {},
				html: '',
				id: ''
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.id = option.id
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					cmd: 'getMemberById',
					id
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								console.log(res)
								self.list = res.data
								self.html = res.data.content
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goTalk() {
				wx.$app.updateMyProfile({ nick: uni.getStorageSync('nick'),avatar:uni.getStorageSync('icon')})
				this.empty(this.id)
			},
			empty(id) {
				// 发起会话
				this.$store.dispatch('checkoutConversation', `C2C${id}`)
				.then(() => {
					
				})
				.catch(() => {
					
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
			padding: 28rpx;
			box-sizing: border-box;

			.top {
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 4px;
				display: flex;
				flex-direction: column;

				.expert {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 30rpx;
					}
				}

				.title {
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #666;
					border-bottom: 1px solid #eee;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 12rpx;
					}
				}

				.content {
					font-size: 24rpx;
					color: #999;
					margin-top: 30rpx;
				}

				.imgs {
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #666;

					image {
						width: 43rpx;
						height: 34rpx;
						margin-right: 20rpx;
					}

					.bgs {
						width: 100%;
						height: 260rpx;
						border-radius: 4px;
					}
				}

				.card-swiper {
					width: 100%;
					display: flex;
					justify-content: center;
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
</style>
