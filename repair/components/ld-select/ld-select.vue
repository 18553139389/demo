<template>
	<view class="main">
		<view class="input" :style="disabled?'background-color:#f5f7fa':''">
			<input @click="showModal" v-model="bValue" :style="disabled?'color:#c0c4cc':''" :placeholder="placeholder" disabled/>
			<text v-if="clearable&&!disabled" @click="empty" class="selectIcon iconcross"></text>
		</view>
		<view class="select-modal" :class="isShowModal?'show':''" @tap="hideModal">
			<view class="select-dialog" @tap.stop="" :style="{backgroundColor:bgColor}">
				<!-- <view class="select-bar bg-white">
					<view class="action text-blue" @tap="cancelClick">{{cancelText}}</view>
					<view class="action text-green" @tap="confirmClick">{{confirmText}}</view>
				</view> -->
				<view class="select-content">
					<view class="select-item" v-for="(item,index) in list" :key="index"
					:style="valueIndexOf(item)?'color:'+selectColor+';background-color:'+selectBgColor+';':'color:'+color+';'"
					@click="select(item)">
						<view class="title">{{getListKeyValue(item)}}</view>
						<text class="selectIcon icongou" v-show="valueIndexOf(item)"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {Function} from './eval5.min.js';
	export default {
		data() {
			return {
				isShowModal:false,
				sValue: null,
				bValue: ""
			};
		},
		props: {
			value:[String,Array],
			placeholder:{ // 占位符
				default: "",
				type: String
			},
			multiple:{ // 是否多选
				default: false,
				type: Boolean
			},
			list: {
				default: () => [],
				type: Array
			},
			valueKey:{ // 指定list中valueKey的值作为下拉框绑定内容
				default: null,
				type: String
			},
			listKey:{ // 指定list中listKey的值作为下拉框显示内容
				default: null,
				type: String
			},
			disabled: {
				default: false,
				type: Boolean
			},
			clearable:{
				default: false,
				type: Boolean
			},
			cancelText:{
				default: "取消",
				type: String
			},
			confirmText:{
				default: "确定",
				type: String
			},
			color:{
				default: "#000000",
				type: String
			},
			selectColor:{
				default: "#0081ff",
				type: String
			},
			bgColor:{
				default: "#F1F1F1",
				type: String
			},
			selectBgColor:{
				default: "#FFFFFF",
				type: String
			}
		},
		watch: {
			sValue (val) {
				this.bValue = this.getBValye(val)
				this.$emit('change', val)
			}
		},
		created() {
			if(Array.isArray(this.value)){
				this.sValue = this.value?this.value:[]
			} else {
				this.sValue = this.value
			}
		},
		methods: {
			getBValye(val){ // 将数组值转换为以,隔开的字符串
				if(val.length>0){
					if(Array.isArray(val)){
						let chooseAttr = []
						val.forEach(item=>{
							let choose = this.list.find(temp => {
								let val_val = this.getValueKeyValue(temp)
								return item === val_val
							})
							chooseAttr.push(choose)
						})
						let values = chooseAttr.map(temp => this.getListKeyValue(temp)).join(',')
						return values
					} else {
						let choose = this.list.find(temp => {
							let val_val = this.getValueKeyValue(temp)
							return val === val_val
						})
						return this.getListKeyValue(choose)
					}
				} else {
					return ""
				}
			},
			select(item){
				let val = this.getValueKeyValue(item);
				if(this.multiple){
					let index = this.sValue.indexOf(val);
					if(index!=-1){
						this.sValue.splice(index,1)
					} else {
						this.sValue.push(val)
					}
				} else {
					this.sValue = val
					this.hideModal()
				}
			},
			valueIndexOf(item){
				if(this.valueKey){
					return this.value.indexOf(this.evil(item))!=-1
				} else {
					return this.value.indexOf(item)!=-1
				}
			},
			getListKeyValue(item){
				if(this.listKey){
					let func = new Function('item', 'return ' + 'item.'+this.listKey);
					return func(item)
				} else {
					return item
				}
			},
			getValueKeyValue(item){
				if(this.valueKey){
					return this.evil(item)
				} else {
					return item
				}
			},
			evil(item){
				let func = new Function('item', 'return ' + 'item.'+this.valueKey);
				return func(item)
			},
			empty(){
				if(this.multiple){
					this.sValue = []
				} else {
					this.sValue = ''
				}
			},
			cancelClick(){ // 点击取消
				this.$emit('cancel', this.sValue)
				this.hideModal()
			},
			confirmClick(){ // 点击确定
				this.$emit('confirm', this.sValue)
				this.hideModal()
			},
			showModal(){
				if(!this.disabled){
					this.isShowModal = true
				}
			},
			hideModal(){
				this.isShowModal = false
			}
		}
	}
