<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white" @Back="Back">
				<block slot="backText"></block>
				<block slot="content">火车票</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
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
					<view class="search" @tap="goOrder">搜索火车票</view>
				</view>
			</view>
			<view class="hot_wrapper">
				<view class="hot_list" v-for="(v,k) in activityList" :key="k" @tap="goUrl(v.url)">
					<view class="hot_img">
						<img :src="v.image" alt="">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				value: '',
				backColor: '#FFFFFF',
				loops: false,
				activityList: []
			}
		},
		computed: {
			name1() {
				return this.$store.state.train1
			},
			name2() {
				return this.$store.state.train2
			},
			date() {
				return this.$store.state.trainDate
			},
			day() {
				return this.$store.state.trainDay
			}
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			//初始化获取下面图片
			this.init()
		},
		onReady() {
			this.$store.commit('changeTrainDate', this.dateFtt("MM-dd", new Date()))
			this.$store.commit('changeTrainDay', this.getDay(new Date().getDay()))
			this.$store.commit('changeStartTrainDate', this.dateFtt('yyyy/MM/dd', new Date()))
			console.log(this.$store.state.startTrainDate)
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
			Back() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			init() {
				let self = this
				let datas = {
					type: 2
				}
				let data2 = {
					url: '/api/gzh/searchPicture',
					data: datas,
					success: function(res){
						if(res.data.result == 0){
							self.activityList = res.data.dataList
						}
					}
				}
				ajax(data2)
			},
			loop() {
				let name1 = this.name1
				let name2 = this.name2
				this.$store.commit('changeTrain1', name2)
				this.$store.commit('changeTrain2', name1)
				this.loops = true
				setTimeout(() => {
					this.loops = false
				}, 500)
			},
			goCity1() {
				uni.navigateTo({
					url: '../selectTrain/selectTrain?type=1',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goCity2() {
				uni.navigateTo({
					url: '../selectTrain/selectTrain?type=2',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goTime() {
				uni.navigateTo({
					url: '../selectTime/selectTime?type=2',
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
			goOrder() {
				uni.navigateTo({
					url: '../trainList/trainList',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goUrl(url){
				uni.navigateTo({
					url: '../content/content?url=' + encodeURIComponent(url)
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
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
	
	.hot_wrapper {
		width: 100%;
		padding: 30upx 0;
		box-sizing: border-box;
	}
	
	.hot_list {
		width: 100%;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 30upx;
	}
	
	.hot_img {
		width: 100%;
		/* height: 260upx; */
	}
	
	.hot_img>img {
		width: 100%;
		height: 100%;
	}
</style>
