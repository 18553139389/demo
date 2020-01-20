<template>
	<view class="contain">
		<view class="list">
			<input type="text" v-model="title" placeholder="请输入标题" placeholder-class="place">
		</view>
		<view class="lists">
			<textarea v-model="content" placeholder="请输入具体内容" placeholder-class="places" />
		</view>
		<view class="submit" @tap="submit">提交</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import toast from '../../common/js/toast.js'
	export default {
		data() {
			return {
				title: '',
				content: ''
			}
		},
		methods: {
			submit() {
				if(this.title == ''){
					toast.showTitle('标题不能为空')
					return
				}
				
				if(this.content == ''){
					toast.showTitle('内容不能为空')
					return
				}
				
				if(this.content.length > 300){
					toast.showTitle('内容不能超过300字')
					return
				}
				
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid'),
					title: this.title,
					content: this.content
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/complOpinion/submit',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						if (res.data.success == true) {
							toast.hideLoading()
							toast.showTitle('发布成功')
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								})
							},500)
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
		display: flex;
		flex-direction: column;
		border-top: 1px solid #eee;
	}
	
	.list {
		width: 100%;
		height: 90upx;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 3px solid #eee;
	}
	
	input {
		width: 100%;
	}
	
	.place {
		font-size: 14px;
		color: #999;
	}
	
	.lists {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	textarea {
		width: 100%;
		height: 360upx;
	}
	
	.places {
		font-size: 12px;
		color: #999;
	}
	
	.submit {
		width: 92%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		border-radius: 4px;
		background: #007AFF;
		margin: 30upx auto 0;
	}
</style>
