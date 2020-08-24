<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">个人资料</block>
				<block slot="right">
					<view class="complain">保存</view>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="forms">
				<view class="common" @tap="goHead">
					<view>头像</view>
					<view class="msg">
						<img class="head" :src="head ? head : '../../static/images/morentouxiang.png'" alt="">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="common">
					<view>昵称</view>
					<view class="msg">
						<input type="text" v-model="nick" placeholder="请输入您的昵称" :disabled="nicks">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<!-- <view class="common">
					<view>姓名</view>
					<view class="msg">
						<input type="text" v-model="name" placeholder="请输入您的真实姓名">
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view> -->
				<view class="common" @tap="show1">
					<view>出生日期</view>
					<view class="msg">
						<input type="text" v-model="date" placeholder="请选择日期" disabled>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="common" @tap="show2">
					<view>所在城市</view>
					<view class="msg">
						<input class="city" type="text" v-model="city" placeholder="请选择城市" readonly>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<w-picker mode="date" startYear="1970" endYear="2030" step="1" :current="false" @confirm="onConfirm1" ref="picker1"
		 themeColor="#FF6600"></w-picker>
		<w-picker mode="region" :level="3" :hideArea="false" @confirm="onConfirm" ref="region" themeColor="#FF6600"></w-picker>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import wPicker from "../../components/w-picker/w-picker.vue"
	export default {
		data() {
			return {
				Color: '#333',
				imgs: '',
				head: '',
				nick: '',
				name: '',
				date: '',
				city: '',
				user: {},
				nicks: false
			}
		},
		components: {
			wPicker
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
								self.user = res.data.dataobject
								self.head = res.data.dataobject.icon
								self.nick = res.data.dataobject.nickname
								self.name = res.data.dataobject.realname
								self.date = res.data.dataobject.birthday
								self.city = res.data.dataobject.city
								if(res.data.dataobject.isxiu == 1) {
									self.nicks = true
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
			goRight() {
				let self = this
				let data1 = {
					cmd: 'edituserInfo',
					uid: uni.getStorageSync('uid'),
					nickname: self.nick,
					icon: self.imgs,
					realname: self.name,
					birthday: self.date,
					city: self.city
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
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
			},
			goHead() {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						console.log(res)
						// 预览图片
						Toast.showLoading('上传中...', function() {
							uni.uploadFile({
								url: 'https://www.ytsh.vip/easyamoy/api/uploadFile',
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {
									Toast.hideLoading()
									let obj = JSON.parse(uploadFileRes.data)
									self.imgs = obj.dataobject
									self.head = obj.dataobject
								},
								fail: (res) => {
									Toast.hideLoading()
									Toast.showToast('上传失败')
								}
							})
						})
					},
					fail: function(res) {
						Toast.hideLoading()
						Toast.showToast('上传失败')
					}
				})
			},
			show1() {
				this.$refs.picker1.show()
			},
			show2() {
				this.$refs.region.show()
			},
			onConfirm1(e) {
				console.log(e)
				this.date = e.result
			},
			onConfirm(e) {
				this.city = e.result
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

			.complain {
				width: 160upx;
				height: 50upx;
				line-height: 50upx;
				text-align: right;
				font-size: 15px;
				color: #666;
			}
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
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 14px;
					color: #333;

					.msg {
						width: 70%;
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
							width: 15upx;
							height: 24upx;
							margin-left: 24upx;
						}
						
						.city {
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}

						.head {
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}
					}
				}
			}
		}
	}
</style>
