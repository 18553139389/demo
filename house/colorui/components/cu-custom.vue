<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back" v-if="isBacks"></text>
					<slot name="backText" v-if="isFirst"></slot>
				</view>
				<view class="action" @tap="goBack" v-if="!isBack">
					<text class="cuIcon-back"></text>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px',fontSize: '32rpx'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var Bg = this.Bg;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;background:${Bg}`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			Bg: {
				type: String,
				default: '#fe5f23'
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isBacks: {
				type: [Boolean, String],
				default: true
			},
			isFirst: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			goBack() {
				this.$emit('goBack')
			}
		}
	}
</script>

<style>

</style>
