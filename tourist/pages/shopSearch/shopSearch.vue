<template>
	<view class="contain">
		<view class="search">
			<text class="cuIcon-back" @tap="backs"></text>
			<view class="search_content">
				<van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" background="#fff">
					<div slot="action" @tap="onSearch" style="color: #DE2910;">
						<img class="icon" src="../../static/img/search.png" alt="">
					</div>
				</van-search>
			</view>
		</view>
		<view class="recommend">
			<view class="recommend_list" v-for="(v,k) in list" :key="k" @tap="goDetail(v.productId)">
				<img class="recommend_img" :src="v.image" alt="">
				<view class="recommend_title">{{v.title}}</view>
				<view class="recommend_price">
					<block v-if="v.type == 1">
						<view class="price">￥{{v.oldPrice}}</view>
						<view class="scores">积分：0</view>
					</block>
					<block v-if="v.type == 2">
						<view class="price">￥{{v.oldPrice}}</view>
						<view class="scores">积分：{{v.point}}</view>
					</block>
					<block v-if="v.type == 3">
						<view class="price">￥0</view>
						<view class="scores">积分：{{v.point}}</view>
					</block>
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
				value: '',
				left: '',
				list: []
			}
		},
		onLoad(option) {
			let self = this
			if (option.id) {
				let datas = {
					categoryId: option.id
				}
				let data = {
					url: '/api/gzh/productList',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data.dataList
						}
					}
				}
				ajax(data)
			} else {
				let data = {
					url: '/api/gzh/productList',
					data: {},
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data.dataList
						}
					}
				}
				ajax(data)
			}
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '../shopDetail/shopDetail?id=' + id
				})
			},
			onSearch() {
				let self = this
				this.list = []
				let datas = {
					keyword: this.value
				}
				let data = {
					url: '/api/gzh/productList',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data.dataList
						}
					}
				}
				ajax(data)
			},
			backs() {
				uni.navigateBack({
					delta: 1
				})
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

	.search {
		width: 100%;
		height: 50px;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cuIcon-back {
		color: #DE2910;
		font-size: 18px;
	}

	.search_content {
		width: 90%;
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.van-search {
		width: 100%;
		padding: 0;
	}

	.icon {
		width: 40upx;
		height: 40upx;
		margin-top: 10upx;
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
		height: 200upx;
	}

	.recommend_title {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		padding-left: 20upx;
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
