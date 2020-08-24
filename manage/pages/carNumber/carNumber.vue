<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">进出记录</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<input-car :words="words" :inputValue="inputValue" @submit="submit" @inputWord="inputWord" @cancel="cancel" @deleteOne="deleteOne" ref="car">
				<view class="cars" @tap.stop="goOpen">
					<view>车牌号：</view>
					<view class="num" v-for="(v,k) in inputValue" :key="k" v-if="inputValue.length > 0">
						<view>{{v}}</view>
						<image src="../../static/images/downs.png" v-if="k == 0"></image>
					</view>
					<view class="num" v-if="inputValue.length == 0">请选择车牌号</view>
				</view>
			</input-car>
		</view>
	</view>
</template>

<script>
	import InputCar from '../../components/woke-inputCar/woke-inputCar.vue'
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				car: [],
				words: [],
				inputValue: []
			}
		},
		components: {
			InputCar
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas1 = {
					token: uni.getStorageSync('token')
				}
							
				Toast.showLoading('', function() {
					let data = {
						url: '/api/TruckRecordType/QueryProvince',
						data: datas1,
						success: function(res) {
							console.log(res)
							if (res.data.Code == 0) {
								Toast.hideLoading()
								let words = res.data.Customerdata
								words.forEach((item,index) => {
									self.words.push(item.name)
									if(item.isdefault == 1) {
										self.inputValue.push(item.name)
									}
								})
							} else if (res.data.Code == -2 || res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			submit(e) {
				console.log(e)
				this.$store.commit('changeCarNum',e)
				uni.navigateBack({
				    delta: 1
				})
			},
			goOpen() {
				this.$refs.car.open()
			},
			inputWord(val) {
				this.inputValue.push(val)
			},
			cancel() {
				this.inputValue = []
			},
			deleteOne() {
				this.inputValue.pop()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;

			.cars {
				width: 100%;
				height: 90rpx;
				padding: 0 28rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				border-top: 1px solid #eee;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;

				.num {
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
	}
</style>
