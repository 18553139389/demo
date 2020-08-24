<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white"
			 @Back="Back">
				<block slot="backText"></block>
				<block slot="content">确认订单</block>
			</cu-custom>
		</view>
		<view class="address" @tap="goAddress">
			<view class="choice">{{address}}</view>
			<img class="right1" src="../../static/img/right1.png" alt="">
		</view>
		<view class="list">
			<img class="list_left" :src="list.image" alt="">
			<view class="list_right">
				<view class="name">{{list.title}}</view>
				<!-- <view class="price">
					<view class="score" v-if="list.type == 2" style="margin-top: 20upx;font-size: 12px;">纪念币：{{list.point}}</view>
					<view class="score" style="margin-top: 20upx;font-size: 12px;">运费：￥10.00</view>
				</view> -->
				<view class="score" v-if="list.type == 2" style="margin-top: 20upx;font-size: 12px;">纪念币：{{list.point}}</view>
				<view class="score" style="margin-top: 14upx;font-size: 12px;">运送费：￥{{list.fee}}</view>
				<view class="price">
					<view class="newPrice" v-if="list.type == 1">￥{{list.oldPrice}}</view>
					<view class="newPrice" v-if="list.type == 2">￥{{parseFloat(list.price)}}</view>
					<view class="oldPrice" v-if="list.type == 2" style="margin-right: 60upx;">￥{{parseFloat(list.oldPrice)}}</view>
					<view class="score" v-if="list.type == 3">纪念币：{{list.point}}</view>
					<van-stepper v-model="values" integer :min="1" disable-input input-width="24px" button-size="20px" />
				</view>
			</view>
		</view>
		<!-- <view class="count">
			<view>纪念币余额</view>
			<view class="num">2000</view>
		</view> -->
		<view class="beizhu">
			<view class="beizhu_title">备注</view>
			<textarea v-model="text" placeholder="买家留言"></textarea>
		</view>
		<view class="pay">
			<view class="total">
				实付款：
				<text v-if="list.type != 3" style="color: #DE2910;">￥{{total}}</text>
				<text v-if="list.type == 3" style="color: #DE2910;">{{scores}}纪念币</text>
			</view>
			<view class="submit" @tap="money">立即购买</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				values: 1,
				text: '',
				list: '',
				ids: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			//初始化数据
			if(option.list){
				this.list = JSON.parse(option.list)
				this.ids = option.id
			}
		},
		computed: {
			address() {
				let area = ''
				if (this.$store.state.saveAddress == null) {
					area = '请选择收货地址'
				} else {
					area = this.$store.state.saveAddress.city + this.$store.state.saveAddress.address
				}
				return area
			},
			total() {
				let total = 0
				let self = this
				if(this.list.fee == undefined || !this.list.fee){
					self.list.fee = 0
				}
				if (this.list.type == 1) {
					total = parseFloat(this.list.oldPrice) * this.values + parseFloat(this.list.fee)
				} else if (this.list.type == 2) {
					total = parseFloat(this.list.price) * this.values + parseFloat(this.list.fee)
				} else if (this.list.type == 3) {
					total = 0 + parseFloat(this.list.fee)
				}
				return total
			},
			scores() {
				let scores = 0
				if (this.list.type == 1) {
					scores = 0
				} else if (this.list.type == 2) {
					scores = parseFloat(this.list.point) * this.values
				} else if (this.list.type == 3) {
					scores = parseFloat(this.list.point) * this.values
				}
				return scores
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
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			money() {
				if(this.address == '请选择收货地址'){
					Toast('收货地址不能为空')
					return
				}
				let list = JSON.stringify(this.list)
				console.log(list)
				uni.navigateTo({
					url: '../shopPay/shopPay?list=' + list + '&total=' + this.total + '&id=' + this.ids + '&text=' + this.text + '&values=' + this.values
				})
			},
			goAddress() {
				uni.navigateTo({
					url: '../shopAddress/shopAddress'
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
		background: #F9F9F9;
		position: relative;
	}

	.address {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 6px solid #f9f9f9;
		border-bottom: 6px solid #f9f9f9;
		background: #FFF;
	}

	.choice {
		width: 80%;
	}

	.right1 {
		width: 40upx;
		height: 40upx;
	}

	.list {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 6px solid #f9f9f9;
		background: #FFF;
	}

	.list_left {
		width: 200upx;
		height: 200upx;
	}

	.list_right {
		/* flex: 1; */
		width: 75%;
		height: 200upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.name {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.score {
		font-size: 14px;
		color: #DE2910;
		/* margin-top: 28upx; */
	}

	.price {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.newPrice {
		font-size: 14px;
		color: #DE2910;
	}

	.oldPrice {
		font-size: 14px;
		color: #999;
		text-decoration: line-through;
	}

	.count {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FFF;
	}

	.num {
		font-size: 14px;
		color: #DE2910;
	}

	.beizhu {
		width: 100%;
		padding: 0 30upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
	}

	.beizhu_title {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
	}

	textarea {
		width: 100%;
		height: 220upx;
		border-radius: 4px;
		background: #F1F1F1 !important;
		border: none;
		font-size: 12px;
		color: #666;
		padding: 20upx;
	}

	.pay {
		width: 100%;
		height: 90upx;
		display: flex;
		padding-left: 30upx;
		box-sizing: border-box;
		align-items: center;
		font-size: 15px;
		color: #333;
		justify-content: space-between;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
	}

	.submit {
		width: 300upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 15px;
		background: #DE2910;
		color: #fff;
	}
</style>
