<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<div class="contain">
			<div class="all" v-for="(v,k) in list" :key="k">
				<div class="logo">
					<img :src="v.headImage" alt="">
				</div>
				<h2>通行证管理系统</h2>
				<ul class="list">
					<li>
						<span>软件版权</span>
						<p style="color: #999;">{{v.companyName}}</p>
					</li>
					<li style="height: auto;padding:0.3rem 0.6rem;align-items: flex-start;">
						<span style="line-height: 20px;">地址</span>
						<!-- <p style="color: #999;">{{v.companyAddress}}</p> -->
						<p style="color: #999;line-height: 20px;">山东省青岛市即墨区鳌山卫街道办事处海科创业中心C楼5层</p>
					</li>
					<li>
						<span>电话</span>
						<p style="color: #999;">{{v.mobile}}</p>
					</li>
					<li>
						<span>邮箱</span>
						<p style="color: #999;">{{v.email}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	
	export default {
		data() {
			return {
				text: '联系我们',
				list: [],
				uid: ''
			}
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		components: {
			MainHeader
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
				Request.postRequest('api/aboutus/aboutUs/us', data).then(res => {
					console.log(res)
					if (res.data.success == true) {
						self.list.push(res.data.body.us)
					}
					console.log(self.list)
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
		border-top: 1px solid #eee;
	}
	
	.all {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.logo {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		margin-top: 2.8rem;
	}
	
	.logo img {
		width: 100%;
		height: 100%;
	}
	
	h2 {
		width: 100%;
		height: 1.3rem;
		line-height: 1.3rem;
		text-align: center;
		font-size: 16px;
		color: #333;
	}
	
	.list {
		width: 100%;
		margin-top: 0.8rem;
	}
	
	.list li {
		width: 100%;
		padding: 0 0.6rem;
		height: 1.3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
	}
	
	.list li span {
		display: inline-block;
		width: 30%
	}
	
	.list li span, .list li p {
		font-size: 16px;
		color: #333;
	}
	
	.list li img {
		width: 22px;
		height: 22px;
	}
</style>
