<template>
	<div class="contain">
		<van-popup v-model="donghua" :close-on-click-overlay="false">
			<div class="lunhui">
				<van-loading type="spinner" color="#808080" />
				<p style="color:#808080">数据加载中...</p>
			</div>
		</van-popup>
		<main-header :text="text" :image="guizhe" @back="back" @map="guilai"></main-header>
		<div class="box">
			<h3>收货人信息</h3>
			<div class="user_box" @click="shouhuo" v-if="addchu==false">
				<div class="user_left">
					<p>{{addcity.province}}{{addcity.city}}{{addcity.town}}{{addcity.addr}}</p>
					<div class="user_name">
						<span>{{addcity.receiverName}}</span>
						<span style="margin-left: 0.4rem;">{{addcity.mobile}}</span>
					</div>
				</div>
				<img src="../../../static/img/gengduo3.png" alt />
			</div>
			<div v-else class="user_box" @click="shouhuo" style="lineHeight:70px">
				<div class="user_left">去选择收货地址</div>
				<img src="../../../static/img/gengduo3.png" alt />
			</div>
		</div>
		<div class="go_shop">
			<h3>{{this.shopList[0].sname}}</h3>
			<ul>
				<li>
					<img v-lazy="this.shopList[1].images" alt />
					<div class="lis_right">
						<div class="lis_detail">
							<span>{{this.shopList[1].name}}</span>
							<span>X {{this.shopList[1].number}}</span>
							<span>{{this.shopList[1].price}}</span>
						</div>
						<div class="lis_key">规格：{{this.shopList[1].skuname}}</div>
					</div>
				</li>
			</ul>
			<ul>
				<li style="margin-top: 0.5rem">
					<span>配送费:</span>
					<span v-if="freight!==0">￥{{freight}}</span>
					<span v-else>￥{{freight}}.00</span>
				</li>
			</ul>
		</div>
		<div class="msg">
			<div class="user_coupon">
				<span>优惠券:</span>
				<div class="c_coupon" @click="youhui">
					<span v-if="youhuis==false">请选择使用优惠券</span>
					<span v-else>{{amount}}</span>
					<img src="../../../static/img/gengduo3.png" alt />
				</div>
			</div>
			<div class="beizhu">
				<h3>备注说明:</h3>
				<textarea placeholder="请输入告诉我们您的其他要求" @blur="textss" v-model="texts"></textarea>
			</div>
		</div>
		<div class="card msg" @click="goBill">
			<div class="user_coupon" style="border: none">
				<span>是否要发票:</span>
				<div class="c_coupon">
					<span v-if="billyin==false">请选择</span>
					<span v-else>{{bill}}</span>
					<img src="../../../static/img/gengduo3.png" alt />
				</div>
			</div>
		</div>
		<div class="count">
			<div class="count_left">
				价格：
				<span style="color:red">￥{{(total+Number(this.freight)).toFixed(2)}}</span>
			</div>
			<div class="count_right" @click="order">结算</div>
		</div>
	</div>
</template>

