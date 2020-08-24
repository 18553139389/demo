<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">反馈意见</block>
			</cu-custom>
		</view>
		<view class="content">
			<textarea v-model="val" placeholder="反馈内容" placeholder-class="place" />
		</view>
		<view class="submit" @tap="submit">提交</view>
	</view>
</template>

<script>
	import {Toast} from 'vant'
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				val: ''
			}
		},
		methods: {
			submit() {
				if(this.val == ''){
					Toast('内容不能为空')
					return
				}
				
				if(this.val.length > 200){
					Toast('字数不能超过200字')
					return
				}
				
				let datas = {
					url: '/api/gzh/feedback',
					data: {
						uid: this.$store.state.uid,
						content: this.val
					},
					success: function(res) {
						if(res.data.result == 0){
							Toast('提交成功')
							uni.navigateBack({
								delta: 1
							})
						}else{
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(datas)
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
	}
	
	.place {
		font-size: 12px;
		color: #999;
	}
	
	.content {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	
	textarea {
		width: 100%;
		height: 260upx;
		border: 1px solid #eee;
		border-radius: 4px;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #333;
	}
	
	.submit {
		width: 92%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #E73C1D;
		border-radius: 4px;
		margin: 60upx auto 0;
	}
</style>
