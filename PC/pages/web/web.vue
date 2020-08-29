<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">协议详情</view>
			<u-parse :content="content" style="font-size: 15px;text-align: justify;" />
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
				content: ''
			}
		},
		components: {
			uParse
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(id) {
				let self = this
				let data3 = {}
				let data = {
					url: 'agreementList',
					data: data3,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							self.content = res.data.body.maps[0].content
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		
		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 15rpx;
			box-sizing: border-box;
			
			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
