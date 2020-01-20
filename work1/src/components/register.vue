<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<div class="formData">
			<div class="list">
				<span>手机号：</span>
				<input v-model="tel" type="text" placeholder="请输入手机号">
			</div>
			<div class="list">
				<span>验证码：</span>
				<div class="validate">
					<input v-model="code" type="text" placeholder="请输入收到的验证码">
					<button type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
				</div>
			</div>
			<div class="list">
				<span>登录密码：</span>
				<input v-model="password" type="password" placeholder="请设置登录密码">
			</div>
			<div class="list">
				<span>身份证号：</span>
				<input v-model="personCard" type="text" placeholder="请输入身份证号">
			</div>
			<div class="list">
				<van-checkbox v-model="checked">
					<span class="text">继续即表示您同意</span><span class="text" style="color: rgb(23,173,246);">《通行证注册协议》</span>
				</van-checkbox>
			</div>
			<button type="button" class="submit" @click="submitForm">下一步</button>
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import { Checkbox, CheckboxGroup } from 'vant'
	import { Toast } from 'vant'
	import axios from 'axios'
	
	export default {
		data() {
			return {
				text: '注册',
				rTime: '获取验证码',
				btnState: false,
				checked: false,
				tel: '',
				code: '',
				password: '',
				personCard: ''
			};
		},
		components: {
			MainHeader,
			Toast,
			Checkbox,
			CheckboxGroup
		},
		methods: {
			getValidate() {
				if(this.tel == ''){
					Toast('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))){
					Toast('手机号格式不正确')
					return
				}
				
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
					phone: this.tel
				}
				
				Request.postRequest('api/sms/vertifyCode',datas).then(res =>{
					console.log(res)
					if(res.success == true) {
						console.log(res)
					}
				}).catch(res =>{
					Toast('获取失败')
				})
			},
			submitForm() {
				if(this.tel == ''){
					Toast('手机号不能为空')
					return
				}else if(!(/^1[345789]\d{9}$/.test(this.tel))){
					Toast('手机号格式不正确')
					return
				}
				
				if(this.code == ''){
					Toast('验证码不能为空')
					return
				} 
				
				if(this.password == ''){
					Toast('密码不能为空')
					return
				}else if(this.password.length < 6){
					Toast('密码长度不能少于6位')
					return
				}
				
				let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				if(this.personCard == ''){
					Toast('身份证不能为空')
					return
				}else if(!(idcardReg.test(this.personCard))){
					Toast('身份证不合法')
					return
				}
				
				if(!this.checked){
					Toast('请勾选通行证协议')
					return
				}
				
				let datas = {
					phone: this.tel,
					password: this.password,
					smscode: this.code,
					idcard: this.personCard
				}
				
				Request.postRequest('api/member/member/regist',datas).then(res =>{
					if(res.data.success == true) {
						Toast('注册成功')
						this.$router.go(-1)
					}else{
						Toast(res.data.msg)
					}
				}).catch(res =>{
					
				})
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped="scoped">
	.formData {
		width: 100%;
		padding: 72px 0.6rem 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 0.8rem;
	}

	.list span {
		font-size: 16px;
		color: #333;
	}

	.list>input {
		width: 100%;
		border-bottom: 1px solid #eee;
		font-size: 16px;
		margin-top: 0.2rem;
		padding: 0.2rem 0;
	}

	.validate {
		width: 100%;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		padding: 0.2rem 0;
		font-size: 16px;
		margin-top: 0.2rem;
	}

	.validate input {
		width: 65%;
	}

	.validate button {
		display: inline-block;
		width: 30%;
		margin-left: 5%;
		font-size: 15px;
		background: #fff;
	}
	
	.text {
		font-size: 14px !important;
		color: #333;
	}
	
	.submit {
		width: 100%;
		border-radius: 8px;
		background: rgb(23,173,246);
		height: 1.2rem;
		font-size: 15px;
		color: #fff;
		margin-top: 0.8rem;
	}
</style>
