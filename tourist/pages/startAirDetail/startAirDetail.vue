<template>
	<view class="contain">
		<view class="top">
			<view class="title">
				<text class="cuIcon-back back" @tap="back"></text>
				<view class="current">
					{{date1}} {{day1}}
				</view>
			</view>
		</view>
		<view class="detail">
			<view class="wrapper">
				<view class="choiceTitle">
					<view>{{choiceDate}}</view>
					<view style="margin-left: 20upx;">{{city1}}-{{city2}}</view>
				</view>
				<view class="clock">
					<view class="start">
						<view class="time">{{list.DepartTime}}</view>
						<view>{{list.DepartAirportName.indexOf('国') > -1 ? list.DepartAirportName.substr(0,list.DepartAirportName.indexOf('国')) : list.DepartAirportName}}{{list.DepartAirportTerminal}}</view>
					</view>
					<view class="start">
						<view style="font-size: 12px;">{{list.Duration}}</view>
						<img src="../../static/img/list.png" alt="">
					</view>
					<view class="start">
						<view class="time">{{list.ArriveTime}}</view>
						<view>{{list.ArriveAirportName.indexOf('国') > -1 ? list.ArriveAirportName.substr(0,list.ArriveAirportName.indexOf('国')) : list.ArriveAirportName}}{{list.ArriveAirportTerminal}}</view>
					</view>
				</view>
				<view class="bottomList">{{list.AirCompanyName}}{{list.FlightNo}} | {{list.PlaneType}}</view>
			</view>
		</view>
		<view class="result">
			<scroll-view class="airs" scroll-y scroll-with-animation style="height: 100%;">
				<view class="airs-list" v-for="(v,k) in list.Cabins" :key="k">
					<view class="airs-top">
						<view class="airs-price">
							<view style="font-size: 20px;color: #E02B11;">￥{{v.Fare}}</view>
							<view style="font-size: 12px;color: #999;" v-if="v.BabyFare != 0">婴儿<text style="color: #E02B11;">￥{{v.BabyFare}}</text></view>
						</view>
						<view class="air-btns" @tap="goOrder(k)">预定</view>
					</view>
					<view class="airs-mark">
						<view>极速出票</view>
						<view>实时政策</view>
					</view>
					<view class="recommend">{{v.CabinName}}{{v.Discount}}折</view>
					<!-- <view class="recommend">退改详情 | 托运行李20公斤</view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city1: '',
				city2: '',
				choiceDate: '',
				list: [],
				index: 0
			}
		},
		computed: {
			date1() {
				return this.$store.state.date1
			},
			day1() {
				return this.$store.state.day1
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.choiceDate = option.date
			let listData = JSON.parse(option.list)
			this.list = listData[option.index]
			console.log(this.list)
			this.$store.commit('changeListStart', JSON.stringify(listData[option.index]))
		},
		onReady() {
			let city1 = this.$store.state.city1
			let city2 = this.$store.state.city2
			this.city1 = city1
			this.city2 = city2
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			goOrder(k) {
				uni.navigateTo({
					url: '../airEnd/airEnd?index=' + k + '&airCompany=' + this.list.AirCompanyCode
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

	.contain {
		width: 100%;
		height: 100%;
	}

	.top {
		width: 100%;
		height: 300upx;
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
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		position: relative;
	}

	.back {
		position: absolute;
		left: 0;
	}

	.current {
		width: 100%;
		height: 40upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
	}

	.detail {
		position: absolute;
		width: 100%;
		padding: 30upx;
		left: 0;
		top: 70upx;
		box-sizing: border-box;
		z-index: 999;
		box-sizing: border-box;
	}

	.wrapper {
		width: 100%;
		background: #fff;
		border-radius: 4px;
	}

	.choiceTitle {
		width: 100%;
		height: 80upx;
		font-size: 14px;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clock {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		padding: 0 20upx;
		box-sizing: border-box;
		margin-top: 20upx;
	}

	.start {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		font-size: 18px;
	}

	.start>img {
		width: 280upx;
		margin-top: 10upx;
	}

	.bottomList {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 12px;
		color: #999;
		margin-top: 16upx;
	}

	.result {
		width: 100%;
		position: absolute;
		top: 400upx;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 4px;
	}

	.airs-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 20upx 0;
		border-bottom: 1px solid #eee;
	}
	
	.airs-list:last-child {
		border-bottom: none;
	}

	.airs-top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.air-btns {
		padding: 6upx 40upx;
		background: #E02B11;
		border-radius: 4px;
		font-size: 14px;
		color: #fff;
	}

	.airs-mark {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #E02B11;
		margin: 16upx 0;
	}

	.airs-mark>view {
		padding: 2upx 20upx;
		border: 1px solid #E02B11;
		border-radius: 4px;
		margin-right: 20upx;
	}

	.recommend {
		width: 100%;
		font-size: 14px;
		color: #333;
		margin-top: 10upx;
		color: #999;
	}
</style>
