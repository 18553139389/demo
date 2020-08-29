<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">我的问题反映</view>
			<view class="item" v-for="(v,k) in list" :key="k">
				<view class="user">
					<view>咨询人：{{v.cusName}}</view>
					<view>{{v.adtime}}</view>
				</view>
				<view class="address">
					<view>焦作市：</view>
					<view class="detail">{{v.address}}</view>
				</view>
				<view class="address">
					<view>当前状态：</view>
					<view class="detail" v-if="v.state == 1">待政研室处理</view>
					<view class="detail" v-if="v.state == 2">政研室驳回用户</view>
					<view class="detail" v-if="v.state == 3">待业务部处理</view>
					<view class="detail" v-if="v.state == 4">政研室同意业务部处理</view>
					<view class="detail" v-if="v.state == 5">待政研室业务审核</view>
				</view>
				<view class="bg">
					<view class="content">{{v.Message}}</view>
					<view class="imgs" v-if="v.file.length > 0">
						<image :src="item" v-for="(item,index) in v.file" :key="index"></image>
					</view>
					<view class="video" v-if="v.video.length > 0">
						<video class="videos" v-for="(item,index) in v.video" :key="index" :src="item" controls></video>
					</view>
				</view>
				<view class="bg" v-if="v.state == 4">
					<view class="titles">处理意见：{{v.content}}</view>
				</view>
			</view>
			<paging :total="total" :pageSize='2' :radius="6" v-model="curren" :arrow="false" background="#ffffff" color="#000000"
			 activecolor="#ffffff" activebackground="#172454" @changes="dd"></paging>
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
				total: 0,
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
				this.page = e
				this.init()
			},
			init() {
				let self = this
				//获取顶部导航列表
				let data1 = {
					customerId: uni.getStorageSync('uid'),
					type: 2,
					nowPage: this.page,
					pageCount: 2
				}
				let data = {
					url: 'lawyerOnlyawns',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							self.total = res.data.body.totalPage * 2
							if (res.data.body.maps) {
								self.list = res.data.body.maps
							}
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
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
			padding-bottom: 15rpx;
			box-sizing: border-box;

			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
			}

			.item {
				width: 100%;
				padding: 28px;
				box-sizing: border-box;
				background: #f6f6f6;
				margin-top: 30px;
				border-radius: 6px;

				.user {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #333;

					.nick {
						width: 20%;
					}
				}

				.address {
					width: 100%;
					font-size: 14px;
					color: #333;
					display: flex;
					margin-top: 10rpx;

					.nick {
						width: 17%;
					}

					.detail {
						width: 80%;
					}
				}

				.bg {
					width: 100%;
					margin-top: 10rpx;

					.titles {
						width: 100%;
						font-size: 14px;
						color: #333;
						// margin-bottom: 10rpx;
					}

					.content {
						width: 100%;
						font-size: 14px;
						color: #333;
						line-height: 20px;
					}

					.imgs {
						width: 100%;
						display: flex;
						margin-top: 10rpx;

						image {
							width: 30rpx;
							height: 30rpx;
							border-radius: 4px;
							margin-right: 10rpx;
						}
					}

					.video {
						width: 100%;
						display: flex;
						flex-direction: column;
						margin-top: 10rpx;

						.videos {
							width: 40%;
							height: 100rpx;
						}
					}
				}
			}
		}
	}
</style>
