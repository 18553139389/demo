<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">酒店介绍</block>
			</cu-custom>
		</view>
		<view class="hotel-produce">酒店介绍</view>
		<view class="content1">{{list.Contents}}</view>
		<view class="hotel-produce">酒店服务</view>
		<view class="content1">{{list.Service}}</view>
		<view class="hotel-produce">酒店交通</view>
		<view class="content1">
			<rich-text :nodes="list.Traffic"></rich-text>
		</view>
		<view class="hotel-produce">酒店地址</view>
		<view class="content1">{{list.Address}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#E73C1D',
				backColor: '#FFFFFF',
				list: {}
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			this.list.Traffic = this.list.Traffic.split('-').join('<br/>')
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
	
	.hotel-produce {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		padding: 0 30upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
	}
	
	.content1 {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #666;
		text-align: justify;
		background: #fff;
	}
</style>
