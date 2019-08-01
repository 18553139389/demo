<template>
	<div class="orderBox">
		<van-tabs v-if="allOrderHistory" id="orderHistory-tabs" sticky v-model="active" @click="onChange">
			<mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask="isShowMask"></mp-loading>
			<van-tab v-for="(item, index) in classifiedOrder" :title="item.title" :key="index">
				<scroll-view scroll-y class="order-card">
					<div v-for="(order, orderIndex) in item.data" :key="orderIndex">
						<van-panel :title="order.orderNo" :status="order.orderStatus=== 0 ? '待付款' : order.orderStatus === 1 ? '已付款' : order.orderStatus === 2 ? '退款' : order.orderStatus === 3 ? '已取消' : order.orderStatus === 4 ? '已发货' : order.orderStatus === 5 ? '待发货' : '已完成'"
						 use-footer-slot>
							<van-card v-for="(product, productIndex) in order.products" :title="product.name" :num="product.qty" :ibizPrice="product.price"
							 :thumb="product.photo.image" :key="productIndex" currency="AUD$">
								<div slot="desc" class="desc-class">
									<span class="currency-price">(约合￥{{product.currency_price}})</span>
								</div>
							</van-card>
							<div v-if="order.orderNotes.custom" class="notes">
								<p>
									<span class="title">备注:</span>
									<span>{{order.orderNotes.custom}}</span>
								</p>
							</div>
							<div class="adress" v-if="order.consignees">
								<div class="shou">收</div>
								<div class="info">
									<div class="name">收货人:<span>{{order.consignees.name}}</span></div>
									<div class="phone">电话:<span>{{order.consignees.phone}}</span></div>
									<div class="address">地址:<span>{{order.consignees.address}}</span></div>
								</div>
							</div>
							<div class="adress" v-if="order.sender_information || order.sender_phone">
								<div class="shou">发</div>
								<div class="info">
									<div class="name">发件人:<span>{{order.sender_information}}</span></div>
									<div class="phone">电话:<span>{{order.sender_phone}}</span></div>
								</div>
							</div>
							<div slot="footer">
								<div class="price-block text-right">
									<div class="freight">
										运费:
										<span class="price">AUD${{order.freight}}</span>
										<span class="currency-price">(约合￥{{order.currencyFreight}})</span>
									</div>
									<div class="discount" v-if="order.discountAmount > 0">
										优惠:
										<span class="price">{{order.discountAmount}}</span>
										<span class="currency-price">{{order.discount}}</span>
									</div>
									<div>
										共{{countProductQty(order)}}件商品, 合计:
										<span class="price">AUD${{order.total}}</span>
										<span class="currency-price">(约合￥{{order.currencyTotal}})</span>
									</div>
								</div>
								<div class="btn-bar text-right">
									<van-button size="small" @click="toPicture(order)" v-if="(order.orderStatus === 4 || order.orderStatus === 10) && order.order_images.length > 0 && !info">打包照片</van-button>
									<van-button @click="checkTheLogistics(order)" size="small" v-if="order.orderStatus === 4">查看物流</van-button>
									<van-button size="small" @click="confirmAnOrder(order)" v-if="order.orderStatus === 4">确认收货</van-button>
									<van-button size="small" @click="inPayment(order)" v-if="order.orderStatus === 0">已支付</van-button>
									<van-button size="small" @click="initPayment()" type="danger">去支付</van-button>
								</div>
							</div>
						</van-panel>
					</div>
				</scroll-view>
			</van-tab>
		</van-tabs>
		<div class="no-order" v-else>
			<p>
				没有历史订单哦
			</p>
		</div>

	</div>
</template>

