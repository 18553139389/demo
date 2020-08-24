<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">帮助说明</block>
			</cu-custom>
		</view>
		<view class="wrapper" :style="{height:height}">
			<image src="../../static/images/other.jpg" mode="widthFix"></image>
			<view class="navs">
				<view class="question" style="border-right: 1px solid #eee;border-bottom: 1px solid #eee;">
					<view class="texts" style="background-color: #FFA500;" @tap="goDetail(0)">代卖协议</view>
				</view>
				<view class="question" style="border-bottom: 1px solid #eee;">
					<view class="texts" style="background-color: #1E90FF;" @tap="goDetail(1)">用户注册协议</view>
				</view>
				<view class="question" style="border-right: 1px solid #eee;">
					<view class="texts" style="background-color: #9932CC;" @tap="goDetail(2)">易淘商城-全新的根雕艺术理念</view>
				</view>
				<view class="question">
					<view class="texts" style="background-color: #F4A460;" @tap="goDetail(3)">易淘商城购销操作流程</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				height: 0,
				list: []
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync()
			this.height = res.windowHeight - Vue.prototype.CustomBar + 'px'
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'gethelplist'
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goDetail(k) {
				let self = this
				let title = encodeURIComponent(self.list[k].title)
				let content = encodeURIComponent(self.list[k].url)
				uni.navigateTo({
					url: `/pages/produce/produce?title=${title}&content=${content}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background: #FEF5EE;
	}

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
			align-items: center;
			
			image {
				width: 100%;
			}

			.navs {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding: 140rpx 28upx 0;
				box-sizing: border-box;

				.question {
					width: 50%;
					height: 280upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 14px;
					color: #fff;
					padding: 0 24rpx;
					box-sizing: border-box;
					text-align: center;

					.texts {
						width: 90%;
						height: 240rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 4px;
						padding: 0 20rpx;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>
