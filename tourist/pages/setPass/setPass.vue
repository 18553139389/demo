<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :isIcon="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">设置/忘记密码</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="pass">
				<input type="password" placeholder="请输入支付密码" v-model="pass">
			</view>
			<view class="pass">
				<input type="text" placeholder="短信验证码" v-model="code">
				<button class="getCode" type="button" :disabled="btnState" @tap="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
			</view>
			<view class="submit" @tap="goSubmit">确认</view>
		</view>
	</view>
</template>

<script>
	var md5 = require('js-md5')
	import {
		ajax,ajaxs
	} from '../../common/js/util.js'
	import {
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				pass: '',
				code: '',
				rTime: '获取验证码',
				btnState: false,
				tel: ''
			}
		},
		onLoad(option) {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/userInfo',
					data: datas,
					success: function(res){
						if(res.data.result == 0) {
							self.tel = res.data.phone
						}
					}
				}
				ajax(data)
			},
			goSubmit() {
				let self = this
				if(this.pass == ''){
					Toast('密码不能为空')
					return
				}
				
				var reg=new RegExp("^[0-9]{6}$")
				if(!reg.test(this.pass)){
					Toast('密码必须为6位且是数字')
					return
				}
				
				let datas = {
					url: '/api/gzh/setPayPassword',
					data: {
						uid: this.$store.state.uid,
						payPassword: md5.hex(this.pass),
						code: self.code
					},
					success: function(res) {
						if(res.data.result == 0){
							Toast('设置成功')
							uni.switchTab({
								url: '/pages/shop/shop'
							})
						}else{
							Toast(res.data.resultNote)
						}
					}
				}
				
				ajaxs(datas)
				
			},
			getValidate() {
				let self = this
				this.rTime = 60
				let rTime = this.rTime
				this.btnState = true
				let interval = setInterval(() => {
					if (--self.rTime <= 0) {
						self.rTime = '获取验证码'
						clearInterval(interval)
						self.btnState = false
					}
				}, 1000)
				
				let datas = {
					url: '/api/gzh/sendSms',
					data: {
						phone: self.tel
					},
					success: function(res) {
						console.log(res)
					}
				}
				
				ajaxs(datas)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}
	
	.contain {
		width: 100%;
		height: 100%;
	}
	
	.list {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.submit {
		width: 80%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 60upx;
		background: #DE2910;
		text-align: center;
		font-size: 14px;
		color: #fff;
		margin: 60upx auto 0;
	}
	
	.pass {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}
	
	.getCode {
		font-size: 14px;
		color: #DE2910;
	}
	
	button {
		border: none !important;
		background: none !important;
		padding: 0;
		margin: 0;
	}
	
	uni-button:after {
		border: none !important;
	}
</style>
