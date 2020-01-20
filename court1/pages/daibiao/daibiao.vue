<template>
	<view class="contain">
		<view class="item" @tap="go1">
			<img src="../../static/img/jianchagongzuojianbao.png" alt="">
			<view>检察工作简报</view>
		</view>
		<view class="item" @tap="go2">
			<img src="../../static/img/rendabaogao.png" alt="">
			<view>人大报告</view>
		</view>
		<view class="item" @tap="go3">
			<img src="../../static/img/daibiaoweiyuanjianyi.png" alt="">
			<view>代表委员建议</view>
		</view>
		<view class="item" @tap="go4">
			<img src="../../static/img/daibiaoweiyuanyijian.png" alt="">
			<view>代表委员意见</view>
		</view>
		<view class="item" @tap="go5">
			<img src="../../static/img/tousu.png" alt="">
			<view>投诉</view>
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
					url: '../jianbao/jianbao'
				})
			},
			go2() {
				uni.navigateTo({
					url: '../rendabaogao/rendabaogao'
				})
			},
			go3() {
				uni.navigateTo({
					url: '../daibiaojianyi/daibiaojianyi'
				})
			},
			go4() {
				uni.navigateTo({
					url: '../daibiaoyijian/daibiaoyijian'
				})
			},
			go5() {
				uni.navigateTo({
					url: '../tousu/tousu'
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
