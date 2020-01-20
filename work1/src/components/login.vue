<template>
	<div class="box">
    <div class="contain" ref="contains">
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
    				<span @click="goRegister">注册用户</span>
    			</li>
    		</ul>
    		<div class="btn" @click="enter">进入通行证管理系统</div>
    		<div class="change" @click="change">切换交警</div>
    	</div>
    </div>
  </div>
</template>

<script>
	import Request from '@util/request'
	import { Toast } from 'vant'

	export default {
		data() {
			return {
				tel: '',
				password: '',
				all: {},
        height: document.documentElement.clientHeight || document.body.clientHeight
			}
		},
    created() {
      var winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
      window.onresize = () => {
        var thisHeight = document.documentElement.clientHeight || document.body.clientHeight
        // alert(thisHeight)
        if (winHeight - thisHeight > 50) {
          console.log(winHeight)
          console.log(thisHeight)
          this.$refs.contains.style.height = winHeight + 'px'
        }else{
          this.$refs.contains.style.height = '100%'
        }
      }
    },
		mounted() {
      console.log(this.height)
			if(localStorage.getItem('member')){
				let obj = JSON.parse(localStorage.getItem('member'))
				if(obj.memberType == 0){
					this.$router.push('/first')
				}else if(obj.memberType == 1){
					this.$router.push('/police_login')
				}
			}
		},
		components: {
			Toast
		},
		methods: {
			change() {
				this.$router.push('/police')
			},
			goRegister() {
				this.$router.push('/register')
			},
			goForget() {
				this.$router.push('/forget')
			},
			enter() {
				if(this.tel == ''){
					Toast('手机号不能为空')
					return
				}else if(!(/^1[345789]\d{9}$/.test(this.tel))){
					Toast('手机号格式不正确')
					return
				}

				let self = this
				let datas = {
					memberType: 0,
					account: self.tel,
					password: self.password
				}
				Request.postRequest('api/member/member/login', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						Toast('登陆成功')
						localStorage.setItem('member',JSON.stringify(res.data.body.member))
						self.$router.push('/first')
					}else{
						Toast(res.data.msg)
					}
				}).catch(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped="scoped">
  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

	.contain {
		width: 100%;
    height: 100%;
		/* position: absolute;
		left: 0;
		top: 0;
		bottom: 0; */
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
