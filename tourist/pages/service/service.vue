<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">申请售后</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="wrapper">
				<textarea class="content" v-model="val" placeholder="请输入售后说明" />
				</view>
			<view class="wrapper imgs" style="padding-right: 0;margin-top: 40upx;">
				<van-uploader v-model="fileList" multiple :max-count="5" :after-read="afterRead">
					<view class="picture first">
						<img src="../../static/img/picture.png" alt="">
						<view style="font-size: 12px;color: #c3c0c0;">上传凭证</view>
					</view>
				</van-uploader>
				<view class="picture" v-for="(v,k) in fileList" :key="k" style="width: 21%;border: none;position: relative;" @tap="imgPreview">
					<img :src="v" alt="" style="width: 100%;height: 100%;border-radius: 4px;">
					<view class="del" @tap.stop="delImg(k)">
						<img src="../../static/img/del1.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<view class="buy" @tap="goOrder">提交申请</view>
	</view>
</template>

<script>
	import { Uploader, Toast, ImagePreview } from 'vant'
	import {
		ajax
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				val: '',
				fileList: [],
				ids: ''
			}
		},
		components: {
			Uploader,
			Toast
		},
		onLoad(option) {
			this.ids = option.id
		},
		methods: {
			afterRead(e) {
				if(this.fileList.length >= 5){
					Toast('最多上传5张照片')
					return 
				}else{
					this.fileList.push(e.content)
				}
			},
			imgPreview() {
				ImagePreview(this.fileList)
			},
			delImg(k) {
				this.fileList.splice(k,1)
			},
			goOrder() {
				if(this.val == ''){
					Toast('提交内容不能为空')
					return
				}
				let self = this
				let imgs = ''
				if(this.fileList.length == 1){
					imgs = this.fileList[0]
				}else if(this.fileList.length > 1){
					imgs = this.fileList.join('|')
				}
				let datas = {
					orderId: this.ids,
					content: this.val,
					images: imgs
				}
				let data = {
					url: '/api/gzh/addProductService',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							Toast('提交成功')
						}
					}
				}
				ajax(data)
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
		box-shadow: 1px 1px 5px #eee;
	}
	
	.content {
		width: 100%;
		height: 260upx;
		border: none;
		font-size: 14px;
		color: #333;
	}
	
	.imgs {
		width: 100%;
		overflow: hidden;
		/* display: flex;
		flex-wrap: wrap; */
		font-size: 14px;
		color: #333;
	}
	
	.picture {
		float: left;
		width: 100%;
		margin-right: 4%;
		height: 140upx;
		border: 1px dashed #eee;
		border-radius: 6px;
		margin-bottom: 20upx;
	}
	
	.first {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.first>img {
		width: 70upx;
	}
	
	.van-uploader {
		width: 21%;
		height: 140upx;
		float: left;
		margin-right: 4%;
	}
	
	.del {
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		background: #DE2910;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: -15upx;
		top: -15upx;
	}
	
	.del>img {
		width: 30upx;
		height: 30upx;
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
