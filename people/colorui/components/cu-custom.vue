<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back" v-if="isIcon"></text>
					<slot name="backText"></slot>
				</view>
				<view class="action" @tap="Back" v-if="isBacks">
					<text class="cuIcon-back" v-if="isIcons"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view class="right" @tap="goRight">
					<slot name="right"></slot>
				</view>
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
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var Color = this.Color
				var backColor = this.backColor
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;color:${Color};background-color:${backColor}`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});color:${Color};background-color:${backColor}`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isIcon: {
				type: [Boolean, String],
				default: false
			},
			isBacks: {
				type: [Boolean, String],
				default: false
			},
			isIcons: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			Color: {
				type: String,
				default: ''
			},
			backColor: {
				type: String,
				default: '#FFFFFF'
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			goRight() {
				this.$emit('goRight')
			},
			Back() {
				this.$emit('Back')
			}
		}
	}
</script>

<style>
	.right {
		position: absolute;
		top: 32rpx;
		right: 0;
		margin-right: 30upx;
		font-size: 15px;
		z-index: 999;
	}
</style>
