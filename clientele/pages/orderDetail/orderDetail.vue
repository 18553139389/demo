<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles" v-if="list.state == 0">待审核</view>
			<view class="titles" v-if="list.state == 1">营业执照</view>
			<view class="titles" v-if="list.state == 2">企业基本户和社保账户</view>
			<view class="titles" v-if="list.state == 3">资质办理建造师</view>
			<view class="titles" v-if="list.state == 4">资质办理工程师和技工</view>
			<view class="titles" v-if="list.state == 5">资质办理资质证书</view>
			<view class="titles" v-if="list.state == 6">安全生产许可办理三类人员和特种工</view>
			<view class="titles" v-if="list.state == 7">安全生产许可办理安全许可证</view>
			<view class="titles" v-if="list.state == 8">已完成</view>
			<view class="titles" v-if="list.state == 9">审核拒绝</view>
			<view class="sort">
				<view class="sort-title">订单进度</view>
				<view class="sort-list">
					<evan-steps :active="parseInt(list.state) - 1" primaryColor="#00C800">
						<evan-step title="第1步" description="营业执照"></evan-step>
						<evan-step title="第2步" description="企业基本户和社保账户"></evan-step>
						<evan-step title="第3步" description="资质办理" @goOpen="goOpen"></evan-step>
						<evan-step title="第4步" description="安全生产许可证办理" @goOpen="goOpen1"></evan-step>
					</evan-steps>
				</view>
			</view>
			<view class="sort">
				<view class="sort-title">订单详情</view>
				<view class="sort-list">
					<view class="sort-item">
						<view class="sort-left">类型</view>
						<view class="sort-text" v-if="list.type == 1">收购</view>
						<view class="sort-text" v-if="list.type == 2">办证</view>
						<view class="sort-text" v-if="list.type == 3">转让</view>
					</view>
					<view class="sort-item">
						<view class="sort-left">姓名</view>
						<view class="sort-text">{{list.name}}</view>
					</view>
					<view class="sort-item">
						<view class="sort-left">资质证书</view>
						<view class="sort-text">{{list.certificatename}}</view>
					</view>
					<view class="sort-item">
						<view class="sort-left">联系方式</view>
						<view class="sort-text">{{list.phone}}</view>
					</view>
					<view class="sort-item" v-if="list.type == 1">
						<view class="sort-left">地址</view>
						<view class="sort-text">{{list.address}}</view>
					</view>
					<view class="sort-item" v-if="list.type == 1">
						<view class="sort-left">凭证</view>
						<view class="sort-img">
							<image v-for="(v,k) in list.images" :key="k" :src="v"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="sort">
				<view class="service">
					<view class="sort-title">订单信息</view>
					<view class="call" @tap="goAsk">
						<image src="../../static/images/service.png"></image>
						<view>联系客服</view>
					</view>
				</view>
				<view class="sort-list">
					<view class="sort-item">
						<view class="sort-left">订单号</view>
						<view class="sort-text">{{list.ordernum}}</view>
					</view>
					<view class="sort-item">
						<view class="sort-left">创建时间</view>
						<view class="sort-text">{{list.adtime}}</view>
					</view>
					<view class="sort-item" v-if="list.begintime">
						<view class="sort-left">开始处理</view>
						<view class="sort-text">{{list.begintime}}</view>
					</view>
					<view class="sort-item" v-if="list.endtime">
						<view class="sort-left">处理完成</view>
						<view class="sort-text">{{list.endtime}}</view>
					</view>
				</view>
			</view>
			<view class="sort" v-if="moneyList.length > 0">
				<view class="sort-title">
					<view>付款记录</view>
					<view class="fee">总费用：{{allmoney}}元</view>
				</view>
				<view class="sort-list">
					<view class="sort-price" v-for="(v,k) in moneyList" :key="k">
						<view style="color: #FF411C;margin-right: 36rpx;width: 120rpx;text-align: center;">{{v.money}}</view>
						<view style="padding: 8rpx 20rpx;border-radius: 4px;background: #EAF5FF;color: #249AFD;" v-if="v.state == 0">未付款</view>
						<view style="padding: 8rpx 20rpx;border-radius: 4px;background: #E6FFE6;color: #00C800;margin-right: 36rpx;" v-if="v.state == 1">已付款</view>
						<view style="margin-right: 36rpx;" v-if="v.state == 1">{{v.paytime}}</view>
						<view style="padding: 8rpx 20rpx;border-radius: 4px;background: #FF5862;color: #FFFFFF;" v-if="v.state == 1" @tap="goPreview(v.image)">查看凭证</view>
					</view>
				</view>
			</view>
			<view class="sort" v-if="imageList.length > 0">
				<view class="sort-title">业务记录</view>
				<view class="sort-img">
					<view class="sort-column" v-for="(v,k) in imageList" :key="k" >
						<image :src="v.image" @tap="goPreview1"></image>
						<view class="sort-time">{{v.adtime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg" v-if="show">
			<view class="bg-list">
				<view class="bg-item">
					<view class="bg-title">建造师</view>
					<view class="bg-state" v-if="list.state <= 2">未开始</view>
					<view class="bg-state" v-if="list.state == 3">处理中</view>
					<view class="bg-state" v-if="list.state > 3">已完成</view>
				</view>
				<view class="bg-item">
					<view class="bg-title">工程师和技工</view>
					<view class="bg-state" v-if="list.state <= 3">未开始</view>
					<view class="bg-state" v-if="list.state == 4">处理中</view>
					<view class="bg-state" v-if="list.state > 4">已完成</view>
				</view>
				<view class="bg-item">
					<view class="bg-title">资质证书</view>
					<view class="bg-state" v-if="list.state <= 4">未开始</view>
					<view class="bg-state" v-if="list.state == 5">处理中</view>
					<view class="bg-state" v-if="list.state > 5">已完成</view>
				</view>
				<view class="bg-btn" @tap="goSure">确定</view>
			</view>
		</view>
		<view class="bg" v-if="show1">
			<view class="bg-list">
				<view class="bg-item">
					<view class="bg-title">三类人员和特种工</view>
					<view class="bg-state" v-if="list.state <= 5">未开始</view>
					<view class="bg-state" v-if="list.state == 6">处理中</view>
					<view class="bg-state" v-if="list.state > 6">已完成</view>
				</view>
				<view class="bg-item">
					<view class="bg-title">安全许可证</view>
					<view class="bg-state" v-if="list.state <= 6">未开始</view>
					<view class="bg-state" v-if="list.state == 7">处理中</view>
					<view class="bg-state" v-if="list.state > 7">已完成</view>
				</view>
				<view class="bg-btn" @tap="goSure1">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	import EvanSteps from '../../components/evan-steps/evan-steps.vue'
	import EvanStep from '../../components/evan-steps/evan-step.vue'
	import UniIcons from '../../components/uni-icons/uni-icons.vue'
	import EvanIcons from '../../components/evan-icons/evan-icons.vue'
	export default {
		data() {
			return {
				Color: '#333',
				show: false,
				show1: false,
				list: {},
				moneyList: [],
				imageList: [],
				allmoney: 0
			}
		},
		components: {
			EvanSteps,
			EvanStep,
			UniIcons,
			EvanIcons
		},
		onLoad(option) {
			this.init(option.order)
		},
		methods: {
			init(order) {
				let self = this
				let data1 = {
					ordernum: order
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'myorderdetail',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.allmoney = res.data.allmoney
								self.list = res.data.dataobject
								self.moneyList = res.data.moneyList
								self.imageList = res.data.imageList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goOpen() {
				this.show = true
			},
			goOpen1() {
				this.show1 = true
			},
			goSure() {
				this.show = false
			},
			goSure1() {
				this.show1 = false
			},
			goPreview(url) {
				let arr = []
				arr.push(url)
				uni.previewImage({
					urls: arr
				})
			},
			goPreview1() {
				let arr = []
				for(let i=0;i<this.imageList.length;i++) {
					arr.push(this.imageList[i].image)
				}
				uni.previewImage({
					urls: arr
				})
			},
			goAsk() {
				uni.navigateTo({
				    url: '/pages/ask/ask'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #F6F6F6;
		display: flex;
		flex-direction: column;
		align-items: center;

		.fixed {
			width: 100%;
		}

		.bg {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9999;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .4);
			display: flex;
			justify-content: center;
			align-items: center;

			.bg-list {
				width: 80%;
				padding: 50rpx 40rpx;
				background: #FFFFFF;
				border-radius: 6px;
				border: 4px solid #eee;
				position: relative;

				.bg-item {
					width: 100%;
					display: flex;
					flex-direction: column;
					border-bottom: 1px solid #eee;
					margin-bottom: 30rpx;

					.bg-title {
						font-size: 30rpx;
						color: #333;
						font-weight: 600;
					}

					.bg-state {
						width: 70%;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 28rpx;
						color: #666;
						padding: 0 28rpx;
						box-sizing: border-box;
						background: #eee;
						margin: 30rpx 0;
					}
				}

				.bg-btn {
					position: absolute;
					width: 200rpx;
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 30px;
					background: #00C800;
					text-align: center;
					font-size: 30rpx;
					color: #FFFFFF;
					left: calc(50% - 100rpx);
					bottom: -35rpx;
				}
			}
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;

			.titles {
				width: 100%;
				background: #FFFFFF;
				border-radius: 4px;
				padding: 30rpx 0;
				text-align: center;
				font-size: 30rpx;
				color: #333;
				font-weight: 600;
				margin-bottom: 30rpx;
			}

			.sort {
				width: 100%;
				background: #FFFFFF;
				border-radius: 4px;
				padding: 28rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				margin: 0 0 30rpx;
				
				.sort-title {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 28rpx;
					color: #333;
					font-weight: 600;
					padding-left: 30rpx;
					box-sizing: border-box;
					position: relative;
					display: flex;
					align-items: center;
				
					.fee {
						margin-left: 120rpx;
						color: #FF411C;
					}
				}
				
				.sort-title:before {
					content: '';
					width: 4px;
					height: 24rpx;
					border-radius: 8px;
					background: #00C800;
					position: absolute;
					left: 0;
					top: 28rpx;
				}
				
				.service {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.sort-title {
						width: 80%;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: #333;
						font-weight: 600;
						padding-left: 30rpx;
						box-sizing: border-box;
						position: relative;
						display: flex;
						align-items: center;
					
						.fee {
							margin-left: 120rpx;
							color: #FF411C;
						}
					}
					
					.sort-title:before {
						content: '';
						width: 4px;
						height: 24rpx;
						border-radius: 8px;
						background: #00C800;
						position: absolute;
						left: 0;
						top: 28rpx;
					}
					
					.call {
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 26rpx;
						color: #00C800;
						margin-bottom: 12rpx;
						
						image {
							width: 42rpx;
							height: 42rpx;
							margin-bottom: 12rpx;
						}
					}
				}

				.sort-list {
					width: 100%;
					border-top: 1px solid #eee;
					padding-top: 30rpx;
					display: flex;
					flex-direction: column;

					.sort-item {
						width: 100%;
						height: 80rpx;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333;

						.sort-left {
							width: 40%;
							color: #666;
						}

						.sort-text {
							width: 60%;
						}

						.sort-img {
							width: 60%;
							display: flex;

							image {
								width: 80rpx;
								height: 80rpx;
								border-radius: 4px;
								margin-right: 24rpx;
							}
						}
					}

					.sort-price {
						width: 100%;
						display: flex;
						align-items: center;
						font-size: 26rpx;
						margin-bottom: 30rpx;
					}
				}

				.sort-img {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					
					.sort-column {
						display: flex;
						flex-direction: column;
						margin-right: 30rpx;
						margin-bottom: 30rpx;
						
						.sort-time {
							font-size: 26rpx;
							color: #999;
						}
						
						image {
							width: 120rpx;
							height: 120rpx;
							border-radius: 4px;
							margin-bottom: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
