<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<web-view :webview-styles="webviewStyles" :src="content"></web-view>
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue'
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
		components: {
			uParse
		},
		onLoad(option) {
			console.log(option)
			this.title = decodeURIComponent(option.title)
			this.content = decodeURIComponent(option.content)
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
			
			img {
				width: 100%;
			}
		}
	}
</style>
