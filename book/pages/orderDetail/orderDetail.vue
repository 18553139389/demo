<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
				<block slot="right">
					<view class="complain" v-if="uid == list.taid && list.state1 == 4">删除订单</view>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="state" style="color: #FF6600;" v-if="uid == list.uid && list.state == 0">待付款</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.uid && list.state == 1">待卖家收款</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.taid && list.state1 == 1">待收款</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.uid && list.state == 2">待上架</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.taid && list.state1 == 2">待发货</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.uid && list.state == 3">已委托</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.taid && list.state1 == 3">已发货</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.taid && list.state1 == 4">已完成</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.uid && list.state == 4">已完成</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.uid && list.state == 6">已申诉</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.taid && list.state1 == 6">已申诉</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.uid && list.state == 7">已取消</view>
			<view class="state" style="color: #FF6600;" v-if="uid == list.taid && list.state1 == 7">已取消</view>
			<view class="money">订单金额：{{list.goodsprice}}</view>
			<view class="service" @tap="goCall">联系客服</view>
			<view class="address" v-if="address">{{address}}</view>
			<view class="address" style="margin-bottom: 32upx;" v-if="name && call">{{name}} {{call}}</view>
			<view class="common">
				<view class="product">
					<img :src="list.goodsimage" alt="">
					<view class="product-item">
						<view class="product-title">{{list.goodsname}}</view>
						<view class="price">
							<view style="font-size: 32upx;color: #FF6600;">￥{{list.goodsprice}}</view>
							<view style="font-size: 32upx;color: #999;">x1</view>
						</view>
					</view>
				</view>
				<view class="money">
					<view>商品小计</view>
					<view>￥{{list.goodsprice}}</view>
				</view>
				<view class="money">
					<view>实付费<span style="color: #999;">（含运费）</span></view>
					<view>￥{{list.goodsprice}}</view>
				</view>
			</view>
			<view class="common">
				<view class="money">
					<view>订单号：</view>
					<view>{{list.ordernum}}</view>
				</view>
				<view class="money">
					<view>创建时间：</view>
					<view>{{list.adtime}}</view>
				</view>
				<view class="money" v-if="list.zftime">
					<view>支付时间：</view>
					<view>{{list.zftime}}</view>
				</view>
				<view class="money" v-if="list.dmtime">
					<view>委托代卖时间：</view>
					<view>{{list.dmtime}}</view>
				</view>
				<view class="money" v-if="list.shtime">
					<view>确认收货时间：</view>
					<view>{{list.shtime}}</view>
				</view>
			</view>
			<view class="common">
				<view class="money">
					<view>卖方姓名：</view>
					<view>{{list.taname}}</view>
				</view>
				<view class="money" v-if="list.taid != 1">
					<view>卖方支付宝：</view>
					<view>{{list.tazhifubao}}</view>
				</view>
			</view>
			<view class="common">
				<view class="money">
					<view>买方姓名：</view>
					<view>{{list.username}}</view>
				</view>
			</view>
			<view class="common" v-if="list.tstime || list.tsshtime || list.qxtime">
				<view class="order">订单投诉：</view>
				<view class="money" v-if="list.tstime">
					<view>申请投诉时间：</view>
					<view>{{list.tstime}}</view>
				</view>
				<view class="money" v-if="list.tsshtime">
					<view>投诉审核时间：</view>
					<view>{{list.tsshtime}}</view>
				</view>
				<view class="money" v-if="list.qxtime">
					<view>平台处理时间：</view>
					<view>{{list.qxtime}}</view>
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
				uid: '',
				order: '',
				list: {},
				address: '',
				name: '',
				call: ''
			}
		},
		onLoad(option) {
			this.uid = uni.getStorageSync('uid')
			if(uni.getStorageSync('changeAddress')) {
				this.address = uni.getStorageSync('changeAddress')
			}
			if(uni.getStorageSync('changeItem')) {
				let msg = JSON.parse(uni.getStorageSync('changeItem'))
				this.name = msg.name
				this.call = msg.phone
			}
			this.order= option.order
			this.init(option.order)
		},
		methods: {
			init(order) {
				let self = this
				let data1 = {
					cmd: 'myorderdetail',
					uid: uni.getStorageSync('uid'),
					ordernum: order
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataobject
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goRight() {
				let self = this
				let data1 = {
					cmd: 'deleteorder',
					uid: uni.getStorageSync('uid'),
					ordernum: this.order
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('删除成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goCall() {
				uni.makePhoneCall({
				    phoneNumber: this.list.pingtaiphone
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
			
			.complain {
				width: 160upx;
				height: 50upx;
				line-height: 50upx;
				text-align: right;
				font-size: 15px;
				color: #666;
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.state {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 30upx;
				color: #333;
				margin-bottom: 24upx;
			}
			
			.money {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #999;
			}
			
			.service {
				padding: 10upx 40upx;
				border: 1px solid #eee;
				border-radius: 30px;
				display: flex;
				justify-content: center;
				font-size: 28upx;
				color: #333;
				margin: 32upx 0;
			}
			
			.address {
				width: 86%;
				display: flex;
				font-size: 26upx;
				color: #999;
			}
			
			.common {
				width: 100%;
				padding: 20upx 28upx;
				box-sizing: border-box;
				border-top: 10upx solid #eee;
				
				.product {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin: 30upx 0;
				
					img {
						width: 120upx;
						height: 120upx;
						border-radius: 4px;
					}
				
					.product-item {
						width: 80%;
						height: 120upx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						font-size: 14px;
						color: #333;
				
						.product-title {
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
				
						.price {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}
				
				.money {
					width: 100%;
					height: 50upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;
					color: #666;
				}
				
				.order {
					width: 100%;
					height: 50upx;
					font-size: 15px;
					color: #333;
				}
			}
		}
	}
</style>
