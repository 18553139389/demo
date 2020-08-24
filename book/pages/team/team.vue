<template>
	<view class="contain">
		<img class="bg" src="../../static/images/td_bg.png" alt="">
		<view class="wrapper">
			<view class="titles">团队中心</view>
			<view class="message">
				<img :src="user.icon" alt="">
				<view class="user">
					<view style="font-size: 15px;">{{user.name}}</view>
					<view>推荐人：{{user.fname ? user.fname : '官网推荐'}}</view>
				</view>
			</view>
			<view class="list">
				<view class="money">￥{{user.alreadymoney}}</view>
				<view class="text">成功提现佣金(元)</view>
				<view class="can">
					<view class="can-money">
						<view class="can-count">可提现佣金(元)</view>
						<view class="can-total">￥{{user.nowmoney}}</view>
					</view>
					<view class="can-btn" @tap="goMoney">佣金提现</view>
				</view>
				<view class="navs">
					<view class="nav-tab" @tap="goCode" style="border-right: 1px solid #eee;">
						<img src="../../static/images/erweima.png" alt="">
						<view>推广二维码</view>
					</view>
					<view class="nav-tab" @tap="goCount" style="border-right: 1px solid #eee;">
						<img src="../../static/images/yeji.png" alt="">
						<view>业绩统计</view>
					</view>
					<view class="nav-tab" @tap="goSort">
						<img src="../../static/images/paiming.png" alt="">
						<view>佣金排名</view>
					</view>
				</view>
				<view class="tabs">
					<view class="lis" style="border-bottom: 1px solid #eee;border-right: 1px solid #eee;" @tap="teamMoney">
						<image src="../../static/images/yongjin.png" mode="scaleToFill"></image>
						<view class="lis-item">
							<view class="lis-money">{{user.allmoney}}</view>
							<view>团队佣金(元)</view>
						</view>
					</view>
					<view class="lis" style="border-bottom: 1px solid #eee;" @tap="teamOrder">
						<image style="height: 76upx;" src="../../static/images/dingdan.png" mode="scaleToFill"></image>
						<view class="lis-item">
							<view class="lis-money">{{user.groupordernum}}</view>
							<view>团队订单(笔)</view>
						</view>
					</view>
					<view class="lis" style="border-right: 1px solid #eee;" @tap="goDetail">
						<image src="../../static/images/mingxi.png" mode="scaleToFill"></image>
						<view class="lis-item">
							<view class="lis-money">{{user.tixiannum}}</view>
							<view>提现明细(笔)</view>
						</view>
					</view>
					<view class="lis" @tap="goCenter">
						<image src="../../static/images/tuandui.png" mode="scaleToFill"></image>
						<view class="lis-item">
							<view class="lis-money">{{user.mygroupnum}}</view>
							<view>我的团队(人)</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				user: {}
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				//获取团队中心数据
				let self = this
				let data1 = {
					cmd: 'groupcentre',
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
								self.user.nowmoney = parseFloat(self.user.nowmoney).toFixed(2)
								self.user.allmoney = parseFloat(self.user.allmoney).toFixed(2)
								self.user.alreadymoney = parseFloat(self.user.alreadymoney).toFixed(2)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			teamOrder() {
				uni.navigateTo({
				    url: '/pages/teamOrder/teamOrder?price=' + this.user.allmoney
				})
			},
			goMoney() {
				uni.navigateTo({
				    url: '/pages/money/money?money=' + this.user.nowmoney
				})
			},
			goDetail() {
				uni.navigateTo({
				    url: '/pages/teamDetail/teamDetail'
				})
			},
			teamMoney() {
				let list = JSON.stringify(this.user)
				uni.navigateTo({
				    url: '/pages/teamMoney/teamMoney?list=' + list
				})
			},
			goCenter() {
				uni.navigateTo({
				    url: '/pages/teamCenter/teamCenter?num1=' + this.user.mygroupyijinum + '&num2=' + this.user.mygrouperjinum
				})
			},
			goCode() {
				uni.navigateTo({
				    url: '/pages/teamCode/teamCode'
				})
			},
			goCount() {
				uni.navigateTo({
				    url: '/pages/teamCount/teamCount'
				})
			},
			goSort() {
				uni.navigateTo({
				    url: '/pages/teamSort/teamSort'
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
		position: relative;

		.bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 642upx;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			z-index: 20;
			padding: 0 28upx;
			box-sizing: border-box;

			.titles {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				font-size: 15px;
				color: #FFFFFF;
			}

			.message {
				width: 100%;
				display: flex;

				img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
				}

				.user {
					height: 120upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 12upx 0 12upx 40upx;
					font-size: 14px;
					color: #FFFFFF;
				}
			}

			.list {
				width: 100%;
				border-radius: 4px;
				padding: 28upx 0;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				background: #FFFFFF;
				margin-top: 30upx;

				.money {
					width: 100%;
					height: 100upx;
					line-height: 100upx;
					text-align: center;
					font-size: 28px;
					color: #333;
				}

				.text {
					width: 100%;
					text-align: center;
					font-size: 12px;
					color: #333;
				}

				.can {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 28upx;
					box-sizing: border-box;
					margin-top: 80upx;
					background: #FEF5EE;

					.can-money {
						display: flex;
						flex-direction: column;

						.can-count {
							font-size: 12px;
							color: #333;
						}

						.can-total {
							font-size: 20px;
							color: #333;
							margin-top: 24upx;
						}
					}

					.can-btn {
						padding: 12upx 40upx;
						background: #FF6600;
						border-radius: 30px;
						font-size: 14px;
						color: #FFFFFF;
					}
				}

				.navs {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: 28upx;
					box-sizing: border-box;
					font-size: 14px;
					color: #333;
					margin-top: 60upx;
					background: #FEF5EE;

					.nav-tab {
						width: 33.33%;
						display: flex;
						flex-direction: column;
						align-items: center;

						img {
							width: 80upx;
							height: 80upx;
							margin-bottom: 24upx;
						}
					}
				}

				.tabs {
					width: 100%;
					padding: 22upx;
					box-sizing: border-box;
					background: #FEF5EE;
					display: flex;
					flex-wrap: wrap;
					margin-top: 50upx;

					.lis {
						width: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 12px;
						color: #666;
						padding: 50upx 0;

						image {
							width: 66upx;
							height: 66upx;
						}

						.lis-item {
							display: flex;
							flex-direction: column;
							margin-left: 36upx;

							.lis-money {
								font-size: 20px;
								color: #333;
								margin-bottom: 10upx;
							}
						}
					}
				}
			}
		}
	}
</style>
