<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">维修详情</block>
			</cu-custom>
		</view>
		<view class="box">
			<view class="first">
				<view class="head">
					<view class="titles">滤芯保养</view>
					<view class="service" @tap="add1">添加服务</view>
				</view>
				<view class="list">
					<view class="item" v-for="(v,k) in itemList" :key="k">
						<view style="width: 65%;">{{v.value}}</view>
						<view class="item-price">
							<!-- <view>￥{{v.total}}</view> -->
							<view class="close" @tap="del(k)">X</view>
						</view>
					</view>
				</view>
			</view>
			<view class="first">
				<view class="head">
					<view class="titles">故障维修</view>
					<view class="service" @tap="add2">添加服务</view>
				</view>
				<view class="list">
					<view class="item" v-for="(v,k) in itemList1" :key="k">
						<view style="width: 65%;">{{v.value}}</view>
						<view class="item-price">
							<!-- <view>￥{{v.total}}</view> -->
							<view class="close" @tap="del1(k)">X</view>
						</view>
					</view>
				</view>
			</view>
			<view class="first" style="padding: 24upx;">
				<view class="list">
					<view class="items">
						<view class="coupon">优惠：</view>
						<view class="mount">
							<!-- <view class="mount-list" style="margin-bottom: 16upx;" v-for="(v,k) in coupons" :key="k">
								<view style="margin-right: 24upx;">满{{v.count}}个</view>
								<view>打{{v.discount}}折</view>
							</view> -->
							满2个第二个服务费打5折，满3个第三个服务费打3折，满4个以上服务费打2折
						</view>
					</view>
				</view>
			</view>
			<view class="first" v-if="itemList2.length > 0">
				<view class="head">
					<view class="titles">滤芯保养</view>
				</view>
				<view class="list">
					<view class="item" v-for="(v,k) in itemList2" :key="k">
						<view style="width: 65%;">{{v.name}}</view>
						<view class="item-price">
							<!-- <view>￥{{v.totalCost}}</view> -->
						</view>
					</view>
				</view>
			</view>
			<view class="first" v-if="itemList3.length > 0">
				<view class="head">
					<view class="titles">故障维修</view>
				</view>
				<view class="list">
					<view class="item" v-for="(v,k) in itemList3" :key="k">
						<view style="width: 65%;">{{v.name}}</view>
						<view class="item-price">
							<!-- <view>￥{{v.totalCost}}</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="save">
			<view>维修费：￥{{total}}</view>
			<view class="saveBtn" @tap="goSave">保存</view>
		</view>
		<view class="dialog" v-if="show1">
			<view class="dialog-box">
				<view class="dialog-title">滤芯保养</view>
				<view class="dialog-search">
					<xfl-select style="width: 100%;" :list="list" :showItemNum="5" :isCanInput="false" :style_Container="listBoxStyle"
					 :placeholder="'请选择'" @change='visibleChange'>
					</xfl-select>
				</view>
				<view class="dialog-btn">
					<view class="btns" style="background: #83bfff;" @tap="goCancel">取消</view>
					<view class="btns" @tap="goSure">确定</view>
				</view>
			</view>
		</view>
		<view class="dialog" v-if="show2">
			<view class="dialog-box">
				<view class="dialog-title">故障维修</view>
				<view class="dialog-search">
					<xfl-select style="width: 100%;" :list="list1" :showItemNum="5" :isCanInput="false" :style_Container="listBoxStyle"
					 :placeholder="'请选择'" @change='visibleChange1'>
					</xfl-select>
				</view>
				<view class="dialog-search" style="margin-top: 0;">
					<xfl-select ref="select" style="width: 100%;" :list="list2" :showItemNum="5" :isCanInput="false" :style_Container="listBoxStyle"
					 :placeholder="'请选择'" @change='visibleChange2'>
					</xfl-select>
				</view>
				<view class="dialog-btn">
					<view class="btns" style="background: #83bfff;" @tap="goCancel1">取消</view>
					<view class="btns" @tap="goSure1">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import xflSelect from '../../components/xfl-select/xfl-select.vue'
	export default {
		data() {
			return {
				Color: '#333',
				listBoxStyle: `width: 100%; height: 40px; font-size: 14px;overfloor: hidden;`,
				list: [],
				itemList: [],
				itemList1: [],
				itemList2: [],
				itemList3: [],
				items: {},
				items1: {},
				items2: {},
				show1: false,
				show2: false,
				list1: [],
				list2: [],
				ids: '',
				orderId: '',
				coupons: [],
				price: 0
			}
		},
		components: {
			xflSelect
		},
		onLoad(option) {
			this.ids = option.id
			this.orderId = option.orderId
			this.init(option.id)
		},
		computed: {
			total() {
				let price = 0
				let arr = []
				if (this.itemList.length > 0) {
					for (let i = 0; i < this.itemList.length; i++) {
						arr.push(this.itemList[i])
					}
				}

				if (this.itemList1.length > 0) {
					for (let i = 0; i < this.itemList1.length; i++) {
						arr.push(this.itemList1[i])
					}
				}

				if (arr.length == 1) {
					price = arr[0].total
				} else if (arr.length == 2) {
					price += arr[0].total
					price += arr[1].cost * 0.5 + arr[1].price
				} else if (arr.length == 3) {
					price += arr[0].total
					price += arr[1].cost * 0.5 + arr[1].price
					price += arr[2].cost * 0.3 + arr[2].price
				} else if (arr.length >= 4) {
					price += arr[0].total
					price += arr[1].cost * 0.5 + arr[1].price
					price += arr[2].cost * 0.3 + arr[2].price
					for (let i = 3; i < arr.length; i++) {
						price += arr[i].cost * 0.2 + arr[i].price
					}
				}
				price = price.toFixed(2)
				return price
			}
		},
		methods: {
			init(id) {
				let self = this
				//获取保养类型列表
				let data1 = {
					mid: uni.getStorageSync('uid'),
					typeId: id,
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/maintain/list',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								res.data.body.list.forEach((item, index) => {
									self.list.push({
										value: item.name,
										id: item.id,
										price: item.part.price,
										cost: item.cost,
										total: item.totalCost
									})
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})

				//故障二级分类列表
				let data2 = {
					mid: uni.getStorageSync('uid'),
					typeId: id,
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/faulttype/list',
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								res.data.body.list.forEach((item, index) => {
									self.list1.push({
										value: item.name,
										id: item.id
									})
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})

				//获取满减优惠
				let data3 = {
					mid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/discount/list',
						data: data3,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.coupons = res.data.body.list
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
				
				//获取已选配件
				let data4 = {
					mid: uni.getStorageSync('uid'),
					orderId: this.orderId
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/repair/list',
						data: data4,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.itemList2 = res.data.body.maintainList
								self.itemList3 = res.data.body.faultList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			visibleChange(e) { // 列表框的显示隐藏事件
				this.items = e.orignItem
			},
			add1() {
				this.show1 = true
			},
			add2() {
				this.show2 = true
			},
			goSure() {
				this.show1 = false
				this.itemList.push(this.items)
				let obj = {}
				this.itemList = this.itemList.reduce((cur, next) => {
					obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
					return cur;
				}, []) //设置cur默认类型为数组，并且初始值为空的数组
			},
			goCancel() {
				this.show1 = false
			},
			del(k) {
				this.itemList.splice(k, 1)
			},
			del1(k) {
				this.itemList1.splice(k, 1)
			},
			visibleChange1(e) {
				this.items1 = e.orignItem
				this.$refs.select.onClear()
				this.getType(e.orignItem.id)
			},
			getType(id) {
				//故障三级分类列表
				let self = this
				self.list2 = []
				let data2 = {
					mid: uni.getStorageSync('uid'),
					typeId: this.ids,
					faultTypeId: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/faultitem/list',
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								res.data.body.list.forEach((item, index) => {
									self.list2.push({
										value: item.name,
										id: item.id,
										price: item.part.price,
										cost: item.cost,
										total: item.totalCost
									})
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			visibleChange2(e) {
				this.items2 = e.orignItem
			},
			goCancel1() {
				this.show2 = false
				this.list2 = []
			},
			goSure1() {
				this.show2 = false
				this.list2 = []
				this.items2.value = this.items1.value + '-' + this.items2.value
				this.itemList1.push(this.items2)
				let obj = {}
				this.itemList1 = this.itemList1.reduce((cur, next) => {
					obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
					return cur;
				}, []) //设置cur默认类型为数组，并且初始值为空的数组
			},
			goSave() {
				if (this.total == 0) {
					Toast.showToast('请选择保养类型')
					return
				}

				let self = this
				let arr1 = []
				this.itemList.forEach((item, index) => {
					arr1.push(item.id)
				})

				let arr2 = []
				this.itemList1.forEach((item, index) => {
					arr2.push(item.id)
				})

				let data2 = {
					mid: uni.getStorageSync('uid'),
					orderId: this.orderId,
					maintainIds: arr1.join(','),
					faultIds: arr2.join(',')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/repair/save',
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								Toast.showToast('保存成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
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
		background: #f6f6f6;

		.dialog {
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .5);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99999;
			display: flex;
			justify-content: center;
			align-items: center;

			.dialog-box {
				width: 90%;
				padding: 30upx 42upx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				display: flex;
				flex-direction: column;

				.dialog-title {
					width: 100%;
					text-align: center;
					font-size: 30upx;
					color: #333;
				}

				.dialog-search {
					width: 100%;
					height: 80upx;
					// padding: 0 24upx;
					// box-sizing: border-box;
					background: #f6f6f6;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;
					color: #666;
					margin: 70upx 0;

					img {
						width: 30upx;
						height: 20upx;
					}
				}

				.dialog-btn {
					width: 100%;
					border-top: 1px solid #eee;
					padding-top: 40upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.btns {
						width: 35%;
						height: 70upx;
						line-height: 70upx;
						text-align: center;
						font-size: 30upx;
						color: #fff;
						border-radius: 4px;
						background: #007bff;
					}
				}
			}
		}

		.save {
			width: 100%;
			height: 100upx;
			background: #fff;
			padding: 0 0 0 24upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: #333;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;

			.saveBtn {
				width: 40%;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				background: #007bff;
				font-size: 30upx;
				color: #fff;
			}
		}

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			background: #f6f6f6;
			padding: 24upx 24upx 120upx 24upx;
			box-sizing: border-box;

			.first {
				width: 100%;
				padding: 0 24upx 30upx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				display: flex;
				flex-direction: column;
				margin-bottom: 30upx;

				.head {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;

					.titles {
						height: 100upx;
						line-height: 100upx;
						font-size: 30upx;
						color: #333;
						padding-left: 24upx;
						position: relative;
					}

					.titles::before {
						content: '';
						width: 4px;
						height: 24upx;
						background: #007bff;
						border-radius: 30upx;
						position: absolute;
						top: 38upx;
						left: 0;
						z-index: 999;
					}

					.service {
						color: #0e4ca0;
					}
				}

				.list {
					width: 100%;
					padding: 0 0 0 24upx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;

					.item {
						width: 100%;
						padding: 20upx 0;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28upx;
						color: #666;
						border-bottom: 1px solid #eee;

						.item-price {
							display: flex;
							align-items: center;
							color: #333;

							.close {
								width: 36upx;
								height: 36upx;
								line-height: 36upx;
								border-radius: 50%;
								background: #f55555;
								text-align: center;
								font-size: 20upx;
								color: #fff;
								margin-left: 30upx;
							}
						}
					}

					.item:last-child {
						border-bottom: none;
					}

					.items {
						width: 100%;
						display: flex;
						padding: 0;
						justify-content: space-between;
						font-size: 28upx;
						color: #333;

						.coupon {
							color: #333;
						}

						.mount {
							width: 85%;
							color: #0e4ca0;
							display: flex;
							flex-direction: column;

							.mount-list {
								display: flex;
								align-items: center;
							}

							.mount-list:last-child {
								margin-bottom: 0 !important;
							}
						}
					}
				}
			}
		}
	}
</style>
