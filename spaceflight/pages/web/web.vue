<template>
	<view class="contain">
		<view class="wrapper">
			<web-view :webview-styles="webviewStyles" :src="'https://zhr.lexishangcheng.com/index/?url=' + content"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				content: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(option) {
			this.content = option.url
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
			// padding: 0 28upx;
			// box-sizing: border-box;

			.content {
				width: 100%;
				font-size: 14px;
				color: #333;
			}
		}
	}
</style>
