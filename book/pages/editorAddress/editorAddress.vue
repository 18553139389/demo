<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="common">
				<view>联系人：</view>
				<input type="text" v-model="user" placeholder="请输入联系人的姓名">
			</view>
			<view class="common">
				<view>手机号：</view>
				<input type="text" v-model="tel" placeholder="请输入联系人的电话">
			</view>
			<view class="common" @tap="showType">
				<view>地址：</view>
				<input type="text" v-model="address" placeholder="请选择您的地理位置" disabled>
				<img src="../../static/images/dingwei.png" alt="">
			</view>
			<view class="common">
				<view>详细地址：</view>
				<input type="text" v-model="detail" placeholder="请输入详细地址、如门牌号等">
			</view>
			<view class="submit" @tap="goSubmit">提交</view>
		</view>
		<w-picker
		mode="region"
		:level="3"
		:hideArea="false"
		@confirm="onConfirm" 
		ref="region" 
		themeColor="#FF6600"
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "../../components/w-picker/w-picker.vue"
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				title: '添加地址',
				Color: '#333',
				user: '',
				tel: '',
				address: '',
				detail: '',
				aid: ''
			}
		},
		components: {
			wPicker
		},
		onLoad(option) {
			if(option.type == 0) {
				this.title = '编辑地址'
				let list = JSON.parse(option.list)
				this.user = list.name
				this.tel = list.phone
				this.address = list.address
				this.detail = list.addressdetail
				this.aid = list.aid
			}
		},
		methods: {
			onConfirm(e) {
				console.log(e)
				this.address = e.result
			},
			showType() {
				this.$refs.region.show()
			},
			goSubmit() {
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				
				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(this.tel))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				if (this.address == '') {
					Toast.showToast('请选择地址')
					return
				}
				
				if (this.detail == '') {
					Toast.showToast('请填写详细地址')
					return
				}
				
				let self = this
				let data1 = {
					cmd: 'addoreditaddresslist',
					uid: uni.getStorageSync('uid'),
					aid: this.aid,
					name: this.user,
					phone: this.tel,
					address: this.address,
					addressdetail: this.detail,
					isdefault: 1
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(self.aid) {
									Toast.showToast('添加成功')
								} else {
									Toast.showToast('编辑成功')
								}
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.common {
				width: 100%;
				height: 100upx;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333;
				padding: 0 28upx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				
				view {
					width: 28%;
				}
				
				input {
					width: 62%;
					font-size: 14px;
					color: #333;
				}
				
				img {
					width: 24upx;
					height: 33upx;
					margin-left: 20upx;
				}
			}
			
			.submit {
				padding: 16upx 100upx;
				background: #FF6600;
				border-radius: 30px;
				font-size: 15px;
				color: #FFFFFF;
				margin: 100upx auto 0;
			}
		}
	}
</style>
