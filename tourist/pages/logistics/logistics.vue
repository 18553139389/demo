<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">查看物流</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="wrapper">
				<view class="list_title">
					<view class="title_left">
						<img class="icon" src="../../static/img/detail.png" alt="">
						<view style="margin: 0 20upx;">{{list.title}}</view>
					</view>
					<view class="states" v-if="list.state == 1">待发货</view>
					<view class="states" v-if="list.state == 2">待收货</view>
					<view class="states" v-if="list.state == 3">已完成</view>
				</view>
				<view class="list_content">
					<img class="c_img" :src="list.image" alt="">
					<view class="c_content">
						<view>{{list.title}}</view>
						<view v-if="list.type == 1" style="color: #DE2910;font-size: 12px;">纪念币：0</view>
						<view v-if="list.type == 2" style="color: #DE2910;font-size: 12px;">纪念币: {{list.point}}</view>
						<view v-if="list.type == 3" style="color: #DE2910;font-size: 12px;">纪念币: {{list.point}}</view>
						<view class="money">
							<view v-if="list.type == 1" style="color: #DE2910;font-size: 16px;">{{list.oldPrice}}</view>
							<view v-if="list.type == 2" style="color: #DE2910;font-size: 16px;">{{list.price}}</view>
							<view v-if="list.type == 3" style="color: #DE2910;font-size: 16px;">￥0</view>
							<view>x{{list.qty}}</view>
						</view>
					</view>
				</view>
				<view class="no" v-if="!show">请耐心等待，此商品会尽快安排发货！</view>
			</view>
			<van-steps direction="vertical" :active="active" active-color="#DE2910" v-if="show">
				<van-step v-for="(v,k) in listData" :key="k">
					<h3>{{v.AcceptStation}}</h3>
					<p>{{v.AcceptTime}}</p>
				</van-step>
			</van-steps>
		</view>
	</view>
</template>

<script>
	import {
		Step,
		Steps,
		Toast
	} from 'vant'
	import {
		ajax
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				list: {},
				listData: [],
				show: false,
				active: 0
			}
		},
		components: {
			Step,
			Steps
		},
		onLoad(option) {
			console.log(JSON.parse(option.list))
			this.list = JSON.parse(option.list)
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				if (this.list.expressCode != '' && this.list.expressNo != '') {
					this.show = true
					let datas = {
						expressCode: this.list.expressCode,
						expressNo: this.list.expressNo
					}
					let data = {
						url: '/api/gzh/deliveryInfo',
						data: datas,
						success: function(res) {
							if (res.data.result == 0) {
								console.log(res)
								for (var i = 0; i <= res.data.dataList.length; i++) {
									self.listData.push(res.data.dataList.pop());
								}
								self.active = 0
							} else {
								Toast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				}
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		/* height: 100%; */
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
		margin-top: 30upx;
	}

	.wrapper {
		width: 100%;
		background: #fff;
		border-radius: 4px;
		padding: 20upx;
		box-sizing: border-box;
	}

	.list_title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #666;
		margin-top: 30upx;
	}

	.title_left {
		display: flex;
		align-items: center;
	}

	.icon {
		width: 40upx;
	}

	.list_content {
		width: 100%;
		display: flex;
		font-size: 14px;
		color: #666;
		margin-top: 50upx;
		padding-bottom: 40upx;
		border-bottom: 1px dashed #eee;
	}

	.c_img {
		width: 160upx;
		height: 160upx;
		border-radius: 4px;
	}

	.c_content {
		flex: 1;
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

	h3 {
		font-size: 14px;
		margin-bottom: 20upx;
		font-weight: 500;
	}

	.no {
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		text-align: center;
		font-size: 14px;
		color: #333;
	}
</style>
