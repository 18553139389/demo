<template>
	<div class="adress" v-if="defaultConsignee">
		<van-cell icon="shop-o" is-link url="/pages/consignees/main" class="jiantou">
			<view slot="title" class="slot">
				<div class="font">
					<van-icon name="contact" size="25px" />
				</div>
				<div class="person">联系人：<span>{{ defaultConsignee.name }}</span></div>
				<div class="person">联系电话：<span>{{defaultConsignee.phone}}</span></div>
				<div class="person">地址：<span>{{defaultConsignee.address}}</span></div>
			</view>
		</van-cell>
		<div class="listItem">
			<van-card v-for="(item, index) in order.products" :key="index" :num="item.qty" :price="item.price" :title="item.name"
			 :thumb="item.photo.image" currency='AUD$'>
				<div slot="desc" class="van-card__desc">
					<span>(约合￥{{item.currency_price}})</span>
				</div>
			</van-card>

		</div>
		<van-cell title="配送方式" :value="selected" is-link @click="popup1" />
		<van-cell title="优惠券" :value="couponPrice" is-link @click="popup2" />
		<div class="group">
			<span>发件人信息</span><input type="text" placeholder="请输入发件人信息（选填）" v-model="sender_information">
		</div>
		<div class="group">
			<span>发件人电话</span><input type="text" placeholder="请输入发件人电话（选填）" v-model="sender_phone">
		</div>
		<div class="group massage">
			<span>留言</span><input type="text" placeholder="选填(如需标记或其他特别需求请备注)" v-model="sender_message">
		</div>
		<van-submit-bar :disabled="disabled" currency="AUD$" :price="totalPrice*100" button-text="结算" @submit="sendOrderToCloud">
			<span class="currency">（约合￥{{ currencyTotalPrice }}）</span>
		</van-submit-bar>
		<mp-picker ref="mpPicker" :pickerValueArray="list1" @onConfirm="sure"></mp-picker>

		<van-popup :show="showCustomAction" position="bottom" :overlay="true">
			<van-tabs @click="onClick" class="Coupon">
				<van-tab :title="'可用优惠券('+ coupons.length +')'" class="useCoupon">
					<div class="couponList" v-if="coupons.length > 0">
						<ul>
							<li v-for="(item, index) in coupons" :key="index" @click="chooseCoupons(item.value,item.currencyValue,index)">
								<div class="listLeft">
									<h2>{{item.name}}</h2>
									<p v-if="item.originCondition == 0 && item.categoryCondition == ''">无门槛</p>
									<p v-if="item.originCondition != 0">满{{item.originCondition/100}}元可用</p>
									<p v-if="item.categoryCondition != ''">限定{{item.categoryCondition}}</p>
								</div>
								<div class="listRight">
									<h3>{{item.typeName}}</h3>
									<p>有效期：{{item.created}}-{{item.expired}}</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="noItem" v-if="coupons.length == 0">
						<img src="../../../../static/images/empty.png" alt="">
						<p>暂无优惠券</p>
					</div>
				</van-tab>
				<van-tab title="不可用优惠券(0)" class="noCoupon">
					<div class="couponList" v-if="disabledCoupons.length > 0">
						<ul>
							<li v-for="(item, index) in disabledCoupons" :key="index">
								<div class="listLeft">
									<h2>{{item.name}}</h2>
									<p v-if="item.originCondition == 0 && item.categoryCondition == ''">无门槛</p>
									<p v-if="item.originCondition != 0">满{{item.originCondition/100}}元可用</p>
									<p v-if="item.categoryCondition != ''">限定{{item.categoryCondition}}</p>
								</div>
								<div class="listRight">
									<h3>{{item.typeName}}</h3>
									<p>有效期：{{item.created}}-{{item.expired}}</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="noItem" v-if="disabledCoupons.length == 0">
						<img src="../../../../static/images/empty.png" alt="">
						<p>暂无优惠券</p>
					</div>
				</van-tab>
			</van-tabs>
			<van-button size="large" type="default" @click="noUse">不使用优惠券</van-button>
		</van-popup>
		</mp-modal>
		<!-- 付款弹窗 -->
		<van-popup :show="showPayment" position="bottom" :close-on-click-overlay="false">
			<div class="top">
				<van-icon class="iconTop" @click="closePayment" name="close" />
				<h2>确认付款</h2>
			</div>
			<div class="total-block">
				<span class="price">AUD${{ totalPrice }}</span>
				<span class="currency-price">(约合￥{{ currencyTotalPrice }})</span>
			</div>
			<radio-group class="Payment" @change="radioChange">
				<div v-for="(item,index) in payMethods" :key="index" class="ul">
					<div class="radioRight">
						{{item.name}}
					</div>
					<radio :value="item.id" :checked="item.is_default" class="lis" />
				</div>
			</radio-group>
			<div class="pay-btn">
				<van-button size="large" type="primary" @click="goPay">立即付款</van-button>
			</div>
		</van-popup>
		<!-- 取消支付弹窗 -->
		<mp-modal ref="mpModal2" title="取消支付" showCancel="true" content="" @confirm="confirm2" @cancel="cancel2"></mp-modal>
		<!-- 是否已经支付 -->
		<mp-modal ref="mpModal3" title="是否已经支付?" showCancel="true" cancelText='返回首页' confirmText='查看订单' @confirm="confirm3"
		 @cancel="cancel3"></mp-modal>
	</div>
