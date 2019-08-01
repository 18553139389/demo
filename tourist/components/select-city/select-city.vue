<template>
	<view class="select-city-wrap">
		<view class="select-city">
			<view class="index">
				<!-- <view class="index-item" @click="scrollTo('#')">#</view> -->
				<view class="index-item" v-for="item in citys" :key="item.letter" @click="scrollTo(item.letter)">{{item.letter}}</view>
			</view>
			<scroll-view :scroll-into-view="scrollIntoId" :scroll-y="true" :scroll-with-animation="true" style="height:calc(100vh - 162upx)">
				<view class="content">
					<view class="section" id="current">
						<view class="city-title">当前城市</view>
						<view class="city-list">
							<view class="city-item">{{current}}</view>
						</view>
					</view>
					<view class="section" id="hot" v-if="hotCitys.length">
						<view class="city-title">热门城市</view>
						<view class="city-list">
							<view class="city-item" :class="{active: current === city.cityname}" v-for="(city, i) in hotCitys" :key="i" @click="onSelect(city)">{{city.cityname}}</view>
						</view>
					</view>
					<view class="section" :id="item.letter" v-for="item in citys" :key="item.letter">
						<view class="letter">{{item.letter}}</view>
						<view class="city-list">
							<view class="city-item" :class="{active: current === city}" v-for="(city,itemIndex) in item.list" :key="itemIndex"
							 @click="onSelect1(city)">{{city}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import Citys from './citys'
	import {
		airport
	} from '../../common/js/airport.js'
	export default {
		props: {
			hotCitys: {
				type: Array,
				default () {
					return []
				}
			},
			value: {
				type: String,
				default: '未设置'
			}
		},
		data() {
			return {
				citys: [],
				windowHeight: '',
				scrollIntoId: '',
				current: this.value
			}
		},
		mounted() {
			this.getSystemInfo()
			for(let i=0;i<Citys.length;i++){
				Citys[i].list = []
				for(let j=0;j<airport.RECORDS.length;j++){
					if(Citys[i].letter == airport.RECORDS[j].cityshortchar.charAt(0)){
						Citys[i].list.push(airport.RECORDS[j].cityname)
					}
				}
			}
			this.citys = Citys
		},
		methods: {
			getSystemInfo() {
				uni.getSystemInfo().then(res => {
					let [error, data] = res
					this.windowHeight = `${data.windowHeight}px`
				})
			},
			scrollTo(letter) {
				this.scrollIntoId = letter === '#' ? 'current' : letter
			},
			onSelect(city) {
				this.current = city.cityname
				this.$emit('input', city)
				this.$emit('on-select', city)
			},
			onSelect1(city) {
				console.log(city)
				this.current = city.cityname
				this.$emit('input', city)
				this.$emit('on-select1', city)
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
					width: 190upx;
					height: 55upx;
					margin-right: 36upx;
					margin-bottom: 28upx;
					line-height: 55upx;
					text-align: center;
					border: 1px solid #dcdcdc;
					border-radius: 6upx;
					color: #999;
					font-size: 28upx;

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
