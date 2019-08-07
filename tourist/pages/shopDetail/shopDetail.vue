<template>
	<view class="contain">
		<view class="back" @tap="back">
			<img class="backs" src="../../static/img/backs.png" alt="">
		</view>
		<van-swipe :autoplay="5000" :height="200" indicator-color="#DE2910">
			<van-swipe-item v-for="(v,k) in bannerList" :key="k">
				<img class="banner" :src="v" alt="">
			</van-swipe-item>
		</van-swipe>
		<view class="produce">
			<view class="title">
				<block v-if="list.type == 1">
					<view class="price">￥{{v.oldPrice}}</view>
					<view class="score">积分：0</view>
				</block>
				<block v-if="list.type == 2">
					<view class="price">￥{{v.oldPrice}}</view>
					<view class="score">积分：{{v.point}}</view>
				</block>
				<block v-if="list.type == 3">
					<view class="price">￥0</view>
					<view class="score">积分：{{v.point}}</view>
				</block>
			</view>
			<view class="name">{{list.title}}</view>
		</view>
		<view class="detail">
			<view class="hot_title">
				<view class="hot_left">
					<view class="activity">商品详情</view>
				</view>
			</view>
			<view style="width:100%;height:calc(100vh - 200px - 166upx - 76upx - 130upx)">
				<webView :url="url"></webView>
			</view>
		</view>
		<view class="buy" @tap="goOrder">立即购买</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import webView from '../../components/conText/conText.vue'
	export default {
		data() {
			return {
				url: 'http://m.xgcyz1978.com/display/activity?id=cd300ecb3c1d47868d1db6fda97b9228',
				list: {},
				bannerList: [],
				ids: ''
			}
		},
		components: {
			webView
		},
		onLoad(option) {
			let self = this
			this.ids = option.id
			let datas = {
				productId: option.id
			}
			let data = {
				url: '/api/gzh/productDetail',
				data: datas,
				success: function(res){
					console.log(res)
					if(res.data.result == 0){
						self.bannerList = res.data.bannerList
						self.list = res.data
					}
				}
			}
			ajax(data)
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			goOrder() {
				let list = JSON.stringify(this.list)
				uni.navigateTo({
					url: '../shopOrder/shopOrder?list=' + list + '&id=' + this.ids
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.banner {
		width: 100%;
		height: 100%;
	}

	.back {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		background: rgba(0, 0, 0, .3);
		position: absolute;
		top: 100upx;
		left: 30upx;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.backs {
		width: 32upx;
		height: 32upx;
	}
	
	.produce {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		border-bottom: 6px solid #f9f9f9;
	}
	
	.title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.price {
		font-size: 16px;
		color: #DE2910;
	}
	
	.score {
		color: #DE2910;
	}
	
	.name {
		margin-top: 20upx;
	}
	
	.detail {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
	}
	
	.hot_title {
		width: 100%;
		height: 80upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #333;
	}
	
	.hot_left {
		display: flex;
		align-items: center;
	}
	
	.activity {
		border-left: 2px solid #DE2910;
		padding-left: 20upx;
		font-size: 14px;
		color: #DE2910;
	}
	
	.buy {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
</style>
