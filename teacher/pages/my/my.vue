<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">我的</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="user">
				<img :src="list.portrait" alt="">
				<view class="user-msg">
					<view class="name">{{list.name}}</view>
					<view class="heart">信用值：{{list.faith}}</view>
				</view>
				<view class="message">
					<view class="message-list">
						<view style="color: #333;font-size: 30upx;">{{list.todayOrder}}</view>
						<view class="tag">今日接单量</view>
					</view>
					<view class="message-list">
						<view style="color: #333;font-size: 30upx;">{{list.todayEarnings}}</view>
						<view class="tag">今日收益</view>
					</view>
					<view class="message-list">
						<view style="color: #333;font-size: 30upx;">{{list.totalOrder}}</view>
						<view class="tag">接单总量</view>
					</view>
					<view class="message-list">
						<view style="color: #333;font-size: 30upx;">{{list.TotalEarnings}}</view>
						<view class="tag">总收益</view>
					</view>
				</view>
			</view>
			<view class="forms">
				<view class="item" @tap="goMessage">
					<view class="item-left">
						<img src="../../static/images/my1.png" alt="">
						<view style="margin-left: 24upx;">个人信息</view>
					</view>
					<img src="../../static/images/myback.png" alt="">
				</view>
				<view class="item" @tap="myMoney">
					<view class="item-left">
						<img src="../../static/images/my2.png" alt="">
						<view style="margin-left: 24upx;">账户余额</view>
					</view>
					<img src="../../static/images/myback.png" alt="">
				</view>
				<view class="item" @tap="goCredit">
					<view class="item-left">
						<img src="../../static/images/my3.png" alt="">
						<view style="margin-left: 24upx;">信用值明细</view>
					</view>
					<img src="../../static/images/myback.png" alt="">
				</view>
			</view>
			<view class="forms" style="margin-top: 0;border-bottom: none;">
				<view class="item" @tap="goCount">
					<view class="item-left">
						<img src="../../static/images/my7.png" alt="">
						<view style="margin-left: 24upx;">我的仓库</view>
					</view>
					<img src="../../static/images/myback.png" alt="">
				</view>
				<view class="item" @tap="goQuestion">
					<view class="item-left">
						<img src="../../static/images/my4.png" alt="">
						<view style="margin-left: 24upx;">技术知识解答</view>
					</view>
					<img src="../../static/images/myback.png" alt="">
				</view>
				<view class="item" @tap="goComment">
					<view class="item-left">
						<img src="../../static/images/my5.png" alt="">
						<view style="margin-left: 24upx;">收到的评论</view>
					</view>
					<img src="../../static/images/myback.png" alt="">
				</view>
				<view class="item" @tap="goModify">
					<view class="item-left">
						<img src="../../static/images/my6.png" alt="">
						<view style="margin-left: 24upx;">修改密码</view>
					</view>
					<img src="../../static/images/myback.png" alt="">
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
				list: {}
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/maintainer/info',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.list = res.data.body
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goMessage() {
				uni.navigateTo({
				    url: '/pages/personMessage/personMessage'
				})
			},
			myMoney() {
				uni.navigateTo({
				    url: '/pages/pack/pack'
				})
			},
			goCredit() {
				uni.navigateTo({
				    url: '/pages/credit/credit'
				})
			},
			goQuestion() {
				uni.navigateTo({
				    url: '/pages/question/question'
				})
			},
			goComment() {
				uni.navigateTo({
				    url: '/pages/comment/comment'
				})
			},
			goModify() {
				uni.navigateTo({
				    url: '/pages/bind/bind'
				})
			},
			goCount() {
				uni.navigateTo({
				    url: '/pages/store/store'
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
			
			.user {
				width: 100%;
				display: flex;
				align-items: center;
				padding: 30upx 24upx 120upx;
				box-sizing: border-box;
				background: #006ee3;
				position: relative;
				
				img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
				}
				
				.user-msg {
					padding-left: 30upx;
					display: flex;
					flex-direction: column;
					height: 120upx;
					justify-content: space-around;
					
					.name {
						font-size: 28upx;
						color: #fff;
					}
					
					.heart {
						font-size: 24upx;
						color: #fff;
					}
				}
				
				.message {
					width: 92%;
					display: flex;
					justify-content: space-around;
					padding: 24upx;
					box-sizing: border-box;
					border-radius: 4px;
					background: #fff;
					position: absolute;
					left: 24upx;
					bottom: -80upx;
					box-shadow: 0 1px 0 0px rgba(0,0,0,0.2);
					
					.message-list {
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 26upx;
						color: #666;
						
						.tag {
							padding: 6upx 16upx;
							border-radius: 4px;
							background: #d8ebff;
							font-size: 24upx;
							color: #006ee3;
							margin-top: 40upx;
						}
					}
				}
			}
			
			.forms {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 120upx;
				padding: 0 24upx;
				box-sizing: border-box;
				border-bottom: 10upx solid #eee;
				
				.item {
					width: 100%;
					height: 110upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					.item-left {
						display: flex;
						align-items: center;
						font-size: 28upx;
						color: #333;
						
						img {
							width: 45upx;
							height: 38upx;
						}
					}
					
					img {
						width: 22upx;
						height: 29upx;
					}
				}
				
				.item:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
