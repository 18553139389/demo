<template>
	<div class="goods">
		<van-tabs v-model="active">
			<van-tab title="商品">
				<div class="banner">
					<swiper :images="arr1" :indicatorDots="indicatorDots"></swiper>
				</div>
				<van-cell-group>
					<van-cell>
						<div class="goods-title">{{title}}</div>
						<p class="goods-price">AUD${{price}}</p>
						<p class="goods-target-price">（合约¥{{currentPrice}}）</p>
						<van-stepper v-model="qty" integer :min="1" :step="1" />
					</van-cell>
					<van-cell class="goods-express">
						<van-col span="14">剩余：1</van-col>
					</van-cell>

					<van-cell>
						<ul class="choose" style="background-color: white;">
							<li>
								<van-icon name="location" />
								<span>澳洲发货</span>
							</li>
							<li>
								<van-icon name="clock" />
								<span>无痕代发</span>
							</li>
							<li>
								<van-icon name="certificate" />
								<span>正品保证</span>
							</li>
						</ul>
					</van-cell>
					<van-cell>
						<p style="color:#b2b2b2; font-size: 12px; display: block; text-align: center;">承诺:*1个工作日发货*100%澳洲发货*平台承担关税</p>
					</van-cell>
					<van-cell>
						<p style="color:#b2b2b2; font-size: 12px; display: block; text-align: center;">须知:根据中国海关要求，寄往中国的订单请上传身份证件，否则将影响通关</p>
					</van-cell>
				</van-cell-group>
			</van-tab>
			<van-tab title="描述">
				<div>
					<img id="view" v-for="(photo, index) in des" :key="index" :src="photo.image" style="width:100%;">
					<div class="list_header" v-if="des.length === 0">很抱歉，商品描述还没有哦</div>
				</div>
			</van-tab>
		</van-tabs>
		<van-goods-action>
			<van-goods-action-icon icon="chat" class="chat_footer_button" text="客服" @click="goService"></van-goods-action-icon>
			<van-goods-action-icon icon="shop" text="首页" @click="goHome" />
			<van-goods-action-icon icon="cart" text="购物车" @click="goMyCart"></van-goods-action-icon>
			<van-goods-action-button text="加入购物车" primary="true" @click="goCart"></van-goods-action-button>
		</van-goods-action>
		<mp-toast type="success" v-model="CartSuc" content="加入购物车成功" duration="1500"></mp-toast>
		<mp-loading :showLoading="isShowLoading" loadingText="添加中..." :mask="isShowMask"></mp-loading>
	</div>
</template>

