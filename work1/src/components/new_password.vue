<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<div class="formData">
			<div class="list">
				<span>旧密码：</span>
				<input v-model="tel" type="password" placeholder="请输入旧密码">
			</div>
			<div class="list">
				<span>新密码：</span>
				<input v-model="password" type="password" placeholder="请输入新密码">
			</div>
			<button type="button" class="submit" @click="submitForm">确定</button>
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import {
		Toast
	} from 'vant'

	export default {
		data() {
			return {
				text: '修改登录密码',
				tel: '',
				password: '',
				uid: ''
			};
		},
		components: {
			MainHeader,
			Toast
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		methods: {
			submitForm() {
				if (this.tel == '') {
					Toast('旧密码不能为空')
					return
				}

				if (this.password == '') {
					Toast('密码不能为空')
					return
				} else if (this.password.length < 6) {
					Toast('密码长度不能少于6位')
					return
				}

				let self = this
				let datas = {
					uid: self.uid,
					oldPassword: self.tel,
					newPassword: self.password
				}
				Request.postRequest('api/member/member/reUpdatePassword', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						Toast('修改成功')
						self.tel = ''
						self.password = ''
						this.$router.go(-1)
					} else {
						Toast(res.data.msg)
					}
				}).catch(res => {
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
		background: rgb(23, 173, 246);
		height: 1.2rem;
		font-size: 15px;
		color: #fff;
		margin-top: 0.8rem;
	}
</style>
