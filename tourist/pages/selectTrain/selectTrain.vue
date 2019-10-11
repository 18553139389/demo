<template>
	<view class="contain">
		<!-- <view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">城市选择</block>
			</cu-custom>
		</view> -->
		<view class="search">
			<text class="cuIcon-back" style="font-size: 15px;" @tap="goBack"></text>
			<mSearch :placeholder="text" :mode="2" button="inside" :show="false" @search="search($event,3)"></mSearch>
		</view>
		<ss-select-city :value="value" @on-select="onSelect" @on-select1="onSelect1" @on-current="onCurrent" />
		<van-popup v-model="show" position="bottom">
			<view class="result">
				<view class="result-item" v-for="(v,k) in searchList" :key="k" @tap="searchCity(v.name)">
					<view>{{v.name}}</view>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import mSearch from '../../components/search/search.vue'
	import ssSelectCity from '../../components/select-city/select-trains.vue'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				value: '',
				type: 0,
				cityList: [],
				newJson: [],
				show: false,
				searchList: [],
				text: "请输入城市名称"
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.type = option.type
			this.value = this.$store.state.currentCity
		},
		components: {
			ssSelectCity,
			mSearch
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
			onCurrent(val) {
				if (this.type == 1) {
					this.$store.commit('changeTrain1', val)
				} else if (this.type == 2) {
					this.$store.commit('changeTrain2', val)
				} 
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			onSelect(city) {
				if (this.type == 1) {
					this.$store.commit('changeTrain1', city.name)
				} else if (this.type == 2) {
					this.$store.commit('changeTrain2', city.name)
				} else if(this.type == 3) {
					this.$store.commit('changeHotelCity', city.name)
					this.$store.commit('changeHotelLat', city.lat)
					this.$store.commit('changeHotelLng', city.lon)
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			onSelect1(city) {
				if (this.type == 1) {
					this.$store.commit('changeTrain1', city.name)
				} else if (this.type == 2) {
					this.$store.commit('changeTrain2', city.name)
				} else if(this.type == 3) {
					this.$store.commit('changeHotelCity', city.name)
					this.$store.commit('changeHotelLat', city.lat)
					this.$store.commit('changeHotelLng', city.lon)
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			search(val) {
				let list = this.$store.state.trainCitys
				let arr1 = []
				for(let i=0;i<list.length;i++){
					for(let j=0;j<list[i].list.length;j++){
						if(list[i].list[j].name.indexOf(val) > -1){
							arr1.push(list[i].list[j])
						}
					}
				}
				this.searchList = arr1
				if(this.searchList.length == 0){
					Toast("没有搜索到符合条件的城市")
				}else{
					this.show = true
				}
			},
			searchCity(val) {
				if (this.type == 1) {
					this.$store.commit('changeTrain1', val)
				} else if (this.type == 2) {
					this.$store.commit('changeTrain2', val)
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
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
		padding: 20upx 30upx;
		box-sizing: border-box;
	}
	
	.result-item:last-of-type {
		border-bottom: none;
	}
</style>
