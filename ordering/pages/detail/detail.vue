<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">菜谱详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#FFFFFF">
				<swiper-item v-for="(v,k) in banner" :key="k">
					<image class="logo" :src="v"></image>
				</swiper-item>
			</swiper>
			<view class="list">
				<view class="titles" v-if="list.type == 1">周一菜谱介绍</view>
				<view class="titles" v-if="list.type == 2">周二菜谱介绍</view>
				<view class="titles" v-if="list.type == 3">周三菜谱介绍</view>
				<view class="titles" v-if="list.type == 4">周四菜谱介绍</view>
				<view class="titles" v-if="list.type == 5">周五菜谱介绍</view>
				<view class="titles" v-if="list.type == 6">周六菜谱介绍</view>
				<view class="titles" v-if="list.type == 7">周日菜谱介绍</view>
				<view class="date">日期：{{date}}</view>
				<view class="lunch">
					<view style="margin-bottom: 16rpx;font-weight: 600;">早餐</view>
					<view>{{list.breakfast}}</view>
				</view>
				<view class="lunch">
					<view style="margin-bottom: 16rpx;font-weight: 600;">午餐</view>
					<view>{{list.lunch}}</view>
				</view>
				<view class="lunch">
					<view style="margin-bottom: 16rpx;font-weight: 600;">晚餐</view>
					<view>{{list.dinner}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				date: '',
				id: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				banner: [],
				list: {}
			}
		},
		onLoad(option) {
			this.date = option.date
			this.id = option.id
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					recipeId: this.id
				}
				let data = {
					url: '/recipeDetail',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.banner = res.data.images
							self.list = res.data
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			swiper {
				width: 100%;
				height: 750rpx;
			
				swiper-item {
					width: 100%;
					height: 750rpx;
			
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.list {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				
				.titles {
					width: 100%;
					font-size: 30rpx;
					font-weight: 600;
					color: #333;
				}
				
				.date {
					width: 100%;
					font-size: 28rpx;
					color: #666;
					margin: 24rpx 0 40rpx 0;
				}
				
				.lunch {
					width: 100%;
					margin: 0 0 60rpx;
				}
			}
		}
	}
</style>
