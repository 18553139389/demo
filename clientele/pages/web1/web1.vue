<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">最新政策</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles">{{title}}</view>
			<view class="time">
				<image src="../../static/images/task.png"></image>
				<view>{{time}}</view>
			</view>
			<u-parse :content="content" />
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#ffffff',
				content: '',
				title: '',
				time: ''
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.title = option.title
			this.time = option.time
			this.content = this.$store.state.content
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
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
			padding: 0 28upx;
			box-sizing: border-box;
			border-top: 16rpx solid #f6f6f6;
			
			.titles {
				width: 100%;
				text-align: center;
				font-size: 30rpx;
				color: #333;
				border-bottom: 1px solid #eee;
				margin-top: 30rpx;
				padding-bottom: 30rpx;
			}
			
			.time {
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: #999;
				
				image {
					width: 32rpx;
					height: 32rpx;
					margin: 30rpx 20rpx 30rpx 0;
				}
			}
		}
	}
</style>
