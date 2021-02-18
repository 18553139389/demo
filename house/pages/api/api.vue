<template>
	<view class="contain">
		<view class="throttle" @tap="$u.debounce(btnAClick, 1000)">露从今夜白</view>
		<view class="throttle" @tap="btnBClick">月是故乡明</view>
		<view>时间为：{{$u.timeFormat(timestamp, 'yyyy年mm月dd日')}}</view>
		<view>时间为：{{time}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: null,
				timestamp: '1581170184'
			}
		},
		onLoad() {
			this.time = this.$u.timeFormat(this.timestamp, 'yyyy-mm-dd')
			this.$u.post('getbannerlist').then(res => {
				console.log(res)
			})
		},
		onReady() {
			this.$u.getRect('.throttle',true).then(res => {
				console.log(res)
			})
		},
		methods: {
			btnAClick() {
				console.log('btnClick')
			},
			btnBClick() {
				this.$u.debounce(this.toNext, 1000)
			},
			toNext() {
				console.log('btnBClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.throttle {
			margin-top: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100rpx;
			border: 1px solid $u-type-primary;
		}
	}
</style>
