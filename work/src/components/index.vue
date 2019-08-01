<template>
	<div class="login">
		<div class="head">切换交警</div>
		<div class="welcome">
			<div class="wel_img">
				<img :src="image" alt="">
			</div>
			<span>欢迎回来</span>
		</div>
		<div class="formData">
			<div class="input_list">
				<input type="text" placeholder="请输入手机号">
			</div>
			<div class="input_list">
				<input type="password" placeholder="请输入密码">
			</div>
			<div class="modify">
				<span @click="forgetPass">忘记密码？</span>
				<span @click="registerUser">注册用户</span>
			</div>
			<button class="submitBtn" @click="goFirst">进入通行证管理系统</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				image: '../../static/images/touxiang.jpg'
			}
		},
		methods: {
			registerUser() {
				this.$router.push('/register')
			},
			forgetPass() {
				this.$router.push('/forget')
			},
			goFirst() {
				this.$router.push('/first')
			}
		}
	}
</script>

<style scoped>
	.login {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 0.32rem 0.4rem;
		box-sizing: border-box;
	}

	.head {
		font-size: 16px;
		color: #333;
		width: 100%;
		text-align: right;
	}

	.welcome {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 1.07rem;
		padding-left: 0.53rem;
	}

	.wel_img {
		width: 2.3rem;
		height: 2.3rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.wel_img img {
		width: 100%;
		height: 100%;
	}

	.welcome>span {
		display: inline-block;
		width: 2.3rem;
		font-size: 16px;
		color: #333;
		text-align: center;
		margin-top: 0.32rem;
	}

	.formData {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 1.3rem;
		padding: 0 0.53rem;
		box-sizing: border-box;
	}

	.input_list {
		width: 100%;
		height: 1.2rem;
		border-radius: 30px;
		border: 1px solid #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	
	.input_list input {
		width: 80%;
		height: 1rem;
		border: none;
		font-size: 15px;
	}
	
	.modify {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 3px;
		box-sizing: border-box;
	}
	
	.modify span {
		font-size: 15px;
		color: #333;
	}
	
	.submitBtn {
		width: 100%;
		height: 1.2rem;
		border-radius: 30px;
		background: rgb(23,172,246);
		font-size: 16px;
		color: #fff;
		margin-top: 1rem;
	}
	
	.submitBtn:hover {
		background: rgb(23,172,230);
	}
</style>
