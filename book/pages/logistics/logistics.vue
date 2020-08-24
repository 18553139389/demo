<template>
	<div class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单物流</block>
			</cu-custom>
		</view>
		<block v-for="(item, index) in tracesData" :key="index" v-if="show && tracesData.length > 0">
			<trackNode :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode" :node-data="item"></trackNode>
		</block>
		<view class="no" v-if="!show">
			<image src="../../static/images/car.png"></image>
			<view class="produce">没有查到物流信息</view>
		</view>
	</div>
</template>

<script>
	import trackNode from '../../components/trackNode/trackNode.vue'
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		components: {
			trackNode
		},
		onLoad(option) {
			this.init(option.expressCode,option.expressNo)
		},
		data() {
			return {
				Color: '#333',
				show: true,
				tracesData: []
			}
		},
		methods: {
			init(expressCode,expressNo) {
				let self = this
				let data1 = {
					cmd: 'deliveryInfo',
					expressCode,
					expressNo
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(!res.data.dataList) {
									self.show = false
								} else {
									self.show = true
									self.tracesData = res.data.dataList
								}
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

		.logistics-title {
			height: 72rpx;
			box-sizing: border-box;
			padding: 36rpx 0 8rpx;
			line-height: 28rpx;
			color: #4B4B4B;
			font-size: 26rpx;
			font-family: 'PingFangSC-Medium';
			text-align: left;
		}
		
		.no {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 60%;
			font-size: 28rpx;
			color: #999;
			
			image {
				width: 100rpx;
				height: 100rpx;
			}
			
			.produce {
				margin-top: 40rpx;
			}
		}
	}
</style>
