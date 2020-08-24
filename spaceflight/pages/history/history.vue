<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">浏览历史</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="nav">
				<view :class="navIndex == k ? 'active nav-item' : 'nav-item'" v-for="(v,k) in nav" :key="k" @tap="change(k)">{{v}}</view>
			</view>
			<view class="list" v-if="itemIndex == 0">
				<view class="list-items" v-for="(v,k) in list" :key="k" @tap="goDetail(v.id)" @longpress="goDel(v.id,k)">
					<view class="content" @tap="">
						<text class="hot">热帖</text>
						{{v.state ? v.title : (v.title.length > 40 ? v.title.substr(0,40) + '...' : v.title)}}
						<text class="all" @tap.stop="goAll(k)" v-if="!v.state && v.title.length > 40">全文</text>
						<text class="all" @tap.stop="goHide(k)" v-if="v.state && v.title.length > 40">收缩</text>
					</view>
					<image :src="v.imageUrl" mode="widthFix"></image>
					<view class="list-bottom">
						<view class="list-left">
							<view class="common">
								<image src="../../static/images/browse.png"></image>
								<view>{{v.seeCount}}</view>
							</view>
							<view class="common">
								<image src="../../static/images/praise.png" style="width: 28rpx;height: 28rpx;"></image>
								<view>{{v.zanCount}}</view>
							</view>
						</view>
						<view class="list-left">
							<view class="common" style="margin-right: 0;">
								<image src="../../static/images/task.png" style="width: 32rpx;height: 32rpx;"></image>
								<view>{{v.creatDate}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-if="itemIndex == 1">
				<view class="item" v-for="(v,k) in list1" :key="k" @longpress="goDel(v.id,k)">
					<view class="user">
						<image :src="v.headImage"></image>
						<view class="message">
							<view>{{v.nickname}}</view>
							<view class="time">{{v.createDate}}</view>
						</view>
					</view>
					<image class="one" mode="widthFix" :src="v.imageUrls[0]" v-if="v.imageUrls && v.imageUrls.length == 1" style="width: 100;height: 360rpx;"></image>
					<view class="more" v-if="v.imageUrls && v.imageUrls.length > 1">
						<image v-for="(item,index) in v.imageUrls" :key="index" :src="item" :style="{marginRight:(k+1)%3 == 0 ? '0' : '5%'}"></image>
					</view>
					<view class="video" v-if="v.vedioUrl && v.vedioUrl.length > 0">
						<video v-for="(v,k) in v.vedioUrl" :key="k" :src="v" objectFit="cover"></video>
					</view>
					<view class="content">{{v.content}}</view>
				</view>
			</view>
			<view class="list" v-if="itemIndex == 2">
				<view class="list-item" v-for="(v,k) in list2" :key="k" @tap="goPreview(v.fileUrl,v.id)" @longpress="goDel(v.id,k)">
					<image src="../../static/images/7.png"></image>
					<view class="box">
						<view class="box-title">{{v.title}}-{{v.state == 0 ? '未完成' : '已完成'}}</view>
						<view class="box-time">{{v.createDate}}</view>
					</view>
				</view>
			</view>
			<view class="no" v-if="show">
				<image src="http://www.mescroll.com/img/mescroll-empty.png"></image>
				<view class="produce">还没有新的浏览记录</view>
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
				backColor: '#fff',
				itemIndex: 0,
				navIndex: 0,
				nav: ['资讯', '供需', '合同'],
				imgs: ['../../static/images/list.png', '../../static/images/list.png', '../../static/images/list.png'],
				list: [],
				list1: [],
				list2: [],
				show: false
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			change(k) {
				if(this.navIndex == k) {
					return
				}
				this.itemIndex = k
				this.navIndex = k
				this.init()
			},
			init() {
				let self = this
				let index = this.navIndex
				if(this.navIndex == 2) {
					index = 3
				}
				this.show = false
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					type: index
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/seeHistory',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(self.navIndex == 0) {
									if(res.data.dataList.length > 0) {
										self.list = res.data.dataList
										self.list.forEach((item, index) => {
											item.state = false
										})
									} else {
										self.show = true
									}
								} else if(self.navIndex == 1) {
									if(res.data.dataList.length > 0) {
										self.list1 = res.data.dataList
									} else {
										self.show = true
									}
								} else {
									if(res.data.dataList.length > 0) {
										self.list2 = res.data.dataList
									} else {
										self.show = true
									}
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
			goAll(k) {
				this.list[k].state = true
				this.$forceUpdate()
			},
			goHide(k) {
				this.list[k].state = false
				this.$forceUpdate()
			},
			goDetail(id) {
				uni.navigateTo({
				    url: '/pages/listDetail/listDetail?id=' + id
				})
			},
			goPreview(url,id) {
				uni.downloadFile({
					url: url,
					success: function(res) {
						var filePath = res.tempFilePath
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								console.log('打开文档成功')
							}
						})
					}
				})
			},
			goDel(id,k) {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认删除此历史记录吗',
					success: function(res) {
						if (res.confirm) {
							self.delMessage(id,k)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			delMessage(id,k) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/delSeeHistory',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(self.itemIndex == 0) {
									self.list.splice(k,1)
									if(self.list.length == 0) {
										self.show = true
									}
								}
								if(self.itemIndex == 1) {
									self.list1.splice(k,1)
									console.log(self.list1.length)
									if(self.list1.length == 0) {
										self.show = true
									}
								}
								if(self.itemIndex == 2) {
									self.list2.splice(k,1)
									if(self.list2.length == 0) {
										self.show = true
									}
								}
								Toast.showToast('删除成功')
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
			border-top: 10px solid #f6f6f6;
			background: #fff;

			.nav {
				width: 100%;
				display: flex;
				padding: 36rpx 28rpx;
				box-sizing: border-box;
				justify-content: space-between;
				border-bottom: 1px solid #eee;

				.nav-item {
					padding: 8rpx 24rpx;
					box-shadow: 0 0 5px rgba(0, 0, 0, .2);
					border-radius: 30px;
					font-size: 30rpx;
					color: #666;

					&.active {
						background: #0081FF;
						color: #fff;
					}
				}
			}
			
			.no {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 30rpx 0;
				
				image {
					width: 200rpx;
					height: 200rpx;
				}
				
				.produce {
					width: 100%;
					font-size: 26rpx;
					color: #999;
					text-align: center;
					margin-top: 30rpx;
				}
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;

				.list-items {
					width: 100%;
					display: flex;
					flex-direction: column;
					border-bottom: 10px solid #f6f6f6;
					padding: 24rpx 28rpx 0;
					box-sizing: border-box;
				
					.content {
						width: 100%;
						font-size: 28rpx;
						line-height: 22px;
						color: #333;
						text-align: justify;
				
						.hot {
							height: 29rpx;
							line-height: 32rpx;
							display: inline-block;
							padding: 4rpx 12rpx;
							border-radius: 16px;
							border: 1px solid #0081FF;
							font-size: 24rpx;
							color: #0081FF;
							margin-right: 24rpx;
						}
				
						.all {
							color: #0081FF;
						}
					}
					
					image {
						width: 100%;
						border-radius: 4px;
						margin: 32rpx 0;
					}
					
					.list-bottom {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.list-left {
							display: flex;
							align-items: center;
							
							.common {
								display: flex;
								align-items: center;
								font-size: 28rpx;
								color: #333;
								margin-right: 80rpx;
								
								image {
									width: 36rpx;
									height: 36rpx;
									margin-right: 16rpx;
								}
							}
						}
					}
				}
				
				.list-items:last-child {
					border-bottom: none;
				}

				.item {
					width: 100%;
					padding: 40rpx 28rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					border-bottom: 10px solid #f6f6f6;

					.user {
						width: 100%;
						display: flex;

						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 4px;
						}

						.message {
							height: 100rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							font-size: 28rpx;
							color: #333;
							padding-left: 20rpx;
							box-sizing: border-box;

							.time {
								font-size: 24rpx;
								color: #999;
							}
						}
					}

					.more {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						margin: 30rpx 0 0;

						image {
							width: 30%;
							height: 200rpx;
							border-radius: 4px;
							margin: 0 3.33% 3.33% 0;
						}
					}
					
					.video {
						width: 100%;
						
						video {
							width: 100%;
							height: 360rpx;
							margin-top: 30rpx;
						}
					}

					.one {
						width: 100%;
						margin: 30rpx 0;
						border-radius: 4px;
					}

					.content {
						width: 100%;
						font-size: 28rpx;
						color: #666;
						line-height: 18px;
						margin-top: 30rpx;
					}
				}

				.item:last-child {
					border-bottom: none;
				}

				.list-item {
					width: 100%;
					display: flex;
					align-items: center;
					padding: 30rpx 28rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;

					image {
						width: 80rpx;
						height: 80rpx;
					}

					.box {
						height: 80rpx;
						padding-left: 24rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.box-title {
							font-size: 30rpx;
							color: #333;
						}

						.box-time {
							font-size: 24rpx;
							color: #999;
						}
					}
				}

				.list-item:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
