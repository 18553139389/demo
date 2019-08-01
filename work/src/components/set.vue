<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<ul class="list">
			<li style="border-top: 1px solid #eee;" @click="goNew">
				<span>修改密码</span>
				<img src="../../static/img/right.png" alt="">
			</li>
			<li @click="goSuggest">
				<span>意见反馈</span>
				<img src="../../static/img/right.png" alt="">
			</li>
			<li @click="goAgree">
				<span>服务协议</span>
				<img src="../../static/img/right.png" alt="">
			</li>
			<li @click="goLink">
				<span>关于我们</span>
				<img src="../../static/img/right.png" alt="">
			</li>
			<li @click="upDate">
				<span>版本更新</span>
				<img src="../../static/img/right.png" alt="">
			</li>
		</ul>
		<div class="btn" @click="submit">退出登录</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import {
		Dialog,
		Toast
	} from 'vant'

	export default {
		data() {
			return {
				text: '设置'
			}
		},
		components: {
			MainHeader,
			Dialog,
			Toast
		},
		methods: {
			submit() {
				Dialog.confirm({
					title: '退出',
					message: '确认退出登陆吗'
				}).then(() => {
					localStorage.clear()
					this.$router.push('/login')
				}).catch(() => {
					
				});
			},
			goNew() {
				this.$router.push('/new_password')
			},
			goSuggest() {
				this.$router.push('/suggest')
			},
			goAgree() {
				this.$router.push('/agree')
			},
			goLink() {
				this.$router.push('/link')
			},
			upDate() {
				Toast('已是最新版本')
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped="scoped">
	.list {
		width: 100%;
		padding: 72px 0 0;
	}
	.list li {
		width: 100%;
		padding: 0 0.6rem;
		height: 1.3rem;
		line-height: 1.3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
	}

	.list li span {
		font-size: 16px;
		color: #333;
	}

	.list li img {
		width: 22px;
		height: 22px;
	}

	.btn {
		width: 88%;
		margin: 0.7rem auto;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		font-size: 16px;
		color: #fff;
		background: #17ACE6;
		border-radius: 6px;
	}
</style>
