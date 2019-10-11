<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">订单详情</block>
				<block slot="right">
					<view class="call" @tap="goService">
						<img src="../../static/img/service.png" alt="">
						<view>客服</view>
					</view>
				</block>
			</cu-custom>
		</view>
		<view class="orderMsg" style="margin-top: 30upx;">
			<view class="orderHead">
				<view class="title-left">订单信息</view>
				<view class="title-right" v-if="dataList.state == 0">待支付</view>
				<view class="title-right" v-if="dataList.state == 1">已支付</view>
				<view class="title-right" v-if="dataList.state == 3" style="color: #A5A5A5;">已过期</view>
				<view class="title-right" v-if="dataList.state == 2" style="color: #A5A5A5;">已完成</view>
			</view>
			<view class="orderList">
				<view class="list">
					<text>订单编号：</text>
					<view class="content">{{dataList.orderId}}</view>
				</view>
				<view class="list">
					<text>付款时间：</text>
					<view class="content">{{dataList.createDate}}</view>
				</view>
				<view class="list">
					<text>要客服务：</text>
					<view class="content">{{dataList.title}}</view>
				</view>
				<view class="list">
					<text>服务位置：</text>
					<view class="content">{{dataList.address}}</view>
				</view>
				<view class="list">
					<text>到厅时间：</text>
					<view class="content">{{dataList.reserveDate}}</view>
				</view>
				<view class="list">
					<text>服务人次：</text>
					<view class="content">{{dataList.numbers}}人</view>
				</view>
				<view class="list">
					<text>应付总额：</text>
					<view class="content">¥ {{dataList.amount}}</view>
				</view>
			</view>
		</view>
		<view class="orderMsg">
			<view class="title">联系人信息</view>
			<view class="orderList">
				<view class="list">
					<text>联系人：</text>
					<view class="content">{{dataList.username}}</view>
				</view>
				<view class="list">
					<text>手机号：</text>
					<view class="content">{{dataList.phone}}</view>
				</view>
			</view>
		</view>
		<view class="orderMsg">
			<view class="title">服务项目</view>
			<view class="classify_list">
				<view class="list_type" v-for="(v,k) in dataList.itemList" :key="k">
					<image mode="scaleToFill" :src="v.itemIcon"></image>
					<text style="color: red;">{{v.itemName}}</text>
				</view>
			</view>
		</view>
		<view class="orderMsg">
			<view class="title">服务须知</view>
			<view class="notice">
				<view>{{dataList.introduction}}</view>
			</view>
		</view>
		<view class="bind_card" v-if="dataList.state == 1 || dataList.state == 3">
			<view class="card_btn" @tap="open">取消预订</view>
		</view>
		<model :show="show" title="退单须知" :content="'距离预约时间'+refundList.hours+'小时以上退单需要扣除'+parseInt(refundList.front)+'%违约金，距离预约时间'+parseInt(refundList.hours)+'小时内需要扣除'+parseInt(refundList.behind)+'%违约金。 订单超时需要扣除'+parseInt(refundList.expire)+'%违约金。'"
		 :align="left" @cancel="cancel" @confirm="confirm">
		</model>
	</view>
</template>

<script>
	import model from '../../components/model/model.vue'
	import {
		ajax
	} from '../../common/js/util.js'
	import {
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				show: false,
				left: 'justify',
				dataList: {},
				id: '',
				serviceList: [],
				refundList: {}
			}
		},
		components: {
			model,
			Toast
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.id = option.id
			this.init()
		},
		methods: {
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			init() {
				let self = this
				let datas = {
					uid: self.$store.state.uid,
					orderId: self.id
				}
				let data = {
					url: '/api/gzh/importantOrderDetail',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.dataList = res.data
							self.dataList.introduction = self.unescape(self.dataList.introduction)
							self.serviceList = res.data.assistantList
							self.refundList = res.data.refund
						}
					}
				}
				ajax(data)
			},
			unescape(html) {
				return html
					.replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
					.replace(/&lt;/g, "<")
					.replace(/&gt;/g, ">")
					.replace(/&quot;/g, "\"")
					.replace(/&ldquo;/g, "“")
					.replace(/&rdquo;/g, "”")
					.replace(/&#39;/g, "\'");
			},
			cancel() {
				this.show = false
			},
			confirm() {
				this.show = false
				let self = this
				let datas = {
					uid: self.$store.state.uid,
					orderId: self.id
				}
				let data = {
					url: '/api/gzh/cancelImportantOrder',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							Toast('取消成功')
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 500)
						}
					}
				}
				ajax(data)
			},
			open() {
				this.show = true
			},
			goService() {
				let self = this
				uni.makePhoneCall({
					phoneNumber: self.$store.state.customer
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.call {
		margin-right: 30upx;
		color: #DE2910;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
	}

	.call>img {
		width: 30upx;
		height: 30upx;
	}

	.orderMsg {
		width: 92%;
		padding: 30upx 0 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 4px;
		margin: 30upx auto 0;
	}

	.orderHead {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title-left {
		padding-left: 20upx;
		box-sizing: border-box;
		border-left: 4px solid red;
		font-size: 14px;
		color: #333;
	}

	.title-right {
		font-size: 14px;
		color: #DE2910;
		padding-right: 20upx;
	}

	.title {
		width: 100%;
		padding-left: 20upx;
		box-sizing: border-box;
		border-left: 4px solid red;
		font-size: 14px;
		color: #333;
	}

	.orderList {
		width: 100%;
		padding: 28upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 24upx;
		font-size: 14px;
		color: #333;
	}

	.content {
		width: 70%;
		text-align: justify;
	}

	.notice {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 28upx;
	}

	.notice>view {
		margin-bottom: 10upx;
		font-size: 12px;
		color: #999;
		text-align: justify;
	}

	.bind_card {
		width: 92%;
		margin: 60upx auto 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #EEEEEE;
		border-radius: 4px;
		color: #A5A5A5;
		font-size: 15px;
		margin-bottom: 60upx;
	}

	.card_btn {
		width: 100%;
		border-radius: 4px;
		border: 1px solid #eee;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}
	
	.classify_list {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		flex-wrap: wrap;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		/* border-top: 1px solid #eee; */
	}
	
	.list_type {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30upx;
	}
	
	.list_type text {
		font-size: 12px;
		color: #333;
	}
	
	.list_type>image {
		width: 66upx;
		height: 66upx;
		margin-bottom: 12upx;
		border-radius: 50%;
	}
</style>
