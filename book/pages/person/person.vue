<template>
	<view class="contain">
		<view class="wrapper">
			<view class="top">
				<view class="user" @tap="goPerson">
					<view class="msg">
						<img :src="user.icon ? user.icon : '../../static/images/morentouxiang.png'" alt="">
						<view class="name">
							<view>{{user.nickname}}</view>
							<view>{{user.phone}}</view>
						</view>
					</view>
					<img src="../../static/images/geren_xiyiye.png" alt="">
				</view>
				<view class="order">
					<view class="mine">
						<view>我的订单</view>
						<view class="right" @tap="goAll">
							<view>查看全部</view>
							<img src="../../static/images/tongzhi_xiayige.png" alt="">
						</view>
					</view>
					<view class="lists">
						<view class="item" @tap="goOrder(1)">
							<view class="icon">
								<img src="../../static/images/daifukuan.png" alt="">
								<view class="mask" v-if="showNum && user.payment != 0">{{user.payment}}</view>
							</view>
							<view>付款待确认</view>
						</view>
						<view class="item" @tap="goOrder(2)">
							<view class="icon">
								<img src="../../static/images/daiqueren.png" alt="">
								<view class="mask" v-if="showNum && user.receivables != 0">{{user.receivables}}</view>
							</view>
							<view>收款待确认</view>
						</view>
						<view class="item" @tap="goOrder(3)">
							<view class="icon">
								<img src="../../static/images/weituodaimai.png" alt="">
								<view class="mask" v-if="showNum && user.grounding != 0">{{user.grounding}}</view>
							</view>
							<view>委托代卖</view>
						</view>
					</view>
				</view>
				<view class="uls">
					<view class="uls-item" @tap="goAddress">
						<view class="uls-left">
							<img src="../../static/images/geren_dizhi.png" alt="">
							<view>地址管理</view>
						</view>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
					<view class="uls-item" @tap="goMessage">
						<view class="uls-left">
							<img src="../../static/images/geren_bangding.png" style="width: 34upx;height: 34upx;" alt="">
							<view>绑定信息</view>
						</view>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
					<view class="uls-item" @tap="goBind">
						<view class="uls-left">
							<img src="../../static/images/geren_shouji.png" style="width: 33upx;height: 49upx;" alt="">
							<view>换绑手机号</view>
						</view>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
					<!-- <view class="uls-item" @tap="goOauth">
						<view class="uls-left">
							<img src="../../static/images/geren_shouquan.png" style="width: 33upx;height: 40upx;" alt="">
							<view>支付宝授权</view>
						</view>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view> -->
					<view class="uls-item" @tap="goSet">
						<view class="uls-left">
							<img src="../../static/images/geren_shezhi.png" style="width: 33upx;height: 33upx;" alt="">
							<view>我的设置</view>
						</view>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
				<view class="quan">版权所有：易淘商城</view>
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
				user: {},
				showNum: false
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'userInfo',
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.user = res.data.dataobject
								self.showNum = true
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goPerson() {
				uni.navigateTo({
					url: '/pages/personMessage/personMessage'
				})
			},
			goBind() {
				uni.navigateTo({
					url: '/pages/bind/bind'
				})
			},
			goAll() {
				uni.navigateTo({
					url: '/pages/order/order?type=0'
				})
			},
			goOrder(type) {
				uni.navigateTo({
					url: '/pages/order/order?type=' + type
				})
			},
			goAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			goMessage() {
				uni.navigateTo({
					url: '/pages/bindMessage/bindMessage'
				})
			},
			goSet() {
				uni.navigateTo({
					url: '/pages/set/set'
				})
				// window.location.href = `alipays://platformapi/startapp?appId=20000123&actionType=scan&biz_data={"s": "money","u": "2088222744659519","a": "1","m":"备注123"}`
			},
			goOauth() {
				if(this.user.zhifubaoid) {
					Toast.showToast('您已授权，无需再授权')
				} else {
					let uid = btoa(uni.getStorageSync('uid'))
					let url = encodeURIComponent('https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2021001105698991&application_type=WEBAPP&redirect_uri=https://www.ytsh.vip/easyamoy/api/alilogin&state=' + uid)
					let urls = encodeURIComponent('https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021001105698991&scope=auth_base&redirect_uri=https://www.ytsh.vip/easyamoy/api/alilogin&state=' + uid)
					window.location.href = `alipays://platformapi/startapp?appId=20000067&url=${urls}`
				}
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

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			.top {
				width: 100%;
				height: 440upx;
				background: url(../../static/images/geren_bg.png) no-repeat;
				background-size: 100% 100%;

				.user {
					width: 100%;
					padding: 50upx 28upx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;

					img {
						width: 18;
						height: 27upx;
					}

					.msg {
						display: flex;
						align-items: center;

						img {
							width: 100upx;
							height: 100upx;
							border-radius: 50%;
						}

						.name {
							height: 100upx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							font-size: 14px;
							color: #FFFFFF;
							margin-left: 24upx;
						}
					}
				}

				.order {
					width: 92%;
					padding: 24upx;
					box-sizing: border-box;
					border-radius: 6px;
					background: #FFFFFF;
					margin: 0 auto;
					box-shadow: 0 1px 5px rgba(0, 0, 0, .1);

					.mine {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 14px;
						color: #333;
						border-bottom: 1px solid #eee;
						padding-bottom: 24upx;

						.right {
							display: flex;
							align-items: center;
							font-size: 14px;
							color: #999;

							img {
								width: 18upx;
								height: 27upx;
								margin-left: 16upx;
							}
						}
					}

					.lists {
						width: 100%;
						display: flex;
						justify-content: space-around;
						margin-bottom: 30upx;

						.item {
							display: flex;
							flex-direction: column;
							align-items: center;
							font-size: 28upx;
							color: #666;
							margin-top: 30upx;

							.icon {
								width: 100upx;
								height: 100upx;
								border-radius: 50%;
								position: relative;
								margin-bottom: 24upx;

								.mask {
									width: 36upx;
									height: 36upx;
									border-radius: 50%;
									background: red;
									display: flex;
									justify-content: center;
									align-items: center;
									font-size: 18upx;
									color: #FFFFFF;
									position: absolute;
									top: 0;
									right: -8upx;
								}

								img {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}

				.uls {
					width: 100%;
					padding: 0 28upx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					margin-top: 60upx;

					.uls-item {
						width: 100%;
						height: 100upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #eee;

						.uls-left {
							display: flex;
							align-items: center;
							font-size: 28upx;
							color: #333;

							img {
								width: 33upx;
								height: 40upx;
								margin-right: 24upx;
							}
						}

						img {
							width: 18upx;
							height: 27upx;
						}
					}
				}

				.quan {
					width: 100%;
					height: 120upx;
					line-height: 120upx;
					text-align: center;
					font-size: 14px;
					color: #999;
					margin-bottom: 120upx;
				}
			}
		}
	}
</style>
