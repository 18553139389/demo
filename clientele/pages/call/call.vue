<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content"></block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="call">{{call}}</view>
			<view class="btn" @tap="goLogin">手机号一键登录</view>
			<view class="other" @tap="goOther">使用其他手机号</view>
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
				backColor: '#F6F6F6',
				call: ''
			}
		},
		onLoad() {
			let call = uni.getStorageSync('phone')
			this.call = call.substr(0,3) + '****' + call.substr(7)
		},
		methods: {
			goOther() {
				uni.navigateTo({
				    url: '/pages/other/other'
				})
			},
			goLogin() {
				let data1 = {
					uid: uni.getStorageSync('uid'),
					phone: uni.getStorageSync('phone'),
					code: '12345'
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'bindphone',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.switchTab({
								    url: '/pages/index/index'
								})
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
		height: 100vh;
		background: #FFFFFF;
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
			
			.call {
				width: 100%;
				font-size: 36rpx;
				color: #333;
				font-weight: 600;
				text-align: center;
				margin: 300rpx 0 60rpx;
			}
			
			.btn {
				width: 80%;
				margin: 0 auto;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 30rpx;
				color: #FFFFFF;
				border-radius: 30px;
				background: #00C800;
			}
			
			.other {
				position: absolute;
				bottom: 200rpx;
				left: 0;
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				color: #999;
			}
		}
	}
</style>
