<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">修改昵称</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="editor">
				<image src="../../static/images/bianji.png"></image>
				<input type="text" v-model="val" placeholder="请输入昵称">
			</view>
			<view class="btn" @tap="goNick">确定</view>
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
				val: ''
			}
		},
		methods: {
			goNick() {
				if(this.val == '') {
					Toast.showToast('昵称不能为空')
					return
				}
				let self = this
				let data1 = {
					cmd: 'editNickname',
					uid: uni.getStorageSync('uid'),
					nickname: this.val
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('昵称修改成功')
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
			
			.editor {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				background: #fff;
				border-radius: 4px;
				
				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 24rpx;
				}
				
				input {
					width: 60%;
					font-size: 28rpx;
					color: #333;
				}
			}
			
			.btn {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				background: #06A5C4;
				border-radius: 4px;
				margin-top: 40rpx;
			}
		}
	}
</style>