</template>

<script>
	import Payment from '@/components/order/orderPay.vue'
	import mpPicker from 'mpvue-weui/src/picker'
	import mpModal from 'mpvue-weui/src/modal'
	import client from '@lib/Rest'
	import _ from 'underscore'
	import Coupon from '@lib/module/coupon'
	import utli from '@lib/Utli'
	import vantPayment from '@lib/vant/payment'
	import payment from '@lib/payment'
	export default {
		data() {
			return {
				imageURL: '../../../static/img/banner.png',
				show: false,
				selectedTransport: null,
				list1: [],
				selected: null,
				showCustomAction: false, // 优惠券弹窗 
				sender_information: '',
				sender_phone: '',
				sender_message: '',
				defaultConsignee: {},
				coupons: [], // 优惠券
				disabledCoupons: [],
				postData: null,
				showPayment: false, // 支付
				defaultMethod: '',
				payMethods: [],
				val1: 0,
				val2: 0,
				chosenCoupon: -1
			}
		},
		beforeDestroy() {
			this.$store.commit('cart/CHANGE_MANAGE', false)
		},
		onShow() {
			let self = this;
			this.val1 = 0
			this.val2 = 0
			let endpoint = this.$store.getters['server/getEndpoint'];
			let api = this.$store.getters['configs/getApiList'].consignee_api_endpoint + '/get/default';
			let token = this.$store.getters['account/getCustomerToken']
			console.log("进订单页面", endpoint)
			let apiurl = endpoint + api
			wx.request({
				url: apiurl,
				method: 'GET',
				header: {
					'Authorization': token,
					'content-type': 'application/json' // 默认值
				},
				success(res) {
					console.log("请求成功了---", res)
					if (res.data.code === 200) {
						self.defaultConsignee = res.data.data //请求到的地址
					} else {
						// 没有默认地址提示
						wx.showModal({
							title: '没有收货人信息',
							cancelText: '购物车',
							confirmText: '新建',
							success(res) {
								if (res.confirm) {
									wx.navigateTo({
										url: '/pages/consignees/textCons/main?type=add'
									})
								} else if (res.cancel) {
									self.$router.go(-1)
								}
							}
						})
					}
				},
				fail() {
					wx.navigateBack({
						delta: 1
					})
				},
				complete(res) {
					console.log(res)
				}
			});
			this.$store.dispatch('transport/GET_DATA_FROM_CLOUD')

			this.$store.dispatch('coupon/GET_DATA_FROM_CLOUD', {
				request: '?limit=1000&can_use=true',
				needConcat: false,
				cb: (response) => {
					if (response.data.code === 200) {
						Coupon.getCouponByProducts(this.$store, this.order.products, this.order.total, function(couponList) {
							self.coupons = couponList.enable
							self.disabledCoupons = couponList.disable
							for (let i = 0; i < response.data.data.length; i++) {
								for (let j = 0; j < self.coupons.length; j++) {
									if (response.data.data[i].id == self.coupons[j].id) {
										self.coupons[j].created = response.data.data[i].created
										self.coupons[j].expired = response.data.data[i].expired
									}
								}
							}
							for (let i = 0; i < response.data.data.length; i++) {
								for (let j = 0; j < self.disabledCoupons.length; j++) {
									if (response.data.data[i].id == self.disabledCoupons[j].id) {
										self.disabledCoupons[j].created = response.data.data[i].created
										self.disabledCoupons[j].expired = response.data.data[i].expired
									}
								}
							}
						}.bind(this))
					}
				}
			})

			this.payMethods = this.$store.getters['payment/getAll']
			if (this.$store.getters['payment/getDefaultMethod'] && this.defaultMethod === '') {
				console.log("进if了没")
				this.method = this.$store.getters['payment/getDefaultMethod']
				this.defaultMethod = this.$store.getters['payment/getDefaultMethod'].id
			}
			console.log(this.payMethods, '没有数据支付吗')
		},
		computed: {
			couponPrice() {
				let str = ''
				if (this.val1 && this.val2) {
					str = '-¥' + this.val1 + '（约合$' + this.val2 + '）'
				} else {
					str = '您有' + this.coupons.length + '个可用优惠'
				}
				return str
			},
			weight() {
				console.log('订单信息order: ', this.order)
				console.log(' 提交的订单信息order:', this.orderPay)
				let weight = _.reduce(this.order.products, (total, item) => {
					let w = item.product_weight
					/* eslint-disable */
					if (!!w) {
						/* eslint-enable */
						return total + item.qty * parseFloat(item.product_weight)
					} else {
						return total
					}
				}, 0)
				weight = weight * 0.001
				//        weight = Math.ceil(weight)
				if (weight < 1) {
					weight = 1
				}
				console.log('weight', weight)
				return weight
			},
			// 配送地址
			transport() {
				let that = this
				that.list1 = []
				let data = this.$store.getters['transport/getAll']
				if (data === undefined) return false
				data = JSON.parse(JSON.stringify(data))
				console.log('配送地址data: ', data)
				_.each(data, item => {
					item.price = Math.round(parseFloat(item.price) * this.weight * 100) / 100
					item.currency_price = Math.round(parseFloat(item.currency_price) * this.weight * 100) / 100
				})
				let output = _.map(data, (item, index) => {
					let result = {
						text: item.name + ' $' + item.price + ' (约合￥' + item.currency_price + ')',
						...item
					}
					console.log(result)
					that.list1.push({
						label: result.text,
						price: result.price,
						currency_price: result.currency_price
					})
					return result
				})
				console.log(that.list1, "啊啊啊啊")
				if (!this.selectedTransport) {
					this.selectedTransport = output[0]

				}
				return output

			},
			order: function() {
				return this.$store.getters['cart/getOrder']
			},
			orderPay: function() {
				// 提交的订单信息

				return this.$store.dispatch('payment/GET_DATA_FROM_CLOUD')

			},
			// submitBarText: function () {
			//   const count = this.checkedGoods.length
			//   return '结算' + (count ? `(${count})` : '')
			// },
			totalPrice: function() {
				console.log('优惠券coupon: ', this.coupons)
				if (!this.selectedTransport) { // 防止报错
					return
				}
				let total = this.order.total - parseFloat(this.val2)
				if (total < 0) {
					total = 0
				}
				total = total + parseFloat(this.selectedTransport.price)
				return this.parsePrice(total)
			},
			currencyTotalPrice: function() {
				if (!this.selectedTransport) { // 防止报错
					return
				}
				if (this.selected == null) {
					console.log(this.selectedTransport, "这里有咩有")
					this.selected = this.selectedTransport.text
				}
				let total = this.order.currencyPrice - parseFloat(this.val1)
				if (total < 0) {
					total = 0
				}
				total = total + parseFloat(this.selectedTransport.currency_price)
				return this.parsePrice(total)
			},
			// 支付方式
			// 			payMethods() {
			// 				console.log("走进来了")
			// 				let all = this.$store.getters['payment/getAll']
			// 				if (this.$store.getters['payment/getDefaultMethod'] && this.defaultMethod === '') {
			// 					console.log("进if了没")
			// 					this.method = this.$store.getters['payment/getDefaultMethod']
			// 					this.defaultMethod = this.$store.getters['payment/getDefaultMethod'].id
			// 					this.disabledPay = false
			// 				}
			// 				console.log(all, "10101010")
			// 				return all
			// 			},
			applyMethod() {
				return this.method
			}
		},
		methods: {
			initPayment() {
				this.showPayment = true
			},
			popup1() {
				this.$refs.mpPicker.show();
				console.log("点击了配送")
			},
			sure(item) {
				console.log(item, "看传进来了啥")
				this.selected = item.label

				if (item.inex[0] == 0) {
					this.selectedTransport = this.list1[0]
				} else if (item.inex[0] == 1) {
					this.selectedTransport = this.list1[1]
				}

				// this.selectedTranspor[0] = item.label
			},
			popup2() {
				this.showCustomAction = true
			},
			onClick(index, title) {

			},
			noUse() {
				this.showCustomAction = false
				this.chosenCoupon = -1
				this.val1 = 0
				this.val2 = 0
			},
			chooseCoupons(item1, item2, index) {
				this.showCustomAction = false
				this.val1 = (parseInt(item1) / 100).toFixed(2)
				this.val2 = (parseInt(item2) / 100).toFixed(2)
				this.chosenCoupon = index
			},
			// 点击去添加收货人信息
			confirm() {
				this.$refs.mpPicker2();
				wx.navigateTo({
					url: '/pages/consignees/textCons/main?type=add'
				})
			},
			// 点击取消
			cancel() {

			},
			sendOrderToCloud(cb) {
				// 删除购物车里面的商品
				// 付款
				// 0待付款,1已付款, 2退款，3已取消, 4已发货，5待发货，10已完成
				// Toast.loading({
				//   duration: 100000,       // 持续展示 toast
				//   forbidClick: true, // 禁用背景点击
				//   loadingType: 'spinner',
				//   message: this.$t('提交订单中'),
				//   mask: true
				// })
				let endpoint = this.$store.getters['server/getEndpoint']
				let {
					products
				} = this.$store.getters['cart/getOrder']
				let token = this.$store.getters['account/getCustomerToken']
				let siteUuid = this.$store.getters['env/getSiteUuid']
				let uuid = this.$store.getters['account/getCustmerUuid']
				console.log(uuid,token,'顾客信息怎么没有')
				let consignee = this.defaultConsignee
				let api = this.$store.getters['configs/getApiList'].order_api_endpoint + '/add'
				let apiurl = endpoint + api
				let couponData = this.coupons[this.chosenCoupon]
				let cartIndexIds = _.map(this.order.products, item => item.index)
				console.log(this.order.products)
				console.log(cartIndexIds, '是什么东西')
				console.log(couponData, '选择的优惠')
				let data = JSON.stringify({
					site_uuid: siteUuid,
					createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
					paidOn: moment().format('YYYY-MM-DD HH:mm:ss'),
					total: this.totalPrice,
					currency_total: this.currencyTotalPrice,
					notes: this.notes,
					credit: {
						topup_credit: 0,
						bonus_credit: 0,
						pay_credit: 0
					},
					products: products,
					transport: this.selectedTransport.name,
					freight: this.selectedTransport.price,
					currencyFreight: this.selectedTransport.currency_price,
					delivery_id: this.selectedTransport.id,
					coupon: couponData,
					discountAmount: couponData ? couponData.currencyValue / 100 : 0,
					discount: couponData ? couponData.value / 100 : 0,
					customer: {
						uuid
					},
					isAoyou: true,
					consignee_id: consignee.id,
					cart_index_ids: cartIndexIds,
					sender_information: this.sender_information,
					sender_phone: this.sender_phone,
					sender_message: this.sender_message
				})
				this.postData = JSON.parse(data)
				console.log('转换data后的postData: ', this.postData) // 非常正确
				let self = this
				wx.request({
					url: apiurl,
					method: 'POST',
					data: data,
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(s) {
						console.log(s, "结算订单成功")
						self.orderNo = s.data.data.order_no
						self.postData = {
							orderNo: s.data.data.order_no,
							...self.postData
						}
						console.log(self.postData, "点击结算后提交给后台的订单")
						if (s.data.code === 200) {
							console.log("提交成功--该调支付了")
							self.$store.dispatch('cart/DELETE_CART_ITEM_FROM_CLOUD', {
								checkedItemIndexs: cartIndexIds
							})
							self.initPayment() // 调支付弹窗
							// cb && cb(s.data)
						}
					},
					fail() {
						if (token) {
							self.$store.commit('system/COMMIT_NET_WORK_ERROR', true)
						}
						if (errorCallBack !== undefined) {
							if (errorCallBack !== undefined) errorCallBack()
						}
					}
				})
			},
			parsePrice(val) {
				console.log(val, "计算价格")
				val = parseFloat(val)
				if (!_.isNumber(val)) {
					console.log(val + 'is not number')
				}
				return Math.round(val * 100) / 100
			},

			// 以下为支付的
			radioChange(e) {
				let id = e.mp.detail.value
				for (let i = 0; i < this.payMethods.length; i++) {
					if (this.payMethods[i].id == e.mp.detail.value) {
						this.method = this.payMethods[i]
					}
					this.payMethods[i].is_default = false
					if (this.getConsignees[i].id == id) {
						this.getConsignees[i].is_default = true
					}
				}
			},
			closePayment() {
				this.$refs.mpModal2.show();
			},
			// 点击去添加收货人信息
			confirm2() {
				this.showPayment = false

				wx.navigateTo({
					url: '/pages/order/main'
				})
			},
			// 点击取消
			cancel2() {
				this.showPayment = false
				wx.navigateTo({
					url: '../../person/main'
				})
			},
			// 去付款
			goPay() {
				this.disabledPay = true
				let self = this
				const payMethod = self.applyMethod
				let order = self.postData // order可能会混淆
				console.log(order, "首次拿到order")
				order.data = {}
				order.data.order_no = order.orderNo //undefined
				order.data.price = order.total
				order.data.currencyTotal = order.currencyTotal || order.currency_total //undefined
				console.log(payMethod, "进支付--拿到的订单内容", order)
				// this.$store.commit('page/COMMIT_REDIRECT', {page: '/pay_success?hide-tab-bar'})
				if (payMethod.third_party_pay) { //true
					console.log("进这里来了，，，")
					payment.callPaymentAPi({
						payMethod,
						order,
						cb: function() {
							console.log("支付成功了")
							self.$emit('paySuccess')
							self.$router.push({
								path: '/pages/order/main'
							})
						},
						self,
						// dom: $('#message')
					})
				} else {
					console.log("支付失败了")
					this.$emit('payFail')
					self.$router.push({
						path: '/pages/order/main'
					})
				}
			},
			duringThePayment(orderData) {
				console.log(orderData, "传进弹窗的内容")
				this.$refs.mpModal3.show();
				// let self = this
				// // this.readyProcess(this.$store, {
				// //   cb: function () {}
				// // })
				// Dialog.confirm({
				//   title: this.$t('是否已经支付?'),
				//   confirmButtonText: this.$t('查看订单'), //确认
				//   cancelButtonText: this.$t('返回首页')  //取消
				// }).then(() => {
				//   self.$emit('paySuccess')
				//   self.$router.push({path: '/order/history?hide-tab-bar'})
				//           let endpoint = self.$store.getters['server/getEndpoint']
				//           let env = self.$store.state.env.currentEnv
				//           let token = self.$store.state.env.envList[env].token
				//           let apiurl = endpoint + self.$store.getters['config/getApiList'].payment_gateway + '/check/' + self.order.uuid
				//           client.get(apiurl, token, (s) => {
				//             if (s.code === 200 && s.status === true) {
				//               Dialog.alert({
				//                 message: self.$t('订单已支付')
				//               }).then(() => {
				//                 self.$emit('cancelPay')
				// //                self.$router.replace({
				// //                  path: '/order/history?hide-tab-bar'
				// //                })
				//                 self.$router.replace({
				//                   path: '/success?hide-tab-bar',
				//                   query: {
				//                     price: orderData.price,
				//                     currency_price: orderData.currencyTotal
				//                   }
				//                 })
				//               })
				//             } else {
				// //              Dialog.alert({
				// //                message: self.$t('订单未支付')
				// //              }).then(() => {
				//               self.$emit('cancelPay')
				//               self.$router.replace({
				//                 path: '/order/history?hide-tab-bar'
				//               })
				// //              })
				//             }
				//           }, (e) => {
				// //            Dialog.alert({
				// //              message: self.$t('订单未支付')
				// //            }).then(() => {
				//             self.$emit('cancelPay')
				//             self.$router.replace({
				//               path: '/order/history?hide-tab-bar'
				//             })
				// //            })
				//           })
				// }).catch(() => {
				//   self.$emit('cancelPay')
				//   self.$router.replace({
				//     path: '/home'
				//   })
				// })
			},
			// 
			confirm3(orderData) {
				this.$emit('paySuccess')
				this.$router.push({
					path: '/pages/order/main'
				})
			},
			// 点击取消
			cancel3() {
				self.$emit('cancelPay')
				self.$router.replace({
					path: '/pages/index/main'
				})
			},
		},
		components: {
			mpPicker,
			mpModal,
			Payment
		}
	}
