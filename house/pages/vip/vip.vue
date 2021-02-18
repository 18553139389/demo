<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="bg-shadeTop" @goBack="goBack">
				<block slot="content">会员权益</block>
			</cu-custom>
		</view>
		<view class="list">
			<image :src="obj.image"></image>
			<view class="common">
				<!-- <u-parse :html="obj.content1" :tag-style="style"></u-parse> -->
				<u-parse :content="obj.content1"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				obj: {},
				style: {
					div: 'color:#666;font-size:28rpx;line-height:20px;text-align:justify;',
					p: 'color:#666;font-size:28rpx;line-height:20px;text-align:justify;'
				}
			}
		},
		components: {
			uParse
		},
		onLoad() {
			// 会员权益
			this.$u.post('getrightsinterests').then(res => {
				console.log(res)
				if(res.result == 0) {
					this.obj = res.dataobject
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;
		
		.fixed {
			width: 100%;
		}
		
		.list {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 30rpx;
			
			image {
				width: 100%;
				height: 360rpx;
			}
			
			.common {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				
				.item {
					width: 100%;
					font-size: 30rpx;
					color: #333;
					margin-top: 30rpx;
					font-weight: 600;
					
					.content {
						width: 100%;
						font-size: 28rpx;
						color: #666;
						margin-top: 28rpx;
						line-height: 20px;
						text-align: justify;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
