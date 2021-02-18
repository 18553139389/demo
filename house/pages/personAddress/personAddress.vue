<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="bg-shadeTop" @goBack="goBack">
				<block slot="content">收货地址</block>
			</cu-custom>
		</view>
		<view class="list">
			<u-radio-group v-model="value" @change="radioGroupChange">
				<view class="item" v-for="(v,k) in list" :key="k">
					<view class="location">
						<view class="detail">{{v.address + v.addressdetail}}</view>
						<view class="mark" @tap.stop>
							<image src="../../static/images/editor.png" style="margin-right: 20rpx;" @tap="goEditor(v)"></image>
							<image src="../../static/images/del.png" @tap="goDelete(v.addressid,k)"></image>
						</view>
					</view>
					<view class="user">
						<view>{{v.name}}</view>
						<view style="margin-left: 30rpx;">{{v.phone}}</view>
					</view>
					<u-radio :name="v.addressid" active-color="#fe5f23">默认</u-radio>
				</view>
			</u-radio-group>
		</view>
		<view class="add" @tap="goAdd">添加收货地址</view>
		<u-modal v-model="show" :content="content" :show-cancel-button="true" @confirm="confirm"></u-modal>
		<view class="no" v-if="list.length == 0">
			<image src="../../static/images/none.png" mode="widthFix"></image>
			<view>还没有添加新的地址哦~</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				list: [],
				value: '',
				ids: '',
				show: false,
				content: '确认删除此地址吗？',
				id: '',
				goodsId: '',
				price: 0,
				sort: 0
			}
		},
		onShow() {
			this.init()
		},
		onLoad(option) {
			this.goodsId = option.goodsid
			this.price = option.price
			this.ids = option.id
		},
		methods: {
			init() {
				// 获取我的地址
				this.$u.post('myAddressList', {
					uid: uni.getStorageSync('uid')
				}).then(res => {
					console.log(res)
					if(res.result == 0) {
						this.list = res.dataList
						this.list.forEach((item) => {
							if(item.isdefault == 1) {
								this.value = item.addressid
								uni.setStorageSync('addressId', item.addressid)
							}
						})
					}
				})
			},
			goBack() {
				// 中奖纪录地址选择和购物区分
				if(this.ids) {
					this.$u.post('addressmyluckdrawrecord', {
						uid: uni.getStorageSync('uid'),
						irid: this.ids,
						addressid: uni.getStorageSync('addressId')
					}).then(res => {
						console.log(res)
						uni.navigateBack({
							delta: 1
						})
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			},
			radioGroupChange(e) {
				let obj = {}
				this.list.forEach((item) => {
					if(item.addressid == e) {
						obj = item
					}
				})
				this.$u.post('addAddress', {
					uid: uni.getStorageSync('uid'),
					addressid: obj.addressid,
					name: obj.name,
					phone: obj.phone,
					address: obj.address,
					addressdetail: obj.addressdetail,
					isdefault: 1
				}).then(res => {
					if (res.result == 0) {
						Toast.showToast('地址切换成功')
						uni.setStorageSync('addressId', obj.addressid)
					}
				})
			},
			goAdd() {
				uni.navigateTo({
				    url: '/pages/editor/editor'
				})
			},
			goEditor(item) {
				let items = JSON.stringify(item)
				uni.navigateTo({
				    url: '/pages/editor/editor?item=' + items + '&type=1'
				})
			},
			goDelete(id,k) {
				this.id = id
				this.sort = k
				this.show = true
			},
			confirm() {
				this.$u.post('deleteAddress', {
					uid: uni.getStorageSync('uid'),
					addressid: this.id
				}).then(res => {
					if (res.result == 0) {
						Toast.showToast('地址删除成功')
						this.list.splice(this.sort,1)
					}
				})
			},
			goOrder() {
				this.$u.post('paygoodsarticle', {
					uid: uni.getStorageSync('uid'),
					goodsid: this.goodsId,
					addressid: uni.getStorageSync('addressId')
				}).then(res => {
					console.log(res)
					this.goPay(res.ordernum)
				})
			},
			goPay(order) {
				// 微信支付
				let self = this
				this.$u.post('weixinpay', {
					uid: uni.getStorageSync('uid'),
					ordernum: order,
					money: this.price
				}).then(res => {
					console.log(res)
					if (res.result == 0) {
						let appId = res.body.appId
						let timeStamp = res.body.timeStamp
						let nonceStr = res.body.nonceStr
						let packages = res.body.package
						let signType = res.body.signType
						let paySign = res.body.paySign
						self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign)
					} else {
						Toast.showToast(res.resultNote)
					}
				})
			},
			onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign) {
				let self = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						'appId': appId,
						'timeStamp': timeStamp,
						'nonceStr': nonceStr,
						'package': packages,
						'signType': signType,
						'paySign': paySign
					},
					function(res) {
						if (res.err_msg === 'get_brand_wcpay_request:ok') {
							Toast.showToast('支付成功')
							setTimeout(() => {
								uni.reLaunch({
								    url: '/pages/result/result'
								})
							},2000)
						} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
							Toast.showToast('用户取消支付')
						} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
							Toast.showToast('网络异常，请重试')
						}
					}
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
			
			.rights {
				font-size: 30rpx;
				color: #FFFFFF;
				padding-right: 28rpx;
			}
		}

		.list {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-bottom: 100rpx;

			.item {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				background: #FFFFFF;
				margin-bottom: 30rpx;

				.location {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.detail {
						width: 80%;
						font-size: 28rpx;
						color: #333;
						line-height: 18px;
					}

					.mark {
						display: flex;
						align-items: center;

						image {
							width: 54rpx;
							height: 54rpx;
						}
					}
				}

				.user {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #666;
					margin: 28rpx 0;
				}
			}
		}
		
		.add {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #fe5f23;
			text-align: center;
		}
		
		.no {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #999;
			margin-top: 30%;
			
			image {
				width: 50%;
				margin-bottom: 24rpx;
			}
		}
	}
</style>
