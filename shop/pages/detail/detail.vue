<template>
	<view class="contain">
		<view class="banner">
			<swiper class="swiper" :autoplay="autoplay" :interval="interval" circular="true" @change="change">
				<swiper-item v-for="(v,k) in swiperList" :key="k">
					<img style="width: 100%;height: 100%;" :src="v" alt="">
				</swiper-item>
			</swiper>
			<view class="back" @tap="goBack">
				<img src="../../static/images/back1.png" alt="">
			</view>
			<!-- <view class="mark">{{swiperIndex}} / {{total}}</view> -->
		</view>
		<view class="wrapper">
			<view class="msg">
				<view class="msg-left">
					<view>收购价</view>
					<!-- <view style="color: red;font-size: 42upx;margin-left: 30upx;height: 70upx;line-height: 70upx;" v-if="list.sales < 100">￥{{list.price}}</view> -->
					<!-- <view style="color: red;font-size: 42upx;margin-left: 30upx;height: 70upx;line-height: 70upx;" v-if="list.sales >= 100">￥{{list.price2}}</view> -->
					<view style="color: red;font-size: 42upx;margin-left: 30upx;height: 70upx;line-height: 70upx;">￥{{list.price3}}</view>
				</view>
				<view class="msg-left">
					<view>已收{{list.sales ? list.sales : 0}}</view>
				</view>
			</view>
			<view class="msg-title">{{list.title}}</view>
			<view class="msg-title" style="font-size: 28upx;color: #666;margin-top: 24upx;">{{list.content}}</view>
			<view class="forms">
				<view class="item">
					<view class="item-left">姓名</view>
					<view class="item-right">
						<input type="text" v-model="name" placeholder="请输入姓名">
					</view>
				</view>
				<view class="item">
					<view class="item-left">联系方式</view>
					<view class="item-right">
						<input type="number" v-model="call" placeholder="请输入电话">
					</view>
				</view>
				<view class="item">
					<view class="item-left">数量</view>
					<view class="item-right">
						<input type="number" v-model="num" placeholder="请输入数量">
					</view>
				</view>
				<view class="item" @tap="goTime">
					<view class="item-left">到期时间</view>
					<view class="item-right">
						<input type="text" v-model="time" placeholder="请选择" disabled>
						<img src="../../static/images/xiala@2x.png" alt="">
					</view>
				</view>
				<view class="item">
					<view class="item-left">物流公司</view>
					<view class="item-right">
						<input type="text" v-model="company" placeholder="请输入物流">
					</view>
				</view>
				<view class="item">
					<view class="item-left">物流单号</view>
					<view class="item-right">
						<input type="text" v-model="order" placeholder="请输入单号">
					</view>
				</view>
			</view>
			<view class="forms">
				<view class="accept">收件信息</view>
				<view class="item" style="margin-top: 16upx;">
					<view class="item-left">{{list.username}}</view>
					<view class="item-right">{{list.phone}}</view>
				</view>
				<view class="content">{{list.address}}</view>
			</view>
			<view class="submit" @tap="goResult">提交信息</view>
			<view class="warn">请确认信息真实性，提交虚假信息将会被平台封号处理</view>
		</view>
		<w-picker mode="date" startYear="2015" endYear="2030" step="1" :current="false" @confirm="onConfirm1" ref="picker1"
		themeColor="#00AAEF"></w-picker>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import wPicker from "../../components/w-picker/w-picker.vue"
	export default {
		data() {
			return {
				autoplay: true,
				interval: 5000,
				total: 0,
				swiperIndex: 1,
				swiperList: [],
				name: '',
				call: '',
				num: '',
				time: '',
				company: '',
				order: '',
				list: {},
				ids: '',
				isBind: 0
			}
		},
		components: {
			wPicker
		},
		onLoad(option) {
			this.ids = option.id
		},
		onShow() {
			this.init(this.ids)
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					productId: id,
					uid: uni.getStorageSync('uid')
				}
				let data = {
					url: '/productDetail',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data
							self.swiperList.push(res.data.image)
							self.total = self.swiperList.length
							self.isBind = res.data.isBind
							if(res.data.isBind == 0) {
								uni.showModal({
								    title: '提示',
									cancelText: '再看看',
									confirmText: '去绑定',
									confirmColor: 'red',
								    content: '需绑定手机号才能供货',
								    success: function (res) {
								        if (res.confirm) {
								            uni.navigateTo({
								            	url: '/pages/bind/bind'
								            })
								        } else if (res.cancel) {
								            console.log('用户点击取消')
								        }
								    }
								})
							}
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			goBack() {
				uni.navigateBack({
				    delta: 1
				})
			},
			change(e) {
				this.swiperIndex = e.detail.current + 1
			},
			goTime() {
				this.$refs.picker1.show()
			},
			onConfirm1(e) {
				this.time = e.result
			},
			goResult() {
				let self = this
				if(this.isBind == 0) {
					uni.showModal({
					    title: '提示',
						cancelText: '再看看',
						confirmText: '去绑定',
						confirmColor: 'red',
					    content: '需绑定手机号才能供货',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url: '/pages/bind/bind'
					            })
					        } else if (res.cancel) {
					            console.log('用户点击取消')
					        }
					    }
					})
					return
				}
				
				if (this.name == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				if (this.num == '') {
					Toast.showToast('数量不能为空')
					return
				}
				
				if (this.time == '') {
					Toast.showToast('请选择时间')
					return
				}
				
				if (this.company == '') {
					Toast.showToast('请填写物流名称')
					return
				}
				
				if (this.order == '') {
					Toast.showToast('请填写物流单号')
					return
				}
				
				let data1 = {
					uid: uni.getStorageSync('uid'),
					productId: this.ids,
					username: this.name,
					phone: this.call,
					qty: this.num,
					expireDate: this.time,
					expressName: this.company,
					expressNo: this.order
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/addOrder',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.navigateTo({
								    url: '/pages/result/result?content=' + res.data.content
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
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
		
		.banner {
			width: 100%;
			height: 750upx;
			position: relative;
					
			.swiper {
				width: 100%;
				height: 100%;
			}
			
			.back {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0,0,0,.4);
				border-radius: 50%;
				font-size: 18px;
				color: #FFFFFF;
				position: absolute;
				left: 28upx;
				top: 28upx;
				
				img {
					width: 30upx;
					height: 30upx;
				}
			}
			
			.mark {
				padding: 10upx 30upx;
				background: rgba(0,0,0,.4);
				border-radius: 40px;
				font-size: 15px;
				color: #FFFFFF;
				position: absolute;
				right: 40upx;
				bottom: 80upx;
			}
		}
		
		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.msg {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 0 0;
				
				.msg-left {
					height: 70upx;
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #333;
				}
			}
			
			.msg-title {
				width: 100%;
				font-size: 30upx;
				color: #111111;
			}
			
			.forms {
				width: 100%;
				padding: 20upx;
				box-sizing: border-box;
				border-radius: 4px;
				background: #F5F5F5;
				margin-top: 30upx;
				display: flex;
				flex-direction: column;
				
				.item {
					width: 100%;
					display: flex;
					align-items: center;
					
					.item-left {
						width: 30%;
						height: 60upx;
						font-size: 28upx;
						color: #333;
						display: flex;
						align-items: center;
					}
					
					.item-right {
						width: 70%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						
						input {
							font-size: 28upx;
							color: #333;
						}
						
						img {
							width: 30upx;
							height: 15upx;
						}
					}
				}
				
				.accept {
					width: 100%;
					font-size: 30upx;
					color: #111111;
					font-weight: 600;
				}
				
				.content {
					width: 100%;
					font-size: 28upx;
					color: #333;
					margin-top: 16upx;
				}
			}
			
			.submit {
				width: 80%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 30upx;
				color: #FFFFFF;
				margin: 32upx auto;
				border-radius: 30px;
				background: #111111;
			}
			
			.warn {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 28upx;
				color: red;
			}
		}
	}
</style>
