<template>
	<view class="contain">
		<view class="contain">
			<view class="list">
				<web-view :webview-styles="webviewStyles" :src="content"></web-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(option) {
			this.content = decodeURIComponent(option.content)
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		overflow: hidden;
	}
	
	.list {
		width: 94%;
		height: 100%;
		position: relative;
		margin: 0 auto;
	}
	
	web-view {
		width: 100%;
		padding: 30upx 0;
	}
</style>
