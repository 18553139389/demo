<template>
	<div>
		<main-header :text="text" :datas="datas" @set="set" @back="back"></main-header>
		<ul class="contain">
			<li class="list">
				<span>头像</span>
				<div class="imgs">
					<van-uploader :after-read="onLoad">
						<div class="left">
							<img :src="image !== '' ? image : '../../static/img/touxiang.jpg'" alt="">
						</div>
					</van-uploader>
					<img class="right" src="../../static/img/xiangyou.jpg" alt="">
				</div>
			</li>
			<li class="content">
				<span>真实姓名</span>
				<div class="c_right">
					<img src="../../static/img/bianji.jpg" alt="">
					<input type="text" placeholder="请输入" v-model="user">
				</div>
			</li>
			<li class="content" style="border: none;" @click="goBind">
				<span>绑定手机号</span>
				<div class="c_right">
					<img src="../../static/img/right.png" alt="">
					<span>{{tel}}</span>
				</div>
			</li>
			<li class="line"></li>
			<li class="content">
				<span>身份证号</span>
				<div class="c_right">
					<img src="../../static/img/right.png" alt="">
					<span>{{idcard}}</span>
				</div>
			</li>
		</ul>
		<div class="btn" @click="submit">提交</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import {Uploader} from 'vant'
	import Request from '@util/request'
	import {Toast} from 'vant'
	
	
	export default {
		data() {
			return {
				text: '个人资料',
				datas: '设置',
				image: '',
				user: '',
				tel: '',
				idcard: '',
				uid: ''
			}
		},
		components: {
			MainHeader,
			Uploader
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let param = JSON.parse(localStorage.getItem('member'))
				self.image = param.headImage
				self.user = param.name
				self.tel = param.account
				self.idcard = param.idcard
				self.uid = param.id
			},
			onLoad(item) {
				let self = this
				var formdata = new FormData()
				formdata.append('file',item.file)
				Request.postRequest('api/upload', formdata).then(res => {
					console.log(res)
					if (res.data.success == true) {
						self.image = res.data.body.list[0]
					}
				}).catch(res => {
					console.log(res)
				})
			},
			set() {
				this.$router.push('/set')
			},
			goBind() {
				this.$router.push('/bind_phone')
			},
			submit() {
				let self = this
				let datas = {
					uid: this.uid,
					headImage: this.image,
					name: this.user
				}
				Request.postRequest('api/member/member/updateMemberInfo', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						Toast('修改成功')
						localStorage.setItem('member',JSON.stringify(res.data.body.member))
					}else{
						Toast('修改失败')
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
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0.5rem 0;
		box-sizing: border-box;
	}
	
	.list {
		width: 100%;
		padding: 72px 0.6rem 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.6rem;
	}
	
	.imgs {
		display: flex;
		align-items: center;
	}
	
	.left {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 0.4rem;
	}
	
	.left img {
		width: 100%;
		height: 100%;
	}
	
	.right {
		width: 12px;
		height: 22px;
	}
	
	.list span {
		font-size: 16px;
		color: #333;
	}
	
	.content {
		width: 88%;
		height: 1.4rem;
		line-height: 1.4rem;
		border-bottom: 1px solid #eee;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.content span {
		font-size: 16px;
		color: #999;
	}
	
	.c_right {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}
	
	.c_right img {
		width: 20px;
		height: 22px;
	}
	
	.c_right input {
		border: none;
		text-align: right;
		font-size: 16px;
		color: #999;
		margin-right: 0.3rem;
	}
	
	.line {
		width: 100%;
		height: 10px;
		background: rgb(243,241,243);
	}
	
	.btn {
		width: 88%;
		margin: 0.5rem auto;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		font-size: 16px;
		color: #fff;
		background: #17ACE6;
		border-radius: 6px;
	}
</style>
