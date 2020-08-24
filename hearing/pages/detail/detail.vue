<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<view class="title">{{list.message}}</view>
				<view class="content">{{list.content}}</view>
				<image class="bg" :src="v" v-for="(v,k) in list.images" :key="k" v-if="list.images.length > 0"></image>
				<view class="play" v-if="list.video_url">
					<video :src="list.video_url" objectFit="cover"></video>
				</view>
				<!-- <view class="bottom">
					<view class="mark" @tap="goLike(v.id,v.like,k)">
						<image style="margin-bottom: 8rpx;" :src='v.like == 2 ? "../../static/images/dianzan.png" : "../../static/images/yidainzan.png"'></image>
						<view>{{v.likeNumber}}</view>
					</view>
					<view class="mark" @tap="goComment(v.id,v.content,v.cover,v.commentNumber)">
						<image src='../../static/images/pinglun.png'></image>
						<view>{{v.commentNumber}}</view>
					</view>
					<view class="mark" @tap="goStore(v.id,v.collect,k)">
						<image :src='v.collect == 2 ? "../../static/images/shoucang.png" : "../../static/images/yishoucang.png"'></image>
					</view>
				</view> -->
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
				backColor: '#ffffff',
				list: {}
			}
		},
		onLoad(option) {
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					cmd: 'getHearthById',
					id: id,
					uid: uni.getStorageSync('uid'),
					nowPage: 1
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
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
			
			.item {
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				background: #fff;
				margin-bottom: 24rpx;
				
				.title {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					border-bottom: 1px solid #eee;
					font-size: 28rpx;
					color: #333;
				}
				
				.content {
					width: 100%;
					font-size: 24rpx;
					color: #666;
					margin: 24rpx 0;
				}
				
				.bg {
					width: 100%;
					height: 360rpx;
					border-radius: 4px;
					margin-bottom: 32rpx;
				}
				
				.bottom {
					width: 100%;
					height: 100rpx;
					border-top: 1px solid #eee;
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.mark {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #333;
						
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 16rpx;
						}
					}
				}
				
				video {
					width: 100%;
					height: 360rpx;
				}
			}
		}
	}
</style>
