<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">商务合作</block>
			</cu-custom>
		</view>
		<view class="forms">
			<view class="item">
				<view>联系人：</view>
				<input v-model="user" type="text" placeholder="请输入联系人" placeholder-class="place">
			</view>
			<view class="item">
				<view>联系电话：</view>
				<input v-model="tel" type="text" placeholder="请输入联系电话" placeholder-class="place">
			</view>
			<view class="item">
				<view>邮箱：</view>
				<input v-model="email" type="text" placeholder="请输入邮箱" placeholder-class="place">
			</view>
		</view>
		<view class="mark">合作项目简介</view>
		<view class="content">
			<textarea v-model="val" placeholder="反馈内容" placeholder-class="place" />
		</view>
		<view class="submit" @tap="submit">提交</view>
		<view class="tip">提交完成后，平台工作人员会在3个工作日内主动致电您，请耐心等待！</view>
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
				val: '',
				user: '',
				tel: '',
				email: ''
			}
		},
		methods: {
			submit() {
				if(this.user == ''){
					Toast('联系人不能为空')
					return
				}
				
				if(this.tel == ''){
					Toast('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))){
					Toast('手机号格式不正确')
					return
				}
				
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
				if(this.email == ''){
					Toast('邮箱不能为空')
					return
				}else if(!reg.test(this.email)){
					Toast('邮箱格式不正确')
					return
				}
				
				if(this.val == ''){
					Toast('简介不能为空')
					return
				}
				
				if(this.val.length > 200){
					Toast('简介内容不能超过200字')
					return
				}
				
				let datas = {
					url: '/api/gzh/applyCooperate',
					data: {
						uid: this.$store.state.uid,
						username: this.user,
						phone: this.tel,
						email: this.email,
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
	
	input {
		text-align: right;
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
		background: #E3E3E6;
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
	
	.forms {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.item {
		width: 100%;
		height: 84upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px dashed #eee;
	}
	
	.mark {
		width: 100%;
		height: 32upx;
		line-height: 32upx;
		padding-left: 50upx;
		box-sizing: border-box;
		position: relative;
		margin: 50upx 0 30upx;
	}
	
	.mark::after {
		content: '';
		position: absolute;
		top: 0;
		left: 30upx;
		width: 3px;
		height: 32upx;
		border-radius: 4px;
		background: #E73C1D;
	}
	
	.tip {
		width: 100%;
		font-size: 12px;
		color: #999;
		text-align: justify;
		padding: 40upx 30upx 0;
		box-sizing: border-box;
	}
</style>
