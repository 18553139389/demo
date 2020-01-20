<template>
	<view class="contain">
		<view class="content">
			<u-parse :content="list"></u-parse>
		</view>
		<view class="bottom">
			<view class="enter" @tap="goPublic">我已阅读，进入提交</view>
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
				list: '申诉须知',
				type: 0
			}
		},
		components: {
		   uParse
		},
		onLoad(option) {
			this.type = option.type
			this.init(option.type)
		},
		methods: {
			init(type) {
				let self = this
				let datas = {
					type: type
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/appeal/notice',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						if (res.data.success == true) {
							toast.hideLoading()
							self.list = res.data.body.content
						}
					}
				}
				ajax(data)
			},
			goPublic() {
				if(this.type == 1){
					uni.navigateTo({
						url: '../xingshiPublic/xingshiPublic'
					})
				}else if(this.type == 2){
					uni.navigateTo({
						url: '../minshi/minshi'
					})
				}else if(this.type == 3){
					uni.navigateTo({
						url: '../xingzheng/xingzheng'
					})
				}else if(this.type == 4){
					uni.navigateTo({
						url: '../jubao/jubao'
					})
				}
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
		position: relative;
		border-top: 1px solid #eee;
	}
	
	.content {
		width: 100%;
		padding: 30upx;
		font-size: 12px;
		color: #333;
		text-align: justify;
		margin-bottom: 110upx;
	}
	
	.bottom {
		width: 100%;
		height: 120upx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.enter {
		width: 80%;
		height: 80upx;
		line-height: 80upx;
		background: #007AFF;
		border-radius: 4px;
		text-align: center;
		font-size: 14px;
		color: #fff;
	}
</style>