<script>
	import MainHeader from "@/components/component/mainHeader";
	import Request from "@/common/js/request";
	import {
		Toast,
		Loading,
		Popup
	} from "vant";
	export default {
		data() {
			return {
				guizhe: require("../../../static/img/guize.png"),
				text: "提交订单",
				shopList: [],
				addcity: {}, //默认地址
				freight: 0.0, //配送费
				amount: 0, //优惠券金额
				youID: "",
				add: "",
				bill: "",
				billyin: true,
				addchu: false,
				youhuis: false,
				texts: "",
				donghua: false
			};
		},
		components: {
			MainHeader
		},
		created() {
			this.cid = JSON.parse(localStorage.getItem("user")).cid;

			this.Torders = JSON.parse(localStorage.getItem("Torders"));

			this.Invoice = JSON.parse(localStorage.getItem("Invoice"));

			this.shopList = JSON.parse(localStorage.getItem("gocart"));

			if (this.$router.history.current.params.addresslist !== undefined) {
				this.add = JSON.parse(localStorage.getItem("add"));
				this.addcity = this.$router.history.current.params.addresslist;
				this.getUserFreight(
					this.add,
					this.shopList[1].id,
					this.shopList[1].skuID,
					this.shopList[1].number
				); //调取配送费
			} else {
				this.defaultAddress(this.cid); //调取默认地址
			}

			if (JSON.parse(localStorage.getItem("nr")) != undefined) {
				this.texts = JSON.parse(localStorage.getItem("nr"));
			}

			this.bill = JSON.parse(localStorage.getItem("bill"));
			if (this.bill != undefined) {
				this.billyin = true;
			} else {
				this.billyin = false;
			}

			if (JSON.parse(localStorage.getItem("you")) != undefined) {
				this.amount = JSON.parse(localStorage.getItem("you")).num;
				this.youID = JSON.parse(localStorage.getItem("you")).id;
				this.youhuis = true;
			} else {
				this.youhuis = false;
				this.youxiu();
			}
		},
		computed: {
			total() {
				let count = 0;
				let counts = 0;
				count +=
					Number(this.shopList[1].price) * Number(this.shopList[1].number) -
					Number(this.amount);
				if (count < 0) {
					counts = 0.01;
				} else {
					counts = count;
				}
				return counts;
			}
		},
		mounted() {
			var first = null;
			let self = this;
			mui.back = function() {
				if (!first) {
					localStorage.removeItem("Invoice");
					localStorage.removeItem("nr");
					localStorage.removeItem("bill");
					localStorage.removeItem("you");
					localStorage.removeItem("gocart");
					// self.$router.push("/" + self.Torders);
					localStorage.removeItem("Torders");
					self.$router.push({
						name: self.Torders,
						params: {
							id: self.shopList[1].id
						}
					});
					first = new Date().getTime();
					setTimeout(function() {
						first = null;
					}, 1000);
				} else {
					if (new Date().getTime() - first < 1000) {
						plus.runtime.quit();
					}
				}
			};
		},
		methods: {
			guilai() {
				this.$router.push("/fei");
				localStorage.setItem("FUWEN", JSON.stringify("guize"));
			},
			back() {
				localStorage.removeItem("Invoice");
				localStorage.removeItem("bill");
				localStorage.removeItem("you");
				localStorage.removeItem("gocart");
				localStorage.removeItem("nr");
				// this.$router.push("/" + this.Torders);
				localStorage.removeItem("Torders");
				this.$router.push({
					name: this.Torders,
					params: {
						id: this.shopList[1].id
					}
				});
			},
			goBill() {
				this.$router.push("/bill");
			},
			youxiu() {
				let addjia = 0;
				addjia = this.shopList[1].number * this.shopList[1].price;
				let datas = {
					cmd: "myCoupon",
					cid: this.cid,
					sid: this.shopList[0].sid,
					pageNow: 1
				};
				Request.postRequest(datas)
					.then(res => {
						if (res.data.result == 0) {
							let arrcon = [];
							for (let x in res.data.dataList) {
								if (res.data.dataList[x].miniPurchase <= addjia) {
									arrcon.push(res.data.dataList[x]);
								}
							}
							if (arrcon.length >= 2) {
								for (let h = 0; h < arrcon.length - 1; h++) {
									for (var j = 0; j < arrcon.length - h - 1; j++) {
										if (arrcon[j + 1].amount > arrcon[j].amount) {
											var hand = arrcon[j + 1].amount;
											arrcon[j + 1].amount = arrcon[j].amount;
											arrcon[j].amount = hand;
										}
										this.amount = arrcon[0].amount;
										this.youID = arrcon[0].id;
										this.youhuis = true;
									}
								}
							} else if (arrcon.length == 1) {
								this.amount = arrcon[0].amount;
								this.youID = arrcon[0].id;
								this.youhuis = true;
							}
						}
					})
					.catch(res => {});
			},
			shouhuo() {
				this.$router.push("/addresser");
			},
			youhui() {
				this.$router.push({
					name: "couponlin1",
					params: {
						car: this.shopList
					}
				});
			},
			textss(e) {
				this.texts = e.target.value;
				localStorage.setItem("nr", JSON.stringify(this.texts)); //备注
			},
			defaultAddress(id) {
				let defaultAddress = {
					cmd: "defaultAddress",
					cid: id
				};
				Request.postRequest(defaultAddress)
					.then(res => {
						console.log(res.data);
						if (res.data.result == 0) {
							this.addchu = false;
							this.addcity = res.data;
							this.add = res.data.id;
							localStorage.setItem("add", JSON.stringify(this.add));
							this.getUserFreight(
								this.add,
								this.shopList[1].id,
								this.shopList[1].skuID,
								this.shopList[1].number
							); //调取配送费
						} else if (res.data.result == "2") {
							this.$router.push("/fenghao");
						} else {
							this.addchu = true;
						}
					})
					.catch(res => {});
			},
			getUserFreight(addID, shopID, skuId, count) {
				this.donghua = true;
				let getUserFreight = {
					cmd: "getUserFreight",
					receiverId: addID,
					productId: shopID,
					skuId: skuId,
					count: count
				};
				console.log(getUserFreight);
				Request.postRequest(getUserFreight)
					.then(res => {
						this.donghua = false;
						if (res.data.result == "0") {
							console.log("配送费" + res.data.freight);
							this.freight = Math.floor(res.data.freight * 100) / 100;
						}
					})
					.catch(res => {});
			},
			order() {
				if (this.addchu == true) {
					Toast("请添加收货地址");
				} else {
					let shopa = {};
					let prices = 0;
					shopa.productId = this.shopList[1].id;
					shopa.count = this.shopList[1].number;
					shopa.skuId = this.shopList[1].skuID;
					shopa.gprice = this.shopList[1].price;
					prices = Number(this.shopList[1].number) * Number(this.shopList[1].price);
					shopa.couponId = this.youID;
					shopa.money = this.amount;
					shopa.invoiceId = this.Invoice;
					shopa.amount = (this.total + Number(this.freight)).toFixed(2);
					shopa.price = prices;
					shopa.fee = this.freight;
					shopa.remark = this.texts;
					let objsh = {
						cmd: "addOrder",
						uid: this.cid,
						receiverId: this.addcity.id,
						productId: shopa.productId,
						skuId: shopa.skuId,
						count: shopa.count,
						price: shopa.price,
						money: shopa.money,
						fee: shopa.fee,
						amount: shopa.amount,
						couponId: shopa.couponId,
						invoiceId: shopa.invoiceId,
						remark: shopa.remark
					};
					console.log(objsh);
					Request.postRequest(objsh)
						.then(res => {
							console.log(res.data);
							if (res.data.result == 0) {
								console.log(res.data.orderId);
								localStorage.removeItem("Invoice");
								localStorage.removeItem("you");
								localStorage.removeItem("bill");
								localStorage.removeItem("gocart");
								localStorage.removeItem("nr");
								this.$router.push({
									path: "/pay",
									query: {
										ID: res.data.orderId,
										prc: (this.total + Number(this.freight)).toFixed(2)
									}
								});
							} else if (res.data.result == "2") {
								this.$router.push("/fenghao");
							}
						})
						.catch(res => {});
				}
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.contain {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 72px 0.4rem 0;
		box-sizing: border-box;
		border-top: 1px solid #eee;

		h3 {
			width: 100%;
			height: 0.8rem;
			line-height: 0.8rem;
			font-size: 14px;
			color: #333;
			border-bottom: 1px solid #eee;
		}

		.user_box {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.user_left {
				width: 80%;
				display: flex;
				flex-direction: column;
				font-size: 14px;
				color: #333;

				p {
					width: 100%;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					font-weight: 700;
					font-size: 16px;
					-webkit-box-orient: vertical;
					line-height: 20px;
					padding-top: 0.3rem;
				}

				.user_name {
					width: 100%;
					display: flex;
					align-items: center;
					padding: 0.3rem 0;
				}
			}

			img {
				width: 0.3rem;
				height: 0.4rem;
			}
		}
	}

	.go_shop {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 0.4rem;
		box-sizing: border-box;
		border-top: 10px solid #f5f5f5;
		border-bottom: 10px solid #f5f5f5;

		// margin-top: 0.5rem;
		h3 {
			width: 100%;
			height: 0.8rem;
			line-height: 0.8rem;
			font-size: 14px;
			color: #333;
			border-bottom: 1px solid #eee;
		}

		ul {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding-bottom: 0.4rem;

			li {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 0.3rem;
				font-size: 14px;
				color: #333;

				img {
					width: 2rem;
					height: 2rem;
				}

				.lis_right {
					flex: 1;
					height: 2rem;
					padding-left: 0.4rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;

					.lis_detail {
						width: 100%;
						height: 1rem;
						display: flex;
						justify-content: space-between;
						align-items: center;

						span:first-child {
							width: 40%;
							height: 30px;
							line-height: 15px;
							display: block;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}

					.lis_key {
						width: 100%;
						height: 1rem;
						display: flex;
						align-items: center;
						color: #999;
					}
				}
			}
		}
	}

	.msg {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 0.4rem;
		box-sizing: border-box;

		.user_coupon {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1ox solid #eee;
			font-size: 14px;
			color: #333;
			border-bottom: 1px solid #eee;
			padding-bottom: 0.3rem;
			padding-top: 0.5rem;

			.c_coupon {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999;

				img {
					width: 0.3rem;
					height: 0.4rem;
					margin-left: 0.4rem;
				}
			}
		}

		.beizhu {
			width: 100%;
			display: flex;
			flex-direction: column;
			font-size: 14px;
			color: #333;
			padding: 0.4rem 0;

			h3 {
				width: 100%;
			}

			textarea {
				width: 100%;
				height: 3rem;
				padding: 0.4rem 0;
				box-sizing: border-box;
				border: none;
				resize: none;
			}
		}
	}

	.card {
		border-top: 10px solid #eee;
		border-bottom: 10px solid #eee;
		margin-bottom: 50px;
	}

	.count {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 50px;
		background: #fff;
		z-index: 999;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;

		.count_left {
			width: 70%;
			height: 50px;
			line-height: 50px;
			padding: 0 0.4rem;
			box-sizing: border-box;
		}

		.count_right {
			width: 30%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			background: rgb(114, 209, 65);
			color: #fff;
		}
	}
</style>
