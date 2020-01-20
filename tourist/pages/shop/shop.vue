<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" bgColor="bg-shadeTop text-white">
				<block slot="backText">
					<img class="msg" src="../../static/img/look1.png" @tap.stop="goSearch" alt="">
				</block>
				<block slot="content">纪念币商城</block>
				<block slot="right">
					<img class="msg" src="../../static/img/type1.png" @tap="goType" alt="">
				</block>
			</cu-custom>
		</view>
		<van-swipe :autoplay="5000" :height="150" indicator-color="#DE2910">
			<van-swipe-item v-for="(v,k) in bannerList" :key="k" @tap="goUrl(v.type,v.content)">
				<img class="banner" :src="v.image" alt="">
			</van-swipe-item>
		</van-swipe>
		<view class="score">
			<view class="score_list" @tap="goType">
				<image mode="scaleToFill" src="../../static/img/shop1.png"></image>
			</view>
			<view class="score_list" @tap="goScore">
				<image mode="scaleToFill" src="../../static/img/shop2.png"></image>
			</view>
		</view>
		<view class="hot">
			<view class="hot_title">
				<view class="hot_left">
					<view class="activity">热门推荐</view>
				</view>
			</view>
			<view class="recommend">
				<view class="recommend_list" @tap="goDetail(v.productId)" v-for="(v,k) in productList" :key="k">
					<img class="recommend_img" :src="v.image" alt="">
					<view class="recommend_title">{{v.title}}</view>
					<view class="recommend_price">
						<block v-if="v.type == 1">
							<view class="price">￥{{v.oldPrice}}</view>
							<!-- <view class="scores">纪念币：0</view> -->
						</block>
						<block v-if="v.type == 2">
							<view class="price">￥{{v.price}}</view>
							<view class="scores">纪念币：{{v.point}}</view>
						</block>
						<block v-if="v.type == 3">
							<!-- <view class="price">￥0</view> -->
							<view class="scores">纪念币：{{v.point}}</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				bannerList: [],
				productList: []
			}
		},
		onShow() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/index',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.$store.commit('changeVip', res.data.vipType)
							self.$store.commit('changeCustomer', res.data.customer)
						}
					}
				}
				ajax(data)
			}
			//初始化执行
			this.init()
		},
		methods: {
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			init() {
				let self = this
				let data = {
					url: '/api/gzh/shopIndex',
					data: {},
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.bannerList = res.data.bannerList
							self.productList = res.data.productList
						}
					}
				}
				ajax(data)
			},
			goSearch() {
				uni.navigateTo({
					url: '../shopSearch/shopSearch'
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../shopDetail/shopDetail?id=' + id
				})
			},
			goType() {
				uni.navigateTo({
					url: '../shopType/shopType'
				})
			},
			goScore() {
				uni.navigateTo({
					url: '../shopScore/shopScore'
				})
			},
			goUrl(type,id) {
				if(type == 1){
					uni.navigateTo({
						url: '../shopDetail/shopDetail?id='+id
					})
				}else if(type == 2){
					uni.navigateTo({
						url: '../shopType/shopType'
					})
				}else if(type == 3){
					uni.navigateTo({
						url: '../content/content?url=' + encodeURIComponent(id)
					})
				}
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.msg {
		width: 38upx;
		height: 38upx;
	}

	.banner {
		width: 100%;
		height: 100%;
	}

	.score {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.score_list {
		width: 48%;
		height: 180upx;
	}

	.score_list>image {
		width: 100%;
		height: 100%;
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

	.recommend {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		background: #f9f9f9;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.recommend_list {
		width: 48%;
		border-radius: 4px;
		background: #fff;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #666;
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.recommend_img {
		width: 100%;
		/* height: 200upx; */
	}

	.recommend_title {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		padding-left: 24upx;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.recommend_price {
		width: 100%;
		padding: 0 20upx 12upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price {
		font-size: 14px;
		color: #DE2910;
	}

	.scores {
		color: #DE2910;
	}
</style>
