<template>
	<view class="bottom">
		<view class="tabbar" @tap="changeItem(1)">
			<img :src="itemIndex == 1 ? '../../static/img/tab1-active.png' : '../../static/img/tab1.png'" alt="">
			<view :class="itemIndex == 1 ? 'font' : ''">首页</view>
		</view>
		<view class="tabbar" @tap="changeItem(3)">
			<view class="mask"></view>
			<view>公益诉讼</view>
		</view>
		<view class="tabbar" @tap="changeItem(2)">
			<img :src="itemIndex == 2 ? '../../static/img/tab2-active.png' : '../../static/img/tab2.png'" alt="">
			<view :class="itemIndex == 2 ? 'font' : ''">我的</view>
		</view>
		<img class="middle" src="../../static/img/suishoupai.png" alt="" @tap="changeItem(3)">
	</view>
</template>

<script>
	export default {
		props: {
			itemIndex: { 
			    type: Number,
			    default: 0
			}
		},
		methods: {
			changeItem(k) {
				this.$emit("changeItem",k)
			}
		}
	}
</script>

<style>
	.bottom {
		width: 100%;
		height: 120upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		z-index: 999;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0 1px 5px #eee;
		padding: 10upx 0;
		box-sizing: border-box;
	}

	.tabbar {
		width: 33%;
		height: 100upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 12px;
		color: #333;
	}

	.tabbar>img,
	.mask {
		width: 50upx;
		height: 50upx;
	}

	.middle {
		position: absolute;
		width: 140upx;
		height: 140upx;
		left: 50%;
		top: -70upx;
		margin-left: -70upx;
	}

	.font {
		color: #3175E4;
	}
</style>
