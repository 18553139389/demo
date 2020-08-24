<template>
	<view class="contain">
		<view class="top">
			<view class="title">
				<text class="cuIcon-back back" @tap="back"></text>
				<view>{{city1}}</view>
				<img src="../../static/img/single.png" alt="">
				<view>{{city2}}</view>
			</view>
		</view>
		<view class="detail">
			<view class="detailList">
				<view class="detailTop">
					<view class="single">单程</view>
					<view class="order">
						<view>{{date}}</view>
						<view>{{list.DepartTime}}</view>
						<view>{{listData.CabinName}}</view>
					</view>
				</view>
				<view class="location">{{list.DepartAirportName.indexOf('国') > -1 ? list.DepartAirportName.substr(0,list.DepartAirportName.indexOf('国')) : list.DepartAirportName}}{{list.DepartAirportTerminal}} - {{list.ArriveAirportName.indexOf('国') > -1 ? list.ArriveAirportName.substr(0,list.ArriveAirportName.indexOf('国')) : list.ArriveAirportName}}{{list.ArriveAirportTerminal}}</view>
				<view class="wait">预计支付成功后一小时二十分钟后出票</view>
			</view>
		</view>
		<view class="list">
			<scroll-view class="airs" scroll-y scroll-with-animation style="height: 100%;">
				<view class="data1">
					<view class="data1-left">
						<view style="color: #E02B11;font-size: 18px;">￥{{price1}}</view>
						<view v-if="!checked" style="margin-left: 12upx;">成人票</view>
						<view v-if="checked" style="margin-left: 12upx;">儿童票</view>
						<view style="margin-left: 12upx;">燃油 ￥{{Oil}}</view>
					</view>
					<view class="data1-right">
						<view>提供等额行程单</view>
						<view style="margin-top: 8upx;">机建 ￥{{Tax}}</view>
						<view style="margin-top: 8upx;">托运行李共20公斤</view>
					</view>
				</view>
				<view class="data2" style="margin-bottom: 20upx;">
					<view>乘机人</view>
					<view class="name">
						<input style="width: 65%;" type="text" v-model="name" placeholder="请选择乘机人" placeholder-class="input-placeholder" disabled>
						<view class="choice" @tap="airuser('0')">选择乘机人</view>
					</view>
				</view>
				<view class="dataForm" style="margin-bottom: 20upx;">
					<view class="data2">
						<view>联系人</view>
						<view class="name">
							<input type="text" v-model="user" placeholder="请输入联系人姓名" placeholder-class="input-placeholder">
						</view>
					</view>
					<view class="data2">
						<view>手机号</view>
						<view class="name">
							<input type="text" v-model="phone" placeholder="用于接收出票短信" placeholder-class="input-placeholder">
						</view>
					</view>
					<view class="data2" v-if="checked">
						<view>票号</view>
						<view class="name">
							<input type="text" v-model="call" placeholder="请输入成人票票号" placeholder-class="input-placeholder">
						</view>
					</view>
				</view>
				<view class="data2" style="margin-bottom: 20upx;">
					<view class="protect" v-if="!checked">
						<view class="protect-content">是否携带婴儿</view>
						<view class="select">
							<view style="margin-right: 30upx;">婴儿票￥{{listData.BabyFare}}</view>
							<van-checkbox v-model="checked1" checked-color="#E02B11" @change="choiceBaby"></van-checkbox>
						</view>
					</view>
				</view>
				<view class="data2" style="margin-bottom: 20upx;" v-if="babyShow">
					<view>乘机人</view>
					<view class="name">
						<input style="width: 65%;" type="text" v-model="name1" placeholder="请选择乘机人" placeholder-class="input-placeholder" disabled>
						<view class="choice" @tap="airuser('1')">选择乘机人</view>
					</view>
				</view>
				<view class="data2" style="margin-bottom: 20upx;">
					<view class="protect">
						<view class="protect-content" @tap.stop="showSafe">
							<view>{{safe1}}</view>
							<view style="font-size: 12px;color: #999;margin-top: 8upx;">{{safe2}}</view>
						</view>
						<view class="select">
							<view style="margin-right: 30upx;">￥{{safePrice}}/份</view>
							<van-checkbox v-model="checked2" checked-color="#E02B11"></van-checkbox>
						</view>
					</view>
				</view>
				<view class="data3">
					<view>备注</view>
					<view class="area">
						<textarea placeholder-style="color:#999;font-size:12px;" placeholder="备注信息" v-model="contents" />
					</view>
				</view>
				<view class="data4">
					<p>订单包含机票、附加选购产品、机建燃油费、税费。</p>
					<p>点击去付款表示已阅读并同意<text style="color:  #E02B11;">锂电池及危险品须知，航班信息免责声明，机票预订须知，运输总条件，机票增值产品供应商资质证明，保险经纪委托协议</text></p>
				</view>
			</scroll-view>
		</view>
		<view class="bottom-nav">
			<view class="nav-left">
				<view style="color: #E02B11;font-size: 16px;">￥{{total}}</view>
				<view style="margin-left: 10upx;">订单总价</view>
			</view>
			<view class="buy" @tap="airPay">去付款</view>
		</view>
		<van-popup v-model="show1" position="bottom">
			<view class="editor">
				<view class="btns">
					<view @tap="cancel">取消</view>
					<view style="color: #E02B11;" @tap="confirm">确认</view>
				</view>
				<view class="editorList" @tap="addUser">
					<img src="../../static/img/add.png" alt="">
					<view>手动新增</view>
				</view>
				<van-radio-group v-model="radio" @change="choiceUser">
					<view class="userList" v-for="(v,k) in userList" :key="k">
						<view class="userLeft">
							<img src="../../static/img/editor.png" alt="" @tap="modifyUser(v.id)">
							<view class="userMsg">
								<view>{{v.username}}</view>
								<view style="color: #999;" v-if="v.cardType == 0">身份证: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 1">护照: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 4">港澳通行证: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 5">台胞证: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 6">台湾通行证: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 7">回乡证: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 9">其他: {{v.cardNo}}</view>
							</view>
						</view>
						<van-radio :name="v.id" checked-color="#E02B11"></van-radio>
					</view>
				</van-radio-group>
			</view>
		</van-popup>
		<van-popup v-model="show2" position="bottom">
			<view class="safe" v-for="(v,k) in content" :key="k" @tap="hideSafe">{{v}}</view>
		</van-popup>
		<van-popup v-model="sub" :close-on-click-overlay="false" style="background: none !important;">
			<van-loading type="spinner" />
		</van-popup>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				city1: '',
				city2: '',
				date: '',
				name: '',
				name1: '',
				user: '',
				call: '',
				phone: '',
				checked1: false,
				checked2: false,
				show1: false,
				show2: false,
				show3: false,
				radio: '',
				list: {},
				listData: {},
				checked: false,
				price: 0,
				price1: 0,
				userList: [],
				safe1: '',
				safe2: '',
				safePrice: 0,
				childPrice: 0,
				content: '',
				Oil: 0,
				babyFare: 0,
				babyFare1: 0,
				contents: '',
				custorm: 1,
				cardsType: 0,
				cardsType1: 0,
				cardNo: '',
				cardNo1: '',
				tel: '',
				tel1: '',
				InsProductCodes: '',
				birthday: '',
				birthday1: '',
				BookData: '',
				Tax: 0,
				babyShow: false,
				userType: 0,
				sub: false
			}
		},
		components: {
			Toast
		},
		computed: {
			total() {
				let price = 0
				if(this.$store.state.checked){
					price = this.price1 + this.Oil + this.Tax + this.childPrice
				}else{
					price = this.price1 + this.Oil + this.Tax
					if(this.checked1){
						price += this.babyFare + this.babyFare1
					}
				}
				
				if(this.checked2){
					price += this.safePrice
				}
				
				return price
			},
			total1() {
				let price = 0
				if(this.$store.state.checked){
					price = this.price + this.Oil + this.Tax + this.childPrice
				}else{
					price = this.price + this.Oil + this.Tax
					if(this.checked1){
						price += this.babyFare + this.babyFare1
					}
				}
				
				if(this.checked2){
					price += this.safePrice
				}
				
				return price
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			let city1 = this.$store.state.city1
			let city2 = this.$store.state.city2
			this.city1 = city1
			this.city2 = city2
			this.date = option.date
			this.list = JSON.parse(option.list)
			this.listData = this.list.Cabins[option.index]
			this.checked = this.$store.state.checked
			//判断乘客类型 成人 儿童
			if(this.$store.state.checked){
				this.custorm = 2
			}
			// this.price = this.listData.Fare
			this.Oil = this.list.Oil
			this.Tax = this.list.Tax
			this.babyFare = this.listData.BabyFare
		},
		onShow() {
			this.name = ''
			this.name1 = ''
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
			hideSafe() {
				this.show2 = false
			},
			init() {
				//初始化刷新实时票价
				let self = this
				this.sub = true
				// let datas = {
				// 	FlightNo: this.list.FlightNo,
				// 	SCode: this.list.DepartAirportCode,
				// 	ECode: this.list.ArriveAirportCode,
				// 	Cabin: this.listData.CabinCode,
				// 	GoDate: this.list.ArriveDate,
				// 	STime: this.list.DepartTime,
				// 	IsCHD: this.$store.state.checked,
				// 	CurrFare: this.listData.Fare
				// }
				// let data = {
				// 	url: '/api/gzh/flightVerifyCabin',
				// 	data: datas,
				// 	success: function(res){
				// 		console.log(res)
				// 		if(res.data.result == 0){
				// 			self.price = res.data.Data.NewFare
				// 		}
				// 	}
				// }
				// ajax(data)
				//初始化乘机人列表数据
				let users = {
					uid: this.$store.state.uid
				}
				
				let user = {
					url: '/api/gzh/passengerList',
					data: users,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.userList = res.data.dataList
						}
					}
				}
				ajax(user)
				//初始化保险信息
				let StartDate = this.list.DepartDate + ' ' + this.list.DepartTime
				let dates = {
					StartDate: StartDate
				}
				
				let safe = {
					url: '/api/gzh/flightGetFlightBookPara',
					data: dates,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.babyFare1 = res.data.Data.Flight_BabySerFee
							self.childPrice = res.data.Data.Flight_ChildSerFee
							self.safe1 = res.data.Data.InsProducts[0].ProductShortName
							self.safe2 = res.data.Data.InsProducts[0].ShortDescription
							self.safePrice = res.data.Data.InsProducts[0].SalePrice
							self.content = res.data.Data.InsProducts[0].DetailDescription
							self.InsProductCodes = res.data.Data.InsProducts[0].ProductCode
							self.content = self.content.split('；')
						}
					}
				}
				ajax(safe)
				//获取政策信息
				let child = 0
				if(this.checked){
					child = 2
				}else{
					child = 1
				}
				let message = {
					FlightType: this.$store.state.singleState,
					PassengerType: 1,
					PolicyFlights: [{
						AirLineCode: this.list.AirCompanyCode,
						Cabin: this.listData.CabinCode,
						Fare: this.listData.Fare,
						Oil: this.list.Oil,
						Tax: this.list.Tax,
						SCode: this.list.DepartAirportCode,
						ECode: this.list.ArriveAirportCode,
						TakeOffDateTime: this.list.DepartDate + ' ' + this.list.DepartTime,
						ArriveDateTime: this.list.ArriveDate + ' ' + this.list.ArriveTime,
						ST: this.list.DepartAirportTerminal,
						ET: this.list.ArriveAirportTerminal,
						FlightNo: this.list.FlightNo
					}]
				}
				let message1 = {
					url: '/api/gzh/flightGetFlightPolicy',
					data: message,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.sub = false
							self.BookData = res.data.Data.Policys[0].BookData
							self.price = res.data.Data.Policys[0].SettlePrice
							self.price1 = res.data.Data.Policys[0].Fare
						}
					}
				}
				ajax(message1)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			airuser(type) {
				this.show1 = true
				if(type == 0){
					this.userType = 0
				}else{
					this.userType = 1
				}
			},
			choiceBaby(e) {
				console.log(e)
				if(e){
					this.babyShow = true
				}else{
					this.babyShow = false
				}
			},
			cancel() {
				this.show1 = false
			},
			confirm() {
				this.show1 = false
			},
			addUser() {
				uni.navigateTo({
					url: '../editorAir/editorAir?type=0'
				})
			},
			modifyUser(id) {
				uni.navigateTo({
					url: '../editorAir/editorAir?type=1&id=' + id
				})
			},
			choiceUser(e) {
				for(let i=0;i<this.userList.length;i++){
					if(e == this.userList[i].id){
						if(this.userType == 0){
							this.name = this.userList[i].username
							this.cardsType = this.userList[i].cardType
							this.cardNo = this.userList[i].cardNo
							this.tel = this.userList[i].phone
							this.birthday = this.userList[i].birthday
						}else{
							this.name1 = this.userList[i].username
							this.cardsType1 = this.userList[i].cardType
							this.cardNo1 = this.userList[i].cardNo
							this.tel1 = this.userList[i].phone
							this.birthday1 = this.userList[i].birthday
						}
					}
				}
			},
			showSafe() {
				this.show2 = true
			},
			airPay() {
				let self = this
				if (this.name == '') {
					Toast('请选择乘机人')
					return
				}
				
				if (this.user == '') {
					Toast('请填写联系人')
					return
				}
				
				if (this.phone == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					Toast('手机号格式不正确')
					return
				}
				
				if(this.checked1){
					if(this.name1 == ''){
						Toast('请选择乘客')
						return
					}
				}
				
				if(this.checked){
					if(this.call == ''){
						Toast('票号不能为空')
						return
					}
				}
				
				this.sub = true
				
				let OrderBase = {
					FlightType: this.$store.state.singleState,
					Amount: this.total1,
					ContactName: this.user,
					BabyFare: this.babyFare,
					ContactTel: '',
					ContactMobile: this.phone,
					OrderRemark: this.contents
				}
				
				let AirLines = [{
					FlightNo: this.list.FlightNo,
					Cabin: this.listData.CabinCode,
					SAirportCode: this.list.DepartAirportCode,
					EAirportCode: this.list.ArriveAirportCode,
					STerminal: this.list.DepartAirportTerminal,
					ETerminal: this.list.ArriveAirportTerminal,
					FromDateTime: this.list.DepartDate + ' ' + this.list.DepartTime,
					ArriveDateTime: this.list.ArriveDate + ' ' + this.list.ArriveTime,
					PlaneType: this.list.PlaneType,
					Fare: this.listData.Fare,
					Oil: this.list.Oil,
					Tax: this.list.Tax,
					Discount: this.listData.Discount
				}]
				
				let Passengers = []
				
				if(this.checked1){
					Passengers = [{
							PsgType: this.custorm,
							PsgName: this.name,
							CardType: this.cardsType,
							CardNo: this.cardNo,
							Mobile: this.tel,
							InsProductCodes: this.checked2 ? this.InsProductCodes : '',
							BirthDay: this.birthday,
							AdultPnr: this.call
						},{
							PsgType: 3,
							PsgName: this.name1,
							CardType: this.cardsType1,
							CardNo: this.cardNo1,
							Mobile: this.tel1,
							InsProductCodes: '',
							BirthDay: this.birthday1,
							AdultPnr: this.call
						}
					]
				}else{
					Passengers = [{
							PsgType: this.custorm,
							PsgName: this.name,
							CardType: this.cardsType,
							CardNo: this.cardNo,
							Mobile: this.tel,
							InsProductCodes: this.checked2 ? this.InsProductCodes : '',
							BirthDay: this.birthday,
							AdultPnr: this.call
						}
					]
				}
				
				let Policy = {
					BookData: this.BookData
				}
				 
				let datas = {
					url: '/api/gzh/flightCreateOrder',
					data: {
						uid: this.$store.state.uid,
						OrderBase: OrderBase,
						AirLines: AirLines,
						Passengers: Passengers,
						Policy: Policy,
						totalMoney: this.total
					},
					success: function(res) {
						if (res.data.result == 0) {
							let orderId = res.data.orderId
							let appId = res.data.body.appId
							let timeStamp = res.data.body.timeStamp
							let nonceStr = res.data.body.nonceStr
							let packages = res.data.body.prepay
							let signType = res.data.body.signType
							let paySign = res.data.body.paySign
							self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign, orderId)
						} else {
							Toast(res.data.resultNote)
							self.sub = false
						}
					}
				}
				console.log(datas.data)
				ajax(datas)
			},
			onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign) {
				let self = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						'appId': appId,
						'timeStamp': timeStamp,
						'nonceStr': nonceStr,
						'package': packages,
						'signType': signType,
						'paySign': paySign
					},
					function(res) {
						if (res.err_msg === 'get_brand_wcpay_request:ok') {
							self.sub = false
							// Toast('支付成功')
							setTimeout(function(){
								uni.navigateTo({
									url: '/pages/sucAir/sucAir'
								})
							},300)
						} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
							self.sub = false
							Toast('用户取消支付')
						} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
							self.sub = false
							Toast('网络异常，请重试')
						}
					}
				)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #F9F9F9;
		position: relative;
	}

	.contain {
		width: 100%;
		height: 100%;
	}
	
	/* .van-popup {
		background: none !important;
	} */

	.top {
		width: 100%;
		height: 180upx;
		background-image: -webkit-linear-gradient(top, #E02B11, #F75F33);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.title {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #fff;
		position: relative;
	}

	.title>img {
		width: 40upx;
		margin: 0 20upx;
	}

	.back {
		position: absolute;
		left: 0;
	}

	.detail {
		position: absolute;
		width: 100%;
		padding: 30upx;
		left: 0;
		top: 70upx;
		box-sizing: border-box;
		z-index: 999;
		box-sizing: border-box;
	}

	.detailList {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		border-radius: 4px;
		background: #FFFFFF;
	}

	.detailTop {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.single {
		color: #E02B11;
		padding: 2upx 20upx;
		border: 1px solid #E02B11;
		border-radius: 4px;
	}

	.order {
		display: flex;
		align-items: center;
		margin-left: 30upx;
	}

	.order>view {
		margin-right: 20upx;
	}

	.location {
		width: 100%;
		font-size: 14px;
		color: #333;
		height: 40upx;
		line-height: 40upx;
		margin: 8upx 0 8upx 130upx;
	}

	.wait {
		width: 100%;
		font-size: 12px;
		color: #E02B11;
		height: 40upx;
		line-height: 40upx;
	}
	
	.list {
		width: 100%;
		position: absolute;
		left: 0;
		top: 300upx;
		bottom: 100upx;
		z-index: 999;
	}
	
	.data1 {
		width: 100%;
		display: flex;
		border-radius: 4px;
		background: #FFFFFF;
		padding: 30upx;
		box-sizing: border-box;
		margin-bottom: 30upx;
	}
	
	.data1-left {
		display: flex;
		flex-direction: column;
		border-right: 1px solid #eee;
		padding-right: 30upx;
		justify-content: space-between;
		font-size: 12px;
		color: #333;
	}
	
	.data1-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 12px;
		color: #333;
		padding-left: 40upx;
	}
	
	.dataForm {
		width: 100%;
	}
	
	.data2 {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 30upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
		background: #FFFFFF;
	}
	
	.name {
		width: 80%;
		height: 80upx;
		display: flex;
		padding: 0 20upx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		background: #F9F9F9;
		border-radius: 4px;
	}
	
	.input-placeholder {
		font-size: 12px;
		color: #999;
	}
	
	.choice {
		padding: 8upx 20upx;
		font-size: 12px;
		color: #FFFFFF;
		background: #E02B11;
		border-radius: 4px;
	}
	
	.protect {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
	}
	
	.protect-content {
		display: flex;
		flex-direction: column;
	}
	
	.select {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #E02B11;
	}
	
	.data3 {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
		background: #FFFFFF;
	}
	
	.area {
		width: 100%;
		height: 120upx;
		background: #F9F9F9;
		margin-top: 20upx;
	}
	
	.area>textarea {
		width: 100%;
		height: 100%;
		padding: 12upx;
		box-sizing: border-box;
	}
	
	.data4 {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
	}
	
	.data4>p {
		font-size: 12px;
		color: #999;
	}
	
	.bottom-nav {
		width: 100%;
		height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		padding: 0 0 0 30upx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		box-shadow: 0 1px 4px #ccc;
	}
	
	.nav-left {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 12px;
		color: #333;
	}
	
	.buy {
		height: 100upx;
		line-height: 100upx;
		padding: 0 60upx;
		font-size: 14px;
		color: #fff;
		background: #E02B11;
	}
	
	.editor {
		width: 100%;
		padding: 30upx;
		background: #FFFFFF;
		border-radius: 4px;
	}
	
	.btns {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
	}
	
	.editorList {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
		margin: 30rpx 0;
	}
	
	.editorList>img,.userLeft>img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx;
	}
	
	.userList {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		margin-bottom: 30upx;
	}
	
	.userLeft {
		display: flex;
		align-items: center;
	}
	
	.userMsg {
		display: flex;
		flex-direction: column;
	}
	
	.safe {
		width: 100%;
		padding: 16upx 30upx;
		box-sizing: border-box;
		text-align: justify;
	}
	
	.van-popup {
		background: #fff;
	}
</style>
