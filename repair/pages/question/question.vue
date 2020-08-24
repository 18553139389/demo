<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">意见反馈</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<ld-select :multiple="false" :list="options" list-key="label" value-key="value" placeholder="请选择反馈类型" clearable v-model="value2"
				@change="selectChange2"></ld-select>
				<image src="../../static/images/down.png"></image>
			</view>
			<view class="item" style="padding: 24rpx 40rpx;margin-top: 0;">
				<textarea v-model="val" placeholder="请输入您宝贵的意见" />
			</view>
			<view class="item" style="padding: 24rpx 40rpx;margin-top: 0;border-bottom: none;">
				<input type="text" v-model="call" placeholder="请留下您的联系方式">
			</view>
			<view class="btn" @tap="submit">提交</view>
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
				value2: [],
				options: [],
				val: '',
				call: ''
			}
		},
		onLoad(option) {
			this.init()
		},
		methods: {
			selectChange2(val) {
				console.log(val)
				this.value2 = val
			},
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/feedbackTypeList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								for(let i=0;i<res.data.dataList.length;i++) {
									self.options.push({
										value: res.data.dataList[i].id,
										label: res.data.dataList[i].title
									})
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
				if(this.value2.length == 0) {
					Toast.showToast('请选择反馈类型')
					return
				}
				if(this.val == '') {
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
				let data1 = {
					uid: uni.getStorageSync('uid'),
					feedbackTypeId: this.value2,
					content: this.val,
					telephone: this.call
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/feedback',
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
		background: #f6f6f6;
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

			.item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				margin-top: 30rpx;
				padding: 12rpx 40rpx 12rpx 0;
				border-bottom: 1px solid #eee;
				
				image {
					width: 32rpx;
					height: 32rpx;
				}
				
				textarea {
					width: 100%;
					height: 360rpx;
					border-radius: 4px;
					background: #f6f6f6;
					padding: 24rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #333;
				}
				
				input {
					font-size: 28rpx;
					color: #333;
				}
			}
			
			.btn {
				width: 50%;
				margin: 80rpx auto 0;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 28rpx;
				color: #fff;
				background: #F15903;
				border-radius: 30px;
			}
		}
	}
</style>
