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
				<view>要客服务</view>
				<view class="right">{{name}}</view>
			</view>
			<view class="list">
				<view>到厅时间</view>
				<view class="right" style="color: #999;" @tap="choiceTime">{{time}}</view>
			</view>
			<view class="list">
				<view>到厅人数</view>
				<view class="right" style="background: none;padding-left: 0;">
					<van-stepper v-model="value" integer :min="1" disable-input input-width="32px" @change="onChange" />
				</view>
			</view>
			<view class="list">
				<view>联系人</view>
				<view class="right">
					<input type="text" placeholder="请输入联系人姓名" v-model="user">
				</view>
			</view>
			<view class="list">
				<view>手机号</view>
				<view class="right">
					<input type="number" placeholder="请输入手机号" v-model="tel">
				</view>
			</view>
		</view>
		<view class="service">
			<view class="title">选择服务内容</view>
			<!-- <view class="service_content">{{texts}}</view> -->
		</view>
		<view class="classify_list">
			<view class="list_type" v-for="(v,k) in list" :key="k">
				<image mode="scaleToFill" :src="v.icon"></image>
				<text style="color: red;">{{v.title}}</text>
			</view>
		</view>
		<view class="notice">
			<view class="title" style="margin-bottom: 30upx;">服务须知</view>
			<view class="mark">{{notice}}</view>
		</view>
		<view class="pay" v-if="price != 0">
			<view class="money">实付款： <text>￥{{total}}</text></view>
			<view class="payBtn" @tap="paySuc">立即支付</view>
		</view>
		<view class="sort" @tap="goOrder" v-if="price == 0">立即预约</view>
		<van-popup v-model="show" position="bottom" :overlay="false">
			<van-datetime-picker v-model="currentTime" type="datetime" :min-date="minDate" @cancel="cancel" @confirm="confirm" />
		</van-popup>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: 1,
				backColor: '#FFFFFF',
				currentTime: new Date(),
				minDate: new Date(),
				show: false,
				time: "请选择到厅时间",
				name: "",
				user: "",
				tel: "",
				id: "",
				address: "",
				serIds: [],
				isVip: 0,
				notice: '',
				price: 0,
				list: [],
				listData: {}
			}
		},
		computed: {
			total() {
				let total = 0
				total = this.price * this.value
				return total
			}
		},
		components: {
			Toast
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			console.log(JSON.parse(option.list))
			this.listData = JSON.parse(option.list)
			this.name = this.listData.name
			this.id = this.listData.id
			this.isVip = this.listData.isVip
			this.notice = this.listData.notice
			this.price = this.listData.price 
			this.address = this.listData.address
			this.list = this.listData.arr
			for(let i=0;i<this.list.length;i++){
				this.serIds.push(this.list[i].serId)
			}
			this.serIds = this.serIds.join(',')
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
			onChange(val) {
				console.log(val)
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
			paySuc() {
				if(this.time == '请选择到厅时间'){
					Toast('请选择时间')
					return
				}
				
				if(this.user == ''){
					Toast('请输入联系人')
					return
				}
				
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}
				
				let obj = {}
				obj.id = this.id
				obj.name = this.name
				obj.address = this.address
				obj.time = this.time
				obj.num = this.value
				obj.price = this.total
				obj.user = this.user
				obj.tel = this.tel
				obj.serIds = this.serIds
				obj.list = this.list
				obj = JSON.stringify(obj)
				uni.navigateTo({
					url: '../veryPay/veryPay?list=' + obj
				})
			},
			goOrder() {
				if(this.time == '请选择到厅时间'){
					Toast('请选择时间')
					return
				}
				
				if(this.user == ''){
					Toast('请输入联系人')
					return
				}
				
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}
				
				let self = this
				uni.showLoading({
					title: '加载中'
				})
				let datas = {
					uid: this.$store.state.uid,
					importantId: self.listData.id,
					numbers: self.value,
					reserveDate: self.time,
					username: self.user,
					phone: self.tel,
					serIds: self.serIds
				}
				let data = {
					url: '/api/gzh/addImportantOrder',
					data: datas,
					success: function(res){
						if(res.data.result == 0){
							if(!res.data.body){
								Toast("您已成功预约要客服务")
								setTimeout(function(){
									uni.navigateTo({
										url: '../veryOrder/veryOrder'
									})
								},500)
							}
						}else{
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(data)
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

	.formData {
		width: 92%;
		margin: 30upx auto;
		background: #fff;
		border-radius: 4px;
		padding: 0 20upx;
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
		/* border-bottom: 1px solid #eee; */
	}

	.right {
		width: 70%;
		text-align: left;
	}

	.notice {
		width: 100%;
		padding: 0 30upx 120upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #999;
	}

	.mark {
		width: 100%;
		margin-bottom: 12upx;
		text-align: justify;
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

	.sort {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		/* border-top: 2px solid #eee; */
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.right,.right>input {
		background: #F8F8F8;
		padding: 0 20upx;
		height: 60upx;
		line-height: 60upx;
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
		height: 100upx;
		line-height: 100upx;
		font-size: 14px;
		color: #fff;
		padding: 0 40upx;
		background: #DE2910;
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
		background: #DE2910;
		color: #fff;
		font-size: 15px;
	}
	
	.van-stepper__minus, .van-stepper__plus {
		background-color: #fff !important;
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
	
	.service {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		/* border-bottom: 1px solid #eee; */
	}
	
	.service_title {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #333;
	}
	
	.service_content {
		width: 100%;
		font-size: 12px;
		color: #999;
		margin-top: 20upx;
		text-align: justify;
		padding-left: 30upx;
	}
	
	.title {
		width: 100%;
		padding-left: 20upx;
		box-sizing: border-box;
		border-left: 4px solid red;
		font-size: 14px;
		color: #333;
	}
</style>
