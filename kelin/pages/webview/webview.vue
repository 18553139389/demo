<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品海报</block>
			</cu-custom>
		</view>
		<view>
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333'
			}
		},
		onLoad(e) {
			// 获取传递过来的链接
			this.url = e.url
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
	}
</style>
