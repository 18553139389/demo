<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">疑难免费咨询</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles">客服小O</view>
			<view class="item">
				<view class="service-item" style="margin-bottom: 28rpx;">
					<view class="service">
						<image src="../../static/images/wx.png"></image>
						<view>客服微信：{{list.weixin1}}</view>
					</view>
					<view class="copy" @tap="onCopy(list.weixin1)">复制</view>
				</view>
				<view class="service-item">
					<view class="service">
						<image src="../../static/images/phone.png"></image>
						<view>{{list.phone1}}</view>
					</view>
					<view class="copy" @tap="goCall(list.phone1)">拨打</view>
				</view>
			</view>
			<view class="titles">客服小K</view>
			<view class="item">
				<view class="service-item" style="margin-bottom: 28rpx;">
					<view class="service">
						<image src="../../static/images/wx.png"></image>
						<view>客服微信：{{list.weixin2}}</view>
					</view>
					<view class="copy" @tap="onCopy(list.weixin2)">复制</view>
				</view>
				<view class="service-item">
					<view class="service">
						<image src="../../static/images/phone.png"></image>
						<view>{{list.phone2}}</view>
					</view>
					<view class="copy" @tap="goCall(list.phone2)">拨打</view>
				</view>
			</view>
			<view class="maps">
				<view class="location">
					<view class="address">{{list.address}}</view>
					<image src="../../static/images/nav.png" @tap="goFind"></image>
				</view>
				<map style="width: 100%; height: 300px;" :enable-3D="true" :scale="scale" :latitude="latitude" :longitude="longitude"
				:markers="covers" @tap="goFind" @markertap="goFind" @callouttap="goFind"></map>
			</view>
			<view class="btns" @tap="goOpen">预约详谈</view>
		</view>
		<view class="bg" v-if="show">
			<view class="bg-list">
				<view class="bg-title">预约详谈</view>
				<view class="bg-text">预约成功后，客户专员会及时与您取得联系</view>
				<view class="views">
					<image src="../../static/images/user.png"></image>
					<input type="text" v-model="user" placeholder="请输入您的姓名">
				</view>
				<view class="views">
					<image src="../../static/images/tel.png"></image>
					<input type="text" v-model="tel" placeholder="请输入手机号">
				</view>
				<view class="views">
					<image src="../../static/images/address.png"></image>
					<input type="text" v-model="address" placeholder="请输入地址">
				</view>
				<view class="bg-btn" @tap="goSure">快速预约</view>
				<view class="close" @tap="goHide">X</view>
			</view>
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
				user: '',
				tel: '',
				address: '',
				show: false,
				latitude: '34.75',
				longitude: '113.62',
				scale: 10,
				list: {},
				covers: [{
					latitude: '34.75',
					longitude: '113.62',
					iconPath: '../../static/images/dizhi.png',
					callout: {
						content: '',
						borderRadius: 16,
						bgColor: '#ffffff',
						padding: 6,
						fontSize: 14,
						color: '#333333',
						display: 'ALWAYS'
					}
				}],
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: 'customersdetail',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataobject
								self.covers[0].callout.content = self.list.address
								self.latitude = self.list.latitude
								self.longitude = self.list.longitude
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goFind() {
				const latitude = parseFloat(this.latitude)
				const longitude = parseFloat(this.longitude)
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					name: this.list.address,
					success: function() {
						console.log('success')
					},
					complete: function(e) {
						console.log(e)
					}
				})
			},
			goOpen() {
				this.show = true
			},
			goHide() {
				this.show = false
			},
			goCall(call) {
				uni.makePhoneCall({
				    phoneNumber: call
				})
			},
			onCopy(item) {
				uni.setClipboardData({
				    data: item,
				    success: function () {
				       Toast.showToast('复制成功')
				    }
				})
			},
			goSure() {
				let self = this
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.tel))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				if (this.address == '') {
					Toast.showToast('地址不能为空')
					return
				}
				let data1 = {
					uid: uni.getStorageSync('uid'),
					name: this.user,
					phone: this.tel,
					address: this.address
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'addappointments',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.show = false
								Toast.showToast('预约成功')
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
		
		.bg {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9999;
			width: 100%;
			height: 100vh;
			background: rgba(0,0,0,.4);
			display: flex;
			justify-content: center;
			align-items: center;
			
			.bg-list {
				width: 90%;
				padding: 50rpx 40rpx;
				background: #FFFFFF;
				border-radius: 6px;
				border: 4px solid #eee;
				position: relative;
				
				.close {
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 50%;
					background: #f6f6f6;
					text-align: center;
					font-size: 28rpx;
					color: #666;
					position: absolute;
					top: 40rpx;
					right: 40rpx;
				}
				
				.bg-title {
					width: 100%;
					font-size: 30rpx;
					color: #333;
					font-weight: 600;
					text-align: center;
				}
				
				.bg-text {
					width: 100%;
					font-size: 28rpx;
					color: #666;
					text-align: center;
					margin: 40rpx 0;
				}
				
				.views {
					width: 90%;
					height: 90rpx;
					display: flex;
					align-items: center;
					margin: 0 auto 30rpx;
					background: #F6F6F6;
					padding: 0 28rpx;
					box-sizing: border-box;
					
					image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 28rpx;
					}
					
					input {
						font-size: 28rpx;
						color: #008AFF;
					}
				}
				
				.bg-btn {
					position: absolute;
					width: 260rpx;
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 30px;
					background: #00C800;
					text-align: center;
					font-size: 30rpx;
					color: #FFFFFF;
					left: calc(50% - 130rpx);
					bottom: -35rpx;
				}
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.titles {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #E6FFE6;
				font-size: 28rpx;
				color: #00C800;
			}
			
			.item {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				
				.service-item {
					width: 100%;
					height: 90rpx;
					border-radius: 4px;
					background: #F5F5F5;
					padding: 0 24rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28rpx;
					color: #333;
					
					.service {
						display: flex;
						align-items: center;
						
						image {
							width: 36rpx;
							height: 36rpx;
							margin-right: 24rpx;
						}
					}
					
					.copy {
						width: 60rpx;
						height: 60rpx;
						line-height: 66rpx;
						border-radius: 50%;
						text-align: center;
						background: #FF4848;
						font-size: 24rpx;
						color: #FFFFFF;
						margin-left: 120rpx;
					}
				}
			}
			
			.maps {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				margin-bottom: 120rpx;
				
				.location {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 40rpx;
					
					.address {
						width: 82%;
						font-size: 28rpx;
						color: #333;
						line-height: 20px;
					}
					
					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
			
			.btns {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 30rpx;
				color: #FFFFFF;
				background: #249AFD;
				position: fixed;
				left: 0;
				bottom: 0;
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
			}
		}
	}
</style>
