<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="search">
					<div class="search">
						<img src="../../static/images/search.png" alt="">
						<input v-model="val" type="text" confirm-type="search" @confirm="goRight" placeholder="请输入关键词搜索" />
					</div>
				</block>
				<block slot="right">搜索</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="history">
				<view>搜索历史：</view>
				<view @tap="goClear">清空</view>
			</view>
			<ul class="lists">
				<li v-for="(v,k) in list" :key="k" v-if="k < 6" @tap="goKey(v)">{{v}}</li>
			</ul>
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
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;

		.fixed {
			width: 100%;

			.search {
				width: 90%;
				height: 70upx;
				display: flex;
				align-items: center;
				background: #F0F0F0;
				border-radius: 4px;
				padding: 0 20upx;

				img {
					width: 30upx;
					height: 37upx;
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

		.wrapper {
			width: 100%;
			padding: 40upx 28upx 0;
			box-sizing: border-box;

			.history {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
			}

			.lists {
				width: 100%;
				display: flex;
				flex-wrap: wrap;

				li {
					padding: 16upx 32upx;
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
</style>
