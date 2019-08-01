<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<div class="result">
			<img src="../../static/img/result.png" alt="">
			<span>已提交管理部门审核</span>
			<span>请耐心等待</span>
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	
	export default {
		data() {
			return {
				text: "已提交"
			}
		},
		components: {
			MainHeader
		},
		mounted() {
			localStorage.removeItem('map')
			localStorage.removeItem('choice')
			localStorage.removeItem('section')
			localStorage.removeItem('idStr')
			localStorage.removeItem('choiceSection')
			localStorage.removeItem('param')
			localStorage.removeItem('show1')
			localStorage.removeItem('show2')
			localStorage.removeItem('ids')
		},
		methods: {
			back() {
				this.$router.push('/first')
			}
		}
	}
</script>

<style scoped="scoped">
	.result {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-items: center;
	}
	
	.result img {
		width: 100px;
		height: 100px;
		margin-top: 2rem;
	}
	
	.result span {
		font-size: 15px;
		color: #333;
		margin-top: 0.5rem;
	}
</style>
