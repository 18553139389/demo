<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">转让</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="top">请提交您想要转让的信息，以便我们及时与您联系</view>
			<view class="list">
				<view class="list-item">
					<view class="titles">
						<view>证书名称</view>
					</view>
					<input type="text" v-model="name" placeholder="请输入证书名称">
				</view>
				<view class="list-item">
					<view>预算</view>
					<input type="number" v-model="wx" placeholder="请输入预算金额">
				</view>
				<view class="list-item">
					<view class="common">
						<view>联系人</view>
					</view>
					<input type="text" v-model="user" placeholder="请输入联系人姓名">
				</view>
				<view class="list-item">
					<view class="common">
						<view>联系方式</view>
					</view>
					<input type="text" v-model="call" placeholder="请输入联系方式">
				</view>
			</view>
			<view class="btn" @tap="goOrder">提交</view>
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
				name: '',
				wx: '',
				user: '',
				call: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			goOrder() {
				let self = this
				if (this.name == '') {
					Toast.showToast('证书名称不能为空')
					return
				}
				if (this.wx == '') {
					Toast.showToast('预算不能为空')
					return
				}
				if (this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				let data1 = {
					uid: uni.getStorageSync('uid'),
					certificatename: this.name,
					money: this.wx,
					name: this.user,
					phone: this.call
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'addsubmitsell',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.navigateTo({
								    url: '/pages/result/result'
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
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.top {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #EAF5FF;
				font-size: 28rpx;
				color: #249AFD;
			}
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.list-item {
					width: 100%;
					padding: 40rpx 28rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					font-size: 30rpx;
					color: #333;
					
					input {
						width: 100%;
						height: 70rpx;
						border-radius: 4px;
						background: #f6f6f6;
						padding: 0 24rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						color: #333;
						margin-top: 40rpx;
					}
					
					.titles {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					
					.common {
						width: 100%;
						display: flex;
						align-items: center;
					}
				}
			}
			
			.btn {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				margin: 40rpx auto 0;
				border-radius: 30px;
				background: #00C700;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
</style>
