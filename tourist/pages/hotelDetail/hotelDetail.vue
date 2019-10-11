<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">酒店详情</block>
			</cu-custom>
		</view>
		<view class="hotel">
			<view class="hotel-content">
				<view class="hotel-title">{{hotels.HotelName}}</view>
				<view class="hotel-box">
					<img :src="hotels.DefaultPicture" alt="">
					<view class="hotel-right">
						<view class="hotel-item" style="border-bottom: 1px dashed #eee;" @tap="goComment">
							<view class="item-left">
								<view style="color: #E73C1D;margin-right: 20upx;">{{hotels.Dfscores}}分</view>
								<view>{{hotels.CommentNum}}人评价</view>
							</view>
							<img src="../../static/img/right.png" alt="">
						</view>
						<view class="hotel-item" @tap="goMap(hotels.Lat,hotels.Lng)">
							<view class="hotel-address">地址：{{hotels.Address}}</view>
							<img src="../../static/img/right.png" alt="">
						</view>
					</view>
				</view>
			</view>
			<view class="hotel-content">
				<view class="hotel-date" style="border-bottom: 1px dashed #eee;padding-top: 0;" @tap="goProduce">
					<view class="item-left">
						<img src="../../static/img/jiudian.png" alt="">
						<view style="font-size: 14px;margin-left: 30upx;">{{hotels.Kaiye}} 开业</view>
					</view>
				</view>
				<view class="hotel-date" style="padding-bottom: 0;">
					<view class="item-left">
						<img src="../../static/img/date.png" alt="">
						<view style="font-size: 14px;margin-left: 30upx;">入住时间 {{date1}}</view>
						<view style="font-size: 14px;margin-left: 30upx;">离店时间 {{date2}}</view>
					</view>
				</view>
			</view>
			<view class="hotel-content">
				<view class="room" v-for="(v,k) in rooms" :key="k" v-if="show" @tap="goPay(k)">
					<view class="room-title">
						<view>{{v.RoomName}}</view>
						<view style="font-size: 16px;color:#E73C1D;" v-if="v.RoomProducts[0].IsCanBook">￥{{v.RoomProducts[0].TotalPrice}}</view>
						<view class="full" v-if="!v.RoomProducts[0].IsCanBook">满房</view>
					</view>
					<view class="room-title">
						<view>{{v.Area}}平米 {{v.BedType}}</view>
					</view>
					<view class="room-title">
						<view>{{v.RoomProducts[0].ProductName}}</view>
					</view>
					<view class="room-title">
						<view style="color:#E73C1D;" v-if="v.RoomProducts[0].IsCanBook && v.RoomProducts[0].PaymentType == 0">有房 现付</view>
						<view style="color:#E73C1D;" v-if="v.RoomProducts[0].IsCanBook && v.RoomProducts[0].PaymentType == 1">有房 预付</view>
						<view style="color:#E73C1D;" v-if="!v.RoomProducts[0].IsCanBook && v.RoomProducts[0].PaymentType == 0">订完 现付</view>
						<view style="color:#E73C1D;" v-if="!v.RoomProducts[0].IsCanBook && v.RoomProducts[0].PaymentType == 1">订完 预付</view>
					</view>
				</view>
				<view class="no" v-if="!show">该酒店在此期间暂无可售房型或已经满房</view>
			</view>
		</view>
		<van-popup v-model="show1" position="bottom">
			<view class="pay">
				<view class="pay-title">{{order.RoomName}}</view>
				<view class="all">
					<view class="all-type">楼层 {{order.FloorDistribution}}</view>
					<view class="all-type">面积 {{order.Area}}</view>
				</view>
				<view class="all">
					<view class="all-type" v-if="order.RoomProducts">早餐 {{order.RoomProducts[0].ProductName}}</view>
					<view class="all-type">床型 {{order.BedType}}</view>
				</view>
				<view class="payBtn">
					<view v-if="order.RoomProducts">订单总价：<text style="font-size: 16px;color: #E73C1D;">￥{{order.RoomProducts[0].TotalPrice}}</text></view>
					<view class="btns" @tap="goWrite">预定</view>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import {
		ajaxs
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				id: '',
				hotels: {},
				rooms: [],
				show: true,
				show1: false,
				order: {},
				title: '',
				comments: [],
				type: 0,
				safe: '',
				roomName: '',
				safeType: 0,
				roomId: '',
				productId: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.init()
		},
		computed: {
			date1() {
				return this.$store.state.hotelDate1
			},
			date2() {
				return this.$store.state.hotelDate2
			}
		},
		methods: {
			init() {
				let self = this
				let datas = {
					HId: this.id
				}
				let data = {
					url: '/api/gzh/hotelDetail',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							let num = res.data.Data.HotelDetails.CommentNum
							if (num.indexOf('$') == -1) {
								res.data.Data.HotelDetails.CommentNum = num
							} else {
								num = num.split('$')
								if (num.length == 2) {
									num = parseInt(num[0]) + parseInt(num[1])
									res.data.Data.HotelDetails.CommentNum = num
								} else {
									num = parseInt(num[0]) + parseInt(num[1]) + parseInt(num[2])
									res.data.Data.HotelDetails.CommentNum = num
								}
							}
							self.hotels = res.data.Data.HotelDetails
							self.title = self.hotels.HotelName
							self.comments = res.data.Data.DataComments
						}
					}
				}
				ajaxs(data)

				let arr = [this.id]
				let data1 = {
					HId: arr,
					InDate: this.$store.state.hotelFullDate1,
					OutDate: this.$store.state.hotelFullDate2,
				}
				let data2 = {
					url: '/api/gzh/hotelRooms',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							if (res.data.Data.HotelRooms[0].Rooms.length > 0) {
								self.rooms = res.data.Data.HotelRooms[0].Rooms
								self.show = true
							} else {
								self.show = false
							}
						}
					}
				}
				ajaxs(data2)
			},
			goPay(k) {
				if (this.rooms[k].RoomProducts.length > 0 && this.rooms[k].RoomProducts[0].IsCanBook) {
					this.show1 = true
					this.order = this.rooms[k]
					this.type = this.rooms[k].RoomProducts[0].PaymentType
					this.safeType = this.rooms[k].RoomProducts[0].GuaranteeType
					this.roomName = this.rooms[k].RoomName
					this.roomId = this.rooms[k].RoomId
					this.productId = this.rooms[k].RoomProducts[0].ProductId
					if (this.rooms[k].RoomProducts[0].GuaranteeType != 0) {
						this.safe = this.rooms[k].RoomProducts[0].GuaranteeRule.GuaranteeDesc
					}
				}
			},
			goMap(lat, lng) {
				uni.navigateTo({
					url: '../hotelMap/hotelMap?lat=' + lat + '&lng=' + lng + '&tit=' + this.title,
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goComment() {
				uni.navigateTo({
					url: '../hotelComments/hotelComments?list=' + JSON.stringify(this.comments) + '&score=' + this.hotels.Dfscores,
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goProduce() {
				uni.navigateTo({
					url: '../hotelProduce/hotelProduce?list=' + JSON.stringify(this.hotels),
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			},
			goWrite() {
				let type = 0
				let datas = {
					name: this.hotels.HotelName,
					star: this.hotels.Star,
					type: this.type,
					safe: this.safe,
					safeType: this.safeType,
					total: this.order.RoomProducts[0].TotalPrice,
					room: this.roomName,
					HId: this.id,
					RoomId: this.roomId,
					ProductId: this.productId
				}
				console.log(datas)
				uni.navigateTo({
					url: '../hotelSub/hotelSub?list='+JSON.stringify(datas),
					animationType: 'slide-in-left',
					animationDuration: 500
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #F8F8F8;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.hotel {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.hotel-content {
		width: 100%;
		padding: 20upx;
		background: #fff;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		box-shadow: 1px 1px 5px #eee;
		margin-bottom: 30upx;
	}

	.hotel-title {
		width: 100%;
		font-size: 14px;
		color: #333;
	}

	.hotel-box {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 30upx;
	}

	.hotel-box>img {
		width: 200upx;
		height: 150upx;
		border-radius: 4px;
	}

	.hotel-right {
		width: 440upx;
		padding-left: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.hotel-item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 0;
	}

	.hotel-item>img {
		width: 24upx;
	}

	.item-left {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #666;
	}

	.hotel-address {
		width: 80%;
		font-size: 12px;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.hotel-date {
		width: 100%;
		padding: 20upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-left>img {
		width: 30upx;
	}

	.room {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 1px dashed #eee;
		padding: 30upx 0 20upx;
	}

	.room:last-of-type {
		border-bottom: none;
	}

	.room-title {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16upx;
	}

	.no {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #666;
	}

	.pay {
		width: 100%;
		padding: 30upx 0 0 30upx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		flex-direction: column;
	}

	.pay-title {
		width: 100%;
		font-size: 14px;
		color: #333;
		margin-bottom: 30upx;
	}

	.all {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 20upx;
	}

	.all-type {
		width: 50%;
		font-size: 12px;
		color: #666;
	}

	.payBtn {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 30upx;
	}

	.btns {
		width: 180upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		background: #E73C1D;
		font-size: 14px;
		color: #fff;
	}

	.full {
		padding: 4upx 20upx;
		background: #E73C1D;
		border-radius: 4px;
		font-size: 14px;
		color: #fff;
	}
</style>
