<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" :backColor="backColor">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="lists">
				<view class="item">
					<view class="list-middle">
						<img :src="list.productImage" alt="">
						<view class="product">
							<view>{{list.productTitle}}</view>
							<view class="price">
								<view style="color: red;">￥{{list.price}}</view>
								<view style="margin-left: 40upx;">x{{list.qty}}{{list.unit}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="common">
						<view class="left">姓名</view>
						<view class="right">{{list.username}}</view>
					</view>
					<view class="common">
						<view class="left">联系方式</view>
						<view class="right">{{list.phone}}</view>
					</view>
					<view class="common">
						<view class="left">数量</view>
						<view class="right">{{list.qty}}</view>
					</view>
					<view class="common">
						<view class="left">到期时间</view>
						<view class="right">{{list.expireDate}}</view>
					</view>
					<view class="common">
						<view class="left">物流公司</view>
						<view class="right">{{list.expressName}}</view>
					</view>
					<view class="common">
						<view class="left">物流单号</view>
						<view class="right">{{list.expressNo}}</view>
					</view>
				</view>
				<view class="item">
					<view class="common">
						<view class="left">订单号</view>
						<view class="right">{{order}}</view>
					</view>
					<view class="common">
						<view class="left">提交时间</view>
						<view class="right">{{list.createDate}}</view>
					</view>
					<view class="common">
						<view class="left">货品总价</view>
						<view class="right">￥{{list.amount}}</view>
					</view>
					<view class="common" v-if="list.finishDate">
						<view class="left">成交时间</view>
						<view class="right">{{list.finishDate}}</view>
					</view>
				</view>
				<view class="item" @tap="goReport">
					<view class="order">
						<view class="left">返款记录</view>
						<img src="../../static/images/xiangyou@2x.png" alt="">
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
				backColor: '#EDEDED',
				order: '',
				list: {}
			}
		},
		onLoad(option) {
			this.order = option.id
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					orderId: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/orderDetail',
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
			goReport() {
				uni.navigateTo({
				    url: '/pages/report/report?id=' + this.order
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
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.item {
					width: 100%;
					padding: 0 24upx;
					box-sizing: border-box;
					background: #FFFFFF;
					border-radius: 4px;
					margin: 0 0 30upx;
					
					.list-middle {
						width: 100%;
						display: flex;
						padding: 24upx 0;
						
						img {
							width: 140upx;
							height: 140upx;
							border-radius: 4px;
						}
						
						.product {
							width: 75%;
							height: 140upx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							font-size: 30upx;
							color: #111111;
							padding-left: 24upx;
							box-sizing: border-box;
							
							.price {
								width: 100%;
								height: 40upx;
								display: flex;
								align-items: center;
								font-size: 28upx;
								color: #999;
								
								view {
									height: 40upx;
									line-height: 40upx;
								}
							}
						}
					}
					
					.common {
						width: 100%;
						height: 70upx;
						display: flex;
						align-items: center;
						
						.left {
							width: 30%;
							font-size: 30upx;
							color: #666;
						}
						
						.right {
							font-size: 30upx;
							color: #111111;
						}
					}
					
					.order {
						width: 100%;
						height: 70upx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 30upx;
						color: #666;
						
						img {
							width: 15upx;
							height: 20upx;
						}
					}
				}
			}
		}
	}
</style>
