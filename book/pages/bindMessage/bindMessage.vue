<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">绑定信息</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="forms">
				<view class="common">
					<view class="left">
						<img src="../../static/images/zhifubao.png" alt="">
						<view>支付宝姓名</view>
					</view>
					<view class="msg">
						<input type="text" v-model="user" placeholder="请输入您的真实姓名">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="common">
					<view class="left">
						<img src="../../static/images/zhifubao.png" alt="">
						<view>支付宝账号</view>
					</view>
					<view class="msg">
						<input type="text" v-model="order" placeholder="请输入您的支付宝账号">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="common" @tap="goImg1">
					<view class="left">
						<img src="../../static/images/zhifubao.png" alt="">
						<view>上传支付宝收款码</view>
					</view>
					<view class="msg">
						<input v-if="!imgs1" type="text" v-model="code1" placeholder="请上传" disabled>
						<img class="code" v-if="imgs1" :src="imgs1" alt="">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="common" @tap="goImg">
					<view class="left">
						<img src="../../static/images/wx1.png" alt="">
						<view>上传微信收款码</view>
					</view>
					<view class="msg">
						<input v-if="!imgs" type="text" v-model="code" placeholder="请上传" disabled>
						<img class="code" v-if="imgs" :src="imgs" alt="">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
			</view>
			<view class="submit" @tap="bindMessage">提交</view>
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
				user: '',
				order: '',
				code: '',
				imgs: '',
				code1: '',
				imgs1: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'userInfo',
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.user = res.data.dataobject.zhifubaoname
								self.order = res.data.dataobject.zhifubaonum
								if (res.data.dataobject.weixinqrcode) {
									self.imgs = res.data.dataobject.weixinqrcode
								}
								if (res.data.dataobject.zhifubaoqrcode) {
									self.imgs1 = res.data.dataobject.zhifubaoqrcode
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
			goImg() {
				//从相册中选择图片上传
				let self = this
				if(self.imgs) {
					return
				}
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://www.ytsh.vip/easyamoy/api/uploadFile',
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.imgs = obj.dataobject
										console.log(self.imgs)
										Toast.showToast('上传成功')
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
			goImg1() {
				//从相册中选择图片上传
				let self = this
				if(self.imgs1) {
					return
				}
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://www.ytsh.vip/easyamoy/api/uploadFile',
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.imgs1 = obj.dataobject
										Toast.showToast('上传成功')
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
			bindMessage() {
				let self = this
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}

				if (this.order == '') {
					Toast.showToast('账号不能为空')
					return
				}

				let datas = {
					cmd: 'edituserInfo',
					uid: uni.getStorageSync('uid'),
					zhifubaoname: self.user,
					zhifubaonum: self.order,
					weixinqrcode: self.imgs,
					zhifubaoqrcode: self.imgs1
				}
				Toast.showLoading('', function(re) {
					let data = {
						data: datas,
						success: function(re) {
							if (re.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('绑定成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(re.data.resultNote)
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
			display: flex;
			padding: 0 28upx;
			box-sizing: border-box;
			flex-direction: column;
			align-items: center;

			.forms {
				width: 100%;
				display: flex;
				flex-direction: column;

				.common {
					width: 100%;
					height: 100upx;
					border-bottom: 1px solid #eee;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 14px;
					color: #333;
					
					.left {
						display: flex;
						align-items: center;
						
						img {
							width: 46upx;
							height: 46upx;
							margin-right: 28upx;
						}
					}

					.msg {
						width: 50%;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						input {
							width: 70%;
							font-size: 14px;
							color: #333;
							text-align: right;
						}

						img {
							width: 18upx;
							height: 27upx;
							margin-left: 24upx;
						}

						.code {
							width: 50upx;
							height: 50upx;
						}
					}
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
