import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 3d627fab60ad41d1852550d201e65ee2
const store = new Vuex.Store({
	state: {
		uid: '3d627fab60ad41d1852550d201e65ee2',
		city1: '郑州',
		city2: '北京',
		city3: '选择出发城市',
		city4: '选择到达城市',
		startCity: 'CGO',
		endCity: 'BJS',
		startCity1: '',
		endCity1: '',
		date: '',
		day: '',
		date1: '',
		day1: '',
		date2: '',
		day2: '',
		singleStart: '',
		singleEnd: '',
		initDate: '',
		initDate1: '',
		initDate2: '',
		priceDate: '',
		priceDate1: '',
		priceDate2: '',
		vipType: 0,
		checked: false,
		singleState: 0,
		scores: '',
		doubleStart: '',
		doubleEnd: '',
		listStart: [],
		listEnd: [],
		customer: '',
		refund: '',
		searchState: 0
	},
	//切记：Vuex中store数据改变的唯一方法就是mutation！
	mutations: {
		changeCity1(state,city) {
			state.city1 = city
		},
		changeCity2(state,city) {
			state.city2 = city
		},
		changeCity3(state,city) {
			state.city3 = city
		},
		changeCity4(state,city) {
			state.city4 = city
		},
		changeDate(state,date) {
			state.date = date
		},
		changeDay(state,day) {
			state.day = day
		},
		changeDate1(state,date) {
			state.date1 = date
		},
		changeDay1(state,day) {
			state.day1 = day
		},
		changeDate2(state,date) {
			state.date2 = date
		},
		changeDay2(state,day) {
			state.day2 = day
		},
		changeInit(state,date) {
			state.initDate = date
		},
		changeInit1(state,date) {
			state.initDate1 = date
		},
		changeInit2(state,date) {
			state.initDate2 = date
		},
		changeUid(state,id) {
			state.uid = id
		},
		changeVip(state,type) {
			state.vipType = type
		},
		changeSingleStart(state,date) {
			state.singleStart = date
		},
		changeSingleEnd(state,date) {
			state.singleEnd = date
		},
		changePrice(state,date) {
			state.priceDate = date
		},
		changePrice1(state,date) {
			state.priceDate1 = date
		},
		changePrice2(state,date) {
			state.priceDate2 = date
		},
		changeState(state,item) {
			state.checked = item
		},
		changeSingle(state, item) {
			state.singleState = item
		},
		changeScores(state, item) {
			state.scores = item
		},
		changeDoubleStart(state, item) {
			state.doubleStart = item
		},
		changeDoubleEnd(state, item) {
			state.doubleEnd = item
		},
		changeListStart(state, item) {
			state.listStart = item
		},
		changeListEnd(state, item) {
			state.listEnd = item
		},
		changeStartCity(state,item) {
			state.startCity = item
		},
		changeEndCity(state,item) {
			state.endCity = item
		},
		changeStartCity1(state,item) {
			state.startCity1 = item
		},
		changeEndCity1(state,item) {
			state.endCity1 = item
		},
		changeCustomer(state,item) {
			state.customer = item
		},
		changeRefund(state,item) {
			state.refund = item
		},
		changeSearchState(state, item) {
			state.searchState = item
		}
	}
})

export default store