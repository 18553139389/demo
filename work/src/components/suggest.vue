<template>
	<div class="all">
		<main-header :text="text" @back="back"></main-header>
		<div class="contain">
			<h3 class="title">反馈描述</h3>
			<div class="content">
				<textarea v-model="datas" placeholder="150字以内"></textarea>
			</div>
			<div class="btn" @click="submit">提交</div>
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
				text: '意见反馈',
				datas: '',
				uid: ''
			}
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		components: {
			MainHeader,
			Toast
		},
		methods: {
			submit() {
				if (this.datas == '') {
					Toast('内容不能为空')
					return
				}

				if (this.datas.length > 150) {
					Toast('文字内容不能超过150字')
					return
				}

				let self = this
				let data = {
					uid: self.uid,
					feedbackContent: self.datas
				}
				Request.postRequest('api/feedback/feedback/submit', data).then(res => {
					if (res.data.success == true) {
						Toast('反馈成功')
						self.datas = ''
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
	.all {
		width: 100%;
		height: 100%;
	}

	.contain {
		width: 100%;
		position: absolute;
		top: 1.8rem;
		left: 0;
		bottom: 0;
		background: rgb(248, 248, 248);
	}

	.title {
		width: 100%;
		padding: 0.8rem 0.6rem;
		box-sizing: border-box;
		font-size: 15px;
		color: #333;
	}

	.content {
		width: 88%;
		margin: 0 auto;
		height: 50%;
		background: #fff;
		border-radius: 16px;
		padding: 0.5rem;
		box-sizing: border-box;
	}

	textarea {
		font-size: 15px;
		font-size: #666;
		width: 100%;
		height: 100%;
		resize: none;
	}

	.btn {
		width: 88%;
		margin: 1rem auto 0;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		font-size: 16px;
		color: #fff;
		background: #17ACE6;
		border-radius: 6px;
	}
</style>
