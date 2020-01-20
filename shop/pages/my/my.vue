<template>
	<view class="contain">
		<view class="wrapper">
			<view class="user">
				<view class="head">
					<img :src="list.icon" alt="">
					<view>{{list.nickname}}</view>
				</view>
				<view class="warn" @tap="goMessage">
					<img src="../../static/images/message.png" alt="">
					<view class="icon" v-if="list.msgCount != 0"></view>
				</view>
			</view>
			<view class="tab">
				<view class="tab-item" @tap="goMoney">
					<img src="../../static/images/qianbao@2x.png" alt="">
					<view>我的钱包</view>
				</view>
				<view class="tab-item" @tap="goOrder">
					<img src="../../static/images/dingdan_se@2x.png" alt="">
					<view>订单中心</view>
				</view>
				<view class="tab-item" @tap="goFriend">
					<img src="../../static/images/yaoqinghaoyou@2x.png" alt="">
					<view>推广中心</view>
				</view>
				<view class="tab-item" @tap="goMessage">
					<img src="../../static/images/xiaoxizhongxin@2x.png" alt="">
					<view>消息中心</view>
				</view>
			</view>
			<view class="money">
				<view class="total">
					<view>总收入</view>
					<view style="font-size: 52upx;margin-top: 20upx;">{{list.total}}</view>
				</view>
				<view class="type">
					<view class="type-tab">
						<view>本月收入</view>
						<view style="font-size: 52upx;margin-top: 20upx;">{{list.month}}</view>
					</view>
					<view class="type-tab">
						<view>今日收入</view>
						<view style="font-size: 52upx;margin-top: 20upx;">{{list.today}}</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list-item" @tap="goService">
					<view class="list-left">
						<img src="../../static/images/kefuzhongxin@2x.png" alt="">
						<view style="margin-left: 30upx;">客服中心</view>
					</view>
					<img src="../../static/images/xiangyou@2x.png" alt="">
				</view>
				<view class="list-item" @tap="goBind">
					<view class="list-left">
						<img src="../../static/images/bangdingshouji@2x.png" alt="">
						<view style="margin-left: 30upx;">绑定手机</view>
					</view>
					<img src="../../static/images/xiangyou@2x.png" alt="">
				</view>
				<view class="list-item" @tap="goQuestion">
					<view class="list-left">
						<img src="../../static/images/changjianwenti@2x.png" alt="">
						<view style="margin-left: 30upx;">常见问题</view>
					</view>
					<img src="../../static/images/xiangyou@2x.png" alt="">
				</view>
				<view class="list-item" @tap="goAbout">
					<view class="list-left">
						<img src="../../static/images/guanyuwomen@2x.png" alt="">
						<view style="margin-left: 30upx;">关于我们</view>
					</view>
					<img src="../../static/images/xiangyou@2x.png" alt="">
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
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/userInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goMoney() {
				uni.navigateTo({
				    url: '/pages/money/money'
				})
			},
			goBind() {
				uni.navigateTo({
				    url: '/pages/bind/bind'
				})
			},
			goOrder() {
				uni.switchTab({
				    url: '/pages/order/order'
				})
			},
			goFriend() {
				uni.switchTab({
				    url: '/pages/shopping/shopping'
				})
			},
			goMessage() {
				uni.navigateTo({
					url: '/pages/message/message'
				})
			},
			goService() {
				uni.navigateTo({
					url: '/pages/service/service?wx=' + this.list.wx + '&qq=' + this.list.qq
				})
			},
			goQuestion() {
				uni.navigateTo({
					url: '/pages/content/content?url=' + encodeURIComponent('http://m.tfgwzz.com:8080/display/agreement?id=2')
				})
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/content/content?url=' + encodeURIComponent('http://m.tfgwzz.com:8080/display/agreement?id=1')
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
		background: #EDEDED;
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28upx;
			box-sizing: border-box;
			margin-top: 30upx;
			
			.user {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 0;
				
				.head {
					display: flex;
					align-items: center;
					font-size: 30upx;
					color: #111111;
					
					img {
						width: 120upx;
						height: 120upx;
						border-radius: 50%;
						margin-right: 30upx;
					}
				}
				
				.warn {
					width: 46upx;
					height: 46upx;
					position: relative;
					
					img {
						width: 46upx;
						height: 46upx;
					}
					
					.icon {
						width: 20upx;
						height: 20upx;
						background: red;
						border-radius: 50%;
						position: absolute;
						top: -4upx;
						right: 0;
					}
				}
			}
			
			.tab {
				width: 100%;
				padding: 24upx;
				border-radius: 4px;
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				color: #111111;
				margin-bottom: 20upx;
				
				.tab-item {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					img {
						width: 60upx;
						height: 60upx;
						margin-bottom: 16upx;
					}
				}
			}
			
			.money {
				width: 100%;
				background: #FFFFFF;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				margin-bottom: 20upx;
				
				.total {
					width: 100%;
					border-radius: 4px;
					padding: 24upx;
					box-sizing: border-box;
					background: #111111;
					display: flex;
					flex-direction: column;
					font-size: 30upx;
					color: #FFFFFF;
				}
				
				.type {
					width: 100%;
					padding: 24upx;
					box-sizing: border-box;
					background: #FFFFFF;
					border-radius: 4px;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-size: 30upx;
					color: #111111;
					
					.type-tab {
						display: flex;
						flex-direction: column;
						align-items: center;
					}
				}
			}
			
			.list {
				width: 100%;
				background: #FFFFFF;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				margin-bottom: 30upx;
				
				.list-item {
					width: 100%;
					height: 100upx;
					padding: 0 24upx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					.list-left {
						display: flex;
						align-items: center;
						font-size: 28upx;
						color: #111111;
						
						img {
							width: 50upx;
							height: 50upx;
						}
					}
					
					img {
						width: 15upx;
						height: 22upx;
					}
				}
			}
		}
	}
</style>
