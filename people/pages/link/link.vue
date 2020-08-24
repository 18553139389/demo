<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">联系我们</block>
			</cu-custom>
		</view>
		<view class="wrapper">
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
				Color: '#333',
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
							Toast.hideLoading()
							self.code = res.data.body.code
							self.phone = res.data.body.phone
						} else {
							Toast.hideLoading()
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			},
			goCall() {
				uni.makePhoneCall({
				    phoneNumber: this.phone
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		background: #FFFFFF;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			border-top: 1px solid #eee;
			padding: 28rpx;
			box-sizing: border-box;
			align-items: center;
			
			.message {
				width: 100%;
				display: flex;
				height: 80rpx;
				background: #f6f6f6;
				border-radius: 4px;
				justify-content: space-between;
				align-items: center;
				padding: 0 28rpx;
				box-sizing: border-box;
				
				.message-left {
					font-size: 28rpx;
					color: #666;
				}
			}
			
			image {
				width: 300rpx;
				height: 300rpx;
				margin-top: 200rpx;
			}
			
			.wx {
				width: 320rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: #f6f6f6;
				border-radius: 24px;
				margin: 30rpx auto 0;
			}
		}
	}
</style>
