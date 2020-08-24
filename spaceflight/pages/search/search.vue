<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">搜索</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="search">
				<view class="search-btn">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="choice">
							<view>{{array[index]}}</view>
							<image src="../../static/images/select.png"></image>
						</view>
					</picker>
					<view class="search-btn1">
						<image src="../../static/images/search.png"></image>
						<input type="text" v-model="val" placeholder="请输入关键字搜索">
					</view>
				</view>
				<view style="font-size: 32rpx;" @tap="goList">搜索</view>
			</view>
			<view class="history">
				<view>历史搜索</view>
				<image src="../../static/images/back.png" @tap="goClear"></image>
			</view>
			<view class="item">
				<view class="item-list" v-for="(v,k) in list" :key="k" v-if="k < 6" @tap="goKey(v)">{{v}}</view>
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
				backColor: '#fff',
				val: '',
				array: ['供','需'],
				index: 0,
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
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			goList() {
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
					    url: '/pages/searchList/searchList?value=' + this.val + '&index=' + this.index
					})
				} else {
					arr = uni.getStorageSync('history')
					if (arr.indexOf(this.val) > -1) {
						uni.navigateTo({
						    url: '/pages/searchList/searchList?value=' + this.val + '&index=' + this.index
						})
					} else {
						arr.unshift(this.val)
						uni.setStorageSync('history', arr)
						uni.navigateTo({
						    url: '/pages/searchList/searchList?value=' + this.val + '&index=' + this.index
						})
					}
				}
			},
			goKey(val) {
				uni.navigateTo({
				    url: '/pages/searchList/searchList?value=' + val + '&index=' + this.index
				})
			},
			goClear() {
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '确认删除历史记录吗',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定')
							that.list = []
							uni.removeStorageSync("history")
				        } else if (res.cancel) {
				            console.log('用户点击取消')
				        }
				    }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.search {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 28rpx 0;
				
				.search-btn {
					width: 85%;
					padding: 16rpx 28rpx;
					box-sizing: border-box;
					border-radius: 30px;
					background: #fff;
					display: flex;
					align-items: center;
					
					.choice {
						height: 30rpx;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333;
						padding-right: 16rpx;
						border-right: 2px solid #333;
						
						image {
							width: 36rpx;
							height: 36rpx;
							margin-left: 12rpx;
						}
					}
					
					.search-btn1 {
						display: flex;
						align-items: center;
						margin-left: 40rpx;
						
						image {
							width: 30rpx;
							height: 30rpx;
							margin: 0 16rpx;
						}
						
						input {
							font-size: 28rpx;
							color: #333;
						}
					}
				}
			}
			
			.history {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				margin-top: 30rpx;
				
				image {
					width: 46rpx;
					height: 46rpx;
				}
			}
			
			.item {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				margin-top: 40rpx;
				
				.item-list {
					padding: 10rpx 36rpx;
					border-radius: 30px;
					background: #fff;
					font-size: 28rpx;
					color: #999;
					margin: 0 30rpx 30rpx 0;
				}
			}
		}
	}
</style>
