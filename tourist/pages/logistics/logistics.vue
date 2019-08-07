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
						<view style="margin: 0 20upx;">新鲜水果</view>
					</view>
					<view class="states">待发货</view>
				</view>
				<view class="list_content">
					<img class="c_img" src="../../static/img/list.jpg" alt="">
					<view class="c_content">
						<view>新鲜橙子</view>
						<view class="money">
							<view><text style="color: #DE2910;font-size: 16px;">5.5</text>元/斤</view>
							<view>x1</view>
						</view>
					</view>
				</view>
			</view>
			<van-steps direction="vertical" :active="0" active-color="#DE2910">
				<van-step>
					<h3>物流状态1</h3>
					<p>2016-07-12 12:40</p>
				</van-step>
				<van-step>
					<h3>物流状态2</h3>
					<p>2016-07-11 10:00</p>
				</van-step>
				<van-step>
					<h3>快件已发货</h3>
					<p>2016-07-10 09:30</p>
				</van-step>
			</van-steps>
		</view>
	</view>
</template>

<script>
	import {
		Step,
		Steps
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF'
			}
		},
		components: {
			Step,
			Steps
		},
		methods: {

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
	}
</style>
