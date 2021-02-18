<template>
	<view class="contain">
		<view class="top" @tap="goPerson">
			<image :src="userInfo.icon"></image>
			<view class="user">{{userInfo.nickname}}</view>
		</view>
		<view class="nav">
			<view class="nav-item">
				<view class="item-left common" @tap="goPoint">
					<view style="font-size: 40rpx;margin-bottom: 16rpx;">{{userInfo.integrals}}</view>
					<view>总积分</view>
				</view>
				<view class="item-left">
					<view style="font-size: 40rpx;margin-bottom: 16rpx;">{{userInfo.allintegrals}}</view>
					<view>可提现积分</view>
					<view class="money" @tap="goCash">提现</view>
					<view class="finish" @tap="goOwn">已兑换</view>
				</view>
			</view>
			<view class="list">
				<view class="search">
					<view class="search-box" @tap="goSearch">
						<image src="../../static/images/search.png" mode="widthFix" @tap="confirm"></image>
						<input type="text" v-model="value" placeholder="请输入关键字进行搜索" confirm-type="search" disabled>
					</view>
					<image class="icon" v-if="type == 1" src="../../static/images/change1.png" mode="widthFix" @tap="goType"></image>
					<image class="icon" v-if="type == 2" src="../../static/images/change2.png" mode="widthFix" @tap="goType"></image>
				</view>
				<view class="banner">
					<u-swiper :list="bannerList" border-radius="12" height="300" @click="goUrl"></u-swiper>
				</view>
				<view class="module1" v-if="type == 1 && list1.length > 0">
					<view class="title">
						<view>积分兑-保障</view>
						<view class="more" @tap="goMore">
							<view>更多保障</view>
							<image src="../../static/images/right.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="column">
						<view class="item" v-for="(v,k) in list1" :key="k" @tap="goDetail(v.pcid,1)">
							<view class="imgs">
								<image :src="v.image"></image>
								<view class="mark" v-if="v.ishot == 1">热销</view>
							</view>
							<view class="message">
								<view class="msg-title">{{v.name}}</view>
								<!-- <view class="msg-produce">{{v.descs}}</view> -->
								<!-- <view class="example-produce">
									<u-parse :content="v.descs"></u-parse>
								</view> -->
								<view class="price">
									<view>{{v.integrals}}积分</view>
									<view class="btn">去兑换</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="module1" v-if="type == 1 && list2.length > 0">
					<view class="title">
						<view>积分兑-服务</view>
						<view class="more" @tap="goService">
							<view>更多服务</view>
							<image src="../../static/images/right.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="column">
						<view class="item" v-for="(v,k) in list2" :key="k" @tap="goDetail(v.pcid,2)">
							<view class="imgs">
								<image :src="v.image"></image>
								<view class="mark" v-if="v.ishot == 1">热销</view>
							</view>
							<view class="message">
								<view class="msg-title">{{v.name}}</view>
								<!-- <view class="msg-produce">{{v.descs}}</view> -->
								<!-- <view class="example-produce">
									<u-parse :content="v.descs"></u-parse>
								</view> -->
								<view class="price">
									<view>{{v.integrals}}积分</view>
									<view class="btn">去兑换</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="module2" v-if="type == 2 && list1.length > 0">
					<view class="title">
						<view>积分兑-保障</view>
						<view class="more">
							<view>更多保障</view>
							<image src="../../static/images/right.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="example" v-for="(v,k) in list1" :key="k" :style="{marginRight:(k+1)%2 == 0 ? '0' : '4%'}" @tap="goDetail(v.pcid,1)">
						<view class="imgs">
							<image :src="v.image"></image>
							<view class="mark" v-if="v.ishot == 1">热销</view>
						</view>
						<view class="example-title">{{v.name}}</view>
						<!-- <view class="example-produce">{{v.descs}}</view> -->
						<!-- <view class="example-produce">
							<u-parse :content="v.descs"></u-parse>
						</view> -->
						<view class="example-price">
							<view>{{v.integrals}}积分</view>
							<view class="btn">去兑换</view>
						</view>
					</view>
				</view>
				<view class="module2" v-if="type == 2 && list2.length > 0">
					<view class="title">
						<view>积分兑-服务</view>
						<view class="more">
							<view>更多服务</view>
							<image src="../../static/images/right.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="example" v-for="(v,k) in list2" :key="k" :style="{marginRight:(k+1)%2 == 0 ? '0' : '4%'}" @tap="goDetail(v.pcid,2)">
						<view class="imgs">
							<image :src="v.image"></image>
							<view class="mark" v-if="v.ishot == 1">热销</view>
						</view>
						<view class="example-title">{{v.name}}</view>
						<!-- <view class="example-produce">{{v.descs}}</view> -->
						<!-- <view class="example-produce">
							<u-parse :content="v.descs"></u-parse>
						</view> -->
						<view class="example-price">
							<view>{{v.integrals}}积分</view>
							<view class="btn">去兑换</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				type: 1,
				userInfo: {},
				value: '',
				bannerList: [],
				list1: [],
				list2: []
			}
		},
		components: {
			uParse
		},
		onLoad() {
			// uni.setStorageSync('uid', '84db6345783541ab89bb9ea9e030b1ff')
			// uni.clearStorage()
			if(uni.getStorageSync('uid')) {
				console.log(uni.getStorageSync('uid'))
			} else {
				if(option.uid) {
					console.log(option.uid)
					uni.setStorageSync('uid', option.uid)
				} else {
					// this.$u.post('weixinlogin?type=2').then(res => {
					// 	console.log(res)
					// })
					window.location.href = 'http://integral.dazhoutian.net/integralwall/api/weixinlogin?type=2'
				}
			}
		},
		onShow() {
			// 获取个人信息
			this.$u.post('userinfo', {
				uid: uni.getStorageSync('uid')
			}).then(res => {
				console.log(res)
				if(res.result == 0) {
					this.userInfo = res.dataobject
				}
			})
			
			// 获取轮播图
			this.$u.post('getbannerlist').then(res => {
				console.log(res)
				if(res.result == 0) {
					this.bannerList = res.dataList
				}
			})
			
			// 获取保障商品
			this.$u.post('getproductlist',{
				type: 1,
				nowPage: 1,
				pageCount: 6
			}).then(res => {
				console.log(res)
				if(res.result == 0) {
					this.list1 = res.dataList
				}
			})
			
			// 获取服务商品
			this.$u.post('getproductlist',{
				type: 2,
				nowPage: 1,
				pageCount: 6
			}).then(res => {
				console.log(res)
				if(res.result == 0) {
					this.list2 = res.dataList
				}
			})
		},
		methods: {
			goPoint() {
				uni.navigateTo({
				    url: '/pages/point/point?score=' + this.userInfo.integrals
				})
			},
			goPerson() {
				uni.reLaunch({
					url: '/pages/person/person'
				})
			},
			goUrl(index) {
				console.log(this.bannerList[index].urls)
				window.history.pushState(null, null, "index.html")
				window.location.href = this.bannerList[index].urls
			},
			confirm() {
				// 获取保障商品
				this.$u.post('getproductlist',{
					type: 1,
					content: this.value,
					nowPage: 1,
					pageCount: 3
				}).then(res => {
					console.log(res)
					if(res.result == 0) {
						this.list1 = res.dataList
					}
				})
				
				// 获取服务商品
				this.$u.post('getproductlist',{
					type: 2,
					content: this.value,
					nowPage: 1,
					pageCount: 3
				}).then(res => {
					console.log(res)
					if(res.result == 0) {
						this.list2 = res.dataList
					}
				})
			},
			goType() {
				if(this.type == 1) {
					this.type = 2
				} else {
					this.type = 1
				}
			},
			goDetail(id, type) {
				uni.navigateTo({
				    url: '/pages/myProduct/myProduct?id=' + id + '&type=' + type
				})
			},
			goMore() {
				uni.navigateTo({
				    url: '/pages/moreDetail/moreDetail?type=1'
				})
			},
			goService() {
				uni.navigateTo({
				    url: '/pages/moreDetail/moreDetail?type=2'
				})
			},
			goCash() {
				uni.navigateTo({
				    url: '/pages/money/money?score=' + this.userInfo.allintegrals
				})
			},
			goOwn() {
				uni.navigateTo({
				    url: '/pages/exchange/exchange'
				})
			},
			goSearch() {
				uni.navigateTo({
				    url: '/pages/searchProduct/searchProduct'
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

		.top {
			width: 100%;
			height: 160rpx;
			background: #fe5f23;
			display: flex;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.user {
				font-size: 28rpx;
				color: #FFFFFF;
				margin-left: 28rpx;
			}
		}

		.nav {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			margin: 50rpx 0;

			.nav-item {
				width: 100%;
				height: 160rpx;
				border-radius: 6px;
				background: #FFFFFF;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				display: flex;

				.item-left {
					width: 50%;
					height: 160rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					color: #fe5f23;
					position: relative;

					&.common:after {
						content: '';
						position: absolute;
						top: 40rpx;
						right: 0;
						width: 1px;
						height: 80rpx;
						background: #fe5f23;
					}

					.money {
						width: 100rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: #fe5f23;
						position: absolute;
						top: 30rpx;
						right: 0;
						border-top-left-radius: 24px;
						border-bottom-left-radius: 24px;
						font-size: 24rpx;
						color: #FFFFFF;
					}

					.finish {
						width: 100rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: #fe5f23;
						position: absolute;
						top: 85rpx;
						right: 0;
						border-top-left-radius: 24px;
						border-bottom-left-radius: 24px;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}
			}

			.list {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 6px;
				background: #FFFFFF;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				margin-top: 40rpx;

				.search {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.search-box {
						width: 90%;
						height: 70rpx;
						line-height: 70rpx;
						border-radius: 30px;
						background: #e3e3e3;
						display: flex;
						align-items: center;
						padding: 0 24rpx;
						box-sizing: border-box;

						image {
							width: 50rpx;
							margin-bottom: 4rpx;
						}

						input {
							font-size: 28rpx;
							color: #333;
							margin-left: 30rpx;
						}
					}

					.icon {
						width: 56rpx;
					}
				}

				.banner {
					width: 100%;
					display: flex;
					flex-direction: column;
					margin: 30rpx 0;
				}

				.module1 {
					width: 100%;
					display: flex;
					flex-direction: column;

					.title {
						font-size: 32rpx;
						color: #333;
						font-weight: 600;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.more {
							font-size: 26rpx;
							color: #999;
							display: flex;
							align-items: center;

							image {
								width: 50rpx;
								// margin-bottom: 10rpx;
							}
						}
					}

					.column {
						width: 100%;
						display: flex;
						flex-direction: column;

						.item {
							width: 100%;
							display: flex;
							padding: 28rpx 0;
							border-bottom: 1px solid #eee;
							
							.imgs {
								width: 180rpx;
								height: 180rpx;
								border-radius: 6px;
								overflow: hidden;
								position: relative;
								
								image {
									width: 180rpx;
									height: 180rpx;
								}
								
								.mark {
									width: 70rpx;
									height: 40rpx;
									line-height: 40rpx;
									text-align: center;
									font-size: 24rpx;
									color: #fff;
									position: absolute;
									top: 0;
									right: 0;
									background: #fe5f23;
									border-bottom-left-radius: 6px;
								}
							}

							.message {
								width: 70%;
								height: 180rpx;
								padding-left: 24rpx;
								box-sizing: border-box;
								display: flex;
								flex-wrap: wrap;
								flex-direction: column;
								justify-content: space-between;

								.msg-title {
									width: 100%;
									font-size: 30rpx;
									color: #333;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}

								.msg-produce {
									width: 100%;
									font-size: 26rpx;
									color: #666;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
									white-space: pre-wrap;
									line-height: 18px;
								}

								.price {
									width: 100%;
									display: flex;
									justify-content: space-between;
									align-items: center;
									font-size: 28rpx;
									color: #fe5f23;

									.btn {
										width: 120rpx;
										height: 44rpx;
										line-height: 44rpx;
										text-align: center;
										border-radius: 24px;
										background: #fe5f23;
										font-size: 26rpx;
										color: #FFFFFF;
									}
								}
							}
						}

						.item:last-child {
							border-bottom: none;
						}
					}
				}

				.module2 {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					
					.title {
						font-size: 30rpx;
						color: #333;
						font-weight: 600;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 24rpx;
					
						.more {
							font-size: 26rpx;
							color: #999;
							display: flex;
							align-items: center;
					
							image {
								width: 50rpx;
								// margin-bottom: 10rpx;
							}
						}
					}

					.example {
						width: 48%;
						display: flex;
						flex-direction: column;
						margin-bottom: 28rpx;
						
						.imgs {
							width: 100%;
							height: 308rpx;
							border-radius: 6px;
							overflow: hidden;
							position: relative;
							
							image {
								width: 100%;
								height: 308rpx;
							}
							
							.mark {
								width: 70rpx;
								height: 40rpx;
								line-height: 40rpx;
								text-align: center;
								font-size: 24rpx;
								color: #fff;
								position: absolute;
								top: 0;
								right: 0;
								background: #fe5f23;
								border-bottom-left-radius: 6px;
							}
						}

						.example-title {
							width: 100%;
							font-size: 30rpx;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin: 24rpx 0;
						}

						.example-produce {
							width: 100%;
							font-size: 26rpx;
							color: #666;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							white-space: pre-wrap;
							line-height: 20px;
							height: 80rpx;
						}

						.example-price {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 28rpx;
							color: #fe5f23;
							margin-top: 28rpx;

							.btn {
								width: 120rpx;
								height: 44rpx;
								line-height: 44rpx;
								text-align: center;
								border-radius: 24px;
								background: #fe5f23;
								font-size: 26rpx;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}
</style>
