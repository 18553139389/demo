<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">协议详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<web-view :webview-styles="webviewStyles" src="http://47.94.251.81:9008/a/agreement/agreement/disPlayDetail?id=1"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333',
				title: '',
				content: '',
				loading: false,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(option) {
			
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

			.content {
				width: 100%;
				font-size: 14px;
				color: #333;
			}
			
			img {
				width: 100%;
			}
		}
	}
</style>
