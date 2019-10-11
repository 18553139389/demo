<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">
					<view>酒店地图</view>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				title: '',
				latitude: '',
				longitude: '',
				covers: []
			}
		},
		onLoad(option) {
			if(option.type == 0){
				this.latitude = this.$store.state.currentLat
				this.longitude = this.$store.state.currentLon
				let list = JSON.parse(option.list)
				for(let i=0;i<list.length;i++){
					this.covers.push({
						latitude: list[i].Lat,
						longitude: list[i].Lng,
						iconPath: '../../static/img/map1.png',
						width: 32,
						title: list[i].HotelName
					})
				}
			}else if(option.type == 1){
				this.latitude = this.$store.state.hotelLat
				this.longitude = this.$store.state.hotelLng
				let list = JSON.parse(option.list)
				for(let i=0;i<list.length;i++){
					this.covers.push({
						latitude: list[i].Lat,
						longitude: list[i].Lng,
						iconPath: '../../static/img/map1.png',
						width: 32,
						title: list[i].HotelName
					})
				}
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #FFFFFF;
	}
	
	.contain {
		width: 100%;
		height: 100vh;
	}
	
	.wrapper {
		width: 100%;
		height: calc(100% - 50px);
	}
</style>
