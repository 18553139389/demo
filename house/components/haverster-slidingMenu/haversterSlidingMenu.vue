<template>
	<scroll-view class="uni-slidingMenu" scroll-x :style="{background: color}">
		<view :class="['slidingMenuList',activeIndex==index?'active':'']" v-for="(item, index) in list" :key="index" @click="getActive(index,item.cid)"
		 v-cloak>{{ item.name }}</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'uniSlidingMenu',
		props: {
			// 列表菜单
			list: {
				type: Array
			},
			color: {
				type: String,
				default: '#777777'
			}

		},
		data() {
			return {
				activeIndex: "0"
			};
		},
		methods: {
			getActive(index, id) {
				this.activeIndex = index;
				this.$emit("changes", this.activeIndex, id);
			}
		}
	};
</script>

<style>
	page {
		background-color: #fafafa;
	}

	/* 滑动菜单栏的总内容区域 */
	.uni-slidingMenu {
		width: 100%;
		white-space: nowrap;
		height: 80rpx;
		background-color: #FFFFFF;
	}

	/* 循环显示的菜单栏 */
	.slidingMenuList {
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		font-size: 28rpx;
		margin-right: 60rpx;
	}

	.slidingMenuList:last-child {
		/* margin-right: 60rpx; */
	}

	/* 点击选中菜单栏时的样式 */
	.active {
		color: #fe5f23;
		font-size: 28rpx;
		margin-right: 60rpx;
		border-bottom: 2rpx solid #fe5f23;
		box-sizing: border-box;
	}
</style>
