<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">推广二维码</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<img class="friend" src="../../static/images/share.png" alt="">
			<view class="code">
				<tki-qrcode id="captureId" cid="qrcode1" ref="qrcode" :val="url" :size="size" :unit="unit" 
				:icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
				:usingComponents="true" @result="qrR" />
				<view class="share" @tap="goSave">保存图片</view>
				<view class="copy">
					<view class="urls"><span style="color: #FF6600;">{{url}}</span></view>
					<view style="color: #FF6600;" v-clipboard:copy="url" v-clipboard:success="onCopy">复制</view>
				</view>
			</view>
			<view class="content">
				如何赚钱：<br />
				第一步：转发商品链接或商品图片给微信好友 <br />
				第二步：从您转发的链接或图片进入商城的好友，系统
				将自动锁定成为您的客户，他们在商城中购买任何商品，
				您都可以获得团队佣金；<br />
				第三步：您可以在团队中心查看【我的团队】和【团队
				订单】，好友确认收货后佣金方可提现
			</view>
			<view class="speak">
				说明：<br />
				分享后会带有独有的推荐码，您的好友访问之后，系
				统会自动检测并记录客户关系。如果您的好友已经被
				其他人抢先发展成了客户，他就不能成为您的客户，
				以最早发展成为客户为准。
			</view>
		</view>
		<view class="mask" v-if="show" @tap="hideImg">
			<view class="code">
				<img :src="dataURL" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	import html2canvas from 'html2canvas'
	import tkiQrcode from '../../components/tki-qrcode/tki-qrcode.vue'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#FFFFFF',
				backColor: '#FF6600',
				uid: '',
				url: '',
				dataURL: '',
				size: 300, // 二维码大小
				unit: 'upx', // 单位
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				show: false
			}
		},
		components: {
			tkiQrcode
		},
		onShow() {
			this.uid = uni.getStorageSync('uid')
			this.url = 'https://www.ytsh.vip/#/pages/register/register?uid=' + this.uid
		},
		onLoad() {
			let self = this
			self.$nextTick(function() {
				self.$refs.qrcode._makeCode()
			})
		},
		methods: {
			onCopy() {
				Toast.showToast('复制成功')
			},
			toImg() {
				let self = this
				html2canvas(document.querySelector('#captureId')).then(canvas => {
					let imgUrl = canvas.toDataURL('image/png');
					self.dataURL = imgUrl
					self.show = true
					console.log(self.dataURL)
				}).catch(error => {})
			},
			goSave() {
				this.toImg()
			},
			qrR() {
				
			},
			hideImg() {
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
		min-height: 100vh;
		background-image: linear-gradient(#FF6600, #FF4620);

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.friend {
				width: 580upx;
				height: 53upx;
			}

			.code {
				width: 92%;
				padding: 60upx 0;
				box-sizing: border-box;
				border-radius: 6px;
				background: #FFFFFF;
				margin: 30upx 0;
				display: flex;
				flex-direction: column;
				align-items: center;

				img {
					width: 360upx;
					height: 360upx;
				}

				.share {
					padding: 16upx 80upx;
					background: #FF6600;
					border-radius: 30px;
					font-size: 14px;
					color: #FFFFFF;
					margin: 50upx 0;
				}

				.copy {
					width: 80%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #333;

					.urls {
						width: 80%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

			.content {
				width: 100%;
				padding: 0 28upx 28upx;
				box-sizing: border-box;
				font-size: 14px;
				color: #FFFFFF;
			}

			.speak {
				width: 92%;
				padding: 20upx;
				box-sizing: border-box;
				border-radius: 4px;
				background: #FC5E19;
				font-size: 14px;
				color: #FFFFFF;
				margin: 10upx auto 80upx;
			}
		}
		
		.mask {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.6);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 9999;
			
			.code {
				padding: 30upx;
				background: #FFFFFF;
				
				img {
					width: 400upx;
					height: 400upx;
				}
			}
		}
	}
</style>
