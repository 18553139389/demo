<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	 <mescroll-uni ref="mescrollRef" height="100%" @init="mescrollInit" top="60" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<!-- <good-list :list="goods"></good-list> -->
		<view class="list" @tap.stop="">
			<view class="list-item" v-for="(v,k) in goods" :key="k" @tap="goDetail(v.orderId)">
				<view class="list-top">
					<view class="list-order">订单编号：{{v.orderId}}</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 0">待支付</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 1">待发货</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 2">待确认</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 3">待评价</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 4">已完成</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 5">已取消</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 6">退款中</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 7">已退款</view>
					<view class="list-state" v-if="(type == 1 || type == 2) && v.state == 8">拒绝退款</view>
					<view class="list-state" v-if="type == 3 && v.state == 0">待支付</view>
					<view class="list-state" v-if="type == 3 && v.state == 1">待接单</view>
					<view class="list-state" v-if="type == 3 && v.state == 2">备餐中</view>
					<view class="list-state" v-if="type == 3 && v.state == 3">派送中</view>
					<view class="list-state" v-if="type == 3 && v.state == 4">待评价</view>
					<view class="list-state" v-if="type == 3 && v.state == 5">已完成</view>
					<view class="list-state" v-if="type == 3 && v.state == 6">已取消</view>
					<view class="list-state" v-if="type == 3 && v.state == 7">退款中</view>
					<view class="list-state" v-if="type == 3 && v.state == 8">已退款</view>
					<view class="list-state" v-if="type == 3 && v.state == 9">拒绝退款</view>
					<view class="list-state" v-if="type == 4 && v.state == 0">待支付</view>
					<view class="list-state" v-if="type == 4 && v.state == 1">待入住</view>
					<view class="list-state" v-if="type == 4 && v.state == 2">入住中</view>
					<view class="list-state" v-if="type == 4 && v.state == 3">待评价</view>
					<view class="list-state" v-if="type == 4 && v.state == 4">已评价</view>
					<view class="list-state" v-if="type == 4 && v.state == 5">已取消</view>
					<view class="list-state" v-if="type == 4 && v.state == 6">退款中</view>
					<view class="list-state" v-if="type == 4 && v.state == 7">已退款</view>
					<view class="list-state" v-if="type == 4 && v.state == 8">拒绝退款</view>
				</view>
				<view class="list-content" v-for="(m,n) in v.itemList" :key="n">
					<image :src="m.productLogo"></image>
					<view class="list-message">
						<view class="message-top">
							<view class="message-title">{{m.productTitle}}</view>
							<view class="message-type" v-if="type == 1 || type == 2 || type == 3">商品分类：{{m.skuName}}</view>
							<view class="message-type" v-if="type == 4">{{m.skuName}}</view>
						</view>
						<view class="list-price">
							<view class="price">￥{{m.price}}</view>
							<view class="count" v-if="type == 1 || type == 2 || type == 3">x{{m.qty}}</view>
							<view class="count" v-if="type == 4">{{m.qty}}晚</view>
						</view>
					</view>
				</view>
				<view class="list-total">
					<view>合计：￥{{v.amount}}</view>
					<view style="margin-right: 24upx;" v-if="type == 1 || type == 2 || type == 3">共{{v.count}}件商品</view>
					<view style="margin-right: 24upx;" v-if="type == 4">共{{v.count}}晚</view>
				</view>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js"
	import MescrollMoreItemMixin from "../../components/mescroll-uni/mixins/mescroll-more-item.js"
	import GoodList from "../../components/other/good-list.vue"
	import {apiSearch} from "../../api/mock.js"
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			GoodList
		},
		data() {
			return {
				downOption:{
					auto:true // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:true, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					}
				},
				height: 0,
				goods: [],
				type: 1
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight - 140 + 'px'
			this.type = uni.getStorageSync('type')
		},
		props:{
			index: Number,
			tabs: Array // tab菜单,此处用于取关键词
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper()
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.goods = []
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				let self = this
				let list = []
				
				let datas = {
					uid: uni.getStorageSync('uid'),
					state: this.tabs[this.index].id,
					keywords: this.tabs[this.i].val,
					pageNo: page.num,
					pageSize: page.size
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/shopOrderList',
						data: datas,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								for(let i=0;i<res.data.dataList.length;i++) {
									list.push(res.data.dataList[i])
								}
								//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
								self.mescroll.endSuccess(list.length)
								//设置列表数据
								if(page.num == 1) self.goods = [] //如果是第一页需手动制空列表
								self.goods = self.goods.concat(list) //追加新数据
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
			goDetail(ids) {
				console.log(JSON.stringify(ids))
				uni.navigateTo({
					url: '/pages/detail/detail?ids=' + ids
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		
		.list-item {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 30upx 20upx 30upx 40upx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-bottom: 16upx solid #F6F6F6;
			
			
			.list-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				margin-bottom: 24upx;
				
				.list-order {
					color: #999;
				}
				
				.list-state {
					color: red;
				}
			}
			
			.list-content {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 80upx;
				
				image {
					width: 160upx;
					height: 160upx;
					border-radius: 4px;
				}
				
				.list-message {
					width: 72%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.message-top {
						width: 100%;
						display: flex;
						flex-direction: column;
						
						.message-title {
							width: 100%;
							font-size: 28upx;
							color: #333;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						
						.message-type {
							width: 100%;
							font-size: 28upx;
							color: #999;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							margin-top: 16upx;
						}
					}
					
					.list-price {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.price {
							font-size: 32upx;
							color: red;
						}
						
						.count {
							font-size: 32upx;
							color: #999;
						}
					}
				}
			}
			
			.list-content:last-child {
				margin-bottom: 0;
			}
			
			.list-total {
				width: 100%;
				display: flex;
				flex-direction: row-reverse;
				margin-top: 16upx;
			}
		}
	}
</style>
