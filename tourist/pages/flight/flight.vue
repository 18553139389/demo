<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">航班动态</block>
			</cu-custom>
		</view>
		<view class="interest">
			<view class="list" v-for="(v,k) in airList" :key="k" @tap="goType(v.FlightState,k)">
				<view class="list-top">
					<view>{{date}} {{day}}</view>
					<view class="state1" v-if="v.FlightState == '起飞'">起飞</view>
					<view class="state2" v-if="v.FlightState == '计划'">计划</view>
					<view class="state3" v-if="v.FlightState != '起飞' && v.FlightState != '计划'">{{v.FlightState}}</view>
				</view>
				<view class="air_name">
					<img src="../../static/img/airicon.png" alt="">
					<text>{{v.FlightCompany}} {{v.FlightNo}}</text>
				</view>
				<view class="record">
					<view class="goStart">
						<view class="timer">{{v.FlightDeptimePlanDate.substring(10,16)}}</view>
						<view class="address">{{v.FlightDepAirport}}</view>
					</view>
					<img src="../../static/img/plane.png" alt="">
					<view class="goStart">
						<view class="timer">{{v.FlightArrtimePlanDate.substring(10,16)}}</view>
						<view class="address">{{v.FlightArrAirport}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import area from '../../common/js/area.js'
	import model from '../../components/model/model.vue'
	import {
		http
	} from '../../common/js/index.js'
	import {
		md5
	} from '../../common/js/md5.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				date: '',
				day: '',
				area: area,
				show: false,
				show1: false,
				show2: false,
				start: '',
				end: '',
				index: 0,
				airList: []
			}
		},
		components: {
			model
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.airList = JSON.parse(option.list)
			this.date = option.date
			this.day = option.day
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
				this.show1 = true
			},
			confirm1(e) {
				this.start = e[1].name
				this.show1 = false
			},
			cancel1() {
				this.show1 = false
			},
			choiceEnd() {
				this.show2 = true
			},
			confirm2(e) {
				this.end = e[1].name
				this.show2 = false
			},
			cancel2() {
				this.show2 = false
			},
			del(k) {
				this.show = true
				this.index = k
			},
			cancel() {
				this.show = false
			},
			confirm() {
				this.show = false
				this.listData.splice(this.index, 1)
			},
			goList() {
				uni.navigateTo({
					url: '../airList/airList'
				})
			},
			goType(k,item) {
				uni.navigateTo({
					url: '../airList/airList?type=' + k + '&list=' + JSON.stringify(this.airList) + '&index=' + item
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
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

	.search {
		width: 70%;
		height: 70upx;
		line-height: 70upx;
		margin: 0 auto;
		border: 1px solid #eee;
		border-radius: 4px;
		text-align: center;
		font-size: 14px;
		color: #333;
		margin-top: 80upx;
	}

	.interest {
		width: 100%;
		font-size: 14px;
		color: #333;
		padding: 30upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 4px;
		margin-bottom: 30upx;
	}

	.list-top {
		width: 100%;
		margin: 20upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-left: 2px solid #DE2910;
		padding-left: 20upx;
	}

	.btn {
		padding: 4upx 22upx;
		border: 1px solid #eee;
		border-radius: 4px;
	}

	.air_name {
		display: flex;
		width: 100%;
		padding: 0 20upx 24upx;
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
		padding: 0 20upx 30upx;
		box-sizing: border-box;
	}

	.record>img {
		width: 50upx;
		height: 50upx;
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
		text-align: center;
	}

	.address {
		font-size: 14px;
		color: #999;
	}

	.state1 {
		padding: 8upx 20upx;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		background: #40D267;
		font-size: 12px;
		color: #fff;
	}

	.state2 {
		padding: 8upx 20upx;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		background: #FE9423;
		font-size: 12px;
		color: #fff;
	}

	.state3 {
		padding: 8upx 20upx;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		background: #DE2910;
		font-size: 12px;
		color: #fff;
	}
</style>
