<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="bg-shadeTop" @goBack="goBack">
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<!-- <web-view :webview-styles="webviewStyles" :src="content" v-if="state == 2"></web-view> -->
			<iframe :src="content" frameborder="0" :height="height" v-if="state == 2"></iframe>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				title: '',
				content: '',
				type: 1,
				state: 1
			}
		},
		onLoad(option) {
			window.addEventListener("popstate", function (e) {
			      window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=3")
			}, false)
			this.height = (uni.getSystemInfoSync().windowHeight - Vue.prototype.CustomBar) + 'px'
			this.type = option.type
			this.title = option.title
			this.content = decodeURIComponent(option.url)
			if(option.state == 0) {
				window.history.pushState(null, null, "http://integral.dazhoutian.net/integralwall/home/pages/article/article?nav=3")
				window.location.href = this.content
			} else {
				this.state = 2
			}
		},
		methods: {
			goBack() {
				// if (this.type == 1) {
				// 	uni.navigateBack({
				// 		delta: 2
				// 	})
				// } else {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// }
				uni.reLaunch({
					url: '/pages/article/article?nav=3'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;
		position: relative;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
