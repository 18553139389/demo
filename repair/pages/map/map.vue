<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="false" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">搜索位置</block>
				<block slot="right">确定</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<cover-view class="search">
				<view class="box">
					<input type="text" v-model="val" @input="searchList" placeholder="请输入关键词搜索">
				</view>
			</cover-view>
			<map id="map" style="width: 100%; height: 300px;" :enable-3D="true" :scale="scale" :latitude="latitude" :longitude="longitude"
			@regionchange="mapChange">
				<cover-image :style="{top:top + 'px'}" src="../../static/images/icon_position.png" class="icon-img"></cover-image>
			</map>
			<scroll-view scroll-y class="scroll" :style="{height:height + 'px'}">
				<view class='item' v-for='(item, index) in list' :key='index' @click="bindAddress(index)">
					<view class="item-left">
						<view>{{item.title}}</view>
						<view style="font-size: 26rpx;color: #999;margin-top: 16rpx;">{{item.address}}</view>
					</view>
					<icon type='success' color='#E74246' size='22' class='icon_circle' v-if="checked == index" />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import Vue from 'vue'
	import VueJsonp from 'vue-jsonp'
	Vue.use(VueJsonp)
	const vm = new Vue
	var QQMapWX = require('../../common/qqmap-wx-jssdk.js')
	var qqmapsdk = new QQMapWX({
		key: '5VUBZ-44LWX-UML4G-ZEJOS-M3JWQ-WSFWX',
		output: 'jsonp'
	})
	export default {
		data() {
			return {
				Color: '#333',
				top: 0,
				height: 0,
				list: [],
				checked: 0,
				mapStatus: 1,
				timer: null,
				mapCtx: null,
				latitude: 39.909,
				longitude: 116.39742,
				scale: 16,
				val: ''
			}
		},
		onLoad(option) {
			this.latitude = parseFloat(option.lat)
			this.longitude = parseFloat(option.lon)
			this.top = Vue.prototype.CustomBar + 150
			this.height = uni.getSystemInfoSync().windowHeight - Vue.prototype.CustomBar - 300
			this.getAddressList()
		},
		methods: {
			goRight() {
				uni.navigateBack({
				    delta: 1
				})
			},
			getAddressList() {
				let that = this
				// qqmapsdk.reverseGeocoder({
				// 	location: {
				// 		latitude: 39.909,
				// 		longitude: 116.39742
				// 	},
				// 	get_poi: 1,
				// 	output: 'jsonp',
				// 	poi_options: "page_size=20;page_index=1",
				// 	success: function(e) {
				// 		console.log(e)
				// 		that.list = e.result.pois
				// 		let checked = that.checked
				// 		that.$store.commit('changeTitle', that.list[checked].ad_info.city ? that.list[checked].ad_info.city : that.list[checked].city)
				// 		that.$store.commit('changeTitle1', that.list[checked].ad_info.district ? that.list[checked].ad_info.district : that.list[checked].district)
				// 		that.$store.commit('changeAddress', that.list[checked].address)
				// 		that.$store.commit('changeLat', that.list[checked].location.lat)
				// 		that.$store.commit('changeLon', that.list[checked].location.lng)
				// 	},
				// 	fail: err => {
				// 		console.log(err)
				// 	}
				// })
				
				vm.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
						coord_type: 5,
						get_poi: 1,
						output: 'jsonp',
						key: '5VUBZ-44LWX-UML4G-ZEJOS-M3JWQ-WSFWX',
						poi_options: 'page_size=20;page_index=1',
						location: parseFloat(that.latitude) + ',' + parseFloat(that.longitude)
					})
					.then(e => {
						// 请求成功的返回数据
						that.list = e.result.pois
						let checked = that.checked
						that.$store.commit('changeTitle', that.list[checked].ad_info.city ? that.list[checked].ad_info.city : that.list[checked].city)
						that.$store.commit('changeTitle1', that.list[checked].ad_info.district ? that.list[checked].ad_info.district : that.list[checked].district)
						that.$store.commit('changeAddress', that.list[checked].address)
						that.$store.commit('changeLat', that.list[checked].location.lat)
						that.$store.commit('changeLon', that.list[checked].location.lng)
					})
					.catch(err => {
						// 请求失败的返回数据
						console.log(err)
					})
			},
			bindAddress(index) {
				let that = this
				let list = this.list
				this.latitude = parseFloat(list[index].location.lat)
				this.longitude = parseFloat(list[index].location.lng)
				if(that.list[index].ad_info) {
					that.$store.commit('changeTitle', that.list[index].ad_info.city)
				}
				if(that.list[index].city) {
					that.$store.commit('changeTitle', that.list[index].city)
				}
				if(that.list[index].ad_info) {
					that.$store.commit('changeTitle1', that.list[index].ad_info.district)
				}
				if(that.list[index].district) {
					that.$store.commit('changeTitle1', that.list[index].district)
				}
				that.$store.commit('changeAddress', that.list[index].address)
				that.$store.commit('changeLat', that.list[index].location.lat)
				that.$store.commit('changeLon', that.list[index].location.lng)
				this.checked = index
				this.mapStatus = 0
			},
			mapChange(e) {
				let that = this
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (e.detail.type == 'end') {
						that.mapCtx = uni.createMapContext('map', this)
						that.mapCtx.getCenterLocation({
							success: function(res) {
								console.log(res)
								that.latitude = parseFloat(res.latitude)
								that.longitude = parseFloat(res.longitude)
								if (that.mapStatus) {
									that.getAddressList()
								} else {
									that.mapStatus = 1
								}
							}
						})
					}
				}, 200)
			},
			searchList() {
				let that = this
				// qqmapsdk.getSuggestion({
				// 	keyword: that.val,
				// 	success: res => {
				// 		console.log(res)
				// 		this.list = res.data
				// 		this.latitude = parseFloat(this.list[0].location.lat)
				// 		this.longitude = parseFloat(this.list[0].location.lng)
				// 		that.$store.commit('changeTitle', that.list[0].city)
				// 		that.$store.commit('changeTitle1', that.list[0].district)
				// 		that.$store.commit('changeAddress', that.list[0].address)
				// 		that.$store.commit('changeLat', that.list[0].location.lat)
				// 		that.$store.commit('changeLon', that.list[0].location.lng)
				// 	},
				// 	fail: err => {
				// 		console.log(err)
				// 	}
				// })
				
				vm.$jsonp("https://apis.map.qq.com/ws/place/v1/suggestion", {
						keyword: this.val,
						region: '全国',
						region_fix: 0,
						policy: 0,
						page_size: 10,
						page_index: 1,
						get_subpois: 0,
						output: 'jsonp',
						key: '5VUBZ-44LWX-UML4G-ZEJOS-M3JWQ-WSFWX'
					})
					.then(res => {
						// 请求成功的返回数据
						console.log(res)
						this.list = res.data
						let checked = this.checked
						this.latitude = parseFloat(this.list[checked].location.lat)
						this.longitude = parseFloat(this.list[checked].location.lng)
						that.$store.commit('changeTitle', that.list[checked].city)
						that.$store.commit('changeTitle1', that.list[checked].district)
						that.$store.commit('changeAddress', that.list[checked].address)
						that.$store.commit('changeLat', that.list[checked].location.lat)
						that.$store.commit('changeLon', that.list[checked].location.lng)
					})
					.catch(err => {
						// 请求失败的返回数据
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.search {
				position: fixed;
				top: 120rpx;
				left: 0;
				width: 100%;
				display: flex;
				justify-content: center;
				z-index: 999;
				
				.box {
					width: 80%;
					height: 70rpx;
					background: #fff;
					border-radius: 30px;
					padding: 0 24rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					
					input {
						width: 100%;
						font-size: 28rpx;
						color: #333;
					}
				}
			}

			map {
				width: 100%;
				height: 300px;
				position: relative;
			}

			.icon-img {
				width: 36px;
				height: 36px;
				display: block;
				position: fixed;
				top: 150px;
				left: 50%;
				margin-top: -18px;
				margin-left: -18px;
			}

			.scroll {
				width: 100%;

				.item {
					width: 100%;
					padding: 24rpx 28rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.item-left {
						max-width: 90%;
						font-size: 28rpx;
						color: #333;
					}
				}
			}
		}
	}
</style>
