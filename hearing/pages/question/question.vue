<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">意见反馈</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="items">
				<textarea v-model="val" placeholder="请输入您宝贵的意见"></textarea>
			</view>
			<view class="items">
				<view class="items_list">
					<view class="items_name">联系方式</view>
					<input type="text" v-model="call" placeholder="请填写联系方式">
				</view>
			</view>
			<view class="btns" @tap="goSubmit">提交</view>
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
				val: '',
				call: '',
				id: ''
			}
		},
		onLoad(option) {
			this.id = option.shop
		},
		methods: {
			goSubmit() {
				let self = this
				if(this.val == '') {
					Toast.showToast('反馈不能为空')
					return
				}
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				let data1 = {
					cmd: 'saveAdvise',
					phone: this.call,
					content: this.val,
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
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
			background: #f6f6f6;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;

			.items {
				width: 100%;
				padding: 24rpx 24rpx 40rpx;
				box-sizing: border-box;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				background: #fff;
				margin-bottom: 24rpx;

				textarea {
					width: 100%;
					height: 300rpx;
					font-size: 28rpx;
					color: #333;
				}

				.items_list {
					width: 100%;
					display: flex;
					flex-direction: column;

					.items_name {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 28rpx;
						color: #333;
					}

					input {
						width: 100%;
						height: 70rpx;
						padding: 0 20rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						color: #333;
						background: #f6f6f6;
					}
				}
			}

			.btns {
				width: 92%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				font-weight: 600;
				border-radius: 4px;
				background: #06A5C4;
				margin-top: 40rpx;
			}
		}
	}
</style>
