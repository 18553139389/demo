<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">填写订单</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="message">
				<img class="location" src="../../static/images/geren_dizhi.png" alt="">
				<view class="message-right">
					<view class="names">
						<view>{{user.name}}</view>
						<view style="color: #999;margin-left: 30upx;">{{user.phone}}</view>
					</view>
					<view class="address" @tap="goAddress">
						<view class="address-name">{{address ? address : '请选择收货地址'}}</view>
						<img src="../../static/images/tongzhi_xiayige.png" alt="">
					</view>
				</view>
			</view>
			<view class="product">
				<view class="product-item">
					<img :src="list.img" alt="">
					<view class="product-name">
						<view>{{list.name}}</view>
						<view class="product-price">
							<view style="color: #FF6600;">￥{{list.price}}</view>
							<view>x1</view>
						</view>
					</view>
				</view>
				<view class="total">总计：<span style="color: #FF6600;">￥{{total}}</span></view>
				<view class="mark">订单备注</view>
				<textarea class="text" v-model="val" placeholder="有什么想说的要告诉商家吗？"/>
			</view>
		</view>
		<view class="submit">
			<view>应付金额：<span style="color: #FF6600;font-size: 20px;">￥{{total}}</span></view>
			<view class="order" @tap="goShop">提交订单</view>
		</view>
	</view>
</template>

<script>
	import {ajax,ajax1} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#F8F9FB',
				address: '请选择地址',
				aid: '',
				list: {},
				user: {},
				val: '',
				owner: ''
			}
		},
		computed: {
			total() {
				let total = 0
				total = parseFloat(this.list.price) * 1
				return total
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.obj)
			this.owner = option.user
			console.log(this.list)
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				// if(uni.getStorageSync('changeAddress') && uni.getStorageSync('changeItem')) {
				// 	this.address = uni.getStorageSync('changeAddress')
				// 	let obj = JSON.parse(uni.getStorageSync('changeItem'))
				// 	this.aid = obj.aid
				// 	this.user = obj
				// }
				if(uni.getStorageSync('changeAddress') && uni.getStorageSync('changeItem')) {
					this.address = uni.getStorageSync('changeAddress')
					let obj = JSON.parse(uni.getStorageSync('changeItem'))
					this.aid = obj.aid
					this.user = obj
				} else {
					let data1 = {
						cmd: 'myaddresslist',
						uid: uni.getStorageSync('uid')
					}
					Toast.showLoading('', function() {
						let data = {
							data: data1,
							success: function(res) {
								if (res.data.result == 0) {
									if (res.data.dataList) {
										let list = res.data.dataList
										list.forEach((item) => {
											if(item.isdefault == 1) {
												self.address = item.address + item.addressdetail
												self.aid = item.aid
												self.user = item
												uni.setStorageSync('changeAddress', item.address + item.addressdetail)
												console.log(item)
												let lists = {
													phone: item.phone,
													name: item.name,
													aid: item.aid
												}
												uni.setStorageSync('changeItem', JSON.stringify(lists))
											}
										})
										Toast.hideLoading()
									}
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.resultNote)
								}
							}
						}
						ajax(data)
					})
				}
			},
			goShop() {
				let self = this
				if (this.address == '') {
					Toast.showToast('请选择地址')
					return
				}
				if (this.aid == '') {
					Toast.showToast('请选择地址')
					return
				}
				
				let add = Math.floor(Math.random()*8000+1000)
				let time = new Date().getTime()
				if(!add) {
					Toast.showToast('下单失败，请重试')
					return
				}
				
				let data1 = {
					cmd: 'addorder',
					uid: uni.getStorageSync('uid'),
					goodsid: this.list.id,
					aid: this.aid,
					remarks: this.val,
					nonce: add + '' + time,
					sign: md5(add + '' + time + 'lixinkeji')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(!res.data.ordernum) {
									Toast.showToast('支付异常')
									return
								}
								if(self.list.userid == 1) {
									uni.navigateTo({
										url: '/pages/pay/pay?ordernum=' + res.data.ordernum + '&price=' + self.list.price
									})
									
									// if(!res.data.ordernum) {
									// 	Toast.showToast('订单异常')
									// 	return
									// }
									// let order = res.data.ordernum + add
									// let url = ''
									// url = 'https://www.ytsh.vip/easyamoy/api/alipay?ordernum=' + order + '&amount=' + self.list.price + '&subject=商品委托代卖'
									// //  这句很重要
									// if(url) {
									// 	const form = document.createElement('form');
									// 	form.action = url //此处form就是后台返回接收到的数据
									// 	form.method = 'post' //此处form就是后台返回接收到的数据
									// 	document.body.appendChild(form)
									// 	document.forms[0].submit()
									// }
								} else {
									let list = {
										price: self.list.price,
										order: res.data.ordernum,
										owner: this.owner
									}
									uni.navigateTo({
									    url: '/pages/shop/shop?list=' + JSON.stringify(list)
									})
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
			goAddress() {
				uni.navigateTo({
				    url: '/pages/address/address'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F8F9FB;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.message {
				width: 100%;
				padding: 24upx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 4px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30upx;

				.location {
					width: 40upx;
					height: 47upx;
				}

				.message-right {
					width: 90%;
					display: flex;
					flex-direction: column;
					box-sizing: border-box;

					.names {
						display: flex;
						align-items: center;
					}

					.address {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 24upx;

						.address-name {
							width: 90%;
							font-size: 14px;
							color: #666;
						}

						img {
							width: 13upx;
							height: 22upx;
						}
					}
				}
			}

			.product {
				width: 100%;
				padding: 24upx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				margin-bottom: 30upx;

				.product-item {
					width: 100%;
					display: flex;
					justify-content: space-between;

					img {
						width: 160upx;
						height: 160upx;
						border-radius: 4px;
					}

					.product-name {
						width: 70%;
						height: 160upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.product-price {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 14px;
							color: #333;
						}
					}
				}

				.total {
					width: 100%;
					height: 90upx;
					line-height: 90upx;
					text-align: right;
				}
				
				.mark {
					width: 100%;
					height: 90upx;
					line-height: 90upx;
				}
				
				.text {
					width: 100%;
					height: 240upx;
					font-size: 14px;
					color: #333;
				}
			}
		}
		
		.submit {
			width: 100%;
			height: 100upx;
			position: fixed;
			left: 0;
			bottom: 50upx;
			background: #F8F9FB;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 28upx;
			box-sizing: border-box;
			font-size: 14px;
			color: #333;
			z-index: 999;
			
			.order {
				padding: 12upx 30upx;
				border-radius: 30px;
				background: #FF6600;
				font-size: 16px;
				color: #FFFFFF;
			}
		}
	}
</style>
