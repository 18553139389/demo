<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">佣金排名</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="top1">
				<img src="../../static/images/jiangbei.png" alt="">
				<view class="sort">NO.{{mine}}</view>
			</view>
			<view class="list">
				<view class="lis">
					<view class="head">
						<view>排名</view>
						<view>昵称</view>
						<view>累计佣金</view>
					</view>
					<scroll-view scroll-y="true" class="scroll-Y" show-scrollbar="true" style="height:600upx;">
						<view class="item" v-for="(v,k) in list" :key="k">
							<view style="color: #FF6600;font-size: 28upx;width: 10%;">{{v.rank}}</view>
							<view class="name">
								<img :src="v.userimage.indexOf('https') > -1 ? v.userimage : 'https://www.ytsh.vip/' + v.userimage" alt="">
								<view style="width: 45%;">{{v.username}}</view>
							</view>
							<view style="color: #FF6600;width: 30%;text-align: center;">{{v.money}}元</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#FFFFFF',
				backColor: '',
				list: [],
				mine: ''
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'rankinglist',
					uid: uni.getStorageSync('uid'),
					pageCount: 100
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataList
								self.mine = res.data.datastr
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
		background: url(../../static/images/yj_bg.png);
		background-size: 100% 100%;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			height: calc(100vh - 130upx);
			overflow: hidden;
			display: flex;
			flex-direction: column;
			align-items: center;

			.top1 {
				width: 300upx;
				height: 348upx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}

				.sort {
					font-size: 48upx;
					color: #FFFFFF;
					z-index: 10;
					margin-top: 180upx;
				}
			}

			.list {
				width: 85%;
				background: url(../../static/images/paihangbang.png) no-repeat center center;
				background-size: 100% 100%;
				margin-top: -30upx;
				z-index: 99;
				display: flex;
				justify-content: center;
				align-items: center;

				.lis {
					width: 480upx;
					padding-top: 80upx;
					padding-bottom: 30upx;
					box-sizing: border-box;

					.head {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 26upx;
						color: #333;
						margin-bottom: 10upx;
					}

					.item {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 20upx;
						color: #333;
						margin-top: 40upx;

						.name {
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-left: 100upx;

							img {
								width: 40upx;
								height: 40upx;
								border-radius: 50%;
								margin-right: 10upx;
							}

							view {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}
				}
			}
		}
	}
</style>
