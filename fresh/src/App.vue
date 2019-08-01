<template>
	<div class="all">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {};
</script>

<style>
	html,
	body,
	.all {
		width: 100%;
		height: 100%;
	}

	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.van-tabbar--fixed {
		z-index: 100;
	}

	.van-sku-row__item {
		min-width: 60px !important;
		padding: 0 10px !important;
		line-height: 28px !important;
		border-radius: 15px !important;
		font-size: 12px !important;
	}

	.van-sku-row__item--active {
		background: #72d342 !important;
		border-color: #72d342 !important;
	}

	.van-sku-row__item--disabled {
		color: #fff !important;
	}

	.van-popup {
		background: none !important;
		overflow-y: unset !important;
	}

	.lunhui {
		text-align: center;
		height: 60px;
		width: 100px;
		font-size: 16px;
	}

	.lunhui .van-loading {
		margin-left: 30px;
		margin-bottom: 10px;
	}

	.van-tabs__track {
		will-change: top, left, bottom, right !important;
	}

	.van-overlay {
		background: none !important;
	}
</style>
