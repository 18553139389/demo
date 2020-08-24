<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<image :src="v" v-for="(v,k) in img" :key="k" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				title: '',
				img: []
			}
		},
		onLoad(option) {
			this.init(option.url)
		},
		methods: {
			init(url) {
				// let self = this
				// //获取顶部导航列表
				// let data1 = {
				// 	uid: 1,
				// 	cId: id
				// }
				// Toast.showLoading('', function() {
				// 	let data = {
				// 		url: '/api/contractInfo',
				// 		data: data1,
				// 		success: function(res) {
				// 			console.log(res)
				// 			Toast.hideLoading()
				// 			self.img = res.data.image
				// 			self.title = res.data.title
				// 		}
				// 	}
				// 	ajax(data)
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
			
			image {
				width: 100%;
			}
		}
	}
</style>
