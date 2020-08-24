<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">个人资料</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<view>头像</view>
				<image :src="head" @tap="goLoad"></image>
			</view>
			<view class="item">
				<view class="item-list">
					<view>昵称</view>
					<input type="text" v-model="nick">
				</view>
				<view class="item-list" style="border-bottom: none;">
					<view>手机号码</view>
					<input type="text" v-model="call">
				</view>
			</view>
			<view class="btn" @tap="submit">保存</view>
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
				head: '',
				nick: '张小明',
				call: '13253359085',
				list: {}
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
						url: '/api/mineInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
								self.head = self.list.headImage
								self.nick = self.list.nickName
								self.call = self.list.phone
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goLoad() {
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://zhr.lexishangcheng.com/api/addimg', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										console.log(uploadFileRes)
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.head = obj.dataList
									},
									fail: (res) => {
										Toast.hideLoading()
										Toast.showToast('上传失败')
									}
								})
							})
						})
					},
					fail: function(res) {
						Toast.hideLoading()
						Toast.showToast('上传失败')
					}
				})
			},
			submit() {
				let self = this
				if(this.nick == '') {
					Toast.showToast('昵称不能为空')
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
					headImage: this.head,
					nickName: this.nick,
					phone: this.call
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/mineInfoEdit',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('保存成功')
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
			
			.list {
				width: 100%;
				padding: 24rpx 28rpx;
				background: #fff;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: #333;
				margin: 10px 0;
				
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}
			
			.item {
				width: 100%;
				padding: 0 28rpx;
				background: #fff;
				box-sizing: border-box;
				
				.item-list {
					width: 100%;
					padding: 24rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 30rpx;
					color: #333;
					border-bottom: 1px solid #eee;
					
					input {
						width: 60%;
						text-align: right;
						color: #999;
					}
				}
			}
			
			.btn {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				background: #fff;
				background: #fff;
				text-align: center;
				font-size: 30rpx;
				color: #0081FF;
				margin: 60rpx 0 0;
			}
		}
	}
</style>
