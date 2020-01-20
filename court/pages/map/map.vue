<template>
	<view class="contain"></view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			let self = this
			uni.chooseLocation({
				success: function(res) {
					self.$store.commit('changeLocation', res.address)
					self.$store.commit('changeLat', res.latitude)
					self.$store.commit('changeLon', res.longitude)
					uni.navigateBack({
						delta: 1
					})
					console.log('纬度：' + res.latitude)
					console.log('经度：' + res.longitude)
				},
				fail: function() {
					uni.navigateBack({
						delta: 1
					})
				}
			})
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100vh;
		background: #fff;
	}

	.contain {
		width: 100%;
		height: 100%;
	}
</style>
