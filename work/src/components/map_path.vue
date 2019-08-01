<template>
	<div>
		<main-header :text="text" :image="image" @map="goMap" @back="back"></main-header>
		<div class="contains">
			<div class="title">全部路线</div>
			<scroll :click="clicks" class="left">
				<ul class="all_path">
					<li v-for="(v,index) in list" :key="index" @click="add(v.id)">
						<span>{{v.name}}</span>
						<img src="../../static/img/go.png" alt="">
					</li>
				</ul>
			</scroll>
		</div>
		<div class="choices">
			<div class="title">已选路线</div>
			<scroll :click="clicks" class="left">
				<ul class="all_path">
					<li v-for="(v,index) in choiceList" :key="index" @click="reduce(v.id)">
						<span>{{v.name}}</span>
						<img src="../../static/img/delete.png" alt="">
					</li>
				</ul>
			</scroll>
		</div>
		<div class="btn" @click="submit">下一步</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import Scroll from '@/components/component/scroll'
	import {
		Toast
	} from 'vant'
	
	const src = require('../../static/img/map_icon.png')
	export default {
		data() {
			return {
				text: '选择通行路线',
				image: src,
				clicks: true,
				list: [],
				choiceList: [],
				ids: '',
				arr1: []
			}
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		mounted() {
			console.log(this.$route.params.id)
			console.log(localStorage.getItem('ids'))
			let mapId = localStorage.getItem('ids')
			if(this.$route.params.id != mapId){
				localStorage.removeItem('choice')
			}else if(this.$route.params.id == mapId){
				if (localStorage.getItem('choice')) {
					this.choiceList = JSON.parse(localStorage.getItem('choice'))
				}
			}
			this.init()
		},
		computed: {
			newList() {
				return this.choiceList
			}
		},
		components: {
			MainHeader,
			Scroll,
			Toast
		},
		methods: {
			init() {
				this.ids = this.$route.params.id
				let type = this.$route.params.type
				console.log(this.ids,type)
				let self = this
				let datas = {
					uid: self.uid,
					applyType: type
				}
				Request.postRequest('api/licence/tPermit/init', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						if (res.data.body !== undefined || res.data.body !== {}) {
							for (let i = 0; i < res.data.body.categorys.length; i++) {
								if (self.ids == res.data.body.categorys[i].id) {
									// self.list = res.data.body.categorys[i].routeList
									for(let j=0;j<res.data.body.categorys[i].routeList.length;j++){
										self.list.push(res.data.body.categorys[i].routeList[j])
									}
								}
							}
						}
					}
				}).catch(res => {
					console.log(res)
				})
				
				// Request.postRequest('api/licence/region/list?id='+this.ids).then(res => {
				// 	console.log(res,'区域添加')
				// 	if (res.data.success == true) {
				// 		if (res.data.body !== undefined || res.data.body !== {}) {
				// 			for (let i = 0; i < res.data.body.list.length; i++) {
				// 				self.list.push(res.data.body.list[i])
				// 			}
				// 		}
				// 	}
				// }).catch(res => {
				// 	console.log(res)
				// })
			},
			submit() {
				let str = ''
				for (let i = 0; i < this.choiceList.length; i++) {
					str += this.choiceList[i].name + ','
				}
				str = str.substring(0, str.length - 1)
				localStorage.setItem('map', str)
				localStorage.setItem('choice', JSON.stringify(this.choiceList))
				let self = this
				this.$router.push({
					name: 'business_one',
					params: {
						id: self.ids
					}
				})
				localStorage.setItem('ids',self.ids)
			},
			add(id) {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].id == id) {
						this.choiceList.push(this.list[i])
					}
				}
				//数组去重的reduce方法
				let hash = {}
				let resultarr = this.choiceList.reduceRight((item, next) => {
					hash[next.id] ? '' : hash[next.id] = true && item.push(next);
					return item
				}, []);
				this.choiceList = resultarr
			},
			reduce(id) {
				for (let i = 0; i < this.choiceList.length; i++) {
					if (this.choiceList[i].id == id) {
						this.choiceList.splice(i, 1)
					}
				}
			},
			goMap() {
				let str = ''
				for (let i = 0; i < this.choiceList.length; i++) {
					str += this.choiceList[i].name + ','
				}
				str = str.substring(0, str.length - 1)
				localStorage.setItem('map', str)
				localStorage.setItem('choice', JSON.stringify(this.choiceList))
				let self = this
				let type = this.$route.params.type
				this.$router.push({
					name: 'map',
					params: {
						id: self.ids,
						type: type,
						path: 0,
					}
				})
				localStorage.setItem('ids',self.ids)
			},
			back() {
				let self = this
				this.$router.push({
					name: 'business_one',
					params: {
						id: self.ids
					}
				})
				localStorage.setItem('ids',self.ids)
			}
		}
	}
</script>

<style scoped="scoped">
	.contains {
		width: 50%;
		display: flex;
		border-top: 1px solid #eee;
		position: absolute;
		top: 2.3rem;
		left: 0;
		bottom: 40px;
		overflow: hidden;
	}

	.choices {
		width: 50%;
		display: flex;
		border-top: 1px solid #eee;
		position: absolute;
		top: 2.3rem;
		left: 50%;
		bottom: 40px;
		overflow: hidden;
	}

	.left {
		width: 100%;
		position: absolute;
		top: 1.2rem;
		left: 0;
		bottom: 0;
		border-right: 1px solid #eee;
		overflow: hidden;
		box-sizing: border-box;
	}

	.title {
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		font-size: 15px;
		color: #333;
		border-bottom: 1px solid #eee;
		border-right: 1px solid #eee;
		box-sizing: border-box;
	}

	.all_path {
		width: 100%;
		padding: 0 0.3rem;
		box-sizing: border-box;
	}

	.all_path li {
		width: 100%;
		/* height: 40px; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 0 0;
	}

	.all_path li>span {
		font-size: 15px;
		color: #333;
	}

	.all_path li>img {
		width: 22px;
		height: 22px;
	}

	.btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		color: #fff;
		background: #17ACE6;
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
	}
</style>
