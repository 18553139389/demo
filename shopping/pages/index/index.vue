<template>
	<view class="contain">
		<view class="fix">
			<view class="searched">
				<image src="../../static/images/sousuo.png"></image>
				<input type="text" v-model="val" confirm-type="search" @confirm="confirm" placeholder="请输入订单号/商品名称搜索">
			</view>
		</view>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" v-if="types == 1 || types == 2"></app-tabs>
		<app-tabs v-model="tabIndex" :tabs="tabs1" :fixed="true" v-if="types == 3"></app-tabs>
		<app-tabs v-model="tabIndex" :tabs="tabs2" :fixed="true" v-if="types == 4"></app-tabs>
		<swiper :current="tabIndex" @change="swiperChange" v-if="types == 1 || types == 2">
			<swiper-item>
				<mescroll-item v-if="tabIndex == 0" ref="mescrollItem0" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 1" ref="mescrollItem1" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 2" ref="mescrollItem2" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 3" ref="mescrollItem3" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 4" ref="mescrollItem4" :i="4" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 5" ref="mescrollItem5" :i="5" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
		</swiper>
		<swiper :current="tabIndex" @change="swiperChange" v-if="types == 3">
			<swiper-item>
				<mescroll-item v-if="tabIndex == 0" ref="mescrollItem0" :i="0" :index="tabIndex" :tabs="tabs1"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 1" ref="mescrollItem1" :i="1" :index="tabIndex" :tabs="tabs1"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 2" ref="mescrollItem2" :i="2" :index="tabIndex" :tabs="tabs1"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 3" ref="mescrollItem3" :i="3" :index="tabIndex" :tabs="tabs1"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 4" ref="mescrollItem4" :i="4" :index="tabIndex" :tabs="tabs1"></mescroll-item>
			</swiper-item>
		</swiper>
		<swiper :current="tabIndex" @change="swiperChange" v-if="types == 4">
			<swiper-item>
				<mescroll-item v-if="tabIndex == 0" ref="mescrollItem0" :i="0" :index="tabIndex" :tabs="tabs2"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 1" ref="mescrollItem1" :i="1" :index="tabIndex" :tabs="tabs2"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 2" ref="mescrollItem2" :i="2" :index="tabIndex" :tabs="tabs2"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 3" ref="mescrollItem3" :i="3" :index="tabIndex" :tabs="tabs2"></mescroll-item>
			</swiper-item>
			<swiper-item>
				<mescroll-item v-if="tabIndex == 4" ref="mescrollItem4" :i="4" :index="tabIndex" :tabs="tabs2"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./mescroll-swiper-item.vue"
	import AppTabs from "../../components/other/app-tabs.vue"
	export default {
		data() {
			return {
				Color: '#333',
				val: '',
				height: 0, // 需要固定swiper的高度
				type: 0,
				tabIndex: 0, // 当前tab的下标
				types: 1
			}
		},
		computed: {
			tabs() {
				let arr = [{
					name: '全部',
					id: '',
					val: this.val
				},{
					name: '待支付',
					id: 0,
					val: this.val
				},{
					name: '待发货',
					id: 1,
					val: this.val
				},{
					name: '待收货',
					id: 2,
					val: this.val
				},{
					name: '申请退款',
					id: 6,
					val: this.val
				},{
					name: '交易完成',
					id: 3,
					val: this.val
				}]
				return arr
			},
			tabs1() {
				let arr = [{
					name: '全部',
					id: '',
					val: this.val
				},{
					name: '待支付',
					id: 0,
					val: this.val
				},{
					name: '待接单',
					id: 1,
					val: this.val
				},{
					name: '备餐中',
					id: 2,
					val: this.val
				},{
					name: '派送中',
					id: 3,
					val: this.val
				}]
				return arr
			},
			tabs2() {
				let arr = [{
					name: '全部',
					id: '',
					val: this.val
				},{
					name: '待支付',
					id: 0,
					val: this.val
				},{
					name: '待入住',
					id: 1,
					val: this.val
				},{
					name: '入住中',
					id: 2,
					val: this.val
				},{
					name: '申请退款',
					id: 6,
					val: this.val
				}]
				return arr
			}
		},
		components: {
			MescrollItem,
			AppTabs
		},
		onLoad() {
			this.types = uni.getStorageSync('type')
		},
		onShow() {
			this.$refs["mescrollItem"+this.tabIndex].downCallback()
		},
		methods: {
			// 轮播菜单
			swiperChange(e){
				this.type = 0
				this.tabIndex = e.detail.current
			},
			confirm() {
				this.$refs["mescrollItem"+this.tabIndex].downCallback()
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
		background: #F6F6F6;
		
		.fix {
			width: 100%;
			height: 70px;
			position: fixed;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: calc(var(--status-bar-height) + 10px);
			z-index: 99999999;
			
			.searched {
				width: 80%;
				height: 70upx;
				border-radius: 60px;
				background: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 20000;
				
				image {
					width: 26upx;
					height: 26upx;
					margin-right: 16upx;
				}
				
				input {
					width: 60%;
					height: 70upx;
					line-height: 70upx;
					font-size: 28upx;
					color: #333;
				}
			}
		}
		
		swiper {
			width: 100%;
			height: 100vh;
		}
	}
</style>
