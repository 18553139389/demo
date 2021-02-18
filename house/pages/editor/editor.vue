<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="bg-shadeTop" @goBack="goBack">
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="item">
				<view class="left"><text style="color: red;margin-right: 16rpx;">*</text>收货人</view>
				<input type="text" v-model="user" placeholder="请填写收货人的姓名">
			</view>
			<view class="item">
				<view class="left"><text style="color: red;margin-right: 16rpx;">*</text>手机号码</view>
				<input type="text" v-model="phone" placeholder="请填写收货人的手机号码">
			</view>
			<view class="item choice">
				<view class="left"><text style="color: red;margin-right: 16rpx;">*</text>收货地址</view>
				<view class="right">
					<AddressPicker @change="change" :level="3">{{address}} </AddressPicker>
					<image src="../../static/images/right.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item">
				<view class="left"><text style="color: red;margin-right: 16rpx;">*</text>详细地址</view>
				<input type="text" v-model="location" placeholder="请填写详细地址">
			</view>
		</view>
		<view class="sure" @tap="goAdd">确认</view>
	</view>
</template>

<script>
	import AddressPicker from "../../components/address-picker/AddressPicker.vue"
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				user: '',
				phone: '',
				address: '请选择地址',
				location: '',
				title: '添加新地址',
				addressId: '',
				type: 0
			}
		},
		components: {
			AddressPicker
		},
		onLoad(option) {
			if (option.type == 1) {
				this.title = '修改新地址'
				this.type = 1
				let item = JSON.parse(option.item)
				this.user = item.name
				this.phone = item.phone
				this.address = item.address
				this.location = item.addressdetail
				this.addressId = item.addressid
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			change(result) {
				let address = ''
				if (result.data[0].name !== result.data[1].name) {
					result.data.forEach((item, index) => {
						if (index === 0) {
							address += item.name
						} else {
							address += '-' + item.name
						}
					})
					let arr = address.split('-')
					this.address = arr.join('')
				} else {
					result.data.forEach((item, index) => {
						if (index === 0) {
							address += ''
						} else if (index === 1) {
							address += item.name
						} else {
							address += '-' + item.name
						}
					})
					let arr = address.split('-')
					this.address = arr.join('')
				}
			},
			goAdd() {
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}

				if (this.phone == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				if (this.address == '请选择地址') {
					Toast.showToast('请选择地址')
					return
				}

				if (this.location == '') {
					Toast.showToast('请填写详细地址')
					return
				}

				// 添加我的地址
				if (this.type == 1) {
					this.$u.post('addAddress', {
						uid: uni.getStorageSync('uid'),
						addressid: this.addressId,
						name: this.user,
						phone: this.phone,
						address: this.address,
						addressdetail: this.location,
						isdefault: 1
					}).then(res => {
						if (res.result == 0) {
							Toast.showToast('修改成功')
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					})
				} else {
					this.$u.post('addAddress', {
						uid: uni.getStorageSync('uid'),
						name: this.user,
						phone: this.phone,
						address: this.address,
						addressdetail: this.location,
						isdefault: 1
					}).then(res => {
						if (res.result == 0) {
							Toast.showToast('添加成功')
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					})
				}
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
		}

		.list {
			width: 100%;
			padding: 28rpx;
			box-sizing: border-box;

			.item {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				background: #FFFFFF;
				border-radius: 6px;
				padding: 0 28rpx;
				box-sizing: border-box;
				margin-bottom: 30rpx;

				.left {
					width: 180rpx;
				}

				input {
					font-size: 28rpx;
					color: #333;
				}

				&.choice {
					display: flex;
					align-items: center;

					.right {
						flex: 1;
						display: flex;
						justify-content: space-between;
						align-items: center;

						image {
							width: 50rpx;
						}
					}
				}
			}
		}

		.sure {
			width: 80%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
			text-align: center;
			border-radius: 6px;
			background: #fe5f23;
			margin: 40rpx auto 0;
		}
	}
</style>
