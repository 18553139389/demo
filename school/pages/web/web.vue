<template>
	<view class="contain">
		<view class="wrapper">
			<web-view :webview-styles="webviewStyles" src="https://xxtc.hnsgsmyxgs.com/display/agreement?id=1"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333',
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
	}
</style>
