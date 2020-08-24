<template>
	<view class="wrapper">
		<web-view :webview-styles="webviewStyles" :src="html"></web-view>
	</view>
</template>

<script>
	import uParse from "../../components/feng-parse/parse.vue"
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#333333'
					}
				},
				html: ''
			}
		},
		components:{
			uParse
		},
		onLoad() {
			// this.html = this.$store.state.content
			this.html = 'https://www.tzmear.com/index.php?m=tlcs&a=index'
		}
	}
</script>

<style>
	.wrapper {
		width: 100%;
		padding: 28rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
</style>
