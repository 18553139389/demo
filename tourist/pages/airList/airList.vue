<template>
	<view class="contain">
		<view class="top">
			<view class="title">
				<text class="cuIcon-back" @tap="back"></text>
				<view class="current">{{airName}}</view>
				<view class="call" @tap="goCall(detailList.deptel)">
					<img src="../../static/img/service1.png" alt="">
					<view>客服</view>
				</view>
			</view>
		</view>
		<view class="detail" v-if="types == '计划'">
			<view class="plan">
				<view class="mode"></view>
				<view class="airStart">
					<view class="startPlan">
						<text>预计起飞时间</text>
						<view>准点率{{detailList.OntimeRate}}</view>
					</view>
					<view class="startTime">
						<text style="margin-top: 16upx;font-size: 40upx;">{{detailList.FlightDeptimePlanDate.substring(10,16)}}</text>
						<text style="font-size:12px;color: #999;margin: 10upx 0 0 20upx;">仅供参考</text>
					</view>
				</view>
			</view>
			<view class="airBottom">
				<!-- <view>预计1小时17分钟后起飞</view> -->
				<view>预计到达{{detailList.FlightArrtimePlanDate.substring(10,16)}}</view>
			</view>
		</view>
		<view class="detail" v-if="types == '起飞'">
			<view class="plan">
				<view class="mode1"></view>
				<img class="upImg" src="../../static/img/fly1.png" alt="">
				<view class="airStart1">
					<view>飞行时长：{{detailList.FlightDuration}}分钟</view>
					<view>飞行里程：{{detailList.distance}}公里</view>
				</view>
			</view>
			<view class="airBottom" style="background: #40D267;">
				<!-- <view>预计1小时17分钟后起飞</view> -->
				<view>预计到达{{detailList.FlightArrtimePlanDate.substring(10,16)}}</view>
			</view>
		</view>
		<view class="detail" v-if="types == '延误'">
			<view class="plan">
				<view class="mode2">延误</view>
				<view class="airStart">
					<view class="startPlan">
						<text>原因：暂无说明</text>
					</view>
				</view>
			</view>
			<view class="airBottom" style="background: #DE2910;">
				<!-- <view>预计1小时17分钟后起飞</view>
				<view>预计到达不确定</view> -->
			</view>
		</view>
		<view class="detail" v-if="types == '到达'">
			<view class="plan">
				<view class="mode2">到达</view>
				<view class="airStart">
					<view class="startPlan">
						<text>准点率：{{detailList.OntimeRate}}</text>
					</view>
				</view>
			</view>
			<view class="airBottom" style="background: #DE2910;">
				<!-- <view>预计1小时17分钟后起飞</view>
				<view>预计到达不确定</view> -->
			</view>
		</view>
		<view class="detail" v-if="types != '计划' && types != '起飞' && types != '延误' && types != '到达'">
			<view class="plan">
				<view class="mode2" style="font-size: 14px;padding: 24upx;box-sizing: border-box;line-height: 16px;display: flex;align-items: center;justify-content: center;">{{detailList.AssistFlightState}}</view>
				<view class="airStart">
					<view class="startPlan">
						<text>原因：暂无说明</text>
					</view>
				</view>
			</view>
			<view class="airBottom" style="background: #DE2910;">
				<!-- <view>预计1小时17分钟后起飞</view>
				<view>预计到达不确定</view> -->
			</view>
		</view>
		<view class="list-start">
			<view class="list-wrapper">
				<view class="startName">
					<view>
						<img class="msg" src="../../static/img/start.png" alt="">
						<text>{{detailList.FlightDep}} {{detailList.FlightHTerminal == '' ? '--' : detailList.FlightHTerminal}}</text>
						<text style="margin-left: 20upx;" v-if="types == '到达' || types == '起飞'">{{detailList.FlightDeptimeDate.substring(5,16)}}</text>
						<text style="margin-left: 20upx;" v-if="types == '延误'">{{detailList.FlightDeptimeReadyDate.substring(5,16)}}</text>
						<text style="margin-left: 20upx;" v-if="types == '计划'">{{detailList.FlightDeptimePlanDate.substring(5,16)}}</text>
						<text style="margin-left: 20upx;" v-if="types != '计划' && types != '起飞' && types != '延误' && types != '到达'">{{detailList.FlightDeptimePlanDate.substring(5,16)}}</text>
					</view>
					<view style="color: #999;">{{detailList.DepWeather}}</view>
				</view>
				<view class="airMask">
					<view class="mask-left" v-if="types == '到达'">
						<view class="leftTime">{{detailList.FlightDeptimeDate.substring(10,16)}}</view>
						<view>实际起飞</view>
					</view>
					<view class="mask-left" v-if="types == '延误'">
						<view class="leftTime">{{detailList.FlightDeptimeReadyDate.substring(10,16)}}</view>
						<view>预计起飞</view>
					</view>
					<view class="mask-left" v-if="types == '计划'">
						<view class="leftTime">{{detailList.FlightDeptimePlanDate.substring(10,16)}}</view>
						<view>预计起飞</view>
					</view>
					<view class="mask-left1" v-if="types == '起飞'">
						<view class="leftTime" style="color: rgb(64,210,103);">{{detailList.FlightDeptimeDate.substring(10,16)}}</view>
						<view>实际起飞</view>
					</view>
					<view class="mask-left2" v-if="types != '计划' && types != '起飞' && types != '延误' && types != '到达'">
						<view class="leftTime">{{detailList.FlightDeptimePlanDate.substring(10,16)}}</view>
						<view>计划起飞</view>
					</view>
					<view class="mask-right">
						<view class="right-item">
							<view>值机柜台</view>
							<view style="font-size: 18px;color: #DE2910;">{{detailList.CheckinTable == '' ? '--' : detailList.CheckinTable}}</view>
						</view>
						<view class="right-item">
							<view>登机口</view>
							<view style="font-size: 18px;color: #DE2910;">{{detailList.BoardGate == '' ? '--' : detailList.BoardGate}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list-wrapper">
				<view class="startName">
					<view>
						<img class="msg" src="../../static/img/end.png" alt="">
						<text>{{detailList.FlightArr}} {{detailList.FlightTerminal == '' ? '--' : detailList.FlightTerminal}}</text>
						<text style="margin-left: 20upx;" v-if="types == '到达'">{{detailList.FlightArrtimeDate.substring(5,16)}}</text>
						<text style="margin-left: 20upx;" v-if="types == '延误' || types == '起飞'">{{detailList.FlightArrtimeReadyDate.substring(5,16)}}</text>
						<text style="margin-left: 20upx;" v-if="types == '计划'">{{detailList.FlightArrtimePlanDate.substring(5,16)}}</text>
						<text style="margin-left: 20upx;" v-if="types != '计划' && types != '起飞' && types != '延误' && types != '到达'">{{detailList.FlightArrtimePlanDate.substring(5,16)}}</text>
					</view>
					<view style="color: #999;">{{detailList.ArrWeather}}</view>
				</view>
				<view class="airMask">
					<view class="mask-left" v-if="types == '到达'">
						<view class="leftTime">{{detailList.FlightArrtimeDate.substring(10,16)}}</view>
						<view>实际到达</view>
					</view>
					<view class="mask-left" v-if="types == '延误'">
						<view class="leftTime">{{detailList.FlightArrtimeReadyDate.substring(10,16)}}</view>
						<view>预计到达</view>
					</view>
					<view class="mask-left1" v-if="types == '起飞'">
						<view class="leftTime" style="color: rgb(64,210,103);">{{detailList.FlightArrtimeReadyDate.substring(10,16)}}</view>
						<view>预计到达</view>
					</view>
					<view class="mask-left2" v-if="types == '计划'">
						<view class="leftTime">{{detailList.FlightArrtimePlanDate.substring(10,16)}}</view>
						<view>预计到达</view>
					</view>
					<view class="mask-left" v-if="types != '计划' && types != '起飞' && types != '延误' && types != '到达'">
						<view class="leftTime">{{detailList.FlightArrtimePlanDate.substring(10,16)}}</view>
						<view>计划到达</view>
					</view>
					<view class="mask-right">
						<view class="right-item">
							<view>行李转盘</view>
							<view style="font-size: 18px;color: #DE2910;">{{detailList.BaggageID == '' ? '--' : detailList.BaggageID}}</view>
						</view>
						<view class="right-item">
							<view>到达口</view>
							<view style="font-size: 18px;color: #DE2910;">{{detailList.ReachExit == '' ? '--' : detailList.ReachExit}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list-wrappers" style="padding: 20upx 0;">
				<view class="airName">航班 {{detailList.FlightNo}}</view>
				<img src="../../static/img/big.png" alt="">
				<view class="airSet">
					<text>餐食: {{detailList.Food == '' ? '--' : detailList.Food}}</text>
					<text>机龄：{{detailList.FlightYear}}年</text>
					<text>飞行里程：{{detailList.distance}}公里</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333333',
				value: '',
				backColor: '#FFFFFF',
				listData: [],
				types: 0,
				airList: [],
				detailList: {},
				airName: ''
			}
		},
		onLoad(options) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.types = options.type
			this.airList = JSON.parse(options.list)
			this.detailList = this.airList[options.index]
			this.airName = this.detailList.FlightCompany + ' ' + this.detailList.FlightNo
		},
		onReady() {

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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			goList() {
				uni.navigateTo({
					url: '../airDetail/airDetail'
				})
			},
			goCall(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
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
		position: absolute;
	}

	.top {
		width: 100%;
		height: 300upx;
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
		height: 100upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.back {
		position: absolute;
		left: 0;
	}

	.current {
		width: 80%;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
	}

	.interest {
		width: 100%;
		font-size: 14px;
		color: #333;
		border-top: 10px solid #eee;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-bottom: 20upx;
	}

	.list:last-child {
		margin-bottom: 0;
	}

	.air_name {
		display: flex;
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.air_name>img {
		width: 40upx;
		height: 40upx;
		margin-right: 20upx;
	}

	.record {
		width: 100%;
		display: flex;
		padding: 30upx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
	}

	.goStart {
		display: flex;
		flex-direction: column;
	}

	.timer {
		font-size: 40upx;
		color: #333;
		font-weight: 600;
		margin-bottom: 20upx;
	}

	.address {
		font-size: 14px;
		color: #999;
	}

	.call {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
	}

	.call>img {
		width: 34upx;
		height: 34upx;
	}

	.detail {
		position: fixed;
		width: 92%;
		left: 4%;
		top: 120upx;
		z-index: 999;
		background: #fff;
		border-radius: 4px;
	}

	.plan {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20upx;
		box-sizing: border-box;
	}

	.mode,.mode1,.mode2 {
		width: 120upx;
		height: 120upx;
		line-height: 120upx;
		border-radius: 50%;
		overflow: hidden;
		text-align: center;
		border: 1px solid #eee;
		font-size: 36upx;
		color: #333;
	}
	
	.mode {
		background: url(../../static/img/idea.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.mode1 {
		background: url(../../static/img/fly2.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.mode2 {
		background: url(../../static/img/state.png) no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}
	
	.upImg {
		height: 90upx;
		margin-left: 30upx;
	}

	.airStart,.airStart1 {
		display: flex;
		flex-direction: column;
		margin-left: 30upx;
		font-size: 12px;
		color: #333;
	}
	
	.airStart1 {
		height: 90upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 30upx;
		font-size: 14px;
		color: #333;
	}

	.startPlan {
		display: flex;
		align-items: center;
	}

	.startPlan>view {
		padding: 0 10upx;
		border: 1px solid #DE2910;
		border-radius: 4px;
		font-size: 12px;
		color: #DE2910;
		margin-left: 20upx;
	}

	.startTime {
		display: flex;
		align-items: center;
	}

	.airBottom {
		width: 100%;
		height: 80upx;
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
		background: #FE9423;
		font-size: 14px;
		color: #fff;
		padding-left: 30upx;
	}

	.list-start {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 390upx;
		background: #fff;
	}

	.list-wrapper {
		display: flex;
		flex-direction: column;
		border-bottom: 8px solid #F8F8F8;
	}

	.startName {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.msg {
		width: 44upx;
		margin-right: 20upx;
	}

	.airMask {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx;
		box-sizing: border-box;
	}

	.mask-left,.mask-left1,.mask-left2 {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		font-size: 12px;
		color: #333;
		text-align: center;
	}
	
	.mask-left {
		background: url(../../static/img/chengyuan.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.mask-left1 {
		background: url(../../static/img/chengyuan1.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.mask-left2 {
		background: url(../../static/img/chengyuan.png) no-repeat;
		background-size: 100% 100%;
	}

	.leftTime {
		font-size: 24px;
		color: #FE9423;
		margin-bottom: 12upx;
	}

	.mask-right {
		height: 240upx;
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: space-around;
	}

	.right-item {
		width: 55%;
		height: 100upx;
		background: #eee;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		font-size: 12px;
		color: #333;
	}
	
	.airName {
		width: 100%;
		border-left: 2px solid #DE2910;
		padding-left: 30upx;
	}
	
	.list-wrappers {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.list-wrappers>img {
		width: 70%;
	}
	
	.airSet {
		width: 70%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #999;
	}
</style>
