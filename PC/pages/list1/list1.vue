<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">政策法规</view>
			<view class="list">
				<view class="item" v-for="(v,k) in list" :key="k" @tap="goDetail(v.id,0)">
					<image :src="v.pic"></image>
					<view class="message">
						<view class="m_title">{{v.title}}</view>
						<!-- <view class="m_content">{{v.addtime}}</view> -->
						<view class="other">
							<view class="m_time">{{v.addtime}}</view>
							<view class="look">
								<view class="see">
									<image src="../../static/images/look.png"></image>
									<view>{{v.viewnumber}}</view>
								</view>
								<view class="see" style="margin-left: 40rpx;">
									<image src="../../static/images/zan.png" style="width: 7rpx;height: 7rpx;"></image>
									<view>{{v.lieknumber}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<paging :total="total" :pageSize='5' :radius="6" v-model="curren" :arrow="false" background="#ffffff" color="#000000" activecolor="#ffffff" activebackground="#172454" @changes="dd"></paging>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uniIcons from "../../components/uni-icons/uni-icons.vue"
	import paging from '../../components/yang-paging/yang-paging.vue'
	export default {
		data() {
			return {
				total: 10,
				curren: 1,
				page: 1,
				list: []
			}
		},
		components: {
			paging,
			uniIcons
		},
		onLoad() {
			this.init()
		},
		methods: {
			dd(e) {
				console.log(e)
				this.page = e
				this.init()
			},
			init() {
				let self = this
				//获取顶部导航列表
				let data1 = {
					type: 2,
					uid: uni.getStorageSync('uid'),
					nowPage: this.page,
					pageCount: 4
				}
				let data = {
					url: 'lawyerMessage',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							self.total = res.data.body.totalPage * 4
							console.log(self.total)
							if (res.data.body.maps) {
								self.list = res.data.body.maps
							}
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			},
			goDetail(id, type) {
				if(!uni.getStorageSync('uid')) {
					uni.reLaunch({
					    url: '/pages/login/login'
					})
				}
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&type=' + type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;

		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 15rpx;
			box-sizing: border-box;

			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 15rpx;

				.item {
					width: 100%;
					display: flex;
					padding: 8rpx 0;
					border-bottom: 1px solid #eee;

					image {
						width: 40rpx;
						height: 40rpx;
						border-radius: 4px;
					}

					.message {
						width: calc(100% - 40rpx);
						height: 40rpx;
						padding-left: 8rpx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.m_title {
							width: 100%;
							font-size: 15px;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.m_content {
							width: 100%;
							font-size: 14px;
							color: #666;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.other {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.m_time {
								font-size: 14px;
								color: #666;
							}

							.look {
								display: flex;
								align-items: center;

								.see {
									display: flex;
									align-items: center;
									font-size: 14px;
									color: #666;

									image {
										width: 10rpx;
										height: 10rpx;
										margin-right: 4rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
