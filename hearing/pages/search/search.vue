<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="search_box">
				<view class="search">
					<img src="../../static/images/sousuo1.png" alt="">
					<input v-model="val" type="text" confirm-type="search" @confirm="goRight" placeholder="请输入关键词搜索" />
				</view>
				<view @tap="goRight">搜索</view>
			</view>
			<view class="history_box">
				<view class="history">
					<view class="his_title">历史搜索</view>
					<image src="../../static/images/shanchu.png" @tap="goClear"></image>
				</view>
				<ul class="lists">
					<li v-for="(v,k) in list" :key="k" v-if="k < 6" @tap="goKey(v)">{{v}}</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				val: '',
				list: []
			}
		},
		onShow() {
			this.val = ''
			if (uni.getStorageSync('history')) {
				this.list = uni.getStorageSync('history')
			} else {
				uni.setStorageSync('history', '')
			}
		},
		methods: {
			goRight() {
				let self = this
				if (this.val == '') {
					Toast.showToast('搜索内容不能为空')
					return
				}

				let arr = []
				if (uni.getStorageSync('history') == '') {
					arr.unshift(this.val)
					uni.setStorageSync('history', arr)
					uni.navigateTo({
					    url: '/pages/searchDetail/searchDetail?value=' + this.val
					})
				} else {
					arr = uni.getStorageSync('history')
					if (arr.indexOf(this.val) > -1) {
						return
					}
					arr.unshift(this.val)
					uni.setStorageSync('history', arr)
					uni.navigateTo({
					    url: '/pages/searchDetail/searchDetail?value=' + this.val
					})
				}
			},
			goKey(val) {
				uni.navigateTo({
				    url: '/pages/searchDetail/searchDetail?value=' + val
				})
			},
			goClear() {
				this.list = []
				uni.removeStorageSync("history")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		background: #f6f6f6;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			padding: 20upx 28upx 0;
			box-sizing: border-box;
			
			.search_box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.search {
					width: 88%;
					height: 70upx;
					display: flex;
					align-items: center;
					background: #FFFFFF;
					border-radius: 30px;
					padding: 0 20upx;
				
					img {
						width: 36upx;
						height: 36upx;
						margin-right: 20upx;
					}
				
					input {
						flex: 1;
						height: 50upx;
						font-size: 14px;
						color: #333;
					}
				}
			}
			
			.history_box {
				width: 100%;
				padding: 60rpx 60rpx 60rpx 20rpx;
				box-sizing: border-box;
				border-radius: 4px;
				background: #fff;
				margin-top: 30rpx;
				
				.history {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #333;
					
					.his_title {
						padding-left: 24rpx;
						position: relative;
						font-size: 30rpx;
					}
					
					.his_title:before {
						content: '';
						width: 4px;
						height: 30rpx;
						border-radius: 12px;
						background: #06A5C4;
						position: absolute;
						top: 6rpx;
						left: 0;
					}
					
					image {
						width: 40rpx;
						height: 43rpx;
					}
				}
				
				.lists {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				
					li {
						padding: 12upx 32upx;
						background: #F5F5F5;
						font-size: 14px;
						color: #333;
						border-radius: 30px;
						margin-top: 32upx;
						margin-right: 24upx;
					}
				}
			}
		}
	}
</style>
