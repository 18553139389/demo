<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor='backColor' :isHeads="false" :isBacks="true" bgColor="bg-shadeTop text-white"
			@goRight="goRight" @Back="Back">
				<block slot="backText">
					<view class="city">
						<view>{{location}}</view>
						<image class="down" src="../../static/images/down.png"></image>
					</view>
				</block>
				<block slot="right">
					<image class="downs" src="../../static/images/head.png"></image>
				</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
			 indicator-active-color="#F15A03">
				<swiper-item v-for="(v,k) in banner" :key="k">
					<image class="logo" :src="v.image"></image>
				</swiper-item>
			</swiper>
			<view class="box" v-if="list.length > 0">
				<scroll-view scroll-x="true" class="scroll">
					<view class="navs" >
						<view :class="navIndex == k ? 'navs-item active' : 'navs-item'" v-for="(v,k) in list" :key="k" @tap="changeNav(k,v.id)">
							<view class="nav-tit">{{v.name}}</view>
							<image src="../../static/images/shape.png" v-if="navIndex == k"></image>
						</view>
					</view>
				</scroll-view>
				<view class="list">
					<swiper class="swiper" :indicator-dots="status1" indicator-active-color="#F15A03">
						<swiper-item v-for="(v,k) in page1" :key="k">
							<ul class="list-items">
								<li class="li" v-for="(item,index) in list1" :key="index" @tap="goEnter(item.id,item.mark)" v-if="index >= k*10 && index < (k+1)*10">
									<image :src="item.icon"></image>
									<view>{{item.name}}</view>
								</li>
							</ul>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="open" v-if="show1">此区域暂未开通，请选择其他城市！</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
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
				backColor: '#FFFFFF',
				show: false,
				show1: false,
				name: '',
				status1: true,
				location: '开封市',
				img1: [],
				img2: [],
				img3: [],
				img4: [],
				img5: [],
				img6: [],
				page1: 0,
				page2: 0,
				page3: 0,
				page4: 0,
				page5: 0,
				page6: 0,
				title1: '',
				title2: '',
				title3: '',
				title4: '',
				title5: '',
				title6: '',
				id: '',
				id1: 'f8afeef06d624f9898536114e956a4ce',
				id2: '11ac9ceaefb24bcda36542a0384b853e',
				id3: 'a36dfeb4ee6d4943949a90ec25545f53',
				id4: '4470ccbe151b40dd91ab02cb74b3d081',
				id5: 'c4b7b9f6408947dcb909d54c2ea431d9',
				id6: '9efe3dd1a9e2440999c69d39e4dcf07c',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				nav: ['维修', '回收', '安装', '家装', '清洗', '其他'],
				navIndex: 0,
				banner: [],
				list: [],
				list1: []
			}
		},
		onShow() {
			if (this.$store.state.location) {
				this.location = this.$store.state.location
			}
			this.navIndex = this.$store.state.navItem
			this.init()
		},
		onLoad() {
			let self = this
			uni.getLocation({
				type: 'gcj02 ',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude)
					console.log('当前位置的纬度：' + res.latitude)
					self.getAddressList(res.latitude, res.longitude)
				}
			})
		},
		methods: {
			changeNav(k,id) {
				let self = this
				if(this.navIndex == k) {
					return
				}
				this.navIndex = k
				console.log(this.list)
				for (let i = 0; i < this.list.length; i++) {
					if(id == this.list[i].id) {
						this.list1 = this.list[i].serviceList
						this.id = this.list[i].id
						this.page1 = Math.ceil(self.list1.length / 10)
					}
				}
			},
			getAddressList(latitude, longitude) {
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
						that.location = e.result.address_component.city
						that.$store.commit('changeLocation', that.location)
						that.init()
					})
					.catch(err => {
						// 请求失败的返回数据
						console.log(err)
					})
			},
			init() {
				let self = this
				this.show1 = false
				let data1 = {
					city: this.location
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/serviceList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (res.data.dataList.length > 0) {
									self.list = res.data.dataList
									self.id = self.list[self.navIndex].id
									self.list1 = self.list[self.navIndex].serviceList
									self.page1 = Math.ceil(self.list1.length / 10)
								} else {
									self.img1 = []
									self.img2 = []
									self.img3 = []
									self.img4 = []
									self.img5 = []
									self.img6 = []
									self.list = []
									self.show1 = true
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})

				let data2 = {}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/bannerList',
						data: data2,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.banner = res.data.dataList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			showPosition(position) {
				console.log(position)
				this.location = position.city
				this.$store.commit('changeLocation', position.city)
				this.init()
			},
			goEnter(id, mark) {
				this.$store.commit('changeNav', this.navIndex)
				if (this.id1 == this.id) {
					uni.navigateTo({
						url: '/pages/type/type?id=' + id + '&mark=' + mark + '&city=' + this.location + '&type=1'
					})
				} else if (this.id2 == this.id) {
					uni.navigateTo({
						url: '/pages/type1/type1?id=' + id + '&mark=' + mark + '&city=' + this.location + '&type=2' 
					})
				} else if (this.id3 == this.id) {
					uni.navigateTo({
						url: '/pages/type2/type2?id=' + id + '&mark=' + mark + '&city=' + this.location + '&type=3'
					})
				} else if (this.id4 == this.id) {
					uni.navigateTo({
						url: '/pages/type3/type3?id=' + id + '&mark=' + mark + '&city=' + this.location + '&type=4'
					})
				} else if (this.id5 == this.id) {
					uni.navigateTo({
						url: '/pages/type4/type4?id=' + id + '&mark=' + mark + '&city=' + this.location + '&type=5'
					})
				} else if (this.id6 == this.id) {
					uni.navigateTo({
						url: '/pages/type5/type5?id=' + id + '&mark=' + mark + '&city=' + this.location + '&type=6'
					})
				}
			},
			goHide() {
				this.show = false
			},
			goSubmit() {
				this.show = false
				uni.navigateTo({
					url: '/pages/type/type'
				})
			},
			Back() {
				uni.navigateTo({
					url: '/pages/location/location'
				})
			},
			goRight() {
				uni.navigateTo({
					url: '/pages/person/person'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #F2F2F2;
		display: flex;
		flex-direction: column;
		align-items: center;

		.dialog {
			width: 100%;
			height: 100vh;
			position: fixed;
			background: rgba(0, 0, 0, .5);
			z-index: 99999;
			display: flex;
			align-items: center;
			justify-content: center;

			.enter {
				width: 80%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				.titles {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 28rpx;
					color: #333;
				}

				.btn {
					width: 35%;
					padding: 10rpx 0;
					border-radius: 6px;
					font-size: 28rpx;
					color: #fff;
					background: #039AF1;
					text-align: center;
				}

				.close {
					position: absolute;
					top: 24rpx;
					right: 24rpx;
					width: 46rpx;
					height: 46rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 12rpx;
					color: #ddd;
					font-weight: 600;
					border: 8rpx solid #ddd;
					border-radius: 50%;
				}
			}
		}

		.fixed {
			width: 100%;

			.city {
				height: 100%;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				color: #333;
				justify-content: center;

				.down {
					width: 32rpx;
					height: 32rpx;
					margin-left: 16rpx;
				}
			}

			.downs {
				width: 40rpx;
				height: 40rpx;
				margin-top: 8rpx;
			}
		}

		.open {
			width: 100%;
			font-size: 30rpx;
			color: #666;
			text-align: center;
			margin-top: 80rpx;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			swiper {
				width: 100%;
				height: 490rpx;
				// margin-bottom: 30rpx;

				swiper-item {
					width: 100%;
					height: 490rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.box {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;

				.scroll {
					width: 100%;
					height: 140rpx;
					margin-top: 30rpx;
					
					.navs {
						display: flex;
						height: 100rpx;
						padding: 0 28rpx;
						box-sizing: border-box;
						border-radius: 4px;
						background: #fff;
						box-shadow: -1px 0 5px rgba(0, 0, 0, .1);
						font-size: 30rpx;
						color: #333;
						position: relative;
						white-space: nowrap;
						
						.navs-item {
							display: inline-block;
							position: relative;
							height: 75rpx;
							box-sizing: border-box;
							margin-right: 40rpx;
							margin-top: 10rpx;
						
							&.active {
								border-bottom: 3px solid #F15A03;
								color: #F15A03;
							}
						
							.nav-tit {
								box-sizing: border-box;
								height: 75rpx;
								line-height: 75rpx;
							}
						
							image {
								width: 36rpx;
								height: 36rpx;
								position: absolute;
								left: calc(50% - 18rpx);
								bottom: -53rpx;
							}
						}
					}
				}

				.list {
					width: 100%;
					// padding: 24rpx;
					// box-sizing: border-box;
					border-radius: 6px;
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					background: #FFFFFF;
					// margin-bottom: 32rpx;

					.list-title {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: #333;
						font-weight: 600;
						box-sizing: border-box;
						padding-left: 30rpx;
						position: relative;
						margin-bottom: 24rpx;
					}

					.list-title:before {
						content: '';
						width: 8rpx;
						height: 32rpx;
						border-radius: 30px;
						background: #F15A03;
						position: absolute;
						top: 24rpx;
						left: 0;
					}

					.list-title1 {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: #333;
						font-weight: 600;
						box-sizing: border-box;
						padding-left: 30rpx;
						position: relative;
						margin-bottom: 24rpx;
					}

					.list-title1:before {
						content: '';
						width: 8rpx;
						height: 32rpx;
						border-radius: 30px;
						background: #00D096;
						position: absolute;
						top: 24rpx;
						left: 0;
					}

					.list-title2 {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: #333;
						font-weight: 600;
						box-sizing: border-box;
						padding-left: 30rpx;
						position: relative;
						margin-bottom: 24rpx;
					}

					.list-title2:before {
						content: '';
						width: 8rpx;
						height: 32rpx;
						border-radius: 30px;
						background: #039AF1;
						position: absolute;
						top: 24rpx;
						left: 0;
					}

					.list-title3 {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: #333;
						font-weight: 600;
						box-sizing: border-box;
						padding-left: 30rpx;
						position: relative;
						margin-bottom: 24rpx;
					}

					.list-title3:before {
						content: '';
						width: 8rpx;
						height: 32rpx;
						border-radius: 30px;
						background: #F15A03;
						position: absolute;
						top: 24rpx;
						left: 0;
					}

					.list-title4 {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: #333;
						font-weight: 600;
						box-sizing: border-box;
						padding-left: 30rpx;
						position: relative;
						margin-bottom: 24rpx;
					}

					.list-title4:before {
						content: '';
						width: 8rpx;
						height: 32rpx;
						border-radius: 30px;
						background: #FFA303;
						position: absolute;
						top: 24rpx;
						left: 0;
					}

					.item {
						width: 100%;
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						.li {
							width: 20%;
							display: flex;
							flex-direction: column;
							align-items: center;
							font-size: 24rpx;
							color: #333;
							text-align: center;
							margin-bottom: 28rpx;

							image {
								width: 70rpx;
								height: 70rpx;
								margin-bottom: 24rpx;
							}
						}
					}

					.swiper {
						width: 100%;
						height: 360rpx;

						swiper-item {
							width: 100%;
							height: 360rpx;

							.list-items {
								width: 100%;
								height: 90%;
								display: flex;
								flex-wrap: wrap;
								padding-top: 24rpx;

								.li {
									width: 20%;
									display: flex;
									flex-direction: column;
									align-items: center;
									font-size: 24rpx;
									color: #333;
									text-align: center;
									margin-bottom: 10rpx;

									image {
										width: 70rpx;
										height: 70rpx;
										margin-bottom: 12rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
