<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<!-- <web-view :webview-styles="webviewStyles" :src="content"></web-view> -->
			<u-parse :content="content" />
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
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
			if(option.type == 1) {
				this.title = '服务协议'
			} else if(option.type == 0) {
				this.title = '关于我们'
			} else {
				this.title = '注册协议'
			}
			this.init(option.type)
		},
		methods: {
			init(type) {
				let self = this
				let data1 = {
					type
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/aboutus',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.content = res.data.content
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			}
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
			padding: 0 28upx;
			box-sizing: border-box;

			.content {
				width: 100%;
				font-size: 14px;
				color: #333;
			}
		}
	}
</style>
