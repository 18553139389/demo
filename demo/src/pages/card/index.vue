<template>
	<div id="myCard">
		<mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask="isShowMask"></mp-loading>
		<!-- 循环列表 -->
		<div class="footerNav">
			<div class="footerList" v-for="(item,indx) in images" :key="indx" @click="changeNav(indx)">
				<img :src="item.url" alt="">
				<span :class="{active:indx == 2}">{{item.text}}</span>
			</div>
		</div>
		<div class="cList" v-if="carts.length > 0">
			<div class="listItem">
				<div class="del" v-if="delchecked" @click="delGoods"><span>删除</span> </div>
				<div class="checkList" v-for="(item, index) in catrsList" :key="index" @click="Checked(index)">
					<input type="checkbox" :name="item" class="checks" :checked="item.checked">
					<van-card :num="item.qty" tag="热销" :price="item.price" :title="item.name" :thumb="item.photo.image" currency='AUD$'>
						<div slot="desc" class="van-desc">
							<span>(约合￥{{item.currency_price}})</span>
						</div>
						<div slot="footer">
							<van-button size="mini" @click="editGood(item)">编辑</van-button>
						</div>
					</van-card>
				</div>
			</div>
		</div>
		<div class="noOrder" v-else>
			<img src="../../../static/img/logobig.png" alt="">
			<p>您的购物车是空的</p>
		</div>
		<!-- 结算按钮 -->
		<div class="bottom">
			<mp-button type="primary" :disabled="disabled" size="large" btnClass="count" @click="orderPayment">结算</mp-button>
			<span style="margin-right: 12rpx;color: #999;font-size: 12px;">(约合￥{{currencyPrice}})</span>
			<span style="color:red;font-size: 14px;">AUD$ {{productPrice}}</span>
			<span class="guide">结算：</span>
		</div>
		<!-- 订单信息弹窗 -->
		<div class="mask" v-if="showCustomAction">
			<van-popup :show="showCustomAction" position="bottom" :overlay="false">
				<div class="popud">
					<img :src="poupImg" alt="">
					<div class="cont">
						<p>{{editItem.name}}</p>
						<h2>AUD$ <span>{{editItem.price}}</span><span class="yuehe">(约合￥{{editItem.currency_price}})</span></h2>
					</div>
					<van-icon name="close" @click="close" />
				</div>
				<div class="buy"><span>我要买：</span>
					<van-stepper v-model="value" step @change="changeQty" />
				</div>
				<van-button size="large" type="primary" @click="query">确认</van-button>
			</van-popup>
		</div>
		<!-- 删除商品弹窗 -->
		<mp-modal ref="mpModal" title="删除商品" content="你希望删除选中的商品吗" showCancel="true" @confirm="confirm" @cancel="cancel">
		</mp-modal>
	</div>
</template>

