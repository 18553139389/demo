<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">意见反馈</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<textarea v-model="val" placeholder="请输入您的宝贵意见" />
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
				val: ''
			}
		},
		methods: {
			submit() {
				if(this.val == '') {
					Toast.showToast('意见不能为空')
					return
				}
				
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					content: this.val
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/complain',
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
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.list {
				width: 100%;
				border-radius: 4px;
				background: #fff;
				display: flex;
				flex-direction: column;
				
				textarea {
					width: 100%;
					height: 360rpx;
					border-radius: 4px;
					background: #fff;
					padding: 20rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #333;
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
