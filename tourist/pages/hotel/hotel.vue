<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">酒店</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="box">
				<view class="address">
					<view class="citys" @tap="goCity">
						<view class="name">{{value}}</view>
						<img src="../../static/img/right.png" alt="">
					</view>
					<view class="current" @tap="goCurrent">
						<view>当前位置</view>
						<img src="../../static/img/jiudian_dingwei.png" alt="">
					</view>
				</view>
				<view class="date" @tap="goDate">
					<img src="../../static/img/jiudian_rili.png" alt="">
					<view class="startDate" style="margin-right: 90upx;">
						<view style="font-size: 12px;color: #666;">入住时间</view>
						<view>{{date1}}</view>
					</view>
					<img src="../../static/img/jiudian_rili.png" alt="">
					<view class="startDate" style="margin-left: 90upx;">
						<view style="font-size: 12px;color: #666;">离店时间</view>
						<view>{{date2}}</view>
					</view>
					<img src="../../static/img/jiudian_rili.png" alt="">
				</view>
				<view class="sou">
					<img src="../../static/img/jiudian_shouhuso.png" alt="">
					<input v-model="keyword" type="text" placeholder="请输入位置、品牌、酒店名" placeholder-class="place">
				</view>
				<view class="condition" @tap="goStar">
					<view class="sou-left">
						<img src="../../static/img/jiudian_xiangji.png" alt="">
						<view style="margin-left: 40upx;">星级</view>
					</view>
					<view class="sou-right">
						<view style="margin-right: 30upx;">{{star}}</view>
						<img src="../../static/img/right.png" alt="">
					</view>
				</view>
				<view class="condition" style="border-bottom: none;" @tap="goPrice">
					<view class="sou-left">
						<img src="../../static/img/jiudian_jiaqian.png" alt="">
						<view style="margin-left: 40upx;">价格</view>
					</view>
					<view class="sou-right">
						<view style="margin-right: 30upx;">{{price}}</view>
						<img src="../../static/img/right.png" alt="">
					</view>
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
		<view class="look" @tap="goCheck">查询</view>
		<van-popup v-model="show1" position="bottom">
			<van-picker show-toolbar :columns="columns1" @cancel="onCancel1" @confirm="onConfirm1" />
		</van-popup>
		<van-popup v-model="show2" position="bottom">
			<van-picker show-toolbar :columns="columns2" @cancel="onCancel2" @confirm="onConfirm2" />
		</van-popup>
	</view>
</template>

