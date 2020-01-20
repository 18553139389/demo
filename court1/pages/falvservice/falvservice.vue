<template>
	<view class="contain">
		<view class="list">
			<view class="tit">申请人基本情况</view>
			<view class="forms">
				<view class="form-item" @tap="shows">
					<view>申请人类型</view>
					<view style="color: #999;" v-if="radio == 0">个人</view>
					<view style="color: #999;" v-if="radio == 1">企业</view>
				</view>
				<view class="form-item">
					<view>申请人姓名</view>
					<input type="text" v-model="user" placeholder="请输入" placeholder-class="place">
				</view>
				<view class="form-item">
					<view>身份证号</view>
					<input type="text" v-model="card" placeholder="请输入" placeholder-class="place">
				</view>
				<view class="form-item">
					<view>联系电话</view>
					<input type="text" v-model="tel" placeholder="请输入" placeholder-class="place">
				</view>
			</view>
			<view class="tit" style="margin: 30upx 0;">申请内容</view>
			<view class="mark">
				<textarea v-model="content" placeholder="申请内容" />
			</view>
		</view>
		<view class="btn" @tap="submit">提交</view>
		<view class="cu-modal bottom-modal bottomModal" :class="show ? 'show' : ''" @tap="control">
			<view class="cu-dialog">
				<!-- #ifndef MP-ALIPAY -->
				<radio-group class="block" @change="RadioChange">
					<view class="cu-form-group">
						<view class="title">个人</view>
						<radio class='radio blue' :class="radio=='0'?'checked':''" :checked="radio=='0'?true:false" value="0"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">企业</view>
						<radio class='radio blue' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
					</view>
				</radio-group>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import toast from '../../common/js/toast.js'
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				show: false,
				radio: 0,
				user: '',
				card: '',
				tel: '',
				content: ''
			}
		},
		methods: {
			shows() {
				this.show = true
			},
			RadioChange(e) {
				this.radio = e.detail.value
				this.show = false
			},
			control() {
				this.show = false
			},
			submit() {
				if(this.user == ''){
					toast.showTitle('姓名不能为空')
					return
				}
				
				let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				if(this.card == ''){
					toast.showTitle('身份证不能为空')
					return
				}else if(!(idcardReg.test(this.card))){
					toast.showTitle('身份证不合法')
					return
				}
				
				if(this.tel == ''){
					toast.showTitle('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))){
					toast.showTitle('手机号格式不正确')
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
					appliType: this.radio,
					cname: this.user,
					content: this.content,
					telnum: this.tel,
					idnum: this.card
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/law/submit',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						if (res.data.success == true) {
							toast.hideLoading()
							toast.showTitle('提交成功')
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
		display: flex;
		flex-direction: column;
		border-top: 1px solid #eee;
		padding: 30upx 0;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.tit {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		position: relative;
		font-size: 14px;
		color: #3175E4;
		padding: 0 30upx 0 50upx;
	}

	.tit::after {
		content: '';
		position: absolute;
		left: 30upx;
		top: 4upx;
		width: 3px;
		height: 32upx;
		background: #3175E4;
		border-radius: 4px;
	}

	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.form-item {
		width: 100%;
		height: 84upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16upx 0;
		border-bottom: 1px solid #eee;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
	}

	input {
		text-align: right;
	}

	.place {
		font-size: 12px;
		color: #999;
	}
	
	.mark {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	
	textarea {
		width: 100%;
		height: 240upx;
		border: 1px solid #eee;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #333;
	}
	
	.btn {
		width: 92%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 14px;
		color: #333;
		border-radius: 4px;
		background: #007AFF;
		position: fixed;
		left: 50%;
		margin-left: -46%;
		bottom: 30upx;
		color: #fff;
	}
</style>
