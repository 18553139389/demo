<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品海报</block>
			</cu-custom>
		</view>
		<ul class="wrapper" v-if="show && imgList.length > 0">
			<li v-for="(v,k) in imgList" :key="k" :class="(k+1)%3 == 0 ? 'margins' : ''">
				<img :src="v.content" @tap="goPreview(k)" mode="scaleToFill" alt="">
			</li>
		</ul>
		<view class="no" v-if="!show">该产品还没有添加海报</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				imgList: [],
				show: true
			}
		},
		onLoad(option) {
			this.message = uni.getStorageSync('message')
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id,
					infoType: 8
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								self.show = true
								self.imgList = res.data.body.list
							} else {
								Toast.hideLoading()
								self.show = false
								// Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goPreview(k) {
				// 预览图片
				let imgs = []
				imgs.push(this.imgList[k].content)
				uni.previewImage({
					urls: imgs
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
			flex-wrap: wrap;
			
			li {
				width: 32%;
				height: 222upx;
				margin-right: 2%;
				margin-bottom: 2%;
				
				&.margins {
					margin-right: 0;
				}
				
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.no {
			width: 100%;
			height: 90upx;
			line-height: 90upx;
			text-align: center;
			font-size: 14px;
			color: #333;
		}
	}
</style>
