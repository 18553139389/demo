<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white"
			 @Back="BackPage">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="message">
			<view class="user_msg">订单信息</view>
			<view class="cu-form-group">
				<view class="title">服务时间</view>
				<input placeholder="服务时间" name="input" disabled v-model="time"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">有效期</view>
				<input placeholder="有效期" name="input" disabled v-model="useTime"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">通道位置</view>
				<input placeholder="通道位置" name="input" disabled v-model="address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">服务价格</view>
				<input placeholder="服务价格" name="input" disabled v-model="prices"></input>
			</view>
		</view>
		<view class="message">
			<view class="user_msg">联系人信息</view>
			<view class="cu-form-group">
				<view class="title">联系人</view>
				<input placeholder="请输入姓名" name="input" v-model="user"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号码" name="input" v-model="tel"></input>
			</view>
			<view class="cu-form-group" @tap="choiceTime">
				<view class="title">使用时间</view>
				<input placeholder="请选择时间" name="input" disabled v-model="nowUse"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">使用人数</view>
				<input placeholder="请填写人数" type="number" name="input" v-model="person"></input>
			</view>
		</view>
		<view class="message" style="margin-bottom: 120upx;">
			<view class="user_msg">服务须知</view>
			<view class="content">{{content}}</view>
		</view>
		<view class="pay">
			<view class="money">实付款： <text>￥{{total}}</text></view>
			<view class="payBtn" @tap="paySuc">立即支付</view>
		</view>
		<van-popup v-model="show" position="bottom">
			<van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" @confirm="confirm" @cancel="cancel" />
		</van-popup>
	</view>
</template>

<script>
	import {
		ajaxs
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
				minHour: 10,
				maxHour: 20,
				minDate: new Date(),
				maxDate: new Date(),
				currentDate: new Date(),
				show: false,
				title: '',
				time: '',
				address: '',
				useTime: '',
				price: 15,
				prices: '',
				user: '',
				tel: '',
				nowUse: '',
				person: 1,
				vipType: null,
				ids: '',
				content: '',
				list: {}
			}
		},
		computed: {
			total() {
				let that = this
				let total = 0
				if(this.person == ''){
					total = 0
					return total
				}else{
					let total = this.price * parseFloat(this.person)
					return total
				}
			}
		},
		onLoad(option) {
			this.ids = option.id
			this.init()
			console.log(this.$store.state.vipType)
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
			init() {
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					fastWayId: this.ids
				}
				let data = {
					url: '/api/gzh/fastWayDetail',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.list = res.data
							self.time = res.data.serviceTime
							self.useTime = res.data.validity
							self.address = res.data.address
							self.vipType = res.data.isVip
							if(self.vipType == 0){
								self.price = res.data.price
								self.prices = '￥'+res.data.price+'/人'
							}else{
								self.price = res.data.vipPrice
								self.prices = '￥'+res.data.vipPrice+'/人（非会员价'+res.data.price+'）'
							}
							self.content = res.data.introduction
							console.log(self.content)
						}
					}
				}
				ajaxs(data)
			},
			choiceTime() {
				this.show = true
			},
			dateFormat(fmt, date) {
				let ret
				let opt = {
					"Y+": date.getFullYear().toString(), // 年
					"m+": (date.getMonth() + 1).toString(), // 月
					"d+": date.getDate().toString(), // 日
					"H+": date.getHours().toString(), // 时
					"M+": date.getMinutes().toString(), // 分
					"S+": date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				}
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt
			},
			confirm(e) {
				this.show = false
				let date = new Date(e)
				this.nowUse = this.dateFormat("YYYY-mm-dd HH:MM", date)
			},
			cancel() {
				this.show = false
			},
			paySuc() {
				let self = this
				
				if (this.user == '') {
					Toast('姓名不能为空')
					return
				}
				
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}
				
				if (this.nowUse == '') {
					Toast('请选择使用时间')
					return
				}
				
				if (this.person == '') {
					Toast('请填写人数')
					return
				}
				
				let list = this.list
				list.user = this.user
				list.tel = this.tel
				list.nowUse = this.nowUse
				list.person = this.person
				list.total = this.total
				let lists = JSON.stringify(list)
				uni.navigateTo({
					url: '../stagePay/stagePay?list='+lists+'&id='+this.ids
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		/* height: 100%; */
		background: #FFFFFF;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.message {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		/* border-bottom: 2px solid #eee; */
		background: #fff;
		margin: 0 auto;
		border-radius: 4px;
		border-top: 1px solid #eee;
	}

	.user_msg {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: 15px;
		color: #333;
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
	}

	.cu-form-group {
		padding: 0 !important;
		min-height: 90upx !important;
		padding-left: 24upx !important;
		box-sizing: border-box;
		border: none !important;
	}

	.cu-form-group>input {
		background: #F8F8F8;
		padding: 0 20upx;
		height: 60upx;
	}

	.title {
		width: 200upx;
	}
	
	input {
		font-size: 12px;
	}
	
	.content {
		width: 100%;
		padding: 20upx 24upx;
		font-size: 12px;
		color: #666;
	}
	
	.pay {
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
</style>
