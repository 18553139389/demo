<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">客服中心</block>
			</cu-custom>
		</view>
		<view class="service">
			<view class="item" style="margin-top: 25%;">
				<img src="../../static/images/weixin.png" alt="">
				<view style="margin-top: 30upx;">{{wx}}</view>
				<view class="copy" v-clipboard:copy="wx" v-clipboard:success="onCopy">一键复制</view>
			</view>
			<view class="item" style="margin-top: 25%;">
				<img src="../../static/images/qq.png" alt="">
				<view style="margin-top: 30upx;">{{qq}}</view>
				<view class="copy1" v-clipboard:copy="qq" v-clipboard:success="onCopy">一键复制</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				wx: '',
				qq: ''
			}
		},
		onLoad(option) {
			this.wx = option.wx
			this.qq = option.qq
		},
		methods: {
			onCopy() {
				Toast.showToast('复制成功')
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
		
		.fixed {
			width: 100%;
		}
		
		.service {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #FFFFFF;
			padding: 40upx 0;
			
			.item {
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 32upx;
				color: #333;
				
				img {
					width: 140upx;
					height: 140upx;
				}
				
				.copy {
					padding: 8upx 24upx;
					font-size: 30upx;
					color: #333;
					margin-top: 20upx;
					background: #1bb723;
					border-radius: 4px;
					color: #FFFFFF;
				}
				
				.copy1 {
					padding: 8upx 24upx;
					font-size: 30upx;
					color: #333;
					margin-top: 20upx;
					background: #0092FF;
					border-radius: 4px;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
