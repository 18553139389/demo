<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">拒绝原因</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<textarea v-model="val" placeholder="请填写拒绝原因"></textarea>
			<view class="btn" @tap="goSure">确认提交</view>
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
				order: '',
				val: ''
			}
		},
		onLoad(option) {
			this.order = option.order
		},
		methods: {
			goSure() {
				let self = this
				if(this.val == '') {
					Toast.showToast('原因不能为空')
					return
				}
				let datas = {
					uid: uni.getStorageSync('uid'),
					orderId: this.order,
					type: 2,
					reason: this.val
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/auditOrderRefund',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 2
									})
								},800)
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
		overflow: hidden;
		background: #FFFFFF;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 30upx;
			box-sizing: border-box;
			
			textarea {
				width: 100%;
				height: 300upx;
				border: 1px solid #eee;
				border-radius: 4px;
				padding: 20upx;
				box-sizing: border-box;
				font-size: 28upx;
				color: #333;
			}
			
			.btn {
				width: 80%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				margin: 80upx auto 0;
				border-radius: 40px;
				background: #FF4848;
				font-size: 30upx;
				color: #fff;
			}
		}
	}
</style>
