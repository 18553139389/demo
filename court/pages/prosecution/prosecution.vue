<template>
	<view class="contain">
		<view class="item" @tap="go1">
			<img src="../../static/img/xingshishensu1.png" alt="">
			<view>刑事申诉</view>
		</view>
		<view class="item" @tap="go2">
			<img src="../../static/img/minshishensu1.png" alt="">
			<view>民事申诉</view>
		</view>
		<view class="item" @tap="go3">
			<img src="../../static/img/xingzhengshensu1.png" alt="">
			<view>行政申诉</view>
		</view>
		<view class="item" @tap="go4">
			<img src="../../static/img/jubao.png" alt="">
			<view>举报</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			go1() {
				uni.navigateTo({
					url: '../xingshi/xingshi?type=1'
				})
			},
			go2() {
				uni.navigateTo({
					url: '../xingshi/xingshi?type=2'
				})
			},
			go3() {
				uni.navigateTo({
					url: '../xingshi/xingshi?type=3'
				})
			},
			go4() {
				uni.navigateTo({
					url: '../xingshi/xingshi?type=4'
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #fff;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		border-top: 1px solid #eee;
		display: flex;
		flex-wrap: wrap;
	}
	
	.item {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding-top: 80upx;
	}
	
	.item>img {
		width: 140upx;
		height: 140upx;
		margin-bottom: 20upx;
	}
</style>