</script>

<style lang="scss">
	.font {
		float: left;
		height: 60px;
		margin-right: 30rpx;
		line-height: 60px;
		margin-top: 27rpx;
	}

	.jiantou .van-cell__right-icon-wrap {
		margin-top: 50rpx;
	}

	.van-cell-group {
		padding-bottom: 110rpx;
	}

	.listItem {
		width: 100%;

		.van-checkbox {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.van-checkbox__icon {
				margin-left: 5rpx;
			}
		}

		._van-card {
			width: 80%;

			.van-card__thumb {
				left: 0;
			}

			.van-card__title {
				font-size: 28rpx;
				font-weight: 600;
			}

			.van-card__price {
				font-size: 32rpx;
				color: #FF4444;
			}

			.van-card__desc {
				font-size: 24rpx;
				color: #688569;
			}

			.van-card__num {
				margin-top: 30rpx;
			}

			.van-card__price {
				position: relative;
			}

			.van-card__desc {
				position: absolute;
				right: 24rpx;
				top: 46rpx;
			}
		}
	}


	// 优惠券
	.van-popup {
		text-align: center;

		.van-tabs--line {
			background: #F8F8F8;
			height: 700rpx;
			overflow-y: auto;

			.noItem {
				margin: 100rpx auto;
				font-size: 24rpx;
				color: #8f8d8d;

				img {
					width: 160rpx;
					height: 170rpx;
				}
			}
		}
	}

	.currency {
		color: #688569;
		font-size: 24rpx;
		font-weight: 500;
		position: absolute;
		bottom: 0px;
		right: 120px
	}

	.group {
		width: 100%;
		padding: 10px 0;
		margin: 0 15px;
		line-height: 24px;
		color: #333;
		font-size: 15px;
		display: flex;
		border-bottom: 1px solid #dfdfdf;

		input {
			width: 75%;
			border: none;
			background: #fff;
			margin-left: 10px;
		}
	}

	.massage {
		margin-bottom: 55px
	}

	.top {
		font-size: 18px;
		margin-top: 10px;
	}

	.total-block {
		.price {
			font-size: 20px;
			color: #FF0000;
		}

		.currency-price {
			font-size: 14px;
			color: #688569;
		}
	}

	.Payment {
		width: 100%;
		margin: 10px 0;

		.ul {
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			line-height: 35px;

			.radioRight {
				margin-left: 10px;
			}

			._radio {
				margin-right: 10px;
			}
		}
	}

	.couponList {
		width: 100%;
		padding-bottom: 30px;

		ul {
			li {
				width: 92%;
				margin: 0 auto;
				display: flex;
				box-shadow: 0 0 4px rgba(0, 0, 0, .1);
				margin-top: 20px;
				background: #FFFFFF;
				border-radius: 8px;

				.listLeft {
					width: 38%;
					padding: 15px 2% 15px 15px;
					float: left;

					h2 {
						color: #FF4444;
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-weight: 600;
						text-align: left;
					}

					p {
						padding-top: 4px;
						font-size: 12px;
						color: #7e7b7b;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						text-align: left;
					}
				}

				.listRight {
					width: 52%;
					padding: 15px 10px 15px 0;
					float: right;

					h3 {
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-weight: 500;
						text-align: left;
					}

					p {
						padding-top: 3px;
						font-size: 12px;
						color: #7e7b7b;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						text-align: left;
					}
				}
			}
		}
	}
</style>
