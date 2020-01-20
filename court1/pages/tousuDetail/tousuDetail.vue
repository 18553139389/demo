<template>
	<view class="contain">
		<view class="list">
			<view>{{list.title}}</view>
		</view>
		<view class="lists">
			<view class="content">{{list.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			console.log(this.list)
		},
		methods: {
			
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
		display: flex;
		flex-direction: column;
		border-top: 1px solid #eee;
	}
	
	.list {
		width: 100%;
		/* height: 90upx; */
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 3px solid #eee;
	}
	
	.lists {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.content {
		width: 100%;
		text-align: justify;
		font-size: 12px;
		color: #666;
	}
	
</style>
