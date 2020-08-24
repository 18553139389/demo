<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">关于我们</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<img class='logo' src="../../static/images/logos.jpg" alt="">
			<view class="list">
				<view class="item">
					<view>软件版权</view>
					<view class="right">{{user.copyright}}</view>
				</view>
				<view class="item">
					<view>客服微信</view>
					<view class="right">{{user.weixin}}</view>
				</view>
				<view class="item">
					<view>客服电话</view>
					<view class="right">{{user.phone}}</view>
				</view>
				<view class="item">
					<view>企业网址</view>
					<view class="right">{{user.website}}</view>
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
				user: {}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'customersmessage'
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.user = res.data.dataobject
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
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
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 28upx;
			box-sizing: border-box;
			
			.logo {
				width: 360upx;
				height: 150upx;
				margin: 120upx 0 80upx;
			}
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.item {
					width: 100%;
					height: 100upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 15px;
					color: #333;
					
					.right {
						color: #999;
					}
				}
			}
		}
	}
</style>
