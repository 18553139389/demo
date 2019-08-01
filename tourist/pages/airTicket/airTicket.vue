<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">机票</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<van-tabs v-model="active" title-active-color="#fff" color="#E73C1D" type="card" @change="choiceSingle">
					<van-tab title="单程">
						<view class="tab1">
							<view class="city">
								<text @tap="goCity1">{{name1}}</text>
								<img src="../../static/img/loop.png" alt="" @tap="loop" :class="[loops ? 'loops' : '']">
								<text @tap="goCity2">{{name2}}</text>
							</view>
							<view class="time" @tap="goTime">
								<text>{{date}} {{day}}</text>
								<img src="../../static/img/right.png" alt="">
							</view>
							<view class="choice">
								<!-- <view class="seat" @tap="showSeat">
									<view>{{seat}}</view>
									<img src="../../static/img/right.png" alt="">
								</view> -->
								<view class="child">
									<van-checkbox @change="changeState" v-model="checked1" checked-color="#E73C1D" style="margin-right: 40upx;">儿童票</van-checkbox>
									<!-- <van-checkbox v-model="checked2" checked-color="#E73C1D">婴儿</van-checkbox> -->
								</view>
							</view>
							<view class="explain" v-if="checked1 || checked2">
								<van-icon name="info-o" />
								<view>儿童婴儿预定说明</view>
							</view>
							<view class="piao" v-if="checked1 || checked2">儿童票需要单独查询，单独下单，不能和成人一起下单,婴儿票必须和成人一起下单</view>
							<view class="search" @tap="goOrder">搜索机票</view>
						</view>
					</van-tab>
					<van-tab title="往返">
						<view class="tab1">
							<view class="city">
								<text @tap="goCity1">{{name1}}</text>
								<img src="../../static/img/loop.png" alt="" @tap="loop" :class="[loops ? 'loops' : '']">
								<text @tap="goCity2">{{name2}}</text>
							</view>
							<view class="time" @tap="goTime1">
								<view class="date1">
									<text>{{date1}} {{day1}}</text>
									<img src="../../static/img/right.png" alt="">
								</view>
								<view class="date1">
									<text>{{date2}} {{day2}}</text>
									<img src="../../static/img/right.png" alt="">
								</view>
							</view>
							<view class="choice" v-if="child">
								<!-- <view class="seat" @tap="showSeat">
									<view>{{seat}}</view>
									<img src="../../static/img/right.png" alt="">
								</view> -->
								<view class="child">
									<van-checkbox @change="changeState" v-model="checked1" checked-color="#E73C1D" style="margin-right: 40upx;">儿童票</van-checkbox>
									<!-- <van-checkbox v-model="checked2" checked-color="#E73C1D">婴儿</van-checkbox> -->
								</view>
							</view>
							<view class="explain" v-if="checked1 || checked2">
								<van-icon name="info-o" />
								<view>儿童婴儿预定说明</view>
							</view>
							<view class="piao" v-if="checked1 || checked2">儿童票需要单独查询，单独下单，不能和成人一起下单,婴儿票必须和成人一起下单</view>
							<view class="search" @tap="goSearch">搜索机票</view>
						</view>
					</van-tab>
				</van-tabs>
			</view>
			<view class="imgs">
				<view class="imgs-list" v-for="(v,k) in imgList" :key="k">
					<img :src="v" alt="">
				</view>
			</view>
		</view>
		<van-popup v-model="show" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
		</van-popup>
	</view>
</template>