<script>
	import Swiper from "@/components/swiper";
	import setting from "@lib/system/Setting";
	import utli from "@lib/Utli"
	import client from '@lib/Rest'
	import mpToast from 'mpvue-weui/src/toast';
	import mpLoading from 'mpvue-weui/src/loading'

	export default {

		data() {
			return {
				active: 2,
				product: null,
				selectAttributes: [],
				indicatorDots: true,
				showPage: false,
				productAdvDescription: [],
				qty: 1,
				timer: null,
				bannerList: [],
				arr1: [],
				title: "",
				price: "",
				currentPrice: "",
				des: [],
				CartSuc: false,
				isShowLoading: false,
				images: [{
						img: "../../static/images/banner2.jpg"
					},
					{
						img: "../../static/images/banner3.jpg"
					}
				]
			};
		},
		mounted() {
			let self = this;
			let query = this.$route.query;
			let uuid = query.uuid;
			console.log(query,'传过来的的参数')
			setting.readyProcess(this.$store, {
				cb: function() {
					self.$store.dispatch("product/GET_PRODUCT_BY_UUID_FROM_CLOUD", {
						uuid,
						size: self.$store.getters["page/getWindowsSize"].width,
						hasProductAdvDesc: true,
						cb: function(res) {
							if (res.data.code === 200) {
								self.product = res.data;
								self.bannerList = self.product.data.photos;
								self.title = self.product.data.name;
								self.price = self.product.data.price;
								self.currentPrice = self.product.data.currency_price;
								self.des = self.product.data.product_adv_description;
								console.log(self.product, "详情页面的数据展示");
								console.log(self.des);
								for (let i = 0; i < self.bannerList.length; i++) {
									let obj = {};
									obj.img = self.bannerList[i].image;
									self.arr1.push(obj);
								}
								self.showPage = true;
								self.isShowLoading = false
							}
						}
					});
				}
			});
		},
		components: {
			Swiper,
			mpToast,
			mpLoading,
		},
		methods: {
			goHome() {
				this.$router.push({
					path: "/pages/index/main",
					isTab: true
				});
			},
			goService() {
				this.$router.push("../customerService/main");
			},
			resetAttributes() {
				this.selectAttributes = []
			},
			goCart() {
				let that = this;
				let path = this.$route.path;
				that.isShowLoading = true
				if ((path = "/pages/productDetail/main")) {
					path = "/product";
				}
				let page = {
					url: path,
					query: {
						uuid: this.$route.query.uuid,
						"hide-tab-bar": true
					}
				}
				console.log(page,'在详情里面的输出')
				utli.loginCheck(
					this.$store,
					this.$router,
					page,
					"login?hide-tab-bar",
					function() {
						this.sendCartToCloud();
					}.bind(this)
				);
			},
			goMyCart() {
				let path = this.$route.path;
				console.log(path, "00000+++")
				if ((path = "/pages/productDetail/main")) {
					path = "card";
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
							url: '../card/main'
						})
					}.bind(this)
				);
				this.$router.push({
					path: "/pages/card/main",
					isTab: false
				});
			},
			sendCartToCloud() {
				console.log('进入sendCart')
				// Toast.loading({
				//   duration: 0, // 持续展示 toast
				//   forbidClick: true, // 禁用背景点击
				//   loadingType: "spinner",
				//   message: this.$t("添加中"),
				//   mask: true
				// });
				let that = this
				this.isShowLoading = true;
				let product = this.product;

				let endpoint = this.$store.getters["server/getEndpoint"];
				let token = this.$store.getters["account/getCustomerToken"];
				let api = this.$store.getters["configs/getApiList"].cart + "/add";
				console.log(api)
				let requestUri = endpoint + api;
				let productAttributeIds = [];
				let productAttribute = [];
				this.selectAttributes.forEach(item => {
					let attr = JSON.parse(item);
					productAttributeIds.push(attr.id);
					let att = {
						uuid: attr.id,
						qty: 1,
						price: attr.price,
						name: attr.name
					};
					productAttribute.push(att);
				});
				this.resetAttributes();
				console.log(product, "输出列表")
				let postData = [{
					price: product.data.price,
					qty: this.qty,
					product_uuid: product.data.uuid,
					product_name: product.data.name,
					product_attribute_ids: productAttributeIds,
					product_attribute: productAttribute,
					checked: false,
					categoryIds: product.data.product_in_category
				}];
				let data = JSON.stringify(postData);
				// let thet = this
				console.log(data, "购物车信息")
				console.log(token, "打印token")
				//	post(url, token, data, successCallback, errorCallBack) {
				// window.$store.commit('system/COMMIT_NET_WORK_ERROR', false)
				that.isShowLoading = true
				wx.request({
					url: requestUri,
					method: 'POST',
					data: data,
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(res) {

						that.$store.dispatch("cart/GET_DATA_FROM_CLOUD", {});
						// thet.showPositionValue = true;
						that.isShowLoading = false;
						that.CartSuc = true;

						console.log("已加入购物车")

					},
					fail() {}
				})
				// client.post(
				//   requestUri,
				//   token,
				//   data,
				//   s => {
				//     // Toast.clear();
				//     if (s.code === 200) {
				//       this.$store.dispatch("cart/GET_DATA_FROM_CLOUD", {});
				//       this.showPositionValue = true;
				// 			// Toast("已添加购物车");
				// 			console.log("已加入购物车")
				//     }
				//   },
				//   e => {
				//     // Toast.clear();
				//   }
				//);
			}
		}
	};
</script>

<style scoped>
	page {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.goods {
		width: 100%;
		margin-bottom: 50px;
		background: #f5f5f5;
	}

	.banner {
		width: 100%;
		height: 600rpx;
		border-bottom: 1px solid #eee;
	}

	.goods-title {
		font-size: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-align: left;
	}

	.goods-price {
		font-size: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		text-align: left;
		color: red;
	}

	.goods-target-price {
		font-size: 24rpx;
		text-align: left;
		color: #999;
	}

	van-stepper {
		display: flex !important;
	}

	.choose li {
		float: left;
		width: 28%;
		margin-left: 5%;
		font-size: 14px;
		color: black;
	}

	.list_header {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 32rpx;
		color: #333;
		background: #fff;
	}
</style>
