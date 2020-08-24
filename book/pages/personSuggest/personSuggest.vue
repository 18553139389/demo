<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">意见反馈</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="content">
				<textarea v-model="val" placeholder="请输入您宝贵的意见"></textarea>
			</view>
			<view class="link">
				<view>联系方式：</view>
				<input type="number" v-model="tel">
			</view>
			<view class="submit" @tap="goSubmit">提交</view>
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
				val: '',
				tel: ''
			}
		},
		methods: {
			goSubmit() {
				let self = this
				if (this.val == '') {
					Toast.showToast('反馈内容不能为空')
					return
				}
				
				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(this.tel))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				let data1 = {
					cmd: 'addfeedback',
					uid: uni.getStorageSync('uid'),
					content: this.val,
					phone: this.tel
				}
				Toast.showLoading('', function() {
					let data = {
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
								}, 500)
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
			
			.link {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
				margin-top: 30upx;
				
				input {
					flex: 1;
					height: 60upx;
					padding: 0 20upx;
					font-size: 14px;
					color: #333;
					border: 1px solid #eee;
					border-radius: 4px;
				}
			}
			
			.submit {
				width: 60%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
				border-radius: 30px;
				background: #FF6600;
				margin-top: 120upx;
			}
		}
	}
</style>
