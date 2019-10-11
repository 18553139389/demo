<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">城市选择</block>
			</cu-custom>
		</view>
		<ss-select-city :value="value" @on-select="onSelect" @on-select1="onSelect1" @on-current="onCurrent" />
	</view>
</template>

<script>
	import mSearch from '../../components/search/search.vue'
	import ssSelectCity from '../../components/select-city/select-train.vue'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				value: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
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
			onCurrent(val) {
				this.$store.commit('changeHotelCity', this.$store.state.currentCity)
				this.$store.commit('changeHotelLat', this.$store.state.currentLat)
				this.$store.commit('changeHotelLng', this.$store.state.currentLon)
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			onSelect(city) {
				console.log(city)
				this.$store.commit('changeHotelCity', city.name)
				this.$store.commit('changeHotelLat', city.lat)
				this.$store.commit('changeHotelLng', city.lon)
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			onSelect1(city) {
				console.log(city)
				this.$store.commit('changeHotelCity', city.name)
				this.$store.commit('changeHotelLat', city.lat)
				this.$store.commit('changeHotelLng', city.lon)
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