</script>
<style>	
	@font-face {font-family: "selectIcon";
	  src: url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.eot?t=1590375117208'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.eot?t=1590375117208#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMEAAsAAAAABvQAAAK4AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBRIFCATYCJAMMCwgABCAFhQUHNRsfBsg+QCa3uoO0oAJTMwhxVu965keqWBy1hkbwtfzWb2Z279/shRhJisKF6FApKLI7oyBbpAaHo3w24k+ca9EUJbDmjaeznUdZ/FOUlkWdJ33rizZY/Pw6J5Xw0qKYxHTMesePHVT6EFpaC4zV70sKi2bYgNPc1w0WHnDVC/e/UnNTgyP+4Jq6BBpIHoisgypLaIAFEtU0wgeaIG8Yu4nAIZwnUK1QgFfOT6nUUoBpgXjj2lqplTMpiuXtCW3N2iK+aPTS2/Qdnzny8d+5IEiaDMy99exklra//FrKnX48pChmgrq5QcYRQCEe17ruqgqLAKv8WntwqwhpLms/nB5yW/iHRxJEC0QOgT3NnfgF01NBKvOuIzNoZdh5gJuAeGrsozE8vOJ7u5D832oz55039W5G+S52K0H+zNf1TJz07k26kqoQybRfwVFV4rjDS/K8EXUyuF1cXnT3weKS9Rvdm/xe7h8oA1hLwOR18R+Y4n4zwpr4z5SU089Vc+cpfWL+mn5APmT3Z39jeOs/GbWjK+DnmsuL/u6ehMX4j4yedSVkAUUuPh3TY022MtKZUEOtPqCb8Bkvnr5XT6imU0gGrEJW7aAL/gw0OhegVV2F6pC7uTOppirKIA4MFQhTrpCM+AbZlDu64L/QmAkQWlMhQXU75D07O9Gtl0PUYjTBLyAzOLNQYtypIEEjvsXtBLQTooV2nrQrGEau2gKmZlR4L8gwnGtBJbUn1diCOOQUnEkTkRAOeci9KHOQxvFro+tx3ZcGAaeljstCSBNDJuArgIyBYyy6OdZxAhHIELu1IC9AtgShCVtLltEKrSff1XoHJo3RC33hM63o3j6pSNkmqmIWEAtxFHB2OwoRBAfyeqE3r2ogHeF42dBhs7gvf7CukH5MmlUGOCpHihxFfs6TehDyKCqVAA==') format('woff2'),
	  url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.woff?t=1590375117208') format('woff'),
	  url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.ttf?t=1590375117208') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_1833441_ycfzdhg2u3.svg?t=1590375117208#selectIcon') format('svg'); /* iOS 4.1- */
	}
	
	.selectIcon {
	  font-family: "selectIcon" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icongou:before {
	  content: "\e61c";
	}
	
	/* .iconcross:before {
	  content: "\e61a";
	} */

</style>
<style lang="scss" scoped>
	.main{
		font-size: 28rpx;
	}
	.bg-white{
		background-color: #FFFFFF;
	}
	.text-blue{
		color: #0081ff;
	}
	.text-green{
		color: #39b54a;
	}
	.input {
		display: flex;
		align-items:center;
		font-size: 28rpx;
		height: 60rpx;
		padding: 0;
		border-radius: 10rpx;
		border-style: solid;
		border-width: 0;
		border-color: rgba(0, 0, 0, 0.1);
		input{
			width: 100%;
			padding-left: 40rpx;
			font-size: 28rpx;
			margin-top: 4rpx;
		}
	}
	.select-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000rpx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
		margin-bottom: -1000rpx;
		&::before {
			content: "\200B";
			display: inline-block;
			height: 100%;
			vertical-align: bottom;
		}
		.select-dialog {
			position: relative;
			display: inline-block;
			margin-left: auto;
			margin-right: auto;
			background-color: #f8f8f8;
			overflow: hidden;
			width: 100%;
			border-radius: 0;
			.select-content{
				max-height: 620rpx;
				overflow:auto;
				.select-item{
					padding: 20rpx;
					display: flex;
					.title{
						width: 95%;
					}
				}
			}
		}
	}
	.select-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
		margin-bottom: 0;
	}
	.select-bar {
		padding: 0 20rpx;
		display: flex;
		position: relative;
		align-items: center;
		min-height: 80rpx;
		justify-content: space-between;
		.action {
			display: flex;
			align-items: center;
			height: 100%;
			justify-content: center;
			max-width: 100%;
		}
	}
</style>
