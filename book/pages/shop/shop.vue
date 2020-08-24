<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">收银台</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="pay">
				<view class="money">￥{{obj.price}}</view>
				<view>需支付</view>
			</view>
			<view class="order">
				<view>订单编号</view>
				<view>{{obj.order}}</view>
			</view>
			<view class="order">
				<view>产品所有人</view>
				<view>{{list.zhifubaoname}}</view>
			</view>
			<view class="warn">请将藏品款通过以下支付方式转账给产品所有人，注意核对订单编号，金额和所有人姓名，支付完成后点击上面返回订单中心，查看等待付款的订单，点击我已付款</view>
			<view class="code" @tap="goPay">
				<view class="code-left">
					<img src="../../static/images/zhifubao.png" alt="">
					<view class="code-text">
						<view>跳转支付宝支付</view>
						<view style="color: #999;font-size: 12px;">不能跳转请使用下方手动扫码支付</view>
					</view>
				</view>
				<img src="../../static/images/xiayiye.png" alt="">
			</view>
			<view class="code" @tap="goPay1">
				<view class="code-left">
					<img src="../../static/images/zhifubao.png" alt="">
					<img src="../../static/images/wx1.png" alt="" style="margin-left: 24upx;">
					<view class="code-text" style="line-height: 80upx;">
						<view>手动扫码支付</view>
					</view>
				</view>
				<img src="../../static/images/xiayiye.png" alt="">
			</view>
			<!-- <view class="code-img">
				<tki-qrcode cid="qrcode1" ref="qrcode" :val="url" :size="size" :unit="unit" :icon="icon" :iconSize="iconsize" :lv="lv"
				:onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
			</view> -->
			<view class="order">
				<view>卖家收款信息：</view>
			</view>
			<view class="order">
				<view>支付宝姓名</view>
				<text>{{list.zhifubaoname}}</text>
			</view>
			<view class="order">
				<view>支付宝账号</view>
				<view class="wxs" v-clipboard:copy="urls" v-clipboard:success="onCopy" style="width: 160upx;margin-bottom: 0;">复制</view>
				<text>{{list.zhifubaonum}}</text>
			</view>
			<view class="wx" @tap="goResult" v-if="list.weixinqrcode">查看微信收款码</view>
		</view>
		<view class="mask" v-if="show1" @tap="goHide">
			<img :src="list.weixinqrcode" alt="">
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import tkiQrcode from '../../components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				Color: '#333',
				obj: {},
				list: {},
				url: '',
				dataURL: '',
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				type: 0,
				show1: false,
				urls: ''
			}
		},
		components: {
			tkiQrcode
		},
		onLoad(option) {
			this.obj = JSON.parse(option.list)
			this.init()
		},
		onShow() {
			if (this.type == 1) {
				uni.navigateTo({
					url: '/pages/userOrder/userOrder'
				})
			}
		},
		onHide() {
			this.type = 0
		},
		onUnload() {
			this.type = 0
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'getzhifubao',
					uid: uni.getStorageSync('uid'),
					ordernum: this.obj.order
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataobject
								let url =`https://www.ytsh.vip/pay/pay.html?uid=${self.list.tauserid}&money=${self.obj.price}&mark_sell=${self.obj.order}`
								let _alipayh5url = "alipays://platformapi/startapp?appId=20000067&url=" + encodeURIComponent(url)
								self.url = _alipayh5url
								self.urls = `${self.list.zhifubaonum}`
								self.$nextTick(function() {
									self.$refs.qrcode._makeCode()
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goPay() {
				// let self = this
				// if (self.list.tauserid && self.obj.price) {
				// 	let url =`https://www.ytsh.vip/pay/pay.html?uid=${self.list.tauserid}&money=${self.obj.price}&mark_sell=${self.obj.order}`
				// 	let _alipayh5url = "alipays://platformapi/startapp?appId=20000067&url=" + encodeURIComponent(url)
				// 	window.location.href = _alipayh5url
				// }
			},
			goPay1() {
				if(!this.list.weixinqrcode && !this.list.zhifubaoqrcode) {
					Toast.showToast('卖方还没有上传收款码')
					return
				}
				if(this.list.weixinqrcode == '' || this.list.weixinqrcode == undefined) {
					this.list.weixinqrcode = 0
				}
				if(this.list.zhifubaoqrcode == '' || this.list.zhifubaoqrcode == undefined) {
					this.list.zhifubaoqrcode = 0
				}
				uni.navigateTo({
					url: '/pages/payCode/payCode?wx=' + this.list.weixinqrcode + '&zfb=' + this.list.zhifubaoqrcode
				})
			},
			goResult() {
				this.show1 = true
			},
			goHide() {
				this.show1 = false
			},
			qrR() {

			},
			onCopy() {
				Toast.showToast('复制成功')
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
			display: flex;
			flex-direction: column;
			padding: 0 28upx;
			box-sizing: border-box;
	
			.pay {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 40upx;
	
				.money {
					font-size: 28px;
					color: #333;
					margin: 40upx 0 20upx;
					font-weight: 500;
				}
			}
	
			.order {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
	
				.wxs {
					text-align: center;
					padding: 6upx 0;
					border: 1px solid #eee;
					font-size: 14px;
					color: #333;
					border-radius: 24px;
				}
			}
	
			.warn {
				width: 100%;
				padding: 20upx;
				box-sizing: border-box;
				background: #F8F9FB;
				border-radius: 4px;
				font-size: 12px;
				color: red;
				line-height: 18px;
				margin: 24upx 0 0;
			}
	
			.code {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
				border-bottom: 1px solid #eee;
				padding: 30rpx 0;
	
				.code-left {
					display: flex;
					align-items: center;
	
					img {
						width: 80upx;
						height: 80upx;
					}
	
					.code-text {
						height: 80upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 14px;
						color: #333;
						padding-left: 24upx;
					}
				}
	
				img {
					width: 17upx;
					height: 30upx;
				}
			}
	
			.code-img {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 40upx 0;
	
				img {
					width: 500upx;
					height: 500upx;
				}
			}
	
			.wx {
				padding: 16upx 50upx;
				border: 1px solid #eee;
				margin: 50upx auto;
				font-size: 14px;
				color: #333;
				border-radius: 24px;
			}
		}
	
		.mask {
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .6);
			position: fixed;
			left: 0;
			top: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 99999;
	
			img {
				width: 300upx;
				height: 300upx;
			}
		}
	}
</style>
