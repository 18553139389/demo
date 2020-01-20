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
	import Toast from '../../common/toast.js'
	import share from "../../common/share.js"
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				title: ''
			}
		},
		onLoad(option) {
			// 获取传递过来的链接
			this.message = uni.getStorageSync('message')
			this.title = option.title
			// #ifdef APP-PLUS
			let wv = plus.webview.create("", "custom-webview", {
				plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top: uni.getSystemInfoSync().statusBarHeight + 44, //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				left: '10px',
				right: '10px'
			})
			wv.loadURL(option.url)
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			setTimeout(function() {
				console.log(wv.getStyle())
			}, 1000); //如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.fixed {
			width: 100%;

			.choice {
				width: 50upx;
				height: 50upx;

			}
		}

		.share {
			position: absolute;
			top: calc(100upx + var(--status-bar-height));
			right: 0;
			display: flex;
			flex-direction: column;
			background: rgba(0, 0, 0, .5);
			color: #FFFFFF;
			font-size: 14px;
			padding: 10upx 0;

			view {
				height: 70upx;
				line-height: 70upx;
				padding: 0 50upx;
			}
		}

		.web {
			width: 100%;
			height: 500upx;
			position: absolute;
			top: 200upx;
			left: 0;
		}
	}
</style>
