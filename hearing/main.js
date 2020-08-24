import Vue from 'vue'
import App from './App'
Vue.prototype.$store = store

import TIMApp from './App'
import TIM from 'tim-wx-sdk'
import store from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import {
	isJSON
} from './utils'

import COS from 'cos-wx-sdk-v5'
// import { SDKAPPID } from './static/utils/GenerateTestUserSig'
import TYPES from './utils/types'

Vue.config.productionTip = false

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

App.mpType = 'app'

const tim = TIM.create({
	SDKAppID: 1400370159
})
tim.setLogLevel(0)
wx.$app = tim
wx.$app.registerPlugin({
	'cos-wx-sdk': COS
})
wx.store = store
wx.TIM = TIM
wx.dayjs = dayjs
dayjs.locale('zh-cn')

let $bus = new Vue()
Vue.prototype.TIM = TIM
Vue.prototype.$type = TYPES
Vue.prototype.$store = store
Vue.prototype.$bus = $bus


// 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)

tim.on(TIM.EVENT.KICKED_OUT, kickOut, this)
// 出错统一处理
tim.on(TIM.EVENT.ERROR, onError, this)

// 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
// event.data - 存储 Message 对象的数组 - [Message]
tim.on(TIM.EVENT.MESSAGE_RECEIVED, messageReceived, this)

// 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
// event.data - 存储 Conversation 对象的数组 - [Conversation]
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, convListUpdate, this)

// 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
// event.data - 存储 Group 对象的数组 - [Group]
tim.on(TIM.EVENT.GROUP_LIST_UPDATED, groupListUpdate, this)

// 收到黑名单列表更新通知
// event.data - 存储 userID 的数组 - [userID]
tim.on(TIM.EVENT.BLACKLIST_UPDATED, blackListUpdate, this)

//  网络状态发生改变（v2.5.0 起支持）。 
// event.data.state 当前网络状态，枚举值及说明如下： 
//     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络 
//     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中” 
//    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息 
tim.on(TIM.EVENT.NET_STATE_CHANGE, netStateChange, this)

function onReadyStateUpdate({
	name
}) {
	console.log('ready')
	const isSDKReady = (name === TIM.EVENT.SDK_READY)
	if (isSDKReady) {
		wx.$app.getMyProfile().then(res => {
			store.commit('updateMyInfo', res.data)
		})
		wx.$app.getBlacklist().then(res => {
			store.commit('setBlacklist', res.data)
		})
	}
	store.commit('setSdkReady', isSDKReady)
}

function kickOut(event) {
	store.dispatch('resetStore')
	wx.showToast({
		title: '你已被踢下线',
		icon: 'none',
		duration: 1500
	})
	setTimeout(() => {
		uni.clearStorageSync()
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}, 500)
}

function onError(event) {
	// 网络错误不弹toast && sdk未初始化完全报错
	if (event.data.message && event.data.code && event.data.code !== 2800 && event.data.code !== 2999) {
		store.commit('showToast', {
			title: event.data.message,
			duration: 2000
		})
	}
}

function checkoutNetState(state) {
	switch (state) {
		case TIM.TYPES.NET_STATE_CONNECTED:
			return {
				title: '已接入网络',
				duration: 2000
			}
		case TIM.TYPES.NET_STATE_CONNECTING:
			return {
				title: '当前网络不稳定',
				duration: 2000
			}
		case TIM.TYPES.NET_STATE_DISCONNECTED:
			return {
				title: '当前网络不可用',
				duration: 2000
			}
		default:
			return ''
	}
}

function netStateChange(event) {
	console.log(event.data.state)
	store.commit('showToast', checkoutNetState(event.data.state))
}

function messageReceived(event) {
	for (let i = 0; i < event.data.length; i++) {
		let item = event.data[i]
		if (item.type === TYPES.MSG_GRP_TIP) {
			if (item.payload.operationType) {
				$bus.$emit('groupNameUpdate', item.payload)
			}
		}
		if (item.type === TYPES.MSG_CUSTOM) {
			if (isJSON(item.payload.data)) {
				const videoCustom = JSON.parse(item.payload.data)
				if (videoCustom.version === 3) {
					switch (videoCustom.action) {
						// 对方呼叫我
						case 0:
							if (!store.getters.isCalling) {
								let url = `../call/main?args=${item.payload.data}&&from=${item.from}&&to=${item.to}`
								wx.navigateTo({
									url
								})
							} else {
								$bus.$emit('isCalling', item)
							}
							break
							// 对方取消
						case 1:
							wx.navigateBack({
								delta: 1
							})
							break
							// 对方拒绝
						case 2:
							$bus.$emit('onRefuse')
							break
							// 对方不接1min
						case 3:
							wx.navigateBack({
								delta: 1
							})
							break
							// 对方接听
						case 4:
							$bus.$emit('onCall', videoCustom)
							break
							// 对方挂断
						case 5:
							$bus.$emit('onClose')
							break
							// 对方正在通话中
						case 6:
							$bus.$emit('onBusy')
							break
						default:
							break
					}
				}
			}
		}
	}
	store.dispatch('onMessageEvent', event)
}

function convListUpdate(event) {
	store.commit('updateAllConversation', event.data)
}

function groupListUpdate(event) {
	store.commit('updateGroupList', event.data)
}

function blackListUpdate(event) {
	store.commit('updateBlacklist', event.data)
}

const app = new Vue({
	...App,
	store
})
app.$mount()
