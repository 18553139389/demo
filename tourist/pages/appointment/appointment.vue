<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">填写订单</block>
			</cu-custom>
		</view>
		<!-- <van-stepper v-model="value" integer :min="1" disable-input /> -->
		<view class="formData">
			<view class="list">
				<view>贵宾厅</view>
				<view class="right">长沙黄花国际机场T2贵宾厅</view>
			</view>
			<view class="list">
				<view>到厅时间</view>
				<view class="right" style="color: #999;" @tap="choiceTime">{{time}}</view>
			</view>
			<view class="list">
				<view>到厅人数</view>
				<view class="right">
					<van-stepper v-model="value" integer :min="1" disable-input input-width="26px" />
				</view>
			</view>
			<view class="list">
				<view>联系人</view>
				<view class="right">
					<input type="text" placeholder="请输入联系人姓名">
				</view>
			</view>
			<view class="list">
				<view>手机号</view>
				<view class="right">
					<input type="number" placeholder="请输入手机号">
				</view>
			</view>
		</view>
		<view class="notice">
			<view class="title" style="margin-bottom: 30upx;">服务须知</view>
			<view class="mark">1.本订单使用日期当天有效</view>
			<view class="mark">2.到厅报手机号即可验证</view>
			<view class="mark">3.入到厅日期有变，您可取消订单，再次预定，支付款项原路返回</view>
		</view>
		<view class="pay">
			<view class="money">实付款： <text>￥1978</text></view>
			<view class="btn" @tap="pay">立即支付</view>
		</view>
		<!-- <view class="sort">
			<view class="payBtn" @tap="goOrder">立即预约</view>
		</view> -->
		<van-popup v-model="show" position="bottom" :overlay="false">
			<van-datetime-picker v-model="currentTime" type="datetime" :min-date="minDate" @cancel="cancel" @confirm="confirm" />
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333333',
				value: 1,
				backColor: '#FFFFFF',
				currentTime: new Date(),
				minDate: new Date(),
				show: false,
				time: "请选择到厅时间"
			}
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
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
			confirm(val) {
				this.time = this.dateFtt("yyyy-MM-dd hh:mm", val)
				this.show = false
			},
			cancel() {
				this.show = false
			},
			choiceTime() {
				this.show = true
			},
			dateFtt(fmt, date) { //author: meizz   
				var o = {
					"M+": date.getMonth() + 1, //月份   
					"d+": date.getDate(), //日   
					"h+": date.getHours(), //小时   
					"m+": date.getMinutes(), //分   
					"s+": date.getSeconds(), //秒   
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
					"S": date.getMilliseconds() //毫秒   
				}
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
				return fmt
			},
			pay() {
				uni.navigateTo({
					url: '../pay/pay'
				})
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.formData {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
	}

	.right {
		width: 70%;
		text-align: left;
	}

	.notice {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #999;
	}

	.mark {
		width: 100%;
		margin-bottom: 12upx;
	}

	.pay {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		border-top: 2px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.money {
		height: 100upx;
		line-height: 100upx;
	}

	.money>text {
		margin-left: 30upx;
		color: red;
	}

	.payBtn {
		height: 60upx;
		line-height: 60upx;
		font-size: 14px;
		color: #fff;
		padding: 0 40upx;
		background: #007AFF;
		border-radius: 4px;
	}

	.btn {
		height: 100upx;
		line-height: 100upx;
		font-size: 14px;
		color: #fff;
		padding: 0 40upx;
		background: #007AFF;
	}

	.sort {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		border-top: 2px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
