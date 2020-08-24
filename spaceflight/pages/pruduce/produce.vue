<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">公司介绍</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<u-parse :content="list.companyInfo" />
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
				list: {}
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
				let data1 = {
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/aboutUs',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataList
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
			padding: 28rpx;
			box-sizing: border-box;
		}
	}
</style>
