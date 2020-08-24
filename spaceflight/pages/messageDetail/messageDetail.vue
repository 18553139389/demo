<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">消息详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<!-- <view class="warn"></view> -->
				<view class="message">
					<view class="top">
						<view>系统通知</view>
					</view>
					<view class="time">{{time}}</view>
				</view>
			</view>
			<view class="text">{{list.content}}</view>
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
				time: '',
				list: {}
			}
		},
		onLoad(option) {
			this.time = option.time
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					mid: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/messageInfo',
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
			position: relative;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.item {
				width: 100%;
				background: #fff;
				border-radius: 4px;
				padding: 24rpx;
				box-sizing: border-box;
				display: flex;
				margin-top: 10px;
				
				.warn {
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background: red;
					margin-top: 15rpx;
				}
				
				.message {
					width: 80%;
					display: flex;
					flex-direction: column;
					margin-left: 24rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;
					padding-bottom: 28rpx;
					
					.top {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #0C2A6A;
					}
					
					.time {
						font-size: 24rpx;
						color: #999;
						margin-top: 28rpx;
					}
				}
			}
			
			.text {
				width: 100%;
				padding: 0 28rpx 28rpx 46rpx;
				box-sizing: border-box;
				font-size: 26rpx;
				color: #666;
				background: #fff;
				line-height: 20px;
			}
		}
	}
</style>
