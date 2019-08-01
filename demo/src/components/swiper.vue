<template>
	<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
		<block v-for="(item, index) in images" :key="index">
			<swiper-item>
				<image :src="item.img" class="slide-image" mode="aspectFill" />
			</swiper-item>
		</block>
	</swiper>
</template>

<script>
	export default {
		props: {
			images: {
				type: Array
			},
			indicatorDots: {
				type: Boolean,
				value: true
			}
		},
		data() {
			return {
				autoplay: true,
				interval: 3000,
				duration: 500
			};
		},
		methods: {
			imgSearch() {
				this.$emit('imgSearch')
			}
		}
	}
</script>

<style scoped>
	.swiper {
		width: 100%;
		height: 100% !important;
	}

	image {
		height: 100%;
		width: 100%;
	}
</style>