<script>
	import {
		http
	} from '../../common/js/index.js'
	import {
		md5
	} from '../../common/js/md5.js'
	import {
		air
	} from '../../common/js/air.js'
	import {
		airport
	} from '../../common/js/airport.js'
	import {
		ajax
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				value: '',
				backColor: '#FFFFFF',
				active: 0,
				loops: false,
				checked1: false,
				checked2: false,
				show: false,
				seat: '不限舱位',
				columns: ['不限舱位', '经济舱'],
				imgList: ['../../static/img/img1.jpg', '../../static/img/img2.jpg', '../../static/img/img3.jpg'],
				singleStart: '',
				singleEnd: '',
				nowDate: '',
				child: true
			}
		},
		computed: {
			name1() {
				return this.$store.state.city1
			},
			name2() {
				return this.$store.state.city2
			},
			date() {
				return this.$store.state.date
			},
			day() {
				return this.$store.state.day
			},
			date1() {
				return this.$store.state.date1
			},
			day1() {
				return this.$store.state.day1
			},
			date2() {
				return this.$store.state.date2
			},
			day2() {
				return this.$store.state.day2
			}
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
		},
		onReady() {
			this.$store.commit('changeDate', this.dateFtt("MM-dd", new Date()))
			this.$store.commit('changeDay', this.getDay(new Date().getDay()))
			this.$store.commit('changeDate1', this.dateFtt("MM-dd", new Date()))
			this.$store.commit('changeDay1', this.getDay(new Date().getDay()))
			this.$store.commit('changeDate2', this.GetDateStr(3))
			//初始化往返日期
			var dd = new Date()
			var y = dd.getFullYear()
			this.$store.commit('changeDoubleStart', y + '-' + this.date1)
			this.$store.commit('changeDoubleEnd', y + '-' + this.date2)
			//初始化去程日历默认值
			this.$store.commit('changePrice1', y + '-' + this.date1)
			this.$store.commit('changeInit1', y + '-' + this.date1)
			//初始化返程日历默认值
			this.$store.commit('changePrice2', y + '-' + this.date2)
			this.$store.commit('changeInit2', y + '-' + this.date2)
			//初始化默认日历
			let _dateData = new Date(),
				_date = `${_dateData.getFullYear()}-${_dateData.getMonth() + 1}-${_dateData.getDate()}`
			this.$store.commit('changePrice', _date)
		},
		onShow() {
			if (this.$store.state.singleStart == '') {
				this.$store.commit('changeSingleStart', this.dateFtt("yyyy/MM/dd", new Date()))
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
			loop() {
				let name1 = this.name1
				let name2 = this.name2
				this.$store.commit('changeCity1', name2)
				this.$store.commit('changeCity2', name1)
				this.loops = true
				setTimeout(() => {
					this.loops = false
				}, 500)
				for (let i = 0; i < airport.RECORDS.length; i++) {
					if (this.name1 == airport.RECORDS[i].cityname) {
						this.singleStart = airport.RECORDS[i].citycode
					}

					if (this.name2 == airport.RECORDS[i].cityname) {
						this.singleEnd = airport.RECORDS[i].citycode
					}
				}
			},
			goCity1() {
				uni.navigateTo({
					url: '../selectCity/selectCity?type=1',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goCity2() {
				uni.navigateTo({
					url: '../selectCity/selectCity?type=2',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goTime() {
				uni.navigateTo({
					url: '../selectTime/selectTime?type=0',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goTime1() {
				// uni.navigateTo({
				// 	url: '../selectTime/selectTime?type=1',
				// 	animationType: 'slide-in-left',
				// 	animationDuration: 500
				// })
				uni.navigateTo({
					url: '../doubleDate/doubleDate',
					animationType: 'slide-in-left',
					animationDuration: 500
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
			GetDateStr(AddDayCount) {
				var dd = new Date()
				dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期 
				var y = dd.getFullYear()
				var m = dd.getMonth() + 1 //获取当前月份的日期 
				var d = dd.getDate()
				m = m > 9 ? m : '0' + m
				d = d > 9 ? d : '0' + d
				this.$store.commit('changeDay2', this.getDay(new Date(y + '-' + m + "-" + d).getDay()))
				return m + "-" + d
			},
			getDay(day) {
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
			showSeat() {
				this.show = true
			},
			onCancel() {
				this.show = false
			},
			onConfirm(val) {
				console.log(val)
				this.show = false
				this.seat = val
			},
			goOrder() {
				if(this.$store.state.searchState == 0 || this.$store.state.searchState == 2){
					for (let i = 0; i < airport.RECORDS.length; i++) {
						if (this.name1 == airport.RECORDS[i].cityname) {
							this.singleStart = airport.RECORDS[i].citycode
							this.$store.commit('changeStartCity', airport.RECORDS[i].citycode)
						}

						if (this.name2 == airport.RECORDS[i].cityname) {
							this.singleEnd = airport.RECORDS[i].citycode
							this.$store.commit('changeEndCity', airport.RECORDS[i].citycode)
						}
					}
				}
				
				uni.navigateTo({
					url: '../singleAir/singleAir?singleStart=' + this.singleStart + '&singleEnd=' + this.singleEnd + '&checked1=' + this.checked1,
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goSearch() {
				if(this.$store.state.searchState == 0 || this.$store.state.searchState == 2){
					for (let i = 0; i < airport.RECORDS.length; i++) {
						if (this.name1 == airport.RECORDS[i].cityname) {
							this.singleStart = airport.RECORDS[i].citycode
							this.$store.commit('changeStartCity', airport.RECORDS[i].citycode)
						}
					
						if (this.name2 == airport.RECORDS[i].cityname) {
							this.singleEnd = airport.RECORDS[i].citycode
							this.$store.commit('changeEndCity', airport.RECORDS[i].citycode)
						}
					}
				}
				uni.navigateTo({
					url: '../airStart/airStart',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			changeState(e) {
				this.$store.commit('changeState', e)
			},
			choiceSingle(e) {
				if(e == 1){
					this.child = false
				}else{
					this.child = true
				}
				this.$store.commit('changeSingle', e)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #F9F9F9;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.wrapper {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		background: #FFFFFF;
		border-radius: 4px;
		box-shadow: 0 1px 4px #eee;
		padding-bottom: 30upx;
		overflow: hidden;
	}

	.tab1 {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.city {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 40upx 0 30upx;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
	}

	.city>img {
		width: 40upx;
		height: 40upx;
	}

	.loops {
		animation: loops 0.5s linear;
	}

	@keyframes loops {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.time {
		width: 100%;
		padding: 30upx 0;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.time>img {
		width: 28upx;
		height: 28upx;
	}

	.choice {
		width: 100%;
		height: 90upx;
		font-size: 12px;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.seat,
	.child {
		display: flex;
		height: 90upx;
		align-items: center;
	}

	.seat>view {
		height: 90upx;
		line-height: 90upx;
		margin-top: 3px;
	}

	.seat>img {
		margin-left: 30upx;
		width: 24upx;
		height: 24upx;
	}

	.explain {
		width: 100%;
		font-size: 12px;
		color: #999;
		display: flex;
		/* flex-direction: row-reverse; */
		align-items: center;
	}

	.search {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #E73C1D;
		border-radius: 4px;
		margin: 40upx 0 20upx;
	}

	.imgs {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 40upx;
	}

	.imgs-list {
		width: 100%;
		height: 280upx;
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.imgs-list>img {
		width: 100%;
		height: 100%;
	}

	.date1 {
		display: flex;
		align-items: center;
	}

	.date1>img {
		width: 28upx;
		height: 28upx;
		margin-left: 30upx;
	}

	.piao {
		font-size: 12px;
		color: #999;
		margin-top: 16upx;
	}
</style>
