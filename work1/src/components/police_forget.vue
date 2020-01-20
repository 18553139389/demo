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
				<span>新密码：</span>
				<input v-model="password" type="password" placeholder="设置新密码">
			</div>
			<button type="button" class="submit" @click="submitForm">提交</button>
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import { Toast } from 'vant'
	
	export default {
		data() {
			return {
				text: '忘记密码',
				rTime: '获取验证码',
				btnState: false,
				tel: '',
				code: '',
				password: ''
			};
		},
		components: {
			MainHeader
		},
		methods: {
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
					phone: this.tel
				}
				
				Request.postRequest('api/sms/vertifyCode',datas).then(res =>{
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
				}else if(!(/^78]\d{9}$/.test(this.tel))){
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
				
				let datas = {
					memberType: 1,
					phone: this.tel,
					identifyCode: this.code,
					newPassword: hex_md5(this.password)
				}
				
				Request.postRequest('api/member/member/forgetPassword',datas).then(res =>{
					if(res.data.success == true) {
						Toast('修改密码成功')
						this.$router.go(-1)
					}else{
						Toast('修改密码失败')
					}
				}).catch(res =>{
					console.log(res)
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
