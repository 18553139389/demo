<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :isIcon="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">评价页面</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="list_content">
				<img class="c_img" :src="list.image" alt="">
				<view class="c_content">
					<view class="order_cont">{{list.title}}</view>
					<view v-if="list.type == 2" style="color: #DE2910;font-size: 12px;">纪念币: {{list.point}}</view>
					<view class="money">
						<view v-if="list.type == 1" style="color: #DE2910;font-size: 14px;">{{list.oldPrice}}</view>
						<view v-if="list.type == 2" style="color: #DE2910;font-size: 14px;">{{list.price}}</view>
						<view v-if="list.type == 3" style="color: #DE2910;font-size: 14px;">纪念币:{{list.point}}</view>
					</view>
				</view>
			</view>
			<view class="comment">
				<textarea v-model="val" placeholder-style="color:#999;font-size:12px;" placeholder="请留下您对该商品的评价" />
				</view>
			<view class="submit" @tap="goSubmit">提交评价</view>
		</view>
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
				list: {},
				val: '',
				ids: ''
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			this.ids = option.id
		},
		methods: {
			goSubmit() {
				if(val == ''){
					Toast('评价内容不能为空')
					return
				}
				
				if(val.length >= 200){
					Toast('评价内容不能超过200字')
					return
				}
				
				let self = this
				let datas = {
					uid: this.$store.state.uid,
					orderId: this.ids,
					content: this.val
				}
				let data = {
					url: '/api/gzh/addProductOrderComment',
					data: datas,
					success: function(res){
						console.log(res)
						if (res.data.result == 0) {
							Toast('提交成功')
							setTimeout(function(){
								uni.navigateBack({
									delta: 2
								})
							},500)
						}
					}
				}
				ajaxs(data)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}
	
	.contain {
		width: 100%;
		height: 100%;
	}
	
	.list {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.list_content {
		width: 100%;
		display: flex;
		font-size: 14px;
		color: #666;
	}
	
	.c_img {
		width: 160upx;
		height: 160upx;
		border-radius: 4px;
	}
	
	.c_content {
		width: 80%;
		padding-left: 30upx;
		box-sizing: border-box;
		height: 160upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.money {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.order_cont {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.comment {
		width: 100%;
		height: 300upx;
		background: #fff;
		border-radius: 4px;
		margin-top: 30upx;
	}
	
	textarea {
		width: 100%;
		height: 100%;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #333;
	}
	
	.submit {
		width: 80%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 60upx;
		background: #DE2910;
		text-align: center;
		font-size: 14px;
		color: #fff;
		margin: 40upx auto 0;
	}
</style>
