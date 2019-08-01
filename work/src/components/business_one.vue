<template>
	<div v-cloak>
		<main-header :text="text" @back="back"></main-header>
		<div class="step">
			<el-steps :active="active">
				<el-step title="基本信息"></el-step>
				<el-step title="相关证件"></el-step>
				<el-step title="公司信息"></el-step>
				<el-step title="提交"></el-step>
			</el-steps>
		</div>
		<div class="select"></div>
		<scroll :click="clicks" class="wrapper_box">
			<ul class="list">
				<li @click="see_one">
					<span>通行证类型</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{car_type}}</span>
					</div>
				</li>
				<li @click="see_two">
					<span>运营类型</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{choice_type}}</span>
					</div>
				</li>
				<li @click="see_three">
					<span>号牌种类</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{card_type}}</span>
					</div>
				</li>
				<li>
					<span>车牌号码</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<input v-model="car_num" type="text" placeholder="请输入" />
					</div>
				</li>
				<li @click="see_seven" v-if="show1">
					<span>通行路线</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{path_type}}</span>
					</div>
				</li>
				<li @click="see_eight" v-if="show2">
					<span>通行区域</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{path_section}}</span>
					</div>
				</li>
				<li @click="see_four">
					<span>运送货物名称</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{nick_name}}</span>
					</div>
				</li>
				<li @click="showStart">
					<span>通行证开始时间</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{start}}</span>
					</div>
				</li>
				<li @click="showEnd">
					<span>通行证结束时间</span>
					<div class="choice">
						<img src="../../static/img/right.png" alt="">
						<span>{{end}}</span>
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
						<input type="text" placeholder="请输入" v-model="location" />
					</div>
				</li>
			</ul>
			<template v-if="show_one">
				<van-popup v-model="show_one" position="bottom" :overlay="true">
					<van-picker show-toolbar :columns="columns_one" @confirm="change_one" @cancel="cancel_one" />
				</van-popup>
			</template>
			<template v-if="show_two">
				<van-popup v-model="show_two" position="bottom" :overlay="true">
					<van-picker show-toolbar :columns="columns_two" @confirm="change_two" @cancel="cancel_two" />
				</van-popup>
			</template>
			<template v-if="show_three">
				<van-popup v-model="show_three" position="bottom" :overlay="true">
					<van-picker show-toolbar :columns="columns_three" @confirm="change_three" @cancel="cancel_three" />
				</van-popup>
			</template>
			<template v-if="show_four">
				<van-popup v-model="show_four" position="bottom" :overlay="true">
					<van-picker show-toolbar :columns="columns_four" @confirm="change_four" @cancel="cancel_four" />
				</van-popup>
			</template>
			<template v-if="show_six">
				<van-popup v-model="show_six" position="bottom" :overlay="true">
					<van-picker show-toolbar :columns="columns_six" @confirm="change_six" @cancel="cancel_six" />
				</van-popup>
			</template>
			<template v-if="shows1">
				<van-popup v-model="shows1" position="bottom" :overlay="false">
					<van-datetime-picker v-model="currentTime" type="datetime" :min-date="minDate" @cancel="cancelStart" @confirm="confirmStart" />
				</van-popup>
			</template>
			<template v-if="shows2">
				<van-popup v-model="shows2" position="bottom" :overlay="false">
					<van-datetime-picker v-model="currentTime" type="datetime" :min-date="minDate" @cancel="cancelStart1" @confirm="confirmStart1" />
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
		<div class="btn" @click="submit">下一步</div>
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
				text: '企业申请',
				active: 0,
				currentTime: new Date(),
				minDate: new Date(),
				shows1: false,
				shows2: false,
				show_one: false,
				show_two: false,
				show_three: false,
				show_four: false,
				show_five: false,
				show_six: false,
				location: '',
				car_type: '请选择',
				choice_type: '请选择',
				card_type: '请选择',
				nick_name: '请选择',
				timer: '请选择',
				section: '请选择',
				sectionId: '',
				startTime: '请选择',
				endTime: '请选择',
				path_type: '请选择',
				path_section: '请选择',
				sections: '',
				columns_one: [],
				columns_two: [],
				columns_three: [],
				columns_four: [],
				columns_five: [],
				columns_six: [],
				car_num: '',
				start: '请选择',
				end: '请选择',
				days: '',
				clicks: true,
				listData: {},
				sureData: [],
				uid: '',
				ids: '',
				group: [],
				time1: false,
				currentDate: new Date(),
				result: [],
				show1: true,
				show2: true
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
			if(!localStorage.getItem('show1')){
				localStorage.setItem('show1',1)
			}
			if(!localStorage.getItem('show2')){
				localStorage.setItem('show2',1)
			}
			this.uid = obj.id
		},
		mounted() {
			if (this.$route.params.id) {
				this.ids = this.$route.params.id
				console.log(this.ids, '有数据吗')
			}
			console.log(this.$route.params.id)
			if (localStorage.getItem('param')) {
				let param = JSON.parse(localStorage.getItem('param'))
				this.car_num = param.platesNumber
				this.days = param.effectiveDays
				this.start = param.startDate
				this.end = param.endDate
				this.location = param.destination
				this.car_type = param.categoryName
				this.choice_type = param.operateType
				this.card_type = param.platesCategory
				if (localStorage.getItem('map')) {
					this.path_type = localStorage.getItem('map')
				}
				if (localStorage.getItem('section')) {
					this.path_section = localStorage.getItem('section')
				}
				if (localStorage.getItem('idStr')) {
					this.sections = localStorage.getItem('idStr')
				}
				this.nick_name = param.carriedGoodsName
				this.timer = param.timePassage
				this.section = param.section
				localStorage.setItem('param', JSON.stringify(param))
				this.init()
			} else {
				this.init()
			}
		},
		methods: {
			showStart() {
				this.shows1 = true
			},
			cancelStart() {
				this.shows1 = false
			},
			confirmStart(val) {
				this.shows1 = false
				this.start = this.dateFtt("yyyy-MM-dd hh:mm", val)
			},
			showEnd() {
				this.shows2 = true
			},
			cancelStart1() {
				this.shows2 = false
			},
			confirmStart1(val) {
				this.shows2 = false
				this.end = this.dateFtt("yyyy-MM-dd hh:mm", val)
			},
			dateFtt(fmt, date) { //author: meizz   
				var o = {
					"M+": date.getMonth() + 1, //月份   
					"d+": date.getDate(), //日   
					"h+": date.getHours(), //小时   
					"m+": date.getMinutes(), //分   
					"s+": date.getSeconds(), //秒   
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
					"S": date.getMilliseconds() //毫秒   
				}
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
				return fmt
			},
			init() {
				let self = this
				let datas = {
					uid: self.uid,
					applyType: 0
				}
				Request.postRequest('api/licence/tPermit/init', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						if (res.data.body !== undefined || res.data.body !== {}) {
							self.listData = res.data.body
							for (let i = 0; i < self.listData.categorys.length; i++) {
								self.columns_one.push({
									id: self.listData.categorys[i].id,
									text: self.listData.categorys[i].name
								})
							}
							if (this.ids) {
								for (let i = 0; i < this.listData.categorys.length; i++) {
									if (this.ids == this.listData.categorys[i].id) {
										this.sureData = this.listData.categorys[i]
									}
								}
								if(this.sureData.operated == '0,'){
									this.columns_two.push({
										id: 0,
										text: '运营'
									})
								}else if(this.sureData.operated == '1,'){
									this.columns_two.push({
										id: 1,
										text: '非运营'
									})
								}else if(this.sureData.operated == '0,1,' || this.sureData.operated == '1,0,'){
									this.columns_two.push({
										id: 0,
										text: '运营'
									})
									this.columns_two.push({
										id: 1,
										text: '非运营'
									})
								}
								for (let i = 0; i < this.sureData.numberList.length; i++) {
									this.columns_three.push(this.sureData.numberList[i].name)
								}
								let obj = {}
								let peon = this.listData.carrige.reduce((cur, next) => {
									obj[next.name] ? "" : obj[next.name] = true && cur.push(next);
									return cur;
								}, []) //设置cur默认类型为数组，并且初始值为空的数组
								for (let i = 0; i < peon.length; i++) {
									this.columns_four.push(peon[i].name)
								}
								for (let i = 0; i < this.sureData.timeList.length; i++) {
									this.columns_five.push(this.sureData.timeList[i].remarks + '   ' + this.sureData.timeList[i].startTime + '-' +
										this.sureData.timeList[i].endTime)
								}
								
								if(localStorage.getItem('show1') == 0){
									this.show1 = 0
									this.path_type = ''
								}
								
								if(localStorage.getItem('show2') == 0){
									this.show2 = 0
									this.path_section = ''
								}
							}
						}
					}
				}).catch(res => {
					console.log(res)
				})
			},
			clearAll() {
				this.choice_type = '请选择'
				this.card_type = '请选择'
				this.nick_name = '请选择'
				this.timer = '请选择'
				this.section = '请选择'
				this.choice_type = '请选择'
				this.columns_two = []
				this.columns_three = []
				this.columns_four = []
				this.columns_five = []
				this.columns_six = []
				this.car_num = ''
				this.days = ''
				this.location = '',
				this.path_type = '请选择',
				this.path_section = '请选择',
				this.start = '请选择',
				this.end = '请选择'
			},
			see_one() {
				this.show_one = true
			},
			see_two() {
				this.show_two = true
			},
			see_three() {
				this.show_three = true
			},
			see_four() {
				this.show_four = true
			},
			see_five() {
				console.log(this.columns_five)
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
			see_six() {
				if (this.path_type == '请选择' || this.path_type == '') {
					Toast('请先选择路线')
					return
				}
				this.columns_six = []
				let branch = JSON.parse(localStorage.getItem('choice'))
				let obj = {}
				let peon = branch.reduce((cur, next) => {
					obj[next.office.name] ? "" : obj[next.office.name] = true && cur.push(next);
					return cur;
				}, []) //设置cur默认类型为数组，并且初始值为空的数组
				console.log(branch, '55555')
				for (let i = 0; i < peon.length; i++) {
					this.columns_six.push({
						id: peon[i].office.id,
						text: peon[i].office.name
					})
				}
				console.log(this.columns_six, '去重复列表')
				this.show_six = true
			},
			see_seven() {
				if (localStorage.getItem('param')) {
					let datas = JSON.parse(localStorage.getItem('param'))
					datas.platesNumber = this.car_num
					datas.effectiveDays = this.days
					datas.startDate = this.start
					datas.endDate = this.end
					datas.destination = this.location
					datas.categoryName = this.car_type
					datas.operateType = this.choice_type
					datas.platesCategory = this.card_type
					datas.routesPassage = this.path_type
					datas.regionIds = this.sections
					datas.carriedGoodsName = this.nick_name
					datas.timePassage = this.timer
					datas.office = this.section
					localStorage.setItem('param', JSON.stringify(datas))
				} else {
					let obj = {
						applyType: 0,
						platesNumber: this.car_num,
						effectiveDays: this.days,
						startDate: this.start,
						endDate: this.end,
						destination: this.location,
						categoryName: this.car_type,
						operateType: this.choice_type,
						platesCategory: this.card_type,
						routesPassage: this.path_type,
						regionIds: this.sections,
						carriedGoodsName: this.nick_name,
						timePassage: this.timer,
						office: this.section,
						applyCompanyName: '',
						compayManager: '',
						companyAddress: '',
						compayPhone: '',
						businessLicense: '',
						introductionLetter: '',
						carOwnerName: '',
						carOwnerPhone: '',
						idcard: [],
						car_pic: ['', '', '', '', '', ''],
						driving_y: '',
						driving_n: '',
						driver_licence: '',
						train_certificate: '',
						hazardous_licence: '',
						clear_agree_form: '',
						transport_agree_licence: '',
						transport_on_licence: '',
						lnsurance_policy: '',
						reletive_data: '',
						other_one: '',
						other_two: '',
						other_three: ''
					}
					localStorage.setItem('param', JSON.stringify(obj))
				}
				if (this.car_type == '请选择') {
					Toast('请选择通行证类型')
					return
				}
				let self = this
				this.$router.push({
					name: 'map_path',
					params: {
						id: self.ids,
						type: 0,
						group: self.groups
					}
				})
			},
			see_eight() {
				if (localStorage.getItem('param')) {
					let datas = JSON.parse(localStorage.getItem('param'))
					datas.platesNumber = this.car_num
					datas.effectiveDays = this.days
					datas.startDate = this.start
					datas.endDate = this.end
					datas.destination = this.location
					datas.categoryName = this.car_type
					datas.operateType = this.choice_type
					datas.platesCategory = this.card_type
					datas.routesPassage = this.path_type
					datas.regionIds = this.sections
					datas.carriedGoodsName = this.nick_name
					datas.timePassage = this.timer
					datas.office = this.section
					localStorage.setItem('param', JSON.stringify(datas))
				} else {
					let obj = {
						applyType: 0,
						platesNumber: this.car_num,
						effectiveDays: this.days,
						startDate: this.start,
						endDate: this.end,
						destination: this.location,
						categoryName: this.car_type,
						operateType: this.choice_type,
						platesCategory: this.card_type,
						routesPassage: this.path_type,
						regionIds: this.sections,
						carriedGoodsName: this.nick_name,
						timePassage: this.timer,
						office: this.section,
						applyCompanyName: '',
						compayManager: '',
						companyAddress: '',
						compayPhone: '',
						businessLicense: '',
						introductionLetter: '',
						carOwnerName: '',
						carOwnerPhone: '',
						idcard: [],
						car_pic: ['', '', '', '', '', ''],
						driving_y: '',
						driving_n: '',
						driver_licence: '',
						train_certificate: '',
						hazardous_licence: '',
						clear_agree_form: '',
						transport_agree_licence: '',
						transport_on_licence: '',
						lnsurance_policy: '',
						reletive_data: '',
						other_one: '',
						other_two: '',
						other_three: ''
					}
					localStorage.setItem('param', JSON.stringify(obj))
				}
				if (this.car_type == '请选择') {
					Toast('请选择通行证类型')
					return
				}
				let self = this
				this.$router.push({
					name: 'map_section',
					params: {
						id: self.ids,
						type: 0,
						group: self.groups
					}
				})
			},
			change_one(val) {
				if (this.ids != '') {
					if (this.ids == val.id) {
						this.show_one = false
						this.car_type = val.text
						return
					}
				}
				this.clearAll()
				this.ids = val.id
				this.show_one = false
				this.car_type = val.text
				for (let i = 0; i < this.listData.categorys.length; i++) {
					if (this.ids == this.listData.categorys[i].id) {
						this.sureData = this.listData.categorys[i]
						this.group = this.listData.categorys[i].certificateList
					}
				}
				localStorage.setItem('group', JSON.stringify(this.group))
				console.log(this.sureData)
				this.path_type = '请选择'
				this.path_section = '请选择'
				if(this.sureData.routeList == undefined){
					this.show1 = 0
					this.path_type = ''
					localStorage.setItem('show1',0)
				}else{
					this.show1 = 1
					localStorage.setItem('show1',1)
				}
				if(this.sureData.region.id == ''){
					this.show2 = 0
					this.path_section = ''
					localStorage.setItem('show2',0)
				}else{
					this.show2 = 1
					localStorage.setItem('show2',1)
				}
				if(this.sureData.operated == '0,'){
					this.columns_two.push({
						id: 0,
						text: '运营'
					})
				}else if(this.sureData.operated == '1,'){
					this.columns_two.push({
						id: 1,
						text: '非运营'
					})
				}else if(this.sureData.operated == '0,1,' || this.sureData.operated == '1,0,'){
					this.columns_two.push({
						id: 0,
						text: '运营'
					})
					this.columns_two.push({
						id: 1,
						text: '非运营'
					})
				}
				for (let i = 0; i < this.sureData.numberList.length; i++) {
					this.columns_three.push(this.sureData.numberList[i].name)
				}
				for (let i = 0; i < this.listData.carrige.length; i++) {
					this.columns_four.push(this.listData.carrige[i].name)
				}
				for (let i = 0; i < this.sureData.timeList.length; i++) {
					this.columns_five.push(this.sureData.timeList[i].remarks + '   ' + this.sureData.timeList[i].startTime + '-' +
						this.sureData.timeList[i].endTime)
				}
			},
			cancel_one() {
				this.show_one = false
			},
			change_two(val) {
				this.show_two = false
				this.choice_type = val.text
			},
			cancel_two() {
				this.show_two = false
			},
			change_three(val) {
				this.show_three = false
				this.card_type = val
			},
			cancel_three() {
				this.show_three = false
			},
			change_four(val) {
				this.show_four = false
				this.nick_name = val
			},
			cancel_four() {
				this.show_four = false
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
			change_six(val) {
				this.show_six = false
				this.section = val.text
				this.sectionId = val.id
			},
			cancel_six() {
				this.show_six = false
			},
			submit() {
				if (this.car_type == '请选择' || this.choice_type == '请选择' || this.card_type == '请选择' || this.nick_name == '请选择' ||
					this.section == '请选择' || this.path_type == '请选择' || this.path_section == '请选择' || this.timer == '请选择' || this.car_num ==
					'' || this.start == '请选择' || this.end == '请选择' ||
					this.location == '') {
					Toast('所有选项为必填项')
					return
				}
				var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
				if (!express.test(this.car_num)) {
					Toast('请输入合法的车牌号')
					return
				}

				if (parseInt(this.days) > 30) {
					Toast('有效期不能超过30天')
					return
				}
				let self = this
				if (localStorage.getItem('param')) {
					let datas = JSON.parse(localStorage.getItem('param'))
					datas.platesNumber = this.car_num
					datas.effectiveDays = this.days
					datas.startDate = this.start
					datas.endDate = this.end
					datas.destination = this.location
					datas.categoryName = this.car_type
					datas.operateType = this.choice_type
					datas.platesCategory = this.card_type
					datas.routesPassage = this.path_type
					datas.regionIds = this.sections
					datas.carriedGoodsName = this.nick_name
					datas.timePassage = this.timer
					datas.office = this.sectionId
					datas.section = this.section
					localStorage.setItem('param', JSON.stringify(datas))
				} else {
					let obj = {
						applyType: 0,
						platesNumber: this.car_num,
						effectiveDays: this.days,
						startDate: this.start,
						endDate: this.end,
						destination: this.location,
						categoryName: this.car_type,
						operateType: this.choice_type,
						platesCategory: this.card_type,
						routesPassage: this.path_type,
						regionIds: this.sections,
						carriedGoodsName: this.nick_name,
						timePassage: this.timer,
						office: this.sectionId,
						section: this.section,
						applyCompanyName: '',
						compayManager: '',
						companyAddress: '',
						compayPhone: '',
						businessLicense: '',
						introductionLetter: '',
						carOwnerName: '',
						carOwnerPhone: '',
						idcard: [],
						car_pic: ['', '', '', '', '', ''],
						driving_y: '',
						driving_n: '',
						driver_licence: '',
						train_certificate: '',
						hazardous_licence: '',
						clear_agree_form: '',
						transport_agree_licence: '',
						transport_on_licence: '',
						lnsurance_policy: '',
						reletive_data: '',
						other_one: '',
						other_two: '',
						other_three: ''
					}
					localStorage.setItem('param', JSON.stringify(obj))
				}
				let groups = JSON.parse(localStorage.getItem('group'))
				console.log(JSON.parse(localStorage.getItem('param')))
				this.$router.push({
					name: 'business_two',
					params: {
						group: groups,
						id: self.ids
					}
				})
			},
			back() {
				this.$router.push('/type')
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
		top: 4.3rem;
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
