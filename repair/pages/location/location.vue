<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">切换地区</block>
			</cu-custom>
		</view>
		<city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity" :obtainCitys="obtainCitys"
		:isSearch="true" ref="citys"></city-select>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import Vue from 'vue'
	import VueJsonp from 'vue-jsonp'
	Vue.use(VueJsonp)
	const vm = new Vue
	import citys from './citys.js'
	import citySelect from '../../components/city-select/city-select.vue'
	export default {
		data() {
			return {
				Color: '#333',
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'title',
				//当前城市
				activeCity: {
					cityName: '定位中...',
					cityCode: 110100
				},
				//热门城市
				hotCity: [],
				//显示的城市数据
				obtainCitys: [],
				location: '定位中...'
			}
		},
		components: {
			citySelect
		},
		onLoad() {
			let self = this
			uni.getLocation({
			    type: 'gcj02 ',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude)
			        console.log('当前位置的纬度：' + res.latitude)
					self.getAddressList(res.latitude,res.longitude)
			    }
			})
			//修改数据格式
			this.formatName = 'cityName'
			//修改热门城市
			this.hotCitys()
			//修改构建索引数据
			this.obtainCitys = citys
		},
		methods: {
			hotCitys() {
				let self = this
				let data2 = {}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/cityList',
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.hotCity = res.data.dataList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			getAddressList(latitude,longitude) {
				let that = this
				vm.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
						coord_type: 5,
						get_poi: 1,
						output: 'jsonp',
						key: '5VUBZ-44LWX-UML4G-ZEJOS-M3JWQ-WSFWX',
						poi_options: 'page_size=20;page_index=1',
						location: parseFloat(latitude) + ',' + parseFloat(longitude)
					})
					.then(e => {
						// 请求成功的返回数据
						console.log(e)
						that.location = e.result.address_component.city
						this.activeCity = {
							cityName: e.result.address_component.city,
							cityCode: 110100
						}
					})
					.catch(err => {
						// 请求失败的返回数据
						console.log(err)
					})
			},
			showPosition(position) {
				console.log(position)
				//修改当前城市
				this.location = position.city
				this.activeCity = {
					cityName: position.city,
					cityCode: 110100
				}
			},
			cityClick(item) {
				this.$store.commit('changeLocation', item.cityName)
				uni.navigateBack({
				    delta: 1
				})
			}
		}
	}
</script>

<style></style>
