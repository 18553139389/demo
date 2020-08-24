<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">车辆管理</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="box">
				<view class="search">
					<image src="../../static/images/search.png" alt=""></image>
					<input type="text" v-model="val" placeholder="请输入车牌号" confirm-type="search" @confirm="goSearch">
				</view>
				<view class="btn-search" @tap="goSearch">查询</view>
			</view>
			<ul class="team" v-if="show">
				<li v-for="(v,k) in list" :key="k" @tap="goCount(v)">
					<view class="cars">
						<view>{{v.carnum}}</view>
						<view>{{v.owner}}</view>
					</view>
					<view class="msg">
						<view>行车证：{{v.passportnum}}</view>
						<view>{{v.ownermobile}}</view>
					</view>
					<view class="msg">
						<view>自重：{{v.weight}}{{v.weightunit}}</view>
						<image src="../../static/images/right.png" alt=""></image>
					</view>
				</li>
			</ul>
			<view class="no" v-if="!show">没有查询到相关数据</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				val: '',
				show: true,
				list: []
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init(val='') {
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					carnum: val,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/truck/truckinfolist',
						data: datas,
						success: function(res) {
							console.log(JSON.stringify(res))
							if (res.data.Code == 0) {
								Toast.hideLoading()
								if(res.data.Customerdata.length > 0) {
									self.list = res.data.Customerdata
									self.show = true
								} else {
									self.show = false
								}
							} else if (res.data.Code == -2 || res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			goSearch() {
				this.init(this.val)
			},
			goCount(item) {
				let list = JSON.stringify(item)
				uni.navigateTo({
					url: '/pages/editor/editor?item=' + list
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
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 28upx;
			box-sizing: border-box;
			background: #FAFAFA;
			
			.box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.search {
					width: 70%;
					height: 70upx;
					background: #FFFFFF;
					border-radius: 4px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					color: #333;
					padding-left: 160upx;
					box-sizing: border-box;
					
					image {
						width: 36upx;
						height: 36upx;
					}
					
					input {
						width: 70%;
						margin-left: 24upx;
					}
				}
				
				.btn-search {
					width: 25%;
					height: 70upx;
					line-height: 70upx;
					text-align: center;
					font-size: 14px;
					color: #FFFFFF;
					background: #00AAEF;
					border-radius: 4px;
				}
			}
			
			.team {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				
				li {
					width: 100%;
					box-sizing: border-box;
					border: 1px solid #eee;
					border-radius: 4px;
					box-shadow: 1px 1px 5px rgba(0,0,0,.1);
					margin-top: 30upx;
					background: #FFFFFF;
					
					.cars {
						width: 100%;
						height: 80upx;
						padding: 0 20upx;
						box-sizing: border-box;
						border-bottom: 1px solid #eee;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 14px;
						color: #00AAEF;
					}
					
					.msg {
						width: 100%;
						height: 70upx;
						padding: 0 20upx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 14px;
						color: #333;
						
						image {
							width: 32upx;
							height: 32upx;
						}
					}
				}
			}
			
			.no {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 14px;
				color: #333;
				padding-top: 28upx;
			}
		}
	}
</style>
