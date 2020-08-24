<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">个人资料</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="head" @tap="changeHead">
				<view>更换头像</view>
				<image :src="head" mode=""></image>
			</view>
			<view class="message">
				<view class="message-list" @tap="goNick">
					<view>昵称</view>
					<view class="msg">
						<view>{{userList.nickname}}</view>
						<image src="../../static/images/right.png"></image>
					</view>
				</view>
				<view class="message-list" @tap="showPopup">
					<view>性别</view>
					<view class="msg">
						<view v-if="sex == 1">男</view>
						<view v-if="sex == 0">女</view>
						<image src="../../static/images/right.png"></image>
					</view>
				</view>
				<view class="message-list" @tap="choiceTime">
					<view>生日</view>
					<view class="msg">
						<view>{{age}}</view>
						<image src="../../static/images/right.png"></image>
					</view>
				</view>
				<view class="message-list" style="border-bottom: none;" @tap="goBind">
					<view>手机号</view>
					<view class="msg">
						<view>{{userList.phone}}</view>
						<image src="../../static/images/right.png"></image>
					</view>
				</view>
			</view>
		</view>
		<KXDateTime ref="date" :visible='1' :data='date' :end='enddate' :start='startdate' @rundata='kxdatetime'></KXDateTime>
		<uni-popup ref="showpopup" type="bottom">
			<ul class="bottom">
				<li v-for="(v,k) in sexList" :key="k" @tap="changeSex(k)">{{v}}</li>
			</ul>
		</uni-popup>
	</view>
</template>

<script>
	import KXDateTime from "../../components/kx-datetime/kx-datetime.vue"
	import uniPopup from '../../components/popup/uni-popup.vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				userList: {},
				date: '',
				startdate:'1960-1-1',
				enddate: '2030-1-1',
				head: '',
				age: '',
				sex: '',
				sexList: ['女','男']
			}
		},
		onShow() {
			this.init()
		},
		components:{
			KXDateTime,
			uniPopup
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
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.userList = res.data
								self.age = res.data.age
								self.sex = res.data.sex
								self.head = res.data.icon
								console.log(res)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goNick() {
				uni.navigateTo({
				    url: '/pages/nick/nick'
				})
			},
			goBind() {
				uni.navigateTo({
				    url: '/pages/bind/bind'
				})
			},
			choiceTime() {
				this.$refs.date.open()
			},
			kxdatetime(e) {
				this.age = e
				let self = this
				let data1 = {
					cmd: 'editAge',
					uid: uni.getStorageSync('uid'),
					age: e
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('生日修改成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			showPopup() {
				this.$nextTick(() => {
					this.$refs['showpopup'].open()
				})
			},
			changeSex(k) {
				let self = this
				this.$refs['showpopup'].close()
				let data1 = {
					cmd: 'editSex',
					uid: uni.getStorageSync('uid'),
					sex: k
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(k == 0) {
									self.sex = 0
								} else {
									self.sex = 1
								}
								Toast.showToast('性别修改成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			changeHead() {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://xcx.boinhearing.cn/api/addimgs', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										self.video = []
										let obj = JSON.parse(uploadFileRes.data)
										self.head = obj.objects[0]
										
										let data1 = {
											cmd: 'editIcon',
											uid: uni.getStorageSync('uid'),
											icon: self.head
										}
										Toast.showLoading('', function() {
											let data = {
												data: data1,
												success: function(res) {
													if (res.data.result == 0) {
														Toast.hideLoading()
														Toast.showToast('头像修改成功')
													} else {
														Toast.hideLoading()
														Toast.showToast(res.data.resultNote)
													}
												}
											}
											ajax(data)
										})
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
		
		.fixed {
			width: 100%;
		}
		
		.bottom {
			width: 100%;
			background: #FFFFFF;
		
			li {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 14px;
				color: #333;
				border-bottom: 1px solid #eee;
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.head {
				width: 100%;
				height: 120rpx;
				background: #fff;
				padding: 0 28rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				margin: 24rpx 0;
				
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}
			
			.message {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				background: #fff;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				color: #333;
				
				.message-list {
					width: 100%;
					height: 90rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					.msg {
						display: flex;
						align-items: center;
						color: #999;
						
						image {
							width: 24rpx;
							height: 24rpx;
							margin-left: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
