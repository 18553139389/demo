<template>
	<view class="jPicker">
		<view class="showLine">
			<view v-if="listData.length>0&&nSel!=-1">
				{{listData[nSel][showKey]||listData[nSel]}}
			</view>
			<view style="color:#7d7d7d;" v-else>
				未选择
			</view>
		</view>

		<view class="pickerMask" v-if="pickerVisable" @click.stop="pickerVisable=false">
			<view class="alertArea JAnimateBtmIn" @click.stop="doNothing">
				<!-- <view class="searchInput " v-if="searchPosition=='top'">
					<view class="clickArea">
						<input class="jInput" placeholder-style="color:#ffffff"  @input="filterOp" placeholder="搜索列表..." />
						<icon  class="searchLogo" type="search" />
					</view>
				</view> -->
				<view class="pickerTop">
					<view class="lefBtn" @click="cancelSel">取消</view>
					<view class="midInput">
						<template v-if="searchPosition=='middle'">
							<input class="searchArea" @input="filterOp" />
							<!-- <image class="searchIcon" src="../../static/search.png"></image> -->
							<icon class="searchIcon" type="search" />
						</template>
					</view>
					<view class="rigBtn" :style="{color:sureColor}" @click="sureSelect">确定</view>
				</view>
				<picker-view :value="[nSel]" class="pickerView" :mask-style="'background-color:'+bgColor" :indicator-style="selStyle"
				@change="selChange">
					<picker-view-column>
						<view class="opItem" v-for="(item,index) in listData" :key="index">{{item[showKey]||item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>

</template>

<script>
	/**
	 * 选择组件  
	 * @property {Array} options 选择数组  
	 * @property {String} showKey 显示的对象键名 
	 * @property {String} val 默认选中下标 
	 * @property {String} valKey 取值的对象键名
	 * @property {Boolean} disabled 是否只读  
	 * @event {Function} position 搜索框位置  
	 * @event {Function} sure 确认事件  
	 * @example <jPicker :disabled="false" class="cont" @sure="bindPickerChange($event,'TYPE')" showKey="Name" valKey="Value" :val="CurrentType" :options="FilterArray" />
	 */
	export default {
		name: 'jPicker',
		data() {
			return {
				listData: this.options,
				nSel: -1,
				nSel1: -1,
				pickerVisable: false,
				searchPosition: "middle",
				//picker样式
				// unSelStyle:'',
				//'background-color:rgba(0, 74, 255, 0.44);',//'background-color:rgba(220, 250, 9, 0.44);',rgba(250, 9, 9, 0.44)
				selStyle: 'height:50px;',
			}
		},
		props: ["options", "showKey", "valKey", "val", "position", "disabled", "bgColor", "sureColor"],
		//选项数组，列表显示的对象键名，取值的对象键名,默认选中值,搜索框位置,是否禁用,整体背景色,确认键颜色
		watch: {
			options(n) {
				this.listData = n;
				this.selByValKey();
			},
			val(n) {
				this.selByValKey();
			},
		},
		mounted() {
			this.selByValKey();
			if (this.position) {
				this.searchPosition = this.position;
			}
		},
		methods: {
			showPicker() {
				if (this.disabled) {
					return;
				}
				this.pickerVisable = true;
				this.listData = this.options;
			},
			cancelSel() {
				this.pickerVisable = false
				if (this.val) {
					if (this.valKey) {
						let n = this.listData;
						for (let j = 0, len = n.length; j < len; j++) {
							if (n[j][this.valKey] == this.val) {
								this.nSel = j;
								break;
							}
						}
					} else {
						this.nSel = this.val;
					}
				} else {
					this.nSel = -1;
				}
			},
			sureSelect() {
				this.pickerVisable = false;
				this.nSel = this.nSel1
				if (this.listData.length == 0) {
					// uni.showToast({
					// 	title:"未选中"
					// })
					this.$emit("sure", {});
				} else {
					let obj = {
						pickerVal: this.nSel,
						pickerName: this.nSel == -1 ? this.listData[0] : this.listData[this.nSel],
					};
					if (this.valKey) {
						// obj=this.nSel == -1?this.listData[0]:this.listData[this.nSel];
						// obj.pickerVal = obj[this.valKey];//2020-01-10
						if (this.nSel != -1) {
							obj = this.listData[this.nSel];
							obj.pickerVal = obj[this.valKey];
						} else {
							//obj.pickerVal=-1;
							obj = this.listData[0]
							obj.pickerVal = obj[this.valKey];
						}
					}

					this.$emit("sure", obj);
				}
			},
			selChange(e) {
				this.nSel1 = e.detail.value[0]
			},
			filterOp(e) {
				//console.log(e.detail.value);
				let keyWord = e.detail.value;
				if (keyWord != "") {
					keyWord = keyWord.toLowerCase();
					let oldArr = this.options;
					this.listData = [];
					this.nSel = 0;
					for (let i = 0; i < oldArr.length; i++) {
						let theVal = oldArr[i];
						if (this.showKey) {
							theVal = oldArr[i][this.showKey];
						}
						if (theVal.toString().toLowerCase().indexOf(keyWord) > -1) {
							this.listData.push(oldArr[i]);
						}
					}
				} else {
					this.listData = this.options;
					this.nSel = this.val ? this.val : -1;
					this.selByValKey();
				}
			},
			selByValKey() {
				let n = this.options;
				this.listData = n;
				if (this.valKey) { //看看指定了选中值的键名否，没有则默认为数据源index		

					for (let j = 0, len = n.length; j < len; j++) {
						if (n[j][this.valKey] == this.val) {
							this.nSel = j;
							break;
						}
					}
				} else {
					this.nSel = this.val;
				}
			},
			doNothing() {
				//nothing
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jPicker {
		width: 100%;

		.showLine {
			// border-left:1px solid #000000;
			width: 100%;
			display: inline-block;
		}
	}

	.pickerMask {
		background-color: rgba(0, 0, 0, 0.5);
		height: 100vh;
		width: 100vw;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999999;
	}

	.alertArea {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		// border-radius: 10px 10px 0 0;

		.searchInput {
			width: 100%;
			position: relative;

			.clickArea {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 36px;

				.jInput {
					text-align: left;
					width: 90%;
					border: none;
					height: 30px;
					font-size: 17px;
					// border-radius: 20px;
					padding: 2px 8px;
					box-sizing: border-box;
					// background-color: #efefef;
					color: #ffffff;
				}

				.searchLogo {
					width: 30px;
					height: 30px;
					line-height: 30px;
					text-align: center;
				}
			}

			&:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: #678699;
				filter: blur(18px);
				z-index: -1;
			}
		}

		.pickerTop {
			background-color: #FFFFFF;
			height: 52px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eeeeee;
			font-size: 18px;
			box-sizing: border-box;
			justify-content: space-around;

			.lefBtn,
			.rigBtn {
				// display: inline-block;
				// vertical-align: top;
				font-size: 32rpx;
				// width: 18%;
				line-height: 1rem;
				// text-align: center;
				// padding: 5px 0;
				// height: 1.4em;
			}

			.rigBtn {
				color: #31C231;
			}

			.midInput {
				width: 64%;
				height: 30px;
				position: relative;
				line-height: 30px;

				// display: flex;
				// align-items: center;
				// justify-content: center;
				.searchArea {
					text-align: left;
					background-color: #efefef;
					border-radius: 20px;
					padding: 4px 10px;
				}

				.searchIcon {
					position: absolute;
					right: 5px;
					top: 0px;
					width: 30px;
					height: 30px;
					text-align: center;
					display: flex;
					align-items: center;
				}
			}
		}


		.pickerView {
			background-color: #FFFFFF;
			width: 100%;
			height: 300px;
			// margin-top:20upx;
			left: 0;

			.opItem {
				line-height: 50px;
				text-align: center;
				background-color: #f3f3f3;
				color: #000000;
			}
		}

	}

	.JAnimateBtmIn {
		animation: btmIn 0.3s ease;
	}

	@keyframes btmIn {
		0% {
			transform: translateY(666px);
		}

		100% {
			transform: translateY(0);
		}
	}
</style>
