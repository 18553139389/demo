<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">我的店铺</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<view class="item-list">
					<view class="head">
						<image src="../../static/images/s4.png"></image>
						<view>微店</view>
					</view>
					<input type="text" v-model="val" placeholder="请输入店铺链接">
				</view>
				<view class="item-list">
					<view class="head">
						<image src="../../static/images/s1.png"></image>
						<view>京东</view>
					</view>
					<input type="text" v-model="val1" placeholder="请输入店铺链接">
				</view>
				<!-- <view class="item-list">
					<view class="head">
						<image src="../../static/images/s3.png"></image>
						<view>淘宝</view>
					</view>
					<input type="text" v-model="val2" placeholder="请输入店铺链接">
				</view> -->
				<view class="item-list">
					<view class="head">
						<image src="../../static/images/s2.png"></image>
						<view>第三方</view>
					</view>
					<input type="text" v-model="val3" placeholder="请输入店铺链接">
				</view>
			</view>
		</view>
		<view class="btn" @tap="submit">提交</view>
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
				val: '',
				val1: '',
				val2: '',
				val3: ''
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
						url: '/api/myShop',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(res.data.data) {
									self.val = res.data.data.weidianUrl
									self.val1 = res.data.data.jingdongUrl
									self.val2 = res.data.data.taobaoUrl
									self.val3 = res.data.data.disanfangUrl
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			submit() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					weidian: this.val,
					jingdong: this.val1,
					taobao: this.val2,
					disanfang: this.val3
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/addMyShop',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
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
			border-top: 10px solid #f6f6f6;
			background: #fff;
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.item-list {
					width: 100%;
					padding: 60rpx 28rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					border-bottom: 10px solid #f6f6f6;
					
					.head {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #333;
						
						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 28rpx;
						}
					}
					
					input {
						width: 100%;
						height: 70rpx;
						border-radius: 4px;
						background: #f6f6f6;
						padding: 0 24rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						color: #333;
						margin-top: 40rpx;
					}
				}
			}
		}
		
		.btn {
			width: 40%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 30px;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			background: #2862A1;
			margin: 60rpx auto;
		}
	}
</style>
