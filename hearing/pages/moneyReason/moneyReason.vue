<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">退款原因</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="box">
				<evan-radio-group @change="onGroupChange" v-model="color2">
					<view @click="onRadioClick(index)" class="evan-radio-show__list-item" v-for="(item,index) in colorList" :key="item.id">
						<text class="evan-radio-show__list-item__label">{{item.name}}</text>
						<evan-radio ref="listRadio" :preventClick="true" :label="item.name">
							<template slot="icon">
								<view class="fill" v-if="color2===item.name">
									<uni-icons v-if="color2===item.name" type="checkmarkempty" size="18" color="#fff"></uni-icons>
								</view>
							</template>
						</evan-radio>
					</view>
				</evan-radio-group>
			</view>
			<view class="warn">
				<image src="../../static/images/warn.png"></image>
				<view>退款成功取消后无法恢复</view>
			</view>
		</view>
		<view class="btn" @tap="goSure">确定</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import EvanRadio from '../../components/evan-radio/evan-radio.vue'
	import EvanRadioGroup from '../../components/evan-radio/evan-radio-group.vue'
	import UniIcons from '../../components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				color2: '',
				id: '',
				colorList: []
			}
		},
		components: {
			EvanRadio,
			EvanRadioGroup,
			UniIcons
		},
		onLoad(option) {
			this.id = option.id
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'getRefundList'
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.colorList = res.data.dataList
								console.log(res)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			onGroupChange(e) {
				console.log(e)
				console.log(this.color2)
			},
			onRadioClick(index) {
				this.$refs.listRadio[index].select()
			},
			goSure() {
				if(this.color2 == '') {
					Toast.showToast('请选择原因')
					return
				}
				let self = this
				let data1 = {
					cmd: 'refundOrder',
					uid: uni.getStorageSync('uid'),
					id: this.id
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
								setTimeout(() => {
									uni.redirectTo({
									    url: '/pages/order/order'
									})
								},500)
								console.log(res)
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
		background: #f6f6f6;

		.fixed {
			width: 100%;
		}
		
		.btn {
			width: 92%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 4px;
			background: #06A5C4;
			text-align: center;
			font-size: 30rpx;
			color: #fff;
			font-weight: 600;
			position: fixed;
			bottom: 32rpx;
			left: 4%;
		}

		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.box {
				width: 100%;
				padding: 20rpx;
				border-radius: 4px;
				background: #fff;
				
				.evan-radio-show__list-item {
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #eee;
					font-size: 28rpx;
					color: #333;
					
					.fill {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						background: #06A5C4;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				
				.evan-radio-show__list-item:last-child {
					border-bottom: none;
				}
			}
			
			.warn {
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #666;
				margin-top: 60rpx;
				
				image {
					width: 42rpx;
					height: 42rpx;
					margin-right: 24rpx;
				}
			}
		}
	}
</style>
