<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">酒店评论</block>
			</cu-custom>
		</view>
		<view class="score">
			<view>评分 {{score}}分</view>
			<view style="margin-left: 30upx;">{{count}}人评论</view>
		</view>
		<view class="list" v-if="show">
			<view class="list-item" v-for="(v,k) in list" :key="k">
				<view class="item-top">
					<view>{{v.UserName}}</view>
					<view style="color: #E73C1D;" v-if="v.CommentResult == 1">好评</view>
					<view style="color: #E73C1D;" v-if="v.CommentResult == 0">中评</view>
					<view style="color: #E73C1D;" v-if="v.CommentResult == -1">差评</view>
				</view>
				<view class="item-bottom">{{v.Content}}</view>
			</view>
		</view>
		<view class="no" v-if="!show">没有该酒店的评论</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				score: 0,
				list: [],
				count: 0,
				show: true
			}
		},
		onLoad(option) {
			if(JSON.parse(option.list).length > 0){
				this.list = JSON.parse(option.list)
				this.score = option.score
				this.count = this.list.length
				this.show = true
			}else{
				this.show = false
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #F8F8F8;
	}
	
	.contain {
		width: 100%;
		height: 100%;
	}
	
	.score {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #E73C1D;
		display: flex;
		align-items: center;
		background: #fff;
		margin: 30upx 0;
	}
	
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #666;
	}
	
	.list-item {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-bottom: 30upx;
	}
	
	.item-top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		padding-bottom: 20upx;
	}
	
	.item-bottom {
		font-size: 12px;
		color: #666;
		padding-top: 20upx;
		text-align: justify;
		line-height: 18px;
	}
	
	.no {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
</style>
