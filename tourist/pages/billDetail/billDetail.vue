<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">开具发票</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list-top">
				<view class="state">发票详情</view>
			</view>
			<view class="list">
				<view class="list-item">
					<view style="width: 32%;">备注说明：</view>
					<view class="forms">
						<input type="text" v-model="remark" placeholder="填写备注说明" placeholder-class="input-placeholder">
					</view>
				</view>
				<view class="list-item">
					<view style="width: 32%;">地址和电话：</view>
					<view class="forms">
						<input type="text" v-model="location" placeholder="填写地址和电话" placeholder-class="input-placeholder">
					</view>
				</view>
				<view class="list-item">
					<view style="width: 32%;">开户行和账号：</view>
					<view class="forms">
						<input type="text" v-model="order" placeholder="填写开户行和账号" placeholder-class="input-placeholder">
					</view>
				</view>
			</view>
		</view>
		<view class="look" @tap="goCheck">确定</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				remark: '',
				location: '',
				order: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
		},
		onShow() {
			if(this.$store.state.billRemark){
				this.remark = this.$store.state.billRemark
			}
			
			if(this.$store.state.billLocation){
				this.location = this.$store.state.billLocation
			}
			
			if(this.$store.state.billRemark){
				this.order = this.$store.state.billOrder
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
			goCheck() {
				this.$store.commit('changeBillRemark', this.remark)
				this.$store.commit('changeBillLocation', this.location)
				this.$store.commit('changeBillOrder', this.order)
				uni.navigateBack({
					delta: 1
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
		background: #FFFFFF;
	}
	
	.wrapper {
		width: 100%;
		border-top: 1px solid #eee;
		display: flex;
		flex-direction: column;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.list-top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0;
		box-sizing: border-box;
	}
	
	.state {
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
		font-size: 15px;
	}
	
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px dashed #eee;
	}
	
	.list-item {
		width: 100%;
		display: flex;
		height: 70upx;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
	}
	
	.input-placeholder {
		font-size: 14px;
		color: #999;
	}
	
	.forms {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.forms>input {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
	}
	
	.look {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #E73C1D;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
