<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">卖方收款码</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item" v-if="zfb">
				<view class="titles">支付宝</view>
				<image :src="zfb" mode="widthFix" @tap="preview(0)"></image>
			</view>
			<view class="item" v-if="wx">
				<view class="titles">微信</view>
				<image :src="wx" mode="widthFix" @tap="preview(1)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				arr: [],
				wx: '',
				zfb: ''
			}
		},
		onLoad(option) {
			if(option.zfb != 0) {
				this.zfb = option.zfb
				this.arr.push(option.zfb)
			} else {
				this.arr.push('')
			}
			if(option.wx != 0) {
				this.wx = option.wx
				this.arr.push(option.wx)
			} else {
				this.arr.push('')
			}
		},
		methods: {
			preview(k) {
				uni.previewImage({
					current: k,
					urls: this.arr
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
			padding: 0 28upx;
			box-sizing: border-box;

			.item {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.titles {
					width: 100%;
					height: 100upx;
					line-height: 100upx;
					font-size: 15px;
					color: #333;
				}

				image {
					width: 60%;
				}
			}
		}
	}
</style>
