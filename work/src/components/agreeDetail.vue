<template>
	<div>
		<div class="contain">
			<div class="top">
				<van-icon name="arrow-left" size="24px" @click="back" />
				<span>{{title}}</span>
			</div>
			<p>{{content}}</p>
		</div>
	</div>
</template>

<script>
	import Request from '@util/request'
	import {
		Icon
	} from 'vant'

	export default {
		data() {
			return {
				title: '',
				content: '',
				uid: '',
			}
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
				let ids = this.$route.params.id
				let self = this
				let data = {
					uid: self.uid
				}
				Request.postRequest('api/protocalall/protocalAll', data).then(res => {
					if (res.data.success == true) {
						for (let i = 1; i < res.data.body.protocal.length; i++) {
							if (res.data.body.protocal[i].id == ids) {
								self.title = res.data.body.protocal[i].type
								self.content = res.data.body.protocal[i].content
							}
						}
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
	}

	.top {
		width: 100%;
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 18px;
		color: #333;
		border-bottom: 1px solid #eee;
		position: fixed;
		top: 24px;
		left: 0;
		display: flex;
		align-items: center;
		padding: 0 0.4rem;
		box-sizing: border-box;
	}

	.top span {
		font-size: 18px;
		color: #333;
		display: inline-block;
		margin-left: 8px;
	}

	p {
		width: 100%;
		padding: 82px 0.4rem 0;
		box-sizing: border-box;
		font-size: 15px;
		color: #333;
		line-height: 22px;
		text-align: justify;
	}
</style>
