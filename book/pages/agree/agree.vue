<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<u-parse :content="content" :loading="loading" />
		</view>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import uParse from '../../components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				Color: '#333',
				title: '注册协议',
				content: '',
				loading: false,
			}
		},
		components: {
			uParse
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data2 = {
					cmd: 'getgreement',
					type: 1
				}
				Toast.showLoading('', function() {
					let data = {
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.content = self.unescape(res.data.datastr)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			unescape(html) {
				return html
					.replace(/&nbsp;/g, "''")
					.replace(/<0:p>/g, "''")
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
