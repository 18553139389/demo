<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="address">
				<view class="titles">服务设备</view>
				<view class="message">
					<img :src="'https://weixiu.lixinapp.com' + list.device.typeImage" alt="">
					<view class="message-right">
						<view class="message-type">{{list.device.typeName}}</view>
						<view class="user">
							<view>{{list.device.name}}</view>
							<view>{{list.device.phone}}</view>
						</view>
						<view class="user">
							<view class="location">{{list.device.districtFullName}}</view>
						</view>
					</view>
				</view>
				<view class="time">安装时间：{{list.device.installDate}}</view>
			</view>
			<!-- <view class="address">
				<view class="titles">产品类型</view>
				<view class="message">
					<view class="product">
						<img :src="'https://weixiu.lixinapp.com' + list.typeImage" alt="">
						<view class="name">{{list.typeName}}</view>
					</view>
				</view>
			</view> -->
			<view class="detail">
				<view class="titles">订单信息</view>
				<view class="message">
					<view class="detail-list">
						<view>订单编号</view>
						<view style="color: #333;">{{list.orderNo}}</view>
					</view>
					<view class="detail-list">
						<view>下单时间</view>
						<view style="color: #333;">{{list.placeTime}}</view>
					</view>
					<view class="detail-list">
						<view>服务类型</view>
						<view style="color: #333;" v-if="list.serviceItem == 1">保养滤芯</view>
						<view style="color: #333;" v-if="list.serviceItem == 2">故障维修</view>
						<view style="color: #333;" v-if="list.serviceItem == 3">上门安装</view>
					</view>
				</view>
				<view class="message">
					<view class="detail-list">
						<view>上门时间</view>
						<view style="color: #333;">{{list.doorTime}}</view>
					</view>
					<view class="detail-list" v-if="list.customerRemark">
						<view>备注</view>
						<view style="color: #333;">{{list.customerRemark}}</view>
					</view>
				</view>
				<!-- <view class="message" v-if="type != 2">
					<view class="detail-list">
						<view>人工费</view>
						<view style="color: #333;">￥{{list.advancePayment}}</view>
					</view>
				</view> -->
				<view class="message" v-if="type != 2">
					<view class="detail-list">
						<view>原价</view>
						<view style="color: #333;">￥{{list.amount}}</view>
					</view>
				</view>
				<view class="message" v-if="type != 2">
					<view class="detail-list">
						<view>优惠金额</view>
						<view style="color: #333;">￥{{list.discountValue}}</view>
					</view>
				</view>
			<!-- 	<view class="message" v-if="type != 2">
					<view class="detail-list">
						<view>服务费</view>
						<view style="color: #333;">￥{{list.serviceCharge ? list.serviceCharge : '0.00'}}</view>
					</view>
				</view> -->
				<view class="message" v-if="type != 2">
					<view class="detail-list">
						<view>远程费</view>
						<view class="fever">
							<view class="editor" @tap="goShow" v-if="type == 3">
								<view>修改</view>
								<img src="../../static/images/xiugaiicon.png" alt="">
							</view>
							<view style="color: #333;">￥{{list.doorCharge}}</view>
						</view>
					</view>
				</view>
				<view class="message" v-if="type != 2">
					<view class="detail-list">
						<view>优惠券</view>
						<view class="coupon">￥{{list.couponValue}}</view>
					</view>
				</view>
				<view class="message" v-if="type != 2">
					<view class="detail-list">
						<view>总计</view>
						<view style="color: #333;">￥{{list.realPay}}</view>
					</view>
				</view>
				<view class="message" v-if="type != 2 && type != 3">
					<view class="detail-list">
						<view>完成时间</view>
						<view style="color: #333;">{{list.serviceDate}}</view>
					</view>
				</view>
				<view class="message" v-if="type != 2 && type != 3">
					<view class="detail-list">
						<view>验收信息</view>
						<view style="color: #333;width: 70%;text-align: right;">{{list.checkRemark}}</view>
					</view>
				</view>
				<view class="saves">
					<image class="saveImg" v-for="(v,k) in list.checkImage" :key="k" :src="'https://weixiu.lixinapp.com' + v" alt=""></image>
				</view>
				<view class="btns" v-if="type == 3">
					<view class="btns-detail" style="background: #83bfff;" @tap="goMachine">配件明细</view>
					<view class="btns-detail" @tap="goType">维修详情</view>
				</view>
				<!-- <view class="detail-list">
					<view>服务类型</view>
					<view class="name" v-if="list.serviceItem == 1">保养滤芯</view>
					<view class="name" v-if="list.serviceItem == 2">故障维修</view>
					<view class="name" v-if="list.serviceItem == 3">上门安装</view>
				</view>
				<view class="detail-list" v-if="list.faultTypeName">
					<view>故障类型</view>
					<view class="name">{{list.faultTypeName}}</view>
				</view>
				<view class="detail-list" v-if="list.additionName">
					<view>附加项</view>
					<view class="name">{{list.additionName}}</view>
				</view>
				<view class="detail-list" v-if="list.maintainType">
					<view>保养类型</view>
					<view>{{list.maintainTypeName}}</view>
				</view>
				<view class="detail-list">
					<view>上门时间</view>
					<view>{{list.doorTime}}</view>
				</view>
				<view class="detail-list" v-if="list.customerRemark">
					<view>备注</view>
					<view style="width: 80%;text-align: right;">{{list.customerRemark}}</view>
				</view>
				<view class="detail-list">
					<view>人工费</view>
					<view style="color: red;">￥{{list.advancePayment}}</view>
				</view>
				<view class="detail-list">
					<view>总计</view>
					<view style="color: red;">￥{{list.amount}}</view>
				</view>
				<view class="detail-list" v-if="v.list.receiveTime">
					<view>完成时间</view>
					<view>{{list.receiveTime}}</view>
				</view>
				<view class="detail-list" v-if="list.checkRemark">
					<view>验收备注</view>
					<view style="width: 80%;text-align: right;">{{list.checkRemark}}</view>
				</view>
				<view class="detail-img" v-if="list.checkImage">
					<view>验收图片</view>
					<view class="imgs">
						<img v-for="(v,k) in list.checkImage" :key="k" :src="'https://weixiu.lixinapp.com' + v" alt="">
					</view>
				</view> -->
			</view>
		</view>
		<view class="mask" v-if="show">
			<view class="dialog">
				<view>修改远程费</view>
				<input type="digit" v-model="val" placeholder="请输入金额">
				<view class="submit" @tap="goSubmit">提交</view>
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
				type: 0,
				ids: '',
				show: false,
				val: '',
				list: {}
			}
		},
		onLoad(option) {
			this.type = option.type
			this.ids = option.id
		},
		onShow() {
			this.init(this.ids)
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid'),
					orderId: id,
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/order/detail',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.list = res.data.body.order
								if(res.data.body.order.checkImage) {
									if(self.list.checkImage.indexOf('|') > -1) {
										self.list.checkImage = self.list.checkImage.split('|')
									} else {
										let arr = []
										arr.push(self.list.checkImage)
										self.list.checkImage = arr
									}
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goMachine() {
				uni.navigateTo({
				    url: '/pages/machine/machine?orderId=' + this.list.id
				})
			},
			goType() {
				uni.navigateTo({
				    url: '/pages/typeDetail/typeDetail?id=' + this.list.device.typeId + '&orderId=' + this.list.id
				})
			},
			goShow() {
				this.show = true
			},
			goSubmit() {
				if(this.val == '') {
					this.val = 0
				}
				
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid'),
					orderId: this.list.id,
					cost: this.val
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/order/door',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.show = false
								Toast.showToast('修改成功')
								self.init(self.ids)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
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
		
		.fixed {
			width: 100%;
		}
		
		.mask {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .6);
			z-index: 999;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 99999;
			
			.dialog {
				width: 92%;
				padding: 30upx;
				border-radius: 4px;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-sizing: border-box;
				
				input {
					width: 60%;
					height: 70upx;
					background: #f6f6f6;
					border-radius: 4px;
					margin: 30upx 0 50upx;
					padding: 0 24upx;
					box-sizing: border-box;
				}
				
				.submit {
					width: 40%;
					height: 70upx;
					line-height: 70upx;
					padding: 0 30upx;
					border-radius: 40px;
					background: #007bff;
					font-size: 28upx;
					color: #fff;
					text-align: center;
				}
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.address {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 28upx;
				// border-bottom: 6upx solid #eee;
				
				.titles {
					width: 100%;
					height: 70upx;
					line-height: 70upx;
					font-size: 30upx;
					color: #333;
					padding-left: 24upx;
					position: relative;
					margin-bottom: 20upx;
				}
				
				.titles::before {
					content: '';
					width: 4px;
					height: 24upx;
					background: #007bff;
					border-radius: 30upx;
					position: absolute;
					top: 23upx;
					left: 0;
					z-index: 999;
				}
				
				.message {
					width: 100%;
					border-top: 1px solid #eee;
					padding: 24upx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					
					img {
						width: 160upx;
						height: 160upx;
					}
					
					.message-right {
						width: 75%;
						display: flex;
						flex-direction: column;
						padding-left: 24upx;
						box-sizing: border-box;
						
						.message-type {
							font-size: 30upx;
							color: #666;
							margin-bottom: 20upx;
						}
						
						.user {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 28upx;
							color: #333;
							margin-top: 24upx;
							
							.location {
								width: 90%;
								font-size: 28upx;
								color: #666;
							}
							
							img {
								width: 48upx;
								height: 48upx;
							}
						}
					}
					
					.product {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28upx;
						color: #333;
						
						img {
							width: 160upx;
							height: 160upx;
							border-radius: 4px;
						}
						
						.name {
							width: 76%;
							padding-left: 30upx;
							box-sizing: border-box;
						}
					}
				}
				
				.time {
					width: 100%;
					height: 60upx;
					line-height: 60upx;
					font-size: 26upx;
					color: #999;
					padding-left: 24upx;
					box-sizing: border-box;
					margin-bottom: 24upx;
				}
			}
			
			.detail {
				width: 100%;
				padding: 0 28upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				
				.titles {
					width: 100%;
					height: 70upx;
					line-height: 70upx;
					font-size: 30upx;
					color: #333;
					padding-left: 24upx;
					position: relative;
					margin-bottom: 20upx;
				}
				
				.titles::before {
					content: '';
					width: 4px;
					height: 24upx;
					background: #007bff;
					border-radius: 30upx;
					position: absolute;
					top: 23upx;
					left: 0;
					z-index: 999;
				}
				
				.message {
					width: 100%;
					border-top: 1px solid #eee;
					padding: 24upx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					.detail-list {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 70upx;
						font-size: 28upx;
						color: #666;
						
						.fever {
							width: 60%;
							height: 40upx;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							
							.editor {
								display: flex;
								align-items: center;
								font-size: 28upx;
								color: #0e4ca0;
								margin-right: 120upx;
								
								img {
									width: 32upx;
									height: 32upx;
									margin-left: 20upx;
								}
							}
						}
						
						.coupon {
							width: 190upx;
							height: 60upx;
							line-height: 60upx;
							background: url(../../static/images/youhuiquan.png) no-repeat;
							background-size: 100% 100%;
							text-align: center;
							font-size: 28upx;
							color: #f55555;
						}
					}
					
					.detail-img {
						width: 100%;
						display: flex;
						flex-direction: column;
						font-size: 28upx;
						color: #666;
						
						.imgs {
							width: 100%;
							display: flex;
							
							img {
								width: 160upx;
								height: 160upx;
								border-radius: 4px;
								margin: 24upx 0 24upx 16upx;
							}
							
							img:first-child {
								margin-left: 0;
							}
						}
					}
				}
				
				.saves {
					width: 100%;
					border-top: 1px solid #eee;
					padding: 32upx 24upx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					
					.saveImg {
						width: 200upx;
						height: 200upx;
						border-radius: 4px;
						margin-right: 24upx;
					}
					
					.saveImg:last-child {
						margin-right: 0;
					}
				}
				
				.btns {
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-size: 28upx;
					color: #fff;
					margin: 30upx 0;
					
					.btns-detail {
						width: 45%;
						height: 80upx;
						line-height: 80upx;
						text-align: center;
						border-radius: 4px;
						background: #007bff;
					}
				}
			}
		}
	}
</style>
