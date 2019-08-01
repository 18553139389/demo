<template>
	<div class="top">
		<div class="left">
			<van-icon name="arrow-left" size="24px" @click="back" />
			<span>{{text}}</span>
		</div>
		<img @click="map" class="right" :src="image" alt="" v-if="image">
		<span @click="set" v-if="datas">{{datas}}</span>
	</div>
</template>

<script>
	import {
		Icon
	} from 'vant'

	export default {
		props: {
			text: {
				type: String,
				default: ''
			},
			image: {
				type: String,
				default: ''
			},
			datas: {
				type: String,
				default: ''
			}
		},
		methods: {
			back() {
				this.$emit('back')
			},
			set() {
				this.$emit('set')
			},
			map() {
				this.$emit('map')
			}
		}
	}
</script>

<style scoped="scoped">
	.top {
		width: 100%;
		height: 72px;
		display: flex;
		align-items: center;
		padding: 24px 0.4rem 0;
		box-sizing: border-box;
		justify-content: space-between;
		position: fixed;
		background: #fff;
		z-index: 999;
	}

	.left {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.right {
		width: 26px;
		height: 28px;
		margin-bottom: 4px;
	}

	.top span {
		font-size: 18px;
		color: #333;
		display: inline-block;
		margin-bottom: 1px;
		margin-left: 8px;
	}
</style>
