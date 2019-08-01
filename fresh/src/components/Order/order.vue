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
		<div class="go_shop" v-for="(item , index) in shopList" :key="index" v-if="item.items.length!=0">
			<h3>{{item.title}}</h3>
			<ul>
				<li v-for="(v,k) in item.items" :key="k" v-if="v.check==true">
					<img v-lazy="v.url" alt />
					<div class="lis_right">
						<div class="lis_detail">
							<span>{{v.name}}</span>
							<span>X {{v.number}}</span>
							<span>{{v.new}}</span>
						</div>
						<div class="lis_key">规格：{{v.kg}}</div>
					</div>
				</li>
			</ul>
			<ul v-for="(v,k) in item.items" :key="k">
				<li v-for="(x,y) in freight" :key="y" v-if="x.id==v.id">
					<span>配送费:</span>
					<div class="lufei">
						<span v-if="x.prc!==0">￥{{x.prc}}</span>
						<span v-else>￥{{x.prc}}.00</span>
					</div>
				</li>
			</ul>
			<div class="msg">
				<div class="user_coupon">
					<span>优惠券:</span>
					<div class="c_coupon" @click="youhui(item.id,item.title,item.items)" v-if="sid==item.id">
						<span>{{amount}}</span>
						<img src="../../../static/img/gengduo3.png" alt />
					</div>
					<div class="c_coupon" @click="youhui(item.id,item.title,item.items)" v-else>
						<span>请选择使用优惠券</span>
						<img src="../../../static/img/gengduo3.png" alt />
					</div>
				</div>
				<div class="beizhu">
					<h3>备注说明:</h3>
					<textarea placeholder="请输入告诉我们您的其他要求" @blur="textss" v-model="texts"></textarea>
				</div>
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
				<span style="color:red">￥{{(total+lu).toFixed(2)}}</span>
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
				text: "提交订单",
				guizhe: require("../../../static/img/guize.png"),
				shopList: [],
				addcity: {}, //默认地址
				freight: [], //配送费
				amount: 0.0, //优惠券金额
				youID: "",
				sid: "",
				add: "",
				bill: "",
				billyin: true,
				addchu: false,
				texts: "",
				donghua: false
			};
		},
		components: {
			MainHeader
		},
		created() {
			this.cid = JSON.parse(localStorage.getItem("user")).cid;
			this.Invoice = JSON.parse(localStorage.getItem("Invoice"));

			if (this.$router.history.current.params.car == undefined) {
				this.shopList = JSON.parse(localStorage.getItem("gocart"));
			} else {
				this.shopList = this.$router.history.current.params.car;
			}

			localStorage.setItem("gocart", JSON.stringify(this.shopList));

			if (this.$router.history.current.params.addresslist !== undefined) {
				this.add = JSON.parse(localStorage.getItem("add"));
				this.addcity = this.$router.history.current.params.addresslist;
				for (let a in this.shopList) {
					console.log(this.shopList[a]);
					if (this.shopList[a].items.length != 0) {
						this.getUserFreight(this.add, this.shopList[a].items[0].id); //调取配送费
					}
				}
			} else {
				this.defaultAddress(this.cid); //调取默认地址
			}

			if (JSON.parse(localStorage.getItem("nr")) != undefined) {
				this.texts = JSON.parse(localStorage.getItem("nr"));
			}

			if (JSON.parse(localStorage.getItem("you")) != undefined) {
				this.amount = JSON.parse(localStorage.getItem("you")).num;
				this.youID = JSON.parse(localStorage.getItem("you")).id;
				this.sid = JSON.parse(localStorage.getItem("you")).sid;
			} else {
				this.youxiu();
			}

			this.bill = JSON.parse(localStorage.getItem("bill"));
			if (this.bill != undefined) {
				this.billyin = true;
			} else {
				this.billyin = false;
			}
			for (let i = 0; i < this.shopList.length; i++) {
				this.shopList[i].items = this.shopList[i].items.filter(function(item) {
					return item.check;
				});
			}
		},
		computed: {
			total() {
				let count = 0;
				for (let i = 0; i < this.shopList.length; i++) {
					for (let j = 0; j < this.shopList[i].items.length; j++) {
						if ((this.shopList[i].items[j].check = true)) {
							// if (this.shopList[i].id == this.sid) {
							count +=
								Number(this.shopList[i].items[j].new) *
								Number(this.shopList[i].items[j].number);
							// }
							// count +=
							//   Number(this.shopList[i].items[j].new) *
							//   Number(this.shopList[i].items[j].number);
						}
					}
				}
				count = count - Number(this.amount);
				count = Math.floor(count * 100) / 100;
				if (count < 0) {
					count = 0.01;
				}
				return count;
			},
			lu() {
				let countlu = 0;
				for (let i = 0; i < this.freight.length; i++) {
					countlu += Number(this.freight[i].prc);
				}
				return countlu;
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
					self.$router.push("/cart");
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
				localStorage.removeItem("nr");
				localStorage.removeItem("bill");
				localStorage.removeItem("you");
				localStorage.removeItem("gocart");
				this.$router.push("/cart");
			},
			goBill() {
				this.$router.push("/bill");
			},
			youxiu() {
				let addjia = 0;
				for (let i in this.shopList) {
					console.log(this.shopList[i]);
					for (let x in this.shopList[i].items) {
						if (this.shopList[i].items[x].check == true) {
							console.log(
								this.shopList[i].items[x].number * this.shopList[i].items[x].new,
								"+++"
							);
							if (this.shopList[i].items.length > 1) {
								addjia +=
									this.shopList[i].items[x].number *
									this.shopList[i].items[x].new;
							} else {
								addjia =
									this.shopList[i].items[x].number *
									this.shopList[i].items[x].new;
							}
						}
					}
					let datas = {
						cmd: "myCoupon",
						cid: this.cid,
						sid: this.shopList[i].id,
						pageNow: 1
					};
					Request.postRequest(datas)
						.then(res => {
							if (res.data.result == 0) {
								let arrcon = [];
								for (let y in res.data.dataList) {
									if (res.data.dataList[y].miniPurchase <= addjia) {
										arrcon.push(res.data.dataList[y]);
										this.sid = this.shopList[i].id;
									}
								}
								// console.log(arrcon);
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
										}
									}
								} else if (arrcon.length == 1) {
									this.amount = arrcon[0].amount;
									this.youID = arrcon[0].id;
								}
							}
						})
						.catch(res => {});
				}
			},
			shouhuo() {
				this.$router.push("/addressyi");
			},
			youhui(id, name, item) {
				console.log(id);
				this.$router.push({
					name: "couponlin",
					params: {
						id: id,
						name: name,
						item: item
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
							for (let a in this.shopList) {
								console.log(this.shopList[a]);
								if (this.shopList[a].items.length != 0) {
									this.getUserFreight(this.add, this.shopList[a].items[0].id); //调取配送费
								}
							}
						} else if (res.data.result == "2") {
							this.$router.push("/fenghao");
						} else {
							this.addchu = true;
						}
					})
					.catch(res => {});
			},
			getUserFreight(addID, carID) {
				this.donghua = true;
				console.log(carID);
				let aid = [];
				aid.push(carID);
				let getUserFreight = {
					cmd: "getUserFreight",
					receiverId: this.add,
					cartId: aid
				};
				console.log(getUserFreight);
				Request.postRequest(getUserFreight)
					.then(res => {
						console.log(res.data);
						this.donghua = false;
						if (res.data.result == "0") {
							let xin = [];
							let lufei = [];
							let fre = {};
							fre.id = carID;
							console.log("配送费" + res.data.freight);
							fre.prc = Math.floor(res.data.freight * 100) / 100;
							this.freight.push(fre);
							console.log(this.freight);
						}
					})
					.catch(res => {});
			},
			order() {
				if (this.addchu == true) {
					Toast("请添加收货地址");
				} else {
					let shopall = [];
					for (let a in this.shopList) {
						if (this.shopList[a].items.length != 0) {
							let prices = 0;
							let you = 0;
							let shopgoods = [];
							for (let ai in this.shopList[a].items) {
								prices +=
									Number(this.shopList[a].items[ai].new) *
									Number(this.shopList[a].items[ai].number);
								let shopgood = {};
								console.log(this.shopList[a].items[ai]);
								shopgood.gid = this.shopList[a].items[ai].gid;
								shopgood.gnum = this.shopList[a].items[ai].number;
								shopgood.skuId = this.shopList[a].items[ai].skuid;
								shopgood.gprice = Number(this.shopList[a].items[ai].new);
								shopgoods.push(shopgood);
								for (let i in this.freight) {
									if (this.shopList[a].items[ai].id == this.freight[i].id)
										you = this.freight[i].prc;
								}
							}
							let shopa = {};
							let goodt = [];
							let myprc = 0;
							let lufei = 0;
							shopa.shop = this.shopList[a].id;
							if (this.shopList[a].id !== this.sid) {
								shopa.pid = "";
								shopa.fee = "";
								myprc = prices;
							} else {
								shopa.pid = this.youID;
								shopa.fee = this.amount;
								if (prices - this.amount < 0) {
									myprc = 0.01;
								} else {
									myprc = prices - this.amount;
								}
							}

							shopa.invoice = this.Invoice;
							shopa.remark = this.texts;
							shopa.price = prices;
							for (let ai in this.shopList[a].items) {
								for (let i in this.freight) {
									if (this.shopList[a].items[ai].id == this.freight[i].id) {
										lufei = this.freight[i].prc;
									}
									shopa.shippingFee = lufei;
								}
							}
							shopa.amount = myprc + shopa.shippingFee;
							goodt.push(shopgoods);
							shopa.goods = goodt[0];
							shopall.push(shopa);
						}
					}
					let objsh = {
						cmd: "orderSubmit",
						cid: this.cid,
						aid: this.addcity.id,
						totalFee: (this.total + this.lu).toFixed(2),
						orders: shopall
					};
					console.log(objsh);
					Request.postRequest(objsh)
						.then(res => {
							console.log(res.data);
							if (res.data.result == 0) {
								console.log(res.data.bigOrderId);
								localStorage.removeItem("Invoice");
								localStorage.removeItem("you");
								localStorage.removeItem("bill");
								localStorage.removeItem("gocart");
								localStorage.removeItem("nr");
								this.$router.push({
									path: "/pay",
									query: {
										ID: res.data.bigOrderId,
										prc: (this.total + this.lu).toFixed(2)
									}
								});
							} else if (res.data.result == "2") {
								this.$router.push("/fenghao");
							} else {
								Toast(res.data.resultNote);
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
				position: relative;

				.lufei {
					position: absolute;
					right: 0;
				}

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
