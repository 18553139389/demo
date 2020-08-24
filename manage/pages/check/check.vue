<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">筛选</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="nav">
				<view :class="itemIndex == k ? 'nav-item active' : 'nav-item'" v-for="(v,k) in navItem" :key="k" @tap="changeNav(k)">{{v}}</view>
			</view>
			<view class="product">
				<view class="product-title">产品名称</view>
				<scroll-view scroll-y="true" :style="{height: height + 'px'}" v-if="listItem.length > 0">
					<view class="list">
						<view 
							:class="listIndex == k ? 'list-item actives' : 'list-item'" 
							v-for="(v,k) in listItem" :key="k" 
							:style="{marginRight: (k+1)%3 == 0 ? '0' : '5%'}"
							@tap="changeList(k,v.name)">
							{{v.name}}
						</view>
					</view>
				</scroll-view>
				<image class="no" src="../../static/images/no.png" v-if="show"></image>
			</view>
			<view class="bottom">
				<view class="btn1" @tap="goReset">重置</view>
				<view class="btn2" @tap="goSure">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				itemIndex: 0,
				listIndex: -1,
				navItem: ['出库', '入库', '其他'],
				all: [],
				listItem: [],
				height: 0,
				show: false
			}
		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
				success: function(e) {
					console.log(e)
					self.height = e.screenHeight - 120 - Vue.prototype.CustomBar - Vue.prototype.StatusBar
				}
			})
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/TruckRecordType/Query',
						data: datas,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.all = res.data.Customerdata
								if(res.data.Customerdata[1].products.length > 0) {
									self.listItem = res.data.Customerdata[1].products
									self.$store.commit('changeProductState',self.all[1].val)
									self.show = false
								} else {
									self.show = true
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			changeNav(k) {
				if(this.itemIndex == k) {
					return
				}
				this.itemIndex = k
				this.listIndex = -1
				this.$store.commit('changeProductItem','')
				if(k == 0) {
					if(this.all[1].products.length > 0) {
						this.listItem = this.all[1].products
						this.$store.commit('changeProductState',this.all[1].val)
						this.show = false
					} else {
						this.listItem = []
						this.show = true
					}
				} else if(k == 1) {
					if(this.all[0].products.length > 0) {
						this.listItem = this.all[0].products
						this.$store.commit('changeProductState',this.all[0].val)
						this.show = false
					} else {
						this.listItem = []
						this.show = true
					}
				} else {
					if(this.all[2].products.length > 0) {
						this.listItem = this.all[2].products
						this.$store.commit('changeProductState',this.all[2].val)
						this.show = false
					} else {
						this.listItem = []
						this.show = true
					}
				}
			},
			changeList(k,name) {
				this.listIndex = k
				this.$store.commit('changeProductItem',name)
			},
			goReset() {
				this.listIndex = -1
				this.$store.commit('changeProductItem','')
			},
			goSure() {
				if(this.$store.state.productItem == '') {
					Toast.showToast('请选择产品')
					return
				}
				uni.navigateBack({
				    delta: 1
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

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28rpx;
			box-sizing: border-box;
			border-top: 1px solid #eee;

			.nav {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 60px;

				.nav-item {
					width: 160rpx;
					height: 30px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					color: #333;

					&.active {
						border-radius: 30px;
						background: #00AAEF;
						color: #FFFFFF;
					}
				}
			}

			.product {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.product-title {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 28rpx;
					font-weight: 600;
					color: #333;
				}
				
				.no {
					width: 196rpx;
					height: 128rpx;
					margin-top: 200rpx;
				}

				.list {
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.list-item {
						width: 30%;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						background: #F5F5F5;
						font-size: 24rpx;
						color: #333;
						margin-right: 3.33%;
						margin-bottom: 5%;
						border-radius: 30px;
						
						&.actives {
							background: #E1F2F9;
							color: #00A9EF;
						}
					}
				}
			}
			
			.bottom {
				width: 100%;
				height: 40px;
				display: flex;
				position: fixed;
				left: 0;
				bottom: 0;
				background: #F5F5F5;
				z-index: 999;
				
				.btn1 {
					width: 30%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					color: #333;
				}
				
				.btn2 {
					width: 70%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					color: #fff;
					background: #00A9EF;
				}
			}
		}
	}
</style>