<script>
	import mpCheckbox from 'mpvue-weui/src/checkbox';
	import mpModal from 'mpvue-weui/src/modal';
	import _ from 'underscore'
	import setting from "@lib/system/Setting";
	import client from '@lib/Rest'
	import utli from "@lib/Utli"
	import mpLoading from 'mpvue-weui/src/loading'
	import mpButton from 'mpvue-weui/src/button'
	// import vantProduct from '@lib/pagination/product'

	export default {
		
		data() {
			return {
				images: [{
						text: "首页",
						url: "../../static/tabs/first.png"
					},
					{
						text: "分类",
						url: "../../static/tabs/type.png"
					},
					{
						text: "购物车",
						url: "../../static/tabs/card-icon.png"
					},
					{
						text: "个人中心",
						url: "../../static/tabs/person.png"
					}
				],
				activeKey: 2,
				num: 2,
				disabled: true,
				delchecked: false, // 删除按钮状态
				delnum: 0, //删除按钮数量
				showCustomAction: false,
				Price: '', // 总商品价格（美元）
				currencyPrice: '', // 总商品价格（人民币）
				value: 1,
				imageURL: '../../../static/img/banner.png',
				sku: {
					// 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
					// 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
					tree: [],
					// 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
					list: [],
					price: '1.00', // 默认价格（单位元）
					stock_num: 227, // 商品总库存
					collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
					none_sku: true, // 是否无规格商品
					messages: [],
					hide_stock: true // 是否隐藏剩余库存
				},
				// checkedGoods:[], //所以被选中计价的商品
				editItem: {},
				poupImg: '',
				editItemQty: 1,
				timer: null,
				catrsList: [] ,// 保存carts的值
				isShowLoading:false,
			}
		},
		components: {
			mpModal,
			mpLoading,
			mpButton
		},
		beforeDestroy() {
			this.$store.commit('cart/CHANGE_MANAGE', false)
		},
		beforeUpdate() {
			this.catrsList = this.carts
		},
		created() {
			let self = this
			setting.readyProcess(this.$store, {
				cb: function() {
					self.$store.dispatch('coupon/GET_DATA_FROM_CLOUD', {
						request: '',
						needConcat: false,
						cb: (data) => {
						}
					})
				}
			})
		},
		mounted() {
			this.init()
		},
		computed: {
			isLogin() {
				return this.$store.getters['account/isLogin']
			},
			carts() {
				return this.$store.getters['cart/getCarts']
			},
			// 总价格计算
			totalPrice() {
				let checkedGoods = []
				for (let i = 0; i < this.catrsList.length; i++) {
					if (this.catrsList[i].checked) {
						checkedGoods.push(this.catrsList[i])
					}
				}
				if (checkedGoods.length > 0) {
					let total = _.reduce(checkedGoods, (memo, item) => {
						this.Price = memo + parseFloat(item.qty * item.subtotal)
						return memo + parseFloat(item.qty * item.subtotal)
					}, 0)
				} else {
					this.Price = 0
				}
			},
			currencyTotalPrice() {
				let checkedGoods = []
				for (let i = 0; i < this.catrsList.length; i++) {
					if (this.catrsList[i].checked) {
						checkedGoods.push(this.catrsList[i])
					}
				}
				if (checkedGoods.length > 0) {
					let total = _.reduce(checkedGoods, (memo, item) => {
						this.currencyPrice = memo +parseFloat(item.qty * item.currency_subtotal)
						return memo + parseFloat(item.qty * item.currency_subtotal)
					}, 0)
				} else {
					this.currencyPrice = 0
				}
			},
			productPrice() {
				let count = (parseFloat(this.Price).toFixed(2))
				return count
			}
		},
		methods: {
			// 编辑弹窗信息
			editGood(item) {
				this.editItem = item
				this.value = this.editItem.qty // 弹出框的value
				this.poupImg = item.photo.image // 弹出框商品图
				this.showCustomAction = true // 显示弹窗
				console.log("点击了编辑")
			},
			changeQty(value) {
				console.log(value)
				this.value = value.mp.detail
			},
			// 确认信息
			query() {
				this.editItem.qty = this.value
				this.showCustomAction = false
			},
			// 关闭弹窗
			close() {
				this.showCustomAction = false;
			},
			// 选商品
			Checked(index) {
				for (var i = 0; i < this.catrsList.length; i++) {
					if (index == i) {
						this.catrsList[i].checked = !this.catrsList[i].checked
						if (this.catrsList[i].checked) {
							this.delchecked = true // 商品勾选框
							this.disabled = false // 结算按钮取消禁选
							this.delnum++
						} else {
							this.delnum--
						}
					}
				}
				if (this.delnum == 0) {
					this.delchecked = false
					this.disabled = true // 结算按钮禁选
				}
			},
			// 删除商品
			delGoods() {
				this.$refs.mpModal.show();
				console.log("点击了删除")
			},
			confirm() { // 在这进行删除操作
				let checkedItemIndexs = []
				for (let i = 0; i < this.catrsList.length; i++) {
					if (this.catrsList[i].checked) {
						checkedItemIndexs.push(this.catrsList[i].index)
					}
				}
				this.$store.dispatch('cart/DELETE_CART_ITEM_FROM_CLOUD', {
					checkedItemIndexs,
					cb: function() {
						this.delnum = 0
						this.init()
						// this.showPositionValue = true
					}.bind(this)
				})
			},

			// 确认下单
			orderPayment() {
				let checkedGoods = []
				for (let i = 0; i < this.catrsList.length; i++) {
					if (this.catrsList[i].checked) {
						checkedGoods.push(this.catrsList[i])
					}
				}
				let order = {
					total: this.Price,
					currencyPrice: this.currencyPrice,
					products: JSON.parse(JSON.stringify(checkedGoods))
				} // 一份订单
				this.$store.commit('cart/COMMIT_RESET_ORDER', order)
				this.$router.push({
					path: '/pages/card/cardOrder/main?hide-tab-bar'
				})
			},
			init() {
				let self = this
				self.isShowLoading= true;
				setting.readyProcess(this.$store, {
					cb: function() {
						self.$store.dispatch('cart/GET_DATA_FROM_CLOUD', {
							cb: (res) => {
								if (res.data.code === 200) {
									self.isShowLoading= false;
								}
							},
							errorCb: () => {}
						})
					}
				})
			},
			changeNav(index) {
				console.log(index)
				if (index == 0) {
					wx.redirectTo({
						url: '../index/main'
					})
				} else if (index == 1) {
					wx.redirectTo({
						url: '../category/main'
					})
				} else if (index == 3) {
					let path = this.$route.path;
					if ((path = "/pages/person/main")) {
						path = "person";
					}
					let page = {
						url: path,
						query: {
							uuid: this.$route.query.uuid,
							"hide-tab-bar": true
						}
					};
					utli.loginCheck(
						this.$store,
						this.$router,
						page,
						"login?hide-tab-bar",
						function() {
							wx.redirectTo({
								url: '../person/main'
							})
						}.bind(this)
					);
				}
			}
		}
	}
