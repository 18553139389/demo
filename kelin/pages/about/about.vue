<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">关于我们</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<img class="logo" src="../../static/images/logo.png" alt="">
			<ul>
				<li @tap="goForget">
					<view>软件版权</view>
					<view style="color: #999;">{{list.copyright}}</view>
				</li>
				<li>
					<view>电话</view>
					<view style="color: #999;">{{list.phone}}</view>
				</li>
				<li>
					<view>微信</view>
					<view style="color: #999;">{{list.weixin}}</view>
				</li>
				<li>
					<view>QQ</view>
					<view style="color: #999;">{{list.qq}}</view>
				</li>
				<li>
					<view>新浪微博</view>
					<view style="color: #999;">{{list.sinaMicroblog}}</view>
				</li>
				<li>
					<view>电子邮箱</view>
					<view style="color: #999;">{{list.email}}</view>
				</li>
				<li>
					<view>企业网址</view>
					<view style="color: #999;">{{list.website}}</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				list: {}
			}
		},
		onLoad() {
			this.message = uni.getStorageSync('message')
			this.init()
		},
		methods: {
			init() {
				let self = this
				// 是否有新动态
				let data5 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/about',
						data: data5,
						success: function(res) {
							console.log(res)
							Toast.hideLoading()
							if (res.data.success == true) {
								self.list = res.data.body.about
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
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
			
			.logo {
				width: 320upx;
				height: 320upx;
				margin: 80upx 0;
			}
			
			ul {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				li {
					width: 100%;
					height: 90upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #333;
					padding: 0 28upx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;
					
					img {
						width: 14upx;
						height: 24upx;
					}
				}
			}
		}
	}
</style>
