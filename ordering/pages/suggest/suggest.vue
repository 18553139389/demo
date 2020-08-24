<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">意见反馈</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="content">
				<textarea v-model="content" placeholder="请输入您宝贵的意见~"></textarea>
			</view>
			<view class="call">
				<view>联系方式：</view>
				<input type="text" v-model="call" placeholder="便于我们联系您~">
			</view>
			<view class="btn" @tap="goSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#f7f7f7',
				content: '',
				call: ''
			}
		},
		onLoad() {

		},
		methods: {
			goSubmit() {
				if (this.content == '') {
					Toast.showToast('内容不能为空')
					return
				}

				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					phone: this.call,
					content: this.content
				}
				let data = {
					url: '/feedback',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							Toast.showToast('提交成功')
							setTimeout(() => {
								uni.navigateBack({
								    delta: 1
								})
							},500)
						} else {
							Toast.showToast(res.data.resultNote)
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
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f7f7f7;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;

			.content {
				width: 100%;
				border-radius: 4px;
				background: #FFFFFF;
				padding: 24rpx;
				box-sizing: border-box;

				.textarea {
					width: 100%;
					height: 280rpx;
					font-size: 28rpx;
					color: #333;
				}
			}

			.call {
				width: 100%;
				border-radius: 4px;
				background: #FFFFFF;
				padding: 24rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				margin-top: 30rpx;
			}

			.btn {
				width: 50%;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 24px;
				background: #F91D37;
				margin: 60rpx auto 0;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>
