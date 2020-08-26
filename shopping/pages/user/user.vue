<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">商家信息</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="common">
				<view>店铺logo</view>
				<image :src="list.logo"></image>
			</view>
			<view class="common">
				<view>店铺名称</view>
				<view class="name">{{list.title}}</view>
			</view>
			<view class="common">
				<view>店铺代码</view>
				<view class="name">{{list.code}}</view>
			</view>
			<view class="common">
				<view>所属分类</view>
				<view class="name">{{list.category}}</view>
			</view>
			<view class="common" @tap="goReset">
				<view>重置密码</view>
				<image class="icon" src="../../static/images/xiayige.png"></image>
			</view>
			<view class="common" @tap="goBind">
				<view>换绑手机</view>
				<image class="icon" src="../../static/images/xiayige.png"></image>
			</view>
			<view class="address">
				<view>店铺地址</view>
				<view class="location">{{list.address}}</view>
			</view>
			<view class="common">
				<view>法人</view>
				<view class="name">{{list.username}}</view>
			</view>
			<view class="imgs" v-if="list.idcardImage !== undefined && list.idcardImage.length > 0">
				<view>身份证</view>
				<view class="message">
					<view class="forward">
						<image :src="list.idcardImage[0]"></image>
						<view>身份证正面</view>
					</view>
					<view class="forward">
						<image :src="list.idcardImage[1]"></image>
						<view>身份证反面</view>
					</view>
				</view>
			</view>
			<view class="imgs" v-if="list.license">
				<view>营业执照</view>
				<view class="box">
					<image mode="widthFix" class="zhizhao" :src="list.license"></image>
				</view>
			</view>
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
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/shopDetail',
						data: datas,
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
			goReset() {
				uni.navigateTo({
					url: '/pages/reset/reset'
				})
			},
			goBind() {
				uni.navigateTo({
					url: '/pages/one/one'
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
		overflow: hidden;
		background: #FFFFFF;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 30upx;
			box-sizing: border-box;
			
			.common {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				color: #333;
				margin-bottom: 32upx;
				
				image {
					width: 100upx;
					height: 100upx;
				}
				
				.name {
					color: #999;
				}
				
				.icon {
					width: 18upx;
					height: 27upx;
				}
			}
			
			.address {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 28upx;
				color: #333;
				margin-bottom: 32upx;
				
				.location {
					color: #999;
					margin-top: 24upx;
				}
			}
			
			.imgs {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 28upx;
				color: #333;
				margin-bottom: 32upx;
				
				.message {
					width: 100%;
					display: flex;
					align-items: center;
					
					.forward {
						width: 50%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 28upx;
						
						image {
							width: 300upx;
							height: 200upx;
							margin: 30upx 0;
						}
						
						view {
							color: #999;
						}
					}
				}
				
				.box {
					width: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					
					.zhizhao {
						width: 300upx;
						margin-top: 30upx;
					}
				}
			}
		}
	}
</style>
