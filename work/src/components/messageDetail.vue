<template>
	<div>
		<div class="contain">
			<div class="top">
				<van-icon name="arrow-left" size="24px" @click="back" />
				<span>{{title}}</span>
			</div>
			<p>{{content}}</p>
		</div>
		<div class="load" v-if="load">
			<van-loading type="spinner" color="white" />
		</div>
	</div>
</template>

<script>
	import Request from '@util/request'
	import {
		Icon,
		Loading
	} from 'vant'

	export default {
		data() {
			return {
				title: '',
				content: '',
				uid: '',
				load: false
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
				var ids = this.$route.params.id
				let self = this
				this.load = true
				let datas = {
					uid: self.uid
				}
				Request.postRequest('api/platform/tPlatformInfo/list', datas).then(res => {
					if (res.data.success == true) {
						for(let i=0;i<res.data.body.list.length;i++){
							if(res.data.body.list[i].id == ids){
								self.load = false
								self.title = res.data.body.list[i].heading
								self.content = res.data.body.list[i].content
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
	
	.load {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