<script>
	import orderCard from '@/components/order/orderCard.vue'
	import client from '@lib/Rest'
	import _ from 'underscore'
	import Coupon from '@lib/module/coupon'
	import mpLoading from 'mpvue-weui/src/loading'
	export default {
		data() {
			return {
				allOrderHistory: 122,
				showPayment: false,
				showDel: false,
				showPositionValue: false,
				checkedGoods: [],
				orderHistory: null,
				active: 0,
				postOrder: null,
				tracking: [],
				showLogistics: false,
				st: 10,
				page: 1,
				limit: 10,
				allLoad: false,
				timer: null,
				isShowLoading: false,
			}

		},
		components: {
			orderCard,
			mpLoading,
		},
		onChange(event) {
			console.log(event, '切换标签')
			wx.showToast({
				title: `切换到标签 ${event.detail.index + 1}`,
				icon: 'none'
			})
		},
		onUnload: function() {
			wx.redirectTo({
				url: '../person/main'
			})
		},
		mounted() {
			var self = this
			this.loadHistory({
				fn: res => {
					if (res.data.code === 200) {
						console.log('初始化循环', self.allOrderHistory)
						console.log('初始化循环1', self.classifiedOrder)
					}
				}
			})
		},
		computed: {
			classifiedOrder() {
				let data = this.$store.getters['orderHistory/getClassifiedOrder']
				console.log(data, "首次循环列表")
				return data
			},
			allOrderHistory() {
				let data = this.$store.getters['orderHistory/allOrderHistory']
				return data
			},
			coupons() {
				return this.$store.getters['coupon/getCouponData']
			}
		},
		methods: {
			loadHistory({fn,statusStr = ''}) {
				this.isShowLoading = true
				this.$store.dispatch(`orderHistory/GET_DATA_FROM_CLOUD`, {
					cb: res => {
						console.log(res, '看看订单输出的数据')
						if (res.data.code === 200) {
							fn(res)
							this.isShowLoading = false
						}
					},
					page: this.page++,
					limit: this.limit,
					statusStr
				})
			},
			getOrderTitle(order) {
				console.log(order, "拿订单编号")
				return order.orderNo
			},
			// 	getStatusName (item) {
			// 			console.log(item,"拿订单状态")
			// 		return item.orderStatus === 0 ? '待付款' : item.orderStatus === 1 ? '已付款' : item.orderStatus === 2 ? '退款' : item.orderStatus === 3 ? '已取消' : item.orderStatus === 4 ? '已发货' : item.orderStatus === 5 ? '待发货' : '已完成'
			// 		console.log(item.orderStatus)
			// },
			countProductQty(order) {
				return _.reduce(order.products, (memo, item) => memo + item.qty, 0)
			},
			toPicture(order) {
				console.log('toPicture: ', order)
				// this.$router.push({path: '/order/picture?hide-tab-bar', query: {order}})
			},
			checkTheLogistics(order) {
				if (order.trackingNumber) {
					this.tracking = order.trackingNumber.split(',')
					this.showLogistics = true
				} else {
					console.log('暂时没有物流信息')
				}
			},
			confirmAnOrder(order) {
				let endpoint = this.$store.getters['server/getEndpoint']
				let token = this.$store.getters['account/getCustomerToken']
				let apiurl = endpoint + this.$store.getters['config/getApiList'].order_api_endpoint + '/' + order.uuid + '/edit'
				this.$store.dispatch('orderHistory/GET_DATA_FROM_CLOUD', {
					cb: function() {
						// Toast.clear()
						console.log('订单已确认')
					},
					page: 1,
					limit: 10
				})
			},
			inPayment(order) {
				let endpoint = this.$store.getters['server/getEndpoint']
				let env = this.$store.state.env.currentEnv
				let token = this.$store.state.env.envList[env].token
				let apiurl = endpoint + this.$store.getters['config/getApiList'].payment_gateway + '/check/' + order.uuid
				client.get(apiurl, token, (s) => {
					if (s.code === 200 && s.status === true) {
						Dialog.alert({
							message: this.$t('订单已支付')
						}).then(() => {
							// on close
						})
					} else {
						Dialog.alert({
							message: this.$t('订单未支付')
						}).then(() => {
							// on close
						})
					}
				}, (e) => {
					Dialog.alert({
						message: this.$t('订单未支付')
					}).then(() => {
						// on close
					})
				})
			},
			initPayment() {
				console.log('去支付订单')
			}
		}
	}
</script>

<style lang="scss">
	.orderBox {
		height: 100vh;
		overflow: hidden;
		background: #EEEEEE;

		.van-tabs__wrap--scrollable .van-tab {
			-webkit-flex: 0 0 19%;
			flex: 0 0 20%;

			.van-tabs__line {
				width: 30%;
			}
		}

		.van-tabs--line {
			overflow: auto;
		}

		// 无订单
		.no-order {
			height: 100vh;
			display: flex;

			text-align: center;

			p {
				margin: auto;
			}
		}
	}

	.order-card {
		height: 90vh;
	}

	.van-card__price {
		color: red;
		font-size: 16px;
		white-space: nowrap;
	}

	// 运费
	.freight {
		padding: 5px 0;
	}

	.price {
		color: red;
		white-space: nowrap;
	}

	.currency-price {
		color: #688569;
		font-size: 12px
	}

	.desc-class {
		color: #688569;
		font-size: 12px;

		.price {
			color: #688569;
		}
	}

	.price-block {
		text-align: right;
		font-size: 14px;
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: 1px solid #ebebeb;
	}

	.btn-bar {
		text-align: right;

		.van-button--small {
			margin-right: 6px;
		}
	}

	.van-card__title {
		font-weight: 600;
		font-size: 14px;
	}

	.van-panel {
		width: 94vw;
		border-radius: 10px;
		margin: 20px auto;
		box-shadow: 0 2px 3px 4px #dedede;

		.van-panel__header {
			border-radius: 10px 10px 0 0;
		}
	}

	.van-card {
		margin-top: 2px;
	}

	.van-panel__footer {
		padding-top: 20px;
	}

	// 收获信息
	.adress {
		padding: 15px 10px;
		height: 50px;
		border-bottom: 2px solid #dfe2e2e7;
		display: flex;
		align-items: center;

		.shou {
			padding: 2px 4px;
			font-size: 12px;
			color: #a5a4a4;
			border-radius: 50%;
			border: 1px solid #a5a4a4;
			margin-right: 10px;
		}

		.info {
			width: 80%;
			text-align: left;
			font-size: 14px;

			div {
				white-space: nowrap;
				line-height: 20px;

				span {
					margin-left: 5px;
				}
			}
		}

		.notes {
			padding: 10px 15px;
			box-sizing: border-box;
			line-height: 24px;
			background-color: #fff;
			color: #333;
			font-size: 12px;
			position: relative;

			.title {
				font-size: 14px;
			}

			p {
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>
