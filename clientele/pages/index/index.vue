<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">OK找证</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image class="top-img" src="../../static/images/dianji.png" mode="widthFix"></image>
			<view class="search" @tap="goSearch">
				<image src="../../static/images/search.png"></image>
				<input type="text" v-model="val" placeholder="请输入要搜索的资质名称" disabled>
			</view>
			<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#FFFFFF">
				<swiper-item v-for="(v,k) in banner" :key="k">
					<image class="logo" :src="v.image" @tap="goOther(v)"></image>
				</swiper-item>
			</swiper>
			<view class="nav">
				<view class="nav-item" v-for="(v,k) in nav" :key="k" :style="{marginRight:(k+1)%2 == 0 ? '0' : '4%'}" @tap="goBuy(k)">
					<image :src="v"></image>
				</view>
			</view>
			<view class="news">
				<view class="n-left">
					<img src="../../static/images/notice1.png" alt="">
				</view>
				<view class="content">
					<an-notice-bar :text="text" :showSerial="false"></an-notice-bar>
				</view>
			</view>
		</view>
		<view class="hot">
			<view class="titles">
				<view class="titles-left">
					<view class="big">强烈推荐</view>
					<view>有需求就能满足</view>
				</view>
				<view class="titles-right" @tap="goHot">
					<view>更多热推</view>
					<image src="../../static/images/rights.png"></image>
				</view>
			</view>
			<view class="lists">
				<view class="item" v-for="(v,k) in list" :key="k" @tap="goDetail(v.cid)">
					<view class="item-img">
						<image :src="v.image"></image>
						<view class="state" v-if="v.iszhuan == 1">已转让</view>
					</view>
					<view class="item-right">
						<view class="item-tit">{{v.name}}</view>
						<view class="box">
							<!-- <view>￥{{v.price}}</view> -->
							<view style="color: #FF411C;font-weight: 500;">有效期：{{v.termofvalidity}}</view>
							<image src="../../static/images/call.png" @tap="goCall(v.phone)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="hot" style="margin-top: 40rpx;">
			<view class="titles">
				<view class="titles-left">
					<view class="bigs">最新政策</view>
				</view>
				<view class="titles-right" @tap="goMore">
					<view>更多信息</view>
					<image src="../../static/images/rights.png"></image>
				</view>
			</view>
			<view class="lists">
				<view class="item" v-for="(v,k) in content" :key="k" @tap="goMessage(v.title,v.content,v.adtime)">
					<image :src="v.image" style="width: 220rpx;height: 140rpx;"></image>
					<view class="item-rights">
						<view>{{v.title}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AnNoticeBar from '../../components/an-notice-bar/an-notice-bar.vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#ffffff',
				val: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				banner: [],
				nav: [],
				text: '发布新的通知|资质服务最好',
				content: [],
				list: []
			}
		},
		components: {
			AnNoticeBar
		},
		onLoad(options) {
			if(options.scene){
				uni.setStorageSync('pid',options.scene)
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: 'homepage',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.banner = res.data.dataList
								let content = []
								for(let i=0;i<res.data.horseracelampList.length;i++){
									content.push(res.data.horseracelampList[i].content)
								}
								self.text = content.join('|')
								self.nav = []
								self.nav.push(res.data.dataobject.image1)
								self.nav.push(res.data.dataobject.image2)
								self.nav.push(res.data.dataobject.image3)
								self.nav.push(res.data.dataobject.image4)
								self.list = res.data.certificatesList
								self.content = res.data.informationsList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goBuy(k) {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/first/first'
					})
					return
				}
				if(k == 0) {
					uni.navigateTo({
					    url: '/pages/buy/buy'
					})
				} else if(k == 1) {
					uni.navigateTo({
					    url: '/pages/Accreditation/Accreditation'
					})
				} else if(k == 2) {
					uni.navigateTo({
					    url: '/pages/sell/sell'
					})
				} else if(k == 3) {
					uni.navigateTo({
					    url: '/pages/deposit/deposit'
					})
				}
			},
			goCall(n) {
				uni.makePhoneCall({
				    phoneNumber: n
				})
			},
			goSearch() {
				uni.navigateTo({
				    url: '/pages/search/search'
				})
			},
			goDetail(id) {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/first/first'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/buyDetail/buyDetail?id=' + id
				})
			},
			goMessage(tit, text, time) {
				this.$store.commit('changeContent', text)
				uni.navigateTo({
					url: '/pages/web1/web1?title=' + tit + '&time=' + time
				})
			},
			goOther(item) {
				if(item.type == 0) {
					this.$store.commit('changeContent', item.content)
					uni.navigateTo({
						url: '/pages/web1/web1?title=详情'
					})
				} else if(item.type == 1) {
					uni.navigateTo({
						url: '/pages/video/video?url=' + item.video
					})
				} else if(item.type == 2) {
					uni.navigateTo({
						url: '/pages/buyDetail/buyDetail?id=' + item.cid
					})
				}
			},
			goMore() {
				uni.navigateTo({
				    url: '/pages/messageList/messageList'
				})
			},
			goHot() {
				uni.navigateTo({
				    url: '/pages/hotMore/hotMore'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
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
			padding: 0 28rpx;
			box-sizing: border-box;
			position: relative;
			padding-top: 50rpx;
			
			.top-img {
				position: absolute;
				right: 40rpx;
				top: 8rpx;
				width: 360rpx;
				z-index: 999;
			}
			
			.search {
				width: 100%;
				padding: 18rpx 24rpx;
				box-sizing: border-box;
				border-radius: 24px;
				background: #F6F6F6;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 28rpx 0;
			
				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 30rpx;
					margin-left: 60rpx;
				}
			
				input {
					flex: 0.7;
					font-size: 28rpx;
					color: #333;
				}
			}
			
			swiper {
				width: 100%;
				height: 360rpx;
				margin-bottom: 50rpx;
			
				swiper-item {
					width: 100%;
					height: 360rpx;
					border-radius: 6px;
					overflow: hidden;
			
					image {
						width: 100%;
						height: 100%;
						border-radius: 6px;
					}
					
					.video {
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.nav {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				
				.nav-item {
					width: 48%;
					height: 220rpx;
					margin-right: 4%;
					margin-bottom: 4%;
					
					image {
						width: 100%;
						height: 100%;
						border-radius: 6px;
					}
				}
			}
			
			.news {
				width: 100%;
				height: 80upx;
				display: flex;
				align-items: center;
				padding: 0 30upx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 4px;
				background: #F7F7F7;
				margin: 24upx auto;
				font-size: 14px;
				color: #333;
				margin-bottom: 50rpx;
			
				.n-left {
					display: flex;
					align-items: center;
					margin-right: 40rpx;
					
					img {
						width: 44upx;
						height: 44upx;
					}
					
					.speaks {
						height: 44upx;
						line-height: 44upx;
						font-size: 14px;
						color: #333;
						margin-left: 20rpx;
					}
				}
			
				.content {
					width: 80%;
					font-size: 14px;
					color: #666;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		
		.hot {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			border-bottom: 8rpx solid #eee;
			
			.titles {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.titles-left {
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					color: #666;
					
					.big {
						font-size: 36rpx;
						color: #333;
						font-weight: 600;
						margin-bottom: 20rpx;
						position: relative;
					}
					
					.big:before {
						content: '';
						position: absolute;
						top: 0;
						right: 20rpx;
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						border: 6rpx solid #00C800;
					}
					
					.bigs {
						font-size: 36rpx;
						color: #333;
						font-weight: 600;
						position: relative;
					}
					
					.bigs:before {
						content: '';
						position: absolute;
						top: 0;
						right: -30rpx;
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						border: 6rpx solid #00C800;
					}
				}
				
				.titles-right {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #666;
					
					image {
						width: 30rpx;
						height: 30rpx;
						margin-left: 20rpx;
					}
				}
			}
			
			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.item {
					display: flex;
					padding: 40rpx 0;
					border-bottom: 1px solid #eee;
					
					.item-img {
						width: 220rpx;
						height: 140rpx;
						position: relative;
						border-radius: 6px;
						overflow: hidden;
						
						image {
							width: 220rpx;
							height: 140rpx;
						}
						
						.state {
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							z-index: 999;
							background: rgba(0,0,0,.4);
							font-size: 26rpx;
							color: #0081FF;
						}
					}
					
					.item-right {
						width: 72%;
						height: 140rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 30rpx;
						color: #333;
						font-weight: 600;
						padding-left: 24rpx;
						box-sizing: border-box;
						position: relative;
						
						.box {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 30rpx;
							color: #FF0000;
							
							.item-tit {
								width: 100%;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
							}
							
							image {
								width: 38rpx;
								height: 38rpx;
								margin-right: 40rpx;
							}
						}
					}
					
					.item-rights {
						width: 72%;
						height: 140rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						font-size: 28rpx;
						color: #333;
						padding-left: 24rpx;
						box-sizing: border-box;
						
						.item-content {
							width: 100%;
							color: #999;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
				}
				
				.item:last-child {
					border-bottom: none;
				}
			}
		}
		
		.hot:last-child {
			border-bottom: none;
		}
	}
</style>
