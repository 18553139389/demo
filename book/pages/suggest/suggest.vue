<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">投诉</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="content">
				<textarea v-model="val" placeholder="投诉原因"></textarea>
			</view>
			<view class="submit" @tap="goSubmit">提交</view>
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
				val: '',
				order: ''
			}
		},
		onLoad(option) {
			this.order = option.order
		},
		methods: {
			goSubmit() {
				let self = this
				if(this.val == '') {
					Toast.showToast('投诉内容不能为空')
					return
				}
				let data1 = {
					cmd: 'ordercomplaint',
					uid: uni.getStorageSync('uid'),
					ordernum: this.order,
					reason: this.val
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('投诉成功')
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.content {
				width: 100%;
				height: 280upx;
				border-radius: 4px;
				border: 1px solid #eee;
				margin-top: 30upx;
				
				textarea {
					width: 100%;
					height: 100%;
					font-size: 14px;
					color: #333;
					padding: 20upx;
					box-sizing: border-box;
				}
			}
			
			.submit {
				padding: 10upx 100upx;
				border: 1px solid #eee;
				border-radius: 4px;
				font-size: 15px;
				color: #333;
				margin-top: 40px;
			}
		}
	}
</style>