<script>
	import {ajaxs} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				value: '',
				keyword: '',
				show1: false,
				show2: false,
				price: '不限',
				star: '不限',
				columns1: ['不限', '￥150以下', '￥150-￥300', '￥301-￥450', '￥451-￥600', '￥601-￥1000', '￥1000以上'],
				columns2: ['不限', '五星级/豪华', '四星级/高档', '三星级/舒适', '二星级及以下'],
				minPrice: '',
				maxPrice: '',
				currentCity: '郑州',
				lon: '',
				lat: '',
				activityList: []
			}
		},
		onLoad() {
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.$store.commit('changeHotelDate1', this.dateFtt("MM-dd", new Date()))
			this.$store.commit('changeHotelDate2', this.GetDateStr(1))
			//初始化往返日期
			var dd = new Date()
			var y = dd.getFullYear()
			this.$store.commit('changeHotelFullDate1', this.dateFtt("yyyy/MM/dd", new Date(y + '-' + this.date1)))
			this.$store.commit('changeHotelFullDate2', this.dateFtt("yyyy/MM/dd", new Date(y + '-' + this.date2)))
			//初始化获取下面图片
			this.init()
		},
		onShow() {
			if (this.$store.state.hotelCity) {
				this.value = this.$store.state.hotelCity
			} else {
				this.value = this.$store.state.currentCity
			}
		},
		computed: {
			date1() {
				return this.$store.state.hotelDate1
			},
			date2() {
				return this.$store.state.hotelDate2
			}
		},
		methods: {
			init() {
				let self = this
				let datas = {
					type: 3
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
				ajaxs(data2)
			},
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
			goCity() {
				uni.navigateTo({
					url: '../selectHotel/selectHotel',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			//百度当前定位
			getMap(result) {
				console.log(result)
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
				return m + "-" + d
			},
			goDate() {
				uni.navigateTo({
					url: '../hotelDate/hotelDate',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			onCancel1() {
				this.show1 = false
			},
			onConfirm1(val) {
				this.show1 = false
				this.price = val
			},
			onCancel2() {
				this.show2 = false
			},
			onConfirm2(val) {
				this.show2 = false
				this.star = val
			},
			goPrice() {
				this.show1 = true
			},
			goStar() {
				this.show2 = true
			},
			goCheck() {
				switch (this.price) {
					case '不限':
						this.minPrice = '';
						this.maxPrice = '';
						break;
					case '￥150以下':
						this.minPrice = '';
						this.maxPrice = 150;
						break;
					case '￥150-￥300':
						this.minPrice = 150;
						this.maxPrice = 300;
						break;
					case '￥301-￥450':
						this.minPrice = 301;
						this.maxPrice = 450;
						break;
					case '￥451-￥600':
						this.minPrice = 451;
						this.maxPrice = 600;
						break;
					case '￥601-￥1000':
						this.minPrice = 601;
						this.maxPrice = 1000;
						break;
					case '￥1000以上':
						this.minPrice = 1001;
						this.maxPrice = '';
				}

				switch (this.star) {
					case '不限':
						this.star = '';
						break;
					case '五星级/豪华':
						this.star = 5;
						break;
					case '四星级/高档':
						this.star = 4;
						break;
					case '三星级/舒适':
						this.star = 3;
						break;
					case '二星级及以下':
						this.star = 2;
						break;
				}

				let self = this
				let datas = {
					CityName: this.value,
					Keywords: this.keyword,
					MinPrice: this.minPrice,
					MaxPrice: this.maxPrice,
					Star: this.star
				}

				uni.navigateTo({
					url: '../hotelList/hotelList?list=' + JSON.stringify(datas) + '&type=1',
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goCurrent() {
				let self = this
				let datas = {
					CityName: this.$store.state.currentCity
				}
				uni.navigateTo({
					url: '../hotelList/hotelList?list=' + JSON.stringify(datas) + '&type=0',
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

	.box {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 4px;
		box-shadow: 1px 1px 5px #eee;
		display: flex;
		flex-direction: column;
	}

	.address {
		width: 100%;
		display: flex;
		align-items: center;
		padding-bottom: 20upx;
		border-bottom: 1px dashed #eee;
		justify-content: space-between;
	}

	.citys {
		width: 70%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
	}

	.name {
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.citys>img {
		width: 30upx;
	}

	.current {
		width: 27%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 12px;
		color: #666;
		border-left: 1px solid #eee;
	}

	.current>img {
		width: 30upx;
	}

	.date {
		width: 100%;
		padding: 20upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px dashed #eee;
	}

	.date>img {
		width: 50upx;
	}

	.startDate {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.sou {
		width: 100%;
		height: 80upx;
		border-bottom: 1px dashed #eee;
		display: flex;
		align-items: center;
	}

	.place {
		font-size: 14px;
		color: #999;
	}

	.sou>img {
		width: 28upx;
	}

	.sou>input {
		width: 80%;
		margin-left: 40upx;
	}

	.condition {
		width: 100%;
		height: 80upx;
		border-bottom: 1px dashed #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.sou-left,
	.sou-right {
		display: flex;
		align-items: center;
	}

	.sou-left>img,
	.sou-right>img {
		width: 28upx;
	}

	.map {
		width: 100%;
		height: 300px;
	}

	.look {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #E73C1D;
		position: fixed;
		left: 0;
		bottom: 0;
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
