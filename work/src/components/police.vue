<template>
	<div class="contain">
		<div class="content">
			<div class="img">
				<img src="../../static/img/jingcha.png" alt="">
			</div>
			<ul class="formData">
				<li class="list">
					<img src="../../static/img/user.png" alt="">
					<input type="text" placeholder="请输入帐号" v-model="tel">
				</li>
				<li class="list">
					<img src="../../static/img/pass.png" alt="">
					<input type="password" placeholder="请输入密码" v-model="password">
				</li>
				<li class="choice">
					<span @click="goForget">忘记密码？</span>
				</li>
			</ul>
			<div class="btn" @click="enter">进入通行证管理系统</div>
			<div class="change" @click="change">切换用户</div>
		</div>
	</div>
</template>

<script>
	import Request from '@util/request'
	import {
		Toast
	} from 'vant'

	export default {
		data() {
			return {
				tel: '',
				password: ''
			}
		},
		mouted() {
			localStorage.getItem('memberType')
		},
		components: {
			Toast
		},
		methods: {
			change() {
				this.$router.push('/login')
			},
			goForget() {
				this.$router.push('/police_forget')
			},
			enter() {
				if(this.tel == '' || this.tel.length < 4){
					Toast('用户名格式错误')
					return
				}
				
				let self = this
				let datas = {
					memberType: 1,
					account: self.tel,
					password: hex_md5(self.password)
				}
				Request.postRequest('api/member/member/login', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						Toast('登陆成功')
						localStorage.setItem('member',JSON.stringify(res.data.body.member))
						self.$router.push('/police_login')
					}else{
						Toast(res.data.msg)
						retuen
					}
				}).catch(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.contain {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		background: url(../../static/img/bg.png) no-repeat;
		background-size: 100% 100%;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.img {
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 1.5rem;
	}

	.img img {
		width: 100%;
		height: 100%;
	}

	.formData {
		width: 80%;
		margin: 1rem auto 0;
	}

	.list {
		width: 100%;
		height: 1.2rem;
		border-radius: 8px;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 0 0.4rem;
		box-sizing: border-box;
		margin-bottom: 1rem;
	}

	.list img {
		width: 22px;
		height: 22px;
	}

	.list input {
		font-size: 15px;
		color: #333;
		margin-left: 0.5rem;
	}

	.choice {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.choice span {
		font-size: 13px;
		color: #fff;
	}

	.btn {
		width: 80%;
		margin: 0 auto;
		height: 1.3rem;
		line-height: 1.3rem;
		text-align: center;
		font-size: 15px;
		color: #17ACE6;
		background: #fff;
		border-radius: 8px;
		margin-top: 1rem;
	}

	.change {
		font-size: 15px;
		color: #fff;
		margin-top: 1.2rem;
	}
</style>
