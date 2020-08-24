<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">东方航空MU563</block>
				<block slot="right">
					<img class="msg" src="../../static/img/tel.png" @tap="goCall" alt="">
				</block>
			</cu-custom>
		</view>
		<view class="plan">
			<view class="mode">计划</view>
			<view class="airStart">
				<text>预计起飞时间</text>
				<text style="margin-top: 16upx;font-size: 40upx;">16:40</text>
			</view>
		</view>
		<view class="list-start">
			<view class="startName">
				<img class="msg" src="../../static/img/flight.png" alt="">
				<text>伊宁 T2</text>
				<text style="margin-left: 20upx;">05-28 16:40</text>
			</view>
			<view class="startDetail">
				<view class="detail">
					<text>预计起飞</text>
					<text style="margin-top: 30upx;font-size: 40upx;">16:40</text>
				</view>
				<view class="detail">
					<text>值机柜台</text>
					<text style="margin-top: 30upx;font-size: 40upx;">D01-14</text>
				</view>
				<view class="detail">
					<text>登机口</text>
					<text style="margin-top: 30upx;font-size: 40upx;">G2</text>
				</view>
			</view>
			<view class="startName">
				<img class="msg" src="../../static/img/flight.png" alt="">
				<text>克拉玛依 T2</text>
				<text style="margin-left: 20upx;">05-28 17:30</text>
			</view>
			<view class="startDetail">
				<view class="detail">
					<text>预计到达</text>
					<text style="margin-top: 30upx;font-size: 40upx;">17:30</text>
				</view>
				<view class="detail">
					<text>值机柜台</text>
					<text style="margin-top: 30upx;font-size: 40upx;">D01-14</text>
				</view>
				<view class="detail">
					<text>到达口</text>
					<text style="margin-top: 30upx;font-size: 40upx;">G3</text>
				</view>
			</view>
		</view>
		<model 
		:show="show" 
		@confirm="confirm"
		@cancel="cancel"
		title="机场问询电话" 
		content="是否拨打电话13253359082" 
		>
		</model>
	</view>
</template>

<script>
	import model from '../../components/model/model.vue'
	export default {
		data() {
			return {
				Color: '#333333',
				value: '',
				backColor: '#F8F8F8',
				show: false
			}
		},
		components: {
			model
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
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
			goCall() {
				this.show = true
			},
			confirm() {
				this.show = false
			},
			cancel() {
				this.show = false
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
	
	.msg {
		width: 40upx;
		height: 40upx;
		margin-right: 30upx;
	}
	
	.plan {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
		border-bottom: 10px solid #eee;
	}
	
	.mode {
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
	
	.airStart {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 30upx;
		font-size: 12px;
		color: #333;
	}
	
	.list-start {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.startName {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
	}
	
	.startDetail {
		width: 100%;
		padding: 30upx 100upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 10px solid #eee;
	}
	
	.detail {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
