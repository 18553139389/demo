<template>
	<view class="contain">
		<view class="list">
			<view class="tit">{{list.title}}</view>
			<view class="message" style="padding-top: 30upx;">
				<view>{{list.publisher}}</view>
				<view>{{list.createDate}}</view>
			</view>
			<view class="content">
				<u-parse :content="article"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	import global_ from '../../common/js/global.js'
	import uParse from '../../components/u-parse/u-parse.vue'
	import {ajax} from '../../common/js/util.js'
	import toast from '../../common/js/toast.js'
	export default {
		data() {
			return {
				article: '详情',
				url: global_.baseUrl,
				list: ''
			}
		},
		components: {
		   uParse
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					
				}
				toast.showLoading('加载中...')
				let data = {
					url: this.list.url,
					data: datas,
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
		height: 100%;
		background: #fff;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		border-top: 1px solid #eee;
	}
	
	.list {
		width: 100%;
		height: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.tit {
		width: 100%;
		font-size: 14px;
		color: #333;
	}
	
	.message {
		width: 100%;
		height: 70upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #999;
	}
	
	.content {
		width: 100%;
		font-size: 12px;
		color: #333;
		text-align: justify;
		padding-bottom: 30upx;
	}
	
	.wxParse view {
		font-size: 12px !important;
		text-align: justify;
		line-height: 40upx;
		background: #fff;
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
