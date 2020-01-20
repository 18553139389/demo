<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<ul class="list" style="border-top: 1px solid #eee;">
			<li v-for="(v,k) in list" :key="k" @click="goDetail(v.id)">
				<span>{{v.type}}</span>
				<img src="../../static/img/right.png" alt="">
			</li>
		</ul>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import {
		Dialog
	} from 'vant'

	export default {
		data() {
			return {
				text: '服务协议',
				uid: '',
				list: []
			}
		},
		components: {
			MainHeader,
			Dialog
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data = {
					uid: self.uid
				}
				Request.postRequest('api/protocalall/protocalAll', data).then(res => {
					if (res.data.success == true) {
						for (let i = 1; i < res.data.body.protocal.length; i++) {
							self.list.push(res.data.body.protocal[i])
						}
					}
				}).catch(res => {
					console.log(res)
				})
			},
			back() {
				this.$router.go(-1)
			},
			goDetail(id) {
				this.$router.push({
					name: 'agreeDetail',
					params: {
						id: id
					}
				})
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
</style>
