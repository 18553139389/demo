<template>
	<view class="select-city-wrap">
		<view class="select-city">
			<view class="index">
				<view class="index-item" v-for="item in citys" :key="item.letter" @click="scrollTo(item.letter)">{{item.letter}}</view>
			</view>
			<scroll-view :scroll-into-view="scrollIntoId" :scroll-y="true" :scroll-with-animation="true" style="height:calc(100vh - 162upx)">
				<view class="content">
					<view class="section" id="current" @click="goCurrent">
						<view class="city-title">当前城市</view>
						<view class="city-list">
							<view class="city-item">{{current}}</view>
						</view>
					</view>
					<view class="section" id="hot">
						<view class="city-title">热门城市</view>
						<view class="city-list">
							<view class="city-item" :class="{active: current === city.name}" v-for="(city, i) in hotCitys.cities" :key="i"
							 @click="onSelect(city)">{{city.name}}</view>
						</view>
					</view>
					<view class="section" :id="item.letter" v-for="item in citys" :key="item.letter">
						<view class="letter">{{item.letter}}</view>
						<view class="city-list">
							<view class="city-item" :class="{active: current === city}" v-for="(city,itemIndex) in item.list" :key="itemIndex"
							 @click="onSelect1(city)">{{city.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import Citys from './train'
	import {airport} from '../../common/js/airport.js'
	export default {
		props: {
			value: {
				type: String,
				default: '未设置'
			}
		},
		data() {
			return {
				hotCitys: [],
				citys: [],
				windowHeight: '',
				scrollIntoId: '',
				current: this.value
			}
		},
		mounted() {
			this.getSystemInfo()
			this.hotCitys = Citys[0]
			let arr1 = []
			let arr2 = []
			for (let i = 1; i < Citys.length; i++) {
				arr1.push({
					letter: Citys[i].tag
				})
				arr2 = []
				for (let j = 0; j < Citys[i].cities.length; j++) {
					arr2.push({
						name: Citys[i].cities[j].name,
						lat: Citys[i].cities[j].lat,
						lon: Citys[i].cities[j].lon
					})
				}
				arr2.sort(this.CompareDate1) 
				arr1[i - 1].list = arr2
			}
			this.citys = arr1
		},
		methods: {
			getSystemInfo() {
				uni.getSystemInfo().then(res => {
					let [error, data] = res
					this.windowHeight = `${data.windowHeight}px`
				})
			},
			CompareDate1(t1, t2) {
				var a = t1.name.length
				var b = t2.name.length
				return a - b
			},
			scrollTo(letter) {
				this.scrollIntoId = letter === '#' ? 'current' : letter
			},
			onSelect(city) {
				this.$emit('input', city)
				this.$emit('on-select', city)
			},
			onSelect1(city) {
				this.$emit('input', city)
				this.$emit('on-select1', city)
			},
			goCurrent() {
				this.$emit('on-current', this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-city-wrap {
		position: relative;
		padding: 30upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.select-city {
		.index {
			position: absolute;
			right: 15upx;
			top: 40upx;
			z-index: 999;
			color: #f44;
			font-size: 32upx;

			.index-item {
				width: 40upx;
				height: 42upx;
				line-height: 42upx;
				text-align: center;
			}
		}

		.section {
			margin-bottom: 19upx;

			.city-title {
				color: #333;
				font-size: 28upx;
				margin-bottom: 28upx;
			}

			.letter {
				width: 44upx;
				height: 44upx;
				color: #fff;
				border-radius: 100%;
				background-color: #f44;
				font-size: 28upx;
				line-height: 44upx;
				text-align: center;
				margin-bottom: 30upx;
			}

			.city-list {
				display: flex;
				flex-wrap: wrap;

				.city-item {
					// width: 190upx;
					height: 55upx;
					margin-right: 36upx;
					margin-bottom: 28upx;
					line-height: 55upx;
					text-align: center;
					border: 1px solid #dcdcdc;
					border-radius: 6upx;
					color: #999;
					font-size: 28upx;
					padding: 0 20upx;

					&.active {
						// background-color: #f44;
						border-color: #f44;
						color: #f44;
					}
				}
			}
		}
	}
</style>