</script>

<style lang='scss'>
	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 100rpx;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}
	
	.bottom>span {
		display: inline-block;
		height: 100rpx;
		line-height: 100rpx;
	}
	
	.count {
		border-radius: 0 !important;
		width: 240rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin: 0 !important;
		font-size: 16px;
		color: #333;
	}
	
	.guide {
		font-size: 16px;
		color: #999;
	}
	
	#myCard {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.footerNav {
			width: 100%;
			height: 50px;
			position: fixed;
			left: 0;
			bottom: 0;
			background: rgb(247, 247, 249);
			border-top: 2px solid #eee;
			z-index: 20;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}

		.footerList {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
		}

		.footerList img {
			width: 26px;
			height: 26px;
		}

		.footerList span {
			font-size: 28rpx;
			color: #999;
		}

		.active {
			color: rgb(102, 133, 96) !important;
		}

		.del {
			width: 100%;
			height: 60rpx;

			span {
				float: right;
				margin: 5rpx 10rpx;
				padding: 0 30rpx;
				font-size: 28rpx;
				border: 1px solid #FF4444;
				border-radius: 30rpx;
				color: #FF4444;
			}

		}

		.listItem {
			width: 100%;
			height: 83vh;
			overflow: auto;

			.checkList {
				display: flex;

				.checks {
					font-size: 20rpx;
					line-height: 200rpx;
					margin-left: 20rpx;
				}
			}

			.van-checkbox {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.van-checkbox__icon {
					margin-left: 5rpx;
				}
			}

			._van-card {
				width: 90%;

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

				.van-desc {
					font-size: 24rpx;
					color: #688569;
				}

				.van-card__num {
					margin-top: 30rpx;
				}

				.van-card__price {
					position: relative;
				}

				.van-desc {
					position: absolute;
					right: 24rpx;
					top: 46rpx;
				}
			}

		}

		.noOrder {
			height: 100vh;
			text-align: center;
			background: #ffffff;

			img {
				width: 50%;
				height: 320rpx;
				margin: 0 auto;
				margin-top: 200rpx;
			}

			p {
				font-size: 34rpx;
				color: #cccccc;
				margin-top: 50rpx;
			}

		}
		
		.mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.6);
			z-index: 999;
		}

		.van-popup {
			background: #f0f0f0;
			height: 390rpx;

			.popud {
				width: 100%;

				img {
					width: 160rpx;
					height: 160rpx;
					position: absolute;
					left: 15rpx;
				}

				.cont {
					margin-left: 200rpx;
					margin-top: 15rpx;
					width: 480rpx;

					p {
						font-size: 28rpx;
						line-height: 40rpx;
					}

					h2 {
						font-size: 32rpx;
						color: #FF4444;

						.yuehe {
							color: #648561;
							font-size: 30rpx;
						}
					}
				}

				.van-icon-close {
					position: absolute;
					right: 20rpx;
					top: 20rpx;
				}
			}

			.buy {
				margin-top: 55rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
				border-top: 1px solid #dddddd;

				span {
					font-size: 30rpx;
					text-indent: 20rpx;
				}
			}
		}

		.van-submit-bar {
			bottom: 50px;
		}
	}
</style>
