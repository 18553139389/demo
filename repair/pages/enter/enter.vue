<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor='backColor' :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">商家入驻</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<view class="left">经营范围：</view>
				<!-- <ld-select :multiple="true" :list="options" list-key="label" value-key="value" placeholder="请选择经营范围" clearable v-model="value2"
				@change="selectChange2"></ld-select> -->
				<input type="text" v-model="value2" placeholder="请输入经营范围">
			</view>
			<view class="item">
				<view class="left">店铺名称：</view>
				<input type="text" v-model="names" placeholder="请输入店铺名称">
			</view>
			<view class="item">
				<view class="left">联系方式：</view>
				<input type="text" v-model="call" placeholder="请输入联系方式">
			</view>
			<view class="item">
				<view class="left">所在区域：</view>
				<pick-regions @getRegion="handleGetRegion" style="width: 70%;">
					<input type="text" v-model="regionName" placeholder="请选择地址" disabled>
				</pick-regions>
			</view>
			<view class="item">
				<view class="left">详细地址：</view>
				<input type="text" v-model="location" placeholder="请输入详细地址">
			</view>
			<view class="off">
				<view class="items">
					<view class="left">证件照片：</view>
					<view class="upload" @tap="goUpload">点击上传</view>
				</view>
				<view class="all" v-if="img.length > 0">
					<view class="shop" v-for="(v,k) in img" :key="k">
						<image :src="v" @tap="goPreview"></image>
						<view class="close" @tap="goDel(k)">X</view>
					</view>
				</view>
			</view>
			<view class="content">
				<jiuaiCheckbox @change='changeBox' :checked="type" :fontSize="24" :color="color" :borderStyle="borderStyle"></jiuaiCheckbox>
				<view class="read" @tap="goAgree">我已同意跑步修服务协议</view>
			</view>
			<view class="btn" @tap="goSubmit">提交入驻申请</view>
		</view>
	</view>
</template>

<script>
	import pickRegions from '../../components/pick-regions/pick-regions.vue'
	import jiuaiCheckbox from "../../components/jiuai-checkbox/jiuai-checkbox.vue"
	import ldSelect from '../../components/ld-select/ld-select.vue'
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#FFFFFF',
				types: '',
				names: '',
				call: '',
				location: '',
				regionName: '',
				type: true,
				color: '#039AF1',
				borderStyle: '1px solid #039AF1',
				region: [],
				img: [],
				imgs: [],
				value: '',
				value2: [],
				options: [],
				locations: ''
			}
		},
		components: {
			pickRegions,
			jiuaiCheckbox,
			ldSelect
		},
		onLoad() {
			this.locations = this.$store.state.location
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					city: this.locations
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/serviceList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								for(let i=0;i<res.data.dataList.length;i++) {
									self.options.push({
										value: res.data.dataList[i].id,
										label: res.data.dataList[i].name
									})
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			selectChange2(val) {
				console.log(val)
				this.value2 = val
			},
			changeBox(e) {
				this.type = e.detail.checked
				console.log(this.type)
			},
			handleGetRegion(region) {
				this.region = region
				this.regionName = this.region.map(item => item.name).join('')
			},
			goUpload() {
				let self = this
				if (this.img.length == 3) {
					Toast.showToast('最多上传3张图片')
					return
				}
				uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'http://123.56.237.159/runrepair/api/uploadImage', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										console.log(uploadFileRes)
										let obj = JSON.parse(uploadFileRes.data)
										self.img.push('http://123.56.237.159' + obj.dataList[0])
										self.imgs.push(obj.dataList[0])
										console.log(self.imgs)
									},
									fail: (res) => {
										Toast.hideLoading()
										Toast.showToast('上传失败')
									}
								})
							})
						})
					},
					fail: function(res) {
						Toast.hideLoading()
						Toast.showToast('上传失败')
					}
				})
			},
			goAgree() {
				uni.navigateTo({
					url: '/pages/agree/agree?type=1'
				})
			},
			goSubmit() {
				if(this.value2.length == 0) {
					Toast.showToast('请选择经营范围')
					return
				}
				if (this.names == '') {
					Toast.showToast('店铺名称不能为空')
					return
				}

				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				if (this.regionName == '') {
					Toast.showToast('请选择地址')
					return
				}

				if (this.location == '') {
					Toast.showToast('地址详情不能为空')
					return
				}

				if (this.img.length == 0) {
					Toast.showToast('请上传店铺图片')
					return
				}

				if (this.img.length > 3) {
					Toast.showToast('最多上传3张图片')
					return
				}

				if (!this.type) {
					Toast.showToast('请同意服务协议')
					return
				}

				let self = this
				let data2 = {
					uid: uni.getStorageSync('uid'),
					categoryIds: this.value2,
					storeName: this.names,
					telephone: this.call,
					address: this.regionName,
					detail: this.location,
					images: this.imgs.join('|')
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/api/saveJoinInfo',
						data: data2,
						success: (res) => {
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goDel(k) {
				this.img.splice(k, 1)
			},
			goPreview() {
				let arr = []
				arr.push(this.img)
				uni.previewImage({
					urls: arr,
					longPressActions: {
						itemList: ['保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #F2F2F2;
		display: flex;
		flex-direction: column;
		align-items: center;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.off {
				width: 100%;
				padding: 32rpx 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				display: flex;
				flex-direction: column;
				margin-bottom: 30rpx;

				.items {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;

					input {
						font-size: 28rpx;
						color: #333;
						width: 70%;
						padding-left: 40rpx;
					}

					.upload {
						padding: 10rpx 24rpx;
						border-radius: 6px;
						font-size: 28rpx;
						color: #fff;
						background: #039AF1;
						margin-left: 40rpx;
					}
				}

				.all {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					margin-top: 40rpx;

					.shop {
						width: 120rpx;
						height: 120rpx;
						margin-right: 40rpx;
						position: relative;

						image {
							width: 100%;
							height: 100%;
						}

						.close {
							width: 30rpx;
							height: 30rpx;
							border-radius: 50%;
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							top: -15rpx;
							right: -15rpx;
							font-size: 24rpx;
							color: #fff;
							background: red;
						}
					}
				}
			}

			.item {
				width: 100%;
				padding: 32rpx 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #fff;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 30rpx;

				input {
					font-size: 28rpx;
					color: #333;
					width: 70%;
					padding-left: 40rpx;
					margin-top: 4rpx;
				}

				.upload {
					padding: 10rpx 24rpx;
					border-radius: 6px;
					font-size: 28rpx;
					color: #fff;
					background: #039AF1;
					margin-left: 40rpx;
				}
			}

			.content {
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333;
				background: #fff;
				padding: 32rpx 28rpx;
				box-sizing: border-box;
				border-radius: 4px;

				.read {
					margin-left: 20upx;
				}
			}

			.btn {
				width: 80%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				margin: 40rpx auto 0;
				border-radius: 6px;
				font-size: 28rpx;
				color: #fff;
				background: #039AF1;
			}
		}
	}
</style>
