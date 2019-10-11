<template>
	<view class="contain">
		<view class="top">
			<view class="title">
				<text class="cuIcon-back back" @tap="back"></text>
				<view>{{city1}}</view>
				<img src="../../static/img/single.png" alt="">
				<view>{{city2}}</view>
				<view class="cars">共{{total}}趟</view>
			</view>
		</view>
		<view class="result">
			<scroll-view class="airs" scroll-y scroll-with-animation style="height: 100%;">
				<view class="airs-box" v-for="(v,k) in listData" :key="k" @tap="goDetail(v,v.IsCanBook)">
					<view class="result-list">
						<view class="list-item">
							<view class="team">
								<view class="team-left">
									<view class="location">
										<view style="margin-bottom: 16upx;font-size: 18px;">{{v.GoTime}}</view>
										<view>{{v.StartStation}}</view>
									</view>
									<view class="guide">
										<view>{{v.TrainCode}}</view>
										<img src="../../static/img/guide.png" alt="">
										<view>{{hour(v.RunTime)}}</view>
									</view>
									<view class="location">
										<view style="margin-bottom: 16upx;font-size: 18px;">{{v.ETime}}</view>
										<view>{{v.ToStation}}</view>
									</view>
								</view>
								<view class="team-right" v-if="v.TrainType == 0">￥{{v.EdzPrice}}</view>
								<view class="team-right" v-if="v.TrainType == 1">￥{{v.WzPrice}}</view>
								<view class="team-right" v-if="v.TrainType == 2">￥{{v.WzPrice}}</view>
								<view class="team-right" v-if="v.TrainType == 3">￥{{v.WzPrice}}</view>
								<view class="team-right" v-if="v.TrainType == 4">￥{{v.WzPrice}}</view>
								<view class="team-right" v-if="v.TrainType == 9">￥{{v.WzPrice}}</view>
							</view>
						</view>
						<view class="piao" v-if="v.TrainType == 0">
							<view style="margin-right: 10upx;">商务座：{{v.SwzNum}}</view>
							<view style="margin-right: 10upx;">特等座：{{v.TdzNum}}</view>
							<view style="margin-right: 10upx;">一等座：{{v.YdzNum}}</view>
							<view style="margin-right: 10upx;">二等座：{{v.EdzNum}}</view>
							<!-- <view>无座：{{v.WzNum}}</view> -->
						</view>
						<view class="piao" v-if="v.TrainType == 1">
							<view style="margin-right: 10upx;">一等座：{{v.YdzNum}}</view>
							<view style="margin-right: 10upx;">二等座：{{v.EdzNum}}</view>
							<view>无座：{{v.WzNum}}</view>
						</view>
						<view class="piao" v-if="v.TrainType == 2">
							<view style="margin-right: 10upx;">高级软卧：{{v.GjrwNum}}</view>
							<view style="margin-right: 10upx;">软卧：{{v.RwNum}}</view>
							<view style="margin-right: 10upx;">硬卧：{{v.YwNum}}</view>
							<view style="margin-right: 10upx;">硬座：{{v.YzNum}}</view>
							<view>无座：{{v.WzNum}}</view>
						</view>
						<view class="piao" v-if="v.TrainType == 3">
							<view style="margin-right: 10upx;">高级软卧：{{v.GjrwNum}}</view>
							<view style="margin-right: 10upx;">软卧：{{v.RwNum}}</view>
							<view style="margin-right: 10upx;">硬卧：{{v.YwNum}}</view>
							<view style="margin-right: 10upx;">硬座：{{v.YzNum}}</view>
							<view>无座：{{v.WzNum}}</view>
						</view>
						<view class="piao" v-if="v.TrainType == 4">
							<view style="margin-right: 10upx;">软卧：{{v.RwNum}}</view>
							<view style="margin-right: 10upx;">硬卧：{{v.YwNum}}</view>
							<view style="margin-right: 10upx;">软座：{{v.RzNum}}</view>
							<view style="margin-right: 10upx;">硬座：{{v.YzNum}}</view>
							<view>无座：{{v.WzNum}}</view>
						</view>
						<view class="piao" v-if="v.TrainType == 9">
							<view style="margin-right: 10upx;">高级软卧：{{v.GjrwNum}}</view>
							<view style="margin-right: 10upx;">软卧：{{v.RwNum}}</view>
							<view style="margin-right: 10upx;">硬卧：{{v.YwNum}}</view>
							<view style="margin-right: 10upx;">软座：{{v.RzNum}}</view>
							<view style="margin-right: 10upx;">硬座：{{v.YzNum}}</view>
							<view>无座：{{v.WzNum}}</view>
						</view>
					</view>
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
				<img style="width: 44upx;height: 44upx;" v-if="item1 == 0" src="../../static/img/nav5.png" />
				<img style="width: 44upx;height: 44upx;" v-if="item1 != 0" src="../../static/img/nav6.png" />
				<view :class="item1 == 0 ? 'font' : ''">车次低-高</view>
			</view>
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
				Color: '#FFFFFF',
				value: '',
				backColor: '#DE2910',
				total: 0,
				item1: 1,
				listData: []
			}
		},
		computed: {
			city1() {
				return this.$store.state.train1
			},
			city2() {
				return this.$store.state.train2
			}
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.init()
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
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let datas = {
					FromStation: this.$store.state.train1,
					ToStation: this.$store.state.train2,
					FromDate: this.$store.state.startTrainDate
				}
				let data = {
					url: '/api/gzh/trainQuery',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.total = res.data.Data.length
							self.listData = res.data.Data
							uni.hideLoading()
						} else {
							Toast(res.data.resultNote)
							uni.hideLoading()
						}
					}
				}
				ajax(data)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeNav(type) {
				if (this.item1 !== type) {
					this.item1 = type
				}

				if (type == 0) {
					this.listData.sort(this.CompareDate1)
				}

				if (type == 1) {
					this.listData.sort(this.CompareDate)
				}
			},
			CompareDate(t1, t2) {
				var date = new Date();
				var a = t1.GoTime.split(":")
				var b = t2.GoTime.split(":")
				return date.setHours(a[0], a[1]) - date.setHours(b[0], b[1])
			},
			CompareDate1(t1, t2) {
				var a = t1.TrainCode
				var b = t2.TrainCode
				return a > b
			},
			hour(s) {
				if(s < 60){
					return s + '分'
				} else if (s % 60 == 0) {
					return (s / 60) + '小时'
				} else {
					return (Math.floor(s / 60)) + '小时' + (s % 60) + '分'
				}
			},
			goDetail(item,state) {
				if(state){
					let list = JSON.stringify(item)
					uni.navigateTo({
						url: '../trainOrder/trainOrder?list=' + list
					})
				}else{
					Toast('火车票已售完')
				}
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

	.cars {
		position: absolute;
		right: 0;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		color: #fff;
	}

	.result {
		width: 100%;
		position: absolute;
		top: 140upx;
		bottom: 200upx;
		left: 0;
		right: 0;
		z-index: 2000;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.font {
		color: #E53719;
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
		margin-bottom: 30upx;
	}

	.line {
		width: 100%;
		height: 30upx;
		background: #F9F9F9;
	}

	.list-item {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.team {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px dashed #eee;
		padding-bottom: 20upx;
	}

	.team-left {
		display: flex;
		align-items: center;
	}

	.location {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.guide {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
		color: #666;
		margin: 0 30upx;
	}

	.guide>img {
		width: 110upx;
	}

	.team-right {
		font-size: 18px;
		color: #DE2910;
	}

	.piao {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #666;
		padding: 20upx 0 10upx;
	}
</style>
