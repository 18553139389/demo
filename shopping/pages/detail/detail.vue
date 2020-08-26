<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
				<block slot="right">打印</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="address" v-if="type == 1 || type == 2 || type == 3">
				<view class="titles">配送信息</view>
				<view class="message">
					<view class="icon">
						<image src="../../static/images/dizhi.png"></image>
					</view>
					<view class="user" v-if="list.address">
						<view class="location">{{list.address}}</view>
						<view>{{list.username}} {{list.phone}}</view>
					</view>
					<view class="user" v-if="!list.address">
						<view class="locations">到店自取</view>
					</view>
				</view>
				<!-- <view class="message">
					<view class="user" style="margin-left: 0;">
						<view>收货人：{{list.username}} {{list.phone}}</view>
						<view class="location">{{list.address}}</view>
					</view>
				</view> -->
			</view>
			<view class="address" v-if="type == 4">
				<view class="titles">预定信息</view>
				<view class="message">
					<view class="users">
						<view class="users-left">
							<view>预订客户： {{list.username}}</view>
							<view>{{list.phone}}</view>
						</view>
						<view style="margin-top: 30upx;" v-if="list.itemList !== undefined && list.itemList.length > 0">入住时间： {{list.itemList[0].skuName}}</view>
					</view>
				</view>
			</view>
			<view class="shop">
				<view class="list-content" v-for="(m,n) in list.itemList" :key="n">
					<image :src="m.productLogo"></image>
					<view class="list-message">
						<view class="message-top">
							<view class="message-title">{{m.productTitle}}</view>
							<view class="message-type" v-if="type == 1 || type == 2 || type == 3">商品分类：{{m.skuName}}</view>
							<view class="message-type" v-if="type == 4">{{m.skuName}}</view>
						</view>
						<view class="list-price">
							<view class="price">￥{{m.price}}</view>
							<view class="count" v-if="type == 1 || type == 2 || type == 3">x{{m.qty}}</view>
							<view class="count" v-if="type == 4">{{m.qty}}</view>
						</view>
					</view>
				</view>
				<view class="list-item" v-if="type == 4">
					<view class="name">入住天数</view>
					<view class="content" v-if="list.itemList !== undefined && list.itemList.length > 0">{{list.itemList[0].qty}}晚</view>
				</view>
				<view class="list-item" v-if="type == 1 || type == 2 || type == 3">
					<view class="name">商品总价</view>
					<view class="content">￥{{list.price}}</view>
				</view>
				<view class="list-item" v-if="(type == 1 || type == 2) && list.fee">
					<view class="name">运费</view>
					<view class="content">￥{{list.fee}}</view>
				</view>
				<view class="list-item" v-if="type == 3 && list.fee">
					<view class="name">配送费</view>
					<view class="content">￥{{list.fee}}</view>
				</view>
				<view class="list-item">
					<view class="name">订单总价</view>
					<view class="content">￥{{list.amount}}</view>
				</view>
				<view class="list-item" v-if="list.remarks" style="align-items: flex-start;">
					<view class="name">备注</view>
					<view class="content" style="width: 50%;">{{list.remarks}}</view>
				</view>
			</view>
			<view class="shop" v-if="(type == 1 || type == 2) && list.state == 6">
				<view class="service">申请售后</view>
				<view class="list-item">
					<view class="order">货物状态：</view>
					<view class="order" style="text-align: left;" v-if="list.state == 1">待发货</view>
					<view class="order" style="text-align: left;" v-if="list.state == 2">待确认</view>
					<view class="order" style="text-align: left;" v-if="list.state == 3">待评价</view>
					<view class="order" style="text-align: left;" v-if="list.state == 4">已完成</view>
					<view class="order" style="text-align: left;" v-if="list.state == 6">退款中</view>
					<view class="order" style="text-align: left;" v-if="list.state == 7">已退款</view>
					<view class="order" style="text-align: left;" v-if="list.state == 8">拒绝退款</view>
				</view>
				<view class="list-item" style="align-items: flex-start;">
					<view class="order">售后原因：</view>
					<view class="order" style="text-align: left;width: 50%;">{{list.reason}}</view>
				</view>
				<view class="list-item">
					<view class="order">退款金额：</view>
					<view class="order" style="text-align: left;">￥{{list.amount}}</view>
				</view>
				<view class="service" style="margin-top: 30upx;">凭证</view>
				<view class="imgs">
					<image v-for="(v,k) in list.images" :key="k" :src="v"></image>
				</view>
			</view>
			<view class="shop" v-if="type == 4 && list.state == 6">
				<view class="service">申请售后</view>
				<view class="list-item">
					<view class="order">订单状态：</view>
					<view class="order" style="text-align: left;" v-if="list.state == 6">退款中</view>
				</view>
				<view class="list-item">
					<view class="order">退款金额：</view>
					<view class="order" style="text-align: left;">￥{{list.amount}}</view>
				</view>
				<view class="list-item" style="align-items: flex-start;">
					<view class="order">退款原因：</view>
					<view class="order" style="text-align: left;width: 50%;display: flex;flex-direction: row-reverse;">{{list.reason}}</view>
				</view>
				<view class="service" style="margin-top: 30upx;">凭证</view>
				<view class="imgs">
					<image v-for="(v,k) in list.images" :key="k" :src="v"></image>
				</view>
			</view>
			<view class="shop" style="border: none;">
				<view class="list-item">
					<view class="order">订单编号：</view>
					<view class="order" style="text-align: right;">{{list.orderId}}</view>
				</view>
				<view class="list-item">
					<view class="order">创建时间：</view>
					<view class="order" style="text-align: right;">{{list.createDate}}</view>
				</view>
				<view class="list-item" v-if="list.payDate">
					<view class="order">付款时间：</view>
					<view class="order" style="text-align: right;">{{list.payDate}}</view>
				</view>
				<view class="list-item" v-if="(type == 1 || type == 2) && list.sendDate">
					<view class="order">发货时间：</view>
					<view class="order" style="text-align: right;">{{list.sendDate}}</view>
				</view>
				<view class="list-item" v-if="type == 3 && list.sendDate">
					<view class="order">接单时间：</view>
					<view class="order" style="text-align: right;">{{list.sendDate}}</view>
				</view>
				<view class="list-item" v-if="type == 4 && list.checkDate">
					<view class="order">入住时间：</view>
					<view class="order" style="text-align: right;">{{list.checkDate}}</view>
				</view>
				<view class="list-item" v-if="(type == 1 || type == 2) && list.finishDate">
					<view class="order">收货时间：</view>
					<view class="order" style="text-align: right;">{{list.finishDate}}</view>
				</view>
				<view class="list-item" v-if="type == 3 && list.finishDate">
					<view class="order">派送时间：</view>
					<view class="order" style="text-align: right;">{{list.finishDate}}</view>
				</view>
				<view class="list-item" v-if="type == 4 && list.finishDate">
					<view class="order">退房时间：</view>
					<view class="order" style="text-align: right;">{{list.finishDate}}</view>
				</view>
				<view class="list-item" v-if="list.state == 6 || list.state == 7 || list.state == 8">
					<view class="order">申请退款时间：</view>
					<view class="order" style="text-align: right;">{{list.refundDate}}</view>
				</view>
				<view class="btns">
					<view class="modify" @tap="goMoney" v-if="(type == 1 || type == 2) && list.state == 0">修改运费</view>
					<view class="modify" @tap="goSend" v-if="(type == 1 || type == 2) && list.state == 1">确认发货</view>
					<view class="backs" v-if="list.state == 6">
						<view class="backs-btn" @tap="goAgree">同意</view>
						<view class="backs-btn" style="background: #FBB3B3;" @tap="goBack">拒绝</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mask" v-if="show">
			<view class="box">
				<view class="box-title">修改运费</view>
				<input type="digit" v-model="price" placeholder="请输入金额">
				<view class="dialogs">
					<view class="cancel" @tap="goCancel">取消</view>
					<view class="sure" @tap="goSure">确定</view>
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
				Color: '#333',
				price: '',
				show: false,
				id: '',
				list: {},
				type: 1
			}
		},
		onLoad(option) {
			this.id = option.ids
			this.init(option.ids)
			this.type = uni.getStorageSync('type')
		},
		methods: {
			goRight() {
				let self = this
				let datas = {
					orderId: this.id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/printOrder',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('打印成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			init(ids) {
				let self = this
				let datas = {
					orderId: ids
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/orderDetail',
						data: datas,
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
				this.show = true
			},
			goSend() {
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid'),
					orderId: this.id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/sendOrder',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('发货成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goCancel() {
				this.show = false
			},
			goSure() {
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid'),
					orderId: this.id,
					fee: this.price
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/editOrderFee',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
								self.show = false
								self.init(self.id)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goBack() {
				uni.navigateTo({
					url: '/pages/reason/reason?order=' + this.list.orderId
				})
			},
			goAgree() {
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid'),
					orderId: this.list.orderId,
					type: 1
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/auditOrderRefund',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},800)
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
		overflow: hidden;
		background: #FFFFFF;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.address {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 40upx;
				box-sizing: border-box;
				border-bottom: 12upx solid #F2F2F2;
				
				.titles {
					width: 100%;
					font-size: 28upx;
					color: #333;
				}
				
				.message {
					width: 100%;
					display: flex;
					align-items: center;
					margin-top: 24upx;
					
					.icon {
						width: 70upx;
						height: 70upx;
						background: #F2F2F2;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 50%;
						
						image {
							width: 28upx;
							height: 34upx;
						}
					}
					
					.user {
						height: 70upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 26upx;
						color: #999;
						margin-left: 24upx;
						
						.locations {
							height: 70upx;
							display: flex;
							align-items: center;
						}
					}
					
					.users {
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 26upx;
						color: #333;
						
						.users-left {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}
			}
			
			.shop {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 40upx 30upx;
				box-sizing: border-box;
				border-bottom: 12upx solid #F2F2F2;
				
				.service {
					width: 100%;
					font-size: 28upx;
					color: #333;
				}
				
				.imgs {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					margin-top: 30upx;
					
					image {
						width: 160upx;
						height: 160upx;
						border-radius: 6px;
						margin: 0 24upx 24upx 0;
					}
				}
				
				.list-content {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 24upx;
					
					image {
						width: 160upx;
						height: 160upx;
						border-radius: 4px;
					}
					
					.list-message {
						width: 72%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						
						.message-top {
							width: 100%;
							display: flex;
							flex-direction: column;
							
							.message-title {
								width: 100%;
								font-size: 28upx;
								color: #333;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
							}
							
							.message-type {
								width: 100%;
								font-size: 28upx;
								color: #999;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
								margin-top: 16upx;
							}
						}
						
						.list-price {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							
							.price {
								font-size: 32upx;
								color: red;
							}
							
							.count {
								font-size: 32upx;
								color: #999;
							}
						}
					}
				}
				
				.list-item {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;
					color: #333;
					margin-top: 20upx;
					
					.content {
						color: #999;
						display: flex;
						flex-direction: row-reverse;
					}
					
					.order {
						color: #666;
					}
				}
				
				.btns {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 30upx;
					color: #999;
					margin-top: 60upx;
					
					.modify {
						width: 80%;
						height: 70upx;
						line-height: 70upx;
						border: 1px solid #cccccc;
						border-radius: 4px;
						text-align: center;
						margin-top: 24upx;
					}
					
					.backs {
						width: 90%;
						height: 70upx;
						display: flex;
						font-size: 30upx;
						color: #fff;
						border-radius: 40px;
						overflow: hidden;
						
						.backs-btn {
							width: 50%;
							height: 70upx;
							line-height: 70upx;
							text-align: center;
							background: #FF4848;
						}
					}
				}
			}
		}
		
		.mask {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.5);
			z-index: 999999;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.box {
				width: 90%;
				padding: 50upx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 6px;
				
				.box-title {
					width: 100%;
					font-size: 28upx;
					color: #333;
				}
				
				input {
					width: 100%;
					height: 60upx;
					border: 1px solid #cccccc;
					padding: 0 20upx;
					font-size: 28upx;
					color: #333;
					margin: 30upx 0;
				}
				
				.dialogs {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.cancel {
						width: 45%;
						height: 70upx;
						line-height: 70upx;
						text-align: center;
						background: #cccccc;
						border-radius: 4px;
						font-size: 28upx;
						color: #333;
					}
					
					.sure {
						width: 45%;
						height: 70upx;
						line-height: 70upx;
						text-align: center;
						background: #FF4848;
						border-radius: 4px;
						font-size: 30upx;
						color: #fff;
					}
				}
			}
		}
	}
</style>
