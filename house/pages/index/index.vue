<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :isFirst="true">
				<block slot="backText">
					<image class="first" src="../../static/images/first.png" mode="widthFix" @tap="goFirst"></image>
				</block>
				<block slot="content">购物车</block>
			</cu-custom>
		</view>
		<section>
			<view class="shop" v-for="(v,k) in mylist" :key="k">
				<view class="shop-title">
					<u-checkbox @change="checkboxChange($event,k)" v-model="v.this_all" active-color="#71caf9" :name="v.oname" shape="circle"
					 size="32rpx">{{v.oname}}</u-checkbox>
				</view>
				<view class="shop-list" v-for="(item,index) in v.newlist" :key="index">
					<u-checkbox @change="click_input($event,k,index)" v-model="item.check_one" active-color="#71caf9" :name="item.goods_id" shape="circle" size="32rpx"></u-checkbox>
					<view class="shop-product">
						<image :src="item.picImg"></image>
						<view class="shop-produce">
							<view class="shop-text">{{item.newname}}</view>
							<view class="shop-sku">尺码：{{item.size}} <text style="margin-left: 16rpx;">颜色：{{item.color}}</text></view>
							<view class="shop-price">
								<view class="price">￥{{item.price}}</view>
								<u-number-box v-model="item.count" :min="1" @change="valChange($event,k,index)" @minus="minus(k, index)" @plus="plus(k, index)"></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</section>
		<view class="bottom" v-if="mylist.length > 0">
			<u-checkbox @change="checkAll($event)" v-model="checkall" active-color="#71caf9" name="全选" shape="circle" size="32rpx">全选</u-checkbox>
			<view class="del" v-if="type == 1" @tap="goDel">删除</view>
			<view class="count" v-if="type == 2">
				<view style="color: red;">合计：￥{{total}}</view>
				<view class="btn">结算</view>
			</view>
		</view>
		<u-modal v-model="show" :content="content" :show-cancel-button="true" @confirm='confirm'></u-modal>
		<view class="nothing" v-if="mylist.length == 0">
			<image src="../../static/images/car.png" mode="widthFix"></image>
			<view class="no">购物车空空如也 去逛逛</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '确认要删除购物车商品吗？',
				total: 0,
				type: 1,
				checkall: false,
				mylist: [{
						oname: "森马旗舰店",
						this_all: false,
						newlist: [{
								goods_id: '001',
								newname: "森马 Senma 男靴高帮运动休闲鞋",
								picImg: "https://img13.360buyimg.com/n2/jfs/t22897/257/2401228033/189356/5332dd41/5b7e770fNe20f7a12.jpg",
								count: 1,
								color: "驼色",
								size: "42码",
								check_one: false,
								price: 600
							},
							{
								goods_id: '002',
								newname: "男鞋春季透气潮鞋小白鞋",
								picImg: "https://img12.360buyimg.com/n2/jfs/t1/23261/22/12129/157555/5c9478b2E964ded01/1fe47ea329557def.jpg",
								count: 1,
								color: "白色",
								size: "44码",
								check_one: false,
								price: 200
							}
						]
					},
					{
						oname: "kmall旗舰店",
						this_all: false,
						newlist: [{
							goods_id: '003',
							newname: "美的（Midea）电压力锅 一锅双胆 智能预约 WQC50A1P 5L高压锅（李现推荐）",
							picImg: "https://img14.360buyimg.com/n2/jfs/t1/49691/9/15645/267924/5dc969bbE2fa29873/7326705172a7f25b.jpg",
							count: 1,
							color: "黑色",
							size: "42码",
							check_one: false,
							price: 219
						}, {
							goods_id: '004',
							newname: "美国进口 美达施(Metamucil) 膳食纤维粉香橙味 114次/罐 meta纤维素非蛋白粉非酵素代餐粉代餐饼干",
							picImg: "https://img13.360buyimg.com/n2/jfs/t1/49205/28/1435/122030/5cf2799fE40f4b44f/8c20c14203845786.jpg",
							count: 1,
							color: "红色",
							size: "39码",
							check_one: false,
							price: 140
						}]
					},
					{
						oname: "森马旗舰店",
						this_all: false,
						newlist: [{
								goods_id: '001',
								newname: "森马 Senma 男靴高帮运动休闲鞋",
								picImg: "https://img13.360buyimg.com/n2/jfs/t22897/257/2401228033/189356/5332dd41/5b7e770fNe20f7a12.jpg",
								count: 1,
								color: "驼色",
								size: "42码",
								check_one: false,
								price: 600
							},
							{
								goods_id: '002',
								newname: "男鞋春季透气潮鞋小白鞋",
								picImg: "https://img12.360buyimg.com/n2/jfs/t1/23261/22/12129/157555/5c9478b2E964ded01/1fe47ea329557def.jpg",
								count: 1,
								color: "白色",
								size: "44码",
								check_one: false,
								price: 200
							}
						]
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			goFirst() {
				if (this.type == 1) {
					this.type = 2
				} else {
					this.type = 1
				}
			},
			valChange(e, i, j) {
				this.mylist[i].newlist[j].count = e.value
				this.money()
			},
			allChoice() {
				let self = this
				let list = self.mylist.filter(item2 => {
					return item2.this_all == true
				})
				list.length == self.mylist.length ? (self.checkall = true) : (self.checkall = false)
				this.money()
			},
			checkboxChange(e, i) {
				let self = this
				self.mylist[i].this_all = e.value
				self.mylist[i].newlist.forEach(item1 => {
					item1.check_one = e.value
				})
				self.allChoice()
			},
			click_input(e, i, j) {
				let self = this;
				self.mylist[i].newlist[j].check_one = e.value
				let checklist = self.mylist[i].newlist.filter(item1 => {
					return item1.check_one == true
				})
				checklist.length == self.mylist[i].newlist.length ? (self.mylist[i].this_all = true) : (self.mylist[i].this_all =
					false)
				self.allChoice()
			},
			checkAll(e) {
				let self = this
				self.mylist.forEach(item1 => {
					item1.this_all = e.value
					item1.newlist.forEach(item2 => {
						item2.check_one = e.value
					})
				})
				this.money()
			},
			goDel() {
				this.show = true
			},
			confirm() {
				let self = this
				let newList = []
				self.mylist.forEach(item1 => {
					if (!item1.this_all) {
						item1.newlist.forEach((item2, idx) => {
							if (item2.check_one) {
								item1.newlist.splice(idx, 1)
							}
						})
						newList.push(item1)
					}
				})
				self.mylist = newList
				this.money()
			},
			minus(i, j) {
				if (this.mylist[i].newlist[j].count > 1) {
					this.mylist[i].newlist[j].count--
					this.money()
				}
			},
			plus(i, j) {
				this.mylist[i].newlist[j].count++
				this.money()
			},
			money() {
				let self = this
				this.total = 0
				self.mylist.forEach(item1 => {
					item1.newlist.forEach(item2 => {
						if (item2.check_one == true) {
							self.total += item2.price * item2.count
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.nothing {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 15%;

			image {
				width: 15%;
			}

			.no {
				margin-top: 30rpx;
				width: 100%;
				text-align: center;
				font-size: 30rpx;
				color: red;
			}
		}

		.fixed {
			width: 100%;

			.first {
				width: 34rpx;
			}
		}

		section {
			width: 100%;
			padding: 0 28rpx 120rpx;
			box-sizing: border-box;

			.shop {
				width: 100%;
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid #eee;
				padding: 28rpx 0;


				.shop-title {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;
				}

				.shop-list {
					width: 100%;
					display: flex;
					align-items: center;

					.shop-product {
						width: 85%;
						display: flex;
						align-items: center;
						margin-top: 30rpx;

						image {
							width: 150rpx;
							height: 150rpx;
							border-radius: 4px;
						}

						.shop-produce {
							width: 75%;
							height: 150rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							padding-left: 24rpx;
							box-sizing: border-box;

							.shop-text {
								width: 100%;
								font-size: 28rpx;
								color: #333;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.shop-sku {
								font-size: 28rpx;
								color: #999;
							}

							.shop-price {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.price {
									font-size: 28rpx;
									color: red;
								}
							}
						}
					}
				}
			}

			.shop:last-child {
				border-bottom: none;
			}
		}

		.bottom {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 28rpx;
			box-sizing: border-box;
			border-top: 1px solid #eee;
			background: #FFFFFF;
			z-index: 999999;

			.del {
				width: 180rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 28rpx;
				color: #FFFFFF;
				border-radius: 30px;
				background: #71caf9;
			}

			.count {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;

				.btn {
					width: 180rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 28rpx;
					color: #FFFFFF;
					border-radius: 30px;
					background: #71caf9;
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
