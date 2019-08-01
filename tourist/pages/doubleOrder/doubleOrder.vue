<template>
	<view class="contain">
		<view class="top">
			<view class="title">
				<text class="cuIcon-back back" @tap="back"></text>
				<view>订单</view>
			</view>
		</view>
		<view class="detail">
			<view class="detailList">
				<view class="detailTop">
					<view class="single">去程</view>
					<view class="order">
						<view>{{list1.DepartDate}}</view>
						<view style="font-size: 12px;">{{day1}}</view>
						<view>{{list1.DepartTime}}</view>
						<view style="font-size: 12px;">{{listData1.CabinName}}</view>
					</view>
				</view>
				<view class="location" style="font-size: 12px;margin-bottom: 20upx;">{{list1.DepartAirportName.indexOf('国') > -1 ? list1.DepartAirportName.substr(0,list1.DepartAirportName.indexOf('国')) : list1.DepartAirportName}}{{list1.DepartAirportTerminal}}
					- {{list1.ArriveAirportName.indexOf('国') > -1 ? list1.ArriveAirportName.substr(0,list1.ArriveAirportName.indexOf('国')) : list1.ArriveAirportName}}{{list1.ArriveAirportTerminal}}</view>
				<view class="detailTop">
					<view class="single">返程</view>
					<view class="order">
						<view>{{list2.DepartDate}}</view>
						<view style="font-size: 12px;">{{day2}}</view>
						<view>{{list2.DepartTime}}</view>
						<view style="font-size: 12px;">{{listData2.CabinName}}</view>
					</view>
				</view>
				<view class="location" style="font-size: 12px;">{{list2.DepartAirportName.indexOf('国') > -1 ? list2.DepartAirportName.substr(0,list2.DepartAirportName.indexOf('国')) : list2.DepartAirportName}}{{list2.DepartAirportTerminal}}
					- {{list2.ArriveAirportName.indexOf('国') > -1 ? list2.ArriveAirportName.substr(0,list2.ArriveAirportName.indexOf('国')) : list2.ArriveAirportName}}{{list2.ArriveAirportTerminal}}</view>
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
						<view style="margin-left: 12upx;">机建燃油 ￥{{Oil1}}</view>
					</view>
					<view class="data1-right">
						<view>提供等额行程单</view>
						<view style="margin-top: 8upx;">机建 ￥{{Tax1}}</view>
						<view style="margin-top: 8upx;">托运行李共20公斤</view>
					</view>
				</view>
				<view class="data1">
					<view class="data1-left">
						<view style="color: #E02B11;font-size: 18px;">￥{{price2}}</view>
						<view v-if="!checked" style="margin-left: 12upx;">成人票</view>
						<view v-if="checked" style="margin-left: 12upx;">儿童票</view>
						<view style="margin-left: 12upx;">机建燃油 ￥{{Oil2}}</view>
					</view>
					<view class="data1-right">
						<view>提供等额行程单</view>
						<view style="margin-top: 8upx;">机建 ￥{{Tax2}}</view>
						<view style="margin-top: 8upx;">托运行李共20公斤</view>
					</view>
				</view>
				<view class="data2" style="margin-bottom: 20upx;">
					<view>乘机人</view>
					<view class="name">
						<input style="width: 65%;" type="text" v-model="name" placeholder="请选择乘机人" placeholder-class="input-placeholder"
						 disabled>
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
				<!-- <view class="data2" style="margin-bottom: 20upx;" v-if="!checked">
					<view class="protect">
						<view class="protect-content">去程：是否携带婴儿</view>
						<view class="select">
							<view style="margin-right: 30upx;">婴儿票￥{{listData1.BabyFare}}</view>
							<van-checkbox v-model="checked1" checked-color="#E02B11" @change="choiceBaby1"></van-checkbox>
						</view>
					</view>
				</view>
				<view class="data2" style="margin-bottom: 20upx;" v-if="babyShow1">
					<view>乘机人</view>
					<view class="name">
						<input style="width: 65%;" type="text" v-model="name1" placeholder="请选择乘机人" placeholder-class="input-placeholder"
						 disabled>
						<view class="choice" @tap="airuser('1')">选择乘机人</view>
					</view>
				</view> -->
				<!-- <view class="data2" style="margin-bottom: 20upx;" v-if="!checked">
					<view class="protect">
						<view class="protect-content">返程：是否携带婴儿</view>
						<view class="select">
							<view style="margin-right: 30upx;">婴儿票￥{{listData2.BabyFare}}</view>
							<van-checkbox v-model="checked3" checked-color="#E02B11" @change="choiceBaby3"></van-checkbox>
						</view>
					</view>
				</view>
				<view class="data2" style="margin-bottom: 20upx;" v-if="babyShow3">
					<view>乘机人</view>
					<view class="name">
						<input style="width: 65%;" type="text" v-model="name3" placeholder="请选择乘机人" placeholder-class="input-placeholder"
						 disabled>
						<view class="choice" @tap="airuser('2')">选择乘机人</view>
					</view>
				</view> -->
				<view class="data2" style="margin-bottom: 20upx;">
					<view class="protect">
						<view class="protect-content" @tap="showSafe">
							<view style="font-size: 12px;">{{safe1}}</view>
							<view style="font-size: 12px;color: #999;margin-top: 16upx 0 0 4upx;">{{safe2}}</view>
						</view>
						<view class="select">
							<view style="margin-right: 30upx;">￥{{safePrice}}/份</view>
							<van-checkbox v-model="checked2" checked-color="#E02B11"></van-checkbox>
						</view>
					</view>
				</view>
				<!-- <view class="data2" style="margin-bottom: 20upx;">
					<view class="protect">
						<view class="protect-content" @tap="showSafe1">
							<view style="font-size: 12px;">返程:{{safe3}}</view>
							<view style="font-size: 12px;color: #999;margin: 16upx 0 0 4upx;">{{safe4}}</view>
						</view>
						<view class="select">
							<view style="margin-right: 30upx;">￥{{safePrice1}}/份</view>
							<van-checkbox v-model="checked4" checked-color="#E02B11"></van-checkbox>
						</view>
					</view>
				</view> -->
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
		<van-popup v-model="show3" position="bottom">
			<view class="safe" v-for="(v,k) in content1" :key="k">{{v}}</view>
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
				user: '',
				call: '',
				phone: '',
				checked1: false,
				checked2: false,
				checked3: false,
				checked4: false,
				show1: false,
				show2: false,
				show3: false,
				radio: '',
				list1: {},
				list2: {},
				listData1: {},
				listData2: {},
				checked: false,
				price1: 0,
				price2: 0,
				userList: [],
				safe1: '',
				safe2: '',
				safePrice: 0,
				content: '',
				safe3: '',
				safe4: '',
				safePrice1: 0,
				content1: '',
				Oil1: 0,
				Tax1: 0,
				babyFare1: 0,
				babyFare3: 0,
				babyFare4: 0,
				childPrice1: 0,
				childPrice2: 0,
				Oil2: 0,
				Tax2: 0,
				babyFare2: 0,
				contents: '',
				custorm: 1,
				cardsType: 0,
				cardsType1: 0,
				cardsType3: 0,
				cardNo: '',
				cardNo1: '',
				cardNo3: '',
				tel: '',
				tel1: '',
				tel3: '',
				InsProductCodes: '',
				InsProductCodes1: '',
				birthday: '',
				birthday1: '',
				birthday3: '',
				BookData: '',
				babyShow1: false,
				name1: '',
				babyShow3: false,
				name3: '',
				userType: '',
				Flight_RoundBackFee: 0,
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
					price = this.price1 + this.Oil1 + this.Tax1 + this.price2 + this.Oil2 + this.Tax2 + this.childPrice1 
				}else{
					price = this.price1 + this.Oil1 + this.Tax1 + this.price2 + this.Oil2 + this.Tax2 + this.Flight_RoundBackFee
					
					// if(this.checked1){
					// 	price += this.babyFare1 + this.babyFare3
					// }
					// 
					// if(this.checked3){
					// 	price += this.babyFare2 + this.babyFare4
					// }
				}
				
				if(this.checked2){
					price += (this.safePrice * 2)
				}
				
				// if(this.checked4){
				// 	price += this.safePrice1
				// }
				
				return price
			},
			day1() {
				return this.$store.state.day1
			},
			day2() {
				return this.$store.state.day2
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
	
			this.checked = this.$store.state.checked
			this.list1 = JSON.parse(this.$store.state.listStart)
			this.list2 = JSON.parse(this.$store.state.listEnd)
			this.listData1 = this.list1.Cabins[option.index1]
			this.listData2 = this.list2.Cabins[option.index2]
			//判断乘客类型 成人 儿童
			if(this.$store.state.checked){
				this.custorm = 2
			}
			this.price1 = this.listData1.Fare
			this.Oil1 = this.list1.Oil
			this.Tax1 = this.list1.Tax
			this.babyFare1 = this.listData1.BabyFare
			this.price2 = this.listData2.Fare
			this.Oil2 = this.list2.Oil
			this.Tax2 = this.list2.Tax
			this.babyFare2 = this.listData2.BabyFare
		},
		onShow() {
			this.name = ''
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
			choiceBaby1(e) {
				console.log(e)
				if(e){
					this.babyShow1 = true
				}else{
					this.babyShow1 = false
				}
			},
			choiceBaby3(e) {
				console.log(e)
				if(e){
					this.babyShow3 = true
				}else{
					this.babyShow3 = false
				}
			},
			init() {
				//初始化刷新实时票价
				let self = this
				// let datas = {
				// 	FlightNo: this.list1.FlightNo,
				// 	SCode: this.list1.DepartAirportCode,
				// 	ECode: this.list1.ArriveAirportCode,
				// 	Cabin: this.listData1.CabinCode,
				// 	GoDate: this.list1.ArriveDate,
				// 	STime: this.list1.DepartTime,
				// 	IsCHD: this.$store.state.checked,
				// 	CurrFare: this.listData1.Fare
				// }
				// let data = {
				// 	url: '/api/gzh/flightVerifyCabin',
				// 	data: datas,
				// 	success: function(res){
				// 		console.log(res)
				// 		if(res.data.result == 0){
				// 			self.price1 = res.data.Data.NewFare
				// 		}
				// 	}
				// }
				// ajax(data)
				// let data1 = {
				// 	FlightNo: this.list2.FlightNo,
				// 	SCode: this.list2.DepartAirportCode,
				// 	ECode: this.list2.ArriveAirportCode,
				// 	Cabin: this.listData2.CabinCode,
				// 	GoDate: this.list2.ArriveDate,
				// 	STime: this.list2.DepartTime,
				// 	IsCHD: this.$store.state.checked,
				// 	CurrFare: this.listData2.Fare
				// }
				// let data2 = {
				// 	url: '/api/gzh/flightVerifyCabin',
				// 	data: data1,
				// 	success: function(res){
				// 		console.log(res)
				// 		if(res.data.result == 0){
				// 			self.price2 = res.data.Data.NewFare
				// 		}
				// 	}
				// }
				// ajax(data2)
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
				let StartDate = this.list1.DepartDate + ' ' + this.list1.DepartTime
				let dates = {
					StartDate: StartDate
				}
				
				let safe = {
					url: '/api/gzh/flightGetFlightBookPara',
					data: dates,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.babyFare3 = res.data.Data.Flight_BabySerFee
							self.childPrice1 = res.data.Data.Flight_ChildSerFee
							self.Flight_RoundBackFee = res.data.Data.Flight_RoundBackFee
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
						AirLineCode: this.list1.AirCompanyCode,
						Cabin: this.listData1.CabinCode,
						Fare: this.listData1.Fare,
						Oil: this.list1.Oil,
						Tax: this.list1.Tax,
						SCode: this.list1.DepartAirportCode,
						ECode: this.list1.ArriveAirportCode,
						TakeOffDateTime: this.list1.DepartDate + ' ' + this.list1.DepartTime,
						ArriveDateTime: this.list1.ArriveDate + ' ' + this.list1.ArriveTime,
						ST: this.list1.DepartAirportTerminal,
						ET: this.list1.ArriveAirportTerminal,
						FlightNo: this.list1.FlightNo
					},{
						AirLineCode: this.list2.AirCompanyCode,
						Cabin: this.listData2.CabinCode,
						Fare: this.listData2.Fare,
						Oil: this.list2.Oil,
						Tax: this.list2.Tax,
						SCode: this.list2.DepartAirportCode,
						ECode: this.list2.ArriveAirportCode,
						TakeOffDateTime: this.list2.DepartDate + ' ' + this.list2.DepartTime,
						ArriveDateTime: this.list2.ArriveDate + ' ' + this.list2.ArriveTime,
						ST: this.list2.DepartAirportTerminal,
						ET: this.list2.ArriveAirportTerminal,
						FlightNo: this.list2.FlightNo
					}]
				}
				let message1 = {
					url: '/api/gzh/flightGetFlightPolicy',
					data: message,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.BookData = res.data.Data.Policys[0].BookData
							self.price = res.data.Data.Policys[0].SettlePrice
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
				}else if(type == 1){
					this.userType = 1
				}else if(type == 2){
					this.userType = 2
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
						}else if(this.userType == 1){
							this.name1 = this.userList[i].username
							this.cardsType1 = this.userList[i].cardType
							this.cardNo1 = this.userList[i].cardNo
							this.tel1 = this.userList[i].phone
							this.birthday1 = this.userList[i].birthday
						}else if(this.userType == 2){
							this.name3 = this.userList[i].username
							this.cardsType3 = this.userList[i].cardType
							this.cardNo3 = this.userList[i].cardNo
							this.tel3 = this.userList[i].phone
							this.birthday3 = this.userList[i].birthday
						}
					}
				}
			},
			showSafe() {
				this.show2 = true
			},
			showSafe1() {
				this.show3 = true
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
				
				if(this.checked3){
					if(this.name3 == ''){
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
					Amount: this.total,
					ContactName: this.user,
					ContactTel: '',
					ContactMobile: this.phone,
					OrderRemark: this.contents
				}
				
				let AirLines = [{
						FlightNo: this.list1.FlightNo,
						Cabin: this.listData1.CabinCode,
						SAirportCode: this.list1.DepartAirportCode,
						EAirportCode: this.list1.ArriveAirportCode,
						STerminal: this.list1.DepartAirportTerminal,
						ETerminal: this.list1.ArriveAirportTerminal,
						FromDateTime: this.list1.DepartDate + ' ' + this.list1.DepartTime,
						ArriveDateTime: this.list1.ArriveDate + ' ' + this.list1.ArriveTime,
						PlaneType: this.list1.PlaneType,
						Fare: this.listData1.Fare,
						Oil: this.list1.Oil,
						Tax: this.list1.Tax,
						Discount: this.listData1.Discount
					},
					{
						FlightNo: this.list2.FlightNo,
						Cabin: this.listData2.CabinCode,
						SAirportCode: this.list2.DepartAirportCode,
						EAirportCode: this.list2.ArriveAirportCode,
						STerminal: this.list2.DepartAirportTerminal,
						ETerminal: this.list2.ArriveAirportTerminal,
						FromDateTime: this.list2.DepartDate + ' ' + this.list2.DepartTime,
						ArriveDateTime: this.list2.ArriveDate + ' ' + this.list2.ArriveTime,
						PlaneType: this.list2.PlaneType,
						Fare: this.listData2.Fare,
						Oil: this.list2.Oil,
						Tax: this.list2.Tax,
						Discount: this.listData2.Discount
					}
				]
				
				let InsProductCodes = ''
				if(this.checked2){
					InsProductCodes += this.InsProductCodes
				}
				
				let Passengers = [{
							PsgType: this.custorm,
							PsgName: this.name,
							CardType: this.cardsType,
							CardNo: this.cardNo,
							Mobile: this.tel,
							InsProductCodes: InsProductCodes,
							BirthDay: this.birthday,
							AdultPnr: this.call
						}
					]
				
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
						Policy: Policy
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
							self.sub = false
							Toast(res.data.resultNote)
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
		height: 80upx;
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
		padding: 2upx 10upx;
		border: 1px solid #E02B11;
		border-radius: 4px;
		font-size: 12px;
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
		margin: 8upx 0 8upx 104upx;
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
		top: 410upx;
		bottom: 100upx;
		z-index: 0;
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
</style>
