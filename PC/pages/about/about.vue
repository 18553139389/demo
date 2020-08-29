<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">联系我们</view>
			<view class="message">
				<view class="message-left">{{phone}} 平台电话</view>
				<view @tap="goCall">联系我们</view>
			</view>
			<image :src="code"></image>
			<view class="wx">扫描添加客服微信</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				code: '',
				phone: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {}
				let data = {
					url: 'customer',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							self.code = res.data.body.code
							self.phone = res.data.body.phone
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		
		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 15rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
			}
			
			.message {
				width: 80%;
				display: flex;
				height: 30rpx;
				background: #f6f6f6;
				border-radius: 4px;
				justify-content: space-between;
				align-items: center;
				padding: 0 10rpx;
				box-sizing: border-box;
				font-size: 14px;
				margin-top: 30rpx;
				
				.message-left {
					font-size: 14px;
					color: #666;
				}
			}
			
			image {
				width: 80rpx;
				height: 80rpx;
				margin-top: 30rpx;
			}
			
			.wx {
				width: 120rpx;
				height: 20rpx;
				line-height: 20rpx;
				text-align: center;
				background: #f6f6f6;
				border-radius: 24px;
				margin: 10rpx auto 0;
				font-size: 14px;
			}
		}
	}
</style>
