<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">确认完工</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles">
				<view>订单号</view>
				<view style="color: #666;">{{num}}</view>
			</view>
			<!-- <view class="titles" v-if="type == 2">
				<view>故障类型更新</view>
				<view class="item">
					<picker @change="bindPickerChange" :value="index1" :range="array1" range-key="name">
						<view class="picker">
							<view class="uni-input">{{val1}}</view>
							<img src="../../static/images/icon.png" alt="">
						</view>
					</picker>
				</view>
			</view>
			<view class="titles">
				<view>附加项(可选)</view>
				<view class="item">
					<picker @change="bindPickerChange1" :value="index2" :range="array2" range-key="name">
						<view class="picker">
							<view class="uni-input">{{val2}}</view>
							<img src="../../static/images/icon.png" alt="">
						</view>
					</picker>
				</view>
			</view> -->
			<view class="mark">
				<view>备注</view>
				<textarea v-model="val" placeholder="多行输入"></textarea>
			</view>
			<view class="mark">
				<view>上传图片 <span style="color: #999;">(1-3张)</span></view>
			</view>
			<view class="imgs">
				<view class="imgs-item" @tap="goLoad">
					<view class="imgs-show">
						<view class="add">+</view>
					</view>
				</view>
				<view class="imgs-item" v-for="(v,k) in imgs" :key="k" style="margin-left: 1.33%;">
					<view class="imgs-show" style="border: none;">
						<img class="bg" :src="'https://weixiu.lixinapp.com' + v" alt="">
						<view class="close" @tap="goClose(k)">X</view>
					</view>
				</view>
			</view>
			<!-- <view class="count">
				<view>费用合计</view>
				<view class="total">￥ {{price}}</view>
			</view> -->
			<view class="login" @tap="goSubmit">确认完工</view>
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
				val: '',
				index1: 0,
				array1: [],
				val1: '请选择',
				id1: '',
				index2: 0,
				array2: [{
					name: '请选择',
					id: '',
					price: 0
				}],
				val2: '请选择',
				id2: '',
				orderId: '',
				brandId: '',
				typeid: 0,
				type: 0,
				num: '',
				imgs: [],
				price1: 0,
				price2: 0,
			}
		},
		onLoad(option) {
			this.orderId = option.id
			this.type = option.type
			// this.brandId = option.brandId
			// if (option.typeid) {
			// 	this.typeid = option.typeid
			// }
			this.num = option.num
			this.init()
		},
		computed: {
			price() {
				let price = (parseFloat(this.price1) + parseFloat(this.price2)).toFixed(2)
				return price
			}
		},
		methods: {
			init() {
				//获取品牌故障费用
				let self = this
				// let data1 = {
				// 	mid: uni.getStorageSync('uid'),
				// 	brandId: this.brandId,
				// 	typeId: this.typeid
				// }
				// Toast.showLoading('', function() {
				// 	let data = {
				// 		url: 'app/service/maintainer/brand/cost',
				// 		data: data1,
				// 		success: function(res) {
				// 			console.log(res)
				// 			if (res.data.success == true) {
				// 				Toast.hideLoading()
				// 				for (let i = 0; i < res.data.body.FaultTypeList.length; i++) {
				// 					self.array1.push({
				// 						name: res.data.body.FaultTypeList[i].name,
				// 						id: res.data.body.FaultTypeList[i].id,
				// 						price: res.data.body.FaultTypeList[i].cost
				// 					})
				// 				}
				// 			} else {
				// 				Toast.hideLoading()
				// 				Toast.showToast(res.data.msg)
				// 			}
				// 		}
				// 	}
				// 	ajax(data)
				// })
				//获取附加项列表
				// let data2 = {
				// 	mid: uni.getStorageSync('uid')
				// }
				// Toast.showLoading('', function() {
				// 	let data = {
				// 		url: 'app/service/maintainer/addition/list',
				// 		data: data2,
				// 		success: function(res) {
				// 			console.log(res)
				// 			if (res.data.success == true) {
				// 				Toast.hideLoading()
				// 				for (let i = 0; i < res.data.body.list.length; i++) {
				// 					self.array2.push({
				// 						name: res.data.body.list[i].name + '' + res.data.body.list[i].value,
				// 						id: res.data.body.list[i].id,
				// 						price: res.data.body.list[i].value
				// 					})
				// 				}
				// 			} else {
				// 				Toast.hideLoading()
				// 				Toast.showToast(res.data.msg)
				// 			}
				// 		}
				// 	}
				// 	ajax(data)
				// })
			},
			goLoad() {
				//从相册中选择图片上传
				let self = this
				if (self.imgs.length == 3) {
					Toast.showToast('最多上传三张图片')
					return
				}
				uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						console.log(res)
						res.tempFilePaths.forEach((item, index) => {
							// 预览图片
							Toast.showLoading('上传中...', function() {
								uni.uploadFile({
									url: 'https://weixiu.lixinapp.com/app/service/maintainer/file/upload',
									filePath: item,
									name: 'file',
									formData: {
										mid: uni.getStorageSync('uid')
									},
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let url = JSON.parse(uploadFileRes.data)
										self.imgs.push(url.body.fileUrl)
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
			goClose(k) {
				this.imgs.splice(k, 1)
			},
			goSubmit() {
				let self = this
				// if (this.type == 2) {
				// 	if (this.val1 == '请选择') {
				// 		Toast.showToast('请选择故障类型')
				// 		return
				// 	}
				// }
				if (this.val == '') {
					Toast.showToast('备注不能为空')
					return
				}
				if (this.imgs.length == 0) {
					Toast.showToast('请上传图片')
					return
				}
				let image = ''
				if (this.imgs.length == 1) {
					image = this.imgs[0]
				} else {
					image = this.imgs.join('|')
				}
				let data1 = {
					mid: uni.getStorageSync('uid'),
					orderId: this.orderId,
					remark: this.val,
					image: image
				}
				// if (this.id2) {
				// 	data1 = {
				// 		mid: uni.getStorageSync('uid'),
				// 		orderId: this.orderId,
				// 		remark: this.val,
				// 		image: image
				// 		faultTypeId: this.id1,
				// 		additionId: this.id2
				// 	}
				// } else {
				// 	data1 = {
				// 		mid: uni.getStorageSync('uid'),
				// 		orderId: this.orderId,
				// 		remark: this.val,
				// 		image: image,
				// 		faultTypeId: this.id1
				// 	}
				// }
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/order/complete',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								Toast.showToast('确认成功')
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
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.val1 = this.array1[e.target.value].name
				this.id1 = this.array1[e.target.value].id
				this.price1 = this.array1[e.target.value].price
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.val2 = this.array2[e.target.value].name
				this.id2 = this.array2[e.target.value].id
				this.price2 = this.array2[e.target.value].price
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

			.titles {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				color: #333;

				.item {
					width: 40%;
					height: 70upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20upx;
					box-sizing: border-box;
					border: 1px solid #eee;
					border-radius: 4px;
					font-size: 28upx;
					color: #333;

					picker {
						width: 100%;
						
						.picker {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					img {
						width: 24upx;
						height: 24upx;
					}
				}
			}

			.mark {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 28upx;
				color: #333;

				textarea {
					width: 100%;
					height: 240upx;
					border: 1px solid #eee;
					border-radius: 4px;
					padding: 20upx;
					box-sizing: border-box;
					font-size: 24upx;
					color: #333;
					margin: 30upx 0;
				}
			}

			.imgs {
				width: 100%;
				display: flex;
				margin-top: 30upx;
				flex-wrap: wrap;

				.imgs-item {
					width: 24%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 30upx;

					.imgs-show {
						width: 100%;
						height: 170upx;
						border-radius: 4px;
						border: 1px solid #eee;
						display: flex;
						justify-content: space-around;
						align-items: center;
						position: relative;

						.close {
							width: 30upx;
							height: 30upx;
							background: red;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 28upx;
							color: #FFFFFF;
							border-radius: 50%;
							position: absolute;
							top: -15upx;
							right: -15upx;
							z-index: 999;
						}

						.add {
							font-size: 80upx;
							color: #333;
						}

						.bg {
							width: 100%;
							height: 100%;
							position: absolute;
							top: 0;
							left: 0;
							z-index: 10;
						}
					}
				}
			}
			
			.count {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				
				.total {
					color: red;
				}
			}

			.login {
				width: 70%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 30px;
				font-size: 28upx;
				color: #FFFFFF;
				background: #006EE3;
				margin: 80upx auto 0;
			}
		}
	}
</style>
