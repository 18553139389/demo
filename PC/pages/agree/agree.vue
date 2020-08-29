<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">
				<view>检查服务企业360</view>
				<image class="head" src="../../static/images/my.png" @tap="goPerson"></image>
			</view>
			<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#FFFFFF">
				<swiper-item v-for="(v,k) in banner" :key="k">
					<image class="logo" :src="v.image"></image>
				</swiper-item>
			</swiper>
			<view class="box">
				<view class="left">
					<view class="top">
						<view class="titles">
							<view>政策法规</view>
							<view class="circle"></view>
						</view>
						<view class="rights" @tap="goList1">
							<view>展开全部</view>
							<image src="../../static/images/right.png"></image>
						</view>
					</view>
					<view class="list">
						<view class="item" v-for="(v,k) in list1" :key="k" @tap="goDetail(v.id,0)">
							<image :src="v.pic"></image>
							<view class="message">
								<view class="m_title">{{v.title}}</view>
								<!-- <view class="m_content">{{v.addtime}}</view> -->
								<view class="other">
									<view class="m_time">{{v.addtime}}</view>
									<view class="look">
										<view class="see">
											<image src="../../static/images/look.png"></image>
											<view>{{v.viewnumber}}</view>
										</view>
										<view class="see" style="margin-left: 40rpx;">
											<image src="../../static/images/zan.png" style="width: 7rpx;height: 7rpx;"></image>
											<view>{{v.lieknumber}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="top" style="margin-top: 20rpx;">
						<view class="titles">
							<view>典型案例</view>
							<view class="circle"></view>
						</view>
						<view class="rights" @tap="goList2">
							<view>展开全部</view>
							<image src="../../static/images/right.png"></image>
						</view>
					</view>
					<view class="list">
						<view class="item" v-for="(v,k) in list2" :key="k" @tap="goDetail(v.id,1)">
							<image :src="v.pic"></image>
							<view class="message">
								<view class="m_title">{{v.title}}</view>
								<!-- <view class="m_content"></view> -->
								<view class="other">
									<view class="m_time">{{v.addtime}}</view>
									<view class="look">
										<view class="see">
											<image src="../../static/images/look.png"></image>
											<view>{{v.viewnumber}}</view>
										</view>
										<view class="see" style="margin-left: 40rpx;">
											<image src="../../static/images/zan.png" style="width: 7rpx;height: 7rpx;"></image>
											<view>{{v.lieknumber}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="top">
						<view class="titles">
							<view>困难求助</view>
							<view class="circle"></view>
						</view>
						<view class="rights" v-if="!state">
							<view>使用本模块请先登陆</view>
							<view class="btn" @tap="goLogin">登陆</view>
						</view>
						<view class="rights" v-if="state">
							<view>{{name}}</view>
							<view class="btn" @tap="goLogin">退出登录</view>
						</view>
					</view>
					<view class="detail">
						<image class="img1" :src="imgs1" @tap="goLaw"></image>
						<image class="img2" :src="imgs2" @tap="goQuestion"></image>
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
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				banner: [{
					image: '../../static/images/1.jpg'
				},{
					image: '../../static/images/3.jpg'
				}],
				state: false,
				name: '',
				list1: [],
				list2: [],
				imgs1: '',
				imgs2: ''
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
				let data4 = {
					url: 'banner',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
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
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data4)
				
				let data2 = {
					type: 1,
					uid: uni.getStorageSync('uid'),
					nowPage: 1,
					pageCount: 2
				}
				let data5 = {
					url: 'lawyerMessage',
					data: data2,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							for(let i=0;i<res.data.body.maps.length;i++) {
								self.list2.push(res.data.body.maps[i])
							}
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data5)
				
				let data3 = {
					type: 2,
					uid: uni.getStorageSync('uid'),
					nowPage: 1,
					pageCount: 2
				}
				let data6 = {
					url: 'lawyerMessage',
					data: data3,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							for(let i=0;i<res.data.body.maps.length;i++) {
								self.list1.push(res.data.body.maps[i])
							}
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data6)
			},
			goLaw() {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/index/index'
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
					    url: '/pages/index/index'
					})
					return
				}
				uni.navigateTo({
				    url: '/pages/question/question'
				})
			},
			goList1() {
				uni.navigateTo({
				    url: '/pages/list1/list1'
				})
			},
			goList2() {
				uni.navigateTo({
				    url: '/pages/list2/list2'
				})
			},
			goDetail(id, type) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&type=' + type
				})
			},
			goPerson() {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/index/index'
					})
					return
				}
				uni.navigateTo({
				    url: '/pages/person/person'
				})
			},
			goLogin() {
				uni.clearStorageSync()
				uni.reLaunch({
				    url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #F6F6F6;

		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 10rpx;
			box-sizing: border-box;
			background: #FFFFFF;

			.title {
				width: 100%;
				height: 20rpx;
				line-height: 20rpx;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
				margin-bottom: 5rpx;
				position: relative;
				
				.head {
					position: absolute;
					width: 10rpx;
					height: 10rpx;
					top: 5rpx;
					right: 10rpx;
					cursor: pointer;
				}
			}
			
			.swiper {
				width: 100%;
				height: 150rpx;
			
				swiper-item {
					width: 100%;
					height: 150rpx;
			
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.box {
				width: 100%;
				padding: 15rpx 5rpx 0 5rpx;
				box-sizing: border-box;
				display: flex;
				
				.left {
					width: 60%;
					display: flex;
					flex-direction: column;
					padding-right: 10rpx;
					border-right: 1px solid #eee;
					
					.top {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.titles {
							font-size: 15px;
							font-weight: 600;
							color: #333;
							position: relative;
							
							.circle {
								width: 4px;
								height: 4px;
								border: 2px solid #333;
								border-radius: 50%;
								position: absolute;
								top: 0;
								right: -15px;
							}
						}
						
						.rights {
							display: flex;
							align-items: center;
							font-size: 15px;
							color: #333;
							
							image {
								width: 6rpx;
								height: 6rpx;
								margin-left: 5rpx;
							}
						}
					}
					
					.list {
						width: 100%;
						display: flex;
						flex-direction: column;
						
						.item {
							width: 100%;
							display: flex;
							padding: 8rpx 0;
							border-bottom: 1px solid #eee;
							
							image {
								width: 40rpx;
								height: 40rpx;
								border-radius: 4px;
							}
							
							.message {
								width: calc(100% - 40rpx);
								height: 40rpx;
								padding-left: 8rpx;
								box-sizing: border-box;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								
								.m_title {
									width: 100%;
									font-size: 15px;
									color: #333;
									overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
								}
								
								.m_content {
									width: 100%;
									font-size: 14px;
									color: #666;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
								}
								
								.other {
									width: 100%;
									display: flex;
									justify-content: space-between;
									align-items: center;
									
									.m_time {
										font-size: 14px;
										color: #666;
									}
									
									.look {
										display: flex;
										align-items: center;
										
										.see {
											display: flex;
											align-items: center;
											font-size: 14px;
											color: #666;
											
											image {
												width: 10rpx;
												height: 10rpx;
												margin-right: 4rpx;
											}
										}
									}
								}
							}
						}
					}
				}
				
				.right {
					width: 40%;
					display: flex;
					flex-direction: column;
					padding-left: 10rpx;
					box-sizing: border-box;
					
					.top {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.titles {
							font-size: 15px;
							font-weight: 600;
							color: #333;
							position: relative;
							
							.circle {
								width: 4px;
								height: 4px;
								border: 2px solid #333;
								border-radius: 50%;
								position: absolute;
								top: 0;
								right: -15px;
							}
						}
						
						.rights {
							display: flex;
							align-items: center;
							font-size: 15px;
							color: #333;
							
							image {
								width: 6rpx;
								height: 6rpx;
								margin-left: 5rpx;
							}
							
							.btn {
								padding: 1rpx 5rpx;
								border-radius: 30px;
								background: #172454;
								font-size: 12px;
								color: #FFFFFF;
								margin-left: 10rpx;
							}
						}
					}
					
					.detail {
						width: 100%;
						display: flex;
						justify-content: space-between;
						margin-top: 10rpx;
						
						.img1 {
							width: 132px;
							height: 180px;
							border-radius: 4px;
						}
						
						.img2 {
							width: 276px;
							height: 180px;
							border-radius: 4px;
						}
					}
				}
			}
		}
	}
</style>
