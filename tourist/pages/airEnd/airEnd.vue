<template>
	<view class="contain">
		<view class="top">
			<view class="title">
				<text class="cuIcon-back back" @tap="back"></text>
				<view style="margin-right: 16upx;">返程：</view>
				<view>{{city2}}</view>
				<img src="../../static/img/single.png" alt="">
				<view>{{city1}}</view>
			</view>
			<view class="current">
				{{date1}} {{day1}}
			</view>
			<view class="log">
				<img src="../../static/img/qu.png" alt="">
				<view style="margin: 0 10upx;font-size: 14px;">{{priceDate1}}</view>
				<view style="margin-right: 10upx;">{{day2}}</view>
				<view style="margin-right: 10upx;font-size: 14px;">{{timeList.DepartTime}}-{{timeList.ArriveTime}}</view>
				<view style="font-size: 14px;">{{timeList.FlightNo}}</view>
			</view>
			<view style="width: 100%;position: relative;">
				<scroll-view class="wrapper" scroll-x scroll-with-animation :scroll-left="slideLeft">
					<view class="choice">
						<view class="list" v-for="(val, index) in swiperData.dateDay" :id="'main-'+index" :class="val.disable == true ? 'disable' : val.Choice == true ? 'Choice' : ''"
						 @tap="changeDay(index)">
							<view>{{val.week}}</view>
							<view style="margin: 4upx 0;font-size: 14px;width: 100upx;text-align: center;">{{val.day}}</view>
							<!-- <view>￥{{val.price == undefined ? '' : val.price}}</view> -->
						</view>
					</view>
				</scroll-view>
				<view class="walkDate" @tap="choiceWalk">
					<text>出行日历</text>
					<img src="../../static/img/down.png" alt="">
				</view>
			</view>
		</view>
		<view class="result">
			<scroll-view class="airs" scroll-y scroll-with-animation style="height: 100%;">
				<view class="airs-box" @tap="goDetail(k)" v-for="(v,k) in listData" :key="k">
					<view class="result-list">
						<view class="result-top">
							<view class="location">
								<view class="location-air">
									<view>{{v.DepartTime}}</view>
									<img src="../../static/img/guide.png" alt="">
									<view>{{v.ArriveTime}}</view>
								</view>
								<view class="location-name">
									<view>{{v.DepartAirportName.indexOf('国') > -1 ? v.DepartAirportName.substr(0,v.DepartAirportName.indexOf('国')) : v.DepartAirportName}}{{v.DepartAirportTerminal}}</view>
									<view>{{v.ArriveAirportName.indexOf('国') > -1 ? v.ArriveAirportName.substr(0,v.ArriveAirportName.indexOf('国')) : v.ArriveAirportName}}{{v.ArriveAirportTerminal}}</view>
								</view>
							</view>
							<view class="prices">
								<view class="money">￥{{v.Cabins[0].Fare}}</view>
								<view>婴儿￥{{v.Cabins[0].BabyFare}}</view>
							</view>
						</view>
						<view class="location-explain">
							<img src="../../static/img/icon1.png" alt="">
							<view>{{v.AirCompanyName}}{{v.FlightNo}} | {{v.PlaneType}}</view>
						</view>
					</view>
					<view class="line"></view>
				</view>
			</scroll-view>
		</view>
		<view class="bottom">
			<view class="nav" @tap="changeNav(1)">
				<img v-if="item1 == 1" src="../../static/img/nav4.png" />
				<img v-if="item1 != 1" src="../../static/img/nav3.png" />
				<view :class="item1 == 1 ? 'font' : ''">时间早-晚</view>
			</view>
			<view class="nav" @tap="changeNav(0)">
				<img v-if="item1 == 0" src="../../static/img/nav2.png" />
				<img v-if="item1 != 0" src="../../static/img/nav1.png" />
				<view :class="item1 == 0 ? 'font' : ''">价格低-高</view>
			</view>
		</view>
		<van-popup v-model="show" :close-on-click-overlay="false">
			<van-loading type="spinner" />
		</van-popup>
		<view class="kong" v-if="showAir">
			<img src="../../static/img/kong.png" alt="">
		</view>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../common/js/util.js'
	import {
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#333333',
				value: '',
				backColor: '#E73C1D',
				city1: '',
				city2: '',
				day: '',
				price: {
					type: true,
					data: []
				},
				storageDate: [],
				swiperData: {},
				slideLeft: 0,
				isDoRefresh: false,
				item1: 1,
				sendDate: '',
				singleStar: '',
				singleEnd: '',
				checked1: false,
				listData: [],
				show: false,
				showAir: false,
				timeList: {},
				index1: 0,
				airCompany: ''
			}
		},
		computed: {
			date() {
				let _dateData = new Date(),
					_date = `${_dateData.getFullYear()}-${_dateData.getMonth() + 1}-${_dateData.getDate()}`
				return _date
			},
			date1() {
				return this.$store.state.date2
			},
			day1() {
				return this.$store.state.day2
			},
			initDate() {
				return this.$store.state.initDate2
			},
			priceDate1() {
				return this.$store.state.priceDate1
			},
			day2() {
				return this.$store.state.day1
			}
		},
		components: {
			Toast
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.singleStart = this.$store.state.startCity
			this.singleEnd = this.$store.state.endCity
			this.index1 = option.index
			let city1 = this.$store.state.city1
			let city2 = this.$store.state.city2
			this.city1 = city1
			this.city2 = city2
			let list = JSON.parse(this.$store.state.listStart)
			this.timeList = list
			this.airCompany = option.airCompany
		},
		onShow: function(e) {
			if (this.initDate) {
				let week = new Date(this.initDate).getDay()
				week = this.getDays(week)
				let dateArr = this.initDate.split('-')
				console.log(dateArr)
				dateArr[1] = parseInt(dateArr[1]) > 9 ? dateArr[1] : '0' + parseInt(dateArr[1])
				dateArr[2] = parseInt(dateArr[2]) > 9 ? dateArr[2] : '0' + parseInt(dateArr[2])
				this.sendDate = dateArr[0] + '/' + dateArr[1] + '/' + dateArr[2] + ' ' + week
				if (this.initDate != '' && dateArr.length == 3) {
					this.Preprocessing(dateArr)
					this.init()
				}
			} else {
				let dateArr = this.$store.state.priceDate2.split('-')
				let week = new Date(this.$store.state.priceDate2).getDay()
				week = this.getDays(week)
				dateArr[1] = parseInt(dateArr[1]) > 9 ? dateArr[1] : '0' + parseInt(dateArr[1])
				dateArr[2] = parseInt(dateArr[2]) > 9 ? dateArr[2] : '0' + parseInt(dateArr[2])
				this.sendDate = dateArr[0] + '/' + dateArr[1] + '/' + dateArr[2] + ' ' + week
				if (this.$store.state.priceDate2 != '' && dateArr.length == 3) {
					this.Preprocessing(dateArr)
				}
			}
		},
		methods: {
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			init() {
				let self = this
				this.show = true
				let end = this.$store.state.doubleEnd
				end = end.split('-').join('/')
				let datas = {
					DepartCityCode: this.singleEnd,
					ArriveCityCode: this.singleStart,
					IsChild: this.$store.state.checked,
					DepartDate: end,
					AirLineCode: this.airCompany
				}
				let data = {
					url: '/api/gzh/flightQuery',
					data: datas,
					success: function(res) {
						self.listData = []
						if (res.data.result == 0) {
							self.show = false
							self.listData = res.data.Data
						}else{
							self.show = false
							self.showAir = true
						}
					},
					fail: function(res) {
						console.log(res)
					}
				}
				ajax(data)
			},
			changeNav(type) {
				if (this.item1 !== type) {
					this.item1 = type
				}
				
				if(type == 0) {
					this.listData.sort(this.CompareDate1)
				}
				
				if (type == 1) {
					this.listData.sort(this.CompareDate)
				}
			},
			CompareDate(t1, t2) {
				var date = new Date();
				var a = t1.DepartTime.split(":")
				var b = t2.DepartTime.split(":")
				return date.setHours(a[0], a[1]) - date.setHours(b[0], b[1])
			},
			CompareDate1(t1, t2) {
				var a = t1.Cabins[0].Fare
				var b = t2.Cabins[0].Fare
				return parseInt(a) - parseInt(b)
			},
			goDetail(k) {
				// this.$store.commit('changeListEnd', JSON.stringify(this.listData))
				// uni.navigateTo({
				// 	url: '../doubleOrder/doubleOrder?index1=' + this.index1 + '&index2=' + k 
				// })
				uni.navigateTo({
					url: '../endAirDetail/endAirDetail?date=' + this.sendDate + '&index=' + k + '&list=' + JSON.stringify(this.listData) + '&index1=' + this.index1
				})
			},
			back() {
				this.$store.commit('changeInit1', '')
				uni.navigateBack({
					delta: 1
				})
			},
			dateFtt(fmt, date) {
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
			getDays(day) {
				switch (day) {
					case 0:
						day = "周日"
						break
					case 1:
						day = "周一"
						break
					case 2:
						day = "周二"
						break
					case 3:
						day = "周三"
						break
					case 4:
						day = "周四"
						break
					case 5:
						day = "周五"
						break
					case 6:
						day = "周六"
				}
				return day
			},
			// 判断当前是 安卓还是ios ，传入不容的日期格式
			judgeDate(dateData) {
				if (typeof dateData !== 'object') {
					dateData = dateData.replace(/-/g, '/')
				}
				return dateData
			},
			getDay(dateData) {
				dateData = this.judgeDate(dateData)
				// 获取年，月，日，星期
				let _date = new Date(dateData),
					year = _date.getFullYear(),
					month = _date.getMonth() + 1,
					date = _date.getDate(),
					day = _date.getDay()
				return new Promise((resolve, reject) => {
					// 获取本月
					let thisDayArr = [],
						thisDaylength = new Date(year, month - 1, 0).getDate()
					for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
						let days = `${year}-${month}-${i}`
						days = this.judgeDate(days)
						days = this.getDays(new Date(days).getDay())
						month = parseInt(month) <= 9 ? '0' + parseInt(month) : parseInt(month)
						i = i <= 9 ? '0' + i : i
						thisDayArr.push({
							day: `${month}-${i}`,
							date: i,
							Choice: false,
							week: days,
							price: this.price.data[i - 1],
							priceType: this.price.type,
							disable: false
						})
					}
					resolve({
						dateDay: thisDayArr,
						year: year,
						month: month
					})
				})
			},
			Preprocessing(arr) {
				let self = this
				let swiperData = {}
				let _date = new Date(`${arr[0]}-${arr[1]}-${arr[2]}`),
					year = _date.getFullYear(),
					month = _date.getMonth() + 1
				this.getDay(`${arr[0]}-${arr[1]}-${arr[2]}`).then((val) => {
					swiperData = val
					arr[1] = parseInt(arr[1]) > 9 ? parseInt(arr[1]) : '0' + parseInt(arr[1])
					arr[2] = parseInt(arr[2]) > 9 ? parseInt(arr[2]) : '0' + parseInt(arr[2])
					let str = arr[1] + '-' + arr[2]
					this.$set(this, 'swiperData', swiperData)
					let dDate = self.$store.state.priceDate1
					dDate = dDate.split('-')
					this.swiperData.dateDay = this.swiperData.dateDay.map((val, index) => {
						if (dDate[0] > year) {
							val.disable = true
						} else if (dDate[1] > month && dDate[0] >= year) {
							val.disable = true
						} else if (dDate[0] >= year && dDate[2] > parseInt(val.date) && dDate[1] >= parseInt(month)) {
							val.disable = true
						}
						return val
					})
					for (let i = 0; i < this.swiperData.dateDay.length; i++) {
						if (str == this.swiperData.dateDay[i].day) {
							this.swiperData.dateDay[i].Choice = true
							this.slideLeft = 40 * i
						}
					}
				})
			},
			changeDay(k) {
				if (this.swiperData.dateDay[k].disable) {
					return
				}

				this.swiperData.dateDay.forEach((val, inde) => {
					val.Choice = false
				})
				this.swiperData.dateDay[k].Choice = true
				this.sendDate = this.swiperData.year + '/' + this.swiperData.month + '/' + this.swiperData.dateDay[k].date + ' ' + this.swiperData.dateDay[k].week
				this.$store.commit('changeDoubleEnd', this.swiperData.year + '/' + this.swiperData.month + '/' + this.swiperData.dateDay[k].date)
				this.$store.commit('changeDate2', this.swiperData.month + '-' + this.swiperData.dateDay[k].date)
				this.$store.commit('changeInit2', this.swiperData.year + '-' + this.swiperData.month + '-' + this.swiperData.dateDay[k].date)
				this.$store.commit('changePrice2', this.swiperData.year + '-' + this.swiperData.month + '-' + this.swiperData.dateDay[k].date)
				this.$store.commit('changeDay2', this.swiperData.dateDay[k].week)
				this.init()
			},
			choiceWalk() {
				this.$store.commit('changeInit2', '')
				uni.navigateTo({
					url: '../selectTime/selectTime?type=1'
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #F9F9F9;
		position: relative;
	}
	
	.van-popup {
		background: none !important;
	}
	
	.log {
		width: 100%;
		height: 70upx;
		display: flex;
		align-items: center;
		padding: 20upx 0 0;
		font-size: 12px;
		color: #fff;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.top {
		width: 100%;
		height: 380upx;
		background-image: -webkit-linear-gradient(top, #E02B11, #F75F33);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.title {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #fff;
		position: relative;
	}

	.title>img {
		width: 40upx;
		margin: 0 20upx;
	}

	.back {
		position: absolute;
		left: 0;
	}

	.choice {
		width: 100%;
		display: flex;
		position: relative;
		/* padding-top: 20upx; */
	}

	.wrapper {
		width: 85%;
		display: flex;
	}

	.list {
		height: 106upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #fff;
		padding: 20upx 0;
	}

	.current {
		width: 100%;
		height: 40upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
	}

	.Choice {
		background: #E53719;
	}

	.walkDate {
		width: 15%;
		position: fixed;
		right: 0;
		top: 210upx;
		height: 106upx;
		border-left: 1px solid #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 0 24upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #fff;
		text-align: center;
	}

	.walkDate>img {
		width: 40upx;
		height: 40upx;
	}

	.result {
		width: 100%;
		position: absolute;
		top: 340upx;
		bottom: 200upx;
		left: 0;
		right: 0;
		z-index: 2000;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.airs-box {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.result-list {
		width: 100%;
		background: #fff;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		padding: 20upx;
		box-sizing: border-box;
	}

	.line {
		width: 100%;
		height: 30upx;
		background: #F9F9F9;
	}

	.result-top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.location {
		display: flex;
		flex-direction: column;
	}

	.location-air {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 18px;
		color: #333;
	}

	.location-air>img {
		width: 120upx;
		margin: 0 16upx;
	}

	.location-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
		margin-top: 16upx;
	}

	.money {
		font-size: 18px;
		color: red;
	}

	.location-explain {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #999;
		margin-top: 20upx;
	}

	.location-explain>img {
		width: 36upx;
	}

	.location-explain>view {
		margin-left: 12upx;
	}

	.prices {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #999;
	}

	.bottom {
		width: 100%;
		height: 100upx;
		box-shadow: 0 1px 4px #bbb;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 12px;
		color: #999;
		background: #fff;
	}

	.nav {
		height: 100upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}

	.nav>img {
		width: 40upx;
		height: 40upx;
		margin-bottom: 8upx;
	}

	.font {
		color: #E53719;
	}
	
	.kong {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
