<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class="list" @tap.stop="">
		<view class="list-item" v-for="(v,k) in list" :key="v.orderId" @tap="goDetail(v.orderId)">
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
</template>

<script>
	export default {
		data() {
			return {
				type: 1
			}
		},
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			}
		},
		created() {
			this.type = uni.getStorageSync('type')
			console.log(this.type)
		},
		methods: {
			goDetail(ids) {
				console.log(JSON.stringify(ids))
				// uni.navigateTo({
				// 	url: '/pages/detail/detail?ids=' + ids
				// })
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
