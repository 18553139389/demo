<template>
	<view class="contain">
		<view class="top">
			<view class="title">
				<text class="cuIcon-back back" @tap="back"></text>
				<view>{{city1}}</view>
				<img src="../../static/img/single.png" alt="">
				<view>{{city2}}</view>
			</view>
		</view>
		<view class="result">
			<view class="clock">
				<view class="location">
					<view style="margin-bottom: 16upx;font-size: 18px;">{{list.GoTime}}</view>
					<view>{{list.StartStation}}</view>
				</view>
				<view class="guide">
					<view>{{list.TrainCode}}</view>
					<img src="../../static/img/list.png" alt="">
					<view>{{hour(list.RunTime)}}</view>
				</view>
				<view class="location">
					<view style="margin-bottom: 16upx;font-size: 18px;">{{list.ETime}}</view>
					<view>{{list.ToStation}}</view>
				</view>
			</view>
			<view class="choice" style="height: 80%;">
				<scroll-view scroll-y="true" style="height: 100%;">
					<van-radio-group v-model="radio" @change="choiceRadio">
						<van-cell-group>
							<block v-if="list.TrainType == 0">
								<van-cell clickable @click="radio = '商务座&'+list.SwzPrice+'&'+list.SwzNum" v-if="list.SwzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">商务座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.SwzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.SwzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'商务座&'+list.SwzPrice+'&'+list.SwzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '特等座&'+list.TdzPrice+'&'+list.TdzNum" v-if="list.TdzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">特等座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.TdzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.TdzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'特等座&'+list.TdzPrice+'&'+list.TdzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '一等座&'+list.YdzPrice+'&'+list.YdzNum" v-if="list.YdzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">一等座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YdzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YdzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'一等座&'+list.YdzPrice+'&'+list.YdzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '二等座&'+list.EdzPrice+'&'+list.EdzNum" v-if="list.EdzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">二等座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.EdzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.EdzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'二等座&'+list.EdzPrice+'&'+list.EdzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
							</block>
							<block v-if="list.TrainType == 1">
								<van-cell clickable @click="radio = '一等座&'+list.YdzPrice+'&'+list.YdzNum" v-if="list.YdzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">一等座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YdzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YdzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'一等座&'+list.YdzPrice+'&'+list.YdzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '二等座&'+list.EdzPrice+'&'+list.EdzNum" v-if="list.EdzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">二等座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.EdzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.EdzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'二等座&'+list.EdzPrice+'&'+list.EdzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '无座&'+list.WzPrice+'&'+list.WzNum" v-if="list.WzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">无座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.WzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.WzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'无座&'+list.WzPrice+'&'+list.WzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
							</block>
							<block v-if="list.TrainType == 2">
								<van-cell clickable @click="radio = '高级软卧&'+list.GjrwPrice+'&'+list.GjrwNum" v-if="list.GjrwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">高级软卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.GjrwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.GjrwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'高级软卧&'+list.GjrwPrice+'&'+list.GjrwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '软卧&'+list.RwPrice+'&'+list.RwNum" v-if="list.RwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">软卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.RwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.RwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'软卧&'+list.RwPrice+'&'+list.RwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬卧&'+list.YwPrice+'&'+list.YwNum" v-if="list.YwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬卧&'+list.YwPrice+'&'+list.YwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬座&'+list.YzPrice+'&'+list.YzNum" v-if="list.YzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬座&'+list.YzPrice+'&'+list.YzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '无座&'+list.WzPrice+'&'+list.WzNum" v-if="list.WzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">无座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.WzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.WzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'无座&'+list.WzPrice+'&'+list.WzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
							</block>
							<block v-if="list.TrainType == 3">
								<van-cell clickable @click="radio = '高级软卧&'+list.GjrwPrice+'&'+list.GjrwNum" v-if="list.GjrwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">高级软卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.GjrwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.GjrwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'高级软卧&'+list.GjrwPrice+'&'+list.GjrwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '软卧&'+list.RwPrice+'&'+list.RwNum" v-if="list.RwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">软卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.RwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.RwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'软卧&'+list.RwPrice+'&'+list.RwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬卧&'+list.YwPrice+'&'+list.YwNum" v-if="list.YwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬卧&'+list.YwPrice+'&'+list.YwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬座&'+list.YzPrice+'&'+list.YzNum" v-if="list.YzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬座&'+list.YzPrice+'&'+list.YzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '无座&'+list.YzPrice+'&'+list.YzNum" v-if="list.WzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">无座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.WzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.WzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'无座&'+list.YzPrice+'&'+list.YzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
							</block>
							<block v-if="list.TrainType == 4">
								<van-cell clickable @click="radio = '软卧&'+list.RwPrice+'&'+list.RwNum" v-if="list.RwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">软卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.RwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.RwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'软卧&'+list.RwPrice+'&'+list.RwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬卧&'+list.YwPrice+'&'+list.YwNum" v-if="list.YwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬卧&'+list.YwPrice+'&'+list.YwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '软座&'+list.RzPrice+'&'+list.RzNum" v-if="list.RzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">软座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.RzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.RzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'软座&'+list.YzPrice+'&'+list.RzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬座&'+list.YzPrice+'&'+list.YzNum" v-if="list.YzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬座&'+list.YzPrice+'&'+list.YzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '无座&'+list.YzPrice+'&'+list.YzNum" v-if="list.WzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">无座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.WzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.WzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'无座&'+list.YzPrice+'&'+list.YzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
							</block>
							<block v-if="list.TrainType == 9">
								<van-cell clickable @click="radio = '高级软卧&'+list.GjrwPrice+'&'+list.GjrwNum" v-if="list.GjrwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">高级软卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.GjrwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.GjrwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'高级软卧&'+list.GjrwPrice+'&'+list.GjrwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '软卧&'+list.RwPrice+'&'+list.RwNum" v-if="list.RwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">软卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.RwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.RwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'软卧&'+list.RwPrice+'&'+list.RwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬卧&'+list.YwPrice+'&'+list.YwNum" v-if="list.YwNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬卧</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YwPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YwNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬卧&'+list.YwPrice+'&'+list.YwNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '软座&'+list.RzPrice+'&'+list.RzNum" v-if="list.RzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">软座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.RzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.RzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'软座&'+list.YzPrice+'&'+list.RzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '硬座&'+list.YzPrice+'&'+list.YzNum" v-if="list.YzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">硬座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.YzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.YzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'硬座&'+list.YzPrice+'&'+list.YzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
								<van-cell clickable @click="radio = '无座&'+list.WzPrice+'&'+list.WzNum" v-if="list.WzNum != 0">
									<template slot="title">
										<text style="font-size: 12px;color: #333;margin-right: 20upx;">无座</text>
										<text style="font-size: 12px;color: #E02B11;margin-right: 20upx;display: inline-block;width: 80upx;">￥{{list.WzPrice}}</text>
										<text style="font-size: 12px;color: #666;">余票{{list.WzNum}}张</text>
									</template>
									<van-radio slot="right-icon" :name="'无座&'+list.WzPrice+'&'+list.WzNum" checked-color="#E02B11" icon-size="16px" />
								</van-cell>
							</block>
						</van-cell-group>
					</van-radio-group>
					<view class="add" @tap="airuser">添加乘客</view>
					<view class="tourist" v-for="(v,k) in addUsers" :key="k">
						<view class="tourist-item">
							<view style="width: 25%;">乘客</view>
							<view style="width: 65%;">{{v.username}}</view>
							<view class="del" @tap.stop="delUser(k)">
								<img style="width: 36upx;" src="../../static/img/delete.png" alt="">
							</view>
						</view>
						<view class="tourist-item">
							<view style="width: 25%;" v-if="v.cardType == 0">身份证</view>
							<view style="width: 25%;" v-if="v.cardType == 1">护照</view>
							<view style="width: 25%;" v-if="v.cardType == 4">港澳通行证</view>
							<view style="width: 25%;" v-if="v.cardType == 6">台湾通行证</view>
							<view>{{v.cardNo}}</view>
						</view>
					</view>
					<view class="link">
						<view style="width: 160upx;">联系人</view>
						<input type="text" v-model="linker" placeholder="请输入姓名" placeholder-class="input-placeholder">
					</view>
					<view class="link">
						<view style="width: 160upx;">联系电话</view>
						<input type="text" v-model="phone" placeholder="用于接收出票短信" placeholder-class="input-placeholder">
					</view>
					<view class="link">
						<view class="protect-content" @tap="showSafe">
							<view style="margin-right: 20upx;">保险</view>
							<img src="../../static/img/safe.png" alt="">
						</view>
						<view class="protect-content">
							<view style="margin-right: 30upx;color: #DE2910;">￥{{safePrice}}/份</view>
							<van-checkbox v-model="checked1" checked-color="#E02B11"></van-checkbox>
						</view>
					</view>
					<view class="link" @tap="showProduce">
						<view class="protect-content">
							<view style="margin-right: 20upx;">套餐选择</view>
							<view style="color: #666;">优享预定￥{{free}}</view>
						</view>
						<view class="protect-content">
							<img src="../../static/img/right.png" alt="">
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="bottom-nav">
			<view class="nav-left">
				<view style="color: #E02B11;font-size: 16px;">￥{{total}}</view>
				<view style="margin-left: 10upx;">订单总价</view>
			</view>
			<view class="buy" @tap="airPay">去付款</view>
		</view>
		<van-popup v-model="show1" position="bottom">
			<view class="safe" v-for="(v,k) in content" :key="k" @tap="hideSafe">{{v}}</view>
		</van-popup>
		<van-popup v-model="show2" position="bottom">
			<view class="editor">
				<view class="btns">
					<view @tap="cancel">取消</view>
					<view style="color: #E02B11;" @tap="confirm">确认</view>
				</view>
				<view class="editorList" @tap="addUser">
					<img src="../../static/img/add.png" alt="">
					<view>手动新增</view>
				</view>
				<van-radio-group v-model="radios" @change="choiceUser">
					<view class="userList" v-for="(v,k) in userList" :key="k">
						<view class="userLeft">
							<img src="../../static/img/editor.png" alt="" @tap="modifyUser(v.id)">
							<view class="userMsg">
								<view>{{v.username}}</view>
								<view style="color: #999;" v-if="v.cardType == 0">身份证: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 1">护照: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 4">港澳通行证: {{v.cardNo}}</view>
								<view style="color: #999;" v-if="v.cardType == 6">台湾通行证: {{v.cardNo}}</view>
							</view>
						</view>
						<van-radio :name="v.id" checked-color="#E02B11"></van-radio>
					</view>
				</van-radio-group>
			</view>
		</van-popup>
		<van-popup v-model="show3" position="bottom">
			<view class="safe" @tap="hideProduce">{{contents}}</view>
		</van-popup>
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
				Color: '#FFFFFF',
				value: '',
				backColor: '#DE2910',
				list: {},
				radio: '',
				radios: '',
				linker: '',
				phone: '',
				checked1: true,
				product: {},
				safePrice: 0,
				show1: false,
				show2: false,
				show3: false,
				content: '',
				safeCode: '',
				userList: [],
				addUsers: [],
				personFare: 0,
				seat: null,
				free: 0,
				contents: '',
				types: null,
				hand: 0
			}
		},
		computed: {
			city1() {
				return this.$store.state.train1
			},
			city2() {
				return this.$store.state.train2
			},
			total() {
				let total = 0
				if (this.addUsers.length == 0) {
					return total = 0
				} else {
					if (this.checked1) {
						total = this.addUsers.length * (parseFloat(this.personFare) + parseFloat(this.safePrice) + parseFloat(this.free))
					} else {
						total = this.addUsers.length * (parseFloat(this.personFare) + parseFloat(this.free))
					}
				}
				return total
			},
			total1() {
				let total = 0
				if (this.addUsers.length == 0) {
					return total = 0
				} else {
					if (this.checked1) {
						total = this.addUsers.length * (parseFloat(this.personFare) + parseFloat(this.safePrice) + parseFloat(this.hand)) 
					} else {
						total = this.addUsers.length * (parseFloat(this.personFare) + parseFloat(this.hand))
					}
				}
				return total
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.list = JSON.parse(option.list)
			console.log(this.list)
			this.init()
		},
		onShow() {
			this.user()
			console.log(this.addUsers)
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
			showProduce() {
				this.show3 = true
			},
			hideProduce() {
				this.show3 = false
			},
			init() {
				let self = this
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let data = {
					url: '/api/gzh/trainGetTrainBookPara',
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.product = res.data.Data.InsProducts[0]
							self.safePrice = self.product.SalePrice
							self.content = self.product.DetailDescription
							self.content = self.content.split('；')
							self.safeCode = self.product.ProductCode
							self.free = res.data.fee
							self.contents = res.data.content
							self.hand = res.data.Data.OutTicketPoundage
							uni.hideLoading()
						} else {
							Toast(res.data.resultNote)
							uni.hideLoading()
						}
					}
				}
				ajaxs(data)
			},
			user() {
				let self = this
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				//初始化乘机人列表数据
				let users = {
					uid: this.$store.state.uid
				}

				let user = {
					url: '/api/gzh/passengerList',
					data: users,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.userList = res.data.dataList
							let status = false
							let users = self.addUsers
							if (users.length > 0) {
								for (let i = 0; i < users.length; i++) {
									for (let j = 0; j < self.userList.length; j++) {
										if (users[i].id == self.userList[j].id) {
											status = true
										}
									}
									if (!status) {
										self.addUsers.splice(i, 1)
									}
								}
							}
							uni.hideLoading()
						} else {
							Toast(res.data.resultNote)
							uni.hideLoading()
						}
					}
				}
				ajaxs(user)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			hour(s) {
				if (s < 60) {
					return s + '分'
				} else if (s % 60 == 0) {
					return (s / 60) + '小时'
				} else {
					return (Math.floor(s / 60)) + '小时' + (s % 60) + '分'
				}
			},
			showSafe() {
				this.show1 = true
			},
			hideSafe() {
				this.show1 = false
			},
			airuser() {
				this.show2 = true
			},
			cancel() {
				this.show2 = false
			},
			confirm() {
				this.show2 = false
				if (this.radios == '') {
					return
				} else {
					let state = false
					for (let i = 0; i < this.userList.length; i++) {
						if (this.radios == this.userList[i].id) {
							if (this.addUsers.length == 0) {
								this.addUsers.push(this.userList[i])
							} else {
								for (let j = 0; j < this.addUsers.length; j++) {
									if (this.addUsers[j].id == this.radios) {
										state = true
									}
								}
								if (!state) {
									this.addUsers.push(this.userList[i])
								}
							}
						}
					}
				}
			},
			addUser() {
				uni.navigateTo({
					url: '../editorTrain/editorTrain?type=0'
				})
			},
			modifyUser(id) {
				uni.navigateTo({
					url: '../editorTrain/editorTrain?type=1&id=' + id
				})
			},
			choiceUser(e) {
				console.log(this.radios)
			},
			delUser(k) {
				this.addUsers.splice(k, 1)
			},
			choiceRadio(e) {
				let types = this.radio.split('&')
				this.personFare = types[1]
				this.types = types[2]
				if (types[0] == '商务座') {
					this.seat = 0
				}
				switch (types[0]) {
					case '商务座':
						this.seat = 0;
						break;
					case '特等座':
						this.seat = 1;
						break;
					case '一等座':
						this.seat = 2;
						break;
					case '二等座':
						this.seat = 3;
						break;
					case '高级软卧':
						this.seat = 4;
						break;
					case '软卧':
						this.seat = 5;
						break;
					case '硬卧':
						this.seat = 6;
					case '软座':
						this.seat = 7;
						break;
					case '硬座':
						this.seat = 8;
						break;
					case '无座':
						this.seat = 9;
				}
			},
			airPay() {
				if (this.radio == '') {
					Toast('请选择座位类型')
					return
				}

				if (this.addUsers.length == 0) {
					Toast('乘客不能为空')
					return
				} else if (this.addUsers.length > this.types) {
					Toast('余票不足')
					return
				}

				if (this.linker == '') {
					Toast('姓名不能为空')
					return
				}

				if (this.phone == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					Toast('手机号格式不正确')
					return
				}
				let total = this.total1 
				console.log(total)
				if(total <= 0){
					Toast('价格错误')
					return
				}
				let OrderInfo = {
					OrderAmount: total,
					TicketFare: this.personFare,
					StartCity: this.list.StartStation,
					EndCity: this.list.ToStation,
					StartDate: this.$store.state.startTrainDate,
					TrainNo: this.list.TrainCode,
					StartTime: this.list.GoTime,
					EndTime: this.list.ETime,
					ContactName: this.linker,
					ContactPhone: this.phone
				}

				let OrderPsgList = []
				for (let i = 0; i < this.addUsers.length; i++) {
					if (this.checked1) {
						OrderPsgList.push({
							PsgName: this.addUsers[i].username,
							TicketType: 0,
							SeatType: this.seat,
							CardType: this.addUsers[i].cardType,
							CardNo: this.addUsers[i].cardNo,
							Phone: this.addUsers[i].phone,
							InsProductCode: this.safeCode
						})
					} else {
						OrderPsgList.push({
							PsgName: this.addUsers[i].username,
							TicketType: 0,
							SeatType: this.seat,
							CardType: this.addUsers[i].cardType,
							CardNo: this.addUsers[i].cardNo,
							Phone: this.addUsers[i].phone
						})
					}
				}
				
				let self = this
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let alls = {
					uid: this.$store.state.uid,
					OrderInfo: OrderInfo,
					OrderPsgList: OrderPsgList
				}
				console.log(alls)
				let data = {
					url: '/api/gzh/trainCreateOrder',
					data: {
						uid: this.$store.state.uid,
						OrderInfo: OrderInfo,
						OrderPsgList: OrderPsgList
					},
					success: function(res) {
						if (res.data.result == 0) {
							let appId = res.data.body.appId
							let timeStamp = res.data.body.timeStamp
							let nonceStr = res.data.body.nonceStr
							let packages = res.data.body.prepay
							let signType = res.data.body.signType
							let paySign = res.data.body.paySign
							self.onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign)
						} else {
							Toast(res.data.resultNote)
							uni.hideLoading()
						}
					}
				}
				ajaxs(data)
			},
			onBridgeReady(appId, timeStamp, nonceStr, packages, signType, paySign) {
				let self = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						'appId': appId,
						'timeStamp': timeStamp,
						'nonceStr': nonceStr,
						'package': packages,
						'signType': signType,
						'paySign': paySign
					},
					function(res) {
						if (res.err_msg === 'get_brand_wcpay_request:ok') {
							uni.hideLoading()
							// Toast('支付成功')
							setTimeout(function(){
								uni.navigateTo({
									url: '../shopSuc/shopSuc?type=3'
								})
							},300)
						} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
							uni.hideLoading()
							Toast('用户取消支付')
						} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
							uni.hideLoading()
							Toast('网络异常，请重试')
						}
					}
				)
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
	}

	.top {
		width: 100%;
		height: 200upx;
		background-image: -webkit-linear-gradient(top, #E02B11, #F75F33);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.title {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #fff;
		position: relative;
	}

	.title>img {
		width: 40upx;
		margin: 0 20upx;
	}

	.back {
		position: absolute;
		left: 0;
	}

	.result {
		width: 100%;
		position: absolute;
		top: 140upx;
		bottom: 120upx;
		left: 0;
		right: 0;
		z-index: 199;
		padding: 0 30upx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.clock {
		width: 100%;
		height: 15%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 4px;
	}

	.location {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.guide {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
		color: #666;
		margin: 0 30upx;
	}

	.guide>img {
		width: 260upx;
		margin: 8upx 0;
	}

	.choice {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
	}

	.van-cell-group {
		background: none !important;
	}

	.van-cell {
		padding: 10upx 0 0 !important;
		background: none !important;
	}

	.van-cell:not(:last-child)::after {
		border-bottom: none !important;
	}

	.add {
		width: 60%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #E02B11;
		border-radius: 4px;
		margin: 30upx auto;
	}

	.tourist {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 10upx;
		border-bottom: 1px solid #eee;
		margin-bottom: 20upx;
	}

	.tourist-item {
		width: 100%;
		height: 60upx;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.link {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
	}

	.protect-content {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.protect-content>img {
		width: 28upx;
	}

	input {
		text-align: right;
	}

	.bottom-nav {
		width: 100%;
		height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		padding: 0 0 0 30upx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		box-shadow: 0 1px 4px #ccc;
		z-index: 100;
	}

	.nav-left {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 12px;
		color: #333;
	}

	.buy {
		height: 100upx;
		line-height: 100upx;
		padding: 0 60upx;
		font-size: 14px;
		color: #fff;
		background: #E02B11;
	}

	.safe {
		width: 100%;
		padding: 16upx 30upx;
		box-sizing: border-box;
		text-align: justify;
	}

	.editor {
		width: 100%;
		padding: 30upx;
		background: #FFFFFF;
		border-radius: 4px;
	}

	.btns {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.editorList {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
		margin: 30rpx 0;
	}

	.editorList>img,
	.userLeft>img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx;
	}

	.userList {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		margin-bottom: 30upx;
	}

	.userLeft {
		display: flex;
		align-items: center;
	}

	.userMsg {
		display: flex;
		flex-direction: column;
	}

	.del {
		width: 10%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
