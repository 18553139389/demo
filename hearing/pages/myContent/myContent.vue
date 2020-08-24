<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<u-parse :content="html" @navigate="navigate"></u-parse>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uParse from "../../components/feng-parse/parse.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				title: '',
				html: ''
			}
		},
		components:{
			uParse
		},
		onLoad(option) {
			if(option.num == 1) {
				this.title = '关于我们'
			} else if(option.num == 2) {
				this.title = '用户守则'
			} else {
				this.title = '服务条款'
			}
			this.init(option.num)
		},
		methods: {
			init(num) {
				let self = this
				let data1 = {
					cmd: 'getAgreementList'
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(num == 1) {
									self.html = res.data.dataList[0].content
								} else if(num == 2) {
									self.html = res.data.dataList[2].content
								} else {
									self.html = res.data.dataList[1].content
								}
								console.log(res)
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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}
	}
</style>
