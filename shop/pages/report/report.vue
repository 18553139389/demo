<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" :backColor="backColor">
				<block slot="backText"></block>
				<block slot="content">返款记录</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="lists">
				<view class="item">
					<view>已返：{{num1}}</view>
					<view>待返：{{num2}}</view>
				</view>
				<view class="order">
					<view class="titles">返款明细</view>
					<view class="common" v-for="(v,k) in list" :key="k" v-if="list.length > 0">
						<view>{{k + 1}}. ￥{{v.money}}</view>
						<view>{{v.createDate}}</view>
					</view>
					<view class="no" v-if="list.length == 0">还没有新的返款记录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#EDEDED',
				list: [],
				num1: 0,
				num2: 0
			}
		},
		onLoad(option) {
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					orderId: id
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/orderItem',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataList
								self.num1 = res.data.amount
								self.num2 = res.data.surplusMoney
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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #EDEDED;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.item {
					width: 100%;
					height: 90upx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					background: #FFFFFF;
					border-radius: 4px;
					margin: 0 0 30upx;
					font-size: 30upx;
					color: #111111;
					
				}
				
				.order {
					width: 100%;
					padding: 24upx;
					box-sizing: border-box;
					background: #FFFFFF;
					border-radius: 4px;
					display: flex;
					flex-direction: column;
					margin-bottom: 30upx;
					
					.titles {
						width: 100%;
						height: 70upx;
						line-height: 70upx;
						text-align: center;
						font-size: 30upx;
						color: red;
					}
					
					.common {
						width: 100%;
						height: 60upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 30upx;
						color: #111111;
					}
					
					.no {
						width: 100%;
						height: 90upx;
						line-height: 90upx;
						text-align: center;
						font-size: 28upx;
						color: red;
					}
				}
			}
		}
	}
</style>
