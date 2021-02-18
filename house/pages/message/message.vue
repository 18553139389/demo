<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">填写信息</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="bg">
				<!-- <view class="name">服务名称</view>
				<view class="card">3711221458410</view> -->
				<image :src="img"></image>
			</view>
			<view class="forms">
				<view class="item">
					<view class="user">姓名</view>
					<input type="text" v-model="user" placeholder="请填写您的姓名">
				</view>
				<view class="item">
					<view class="user">身份证</view>
					<input type="text" v-model="card" placeholder="请填写身份证号">
				</view>
				<view class="item">
					<view class="user">手机号</view>
					<view class="tell">
						<input type="text" v-model="call" placeholder="请填写手机号">
						<u-button type="primary" plain size="medium" :disabled="btnState" @tap="getValidate">{{rTime}} <span v-if="btnState">s</span></u-button>
					</view>
				</view>
				<view class="item">
					<view class="user">验证码</view>
					<input type="text" v-model="code" placeholder="请填写验证码">
				</view>
			</view>
			<view class="sure" @tap="goChange">兑换</view>
		</view>
		<u-toast ref="uToast" />
		<view class="dialog" v-if="show">
			<view class="box">
				<view class="text">您的积分不足，请先去赚积分</view>
				<view class="btn">
					<view class="common" @tap="goReturn">退出</view>
					<view class="common" style="color: #FFFFFF;background: #fe5f23;" @tap="goRead">去赚积分</view>
				</view>
			</view>
		</view>
		<view class="dialog" v-if="show1">
			<view class="box">
				<view class="text">兑换成功</view>
				<view class="btn">
					<view class="common" style="color: #FFFFFF;background: #fe5f23;width: 320rpx;text-align: center;" @tap="goLook">去查看</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Bg: '#ffffff',
				user: '',
				card: '',
				call: '',
				code: '',
				code1: '',
				rTime: '获取验证码',
				btnState: false,
				show: false,
				show1: false,
				img: '',
				id: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.$u.post('getseatimage').then(res => {
				console.log(res)
				if(res.result == 0) {
					if(option.type == 1) {
						this.img = res.dataobject.image1
					} else {
						this.img = res.dataobject.image2
					}
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getValidate() {
				if (this.call == '') {
					this.$refs.uToast.show({
						title: '手机号不能为空',
						icon: false
					})
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					this.$refs.uToast.show({
						title: '手机号格式不正确',
						icon: false
					})
					return
				}

				let self = this
				this.$u.post('getValidateCode',{
					phone: this.call
				}).then(res => {
					console.log(res)
					if(res.result == 0) {
						this.code1 = res.code
						this.$refs.uToast.show({
							title: '验证码发送成功',
							icon: false
						})
						this.rTime = 60
						let rTime = this.rTime
						this.btnState = true
						let interval = setInterval(() => {
							if (--self.rTime <= 0) {
								self.rTime = '获取验证码'
								clearInterval(interval)
								self.btnState = false
							}
						}, 1000)
					}
				})
			},
			goChange() {
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				
				let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				if(this.card == ''){
					Toast.showToast('身份证不能为空')
					return
				}else if(!(idcardReg.test(this.card))){
					Toast.showToast('身份证不合法')
					return
				}
				
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				if (this.code == '') {
					Toast.showToast('验证码不能为空')
					return
				}
				
				if(this.code != this.code1) {
					Toast.showToast('验证码错误')
					return
				}
				
				this.$u.post('payproduct',{
					uid: uni.getStorageSync('uid'),
					pcid: this.id,
					name: this.user,
					idcard: this.card,
					phone: this.call
				}).then(res => {
					console.log(res)
					if(res.result == 0) {
						this.show1 = true
					} else if(res.result == 1) {
						Toast.showToast('兑换失败')
					} else if(res.result == 2) {
						Toast.showToast('商品已下架')
					} else if(res.result == 3) {
						this.show = true
					} else if(res.result == 4) {
						Toast.showToast('商品库存不足')
					}
				})
			},
			goReturn() {
				this.show = false
				uni.navigateBack({
					delta: 1
				})
			},
			goRead() {
				uni.reLaunch({
				    url: '/pages/article/article'
				})
			},
			goLook() {
				uni.navigateTo({
				    url: '/pages/exchange/exchange?type=1'
				})
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
		
		.dialog {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,.4);
			z-index: 99999999;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.box {
				width: 80%;
				padding: 50rpx 32rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #FFFFFF;
				
				.text {
					font-size: 30rpx;
					color: #333;
					text-align: center;
					line-height: 20px;
				}
				
				.btn {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 40rpx 0 0;
					
					.common {
						padding: 16rpx 30rpx;
						border: 1px solid #fe5f23;
						border-radius: 30px;
						font-size: 30rpx;
						color: #fe5f23;
					}
				}
			}
		}

		.list {
			width: 100%;
			padding: 28rpx 28rpx 0;
			box-sizing: border-box;

			.bg {
				width: 100%;
				height: 360rpx;
				border-radius: 6px;
				// padding: 270rpx 28rpx 0;
				box-sizing: border-box;
				position: relative;
				overflow: hidden;
				
				image {
					width: 100%;
					height: 360rpx;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 0;
				}

				.name {
					width: 100%;
					font-size: 30rpx;
					color: #333;
					z-index: 1;
					position: relative;
					padding: 0 28rpx;
					box-sizing: border-box;
					margin-top: 260rpx;
				}

				.card {
					width: 100%;
					font-size: 28rpx;
					color: #333;
					margin-top: 16rpx;
					z-index: 1;
					position: relative;
					padding: 0 28rpx;
					box-sizing: border-box;
				}
			}

			.forms {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 28rpx;

				.item {
					width: 100%;
					display: flex;
					flex-direction: column;
					font-size: 30rpx;
					color: #333;
					font-weight: 600;
					margin-bottom: 28rpx;

					.user {
						margin-bottom: 24rpx;
					}

					input {
						width: 100%;
						height: 70rpx;
						border-radius: 6px;
						background: #FFFFFF;
						font-size: 28rpx;
						color: #333;
						font-weight: normal;
						padding: 0 28rpx;
						box-sizing: border-box;
					}

					.tell {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;

						input {
							width: 55%;
						}

						button {
							margin: 0;
							font-weight: 500;
						}
					}
				}
			}
			
			.sure {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				color: #FFFFFF;
				border-radius: 6px;
				background: #fe5f23;
				margin-top: 28rpx;
			}
		}
	}
</style>
