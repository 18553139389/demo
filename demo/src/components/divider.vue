<template>
	<div>
		<div class="line">
			<span>{{text}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				value: ''
			}
		}
	}
</script>

<style>
	.line {
		width: 100%;
		height: 2px;
		background: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 38rpx 0;
	}
	
	.line span {
		display: inline-block;
		height: 24px;
		line-height: 24px;
		padding: 0 10px;
		background: rgb(251,249,254);
		font-size: 30rpx;
		color: #333;
	}
</style>
