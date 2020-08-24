<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">技术知识解答</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item" v-for="(v,k) in list" :key="k" @tap="goDetail(v)">
				<view>{{v.title}}</view>
				<img src="../../static/images/myback.png" alt="">
			</view>
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
				list: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					mid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/tech/list',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.list = res.data.body.page.list
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goDetail(list) {
				let title = encodeURIComponent(list.title)
				let content = encodeURIComponent(list.content)
				uni.navigateTo({
				    url: `/pages/produce/produce?title=${title}&content=${content}`
				})
			}
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
		
		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.item {
				width: 100%;
				height: 90upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #eee;
				font-size: 28upx;
				color: #333;
				
				img {
					width: 22upx;
					height: 29upx;
				}
			}
		}
	}
</style>
