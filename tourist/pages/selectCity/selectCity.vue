<template>
	<view class="contain">
		<view class="search">
			<text class="cuIcon-back" style="font-size: 15px;" @tap="goBack"></text>
			<mSearch :mode="2" button="inside" :show="false" @search="search($event,3)"></mSearch>
		</view>
		<!--筛选条件; 模拟列表的重置和演示空布局-->
		<view class="nav">
			<view :class="{active:tabType==0}" @click="changeTab(0)">国内城市</view>
			<!-- <view :class="{active:tabType==1}" @click="changeTab(1)">国际城市/港澳台</view> -->
		</view>
		<ss-select-city :hotCitys="hotCity" :value="value" @on-select="onSelect" @on-select1="onSelect1" />
		<van-popup v-model="show" position="bottom">
			<view class="result">
				<view class="wrapper" v-for="(v,k) in newJson" :key="k">
					<view class="result-item" @tap="onSearch1(v.cityname,v.citycode)">
						<view class="mask">城市</view>
						<view style="margin: 0 20upx;"><text style="color: #DE2910;">{{v.cityname}}</text> （所有机场）</view>
						<view>中国 {{v.citycode}}</view>
					</view>
					<view class="city-data" v-for="(item,index) in v.obj" :key="index" @tap="onSearch1(item.name,item.code)">
						<view>{{v.cityname}} {{item.name}}</view>
						<view style="margin-left: 20upx;">{{item.code}}</view>
					</view>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import mSearch from '../../components/search/search.vue'
	import ssSelectCity from '../../components/select-city/select-city.vue'
	import {airport} from '../../common/js/airport.js'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				tabType: 0, // 菜单
				hotCity: [],
				value: '郑州',
				type: 0,
				show: false,
				cityList: [],
				newJson: []
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.type = option.type
			let self = this
			//获取当前城市定位
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.address.city)
					self.value = res.address.city
				}
			})
			//获取热门城市列表
			for (let i = 0; i < airport.RECORDS.length; i++) {
				if (airport.RECORDS[i].ishot == 1 && airport.RECORDS[i].isinternal == 1) {
					this.hotCity.push(airport.RECORDS[i])
				}
			}
		},
		components: {
			mSearch,
			ssSelectCity
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
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			search(val) {
				this.show = true
				this.cityList = []
				for (let i = 0; i < airport.RECORDS.length; i++) {
					if (airport.RECORDS[i].cityname.indexOf(val) > -1 || airport.RECORDS[i].citycode.indexOf(val) > -1 || airport.RECORDS[i].citypinyin.indexOf(val) > -1) {
						this.cityList.push(airport.RECORDS[i])
					}
				}
				if(this.cityList.length == 0) {
					Toast('暂无数据，请重新输入内容搜索')
					this.show = false
					return
				}
				let arr = []
				for (let i = 0; i < this.cityList.length; i++) {
					arr.push({
						cityname: this.cityList[i].cityname,
						citycode: this.cityList[i].citycode,
						obj: [{
							name: this.cityList[i].name,
							code: this.cityList[i].code
						}]
					})
				}
				console.log(arr)
				var item1, item2
				let newJson = [] //盛放去重后数据的新数组
				for (item1 of arr) { //循环json数组对象的内容
					let flag = true
					for (item2 of newJson) { //循环新数组的内容
						if (item1.cityname == item2.cityname) { //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
							item2.obj.push(item1.obj[0])
							flag = false
						}
					}
					if(flag) {
						newJson.push(item1)
					}
				}
				console.log(newJson)
				this.newJson = newJson
			},
			// 切换菜单
			changeTab(type) {
				if (this.tabType !== type) {
					this.tabType = type
				}
			},
			onSelect(city) {
				this.$store.commit('changeSearchState', 0)
				if (this.type == 1) {
					this.$store.commit('changeCity1', city.cityname)
				} else if (this.type == 2) {
					this.$store.commit('changeCity2', city.cityname)
				} else if (this.type == 3) {
					this.$store.commit('changeCity3', city.cityname)
					this.$store.commit('changeStartCity1', city.citycode)
				} else if (this.type == 4) {
					this.$store.commit('changeCity4', city.cityname)
					this.$store.commit('changeEndCity1', city.citycode)
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			onSelect1(city) {
				this.$store.commit('changeSearchState', 2)
				if (this.type == 1) {
					this.$store.commit('changeCity1', city)
				} else if (this.type == 2) {
					this.$store.commit('changeCity2', city)
				} else if (this.type == 3) {
					this.$store.commit('changeCity3', city)
				} else if (this.type == 4) {
					this.$store.commit('changeCity4', city)
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			onSearch1(name,code) {
				// this.$store.commit('changeSearchState', 1)
				if (this.type == 1) {
					this.$store.commit('changeCity1', name)
					this.$store.commit('changeStartCity', code)
				} else if (this.type == 2) {
					this.$store.commit('changeCity2', name)
					this.$store.commit('changeEndCity', code)
				} else if (this.type == 3) {
					this.$store.commit('changeCity3', name)
					this.$store.commit('changeStartCity1', code)
				} else if (this.type == 4) {
					this.$store.commit('changeCity4', name)
					this.$store.commit('changeEndCity1', code)
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
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

	.search {
		width: 100%;
		height: 90upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: none;
	}

	/*菜单*/
	.nav {
		font-size: 28upx;
		text-align: center;
		height: 72upx;
	}

	.nav view {
		display: inline-block;
		width: 50%;
		padding: 16upx 0;
	}

	.nav .active {
		border-bottom: 2upx solid #FF6990;
		color: #FF6990;
	}

	.result {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.result-item {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 15px;
		color: #333;
		border-bottom: 1px solid #eee;
		padding: 20upx 0;
	}

	.mask {
		padding: 2upx 12upx;
		background: #DE2910;
		border-radius: 4px;
		font-size: 12px;
		color: #fff;
	}
	
	.city-data {
		width: calc(100% - 90upx);
		display: flex;
		align-items: center;
		padding: 16upx 0;
		margin-left: 90upx;
		border-bottom: 1px solid #eee;
	}
</style>
