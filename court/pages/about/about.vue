<template>
	<view class="contain">
		<view class="content">
			<u-parse :content="article"></u-parse>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import toast from '../../common/js/toast.js'
	import uParse from '../../components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				url: '',
				article: '详情'
			}
		},
		components: {
		   uParse
		},
		onLoad(option) {
			this.url = option.url
			this.init()
		},
		methods: {
			init() {
				let self = this
				toast.showLoading('加载中...')
				let data = {
					url: this.url,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.success == true) {
							toast.hideLoading()
							self.article = res.data.body.content
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #fff;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		border-top: 1px solid #eee;
	}
	
	.content {
		width: 100%;
		font-size: 12px;
		color: #333;
		text-align: justify;
		padding: 0 30upx 30upx;
	}
	
	.text {
		font-size: 12px !important;
		padding: 0 20upx;
		text-align: justify;
		line-height: 40upx;
		background: #fff;
	}
	
	.pic {
		background: #fff !important;
	}
</style>
