<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<h3>办理须知</h3>
		<div class="title">您需要知道以下情况<span class="look">《查看》</span></div>
		<div class="list1" @click="goBusiness">
			<img src="../../static/img/img1.jpg" alt="">
			<span>企业申请</span>
		</div>
		<div class="list1" @click="goPerson">
			<img src="../../static/img/person.jpg" alt="">
			<span>个人申请</span>
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import {
		Popup,
		Picker,
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				text: '',
				num: 0,
				type: 0
			}
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
		components: {
			
			MainHeader,
			Popup,
			Picker,
			Toast
		},
		created() {
			let obj = localStorage.getItem('personNum')
			let type = localStorage.getItem('timeNum')
			this.num = obj
			this.type = type
      console.log(this.type)
		},
		methods: {
			goBusiness() {
				if(this.type == 2) {
					Toast('服务器维护')
					return
				}
        
        this.$router.push('/business_one')
				
				// if(this.num > 3) {
				// 	Toast('您已超过申请上限')
				// 	return
				// }else{
				// 	this.$router.push('/business_one')
				// }
			},
			goPerson() {
				if(this.type == 2) {
					Toast('服务器维护')
					return
				}
				
				// if(this.num > 3) {
				// 	Toast('您已超过申请上限')
				// 	return
				// }else{
					this.$router.push('/person_one')
				// }
			},
			back() {
				this.$router.push('/first')
			}
		}
	}
</script>

<style scoped="scoped">
	h3 {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 18px;
		color: #333;
	}
	
	.title {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 15px;
		color: #666;
	}
	
	.look {
		color: #18ACF6;
	}
	
	.list1 {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1.8rem 0;
	}
	
	.list1 img {
		width: 120px;
		height: 120px;
	}
	
	.list1 span {
		font-size: 16px;
		color: #333;
		margin-top: 0.4rem;
	}
</style>
