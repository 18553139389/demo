<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">使用统计</block>
			</cu-custom>
		</view>
		<view class="box">
			<view class="first">
				<view class="titles">
					<view class="center">编号</view>
					<view class="center">名称</view>
					<view class="center">图片</view>
					<view class="center">已使用</view>
				</view>
				<view class="lists">
					<view class="list-item" v-for="(v,k) in list" :key="k">
						<view class="center">{{v.no}}</view>
						<view class="center">{{v.name}}</view>
						<view class="center" style="color: #0e4ca0;" @tap="goLook(v.image)">查看</view>
						<view class="center" style="color: #0e4ca0;">{{v.usedCount}}</view>
					</view>
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
				let data1 = {
					mid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/part/use',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.list = res.data.body.page.list
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goLook(url) {
				console.log(url)
				let arr = ['https://weixiu.lixinapp.com' + url]
				uni.previewImage({
					urls: arr,
					longPressActions: {
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片')
						},
						fail: function(err) {
							console.log(err.errMsg)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center {
		width: 25%;
		text-align: center;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		position: relative;
		
		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			background: #f6f6f6;
			padding: 24upx 24upx 120upx 24upx;
			box-sizing: border-box;
			
			.first {
				width: 100%;
				padding: 30upx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				display: flex;
				flex-direction: column;
				
				.titles {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;
					color: #333;
				}
				
				.lists {
					width: 100%;
					border-top: 1px solid #eee;
					display: flex;
					flex-direction: column;
					margin-top: 50upx;
					
					.list-item {
						width: 100%;
						height: 90upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28upx;
						color: #333;
					}
				}
			}
		}
		
		.count {
			width: 100%;
			height: 90upx;
			line-height: 90upx;
			text-align: center;
			font-size: 30upx;
			color: #006ee3;
			background: #83bfff;
			position: fixed;
			left: 0;
			bottom: 0;
		}
	}
</style>
