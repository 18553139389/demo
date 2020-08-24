<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333',
				title: ''
			}
		},
		onLoad(option) {
			console.log(option)
			this.title = option.title
			// 获取传递过来的链接
			// #ifdef APP-PLUS
			let wv = plus.webview.create("", "custom-webview", {
				plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top: uni.getSystemInfoSync().statusBarHeight + 36 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			})
			if(option.billno && option.apisecret) {
				let url = option.url + '?billno=' + option.billno + '&apisecret=' + option.apisecret
				wv.loadURL(url)
			} else {
				wv.loadURL(option.url)
			}
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		
		.fixed {
			width: 100%;
		}
	}
</style>
