<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">家装服务</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item" v-if="hide1">
				<view class="titles" @tap="goControl">
					<view>服务品类</view>
					<image src="../../static/images/rights.png"></image>
				</view>
				<view class="types">
					<view :class="itemIndex1 == k ? 'active types-item' : 'types-item'" v-for="(v,k) in type1" :key="k" :style="{marginRight:(k+1)%4 == 0 ? '0' : '2%'}"
					@tap="changeType1(k,v.id)">{{v.name}}</view>
				</view>
			</view>
			<view class="item" v-if="hide2">
				<view class="titles" @tap="goControl1">
					<view>品牌类型</view>
					<image src="../../static/images/rights.png"></image>
				</view>
				<view class="types" v-if="show2">
					<view :class="itemIndex2 == k ? 'active types-item' : 'types-item'" v-for="(v,k) in type2" :key="k" :style="{marginRight:(k+1)%4 == 0 ? '0' : '2%'}"
					@tap="changeType2(k,v.id)">{{v.name}}</view>
				</view>
			</view>
			<view class="item" v-if="hide3">
				<view class="titles">
					<view>分类预估价位</view>
					<image src="../../static/images/rights.png"></image>
				</view>
				<view class="choice">
					<checkbox-group @change="checkboxChange">
						<view class="choice-item" v-for="(v,k) in checkbox" :key="k" v-if="checkbox.length > 0">
							<view>{{v.content}}</view>
							<view class="price">
								<view>￥{{v.price}}</view>
								<checkbox class='round orange' :class="checkbox[k].state?'checked':''" :checked="checkbox[k].state?true:false"
								 :value="v.id"></checkbox>
							</view>
						</view>
					</checkbox-group>
					<checkbox-group @change="checkboxChange1">
						<view class="choice-items" v-for="(v,k) in checkbox1" :key="k" v-if="checkbox1.length > 0">
							<view class="other" @tap="goOther(k)">
								<view>{{v.name}}</view>
								<image :src="v.status ? '../../static/images/up.png' : '../../static/images/dw.png'"></image>
							</view>
							<view class="other-box" v-show="v.status">
								<view class="others" v-for="(ite,idx) in v.ygjwList" :key="idx">
									<view>{{ite.content}}</view>
									<view class="price">
										<view>￥{{ite.price}}</view>
										<checkbox class='round orange' :class="ite.state?'checked':''" :checked="ite.state?true:false" :value="ite.id"></checkbox>
									</view>
								</view>
							</view>
						</view>
					</checkbox-group>
				</view>
			</view>
			<view class="item">
				<view class="titles">服务方式</view>
				<view class="types">
					<view :class="itemIndex4 == k ? 'active types-item' : 'types-item'" v-for="(v,k) in type4" :key="k" :style="{marginRight:(k+1)%4 == 0 ? '0' : '2%'}"
					@tap="changeType4(k,v.id)">{{v.name}}</view>
				</view>
			</view>
			<view class="item" style="padding-bottom: 0;border-bottom: none;">
				<view class="titles">基本信息</view>
				<view class="address">
					<view class="address-list" style="padding-top: 0;" @tap="goMap">
						<view class="address-left">
							<view style="width: 140rpx;">服务地址：</view>
							<view style="margin-left: 24rpx;color: #333;">{{location1}} {{location2}}</view>
						</view>
						<view style="color: #F15A03;">更换位置</view>
					</view>
					<view class="address-list">
						<view class="address-left" style="width: 100%;">
							<view style="width: 140rpx;">详细地址：</view>
							<input type="text" v-model="address" placeholder="请输入详细地址" style="flex:1;">
						</view>
					</view>
					<view class="address-list" v-if="open1">
						<view class="address-left">
							<view style="width: 140rpx;">联系电话：</view>
							<input type="text" v-model="call" placeholder="请输入联系电话" @input="changeCall">
						</view>
					</view>
					<view class="address-list" style="border-bottom: none;" v-if="open2">
						<view class="address-left">
							<view style="width: 140rpx;">验证码：</view>
							<input type="text" v-model="code" placeholder="请输入验证码">
						</view>
						<button class="codes" type="button" :disabled="btnState" @click="getValidate">{{rTime}} <span v-if="btnState">s</span></button>
					</view>
				</view>
			</view>
			<view class="agree">
				<view class="read">提交即同意<text style="color:#0081FF;text-decoration: underline;" @tap="goAgree">《跑步修-服务协议》</text></view>
				<jiuaiCheckbox @change='changeBox' :checked="agree" :fontSize="18" :color="color" :borderStyle="borderStyle"></jiuaiCheckbox>
			</view>
			<view class="submit">
				<view>预估价位：<text style="color: #F15A03;">￥{{totalAll}}</text></view>
				<view class="btn" @tap="goYue">立即下单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jPicker from '../../components/J-Picker/jPicker.vue'
	import jiuaiCheckbox from "../../components/jiuai-checkbox/jiuai-checkbox.vue"
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	import Vue from 'vue'
	import VueJsonp from 'vue-jsonp'
	Vue.use(VueJsonp)
	const vm = new Vue
	var QQMapWX = require('../../common/qqmap-wx-jssdk.js')
	var qqmapsdk = new QQMapWX({
		key: '5VUBZ-44LWX-UML4G-ZEJOS-M3JWQ-WSFWX'
	})
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				itemIndex: 0,
				itemIndex1: 0,
				itemIndex2: -1,
				itemIndex4: 0,
				bookVal: '',
				show: false,
				address: '',
				call: '',
				code: '',
				agree: false,
				color: '#0081FF',
				borderStyle: '1px solid #0081FF',
				btnState: false,
				rTime: '获取验证码',
				type: '',
				type1: [],
				type2: [],
				type3: [],
				type4: [],
				type5: [],
				bookData: [],
				checkbox: [],
				checkbox1: [],
				mark: 0,
				city: '',
				lat: '',
				lon: '',
				location1: '开封市',
				location2: '',
				id0: '',
				id1: '',
				id2: '',
				id3: '',
				serviceId: '',
				totalAll: 0,
				idArrAll: [],
				show1: false,
				show2: false,
				hide1: false,
				hide2: false,
				hide3: false,
				states: 1,
				open1: false,
				open2: false
			}
		},
		components: {
			jPicker,
			jiuaiCheckbox
		},
		onLoad(option) {
			this.mark = option.mark
			let mark = this.mark
			if (mark == 1 || mark == 2 || mark == 3 || mark == 4 || mark == 6 || mark == 7 || mark == 8 || mark == 12 || mark ==
				13 || mark == 14 || mark == 15 || mark == 19 || mark == 20 || mark == 21) {
				this.hide1 = true
			}
			if (mark == 12 || mark == 13 || mark == 14 || mark == 15 || mark == 16 || mark == 17 || mark == 18) {
				if(mark == 16 || mark == 17 || mark == 18) {
					this.itemIndex2 = 0
				}
				this.hide2 = true
				this.show2 = true
			}
			this.city = option.city
			this.id0 = option.id
			this.states = option.type
			this.init(option.id)
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				this.open1 = true
				this.call = uni.getStorageSync('phone')
			}
			let self = this
			if (this.$store.state.title && this.$store.state.address) {
				self.location1 = this.$store.state.title
				self.location2 = this.$store.state.title1
				self.address = this.$store.state.address
				self.lat = this.$store.state.lat
				self.lon = this.$store.state.lon
			} else {
				uni.getLocation({
					type: 'gcj02 ',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude)
						console.log('当前位置的纬度：' + res.latitude)
						self.getAddressList(res.latitude, res.longitude)
					}
				})
			}
		},
		methods: {
			changeCall(e) {
				if(e.detail.value == uni.getStorageSync('phone')) {
					this.open2 = false
				} else {
					this.open2 = true
				}
			},
			goControl() {
				this.show1 = !this.show1
			},
			goControl1() {
				this.show2 = !this.show2
			},
			getAddressList(latitude, longitude) {
				let that = this
				// qqmapsdk.reverseGeocoder({
				// 	location: {
				// 		latitude: parseFloat(latitude),
				// 		longitude: parseFloat(longitude)
				// 	},
				// 	get_poi: 1,
				// 	poi_options: "page_size=20;page_index=1",
				// 	success: function(e) {
				// 		console.log(e)
				// 		that.lat = e.result.location.lat
				// 		that.lon = e.result.location.lng
				// 		that.location1 = e.result.address_component.city
				// 		that.location2 = e.result.address_component.district
				// 		that.address = e.result.address_component.street
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
						location: parseFloat(latitude) + ',' + parseFloat(longitude)
					})
					.then(e => {
						// 请求成功的返回数据
						console.log(e)
						that.lat = e.result.location.lat
						that.lon = e.result.location.lng
						that.location1 = e.result.address_component.city
						that.location2 = e.result.address_component.district
						that.address = e.result.address_component.street
					})
					.catch(err => {
						// 请求失败的返回数据
						console.log(err)
					})
			},
			goAgree() {
				uni.navigateTo({
					url: '/pages/agree/agree?type=1'
				})
			},
			goMap() {
				uni.navigateTo({
					url: '/pages/map/map?lat=' + this.lat + '&lon=' + this.lon
				})
			},
			showPosition(position) {
				console.log(position)
				this.lat = position.lat
				this.lon = position.lng
				this.location1 = position.province
				this.location2 = position.city
				this.address = position.district
			},
			init(id) {
				this.getList(id)
				if (this.mark == 5 || this.mark == 9 || this.mark == 10 || this.mark == 11) {
					this.hide3 = true
					this.getType2(id)
				} else {
					this.getType1(id)
				}
			},
			getList(id) {
				let self = this
				let data1 = {
					categoryId: id
				}
				let data = {
					url: '/api/serviceMethodList',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							Toast.hideLoading()
							self.type4 = res.data.dataList
							self.serviceId = self.type4[0].id
						} else {
							Toast.hideLoading()
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			getType1(id) {
				let self = this
				let data1 = {
					categoryId: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/categoryList',
						data: data1,
						success: function(res) {
							console.log(res)
							let mark = self.mark
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (mark == 1 || mark == 2 || mark == 3 || mark == 4 || mark == 6 || mark == 7 || mark == 8 || mark == 12 ||
									mark == 13 || mark == 14 || mark == 15 || mark == 19 || mark == 20 || mark == 21) {
									self.type1 = res.data.dataList
									self.id1 = self.type1[0].id
									if(mark == 12 || mark == 13 || mark == 14 || mark == 15) {
										self.getSku(self.type1[0].id)
									} else {
										self.hide3 = true
										self.getType2(self.type1[0].id)
									}
								} else if (mark == 16 || mark == 17 || mark == 18) {
									self.type2 = res.data.dataList
									self.id2 = self.type2[0].id
									self.hide3 = true
									self.getType2(self.type2[0].id)
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			getType2(id) {
				let self = this
				let data1 = {
					categoryId: id,
					city: this.city
				}
				let data = {
					url: '/api/estimatedLevelList',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							Toast.hideLoading()
							if (res.data.categoryList) {
								self.checkbox1 = res.data.categoryList
								self.checkbox1.forEach((item, index) => {
									item.status = false
									item.ygjwList.forEach((ite, idx) => {
										ite.state = false
									})
								})
							}
							if (res.data.dataList) {
								self.checkbox = res.data.dataList
								self.checkbox.forEach((item, index) => {
									item.state = false
								})
							}
							self.total()
							self.idArr()
							self.$forceUpdate()
						} else {
							Toast.hideLoading()
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			getSku(id) {
				let self = this
				let data1 = {
					categoryId: id
				}
				let data = {
					url: '/api/categoryList',
					data: data1,
					success: function(res) {
						console.log(res)
						let mark = self.mark
						if (res.data.result == 0) {
							Toast.hideLoading()
							if (mark == 12 || mark == 13 || mark == 14 || mark == 15) {
								self.type2 = res.data.dataList
								self.id2 = self.type2[0].id
								self.getType2(self.type2[0].id)
							} 
						} else {
							Toast.hideLoading()
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			changeType1(k, id) {
				let self = this
				if (this.itemIndex1 == k) {
					return
				}
				this.itemIndex1 = k
				this.id1 = id
				let mark = this.mark
				if (mark == 12 || mark == 13 || mark == 14 || mark == 15) {
					self.getSku(id)
				} else {
					self.hide3 = true
					self.getType2(id)
				}
			},
			changeType2(k, id) {
				let self = this
				if (this.itemIndex2 == k) {
					return
				}
				this.itemIndex2 = k
				this.id2 = id
				let mark = this.mark
				if (mark == 12 || mark == 13 || mark == 14 || mark == 15 || mark == 16 || mark == 17 || mark == 18) {
					self.hide3 = true
					self.getType2(id)
				}
			},
			changeType4(k, id) {
				if (this.itemIndex4 == k) {
					return
				}
				this.itemIndex4 = k
				this.serviceId = id
			},
			total() {
				let totals = 0
				if (this.checkbox.length > 0) {
					this.checkbox.forEach((item, index) => {
						if (item.state == true) {
							totals += parseFloat(item.price)
						}
					})
				}

				if (this.checkbox1.length > 0) {
					for (var i = 0, lenI = this.checkbox1.length; i < lenI; i++) {
						const item = this.checkbox1[i]
						for (var j = 0; j < item.ygjwList.length; j++) {
							if (item.ygjwList[j].state == true) {
								totals += parseFloat(item.ygjwList[j].price)
							}
						}
					}
				}
				this.totalAll = totals
			},
			idArr() {
				let arr = []
				if (this.checkbox.length > 0) {
					this.checkbox.forEach((item, index) => {
						if (item.state == true) {
							arr.push(item.id)
						}
					})
				}

				if (this.checkbox1.length > 0) {
					for (var i = 0, lenI = this.checkbox1.length; i < lenI; i++) {
						const item = this.checkbox1[i]
						for (var j = 0; j < item.ygjwList.length; j++) {
							if (item.ygjwList[j].state == true) {
								arr.push(item.ygjwList[j].id)
							}
						}
					}
				}
				this.idArrAll = arr
			},
			checkboxChange: function(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id)) {
						this.$set(item, 'state', true)
					} else {
						this.$set(item, 'state', false)
					}
				}
				this.total()
				this.idArr()
				this.$forceUpdate()
			},
			checkboxChange1: function(e) {
				console.log(e)
				var items = this.checkbox1,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					for (var j = 0; j < item.ygjwList.length; ++j) {
						if (values.includes(item.ygjwList[j].id)) {
							item.ygjwList[j].state = true
						} else {
							item.ygjwList[j].state = false
						}
					}
				}
				this.total()
				this.idArr()
				this.$forceUpdate()
			},
			goOther(k) {
				this.checkbox1[k].status = !this.checkbox1[k].status
				this.$forceUpdate()
			},
			getValidate() {
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				let self = this
				self.rTime = 60
				let rTime = self.rTime
				self.btnState = true
				let interval = setInterval(() => {
					if (--self.rTime <= 0) {
						self.rTime = '获取验证码'
						clearInterval(interval)
						self.btnState = false
					}
				}, 1000)

				//获取验证码
				let data1 = {
					phoneNum: this.call
				}
				Toast.showLoading('发送中...', function() {
					let data = {
						url: '/api/sendSmsCode',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('发送成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			changeBox(e) {
				console.log(e)
				this.agree = e.detail.checked
			},
			goAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			goYue() {
				if (this.idArrAll.length == 0) {
					Toast.showToast('请选择分类预估价位')
					return
				}
				if (this.address == '') {
					Toast.showToast('请填写详细地址')
					return
				}
				if (uni.getStorageSync('uid')) {
					if (this.call == '') {
						Toast.showToast('手机号不能为空')
						return
					} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
						Toast.showToast('手机号格式不正确')
						return
					}
					if(this.open2) {
						if (this.code == '') {
							Toast.showToast('验证码不能为空')
							return
						}
					}
				}
				if (!this.agree) {
					Toast.showToast('请勾选服务协议')
					return
				}
				if(!uni.getStorageSync('uid')) {
					uni.navigateTo({
					    url: '/pages/login/login'
					})
					return
				}
				if(this.address.length > 20) {
					this.address = this.address.substring(0,20)
				}
				let arr = []
				let categoryIds = ''
				let categoryId = ''
				if (this.id1) {
					arr.push(this.id1)
				}
				if (this.id2) {
					arr.push(this.id2)
				}
				if (arr.length == 0) {
					categoryIds = ''
					categoryId = this.id0
				} else {
					categoryIds = arr.join(',')
					categoryId = arr[arr.length - 1]
				}

				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					orderType: 4,
					ejCategoryId: this.id0,
					categoryId,
					categoryIds,
					serviceMethodId: this.serviceId,
					address: this.location1 + this.location2,
					detail: this.address,
					lngAndLat: this.lon + ',' + this.lat,
					telephone: this.call,
					price: this.totalAll,
					yuguId: this.idArrAll.join(','),
					code: this.code
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/saveOrder',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.navigateTo({
									url: '/pages/result/result?type=' + self.states
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
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
			align-items: center;
			border-top: 1px solid #eee;
			padding-bottom: 120rpx;

			.agree {
				width: 100%;
				padding: 24rpx;
				box-sizing: border-box;
				background: #f2f2f2;
				display: flex;
				align-items: center;

				.read {
					margin-right: 28rpx;
				}
			}

			.submit {
				width: 100%;
				height: 90rpx;
				padding-left: 28rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: #333;
				position: fixed;
				left: 0;
				bottom: 0;
				z-index: 999;
				background: #fff;

				.btn {
					height: 90rpx;
					line-height: 90rpx;
					padding: 0 40rpx;
					background: #F15A03;
					font-size: 30rpx;
					color: #fff;
				}
			}

			.item {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 0 28rpx;
				box-sizing: border-box;
				border-bottom: 8px solid #eee;

				.titles {
					width: 100%;
					height: 90rpx;
					line-height: 90rpx;
					font-size: 30rpx;
					color: #333;
					font-weight: 600;
					display: flex;
					justify-content: space-between;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
					}
				}

				.types {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					padding-bottom: 20rpx;

					.types-item {
						width: 23.5%;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
						font-size: 26rpx;
						color: #666;
						background: #f5f5f5;
						margin-bottom: 2%;
						border-radius: 4px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						&.active {
							background: #F15A03;
							color: #fff;
						}
					}
				}

				.sku {
					width: 100%;
					height: 90rpx;
					display: flex;
					align-items: center;

					.sku-title {
						font-size: 30rpx;
						color: #333;
						font-weight: 600;
					}

					.sku-name {
						width: 75%;
						font-size: 28rpx;
						color: #666;
						margin-left: 28rpx;
					}
				}

				.choice {
					width: 100%;
					display: flex;
					flex-direction: column;
					padding-bottom: 30rpx;

					.choice-item {
						width: 100%;
						height: 80rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						background: #f8f8f8;
						border-radius: 4px;
						padding: 0 24rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						color: #666;
						margin-bottom: 24rpx;

						.price {
							display: flex;
							align-items: center;

							.round {
								display: flex;
								justify-content: center;
								align-items: center;
								border-color: none !important;
								margin-left: 20rpx;
								margin-top: 4rpx;
							}
						}
					}

					.choice-items {
						width: 100%;
						display: flex;
						flex-direction: column;
						background: #f8f8f8;
						border-radius: 4px;
						font-size: 28rpx;
						color: #666;
						margin-bottom: 24rpx;

						.other {
							width: 100%;
							height: 80rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 0 20rpx 0 24rpx;
							box-sizing: border-box;

							image {
								width: 46rpx;
								height: 46rpx;
							}
						}

						.other-box {
							width: 100%;
							display: flex;
							flex-direction: column;
							border-top: 1px solid #eee;

							.others {
								width: 100%;
								margin: 28rpx 0;
								padding: 0 24rpx;
								box-sizing: border-box;
								display: flex;
								justify-content: space-between;
								align-items: center;

								.price {
									display: flex;
									align-items: center;

									.round {
										display: flex;
										justify-content: center;
										align-items: center;
										border-color: none !important;
										margin-left: 20rpx;
										margin-top: 4rpx;
									}
								}
							}
						}
					}
				}

				.address {
					width: 100%;
					display: flex;
					flex-direction: column;

					.address-list {
						width: 100%;
						height: 80rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #eee;

						.address-left {
							height: 80rpx;
							display: flex;
							align-items: center;
							font-size: 28rpx;
							color: #666;

							input {
								height: 80rpx;
								max-width: 55%;
								font-size: 28rpx;
								color: #333;
								margin-left: 24rpx;
								margin-top: 8rpx;
							}
						}

						.codes {
							height: 50upx;
							line-height: 50upx;
							border: 1px solid #F15A03;
							border-radius: 4px;
							font-size: 24rpx;
							color: #666;
							margin: 0;
							padding: 0 24rpx;
						}

						image {
							width: 46rpx;
							height: 46rpx;
						}
					}
				}
			}
		}
	}
</style>
