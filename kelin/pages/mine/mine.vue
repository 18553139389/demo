<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">我的</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="head" @tap="goEditor">
				<img :src="message.avatar" alt="">
				<view class="user">
					<view class="user-msg">
						<span>{{message.name}}</span>
						<span style="color: #999;">绑定手机号：{{message.mobilePhone}}</span>
					</view>
					<image class="right" src="../../static/images/xiayiye2.png" mode="aspectFit"></image>
				</view>
			</view>
			<ul class="list">
				<li @tap="goStore">
					<span>我的收藏</span>
					<image class="right" src="../../static/images/xiayiye2.png" mode="aspectFit"></image>
				</li>
				<li @tap="goHistory">
					<span>我的上传</span>
					<image class="right" src="../../static/images/xiayiye2.png" mode="aspectFit"></image>
				</li>
				<li @tap="goSuggest">
					<span>我的反馈</span>
					<image class="right" src="../../static/images/xiayiye2.png" mode="aspectFit"></image>
				</li>
				<li @tap="goSet">
					<span>我的设置</span>
					<image class="right" src="../../static/images/xiayiye2.png" mode="aspectFit"></image>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333',
				message: {}
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				this.message = uni.getStorageSync('message')
			},
			goEditor() {
				uni.navigateTo({
				    url: '/pages/editor/editor'
				})
			},
			goStore() {
				uni.navigateTo({
				    url: '/pages/store/store'
				})
			},
			goHistory() {
				uni.navigateTo({
				    url: '/pages/history/history'
				})
			},
			goSuggest() {
				uni.navigateTo({
				    url: '/pages/suggest/suggest'
				})
			},
			goSet() {
				uni.navigateTo({
				    url: '/pages/set/set'
				})
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
		}
		
		.wrapper {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			
			.head {
				width: 100%;
				display: flex;
				
				img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					overflow: hidden;
				}
				
				.user {
					height: 120upx;
					flex: 1;
					display: flex;
					padding-left: 30upx;
					box-sizing: border-box;
					align-items: center;
					justify-content: space-between;
					
					.user-msg {
						height: 120upx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						font-size: 14px;
						color: #333;
					}
					
					.right {
						width: 20upx;
						height: 30upx;
					}
				}
			}
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 14px;
				color: #333;
				margin-top: 40upx;
				
				li {
					width: 100%;
					height: 90upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					.right {
						width: 20upx;
						height: 30upx;
					}
				}
			}
		}
	}
</style>
