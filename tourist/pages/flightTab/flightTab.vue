<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">航班动态</block>
			</cu-custom>
		</view>
		<view class="tab">
			<van-tabs type="card" title-active-color="#fff" color="#DE2910">
				<van-tab title="航班号">
					<view class="tabs">
						<view class="now" @tap="goNum">
							<img src="../../static/img/clock.png" alt="">
							<text>{{date}}</text>
							<text>{{day}}</text>
						</view>
						<view class="airNum">
							<img src="../../static/img/flight.png" alt="">
							<input type="text" v-model="count" placeholder="请输入航班号">
						</view>
						<view class="search" @tap="goCount">查询</view>
					</view>
				</van-tab>
				<van-tab title="起降地">
					<view class="tabs">
						<view class="now" @tap="goNum">
							<img src="../../static/img/clock.png" alt="">
							<text>{{date}}</text>
							<text>{{day}}</text>
						</view>
						<view class="start" @tap="choiceStart">
							<img src="../../static/img/flight.png" alt="">
							<view>{{start}}</view>
						</view>
						<view class="start" @tap="choiceEnd">
							<img src="../../static/img/flight.png" alt="">
							<view>{{end}}</view>
						</view>
						<view class="search" @tap="goLook">查询</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
		<van-popup v-model="show3" position="bottom" :overlay="true">
			<van-datetime-picker v-model="currentTime" type="date" :min-date="minDate" @cancel="cancel" @confirm="confirm" />
		</van-popup>
		<van-popup v-model="show4" :close-on-click-overlay="false">
			<van-loading type="spinner" />
		</van-popup>
	</view>
</template>

<script>
	import {Toast} from 'vant'
	import area from '../../common/js/area.js'
	import model from '../../components/model/model.vue'
	import {airport} from '../../common/js/airport.js'
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				date: '',
				day: '',
				area: area,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				start: '',
				end: '',
				index: 0,
				currentTime: new Date(),
				minDate: new Date(),
				listData: [],
				startCode: '',
				endCode: '',
				count: ''
			}
		},
		components: {
			model,
			Toast
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			var myDate = new Date()
			this.date = myDate.getFullYear() + '-' + this.addZero(myDate.getMonth() + 1) + '-' + this.addZero(myDate.getDate())
			this.day = this.getDay(myDate.getDay())
		},
		onShow() {
			this.start = this.$store.state.city3
			this.end = this.$store.state.city4
		},
		onReady() {
			
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
			goRoom() {

			},
			addZero(str) {
				str = str > 9 ? str : '0' + str
				return str
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
			getDay(day) {
				switch (day) {
					case 0:
						day = "星期天"
						break
					case 1:
						day = "星期一"
						break
					case 2:
						day = "星期二"
						break
					case 3:
						day = "星期三"
						break
					case 4:
						day = "星期四"
						break
					case 5:
						day = "星期五"
						break
					case 6:
						day = "星期六"
				}
				return day
			},
			choiceStart() {
				uni.navigateTo({
					url: '../selectCity/selectCity?type=3',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			confirm1(e) {
				this.start = e[1].name
				this.show1 = false
			},
			cancel1() {
				this.show1 = false
			},
			choiceEnd() {
				uni.navigateTo({
					url: '../selectCity/selectCity?type=4',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			confirm2(e) {
				this.end = e[1].name
				this.show2 = false
			},
			cancel2() {
				this.show2 = false
			},
			cancel() {
				this.show3 = false
				
			},
			confirm(e) {
				this.show3 = false
				console.log(e)
				this.date = this.dateFtt('yyyy-MM-dd', e)
				this.day = this.getDay(new Date(this.date).getDay())
			},
			goList() {
				uni.navigateTo({
					url: '../airList/airList'
				})
			},
			goNum() {
				this.show3 = true
			},
			goLook() {
				if (this.start == '选择出发城市') {
					Toast('请选择出发城市')
					return
				}
				if (this.start == '选择到达城市') {
					Toast('请选择到达城市')
					return
				}
				if(this.$store.state.searchState == 2){
					for(let j=0;j<airport.RECORDS.length;j++){
						if(this.start == airport.RECORDS[j].cityname){
							this.$store.commit('changeStartCity1', airport.RECORDS[i].citycode)
						}
						if(this.end == airport.RECORDS[j].cityname){
							this.$store.commit('changeEndCity1', airport.RECORDS[i].citycode)
						}
					}
				}
				
				let self = this
				this.show4 = true
				let datas = {
					depcity: this.$store.state.startCity1,
					arrcity: this.$store.state.endCity1,
					date: this.date
				}
				let data = {
					url: '/api/gzh/getFlightInfoByCity',
					data: datas,
					success: function(res){
						if(res.data.result == 0){
							self.show4 = false
							uni.navigateTo({
								url: '../flight/flight?list=' + JSON.stringify(res.data.data) + '&date=' + self.date + '&day=' + self.day
							})
						}else{
							self.show4 = false
							Toast('暂无数据')
						}
					}
				}
				ajax(data)
			},
			goCount() {
				let self = this
				this.show4 = true
				let datas = {
					fnum: this.count,
					date: this.date
				}
				let data = {
					url: '/api/gzh/getFlightInfoByNum',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.show4 = false
							uni.navigateTo({
								url: '../flight/flight?list=' + JSON.stringify(res.data.data) + '&date=' + self.date + '&day=' + self.day
							})
						}else{
							self.show4 = false
							Toast('暂无该航班数据')
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	.van-popup {
		background: none !important;
	}

	.tab {
		width: 100%;
	}

	.tabs {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.now {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 60upx;
		font-size: 14px;
		color: #333;
	}

	.now>img {
		width: 44upx;
		height: 44upx;
	}

	.now>text {
		margin-left: 20upx;
	}

	.start {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
		margin-top: 20upx;
	}

	.start>img {
		width: 60upx;
		height: 60upx;
	}

	.start>view {
		width: 72%;
		text-align: left;
	}
	
	.airNum {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
		margin-top: 20upx;
	}
	
	.airNum>input {
		margin-left: 124upx;
	}

	.search {
		width: 70%;
		height: 70upx;
		line-height: 70upx;
		margin: 80upx auto 0;
		border: 1px solid #eee;
		border-radius: 4px;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #DE2910;
	}

	.interest {
		width: 100%;
		margin-top: 60upx;
		font-size: 14px;
		color: #333;
		border-top: 10px solid #eee;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.list-top {
		width: 100%;
		padding-bottom: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.btn {
		padding: 4upx 22upx;
		border: 1px solid #eee;
		border-radius: 4px;
	}

	.air_name {
		display: flex;
		width: 100%;
		padding: 24upx 0;
	}

	.air_name>img {
		width: 40upx;
		height: 40upx;
		margin-right: 20upx;
	}

	.record {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.goStart {
		display: flex;
		flex-direction: column;
	}

	.timer {
		font-size: 40upx;
		color: #333;
		font-weight: 600;
		margin-bottom: 20upx;
	}

	.address {
		font-size: 14px;
		color: #999;
	}
</style>
