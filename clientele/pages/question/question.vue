<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">常见问题</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<view class="list-title">常见问题</view>
				<view class="item" v-for="(v,k) in list" :key="k" @tap="goDetail(v.title,v.content)">
					<view>{{v.title}}</view>
					<image src="../../static/images/right.png"></image>
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
				list: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: 'problemslist',
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
			goDetail(tit, text) {
				this.$store.commit('changeContent', text)
				uni.navigateTo({
					url: '/pages/web1/web1?title=' + tit
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
		background: #F6F6F6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;
			
			.list {
				width: 100%;
				padding: 120rpx 28rpx 28rpx 28rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 6px;
				position: relative;
				
				.list-title {
					position: absolute;
					left: 0;
					top: 30rpx;
					width: 140rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					background: #EAF5FF;
					font-size: 26rpx;
					color: #249AFD;
				}
				
				.item {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					margin-bottom: 42rpx;
					
					image {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}
		}
	}
</style>
