<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="false" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">商家中心</block>
				<block slot="right">
					<image class="code" :src="'data:image/jpg;base64,' + img"></image>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="shop" @tap="goUser">
				<image :src="list.logo"></image>
				<view>{{list.title}}</view>
			</view>
			<view class="report">
				<view class="common">
					<view>{{list.orderNum}}</view>
					<view class="name">今日订单量</view>
				</view>
				<view class="common">
					<view>￥{{list.balance}}</view>
					<view class="name">当前余额</view>
				</view>
				<view class="common" @tap="goPay">
					<view>￥{{list.deposit}}</view>
					<view class="name">开户费</view>
				</view>
			</view>
			<view class="lists">
				<view class="list-item">
					<view class="list-left">
						<image src="../../static/images/shijian.png"></image>
						<view>营业时间 {{list.hours}}</view>
					</view>
					<evan-switch v-model="checked" activeColor="#FF4848" inactiveColor="#fff" :size="20" @change="change"></evan-switch>
				</view>
				<view class="list-item" @tap="goCount">
					<view class="list-left">
						<image src="../../static/images/baobiao.png"></image>
						<view>订单报表</view>
					</view>
					<image class="enter" src="../../static/images/xiayige.png"></image>
				</view>
				<view class="btns" @tap="goOut">退出登录</view>
			</view>
		</view>
		<view class="codes" v-if="show" @tap="goHide">
			<view class="box">
				<!-- <tki-qrcode id="captureId" cid="qrcode1" ref="qrcode" :val="url" :size="size" :unit="unit"
				:icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
				:usingComponents="true" @result="qrR" /> -->
				<image :src="'data:image/jpg;base64,' + img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import EvanSwitch from '../../components/evan-switch/evan-switch.vue'
	import tkiQrcode from '../../components/tki-qrcode/tki-qrcode.vue'
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				checked: true,
				url: '',
				dataURL: '',
				size: 300, // 二维码大小
				unit: 'upx', // 单位
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: false, // 组件加载完成后自动生成二维码
				show: false,
				list: {},
				img: ''
			}
		},
		components: {
			EvanSwitch,
			tkiQrcode
		},
		onShow() {
			this.init()
		},
		methods: {
			goRight() {
				this.show = true
				let self = this
				// this.url = uni.getStorageSync('uid')
				
				// self.$nextTick(function() {
				// 	self.$refs.qrcode._makeCode()
				// })
			},
			goHide() {
				this.show = false
			},
			init() {
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/shopCenter',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
								if(res.data.state == 0) {
									self.checked = false
								} else {
									self.checked = true
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
				//获取二维码
				let datas1 = {
					scene: uni.getStorageSync('uid'),
					page: 'pagesE/shop/shopDetails'
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/getUnlimited',
						data: datas1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.img = res.data.image
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goUser() {
				uni.navigateTo({
					url: '/pages/user/user'
				})
			},
			goPay() {
				uni.navigateTo({
					url: '/pages/open/open?money=' + this.list.amount
				})
			},
			goCount() {
				uni.navigateTo({
					url: '/pages/count/count'
				})
			},
			goOut() {
				uni.removeStorageSync('uid')
				uni.reLaunch({
				    url: '/pages/login/login'
				})
			},
			qrR() {
				
			},
			change(e) {
				console.log(e)
				let self = this
				let num = 0
				if(e) {
					num = 1
				} else {
					num = 0
				}
				let datas = {
					uid: uni.getStorageSync('uid'),
					operate: num
				}
				let data = {
					url: '/updateShopOperate',
					data: datas,
					success: function(res) {
						console.log(res)
					}
				}
				ajax(data)
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
		background: #FFFFFF;
		
		.codes {
			width: 100%;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.5);
			z-index: 99999999;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.box {
				padding: 32upx;
				background: #fff;
				
				image {
					width: 220rpx;
					height: 220rpx;
				}
			}
		}
		
		.fixed {
			width: 100%;
			
			.code {
				width: 40upx;
				height: 40upx;
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.shop {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				image {
					width: 160upx;
					height: 160upx;
				}
				
				view {
					font-size: 28upx;
					color: #333;
					margin-top: 24upx;
				}
			}
			
			.report {
				width: 100%;
				padding: 40upx 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				color: #333;
				border-bottom: 8upx solid #ccc;
				
				
				.common {
					display: flex;
					flex-direction: column;
					align-items: center;
					
					.name {
						color: #999;
						margin-top: 20upx;
					}
				}
			}
			
			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 40upx;
				
				.list-item {
					width: 100%;
					height: 100upx;
					padding: 0 30upx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					.list-left {
						height: 100upx;
						display: flex;
						align-items: center;
						font-size: 28upx;
						color: #666;
						
						image {
							width: 70upx;
							height: 70upx;
							margin-right: 30upx;
						}
					}
					
					.enter {
						width: 18upx;
						height: 27upx;
						margin-right: 16upx;
					}
				}
				
				.btns {
					width: 80%;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					font-size: 30upx;
					color: #fff;
					border-radius: 40px;
					margin: 80upx auto 0;
					background: #FF4848;
				}
			}
		}
	}
</style>
