<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">检察服务企业360</block>
				<block slot="right">
					<image src="../../static/images/my.png" style="width: 36rpx;height: 40rpx;"></image>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#FFFFFF">
				<swiper-item v-for="(v,k) in banner" :key="k">
					<image class="logo" :src="v.image"></image>
				</swiper-item>
			</swiper>
			<view class="ask">
				<view class="ask-title">
					<view>困难求助</view>
					<view class="btns" v-if="!state">
						<view>使用本模块请先登录</view>
						<view class="login" @tap="goLogin">登录</view>
					</view>
					<view class="btns" v-if="state">
						<view>{{name}}</view>
						<view class="login" @tap="goLogin">退出登录</view>
					</view>
				</view>
				<view class="ask-img">
					<view class="ask1" @tap="goLaw">
						<image :src="imgs1"></image>
					</view>
					<view class="ask2" @tap="goQuestion">
						<image :src="imgs2"></image>
					</view>
				</view>
			</view>
			<view class="ask" v-if="list1.length > 0">
				<view class="titles">
					<view class="titles-left">
						<view class="bigs">政策法规</view>
					</view>
					<view class="titles-right" @tap="goAll">
						<view>展开全部</view>
						<image src="../../static/images/rights.png"></image>
					</view>
				</view>
				<view class="list">
					<view class="list-item" v-for="(v,k) in list1" :key="k" @tap="goDetail(v.id,0)">
						<image :src="v.pic"></image>
						<view class="list-right">
							<view class="list-top">
								<view class="list-title">{{v.title}}</view>
								<view style="color: #666;">{{v.addtime}}</view>
							</view>
							<view class="list-middle">{{v.message}}</view>
							<view class="message">
								<view class="look" style="width: 30%;">
									<image src="../../static/images/look.png"></image>
									<view>{{v.viewnumber}}</view>
								</view>
								<view class="look">
									<image src="../../static/images/zan.png" style="width: 26rpx;height: 26rpx;"></image>
									<view>{{v.lieknumber}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ask" style="margin-bottom: 36rpx;" v-if="list2.length > 0">
				<view class="titles">
					<view class="titles-left">
						<view class="bigs">典型案例</view>
					</view>
					<view class="titles-right" @tap="goAll1">
						<view>展开全部</view>
						<image src="../../static/images/rights.png"></image>
					</view>
				</view>
				<view class="list">
					<view class="list-item" v-for="(v,k) in list2" :key="k" @tap="goDetail(v.id,1)">
						<image :src="v.pic"></image>
						<view class="list-right">
							<view class="list-top">
								<view class="list-title">{{v.title}}</view>
								<view style="color: #666;">{{v.addtime}}</view>
							</view>
							<view class="list-middle">{{v.message}}</view>
							<view class="message">
								<view class="look" style="width: 30%;">
									<image src="../../static/images/look.png"></image>
									<view>{{v.viewnumber}}</view>
								</view>
								<view class="look">
									<image src="../../static/images/zan.png" style="width: 26rpx;height: 26rpx;"></image>
									<view>{{v.lieknumber}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
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
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				banner: [],
				imgs1: '',
				imgs2: '',
				list1: [],
				list2: [],
				state: false,
				name: ''
			}
		},
		onShow() {
			this.list1 = []
			this.list2 = []
			if(uni.getStorageSync('uid')) {
				this.name = uni.getStorageSync('name')
				this.state = true
			}
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: 'banner',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success) {
								Toast.hideLoading()
								for(let i=0;i<res.data.body.adList.length;i++) {
									if(res.data.body.adList[i].type == 1) {
										self.imgs1 = res.data.body.adList[i].image
									} 
									if(res.data.body.adList[i].type == 2) {
										self.imgs2 = res.data.body.adList[i].image
									}
								}
								self.banner = res.data.body.bannerList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
				
				let data2 = {
					type: 1,
					uid: uni.getStorageSync('uid'),
					nowPage: 1,
					pageCount: 2
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'lawyerMessage',
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.success) {
								Toast.hideLoading()
								for(let i=0;i<res.data.body.maps.length;i++) {
									self.list2.push(res.data.body.maps[i])
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
				
				let data3 = {
					type: 2,
					uid: uni.getStorageSync('uid'),
					nowPage: 1,
					pageCount: 2
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'lawyerMessage',
						data: data3,
						success: function(res) {
							console.log(res)
							if (res.data.success) {
								Toast.hideLoading()
								for(let i=0;i<res.data.body.maps.length;i++) {
									self.list1.push(res.data.body.maps[i])
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goRight() {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/my/my'
				})
			},
			goLaw() {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/law/law'
				})
			},
			goQuestion() {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/question/question'
				})
			},
			goAll() {
				uni.navigateTo({
					url: '/pages/example/example'
				})
			},
			goAll1() {
				uni.navigateTo({
					url: '/pages/example1/example1'
				})
			},
			goDetail(id, type) {
				// if(!uni.getStorageSync('uid')) {
				// 	uni.reLaunch({
				// 	    url: '/pages/login/login'
				// 	})
				// 	return
				// }
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&type=' + type
				})
			},
			goLogin() {
				uni.reLaunch({
				    url: '/pages/login/login'
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
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			swiper {
				width: 100%;
				height: 360rpx;
			
				swiper-item {
					width: 100%;
					height: 360rpx;
			
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.ask {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				
				.ask-title {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					font-size: 28rpx;
					color: #333;
					font-weight: 600;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				
				.btns {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					color: #666;
					font-weight: 500;
					
					.login {
						padding: 0 24rpx;
						height: 48rpx;
						line-height: 48rpx;
						border-radius: 12px;
						font-size: 24rpx;
						color: #FFFFFF;
						background: #172454;
						margin-left: 40rpx;
					}
				}
				
				.ask-img {
					width: 100%;
					display: flex;
					justify-content: space-between;
					
					.ask1 {
						width: 220rpx;
						height: 300rpx;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
					
					.ask2 {
						width: 460rpx;
						height: 300rpx;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				
				.titles {
					width: 100%;
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.titles-left {
						display: flex;
						flex-direction: column;
						font-size: 28rpx;
						color: #333;
						font-weight: 600;
					}
					
					.titles-right {
						height: 120rpx;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #666;
						
						image {
							width: 38rpx;
							height: 38rpx;
							margin-left: 20rpx;
						}
					}
				}
				
				.list {
					width: 100%;
					background: #FFFFFF;
					padding: 24rpx 24rpx 0 24rpx;
					box-sizing: border-box;
					border-radius: 4px;
					display: flex;
					flex-direction: column;
					
					.list-item {
						width: 100%;
						display: flex;
						margin-bottom: 36rpx;
						
						image {
							width: 160rpx;
							height: 160rpx;
							border-radius: 4px;
						}
						
						.list-right {
							width: 75%;
							height: 160rpx;
							padding-left: 20rpx;
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							
							.list-top {
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;
								font-size: 28rpx;
								color: #333;
								
								.list-title {
									width: 60%;
									overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
								}
							}
							
							.list-middle {
								width: 100%;
								font-size: 24rpx;
								color: #666;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
							}
							
							.message {
								width: 100%;
								display: flex;
								align-items: center;
								
								.look {
									display: flex;
									align-items: center;
									font-size: 26rpx;
									color: #666;
									
									image {
										width: 40rpx;
										height: 40rpx;
										margin-right: 10rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
