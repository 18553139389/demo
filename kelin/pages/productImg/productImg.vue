<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品图片</block>
			</cu-custom>
		</view>
		<view class="btns">
			<view class="item" :class="itemIndex == 0 ? 'active' : ''" style="border-top-right-radius: 30px;border-bottom-right-radius: 30px;"
			 @tap="changeIndex(0)">未精修</view>
			<view class="item" :class="itemIndex == 1 ? 'active' : ''" style="border-top-left-radius: 30px;border-bottom-left-radius: 30px;"
			 @tap="changeIndex(1)">精修</view>
		</view>
		<view class="tab">
			<view class="tab-item" :class="tabIndex == 0 ? 'active' : ''" @tap="changeTab(0)">外观</view>
			<view class="tab-item" :class="tabIndex == 1 ? 'active' : ''" @tap="changeTab(1)">细节</view>
		</view>
		<ul class="imgs">
			<li v-for="(v,k) in imgList" :key="k" :class="(k + 1) % 3 == 0 ? 'type' : ''">
				<image :src="v.content" alt="" @tap="goPreview(k)" mode="scaleToFill"></image>
			</li>
		</ul>
		<view class="preview" v-if="show" @tap="goHide">
			<image v-for="src in previewImg" :key="src" :src="src" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import ImgOver from '../../components/img-over/img-over'
	export default {
		data() {
			return {
				Color: '#333',
				itemIndex: 0,
				tabIndex: 0,
				imgList: [],
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				show: false,
				previewImg: []
			}
		},
		components: {
			ImgOver
		},
		onLoad(option) {
			this.message = uni.getStorageSync('message')
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				//请求空调产品画册数据
				let data2 = {
					Token: this.message.Token,
					id,
					infoType: 2
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								self.imgList = res.data.body.noTruingAppearanceList
								self.list1 = res.data.body.noTruingAppearanceList
								self.list2 = res.data.body.noTruingDetailList
								self.list3 = res.data.body.truingAppearanceList
								self.list4 = res.data.body.truingDetailList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					
					ajax(data)
				})
			},
			changeIndex(index) {
				let self = this
				this.itemIndex = index
				if (this.itemIndex == 0 && this.tabIndex == 0) {
					self.imgList = self.list1

				}
				if (this.itemIndex == 0 && this.tabIndex == 1) {
					self.imgList = self.list2
				}
				if (this.itemIndex == 1 && this.tabIndex == 0) {
					self.imgList = self.list3
				}
				if (this.itemIndex == 1 && this.tabIndex == 1) {
					self.imgList = self.list4
				}
			},
			changeTab(index) {
				let self = this
				this.tabIndex = index
				if (this.itemIndex == 0 && this.tabIndex == 0) {
					self.imgList = self.list1
				}
				if (this.itemIndex == 0 && this.tabIndex == 1) {
					self.imgList = self.list2
				}
				if (this.itemIndex == 1 && this.tabIndex == 0) {
					self.imgList = self.list3
				}
				if (this.itemIndex == 1 && this.tabIndex == 1) {
					self.imgList = self.list4
				}
			},
			goPreview(k) {
				// 预览图片
				// let imgs = []
				// imgs.push(this.imgList[k].content)
				// uni.previewImage({
				// 	urls: imgs
				// })
				this.previewImg = []
				this.previewImg.push(this.imgList[k].content)
				this.show = true
				plus.nativeUI.previewImage(this.previewImg)
			},
			goHide() {
				this.show = false
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

		.btns {
			width: 70%;
			margin: 30upx auto;
			height: 90upx;
			border: 1px solid #0081FF;
			box-sizing: border-box;
			border-radius: 50px;
			display: flex;
			overflow: hidden;

			.item {
				width: 50%;
				height: 92upx;
				line-height: 92upx;
				text-align: center;
				font-size: 14px;
				color: #333;

				&.active {
					background: #0081FF;
					color: #FFFFFF;
				}
			}
		}

		.tab {
			width: 100%;
			height: 110upx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			padding: 0 28upx;
			box-sizing: border-box;

			.tab-item {
				height: 110upx;
				line-height: 110upx;
				margin-right: 50upx;
				font-size: 14px;
				color: #666;

				&.active {
					color: #333;
					border-bottom: 2px solid #0081FF;
				}
			}
		}

		.imgs {
			width: 100%;
			padding: 28upx;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;

			li {
				width: 32%;
				height: 222upx;
				margin-right: 2%;
				margin-bottom: 2%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 4px;
				}

				&.type {
					margin-right: 0;
				}
			}
		}

		.preview {
			width: 100%;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			background: #000000;
			z-index: 99999;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 100%;
				zoom: 2;
			}
		}
	}
</style>
