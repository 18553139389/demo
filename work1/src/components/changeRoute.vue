<template>
	<div v-cloak>
		<main-header :text="text" @back="back"></main-header>
		<!-- <div class="step">
			<el-steps :active="active">
				<el-step title="基本信息"></el-step>
				<el-step title="相关证件"></el-step>
				<el-step title="公司信息"></el-step>
				<el-step title="提交"></el-step>
			</el-steps>
		</div> -->
		<!-- <div class="select"></div> -->
		<scroll :click="clicks" class="wrapper_box">
			<ul class="list">
				<li>
					<span>通行证类型</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{listData.categoryName}}</span>
					</div>
				</li>
				<li>
					<span>运营类型</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{listData.operateType}}</span>
					</div>
				</li>
				<li>
					<span>号牌种类</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{listData.platesCategory}}</span>
					</div>
				</li>
				<li>
					<span>车牌号码</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<input type="text" placeholder="请输入" disabled="disabled" :value="listData.platesNumber" />
					</div>
				</li>
				<li @click="see_seven" v-if="path_type">
					<span>通行路线</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{path_type}}</span>
					</div>
				</li>
				<li @click="see_eight" v-if="path_section">
					<span>通行区域</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{path_section}}</span>
					</div>
				</li>
				<li>
					<span>运送货物名称</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{listData.carriedGoodsName}}</span>
					</div>
				</li>
				<li>
					<span>通行证开始时间</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{listData.startDate}}</span>
					</div>
				</li>
				<li>
					<span>通行证结束时间</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{listData.endDate}}</span>
					</div>
				</li>
				<li @click="see_five">
					<span>通行时间</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{timer}}</span>
					</div>
				</li>
				<li>
					<span>目的地</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<input type="text" placeholder="请输入" disabled="disabled" :value="listData.destination" />
					</div>
				</li>
			</ul>
			<template v-if="show_five">
				<van-popup v-model="show_five" position="bottom" :overlay="true">
					<van-picker show-toolbar :columns="columns_five" @confirm="change_five" @cancel="cancel_five" />
				</van-popup>
			</template>
		</scroll>
		<div class="time_bg" v-if="show_five">
			<div class="times">
				<div class="times_top">
					<span @click="cancel_five">取消</span>
					<span @click="change_five">确认</span>
				</div>
				<div class="times_list">
					<div class="time_scroll" ref="times">
						<div class="c_list">
							<van-checkbox-group v-model="result">
								<van-cell-group>
									<van-cell v-for="(item, index) in columns_five" clickable :key="item" :title="`${item}`" @click="toggle(index)">
										<van-checkbox :name="item" ref="checkboxes" />
									</van-cell>
								</van-cell-group>
							</van-checkbox-group>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="submit">完成</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import Scroll from '@/components/component/scroll'
	import BScroll from 'better-scroll'
	import {
		Step,
		Steps
	} from 'element-ui'
	import {
		Popup,
		Picker,
		Toast
	} from 'vant'

	export default {
		data() {
			return {
				text: '变更通行证',
				active: 0,
				show_five: false,
				path_type: '请选择',
				path_section: '请选择',
				path_ids: '',
				timer: '',
				section: '',
				columns_five: [],
				clicks: true,
				listData: {},
				sureData: [],
				uid: '',
				ids: '',
				group: [],
				result: []
			}
		},
		components: {
			MainHeader,
			Step,
			Steps,
			Scroll
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		mounted() {
			if (this.$route.params.id) {
				this.ids = this.$route.params.id
			}
			this.init()
		},
		methods: {
			init() {
				let self = this
				let ids = this.$route.params.id
				let datas = {
					uid: self.uid,
					id: self.ids
				}
				Request.postRequest('api/licence/tPermit/toUpdate', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						self.listData = res.data.body.permit
						if(localStorage.getItem('mapPath')){
							self.path_type = localStorage.getItem('mapPath')
						}else{
							self.path_type = res.data.body.permit.routesPassage
						}
						if(localStorage.getItem('mapSection')){
							self.path_section = localStorage.getItem('mapSection')
							let section = JSON.parse(localStorage.getItem('sectionList'))
							for(let i = 0;i < section.length;i++){
								self.path_ids += section[i].id + ','
							}
							self.path_ids = self.path_ids.substr(0,self.path_ids.length-1)
							console.log(self.path_ids)
						}else{
							self.path_section = ''
							Request.postRequest('api/licence/region/list').then(response => {
								if (response.data.success == true) {
									if (response.data.body !== undefined || response.data.body !== {}) {
										self.path_ids = res.data.body.regions
										if(res.data.body.regions.indexOf(',') > -1) {
											for (let i = 0; i < response.data.body.list.length; i++) {
												let arr = []
												arr = res.data.body.regions.split(',')
												for(let k = 0;k < arr.length; k++) {
													if(response.data.body.list[i].id == arr[k]){
														self.path_section += response.data.body.list[i].name + ','
													}
												}
												self.path_section = self.path_section.substr(0,self.path_section.length-1)
											}
										}else{
											for (let i = 0; i < response.data.body.list.length; i++) {
												if(response.data.body.list[i].id == res.data.body.regions){
													self.path_section += response.data.body.list[i].name
												}
											}
										}
										console.log(self.path_section)
									}
								}
							})
						}
						self.section = res.data.body.permit.office.name
						self.timer = res.data.body.permit.timePassage
						for(let i =0;i<res.data.body.time.length;i++){
							self.columns_five.push(res.data.body.time[i].remarks + '  ' + res.data.body.time[i].startTime + '-' + res.data.body.time[i].endTime)
						}
					}
				}).catch(res => {
					console.log(res)
				})
			},
			see_five() {
				this.show_five = true
				this.result.push(this.columns_five[0])
				this.show_five = true
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.times, {
							startY: 0,
							click: true,
							scrollY: true,
							scrollX: false,
							eventPassthrough: "horizontal"
						})
						console.log(this.scroll)
					}
				})
			},
			toggle(index) {
				console.log(this.result)
				console.log(index)
			},
			see_seven() {
				let self = this
				this.$router.push({
					name: 'change_path',
					params: {
						id: self.ids
					}
				})
			},
			see_eight() {
				let self = this
				this.$router.push({
					name: 'change_section',
					params: {
						id: self.ids
					}
				})
			},
			change_five() {
				this.show_five = false
				var str = this.result.join(',')
				console.log(str)
				this.timer = str
			},
			cancel_five() {
				this.show_five = false
			},
			submit() {
				let self = this
				let datas = {
					uid: self.uid,
					id: self.ids,
					timePassage: self.timer,
					routesPassage: self.path_type,
					regions: self.path_ids
				}
				Request.postRequest('api/licence/tPermit/update', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						Toast('提交成功')
						localStorage.removeItem('mapPath')
						localStorage.removeItem('choicePath')
						localStorage.removeItem('mapSection')
						localStorage.removeItem('changeIds')
						localStorage.removeItem('sectionList')
						self.$router.push('/management')
					}else{
						Toast(res.data.msg)
					}
				}).catch(res => {
					console.log(res)
				})
			},
			back() {
				localStorage.removeItem('mapPath')
				localStorage.removeItem('choicePath')
				localStorage.removeItem('mapSection')
				localStorage.removeItem('changeIds')
				localStorage.removeItem('sectionList')
				this.$router.push('/management')
			}
		}
	}
