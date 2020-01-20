<template>
	<view class="contain">
		<view class="list">
			<view class="tit" v-if="list.complType == 1">环境保护</view>
			<view class="tit" v-if="list.complType == 2">国土资源</view>
			<view class="tit" v-if="list.complType == 3">食药安全</view>
			<view class="tit" v-if="list.complType == 4">国土安全</view>
			<view class="tit" v-if="list.complType == 5">国有财产</view>
			<view class="tit" v-if="list.complType == 6">英烈保护</view>
			<view class="tit" v-if="list.complType == 7">其他</view>
			<view class="msg">
				<view>{{list.location}}</view>
				<view>{{list.createDate}}</view>
			</view>
			<view class="content">{{list.content}}</view>
			<view class="wrap">
				<block v-for="(v,k) in imgData" :key="k">
					<image class="imgs" :src="url + v" mode="widthFix" alt=""></image>
				</block>
			</view>
			<view class="tit">举报人</view>
			<view class="user">
				<img :src="head" alt="">
				<view style="margin-left: 20upx;">{{list.cname}}</view>
				<view style="margin-left: 60upx;">{{list.telnum}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import global_ from '../../common/js/global.js'
	export default {
		data() {
			return {
				list: {},
				imgData: [],
				url: global_.baseUrl,
				head: ''
			}
		},
		onLoad(option) {
			this.list = JSON.parse(option.list)
			this.imgData = this.list.material.split('|')
			this.head = this.$store.state.head
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #ffffff;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		border-top: 1px solid #eee;
	}
	
	.list {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-bottom: 30upx;
	}
	
	.tit {
		width: 100%;
		font-size: 16px;
		color: #333;
		font-weight: 600;
	}
	
	.content {
		width: 100%;
		font-size: 14px;
		color: #333;
		text-align: justify;
		margin-top: 20upx;
	}
	
	.msg {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #999;
		margin-top: 20upx;
	}
	
	.wrap {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 30upx;
	}
	
	.imgs {
		width: 100%;
		margin-top: 30upx;
	}
	
	.user {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 30upx;
	}
	
	.user>img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
</style>
