<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">我的</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="person">
				<view class="head">
					<view class="user" @tap="goUser">
						<image :src="list.headImage"></image>
						<view>{{list.nickName}}</view>
						<image src="../../static/images/vip2.png" style="width: 40rpx;height: 40rpx;margin-left: 28rpx;" v-if="list.isVip == 1"></image>
					</view>
					<image class="msg" :src="list.readMessage == 1 ? '../../static/images/xiaoxi.png' : '../../static/images/msg1.png'" @tap="goMessage"></image>
				</view>
				<view class="count">
					<view @tap="goFriend">
						<text style="font-size: 42rpx;color: #333;margin-right: 12rpx;font-weight: 600;">{{list.guanzhuCount}}</text>关注
					</view>
					<view @tap="goZan">
						<text style="font-size: 42rpx;color: #333;margin-right: 12rpx;font-weight: 600;">{{list.fensiCount}}</text>粉丝
					</view>
				</view>
			</view>
			<view class="bg" @tap="goVip">
				<image :src="list.vipImage"></image>
			</view>
			<view class="list">
				<view class="list-item" @tap="goFoot">
					<view class="list-left">
						<image src="../../static/images/1.png"></image>
						<view class="name">游客足迹</view>
						<view class="icon">{{list.zujiCount}}</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
				<view class="list-item" @tap="goPublic">
					<view class="list-left">
						<image src="../../static/images/2.png"></image>
						<view class="name">我的发布</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
				<view class="list-item" @tap="goHistory">
					<view class="list-left">
						<image src="../../static/images/3.png"></image>
						<view class="name">浏览历史</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
				<view class="list-item" @tap="goAbout">
					<view class="list-left">
						<image src="../../static/images/4.png"></image>
						<view class="name">联系我们</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
				<view class="list-item" @tap="goCompany">
					<view class="list-left">
						<image src="../../static/images/5.png"></image>
						<view class="name">我要合作</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
				<view class="list-item" @tap="goShop">
					<view class="list-left">
						<image src="../../static/images/6.png"></image>
						<view class="name">我的店铺</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
				<view class="list-item" style="border-bottom: none;" @tap="goQuestion">
					<view class="list-left">
						<image src="../../static/images/7.png"></image>
						<view class="name">我要投诉</view>
					</view>
					<image src="../../static/images/right.png"></image>
				</view>
			</view>
		</view>
		<view class="vips" v-if="show" @tap="goHide">
			<view class="vips-box" @tap.stop="">
				<view class="warn">权限不足，请去开通会员</view>
				<view class="open" @tap="goVip">去开通</view>
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
				show: false,
				list: {}
			}
		},
		onLoad() {
			if(!uni.getStorageSync('uid')) {
				uni.reLaunch({
				    url: '/pages/login/login'
				})
				return
			}
		},
		onShow() {
			if(!uni.getStorageSync('uid')) {
				uni.reLaunch({
				    url: '/pages/login/login'
				})
				return
			}
			this.init()
		},
		methods: {
			init() {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/mine',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 1) {
								Toast.hideLoading()
								self.list = res.data.dataList
								wx.$app.updateMyProfile({
									nick: self.list.nickName,
									avatar: self.list.headImage
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goFoot() {
				if(this.list.isVip == 2) {
					this.show = true
					return
				}
				uni.navigateTo({
				    url: '/pages/foot/foot'
				})
			},
			goUser() {
				uni.navigateTo({
				    url: '/pages/person/person'
				})
			},
			goMessage() {
				uni.navigateTo({
				    url: '/pages/message/message'
				})
			},
			goVip() {
				this.show = false
				uni.navigateTo({
				    url: '/pages/openVip/openVip'
				})
			},
			goPublic() {
				uni.navigateTo({
				    url: '/pages/myPublic/myPublic'
				})
			},
			goAbout() {
				uni.navigateTo({
				    url: '/pages/about/about'
				})
			},
			goHistory() {
				uni.navigateTo({
				    url: '/pages/history/history'
				})
			},
			goShop() {
				if(this.list.isVip == 2) {
					this.show = true
					return
				}
				uni.navigateTo({
				    url: '/pages/myShop/myShop'
				})
			},
			goCompany() {
				uni.navigateTo({
				    url: '/pages/company/company'
				})
			},
			goQuestion() {
				uni.navigateTo({
				    url: '/pages/question/question'
				})
			},
			goFriend() {
				// if(this.list.isVip == 2) {
				// 	this.show = true
				// 	return
				// }
				uni.navigateTo({
				    url: '/pages/myFriend/myFriend'
				})
			},
			goZan() {
				if(this.list.isVip == 2) {
					this.show = true
					return
				}
				uni.navigateTo({
				    url: '/pages/myZan/myZan'
				})
			},
			goHide() {
				this.show = false
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
		
		.vips {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999999999;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.4);
			display: flex;
			justify-content: center;
			align-items: center;
			
			.vips-box {
				width: 80%;
				border-radius: 6px;
				background: #fff;
				display: flex;
				flex-direction: column;
				
				.warn {
					width: 100%;
					padding: 40rpx 0;
					text-align: center;
					font-size: 30rpx;
					color: #333;
					border-bottom: 1px solid #eee;
				}
				
				.open {
					width: 100%;
					padding: 40rpx 0;
					text-align: center;
					font-size: 30rpx;
					color: #0081FF;
				}
			}
		}
		
		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.person {
				width: 100%;
				padding: 24rpx;
				background: #fff;
				border-radius: 4px;
				box-sizing: border-box;
				
				.head {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.user {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #333;
						
						image {
							width: 110rpx;
							height: 110rpx;
							border-radius: 50%;
							margin-right: 24rpx;
						}
					}
					
					.msg {
						width: 40rpx;
						height: 40rpx;
					}
				}
				
				.count {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-size: 26rpx;
					color: #999;
					margin-top: 24rpx;
				}
			}
			
			.bg {
				width: 100%;
				height: 360rpx;
				border-radius: 4px;
				margin: 28rpx 0;
				overflow: hidden;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.list {
				width: 100%;
				padding: 0 24rpx;
				box-sizing: border-box;
				border-radius: 4px;
				background: #fff;
				display: flex;
				flex-direction: column;
				
				.list-item {
					width: 100%;
					height: 120rpx;
					border-bottom: 1px solid #eee;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.list-left {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333;
						
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 26rpx;
						}
						
						.name {
							margin-right: 60rpx;
						}
						
						.icon {
							padding: 2rpx 20rpx;
							border-radius: 24px;
							font-size: 24rpx;
							color: #fff;
							background: #F74848;
						}
					}
					
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
</style>
