<template>
	<view class="container" @tap="_click">
		<image :src="listItem.imageUrl" mode="widthFix" class="img" @load="imgLoaded" @error="imgLoaded"></image>
		<view class="list-title">{{listItem.title}}</view>
		<view class="mark">
			<view class="mark-item" v-for="(v,k) in listItem.lables" :key="k">{{v}}</view>
		</view>
		<view class="user">
			<image class="icon" :src="listItem.headImage" alt="" />
			<view>{{listItem.nickname}}</view>
		</view>
		<view class="type" v-if="listItem.gongXuType == 1">供</view>
		<view class="type" style="background: #0081FF;" v-if="listItem.gongXuType == 2">需</view>
	</view>
</template>

<script>
	export default {
		props: {
			listItem: {
				type: [Object, String, Number, Array],
				default: () => {
					return {}
				}
			},
			type: {
				type: String,
				default: ''
			}
		},
		methods: {
			_click() {
				uni.navigateTo({
					url: '/pages/needDetail/needDetail?id=' + this.listItem.id
				})
			},
			imgLoaded() {
				this.$emit('imgLoaded')
			}
		}
	}
</script>

<style scoped>
	@import url("../css/box-sizing-border-box.css");

	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;
		overflow: hidden;
		background-color: #fff;
		position: relative;
	}

	.type {
		position: absolute;
		top: 0;
		left: 0;
		padding: 4rpx 20rpx;
		background: #FF8B4B;
		font-size: 28rpx;
		color: #fff;
		border-bottom-right-radius: 6px;
	}

	.img {
		width: 100%;
		height: auto;
	}

	.text {
		font-size: 28rpx;
		color: #999999;
		margin-top: 25rpx;
	}

	.head {
		width: 100%;
		height: auto;
	}

	.list-title {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 16rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.mark {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.mark-item {
		padding: 6rpx 20rpx;
		border-radius: 30px;
		border: 1px solid #0081FF;
		font-size: 24rpx;
		color: #0081FF;
		margin: 0 20rpx 20rpx 0;
	}

	.user {
		width: 80%;
		padding: 8rpx 16rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #999;
		border-radius: 24px;
		background: #f6f6f6;
		display: flex;
		align-items: center;
		margin: 0 auto 30rpx;
	}

	.icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}
</style>
