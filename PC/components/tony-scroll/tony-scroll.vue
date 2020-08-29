<template>
	<view class="home">
		<view class="list uni-flex uni-column">
			<view class="wrap-item">
				<view class="lis uni-flex uni-column" :animation="animationData">
					<view class="uni-flex uni-column" v-for="(item, index) in list" :key="index">
						<view class="swiper-item item_title uni-flex list_item">
							<view class="time uni-flex-item justify-align-center uni-flex">{{ item.time }}</view>
							<view class="phone uni-flex-item justify-align-center uni-flex">{{ item.phone }}</view>
							<view class="prizes uni-flex-item justify-align-center uni-flex">{{ item.prize }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array
		}
	},
	data() {
		return {
			scrollHeight: 0, //向上滚动距离
			height: 0, //.lis高度（滚动框高度）
			animationData: {} //动画对象
		};
	},
	components: {},
	mounted() {
		console.log("11")
		this.prizeScroll();
	},
	methods: {
		getHeight(Class) {
			let query = uni.createSelectorQuery().in(this);
			query
				.selectAll(Class)
				.boundingClientRect(data => {
					this.height = data[0].height;
				})
				.exec();
		},
		prizeScroll() {
			let speed = 80;
			let animation = uni.createAnimation({
				duration: this.getHeight('.lis') / speed,
				timingFunction: 'linear',
				delay: 0
			});
			this.animation = animation;
			setInterval(() => {
				if (this.scrollHeight >= this.height) {
					animation.translateY(0).step();
					this.scrollHeight = 0;
					this.animationData = animation.export();
				} else {
					this.scrollHeight = this.scrollHeight + 1;
					animation.translateY(-this.scrollHeight).step();
					this.animationData = animation.export();
				}
			}, speed);
		}
	}
};
</script>

<style>
	page{
		width: 100%;
	}
	.home,.list {
		width: 100%;
		/* padding-top: 30upx; */
	}
</style>
