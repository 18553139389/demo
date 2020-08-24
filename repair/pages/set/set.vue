<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">设置</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item" @tap="goUser">
				<view style="width: 160rpx;">个人信息</view>
				<image src="../../static/images/rights.png"></image>
			</view>
			<view class="item" @tap="goBind">
				<view style="width: 160rpx;">手机号码</view>
				<view class="msg">
					<view>{{list.phoneNum}}</view>
					<image src="../../static/images/rights.png"></image>
				</view>
			</view>
			<view class="item" @tap="goModify">
				<view style="width: 160rpx;">修改密码</view>
				<image src="../../static/images/rights.png"></image>
			</view>
		</view>
		<view class="btn" @tap="submit">退出登录</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				title: '',
				list: {}
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/memberInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goUser() {
				uni.navigateTo({
					url: '/pages/user/user'
				})
			},
			goBind() {
				uni.navigateTo({
					url: '/pages/bind/bind'
				})
			},
			goModify() {
				uni.navigateTo({
					url: '/pages/modify/modify?call=' + this.list.phoneNum
				})
			},
			submit() {
				uni.clearStorage()
				this.$store.commit('changeLocation', '')
				uni.navigateTo({
					url: '/pages/login/login?type=2'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
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
			border-top: 10px solid #f5f5f5;
			
			.item {
				width: 100%;
				padding: 28rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				background: #fff;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;
				color: #333;
				
				image {
					width: 30rpx;
					height: 30rpx;
				}
				
				.msg {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #666;
					
					image {
						width: 30rpx;
						height: 30rpx;
						margin-left: 28rpx;
					}
				}
			}
		}
		
		.btn {
			width: 50%;
			margin: 80rpx auto 0;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			color: #fff;
			background: #F15903;
			border-radius: 30px;
		}
	}
</style>