</script>

<style scoped="scoped">
	.step {
		width: 100%;
		padding: 72px 0.6rem 0;
		box-sizing: border-box;
	}

	.wrapper_box {
		width: 100%;
		position: absolute;
		top: 72px;
		bottom: 40px;
		left: 0;
		overflow: hidden;
	}

	.select {
		width: 100%;
		border-top: 10px solid #f2f2f2;
		margin-top: 0.3rem;
	}

	.list {
		width: 100%;
		padding: 0 0.6rem;
		box-sizing: border-box;
	}

	.list>li {
		width: 100%;
		height: 1.3rem;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list>li>span {
		font-size: 16px;
		color: #999;
		display: inline-block;
		width: 45%;
	}

	.choice {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		width: 55%;
	}

	.choice span {
		display: inline-block;
		font-size: 16px;
		color: #999;
		margin-right: 10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.choice img {
		width: 20px;
		height: 20px;
	}

	.choice input {
		color: #999;
		font-size: 16px;
		border: none;
		margin-right: 10px;
		text-align: right;
		width: 50%;
		background: #fff !important;
	}

	.submit {
		width: 100%;
		padding: 0 0.6rem;
		box-sizing: border-box;
	}

	.next {
		width: 100%;
		height: 1rem;
		background: #18ACF6;
		font-size: 16px;
		color: #fff;
		margin-top: 0.8rem;
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

	[v-cloak] {
		display: none !important;
	}
	
	.time_bg {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 9999;
	}
	
	.times {
		width: 100%;
		height: 264px;
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	
	.times_top {
		width: 100%;
		height: 44px;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.times_top>span {
		padding: 0 0.4rem;
		color: #1989fa;
		font-size: 0.373rem;
	}
	
	.times_list {
		width: 100%;
		height: 220px;
		position: absolute;
		top: 1.173rem;
		left: 0;
		z-index: 9999;
	}
	
	.time_scroll {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		background: #fff;
	}
	
	.c_list {
		width: 100%;
		height: 300px;
		display: flex;
		flex-direction: column;
	}
</style>
