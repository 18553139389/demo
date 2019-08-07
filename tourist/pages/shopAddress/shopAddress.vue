<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">收货地址</block>
			</cu-custom>
		</view>
		<view class="lists">
			<view class="list" v-for="(v,k) in list" :key="k" @tap="saveDefault(v.id)">
				<view class="address">
					<view>{{v.city + v.address}}</view>
					<view class="msg">
						<view>{{v.username}}</view>
						<view style="margin-left: 30upx;">{{v.phone}}</view>
					</view>
				</view>
				<img class="editors" src="../../static/img/editors.png" alt="" @tap.stop="editor(v.id)">
			</view>
		</view>
		<view class="buy" @tap="addAddress">新增地址</view>
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
				list: []
			}
		},
		onShow() {
			let self = this
			let datas = {
				uid: this.$store.state.uid
			}
			let data = {
				url: '/api/gzh/receiverList',
				data: datas,
				success: function(res){
					console.log(res)
					if(res.data.result == 0){
						self.list = res.data.dataList
					}
				}
			}
			ajax(data)
		},
		methods: {
			addAddress() {
				uni.navigateTo({
					url: '../addAddress/addAddress?type=0'
				})
			},
			saveDefault(id) {
				for(let i=0;i<this.list.length;i++){
					if(this.list[i].id == id){
						this.$store.commit('changeSaveAddress', this.list[i])
					}
				}
			},
			editor(id) {
				let list = {}
				for(let i=0;i<this.list.length;i++){
					if(this.list[i].id == id){
						list = JSON.stringify(this.list[i])
					}
				}
				uni.navigateTo({
					url: '../addAddress/addAddress?list=' + list + '&type=1'
				})
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}
	
	.lists {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		background: #fff;
		border-radius: 4px;
		box-shadow: 1px 0 4px #eee;
		margin-bottom: 30upx;
		padding: 24upx;
	}
	
	.address {
		width: 80%;
		display: flex;
		flex-direction: column;
	}
	
	.msg {
		display: flex;
		align-items: center;
		color: #999;
		margin-top: 30upx;
	}
	
	.editors {
		width: 50upx;
	}
	
	.buy {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
</style>
