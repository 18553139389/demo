<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">联系我们</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item" @tap="goCall">
				<view style="width: 160rpx;height: 50rpx;line-height: 50rpx;">联系我们</view>
				<view class="msg">{{list.telephone}}</view>
			</view>
			<view class="item">
				<view style="width: 160rpx;height: 50rpx;line-height: 50rpx;">邮箱</view>
				<view class="msg">{{list.mailbox}}</view>
			</view>
			<view class="item">
				<view style="width: 160rpx;height: 50rpx;line-height: 50rpx;">地址</view>
				<view class="msg">{{list.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				title: '',
				list: {}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/contact',
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
			},
			goCall() {
				uni.makePhoneCall({
				    phoneNumber: this.list.telephone //仅为示例
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			border-top: 10px solid #f5f5f5;
			
			.item {
				width: 100%;
				padding: 28rpx;
				display: flex;
				box-sizing: border-box;
				background: #fff;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;
				color: #333;
				
				.msg {
					max-width: 75%;
					height: 50rpx;
					line-height: 50rpx;
				}
			}
		}
	}
</style>
