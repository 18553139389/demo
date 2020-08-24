<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">关于平台</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<view class="list-item" @tap="goProduce">
					<view class="list-left">
						<view class="name">公司介绍</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
				<view class="list-item">
					<view class="list-left">
						<view class="name">联系方式</view>
					</view>
					<view>{{list.phone}}</view>
				</view>
				<view class="list-item" style="border-bottom: none;" @tap="">
					<view class="list-left">
						<view class="name">联系我们</view>
					</view>
					<button open-type="contact">
						<image src="../../static/images/wx.png" style="width: 60rpx;" mode="widthFix"></image>
					</button>
				</view>
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
				backColor: '#fff',
				list: {}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/aboutUs',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goProduce() {
				uni.navigateTo({
				    url: '/pages/pruduce/produce'
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
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.list {
				width: 100%;
				padding: 0 24rpx;
				box-sizing: border-box;
				border-radius: 4px;
				background: #fff;
				display: flex;
				flex-direction: column;
				
				.list-item {
					width: 100%;
					height: 120rpx;
					border-bottom: 1px solid #eee;
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;
					
					button {
						background: none;
						border: none;
						outline: none;
						height: 120rpx;
						display: flex;
						align-items: center;
						width: 60rpx;
						margin: 0;
						padding: 0;
						position: fixed;
						right: 50rpx;
					}
					
					.list-left {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333;
						
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 26rpx;
						}
						
						.name {
							margin-right: 60rpx;
						}
						
						.icon {
							padding: 2rpx 20rpx;
							border-radius: 24px;
							font-size: 24rpx;
							color: #fff;
							background: #F74848;
						}
					}
					
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
</style>
