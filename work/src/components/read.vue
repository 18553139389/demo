<template>
	<div class="box">
		<main-header :text="text" @back="back"></main-header>
		<scroll :click="clicks" class="wrapper_box">
			<div v-html="content"></div>
		</scroll>
		<div class="agree">
			<div class="no" @click="back">不同意</div>
			<div class="pass" @click="goAgree">同意</div>
		</div>
		<div class="loading" v-if="content == ''">
			<van-loading type="spinner" color="white" />
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Scroll from '@/components/component/scroll'
	import Request from '@util/request'
	import {
		Toast,
		Loading
	} from 'vant'

	export default {
		data() {
			return {
				text: '办理须知',
				content: '',
				clicks: true,
			}
		},
		components: {
			MainHeader,
			Scroll
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				var self = this
				Request.postRequest('api/notice').then(res => {
					console.log(res)
					if (res.data.success == true) {
						self.content = res.data.body.notice.content
					}
				}).catch(res => {
					Toast('获取失败')
				})
			},
			back() {
				this.$router.go(-1)
			},
			goAgree() {
				this.$router.push('/type')
			}
		}
	}
</script>

<style scoped="scoped">
	.wrapper_box {
		width: 100%;
		position: absolute;
		top: 72px;
		bottom: 46px;
		left: 0;
		right: 0;
		overflow: hidden;
		border-top: 1px solid #eee;
		padding: 12px 0.6rem 0;
		box-sizing: border-box;
	}

	.agree {
		width: 100%;
		height: 46px;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
	}

	.agree>div {
		width: 50%;
		height: 46px;
		line-height: 46px;
		text-align: center;
		font-size: 15px;
		color: #fff;
	}

	.pass {
		background: #18ACF6;
	}

	.no {
		background: #999;
	}

	.loading {
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
